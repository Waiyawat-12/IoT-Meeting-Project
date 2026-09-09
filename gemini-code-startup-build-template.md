# 🏆 AI + IoT + Embedded Systems Innovation Prototype
## Competition Framework: 5W1H + 5 Why 

เป้าหมายเพื่อสร้าง โอกาสทางธุรกิจ Startup

---

# 📌 PART 1: PROJECT OVERVIEW

## โปรเจกต์: RigGuard AI
**Tagline:** บอกลาเครื่องดับกลางทัวร์นาเมนต์ ด้วย AI ที่รู้ทันความร้อนก่อนที่การ์ดจอจะพัง
**ประเภทปัญหาที่แก้:** Smart City / Event Management 
**ระดับความพร้อม:** ไอเดีย (Idea Stage)

---

# 📌 PART 2: 5W1H FRAMEWORK

## 1. WHO (ใคร)
- ผู้ใช้หลัก (Primary User): สตาฟดูแลระบบและออร์แกไนเซอร์จัดการแข่งขัน eSports
- ผู้ได้รับผลกระทบทางอ้อม (Secondary): นักกีฬา eSports ที่กำลังแข่งขัน
- ผู้ตัดสินใจซื้อ/ติดตั้ง (Decision Maker): มหาวิทยาลัย, บริษัทรับจัดงาน eSports
- ผู้ดูแลระบบ (Maintainer): ทีม IT Support ของงาน
- ผู้มีส่วนได้ส่วนเสีย (Stakeholders): สปอนเซอร์งานแข่งขัน, ผู้ชมทางบ้าน

---

## 2. WHAT (อะไร)
- **ตรวจจับ/วัด (Sensing):** 
  - Sensor: MLX90614 (วัดอุณหภูมิผิววัสดุแบบไร้สัมผัส), DHT22 (อุณหภูมิแวดล้อม), INA219 (กระแสไฟ/โหลด)
  - Data Type: Digital (I2C)
  - Accuracy Requirement: ความคลาดเคลื่อนไม่เกิน ±0.5 องศาเซลเซียส
  
- **ประมวลผล (Processing):** 
  - Edge หรือ Cloud: ประมวลผลหลักที่ Edge (ESP32) ควบคู่กับการส่งสถิติขึ้น Cloud
  - Algorithm/Model: Linear Regression / TinyML (Predictive Maintenance)
  - Output: Prediction (พยากรณ์เวลาที่อุณหภูมิจะถึงจุดวิกฤต)
  
- **ควบคุม (Actuation):** 
  - Actuator: Relay Module 
  - Control Logic: AI-based Predictive Control (สั่งเปิดพัดลมระบายอากาศเสริมก่อนที่อุณหภูมิจะถึงจุด Peak)
  
- **แจ้งเตือน (Notification):** 
  - ช่องทาง: Line Notify สำหรับสตาฟ และ Dashboard Monitor รวม
  - ระดับความเร่งด่วน: Warning (75°C) / Critical (90°C)

---

## 3. WHEN (เมื่อไหร่)
- ช่วงเวลาเกิดปัญหา: ขณะแข่งขันแมตช์สำคัญที่ฮาร์ดแวร์ทำงานหนัก (Full Load)
- ระยะเวลาที่ยอมรับได้ (Response Time): < 500 ms
- ความถี่ในการอ่านค่า (Sampling Rate): 1 Hz (1 ครั้งต่อวินาที)
- ความถี่ในการอัปเดต (Update Cycle): อัปเดตขึ้น Dashboard ทุกๆ 5 วินาที
- ระยะเวลาที่ระบบต้องทำงานต่อเนื่อง: 12-16 ชั่วโมงต่อวัน (ตลอดระยะเวลาจัดงาน)

---

