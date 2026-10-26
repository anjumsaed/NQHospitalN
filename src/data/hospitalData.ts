import { Doctor, Department, Patient, Appointment } from '../types/hospital';

export const HOSPITAL_INFO = {
  name: "Naila Qaisar Hospital",
  tagline: "Center of Excellence in Maternal, Surgical & Family Health",
  location: "Grand Trunk (G.T.) Road, Near Qasim Marriage Hall, Lalamusa, Gujrat, Punjab, Pakistan",
  city: "Lalamusa, Gujrat",
  phonePrimary: "053-7517700",
  phoneEmergency: "053-7517700",
  whatsapp: "+92 333 7004949",
  whatsappRaw: "923337004949",
  email: "info@nailaqaisarhospital.com",
  timings: "24/7 Emergency & Inpatient Services | OPD: 09:00 AM - 09:30 PM",
  ambulanceHelpline: "053-7517700 / 0333-7004949",
  establishedYear: 2008,
};

export const DEPARTMENTS: Department[] = [
  {
    id: "gynae-obs",
    name: "Obstetrics & Gynecology",
    iconName: "Baby",
    description: "Comprehensive antenatal care, high-risk pregnancy management, normal delivery, painless labor, Caesarean section, and advanced gynecological laparoscopy.",
    headDoctor: "Dr. Naila Qaisar",
    services: [
      "Normal & Caesarean Delivery (C-Section)",
      "High-Risk Pregnancy Clinic",
      "Painless Labor (Epidural Analgesia)",
      "Antenatal & Postnatal Care",
      "Infertility & Reproductive Health",
      "Gynecological Laparoscopic Surgery",
      "Cervical Screening & Colposcopy"
    ]
  },
  {
    id: "general-surgery",
    name: "General & Laparoscopic Surgery",
    iconName: "Scissors",
    description: "Minimally invasive laparoscopic surgeries, gallbladder stones, hernia repairs, appendix, thyroid, breast surgery, and emergency trauma operations.",
    headDoctor: "Dr. Muhammad Qaisar",
    services: [
      "Laparoscopic Cholecystectomy (Gallbladder)",
      "Laparoscopic & Open Hernia Repair",
      "Laparoscopic Appendectomy",
      "Thyroidectomy & Endocrine Surgery",
      "Breast Lump & Oncology Care",
      "Piles, Fistula & Fissure Treatment",
      "Trauma & Emergency Wound Repair"
    ]
  },
  {
    id: "pediatrics",
    name: "Pediatrics & Neonatal Care",
    iconName: "HeartPulse",
    description: "Dedicated neonatal intensive care (phototherapy, incubators), infant vaccination, growth monitoring, childhood respiratory infections, and pediatric emergencies.",
    headDoctor: "Dr. Ayesha Tariq",
    services: [
      "Neonatal Incubator & Phototherapy Unit",
      "Childhood Vaccination & Immunization",
      "Pediatric Asthma & Bronchiolitis Care",
      "Malnutrition & Pediatric Growth Tracking",
      "Pediatric Emergency Resuscitation",
      "Newborn Routine Screening"
    ]
  },
  {
    id: "orthopedics",
    name: "Orthopedics & Trauma Surgery",
    iconName: "Bone",
    description: "Expert bone fracture reduction, joint replacements, arthroscopic care, spine disorders, sports injuries, and arthritis rehabilitation.",
    headDoctor: "Dr. Farooq Ahmed",
    services: [
      "Fracture Fixation & Plaster Application",
      "Joint Replacement (Knee & Hip)",
      "Arthroscopic Knee Ligament Reconstruction",
      "Spinal Disc Herniation & Sciatica",
      "Osteoarthritis & Rheumatoid Care",
      "Pediatric Orthopedics & Clubfoot"
    ]
  },
  {
    id: "internal-medicine",
    name: "Internal Medicine & Diabetes",
    iconName: "Activity",
    description: "Comprehensive prevention and treatment of diabetes mellitus, hypertension, cardiovascular conditions, hepatitis, respiratory and gastrointestinal diseases.",
    headDoctor: "Dr. Zeeshan Ali",
    services: [
      "Diabetes Comprehensive Management & Diabetic Foot",
      "Hypertension & Cardiovascular Health",
      "Hepatitis B & C Screening & Management",
      "Gastrointestinal & Liver Disorders",
      "Asthma & COPD Management",
      "Fever & Infectious Disease Protocol"
    ]
  },
  {
    id: "radiology-lab",
    name: "Diagnostic Laboratory & Ultrasound",
    iconName: "Scan",
    description: "State-of-the-art automated clinical hematology, biochemistry, digital color Doppler ultrasound, 4D anomaly scans, and digital X-rays with fast turnaround.",
    headDoctor: "Dr. Sadia Noreen",
    services: [
      "4D Anomaly Scan & Obstetric Ultrasound",
      "Abdominal & Pelvic Color Doppler",
      "Digital High-Frequency X-Ray",
      "Automated Hematology & Complete Blood Count (CBC)",
      "Liver & Renal Function Tests (LFTs / RFTs)",
      "HbA1c & Fasting Lipid Profile",
      "Hormone Assays & Thyroid Panel"
    ]
  }
];

