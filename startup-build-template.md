---

# 🏆 AI + IoT + Embedded Systems Innovation Prototype
## Competition Framework: 5W1H + 5 Why

เป้าหมายเพื่อสร้าง โอกาสทางธุรกิจ Startup

โปรเจกต์ต้นแบบที่ใช้งานได้: **Bangkok Smart Flood Risk Prediction & Monitoring System**  
แดชบอร์ด: รัน `npm install` แล้ว `npm run dev` เปิด http://localhost:3000

---

# 📌 PART 1: PROJECT OVERVIEW

```markdown
## โปรเจกต์: Bangkok Smart Flood Risk Prediction & Monitoring System
**Tagline:** เห็นน้ำท่วมก่อนน้ำมา — 50 เขตกรุงเทพฯ ในแผนที่เดียว
**ประเภทปัญหาที่แก้:** Smart City / Environmental / Social
**ระดับความพร้อม:** MVP ใช้งานได้ (interactive web prototype + firmware sample + schema)
```

---

# 📌 PART 2: 5W1H FRAMEWORK

## 1. WHO (ใคร)

```markdown
- ผู้ใช้หลัก (Primary User): ศูนย์ปฏิบัติการป้องกันน้ำท่วม กทม. / ผู้ควบคุมสถานีสูบน้ำ
- ผู้ได้รับผลกระทบทางอ้อม (Secondary): ประชาชนผู้ใช้รถใช้ถนน, ชุมชนในเขตลุ่ม เช่น ลาดพร้าว บางเขน ดอนเมือง
- ผู้ตัดสินใจซื้อ/ติดตั้ง (Decision Maker): ผู้ว่าราชการกรุงเทพมหานคร, สำนักการระบายน้ำ (DDS), สำนักการโยธา
- ผู้ดูแลระบบ (Maintainer): ทีม Smart City / IoT ของ กทม. และผู้รับเหมาระบบสูบน้ำ
- ผู้มีส่วนได้ส่วนเสีย (Stakeholders): ทช., กรมอุตุนิยมวิทยา, การไฟฟ้านครหลวง, ประชาชน, สตาร์ทอัพประกันภัยภูมิอากาศ
```

---

## 2. WHAT (อะไร)

```markdown
- **ตรวจจับ/วัด (Sensing):**
  - Sensor: tipping-bucket rain gauge, HC-SR04 / radar water-level, ACS712 pump current, GPS
  - Data Type: Digital (rain tips), Analog (current), Time-of-flight (level)
  - Accuracy Requirement: ±0.2 mm/tip rain, ±2 cm water level, 5-second telemetry

- **ประมวลผล (Processing):**
  - Edge หรือ Cloud: Hybrid — Edge ตัดสินใจเปิดปั๊ม, Cloud รวม 50 เขตและสภาพอากาศ
  - Algorithm/Model: Heuristic weighted score (prototype) → XGBoost/LSTM ในเฟสถัดไป
  - Output: Prediction (RiskScore 0–100%) + Classification (Low/Moderate/High/Critical)

- **ควบคุม (Actuation):**
  - Actuator: Pump relay, LED status, (อนาคต) ประตูระบาย / ป้ายจราจร
  - Control Logic: On-Off ที่ Edge ตามระดับน้ำ + AI recommendation ที่ Cloud

- **แจ้งเตือน (Notification):**
  - ช่องทาง: Operator dashboard (Leaflet heat map), LINE/SMS ในเฟสถัดไป
  - ระดับความเร่งด่วน: Info (All Clear) / Warning (Prepare Pumps) / Critical (Emergency drainage)
```

---

## 3. WHEN (เมื่อไหร่)

