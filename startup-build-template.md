---

# 🏆 AI + IoT + Embedded Systems Innovation Prototype
## Competition Framework: 5W1H + 5 Why 

เป้าหมายเพื่อสร้าง โอกาสทางธุรกิจ Startup
---

# 📌 PART 1: PROJECT OVERVIEW

```markdown
## โปรเจกต์: [ชื่อโปรเจกต์ของคุณ]
**Tagline:** [1 ประโยคที่ทำให้คนจำได้ เช่น "เปลี่ยนไฟเขียวโง่ ให้เป็นไฟเขียวอัจฉริยะ" ]
**ประเภทปัญหาที่แก้:** [Social / Environmental / Healthcare / Smart City / Agriculture / Education]
**ระดับความพร้อม:** [ไอเดีย / ต้นแบบกระดาษ / Proof of Concept / MVP ใช้งานได้]
```

---

# 📌 PART 2: 5W1H FRAMEWORK

## 1. WHO (ใคร)

```markdown
- ผู้ใช้หลัก (Primary User): [........]
- ผู้ได้รับผลกระทบทางอ้อม (Secondary): [........]
- ผู้ตัดสินใจซื้อ/ติดตั้ง (Decision Maker): [........]
- ผู้ดูแลระบบ (Maintainer): [........]
- ผู้มีส่วนได้ส่วนเสีย (Stakeholders): [........]
```

---

## 2. WHAT (อะไร)

```markdown
- **ตรวจจับ/วัด (Sensing):** 
  - Sensor: [........]
  - Data Type: [Analog/Digital/Image/Audio/IMU/GPS]
  - Accuracy Requirement: [........]
  
- **ประมวลผล (Processing):** 
  - Edge หรือ Cloud: [........]
  - Algorithm/Model: [........]
  - Output: [Classification/Regression/Detection/Prediction]
  
- **ควบคุม (Actuation):** 
  - Actuator: [Motor/Relay/Display/Buzzer/Servo]
  - Control Logic: [PID/On-Off/AI-based]
  
- **แจ้งเตือน (Notification):** 
  - ช่องทาง: [Line/Telegram/SMS/Dashboard/LED/Buzzer]
  - ระดับความเร่งด่วน: [Info/Warning/Critical]
```

---

## 3. WHEN (เมื่อไหร่)

```markdown
- ช่วงเวลาเกิดปัญหา: [........]
- ระยะเวลาที่ยอมรับได้ (Response Time): [........ ms]
- ความถี่ในการอ่านค่า (Sampling Rate): [........ Hz]
- ความถี่ในการอัปเดต (Update Cycle): [........]
- ระยะเวลาที่ระบบต้องทำงานต่อเนื่อง: [........ ชั่วโมง/วัน]
```

---

## 4. WHERE (ที่ไหน)

```markdown
- ตำแหน่งติดตั้ง: [ Indoor / Outdoor / Mobile / Underwater / High-temp ]
- สภาพแวดล้อม: [........]
- ระยะห่างจาก Gateway: [........ เมตร]
- การสื่อสาร: [WiFi / BLE / LoRa / Zigbee / 4G / NB-IoT / Ethernet]
- แหล่งจ่ายไฟ: [Battery / Solar / USB / DC Adapter / Energy Harvesting]
- ข้อจำกัดด้านขนาด/น้ำหนัก: [........]
```

---

## 5. WHY (ทำไม) - 5 Why Deep Dive

```markdown
- Why 1 (ปัญหา): [........]
- Why 2 (ต้นตอ): [........]
- Why 3 (วิธีเดิมพัง): [........]
- Why 4 (AI+IoT ตอบโจทย์): [........]
- Why 5 (ทำไมตอนนี้): [........]
```

---

## 6. HOW (อย่างไร) - Technical Architecture

### Hardware Stack

```markdown
- MCU / SoC: [ESP32 / ESP8266 / RP2040 / STM32 / Arduino / Raspberry Pi]
- Clock Speed: [........ MHz]
- RAM / Flash: [........ KB / MB]
- Sensor(s): [........]
- Actuator(s): [........]
- Communication Module: [........]
- Power Management: [........]
```

### Software Stack

```markdown
- Framework: [Arduino / ESP-IDF / MicroPython / FreeRTOS / Zephyr]
- AI Framework: [TensorFlow Lite Micro / Edge Impulse / OpenMV / PyTorch Mobile]
- AI Model Type: [CNN / RNN / LSTM / Decision Tree / Random Forest / XGBoost / YOLO / MobileNet]
- Model Size: [........ KB]
- Inference Time: [........ ms]
- Protocol: [MQTT / HTTP / CoAP / WebSocket / LoRaWAN]
- Cloud Platform (ถ้าใช้): [AWS IoT / GCP / Azure / Firebase / ThingSpeak / Blynk]
```