export const DOCTORS: Doctor[] = [
  {
    id: "dr-naila-qaisar",
    name: "Dr. Naila Qaisar",
    title: "Chief Consultant Obstetrician & Gynecologist",
    qualification: "MBBS (Pb), FCPS (Obstetrics & Gynecology), Fellow Maternal-Fetal Medicine",
    departmentId: "gynae-obs",
    departmentName: "Obstetrics & Gynecology",
    experienceYears: 18,
    consultationFee: 2000,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timingMorning: "09:30 AM - 01:30 PM",
    timingEvening: "05:00 PM - 09:00 PM",
    roomNo: "Consultation Suite 01 (Executive Floor)",
    avatarUrl: "https://images.unsplash.com/photo-1594824813586-7a7027d191c9?auto=format&fit=crop&q=80&w=400",
    specialties: ["High-Risk Pregnancy", "C-Section & Normal Delivery", "Laparoscopic Gynaecology", "Infertility Management"],
    bio: "Dr. Naila Qaisar is the founder and chief gynecologist at Naila Qaisar Hospital. With over 18 years of clinical excellence in Gujrat district, she is renowned for her compassionate care in maternal-fetal medicine, painless deliveries, and advanced gynecological surgeries."
  },
  {
    id: "dr-muhammad-qaisar",
    name: "Dr. Muhammad Qaisar",
    title: "Consultant Laparoscopic & General Surgeon",
    qualification: "MBBS, FCPS (Surgery), FMAS (Minimal Access Surgery), Member SAGES",
    departmentId: "general-surgery",
    departmentName: "General & Laparoscopic Surgery",
    experienceYears: 20,
    consultationFee: 1800,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timingMorning: "10:00 AM - 01:30 PM",
    timingEvening: "05:30 PM - 09:30 PM",
    roomNo: "Surgical Consultation Room 03",
    avatarUrl: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400",
    specialties: ["Laparoscopic Cholecystectomy", "Hernia Mesh Repair", "Appendix & Colorectal", "Trauma Emergencies"],
    bio: "Senior consultant laparoscopic and general surgeon with two decades of surgical experience performing thousands of successful laparoscopic gallbladder, hernia, and acute abdominal interventions."
  },
  {
    id: "dr-farooq-ahmed",
    name: "Dr. Farooq Ahmed",
    title: "Consultant Orthopedic & Trauma Surgeon",
    qualification: "MBBS, MS (Orthopedics), Fellowship Joint Replacement",
    departmentId: "orthopedics",
    departmentName: "Orthopedics & Trauma Surgery",
    experienceYears: 14,
    consultationFee: 1500,
    availableDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    timingMorning: "11:00 AM - 02:00 PM",
    timingEvening: "06:00 PM - 09:30 PM",
    roomNo: "Orthopedic Clinic Room 05",
    avatarUrl: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=400",
    specialties: ["Complex Bone Fractures", "Spine Disc Surgery", "Joint Replacements", "Arthroscopy & Sports Injury"],
    bio: "Specialist in trauma care, fracture fixation, spinal compression relief, and degenerative joint diseases with state-of-the-art C-Arm guided procedures."
  },
  {
    id: "dr-ayesha-tariq",
    name: "Dr. Ayesha Tariq",
    title: "Consultant Pediatrician & Child Health Specialist",
    qualification: "MBBS, MCPS (Pediatrics), DCH (Child Health), Neonatal Resuscitation Certified",
    departmentId: "pediatrics",
    departmentName: "Pediatrics & Neonatal Care",
    experienceYears: 12,
    consultationFee: 1500,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timingMorning: "09:00 AM - 01:00 PM",
    timingEvening: "05:00 PM - 08:30 PM",
    roomNo: "Pediatric Clinic Room 02",
    avatarUrl: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=400",
    specialties: ["Newborn Care & Incubator", "Vaccination Programs", "Childhood Chest Infections", "Nutritional Disorders"],
    bio: "Dedicated child specialist ensuring gentle, evidence-based care for infants, toddlers, and adolescents, supervising the hospital's nursery and vaccination center."
  },
  {
    id: "dr-zeeshan-ali",
    name: "Dr. Zeeshan Ali",
    title: "Consultant Physician & Diabetologist",
    qualification: "MBBS, FCPS (Internal Medicine), Diploma in Diabetes (UK)",
    departmentId: "internal-medicine",
    departmentName: "Internal Medicine & Diabetes",
    experienceYears: 15,
    consultationFee: 1500,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timingMorning: "09:00 AM - 01:00 PM",
    timingEvening: "05:00 PM - 09:00 PM",
    roomNo: "Medical OPD Room 04",
    avatarUrl: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&q=80&w=400",
    specialties: ["Type 1 & Type 2 Diabetes", "Hypertension & Heart Health", "Gastrointestinal Disorders", "Infectious Fevers"],
    bio: "Specialist physician dedicated to preventive and therapeutic medicine, personalized glycemic management, and chronic illness stabilization."
  },
  {
    id: "dr-sadia-noreen",
    name: "Dr. Sadia Noreen",
    title: "Consultant Sonologist & Radiologist",
    qualification: "MBBS, DMRD (Radiology & Imaging), Member Radiological Society of Pakistan",
    departmentId: "radiology-lab",
    departmentName: "Diagnostic Laboratory & Ultrasound",
    experienceYears: 11,
    consultationFee: 1200,
    availableDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    timingMorning: "09:30 AM - 02:00 PM",
    timingEvening: "05:00 PM - 08:30 PM",
    roomNo: "Ultrasound & Imaging Suite",
    avatarUrl: "https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=400",
    specialties: ["Anomaly Scan", "Obstetric Color Doppler", "Pelvic & TVS Ultrasonography", "Small Parts & Thyroid USG"],
    bio: "Expert imaging consultant with specialized expertise in high-resolution fetal anomaly detection, Doppler blood-flow studies, and abdominal ultrasound."
  }
];