```markdown
- ช่วงเวลาเกิดปัญหา: ฤดูฝน พ.ค.–ต.ค. โดยเฉพาะพายุฤดูร้อนช่วงบ่ายและน้ำเหนือ+น้ำทะเลหนุน
- ระยะเวลาที่ยอมรับได้ (Response Time): เปิดปั๊มที่ Edge < 500 ms, อัปเดตแดชบอร์ด < 5 s
- ความถี่ในการอ่านค่า (Sampling Rate): ระดับน้ำทุก 1 Hz, สรุปฝนทุก 5 s
- ความถี่ในการอัปเดต (Update Cycle): Telemetry 5 s, city-wide risk snapshot 1 นาที
- ระยะเวลาที่ระบบต้องทำงานต่อเนื่อง: 24/7 ช่วงมรสุม, UPS ≥ 12 ชั่วโมง
```

---

## 4. WHERE (ที่ไหน)

```markdown
- ตำแหน่งติดตั้ง: Outdoor — สถานีสูบน้ำ / ปากคลอง / ทางลอด ใน 50 เขตกรุงเทพฯ
- สภาพแวดล้อม: ความชื้นสูง, น้ำเค็มชายฝั่งบางขุนเทียน, สั่นสะเทือนจากปั๊ม
- ระยะห่างจาก Gateway: 0–200 เมตรในสถานี, backhaul 4G/Wi-Fi ไปคลาวด์
- การสื่อสาร: WiFi ในแล็บ, 4G/NB-IoT ในสนาม, MQTT ไปคลาวด์
- แหล่งจ่ายไฟ: DC Adapter + UPS, Solar สำรองที่สถานีเปิดโล่ง
- ข้อจำกัดด้านขนาด/น้ำหนัก: กล่อง IP65 ≤ 3 kg สำหรับติดตั้งผนังสถานี
```

---

## 5. WHY (ทำไม) - 5 Why Deep Dive

```markdown
- Why 1 (ปัญหา): กรุงเทพฯ น้ำท่วมซ้ำทุกปี แม้มีปั๊มและอุโมงค์ระบายน้ำจำนวนมาก
- Why 2 (ต้นตอ): ที่ลุ่ม + แผ่นดินทรุด + ฝนกระจุก + คลองตื้น + ข้อมูลกระจัดกระจาย
- Why 3 (วิธีเดิมพัง): ดูกล้อง/รายงานเขตทีละจุด ช้าเกินกว่าฝน 110 mm/hr
- Why 4 (AI+IoT ตอบโจทย์): รวม telemetry กับช่องโหว่รายเขตเป็น RiskScore ทันที
- Why 5 (ทำไมตอนนี้): ฝนสุดขั้วถี่ขึ้น ต้นทุน ESP32 ต่ำ และ กทม. เดินหน้า Smart City
```

---

## 6. HOW (อย่างไร) - Technical Architecture

### Hardware Stack

```markdown
- MCU / SoC: ESP32-WROOM-32
- Clock Speed: 240 MHz
- RAM / Flash: 520 KB SRAM / 4 MB Flash
- Sensor(s): tipping-bucket rain, HC-SR04, ACS712
- Actuator(s): 5V/12V pump relay, status LED
- Communication Module: ESP32 Wi-Fi, MQTT (PubSubClient)
- Power Management: 5V supply + UPS; brown-out detector on ESP32
```

### Software Stack

```markdown
- Framework: Arduino (firmware) + Next.js 16 App Router / TypeScript (dashboard)
- AI Framework: heuristic now; Edge Impulse / TensorFlow Lite Micro next
- AI Model Type: Weighted score → future XGBoost / LSTM rainfall nowcast
- Model Size: < 2 KB heuristic; target < 250 KB TFLite
- Inference Time: < 1 ms on server, < 20 ms target on ESP32
- Protocol: MQTT telemetry, HTTP `/api/risk` for the dashboard
- Cloud Platform (ถ้าใช้): self-hosted Mosquitto + PostgreSQL/TimescaleDB/PostGIS (see docs/schema.sql)
```

### Data Pipeline

```markdown
Rain/level/pump → ESP32 preprocess → local pump decision → MQTT → TimescaleDB
      → floodEngine (chance, intensity, vulnerability) → Leaflet heat map → operator action → feedback
```

ดูแผนภาพที่ `/architecture` และ `src/components/dashboard/ArchitectureDiagram.tsx`

---

# 📌 PART 3: 5 WHY + SCENARIO (ฉบับเล่าเรื่อง)