### Data Pipeline

```markdown
- Data Collection → Preprocessing → Model Inference → Decision → Actuation → Feedback Loop
```

---

# 📌 PART 3: 5 WHY + SCENARIO (ฉบับเล่าเรื่อง)

## WHY 1: ปัญหา (Problem Scenario)

```markdown
- **Scenario:** [เล่าเรื่องราวให้กรรมการเห็นภาพ ราวกับกำลังดูหนังสั้น]
- **คำถามหลัก:** ทำไมถึงต้องแก้ปัญหานี้?
- **Data/Evidence:** [ตัวเลข/สถิติที่ยืนยันความรุนแรงของปัญหา]
```

---

## WHY 2: ต้นตอ (Root Cause Scenario)

```markdown
- **Scenario:** [เล่าถึงพฤติกรรมหรือปัจจัยที่ทำให้เกิดปัญหาจริง ๆ]
- **คำถามหลัก:** ทำไมสาเหตุนั้นถึงเกิดขึ้น?
- **Insight:** [สิ่งที่ค้นพบที่ไม่เคยรู้มาก่อน]
```

---

## WHY 3: วิธีเดิมพัง (Failure Scenario)

```markdown
- **Scenario:** [เล่าถึงความล้มเหลวของเทคโนโลยี/วิธีการที่มีอยู่]
- **คำถามหลัก:** ทำไมวิธีแก้เดิมถึงใช้ไม่ได้?
- **Gap Analysis:** [ช่องว่างที่เทคโนโลยีเดิมไม่สามารถเติมเต็มได้]
```

---

## WHY 4: AI+IoT เข้ามาช่วย (Solution Scenario)

```markdown
- **Scenario:** [เล่าถึงวินาทีที่ AI+IoT เปลี่ยนเกม]
- **คำถามหลัก:** ทำไมต้องใช้เทคโนโลยีนี้ (ไม่ใช่วิธีอื่น)?
- **Innovation Highlight:** [จุดที่ AI/IoT สร้างความแตกต่างอย่างชัดเจน]
```

---

## WHY 5: ทำไมต้องตอนนี้ (Urgency Scenario)

```markdown
- **Scenario:** [เล่าถึงวิกฤตหรือโอกาสที่กำลังจะมาถึง]
- **คำถามหลัก:** ทำไมถึงต้องรีบทำวันนี้? ถ้ารออีก 1-3 ปีจะเกิดอะไร?
- **Market Timing:** [ปัจจัยภายนอกที่ทำให้ตอนนี้คือเวลาที่เหมาะสม]
```

---

## HOW: ต้นแบบที่ใช้งานได้ (Demo Scenario)

```markdown
- **Scenario:** [เล่าถึง Moment of Truth ที่กรรมการจะได้เห็นระบบทำงาน]
- **Hardware Details:** [........]
- **Software Details:** [........]
- **KPI / Success Metrics:** [........]
```

---

# 📌 PART 4: COMPETITION EDGE

## 🎯 UNIQUE SELLING POINT (USP) - ทำไมทีมเราต้องชนะ?

```markdown
| มิติ | จุดแข็งของเรา | เมื่อเทียบกับคู่แข่ง |
| :--- | :--- | :--- |
| **ต้นทุน (Cost)** | [........] | ต่ำกว่า [........]% |
| **ความเร็ว (Speed)** | [........ ms] | เร็วกว่า [........] เท่า |
| **ความแม่นยำ (Accuracy)** | [........%] | สูงกว่า [........%] |
| **ความทนทาน (Durability)** | [........] | อยู่ได้นานกว่า [........] เท่า |
| **การประหยัดพลังงาน (Power)** | [........ mW] | ประหยัดกว่า [........]% |
| **ความง่ายในการติดตั้ง (Ease of Deployment)** | [........] | ง่ายกว่า [........] เท่า |
| **ความเป็นเอกลักษณ์ (Novelty)** | [........] | ไม่มีใครทำมาก่อน |
```

---

## ⚠️ RISK & MITIGATION (ความเสี่ยงและแผนรับมือ)

```markdown
| ความเสี่ยง | โอกาสเกิด | ผลกระทบ | แผนรับมือ (Mitigation) |
| :--- | :--- | :--- | :--- |
| 1. [........] | สูง/กลาง/ต่ำ | สูง/กลาง/ต่ำ | [........] |
| 2. [........] | สูง/กลาง/ต่ำ | สูง/กลาง/ต่ำ | [........] |
| 3. [........] | สูง/กลาง/ต่ำ | สูง/กลาง/ต่ำ | [........] |
```