export const INITIAL_PATIENTS: Patient[] = [
  {
    mrn: "NQH-2024-1042",
    name: "Fatima Bibi",
    age: 29,
    gender: "Female",
    phone: "0333-7004949",
    cnic: "34201-4458921-2",
    bloodGroup: "B Positive (B+)",
    address: "Mohallah Qasimabad, Near G.T. Road",
    city: "Lalamusa",
    emergencyContact: {
      name: "Tariq Mehmood",
      relation: "Husband",
      phone: "0300-8812349"
    },
    allergies: ["Penicillin (Rash)"],
    chronicConditions: ["Gestational Anemia (Mild)"],
    visits: [
      {
        id: "VIS-2026-0811",
        visitDate: "2026-10-20",
        doctorId: "dr-naila-qaisar",
        doctorName: "Dr. Naila Qaisar",
        departmentName: "Obstetrics & Gynecology",
        visitType: "Antenatal Checkup",
        chiefComplaint: "Third-trimester routine antenatal follow-up, mild pedal edema, fatigue.",
        clinicalDiagnosis: "G2 P1 at 32 Weeks Gestation. Mild Iron Deficiency Anemia. Fetal growth concordant.",
        doctorNotes: "Uterine size 32 weeks, fetal heart sounds audible and regular (144 bpm). Cephalic presentation. Blood pressure within target range. Advised continued iron and calcium supplementation, low salt diet, left lateral resting position.",
        vitals: {
          bloodPressure: "115/75",
          pulseRate: 78,
          temperature: 98.4,
          oxygenSaturation: 99,
          bloodSugar: {
            type: "Random",
            value: 104
          },
          weightKg: 65.5
        },
        prescriptions: [
          {
            medicineName: "Tab. Fefol-Vit (Iron + Folic Acid)",
            type: "Capsule",
            dosage: "1 Capsule",
            frequency: "1 - 0 - 0 (Morning)",
            duration: "30 Days",
            instructions: "Take with fresh orange juice or water. Avoid tea/milk for 1 hour."
          },
          {
            medicineName: "Tab. Cac-1000 Plus (Calcium + Vit D3)",
            type: "Tablet",
            dosage: "1 Effervescent Tab",
            frequency: "0 - 1 - 0 (Afternoon)",
            duration: "30 Days",
            instructions: "Dissolve completely in a glass of water after lunch."
          },
          {
            medicineName: "Cap. Gravibinan 250mg",
            type: "Capsule",
            dosage: "1 Capsule",
            frequency: "0 - 0 - 1 (Night)",
            duration: "14 Days",
            instructions: "At bedtime if mild lower back ache persists."
          }
        ],
        labReports: [
          {
            id: "LAB-2026-9041",
            testName: "Complete Blood Count (CBC) & Hemoglobin",
            category: "Hematology",
            date: "2026-10-20",
            results: [
              { parameter: "Hemoglobin (Hb)", value: "10.4", unit: "g/dL", referenceRange: "11.5 - 15.5", isAbnormal: true },
              { parameter: "Total Leukocyte Count (TLC)", value: "8,900", unit: "/cumm", referenceRange: "4,000 - 11,000", isAbnormal: false },
              { parameter: "Platelet Count", value: "245,000", unit: "/cumm", referenceRange: "150,000 - 450,000", isAbnormal: false },
              { parameter: "Hematocrit (PCV)", value: "32.1", unit: "%", referenceRange: "36.0 - 46.0", isAbnormal: true }
            ],
            impression: "Mild microcytic hypochromic picture consistent with gestational iron deficiency anemia. Improved from prior visit (9.8 g/dL).",
            status: "Completed",
            consultantRadiologistOrPathologist: "Dr. Sadia Noreen / Pathologist On-Duty"
          },
          {
            id: "USG-2026-4402",
            testName: "Obstetric Ultrasound with Biophysical Profile",
            category: "Ultrasound / Radiology",
            date: "2026-10-20",
            results: [
              { parameter: "Fetal Presentation", value: "Cephalic (Head down)", unit: "-", referenceRange: "Normal", isAbnormal: false },
              { parameter: "Fetal Heart Rate", value: "144", unit: "bpm", referenceRange: "120 - 160", isAbnormal: false },
              { parameter: "Amniotic Fluid Index (AFI)", value: "13.2", unit: "cm", referenceRange: "10.0 - 20.0", isAbnormal: false },
              { parameter: "Placental Location", value: "Posterior Grade II", unit: "-", referenceRange: "Clear of Os", isAbnormal: false },
              { parameter: "Estimated Fetal Weight", value: "1,850", unit: "grams", referenceRange: "Concordant for 32w", isAbnormal: false }
            ],
            impression: "Single live intrauterine pregnancy of 32 weeks + 2 days maturity. Normal Doppler indices, active fetal movements and normal liquor volume.",
            status: "Completed",
            consultantRadiologistOrPathologist: "Dr. Sadia Noreen (Consultant Sonologist)"
          }
        ],
        nextFollowUpDate: "2026-11-03"
      },
      {
        id: "VIS-2026-0412",
        visitDate: "2026-08-15",
        doctorId: "dr-naila-qaisar",
        doctorName: "Dr. Naila Qaisar",
        departmentName: "Obstetrics & Gynecology",
        visitType: "Antenatal Checkup",
        chiefComplaint: "Second trimester anomaly scan review and routine antenatal checkup.",
        clinicalDiagnosis: "G2 P1 at 22 Weeks. Normal fetal anatomy survey.",
        doctorNotes: "Targeted anomaly scan performed by Dr. Sadia Noreen shows no gross congenital structural defects. Maternal blood pressure normal (110/70). Advised anomaly scan reassurance and tetanus toxoid booster dose.",
        vitals: {
          bloodPressure: "110/70",
          pulseRate: 76,
          temperature: 98.6,
          oxygenSaturation: 99,
          bloodSugar: {
            type: "Fasting",
            value: 88
          },
          weightKg: 62.0
        },
        prescriptions: [
          {
            medicineName: "Tab. Iberet Folic 500",
            type: "Tablet",
            dosage: "1 Tablet",
            frequency: "1 - 0 - 0 (Morning)",
            duration: "60 Days",
            instructions: "Take early morning after breakfast."
          },
          {
            medicineName: "Tab. Calcium D3",
            type: "Tablet",
            dosage: "500 mg",
            frequency: "0 - 1 - 0 (Noon)",
            duration: "60 Days",
            instructions: "With afternoon meal."
          }
        ],
        labReports: [
          {
            id: "USG-2026-2180",
            testName: "Level II Detailed Fetal Anomaly Scan",
            category: "Ultrasound / Radiology",
            date: "2026-08-15",
            results: [
              { parameter: "Fetal Spine & Calvarium", value: "Intact & Normal", unit: "-", referenceRange: "Intact", isAbnormal: false },
              { parameter: "Four Chamber Heart", value: "Visualized Normal", unit: "-", referenceRange: "Normal", isAbnormal: false },
              { parameter: "Kidneys & Bladder", value: "Bilateral Present", unit: "-", referenceRange: "Present", isAbnormal: false },
              { parameter: "Umbilical Cord", value: "3 Vessels Present", unit: "-", referenceRange: "3 Vessels", isAbnormal: false }
            ],
            impression: "Normal targeted mid-trimester structural anatomy scan. Fetal biometry corresponding to 22 weeks gestation.",
            status: "Completed",
            consultantRadiologistOrPathologist: "Dr. Sadia Noreen"
          }
        ],
        nextFollowUpDate: "2026-09-15"
      }
    ]
  },
  {
    mrn: "NQH-2023-0891",
    name: "Muhammad Usman",
    age: 54,
    gender: "Male",
    phone: "0300-5123456",
    cnic: "34201-1984251-1",
    bloodGroup: "O Positive (O+)",
    address: "Railway Road, Near Post Office",
    city: "Lalamusa",
    emergencyContact: {
      name: "Bilal Usman",
      relation: "Son",
      phone: "0301-9988776"
    },
    allergies: ["Sulfa Drugs (Skin Urticaria)"],
    chronicConditions: ["Type 2 Diabetes Mellitus (6 yrs)", "Primary Hypertension (4 yrs)"],
    visits: [
      {
        id: "VIS-2026-0799",
        visitDate: "2026-10-18",
        doctorId: "dr-zeeshan-ali",
        doctorName: "Dr. Zeeshan Ali",
        departmentName: "Internal Medicine & Diabetes",
        visitType: "Follow-up",
        chiefComplaint: "Routine quarterly diabetes and blood pressure review. Occasional tingling in toes.",
        clinicalDiagnosis: "Type 2 Diabetes Mellitus (Suboptimal control) + Essential Hypertension + Early Diabetic Peripheral Neuropathy.",
        doctorNotes: "HbA1c is 7.6% (target < 7.0%). Monofilament exam shows mild sensory decrease on bilateral great toes. Foot pulses intact. Blood pressure currently 134/84 mmHg. Dose adjustment for Metformin and added neuroprotective multivitamin.",
        vitals: {
          bloodPressure: "134/84",
          pulseRate: 74,
          temperature: 98.2,
          oxygenSaturation: 98,
          bloodSugar: {
            type: "Fasting",
            value: 136
          },
          weightKg: 82.0
        },
        prescriptions: [
          {
            medicineName: "Tab. Glucophage XR (Metformin)",
            type: "Tablet",
            dosage: "1000 mg",
            frequency: "0 - 0 - 1 (Night)",
            duration: "90 Days",
            instructions: "Take with evening dinner to avoid gastric discomfort."
          },
          {
            medicineName: "Tab. Januvia (Sitagliptin)",
            type: "Tablet",
            dosage: "50 mg",
            frequency: "1 - 0 - 0 (Morning)",
            duration: "90 Days",
            instructions: "Take every morning before breakfast."
          },
          {
            medicineName: "Tab. Exforge (Amlodipine + Valsartan)",
            type: "Tablet",
            dosage: "5 / 80 mg",
            frequency: "1 - 0 - 0 (Morning)",
            duration: "90 Days",
            instructions: "Take once daily in the morning."
          },
          {
            medicineName: "Cap. Methycobal (Mecobalamin)",
            type: "Capsule",
            dosage: "500 mcg",
            frequency: "1 - 0 - 1 (Twice Daily)",
            duration: "30 Days",
            instructions: "For peripheral nerve rejuvenation."
          }
        ],
        labReports: [
          {
            id: "LAB-2026-8819",
            testName: "Glycated Hemoglobin (HbA1c) & Renal Function Panel",
            category: "Biochemistry",
            date: "2026-10-18",
            results: [
              { parameter: "HbA1c (Glycosylated Hemoglobin)", value: "7.6", unit: "%", referenceRange: "4.0 - 5.6", isAbnormal: true },
              { parameter: "Estimated Average Glucose (eAG)", value: "171", unit: "mg/dL", referenceRange: "< 126", isAbnormal: true },
              { parameter: "Serum Creatinine", value: "0.95", unit: "mg/dL", referenceRange: "0.70 - 1.30", isAbnormal: false },
              { parameter: "Blood Urea", value: "28", unit: "mg/dL", referenceRange: "15 - 45", isAbnormal: false },
              { parameter: "Serum Uric Acid", value: "5.8", unit: "mg/dL", referenceRange: "3.5 - 7.2", isAbnormal: false }
            ],
            impression: "Moderately elevated HbA1c demonstrating need for glycemic titration. Preserved renal function.",
            status: "Completed",
            consultantRadiologistOrPathologist: "Consultant Pathologist NQH"
          }
        ],
        nextFollowUpDate: "2027-01-18"
      }
    ]
  },
  {
    mrn: "NQH-2025-2419",
    name: "Baby Zainab Noor",
    age: 3,
    gender: "Female",
    phone: "0312-8829104",
    cnic: "34201-9012384-6",
    bloodGroup: "A Positive (A+)",
    address: "Civil Lines, Near Municipal Park",
    city: "Lalamusa",
    emergencyContact: {
      name: "Noor Muhammad",
      relation: "Father",
      phone: "0312-8829104"
    },
    allergies: ["No known drug allergies"],
    chronicConditions: ["None"],
    visits: [
      {
        id: "VIS-2026-0803",
        visitDate: "2026-10-14",
        doctorId: "dr-ayesha-tariq",
        doctorName: "Dr. Ayesha Tariq",
        departmentName: "Pediatrics & Neonatal Care",
        visitType: "OPD Consultation",
        chiefComplaint: "Running nose, dry barking cough, low-grade fever for 3 days, mild shortness of breath at night.",
        clinicalDiagnosis: "Acute Viral Bronchiolitis with Mild Wheeze. No severe respiratory distress.",
        doctorNotes: "Chest bilateral rhonchi and mild wheeze heard on auscultation. Throat congested. SpO2 97% on room air. Child drinking fluids adequately. In-clinic nebulization with Salbutamol given with marked relief.",
        vitals: {
          bloodPressure: "95/60",
          pulseRate: 110,
          temperature: 99.8,
          oxygenSaturation: 97,
          weightKg: 13.5
        },
        prescriptions: [
          {
            medicineName: "Syp. Ventolin (Salbutamol)",
            type: "Syrup",
            dosage: "1 teaspoon (5ml)",
            frequency: "1 - 1 - 1 (Thrice daily)",
            duration: "5 Days",
            instructions: "Give after food. Can cause mild shaking, which is temporary."
          },
          {
            medicineName: "Syp. Panadol (Paracetamol)",
            type: "Syrup",
            dosage: "1.5 teaspoons (7.5ml)",
            frequency: "SOS / Every 6 hrs if fever > 99.5F",
            duration: "3 Days",
            instructions: "For fever and throat ache."
          },
          {
            medicineName: "Syp. Montika (Montelukast 4mg)",
            type: "Syrup",
            dosage: "4 mg chewable/syrup",
            frequency: "0 - 0 - 1 (Night)",
            duration: "14 Days",
            instructions: "Give before sleep."
          }
        ],
        labReports: [],
        nextFollowUpDate: "2026-10-19"
      }
    ]
  },
  {
    mrn: "NQH-2024-3150",
    name: "Tariq Mehmood",
    age: 42,
    gender: "Male",
    phone: "0345-6677889",
    cnic: "34201-3829102-3",
    bloodGroup: "B Positive (B+)",
    address: "Main Bazaar, Lalamusa",
    city: "Lalamusa",
    emergencyContact: {
      name: "Imran Mehmood",
      relation: "Brother",
      phone: "0345-1122334"
    },
    allergies: ["Aspirin (Gastric Burning)"],
    chronicConditions: ["Chronic Lumbar Spondylosis"],
    visits: [
      {
        id: "VIS-2026-0690",
        visitDate: "2026-09-28",
        doctorId: "dr-farooq-ahmed",
        doctorName: "Dr. Farooq Ahmed",
        departmentName: "Orthopedics & Trauma Surgery",
        visitType: "OPD Consultation",
        chiefComplaint: "Severe lower back pain radiating to left calf for 2 weeks after lifting heavy crate.",
        clinicalDiagnosis: "Lumbar Radiculopathy secondary to L4-L5 Disc Protrusion with Muscle Spasm.",
        doctorNotes: "Straight Leg Raise (SLR) test positive on left side at 45 degrees. Motor power 5/5 bilateral lower limbs. Deep tendon reflexes symmetrical. Advised lumbar MRI, strict bed rest on firm mattress, ergonomic posture training, and short course of NSAID + muscle relaxant with PPI cover.",
        vitals: {
          bloodPressure: "128/82",
          pulseRate: 80,
          temperature: 98.6,
          oxygenSaturation: 99,
          weightKg: 76.0
        },
        prescriptions: [
          {
            medicineName: "Tab. Celebrex (Celecoxib)",
            type: "Capsule",
            dosage: "200 mg",
            frequency: "1 - 0 - 0 (Morning)",
            duration: "7 Days",
            instructions: "Take with food to protect stomach."
          },
          {
            medicineName: "Tab. Muscoril (Thiocolchicoside)",
            type: "Tablet",
            dosage: "4 mg",
            frequency: "1 - 0 - 1 (Twice daily)",
            duration: "7 Days",
            instructions: "Muscle relaxant, avoid driving if drowsy."
          },
          {
            medicineName: "Cap. Risek (Omeprazole)",
            type: "Capsule",
            dosage: "20 mg",
            frequency: "1 - 0 - 0 (Morning)",
            duration: "14 Days",
            instructions: "Take 30 minutes before breakfast."
          }
        ],
        labReports: [
          {
            id: "RAD-2026-1092",
            testName: "Digital X-Ray Lumbo-Sacral Spine (AP & Lateral View)",
            category: "Ultrasound / Radiology",
            date: "2026-09-28",
            results: [
              { parameter: "L4-L5 Disc Space", value: "Mild anterior narrowing", unit: "-", referenceRange: "Preserved", isAbnormal: true },
              { parameter: "Vertebral Alignment", value: "Normal Lordosis maintained", unit: "-", referenceRange: "Normal", isAbnormal: false },
              { parameter: "Facet Joints", value: "Mild degenerative changes", unit: "-", referenceRange: "Clear", isAbnormal: true }
            ],
            impression: "Mild degenerative spondylotic changes at L4-L5 level with preserved vertebral body heights.",
            status: "Completed",
            consultantRadiologistOrPathologist: "Dr. Sadia Noreen (Radiology Dept)"
          }
        ],
        nextFollowUpDate: "2026-10-12"
      }
    ]
  }
];