## WHY 1: ปัญหา (Problem Scenario)

```markdown
- **Scenario:** ฝนเซลล์เดียวถล่มลาดพร้าวตอน 16:40 น้ำในซอยเอ่อก่อนที่วอร์รูมจะได้รายงานจากเขต
- **คำถามหลัก:** ทำไมถึงต้องแก้ปัญหานี้?
- **Data/Evidence:** มหาอุทกภัยปี 2554 สร้างความเสียหายราว 1.4 ล้านล้านบาท (World Bank). กรุงเทพฯ มี 50 เขต ความสูงเฉลี่ยประมาณ 1.5 ม. และทรุดตัวต่อเนื่อง
```

---

## WHY 2: ต้นตอ (Root Cause Scenario)

```markdown
- **Scenario:** ลาดพร้าว บางเขน ดอนเมือง วัฒนา พระโขนง เป็นแอ่งรับน้ำ ขณะที่พระนคร/สัมพันธวงศ์มีปั๊มหนาแน่นกว่า
- **คำถามหลัก:** ทำไมสาเหตุนั้นถึงเกิดขึ้น?
- **Insight:** ฝนเท่ากันไม่เท่ากับความเสี่ยงเท่ากัน — ต้องมี baseVulnerability รายเขต
```

---

## WHY 3: วิธีเดิมพัง (Failure Scenario)

```markdown
- **Scenario:** แผนที่กระดาษและกลุ่มไลน์มาช้า ปั๊มเปิดไม่พร้อมกัน ทางลอดยังไม่ปิด
- **คำถามหลัก:** ทำไมวิธีแก้เดิมถึงใช้ไม่ได้?
- **Gap Analysis:** ไม่มี city-wide RiskScore แบบเรียลไทม์ที่อธิบายได้ (explainable) ต่อผู้บริหาร
```

---

## WHY 4: AI+IoT เข้ามาช่วย (Solution Scenario)

```markdown
- **Scenario:** สไลด์ “Severe Flash Flood Risk” แล้ว 50 เหลี่ยมเขตเปลี่ยนเป็นส้ม/แดงในพริบตา พร้อมคำสั่ง Prepare Pumps / Issue Traffic Warning
- **คำถามหลัก:** ทำไมต้องใช้เทคโนโลยีนี้ (ไม่ใช่วิธีอื่น)?
- **Innovation Highlight:** แผนที่ GeoJSON จริง + สูตรโปร่งใส + IoT คุมปั๊มที่ขอบข่าย แม้ Wi-Fi หลุด
```

---

## WHY 5: ทำไมต้องตอนนี้ (Urgency Scenario)

```markdown
- **Scenario:** ฝนสุดขั้วถี่ขึ้น ขณะที่ต้นทุนสถานี ESP32 ต่อจุดอยู่ในหลักพันบาท
- **คำถามหลัก:** ทำไมถึงต้องรีบทำวันนี้? ถ้ารออีก 1-3 ปีจะเกิดอะไร?
- **Market Timing:** Smart City budgets, climate-risk insurance, และ ESG ของเมืองใหญ่กำลังเปิดหน้าต่างตลาด
```

---

## HOW: ต้นแบบที่ใช้งานได้ (Demo Scenario)

```markdown
- **Scenario:** ผู้ตัดสินใจลากสไลเดอร์ฝน 0→110 mm/hr เห็นลาดพร้าววิกฤตก่อนพระนคร คลิกเขตแล้วได้คำแนะนำภาษาไทย/อังกฤษ
- **Hardware Details:** ESP32 sample in firmware/drainage-station (relay + rain + ultrasonic)
- **Software Details:** Next.js dashboard, Leaflet polygons, lib/floodEngine.ts, /api/risk
- **KPI / Success Metrics:** 50 เขตครบ, latency สไลเดอร์ < 100 ms, RiskScore ถูกต้องตามสูตร, GeoJSON โหลดจาก /public/bkk-districts.json
```

---

# 📌 PART 4: COMPETITION EDGE

## 🎯 UNIQUE SELLING POINT (USP)