## 4. WHERE (ที่ไหน)
- ตำแหน่งติดตั้ง: Indoor (ยึดติดกับเคสคอมพิวเตอร์นักกีฬา)
- สภาพแวดล้อม: ห้องแข่งขันที่มีเครื่องปรับอากาศ แต่มีจุดสะสมความร้อนที่โต๊ะแข่ง
- ระยะห่างจาก Gateway: 10 - 20 เมตร
- การสื่อสาร: WiFi 2.4GHz
- แหล่งจ่ายไฟ: USB / DC Adapter (5V)
- ข้อจำกัดด้านขนาด/น้ำหนัก: ต้องมีขนาดเล็กเท่าฝ่ามือ ไม่เกะกะพื้นที่แข่ง

---

## 5. WHY (ทำไม) - 5 Why Deep Dive
- Why 1 (ปัญหา): คอมพิวเตอร์นักกีฬา eSports ดับกลางการแข่งขัน
- Why 2 (ต้นตอ): การ์ดจอ (เช่น RTX 3050) รันหนักจนอุณหภูมิพุ่งทะลุ 90+ องศาเซลเซียส
- Why 3 (วิธีเดิมพัง): ระบบระบายความร้อนปกติเอาไม่อยู่ และสตาฟไม่รู้จนกว่าเครื่องจะดับไปแล้ว
- Why 4 (AI+IoT ตอบโจทย์): IoT ช่วยมอนิเตอร์ระดับฮาร์ดแวร์แบบ Real-time และ AI ช่วยทำนายล่วงหน้าว่าความร้อนกำลังจะเกินลิมิต 
- Why 5 (ทำไมตอนนี้): อุตสาหกรรม eSports ระดับมหาวิทยาลัยเติบโตมาก ความผิดพลาดทางเทคนิคส่งผลเสียต่อชื่อเสียงของออร์แกไนเซอร์อย่างร้ายแรง

---

## 6. HOW (อย่างไร) - Technical Architecture

### Hardware Stack
- MCU / SoC: ESP32
- Clock Speed: 240 MHz
- RAM / Flash: 520 KB SRAM / 4 MB Flash
- Sensor(s): MLX90614 (Infrared Temp), DHT22 (Ambient Temp)
- Actuator(s): 5V Relay Module (ต่อเข้ากับพัดลม External)
- Communication Module: Built-in WiFi
- Power Management: 5V Step-down Converter (LM2596)

### Software Stack
- Framework: ESP-IDF / Arduino IDE
- AI Framework: TensorFlow Lite Micro / Edge Impulse
- AI Model Type: Linear Regression / Random Forest (Time-series forecasting)
- Model Size: ~50 KB
- Inference Time: < 100 ms
- Protocol: MQTT / HTTP
- Cloud Platform: Firebase Realtime Database / Web Dashboard (Node.js/React)

### Data Pipeline
Data Collection (Sensors) → Preprocessing (ESP32) → Model Inference (Predict Next 5 Mins) → Decision → Actuation (Relay/Fan) → Feedback Loop (Update Cloud Dashboard)

---

# 📌 PART 3: 5 WHY + SCENARIO (ฉบับเล่าเรื่อง)

## WHY 1: ปัญหา (Problem Scenario)
- **Scenario:** รอบชิงชนะเลิศทัวร์นาเมนต์ eSports งานแข่งระดับมหาวิทยาลัย นักกีฬากำลังอยู่ในจังหวะชี้ชะตา 1v1 จู่ๆ หน้าจอก็ดำมืด เครื่องดับกลางคัน เสียงโห่ร้องจากผู้ชมดังลั่น สตาฟวิ่งหน้าตั้งแต่แก้ไขอะไรไม่ได้แล้ว แมตช์นั้นต้องหยุดชะงัก
- **คำถามหลัก:** ทำไมถึงต้องแก้ปัญหานี้?
- **Data/Evidence:** มูลค่าการจัดงานทัวร์นาเมนต์หลักแสนบาทอาจพังทลายลงเพียงเพราะฮาร์ดแวร์มีปัญหา 1 เครื่อง