export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: "APT-2026-8492",
    tokenNumber: 8,
    patientMrn: "NQH-2024-1042",
    patientName: "Fatima Bibi",
    patientPhone: "0333-7004949",
    patientCnic: "34201-4458921-2",
    patientAge: 29,
    patientGender: "Female",
    doctorId: "dr-naila-qaisar",
    doctorName: "Dr. Naila Qaisar",
    departmentName: "Obstetrics & Gynecology",
    appointmentDate: "2026-10-27",
    session: "Morning OPD",
    timeSlot: "10:30 AM - 11:00 AM",
    reason: "Routine Antenatal Follow-up & Ultrasound checkup (33 Weeks)",
    status: "Confirmed",
    roomNo: "Consultation Suite 01",
    feePaid: true,
    consultationFee: 2000,
    createdAt: "2026-10-26T09:15:00Z"
  },
  {
    id: "APT-2026-8495",
    tokenNumber: 9,
    patientMrn: "NQH-2023-0891",
    patientName: "Muhammad Usman",
    patientPhone: "0300-5123456",
    patientCnic: "34201-1984251-1",
    patientAge: 54,
    patientGender: "Male",
    doctorId: "dr-zeeshan-ali",
    doctorName: "Dr. Zeeshan Ali",
    departmentName: "Internal Medicine & Diabetes",
    appointmentDate: "2026-10-27",
    session: "Morning OPD",
    timeSlot: "11:00 AM - 11:30 AM",
    reason: "Fasting Blood Sugar test review & BP check",
    status: "Confirmed",
    roomNo: "Medical OPD Room 04",
    feePaid: true,
    consultationFee: 1500,
    createdAt: "2026-10-26T10:00:00Z"
  },
  {
    id: "APT-2026-8501",
    tokenNumber: 3,
    patientMrn: "NQH-2025-2419",
    patientName: "Baby Zainab Noor",
    patientPhone: "0312-8829104",
    patientCnic: "34201-9012384-6",
    patientAge: 3,
    patientGender: "Female",
    doctorId: "dr-ayesha-tariq",
    doctorName: "Dr. Ayesha Tariq",
    departmentName: "Pediatrics & Neonatal Care",
    appointmentDate: "2026-10-27",
    session: "Evening OPD",
    timeSlot: "05:30 PM - 06:00 PM",
    reason: "Post-nebulization follow-up and chest checkup",
    status: "Confirmed",
    roomNo: "Pediatric Clinic Room 02",
    feePaid: true,
    consultationFee: 1500,
    createdAt: "2026-10-26T11:20:00Z"
  }
];