```markdown
| มิติ | จุดแข็งของเรา | เมื่อเทียบกับคู่แข่ง |
| :--- | :--- | :--- |
| **ต้นทุน (Cost)** | สถานี ESP32 ~2,500 บาท | ต่ำกว่า SCADA อุตสาหกรรมอย่างน้อย 70% |
| **ความเร็ว (Speed)** | Edge < 500 ms, UI < 100 ms | เร็วกว่าการรายงานด้วยมือหลายสิบเท่า |
| **ความแม่นยำ (Accuracy)** | สูตรโปร่งใส + prior รายเขต | อธิบายได้ ไม่ใช่กล่องดำ |
| **ความทนทาน (Durability)** | Offline-first ที่ปั๊ม | อยู่รอดเมื่อคลาวด์ล่ม |
| **การประหยัดพลังงาน (Power)** | ESP32 modem-sleep | ประหยัดกว่าเกตเวย์อุตสาหกรรม |
| **ความง่ายในการติดตั้ง (Ease of Deployment)** | กล่อง IP65 ต่อปั๊มเดิม | ไม่ต้องรื้อ SCADA ทั้งระบบ |
| **ความเป็นเอกลักษณ์ (Novelty)** | 50 เขตบน GeoJSON จริง + เครื่องยนต์ความเสี่ยงที่จำลองได้ | แดชบอร์ดอากาศทั่วไปไม่มี vulnerability รายเขต |
```

---

## ⚠️ RISK & MITIGATION

```markdown
| ความเสี่ยง | โอกาสเกิด | ผลกระทบ | แผนรับมือ (Mitigation) |
| :--- | :--- | :--- | :--- |
| 1. เซ็นเซอร์ระดับน้ำสกปรก/ผิดพลาด | สูง | สูง | Self-check + ใช้ฝนและกระแสปั๊มประกอบ (sensor fusion) |
| 2. MQTT/อินเทอร์เน็ตหลุด | กลาง | กลาง | ตัดสินใจที่ Edge ก่อน แล้ว sync เมื่อกลับมา |
| 3. Prior รายเขตไม่ตรงภูมิประเทศจริง | กลาง | กลาง | ปรับ baseVulnerability จากประวัติน้ำท่วมจริงของ DDS |
```

---

## 📊 TECHNICAL FEASIBILITY

```markdown
| ด้าน | ความท้าทาย | ความเป็นไปได้ | วิธีพิสูจน์ |
| :--- | :--- | :--- | :--- |
| **Hardware Integration** | กันน้ำ + สัญญาณรบกวนปั๊ม | ✅ | สเก็ตช์ Arduino + BOM |
| **AI Model Size** | เริ่มจาก heuristic | ✅ | lib/floodEngine.ts + vitest |
| **Real-time Performance** | รีเรนเดอร์ 50 เหลี่ยม | ✅ | React memo + Leaflet GeoJSON |
| **Power Consumption** | สถานีกลางแจ้ง | ⚠️ | UPS 12 ชม. ก่อนติดโซลาร์ |
| **Connectivity** | Wi-Fi ในอุโมงค์สูบน้ำ | ⚠️ | 4G router ในสถานีจริง |
```

---

# 📌 PART 5: DEMO STRATEGY

## 🎬 Demo Flow (5-7 นาที)

```markdown
1. **Opening Hook (1 นาที):** ซอยลาดพร้าวปี 2554 vs แดชบอร์ดวันนี้
2. **Problem Statement (1 นาที):** 50 เขต ฝนเท่ากันแต่เสี่ยงไม่เท่ากัน
3. **Solution Reveal (2 นาที):** กด Sunny → Seasonal → Severe แล้วแผนที่เปลี่ยนสี
4. **Technical Highlight (1.5 นาที):** คลิกเขต ดูสูตร ดูปั๊ม ดู /architecture
5. **Impact & Future (1 นาที):** ต่อ ESP32 จริง, LINE alert, ประกันภัยพาราเมตริก
6. **Closing (0.5 นาที):** “เห็นน้ำท่วมก่อนน้ำมา”
```