---

## 📊 TECHNICAL FEASIBILITY (ความเป็นไปได้ทางเทคนิค)

```markdown
| ด้าน | ความท้าทาย | ความเป็นไปได้ | วิธีพิสูจน์ |
| :--- | :--- | :--- | :--- |
| **Hardware Integration** | [........] | ✅/⚠️/❌ | [........] |
| **AI Model Size** | [........] | ✅/⚠️/❌ | [........] |
| **Real-time Performance** | [........] | ✅/⚠️/❌ | [........] |
| **Power Consumption** | [........] | ✅/⚠️/❌ | [........] |
| **Connectivity** | [........] | ✅/⚠️/❌ | [........] |
```

---

# 📌 PART 5: DEMO STRATEGY

## 🎬 Demo Flow (5-7 นาที)

```markdown
1. **Opening Hook (1 นาที):** [เล่า Scenario ที่สะเทือนอารมณ์]
2. **Problem Statement (1 นาที):** [ตัวเลข + ภาพที่น่าตกใจ]
3. **Solution Reveal (2 นาที):** [โชว์ Prototype ทำงานจริงครั้งแรก]
4. **Technical Highlight (1.5 นาที):** [โชว์ส่วนที่เจ๋งที่สุด]
5. **Impact & Future (1 นาที):** [ถ้าขยายผลจะเกิดอะไร]
6. **Closing (0.5 นาที):** [Tagline ที่ฝังใจ]
```

## Demo Props ที่ต้องมี

```markdown
- [ ] Prototype ที่ทำงานได้จริง (ไม่ใช่แค่ Slide)
- [ ] Dashboard / Mobile App ที่แสดงผล Real-time
- [ ] ข้อมูลเปรียบเทียบ Before/After
- [ ] วีดีโอสั้น Backup (เผื่ออุปกรณ์พัง)
- [ ] แผนภาพ System Architecture (ขนาด A1)
```

## Marketing opportunity

- สรุปโอกาสทางธุรกิจ
- ผลกระทบทางบวก และ โอกาสความสำเร็จ
---

# 📌 PART 6: Q&A PREPARATION

## คำถามที่กรรมการมักถาม (พร้อมคำตอบต้นแบบ)

```markdown
| คำถามกรรมการ | คำตอบที่ชาญฉลาด |
| :--- | :--- |
| *"แล้วถ้า WiFi หลุดล่ะ?"* | "เราออกแบบระบบให้ทำงานแบบ Offline-first ทุกการตัดสินใจเกิดขึ้นที่ Edge (ESP32) โดยส่งข้อมูลขึ้น Cloud แค่เพื่อเก็บสถิติเท่านั้น ถ้า WiFi หลุด ระบบยังทำงานได้ปกติ และจะ Sync ข้อมูลอัตโนมัติเมื่อเชื่อมต่อได้ใหม่" |
| *"ราคาเท่าไหร่? ขายได้จริงไหม?"* | "ต้นทุน Prototype อยู่ที่ [XX] บาท ถ้าผลิตจำนวน 1,000 ชิ้น จะลดเหลือ [XX] บาท ซึ่งต่ำกว่าคู่แข่งในตลาดถึง [XX]% โดยกลุ่มเป้าหมายแรกคือ [........] ที่มีความพร้อมในการซื้อ" |
| *"ต่างจากของที่มีอยู่แล้วยังไง?"* | "ของที่มีอยู่ใช้ [เทคโนโลยีเก่า] ซึ่งมีข้อจำกัดเรื่อง [........] ในขณะที่เรามี [นวัตกรรมใหม่] ที่ช่วยให้ [........] ซึ่งเป็นจุดที่ไม่มีใครทำมาก่อน" |
| *"ทำไมต้องใช้ AI? ใช้ If-Else ก็ได้?"* | "เพราะพฤติกรรมของปัญหานี้ไม่เป็นเส้นตรง (Non-linear) และมี Pattern ที่ซับซ้อนเกินกว่ากฏเกณฑ์ตายตัวจะจัดการได้ เช่น [ยกตัวอย่าง] AI จะเรียนรู้ Pattern เหล่านี้ได้โดยอัตโนมัติ" |
| *"ถ้าเซ็นเซอร์เสียจะทำยังไง?"* | "เราใช้ Sensor Fusion และมีระบบ Self-Diagnostic ที่ตรวจสอบสุขภาพเซ็นเซอร์ทุก [XX] วินาที ถ้าเซ็นเซอร์ตัวไหนผิดปกติ ระบบจะแจ้งเตือนทันทีและใช้ค่าเฉลี่ยจากเซ็นเซอร์ตัวอื่นแทน" |
```