export const HOSPITAL_FACILITIES = [
  {
    title: "24/7 Emergency & Trauma Center",
    desc: "Fully equipped emergency unit with resuscitation bays, cardiac defibrillators, crash carts, and trauma specialists available around the clock.",
    icon: "ShieldAlert"
  },
  {
    title: "Modular Operation Theaters",
    desc: "Laminar airflow surgical suites with Karl Storz HD laparoscopic towers, electrocautery, and advanced anesthesia workstations.",
    icon: "Activity"
  },
  {
    title: "Maternity & Labor Suite",
    desc: "Comfortable private labor delivery suites, fetal CTG monitors, epidural analgesia services, and immediate newborn resuscitation stations.",
    icon: "Baby"
  },
  {
    title: "Neonatal Intensive Nursery",
    desc: "Advanced infant incubators, double-surface LED phototherapy units, micro-infusion pumps, and specialized neonatal pediatric nursing.",
    icon: "Heart"
  },
  {
    title: "Automated Clinical Pathology Lab",
    desc: "Fully automated analyzers for CBC, biochemistry, hormones, hepatitis serology, and microbiology with rapid digital result delivery.",
    icon: "FlaskConical"
  },
  {
    title: "Digital Color Doppler Ultrasound",
    desc: "High-resolution GE ultrasound system providing 3D/4D fetal anomaly scans, obstetric Doppler, abdominal, pelvic, and vascular imaging.",
    icon: "Tv"
  },
  {
    title: "24/7 In-House Pharmacy",
    desc: "Temperature-regulated authentic pharmaceutical dispensary stocking gynecological, pediatric, surgical, and emergency life-saving medications.",
    icon: "Pill"
  },
  {
    title: "Ambulance & Emergency Transport",
    desc: "Life-support equipped ambulance fleet with onboard oxygen, suction, and emergency paramedic staff serving Gujrat and surrounding areas.",
    icon: "Truck"
  }
];