## WHY 2: ต้นตอ (Root Cause Scenario)
- **Scenario:** เมื่อตรวจสอบพบว่า การ์ดจอ (เช่น RTX 3050) ต้องเรนเดอร์ภาพกราฟิกอย่างหนักหน่วงต่อเนื่องหลายชั่วโมง ทำให้อุณหภูมิ GPU สะสมพุ่งทะลุ 90++ องศา ระบบป้องกันตัวเองของ Mainboard จึงตัดไฟทันทีเพื่อไม่ให้ฮาร์ดแวร์ไหม้
- **คำถามหลัก:** ทำไมสาเหตุนั้นถึงเกิดขึ้น?
- **Insight:** ฮาร์ดแวร์ทำงานปกติ แต่ "สภาพแวดล้อมเฉพาะจุด" บริเวณโต๊ะแข่งที่มีฉากกั้น ทำให้การระบายอากาศไม่ดีพอ

## WHY 3: วิธีเดิมพัง (Failure Scenario)
- **Scenario:** ปกติสตาฟจะใช้วิธีเดินเช็กหรือให้คนพากย์คอยสังเกตอาการกระตุกของภาพ แต่ความร้อนมันพุ่งขึ้นแบบทวีคูณ (Exponential) ภายในไม่กี่นาที กว่ามนุษย์จะสังเกตเห็น เครื่องก็ตัดการทำงานไปแล้ว
- **คำถามหลัก:** ทำไมวิธีแก้เดิมถึงใช้ไม่ได้?
- **Gap Analysis:** มนุษย์ไม่สามารถมอนิเตอร์ฮาร์ดแวร์ทุกเครื่องตลอดเวลาได้แบบ Real-time ขาดระบบเตือนภัยล่วงหน้า (Early Warning)

## WHY 4: AI+IoT เข้ามาช่วย (Solution Scenario)
- **Scenario:** เราติดอุปกรณ์ขนาดเท่ากล่องไม้ขีดไฟไว้ที่เคสคอมพิวเตอร์ เซ็นเซอร์จะอ่านอุณหภูมิทุกวินาที ส่งเข้า AI โมเดลบน ESP32 เมื่อ AI คำนวณความชันของกราฟความร้อนแล้วพบว่า "อีก 3 นาที อุณหภูมิจะแตะ 90 องศา" ระบบจะเปิดพัดลมเสริมภายนอกทันที พร้อมยิงแจ้งเตือนเข้ามือถือสตาฟ 
- **คำถามหลัก:** ทำไมต้องใช้เทคโนโลยีนี้ (ไม่ใช่วิธีอื่น)?
- **Innovation Highlight:** ไม่ใช่แค่การอ่านค่า (Reactive) แต่เป็นการ "พยากรณ์ล่วงหน้า" (Proactive Predictive Maintenance) โดยไม่ต้องพึ่งอินเทอร์เน็ตในการตัดสินใจ (Edge AI)

## WHY 5: ทำไมต้องตอนนี้ (Urgency Scenario)
- **Scenario:** งานแข่ง eSports กำลังเพิ่มขึ้นทุกปี สถาบันการศึกษาและบริษัทต่างๆ หันมาจัดแข่งเองมากขึ้น หากออร์แกไนเซอร์ไหนไม่มีระบบรับประกันเสถียรภาพของเครื่องแข่ง ก็จะเสียความน่าเชื่อถือ
- **คำถามหลัก:** ทำไมถึงต้องรีบทำวันนี้? ถ้ารออีก 1-3 ปีจะเกิดอะไร?
- **Market Timing:** นี่คือยุคทองของ eSports ท้องถิ่น ใครที่สามารถนำเสนอ "บริการดูแลโครงสร้างพื้นฐานไร้รอยต่อ" ได้ก่อน จะได้ส่วนแบ่งตลาดออร์แกไนเซอร์ไปครอง