---

# 📌 PART 7: PROJECT SUMMARY CARD (หนึ่งหน้ากระชับสำหรับกรรมการ)

```markdown
## 🏷️ PROJECT SUMMARY CARD

| หัวข้อ | รายละเอียด |
| :--- | :--- |
| **ชื่อโปรเจกต์** | [........] |
| **Tagline** | [........] |
| **ปัญหาที่แก้** | [........] |
| **กลุ่มเป้าหมาย** | [........] |
| **เทคโนโลยีหลัก** | [........] |
| **จุดเด่น (USP)** | 1. [........] <br> 2. [........] <br> 3. [........] |
| **KPI สำเร็จ** | [........] |
| **ต้นทุน Prototype** | [........] บาท |
| **ทีมงาน** | [........] |
```

---

# 📌 PART 8: ACTION PLAN (4 สัปดาห์)

```markdown
## 🗓️ 4-Week Development Plan

| สัปดาห์ | เป้าหมาย | งานหลัก | Deliverable |
| :---: | :--- | :--- | :--- |
| **Week 1** | Research & Design | - ศึกษา Sensor ที่เหมาะสม <br> - ออกแบบ System Architecture <br> - เลือก MCU และ AI Model | System Architecture Diagram, BOM |
| **Week 2** | Hardware Assembly | - ประกอบวงจร <br> - ทดสอบ Sensor แต่ละตัว <br> - ตั้งค่า Communication | Prototype บน Breadboard ทำงานได้ |
| **Week 3** | Software & AI | - เขียน Firmware <br> - เทรนและ Deploy AI Model <br> - เชื่อมต่อ Dashboard | AI ทำงานบน MCU ได้, Dashboard แสดงผล |
| **Week 4** | Integration & Polish | - รวม Hardware+Software <br> - ทดสอบระบบเต็มรูปแบบ <br> - ฝึก Demo + ทำ Presentation | MVP ที่ใช้งานได้, Slide, Poster |
```

---

# 📌 PART 9: BUDGET & RESOURCES

## 💰 Budget Estimation

```markdown
| รายการ | รายละเอียด | จำนวน | ราคาต่อหน่วย | รวม |
| :--- | :--- | :---: | :---: | :---: |
| MCU | [ESP32/ESP8266/RP2040] | 1 | XX บาท | XX บาท |
| Sensor | [........] | 1 | XX บาท | XX บาท |
| Actuator | [........] | 1 | XX บาท | XX บาท |
| Communication | [........] | 1 | XX บาท | XX บาท |
| Power | [........] | 1 | XX บาท | XX บาท |
| อื่นๆ | [........] | 1 | XX บาท | XX บาท |
| **รวมทั้งสิ้น** | | | | **XX บาท** |
```

## 📚 References
ให้ตรวจสอบ ว่าเป็น แหล่งมา จริงเท่านั้น ห้ามคิดเอง
```markdown
- [TensorFlow Lite Micro Documentation](https://www.tensorflow.org/lite/micro)
- [Edge Impulse Documentation](https://docs.edgeimpulse.com/)
- [ESP32 Technical Reference](https://www.espressif.com/en/products/socs/esp32)
- [LoRa/LoRaWAN Specification](https://lora-alliance.org/resource-hub)
```

---

# 📌 PART 10: TEAM INFORMATION

```markdown
## 👥 Team Information

| บทบาท | ชื่อ | ความรับผิดชอบ | ทักษะที่เกี่ยวข้อง |
| :--- | :--- | :--- | :--- |
| **Team Leader** | [........] | วางแผน, ประสานงาน, นำเสนอ | Project Management, Communication |
| **Hardware Engineer** | [........] | วงจร, Sensor, Power | Electronics, PCB Design, Soldering |
| **Embedded Developer** | [........] | Firmware, MCU Programming | C/C++, Arduino/ESP-IDF, RTOS |
| **AI/ML Engineer** | [........] | Data, Model Training, Deployment | Python, TensorFlow, Edge Impulse |
| **UI/UX Designer** | [........] | Dashboard, Mobile App, Presentation | Figma, Frontend, Graphic Design |
```

# ตัวอย่าง Source สำหรับ การสร้างต้นแบบ

```
- ตัวอย่าง Arduino Code พร้อมสรุป library ตาม Sensor ที่ได้ออกแบบ
- ตัวอย่าง infra structure stack
```

# สร้าง System Archinecture diagrame 
```
- สร้าง system architecture design ด้วย SVG
- ออกแบบ Database สำหรับการเก็บข้อมูล ใน Cloud
```