export const FAQS = [
  {
    q: "How does the online OPD token booking work at Naila Qaisar Hospital?",
    a: "Select your desired department and specialist doctor, pick a preferred date and session (Morning or Evening), fill in your basic patient details, and receive an instant digital OPD Token Slip. On the consultation day, show your digital token or printed slip at the reception desk for priority entry."
  },
  {
    q: "How are patient medical records and lab reports managed?",
    a: "All patient consultation histories, vital signs, prescriptions, and lab investigations are securely stored in the hospital's electronic health record (EHR) database, accessible to attending consultants in the clinical portal. Patients receive printed official OPD prescriptions and verified diagnostic slips at each visit."
  },
  {
    q: "What are the OPD consultation timings for Dr. Naila Qaisar?",
    a: "Dr. Naila Qaisar conducts Morning OPD from 09:30 AM to 01:30 PM and Evening OPD from 05:00 PM to 09:00 PM, Monday through Saturday. Emergency obstetric care is provided 24 hours a day, 7 days a week."
  },
  {
    q: "Are emergency and maternity services available 24/7?",
    a: "Yes. Our emergency unit, labor delivery rooms, operating theaters, diagnostic laboratory, and pharmacy are operational 24 hours every day, including Sundays and national holidays."
  },
  {
    q: "Where is Naila Qaisar Hospital located in Lalamusa?",
    a: "We are prominently located on Grand Trunk (G.T.) Road, near Qasim Marriage Hall, Lalamusa, District Gujrat, Punjab. We have ample parking and direct emergency ambulance access."
  }
];