## HOW: ต้นแบบที่ใช้งานได้ (Demo Scenario)
- **Scenario:** บนเวทีจะมีการจำลองเครื่องคอมที่กำลังรัน Benchmark หนักๆ กราฟอุณหภูมิใน Dashboard พุ่งขึ้น เมื่อระบบพยากรณ์ว่าอุณหภูมิจะถึงจุดอันตราย ไฟแจ้งเตือนสีแดงจะกระพริบ และพัดลมสำรองบนโต๊ะจะติดขึ้นอัตโนมัติ ทำให้กราฟอุณหภูมิลดลงก่อนจะถึงจุดดับ 
- **Hardware Details:** ESP32 + เซ็นเซอร์อุณหภูมิ + Relay ตัดต่อพัดลม 
- **Software Details:** Web Dashboard แบบ Real-time พัฒนาด้วย Full-stack framework แทร็กอุณหภูมิทุกเครื่องพร้อมกัน
- **KPI / Success Metrics:** สามารถป้องกันเครื่องโอเวอร์ฮีตได้ 100% ในสภาพแวดล้อมจำลอง

---

# 📌 PART 4: COMPETITION EDGE

## 🎯 UNIQUE SELLING POINT (USP) - ทำไมทีมเราต้องชนะ?
| มิติ | จุดแข็งของเรา | เมื่อเทียบกับคู่แข่ง |
| :--- | :--- | :--- |
| **ต้นทุน (Cost)** | ต่ำกว่า 1,000 บาท/จุด | ต่ำกว่าระบบเซิร์ฟเวอร์มอนิเตอร์ 80% |
| **ความเร็ว (Speed)** | พยากรณ์ล่วงหน้า 3 นาที | เร็วกว่าซอฟต์แวร์ที่เตือนตอนร้อนแล้ว |
| **ความเป็นเอกลักษณ์ (Novelty)** | เป็นระบบเสริมภายนอก ไม่ต้องลงโปรแกรมในเครื่องแข่ง | ไม่มีใครทำมาก่อน (ปกติใช้ซอฟต์แวร์ฝังเครื่อง ซึ่งนักกีฬาไม่ชอบ) |

## ⚠️ RISK & MITIGATION (ความเสี่ยงและแผนรับมือ)
| ความเสี่ยง | โอกาสเกิด | ผลกระทบ | แผนรับมือ (Mitigation) |
| :--- | :--- | :--- | :--- |
| 1. WiFi งานแข่งล่ม | ปานกลาง | ต่ำ | ระบบ AI รันบน Edge (ESP32) ต่อให้เน็ตหลุด ระบบระบายความร้อนยังทำงานได้ |
| 2. โมเดล AI ไม่แม่นยำ | ปานกลาง | ปานกลาง | เทรนโมเดลด้วย Dataset ที่เก็บจากเคสรุ่นที่ใช้แข่งจริงในห้องแอร์ |

## 📊 TECHNICAL FEASIBILITY (ความเป็นไปได้ทางเทคนิค)
| ด้าน | ความท้าทาย | ความเป็นไปได้ | วิธีพิสูจน์ |
| :--- | :--- | :--- | :--- |
| **AI Model Size** | การรันโมเดลบน ESP32 | ✅ | ใช้ TensorFlow Lite Micro ขนาดเล็ก |
| **Real-time Performance** | อ่านค่าพร้อมพยากรณ์ | ✅ | ความถี่ 1Hz ไมโครคอนโทรลเลอร์ทำงานสบายๆ |

---

# 📌 PART 5: DEMO STRATEGY

## 🎬 Demo Flow (5-7 นาที)
1. **Opening Hook (1 นาที):** เล่าเหตุการณ์ช็อกโลกที่เครื่องดับกลางงานแข่งมูลค่าแสนบาท
2. **Problem Statement (1 นาที):** โชว์สถิติอุณหภูมิ GPU 90+ องศาที่ขึ้นไวแบบก้าวกระโดด
3. **Solution Reveal (2 นาที):** เปิดตัว RigGuard AI อุปกรณ์กล่องเล็กๆ ที่ติดข้างเคส พร้อมโชว์รัน Benchmark เดโม่ให้ดู
4. **Technical Highlight (1.5 นาที):** ชี้ให้เห็นว่าพัดลมทำงาน "ก่อน" ที่ความร้อนจะวิกฤต เพราะ AI ทำงานบน Edge
5. **Impact & Future (1 นาที):** โอกาสขยายไปสู่ร้านอินเทอร์เน็ตคาเฟ่ หรือ Data Center ขนาดเล็ก
6. **Closing (0.5 นาที):** "RigGuard AI ปกป้องฮาร์ดแวร์ของคุณ เพื่อให้นักกีฬาโฟกัสแค่ชัยชนะ"