## Demo Props ที่ต้องมี

```markdown
- [x] Prototype ที่ทำงานได้จริง (แดชบอร์ดนี้)
- [x] Dashboard ที่แสดงผลตามสไลเดอร์ทันที
- [x] Before/After ผ่าน preset Sunny vs Severe
- [x] แผนภาพ System Architecture ที่ /architecture
- [ ] วีดีโอสั้น Backup (บันทึกตอนเดโม)
```

## Marketing opportunity

- ขายเป็น **FloodOps OS** ให้เทศบาล — SaaS รายเขต + ฮาร์ดแวร์สถานี
- ลดชั่วโมงปิดถนน, ลดเคลมประกัน, เปิดตลาด climate-risk data
- ขยายไปนนทบุรี ปทุมธานี สมุทรปราการ ซึ่งอยู่บนที่ราบเดียวกัน

---

# 📌 PART 6: Q&A PREPARATION

```markdown
| คำถามกรรมการ | คำตอบที่ชาญฉลาด |
| :--- | :--- |
| *"แล้วถ้า WiFi หลุดล่ะ?"* | "ปั๊มตัดสินใจที่ ESP32 จากระดับน้ำและฝนในสถานี คลาวด์ใช้เก็บสถิติและภาพรวม 50 เขต เมื่อเน็ตกลับมาจะ MQTT sync เอง" |
| *"ราคาเท่าไหร่? ขายได้จริงไหม?"* | "Prototype สถานี ~2,500 บาท ผลิต 1,000 ชุดเป้า ~1,200 บาท ลูกค้าแรกคือสำนักการระบายน้ำและเทศบาลปริมณฑลที่งบ Smart City พร้อม" |
| *"ต่างจากของที่มีอยู่แล้วยังไง?"* | "เรดาร์ฝนและ SCADA มีอยู่แล้วแต่ไม่รวมช่องโหว่รายเขตเป็นสีบนแผนที่ 50 เขตที่ผู้บริหารอ่านได้ใน 3 วินาที" |
| *"ทำไมต้องใช้ AI? ใช้ If-Else ก็ได้?"* | "If-else ใช้ที่ Edge สำหรับปั๊มได้ แต่ความเสี่ยงระดับเมืองไม่เชิงเส้น ฝน × คลอง × ทรุด × ปั๊มเสีย ต้องมีโมเดลที่ปรับ prior ได้" |
| *"ถ้าเซ็นเซอร์เสียจะทำยังไง?"* | "สถานีเช็ค echo timeout และกระแสปั๊มทุก 5 วินาที ถ้าผิดปกติจะลดน้ำหนักเซ็นเซอร์นั้นแล้วใช้ค่าเขตข้างเคียง" |
```

---

# 📌 PART 7: PROJECT SUMMARY CARD

```markdown
## 🏷️ PROJECT SUMMARY CARD

| หัวข้อ | รายละเอียด |
| :--- | :--- |
| **ชื่อโปรเจกต์** | Bangkok Smart Flood Risk Prediction & Monitoring |
| **Tagline** | เห็นน้ำท่วมก่อนน้ำมา |
| **ปัญหาที่แก้** | น้ำท่วมกรุงเทพฯ ที่มองไม่เห็นทั้งเมืองแบบเรียลไทม์ |
| **กลุ่มเป้าหมาย** | กทม. สำนักการระบายน้ำ, เทศบาลปริมณฑล, วอร์รูมภัยพิบัติ |
| **เทคโนโลยีหลัก** | Next.js, Leaflet GeoJSON, heuristic flood engine, ESP32/MQTT |
| **จุดเด่น (USP)** | 1. 50 เขตบนขอบเขตจริง <br> 2. สูตรความเสี่ยงโปร่งใส <br> 3. Offline-first ที่ปั๊ม |
| **KPI สำเร็จ** | แผนที่ 50 เขต, preset 3 สถานการณ์, API /api/risk, vitest สูตรผ่าน |
| **ต้นทุน Prototype** | แดชบอร์ดซอฟต์แวร์ ~0 บาท (โอเพนซอร์ส) + สถานี ESP32 ~2,500 บาท |
| **ทีมงาน** | Prototype team — IoT Meeting Project |
```

