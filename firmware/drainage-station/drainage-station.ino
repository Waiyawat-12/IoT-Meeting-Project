/*
 * Bangkok Smart Flood — drainage station firmware sample
 * Board: ESP32-WROOM-32
 *
 * Libraries (Arduino Library Manager):
 *   - PubSubClient by Nick O'Leary
 *   - ArduinoJson by Benoit Blanchon
 *
 * Wiring (prototype):
 *   Rain gauge (reed / tipping bucket) -> GPIO 27 (INPUT_PULLUP)
 *   HC-SR04 TRIG -> GPIO 26
 *   HC-SR04 ECHO -> GPIO 25
 *   Pump current ACS712 analog -> GPIO 34
 *   Pump relay IN -> GPIO 18
 *   Status LED -> GPIO 2
 *
 * Offline-first: the pump relay is decided on-device from water level.
 * MQTT is used only to report telemetry and receive a recommended mode.
 */

#include <WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>

const char *WIFI_SSID = "BMA-FLOOD-LAB";
const char *WIFI_PASS = "change-me";
const char *MQTT_HOST = "mqtt.bkk-flood.local";
const uint16_t MQTT_PORT = 1883;
const char *STATION_ID = "TH1038-P01";  // Lat Phrao pump house 1
const char *TOPIC_TELEMETRY = "bkk/flood/telemetry";
const char *TOPIC_COMMAND = "bkk/flood/command/TH1038-P01";

const int PIN_RAIN = 27;
const int PIN_TRIG = 26;
const int PIN_ECHO = 25;
const int PIN_CURRENT = 34;
const int PIN_RELAY = 18;
const int PIN_LED = 2;

WiFiClient wifi;
PubSubClient mqtt(wifi);

volatile unsigned long tipCount = 0;
unsigned long lastTipMicros = 0;

void IRAM_ATTR onRainTip() {
  unsigned long now = micros();
  if (now - lastTipMicros > 20000) {
    tipCount++;
    lastTipMicros = now;
  }
}

float readWaterLevelCm() {
  digitalWrite(PIN_TRIG, LOW);
  delayMicroseconds(2);
  digitalWrite(PIN_TRIG, HIGH);
  delayMicroseconds(10);
  digitalWrite(PIN_TRIG, LOW);
  unsigned long duration = pulseIn(PIN_ECHO, HIGH, 30000);
  if (duration == 0) return -1;
  return duration * 0.0343f / 2.0f;
}

void connectWifi() {
  WiFi.mode(WIFI_STA);
  WiFi.begin(WIFI_SSID, WIFI_PASS);
  unsigned long start = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - start < 15000) {
    delay(250);
  }
}

void onCommand(char *topic, byte *payload, unsigned int length) {
  StaticJsonDocument<256> doc;
  if (deserializeJson(doc, payload, length)) return;
  const char *mode = doc["mode"] | "auto";
  if (strcmp(mode, "force_on") == 0) digitalWrite(PIN_RELAY, HIGH);
  if (strcmp(mode, "force_off") == 0) digitalWrite(PIN_RELAY, LOW);
}

void connectMqtt() {
  mqtt.setServer(MQTT_HOST, MQTT_PORT);
  mqtt.setCallback(onCommand);
  if (mqtt.connect(STATION_ID)) {
    mqtt.subscribe(TOPIC_COMMAND);
  }
}

void setup() {
  pinMode(PIN_RAIN, INPUT_PULLUP);
  pinMode(PIN_TRIG, OUTPUT);
  pinMode(PIN_ECHO, INPUT);
  pinMode(PIN_CURRENT, INPUT);
  pinMode(PIN_RELAY, OUTPUT);
  pinMode(PIN_LED, OUTPUT);
  attachInterrupt(digitalPinToInterrupt(PIN_RAIN), onRainTip, FALLING);
  connectWifi();
  connectMqtt();
}

void loop() {
  if (WiFi.status() == WL_CONNECTED && !mqtt.connected()) connectMqtt();
  mqtt.loop();

  static unsigned long lastTips = 0;
  static unsigned long lastMs = 0;
  unsigned long now = millis();
  if (now - lastMs < 5000) return;
  lastMs = now;

  unsigned long tips = tipCount - lastTips;
  lastTips = tipCount;
  float mmHr = tips * 0.2f * 12.0f;  // 0.2 mm/tip, 5s window
  float level = readWaterLevelCm();
  int currentRaw = analogRead(PIN_CURRENT);

  bool floodThreat = (level > 0 && level < 35) || mmHr > 40;
  digitalWrite(PIN_RELAY, floodThreat ? HIGH : LOW);
  digitalWrite(PIN_LED, floodThreat ? HIGH : LOW);

  StaticJsonDocument<384> doc;
  doc["stationId"] = STATION_ID;
  doc["districtId"] = "TH1038";
  doc["rainMmHr"] = mmHr;
  doc["waterLevelCm"] = level;
  doc["pumpOn"] = floodThreat;
  doc["currentRaw"] = currentRaw;
  doc["wifi"] = WiFi.status() == WL_CONNECTED;
  doc["ts"] = now;

  char buffer[384];
  size_t n = serializeJson(doc, buffer);
  if (mqtt.connected()) {
    mqtt.publish(TOPIC_TELEMETRY, buffer, n);
  }
}