## Marketing opportunity
- สรุปโอกาสทางธุรกิจ: นำเสนอขายเป็นโซลูชันเช่าเหมา (Hardware-as-a-Service) พ่วงกับการรับจัดงานแข่งขัน eSports ของมหาวิทยาลัยต่างๆ 
- ผลกระทบทางบวก: สร้างมาตรฐานใหม่ให้วงการ eSports ลดภาระสตาฟ และยืดอายุการใช้งานคอมพิวเตอร์

---

# 📌 PART 6: Q&A PREPARATION

## คำถามที่กรรมการมักถาม (พร้อมคำตอบต้นแบบ)
| คำถามกรรมการ | คำตอบที่ชาญฉลาด |
| :--- | :--- |
| *"ถ้า WiFi หลุดล่ะ?"* | "เราออกแบบระบบให้ทำงานแบบ Offline-first ทุกการตัดสินใจเกิดขึ้นที่ Edge (ESP32) ถ้า WiFi หลุด พัดลมและการเตือนหน้าเครื่องยังทำงานได้ปกติ" |
| *"ทำไมไม่ลงโปรแกรมเช็กความร้อนในเครื่องเลยล่ะ?"* | "นักกีฬา eSports มีกฏเหล็กเรื่องห้ามลงซอฟต์แวร์แปลกปลอม (Anti-cheat) การใช้อุปกรณ์ IoT จับความร้อนภายนอกเคส/ลมออก จึงปลอดภัยจากกฏนี้ 100%" |
| *"ทำไมต้องใช้ AI? ใช้ If-Else วัดอุณหภูมิเอาไม่ได้เหรอ?"* | "If-Else จะทำงานเมื่อร้อนเกินไปแล้ว (Reactive) แต่ความร้อนของ GPU พุ่งแบบ Non-linear AI จะช่วยคำนวณแนวโน้มและสั่งทำงานล่วงหน้า (Proactive) เพื่อสกัดความร้อนไม่ให้ถึงจุด Peak ครับ" |

---

# 📌 PART 7: PROJECT SUMMARY CARD 

## 🏷️ PROJECT SUMMARY CARD
| หัวข้อ | รายละเอียด |
| :--- | :--- |
| **ชื่อโปรเจกต์** | RigGuard AI |
| **Tagline** | บอกลาเครื่องดับกลางทัวร์นาเมนต์ ด้วย AI ที่รู้ทันความร้อนก่อนการ์ดจอพัง |
| **ปัญหาที่แก้** | สภาพแวดล้อมและการจัดการความร้อนฮาร์ดแวร์ในงาน eSports |
| **เทคโนโลยีหลัก** | ESP32, Edge Impulse (TinyML), IoT Dashboard |
| **จุดเด่น (USP)** | ทำงานล่วงหน้าด้วย AI (Predictive), ไม่ต้องติดตั้งซอฟต์แวร์ลงเครื่องแข่ง |
| **ต้นทุน Prototype** | ประมาณ 950 บาท / โหนด |

---

# 📌 PART 8: ACTION PLAN (4 สัปดาห์)

## 🗓️ 4-Week Development Plan
| สัปดาห์ | เป้าหมาย | งานหลัก | Deliverable |
| :---: | :--- | :--- | :--- |
| **Week 1** | Research & Design | - ซื้อ ESP32 และเซ็นเซอร์วัดอุณหภูมิ<br>- ออกแบบสถาปัตยกรรมระบบ | สเปกอุปกรณ์, BOM, แผนภาพระบบ |
| **Week 2** | Hardware Assembly | - ประกอบวงจรรับค่าความร้อน<br>- เก็บ Data ชุดแรกตอนรันเกม | ชุดข้อมูล (Dataset) อุณหภูมิ GPU |
| **Week 3** | Software & AI | - เขียนโมเดล Machine Learning (Python)<br>- พัฒนาหน้า Dashboard | โมเดล TinyML บรรจุลง MCU |
| **Week 4** | Integration & Polish | - เชื่อมต่อ Web Dashboard<br>- ทดสอบจำลองสถานการณ์เครื่องดับ | MVP พร้อมใช้งาน, สไลด์พรีเซนต์ |