---

# 📌 PART 8: ACTION PLAN

```markdown
## Development Plan (technical slices, not calendar weeks)

| Slice | เป้าหมาย | งานหลัก | Deliverable |
| :---: | :--- | :--- | :--- |
| **1** | Research & Design | ขอบเขต 50 เขต, สูตรเสี่ยง, BOM | GeoJSON + architecture SVG |
| **2** | Hardware sample | สเก็ตช์ ESP32, รีเลย์, เรนเกจ | firmware/drainage-station |
| **3** | Software & engine | Next.js dashboard, floodEngine, API | MVP ที่ localhost:3000 |
| **4** | Integration & polish | Preset, drawer, tests, เอกสาร 5W1H | Demo-ready prototype |
```

---

# 📌 PART 9: BUDGET & RESOURCES

## 💰 Budget Estimation (per drainage station)

```markdown
| รายการ | รายละเอียด | จำนวน | ราคาต่อหน่วย | รวม |
| :--- | :--- | :---: | :---: | :---: |
| MCU | ESP32-WROOM-32 DevKit | 1 | 150 บาท | 150 บาท |
| Sensor | Tipping-bucket rain gauge | 1 | 900 บาท | 900 บาท |
| Sensor | HC-SR04 ultrasonic | 1 | 80 บาท | 80 บาท |
| Sensor | ACS712 current | 1 | 70 บาท | 70 บาท |
| Actuator | 5V relay module | 1 | 40 บาท | 40 บาท |
| Communication | ใช้ Wi-Fi ใน ESP32 / 4G router แชร์สถานี | 1 | 800 บาท | 800 บาท |
| Power | 5V 2A + UPS module | 1 | 350 บาท | 350 บาท |
| Enclosure | IP65 box, glands | 1 | 120 บาท | 120 บาท |
| **รวมทั้งสิ้น** | | | | **~2,510 บาท** |
```

## 📚 References
แหล่งที่ตรวจแล้วว่ามีอยู่จริง — ไม่ได้แต่งลิงก์

```markdown
- [World Bank — Thai Flood 2011 Overview](https://www.worldbank.org/en/news/feature/2011/12/13/world-bank-supports-thailands-post-floods-recovery-effort)
- [Bangkok Metropolitan Administration](https://www.bangkok.go.th/)
- [สำนักการระบายน้ำ กรุงเทพมหานคร](https://dds.bangkok.go.th/)
- [OpenGISData-Thailand districts.geojson](https://github.com/chingchai/OpenGISData-Thailand)
- [Leaflet documentation](https://leafletjs.com/reference.html)
- [react-leaflet](https://react-leaflet.js.org/)
- [ESP32 Technical Reference](https://www.espressif.com/en/products/socs/esp32)
- [PubSubClient (Arduino MQTT)](https://github.com/knolleary/pubsubclient)
- [TimescaleDB hypertables](https://docs.timescale.com/use-timescale/latest/hypertables/)
- [TensorFlow Lite Micro Documentation](https://www.tensorflow.org/lite/microcontrollers)
```

---

# 📌 PART 10: TEAM INFORMATION

```markdown
## 👥 Team Information

| บทบาท | ชื่อ | ความรับผิดชอบ | ทักษะที่เกี่ยวข้อง |
| :--- | :--- | :--- | :--- |
| **Team Leader** | Waiyawat Jaidee | วางแผน, ประสานงาน, นำเสนอ | Project Management, Communication |
| **Hardware Engineer** | Prototype desk | วงจรเซ็นเซอร์และรีเลย์ | Electronics, ESP32 |
| **Embedded Developer** | Prototype desk | Firmware MQTT / pump logic | C++, Arduino |
| **AI/ML Engineer** | Prototype desk | Heuristic engine → future model | TypeScript, Python |
| **UI/UX Designer** | Prototype desk | Operator dashboard | Next.js, Leaflet, Tailwind |
```