---

# 📌 PART 9: BUDGET & RESOURCES

## 💰 Budget Estimation
| รายการ | รายละเอียด | จำนวน | ราคาต่อหน่วย | รวม |
| :--- | :--- | :---: | :---: | :---: |
| MCU | NodeMCU ESP32 | 1 | 150 บาท | 150 บาท |
| Sensor | MLX90614 (IR Temp) | 1 | 250 บาท | 250 บาท |
| Sensor | DHT22 (Ambient Temp) | 1 | 100 บาท | 100 บาท |
| Actuator | 5V Relay Module | 1 | 50 บาท | 50 บาท |
| อื่นๆ | สายไฟ, Case 3D Print, Adapter | 1 | 400 บาท | 400 บาท |
| **รวมทั้งสิ้น** | | | | **950 บาท** |

## 📚 References
- [Edge Impulse Documentation](https://docs.edgeimpulse.com/)
- [ESP32 Technical Reference](https://www.espressif.com/en/products/socs/esp32)
- [MLX90614 Datasheet](https://www.melexis.com/en/product/MLX90614/Digital-Plug-Play-Infrared-Thermometer-TO-Can)

---

# 📌 PART 10: TEAM INFORMATION

## 👥 Team Information (ออกแบบสำหรับระบบนี้โดยเฉพาะ)
| บทบาท | ความรับผิดชอบ | ทักษะที่เกี่ยวข้อง |
| :--- | :--- | :--- |
| **Team Leader / Event Ops** | วางแผนงาน, วิเคราะห์ Requirement งานแข่ง, นำเสนอ | Project Management, eSports Tournament Logic |
| **AI/ML Engineer** | เทรนโมเดลทำนายความร้อน, วิเคราะห์ Dataset | Python (Machine Learning), Data Structures |
| **Embedded Developer** | เขียน Firmware, ดึงค่าเซ็นเซอร์ | C/C++, ESP32, Arduino IDE |
| **Full-stack Web Dev** | สร้าง Dashboard สำหรับสตาฟ, จัดการ Database | Node.js, React, HTML/CSS/JS |
| **Hardware Engineer** | ต่อวงจร, ออกแบบเคสติดตั้ง | Electronics, Circuit Design, 3D Printing |

---

# ตัวอย่าง Source สำหรับ การสร้างต้นแบบ

**ตัวอย่าง Arduino Code (อ่านค่าอุณหภูมิ MLX90614 + DHT22 และเชื่อมต่อ WiFi/MQTT):**
```cpp
#include <Wire.h>
#include <Adafruit_MLX90614.h> // Library สำหรับ MLX90614
#include <DHT.h>             // Library สำหรับ DHT22

#define DHTPIN 4
#define DHTTYPE DHT22

Adafruit_MLX90614 mlx = Adafruit_MLX90614();
DHT dht(DHTPIN, DHTTYPE);

void setup() {
  Serial.begin(115200);
  
  if (!mlx.begin()) {
    Serial.println("Error connecting to MLX sensor. Check wiring.");
    while (1);
  };
  
  dht.begin();
  Serial.println("Sensors initialized.");
}

void loop() {
  float gpu_case_temp = mlx.readObjectTempC();
  float ambient_temp = dht.readTemperature();
  
  Serial.print("Case Temp: "); Serial.print(gpu_case_temp); Serial.println(" C");
  Serial.print("Ambient Temp: "); Serial.print(ambient_temp); Serial.println(" C");
  
  // โค้ดส่วนนี้จะส่งค่าเข้าสู่ฟังก์ชัน Inference ของ Edge Impulse ในอนาคต
  
  delay(1000); // อ่านค่าทุกๆ 1 วินาที
}