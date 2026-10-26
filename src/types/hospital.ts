export interface Doctor {
  id: string;
  name: string;
  title: string;
  qualification: string;
  departmentId: string;
  departmentName: string;
  experienceYears: number;
  consultationFee: number;
  availableDays: string[];
  timingMorning: string;
  timingEvening: string;
  roomNo: string;
  avatarUrl: string;
  specialties: string[];
  bio: string;
}

export interface Department {
  id: string;
  name: string;
  iconName: string;
  description: string;
  headDoctor: string;
  services: string[];
}

export interface Vitals {
  bloodPressure: string; // e.g. "120/80"
  pulseRate: number; // e.g. 76 bpm
  temperature: number; // e.g. 98.6 F
  respiratoryRate?: number;
  oxygenSaturation: number; // e.g. 99%
  bloodSugar?: {
    type: 'Fasting' | 'Random' | 'Post-Prandial';
    value: number; // mg/dL
  };
  weightKg?: number;
  heightCm?: number;
}

export interface PrescriptionItem {
  medicineName: string;
  type: 'Tablet' | 'Capsule' | 'Syrup' | 'Injection' | 'Drops' | 'Ointment' | 'Inhaler';
  dosage: string; // e.g. "500 mg"
  frequency: string; // e.g. "1 - 0 - 1 (Morning & Night)"
  duration: string; // e.g. "7 Days"
  instructions: string; // e.g. "After meals with water"
}

export interface LabReport {
  id: string;
  testName: string;
  category: 'Hematology' | 'Biochemistry' | 'Ultrasound / Radiology' | 'Microbiology' | 'Urine / Stool';
  date: string;
  results: {
    parameter: string;
    value: string;
    unit: string;
    referenceRange: string;
    isAbnormal: boolean;
  }[];
  impression?: string;
  status: 'Completed' | 'Pending Verification' | 'Sample Collected';
  consultantRadiologistOrPathologist: string;
}

export interface PatientVisitRecord {
  id: string;
  visitDate: string;
  doctorId: string;
  doctorName: string;
  departmentName: string;
  visitType: 'OPD Consultation' | 'Follow-up' | 'Emergency' | 'Antenatal Checkup' | 'Post-Operative';
  chiefComplaint: string;
  clinicalDiagnosis: string;
  doctorNotes: string;
  vitals: Vitals;
  prescriptions: PrescriptionItem[];
  labReports: LabReport[];
  nextFollowUpDate?: string;
}

export interface Patient {
  mrn: string; // Medical Record Number e.g. "NQH-2024-1042"
  name: string;
  age: number;
  gender: 'Female' | 'Male' | 'Other';
  phone: string;
  cnic: string;
  bloodGroup: string;
  address: string;
  city: string;
  emergencyContact: {
    name: string;
    relation: string;
    phone: string;
  };
  allergies: string[];
  chronicConditions: string[];
  visits: PatientVisitRecord[];
}

export interface Appointment {
  id: string; // "APT-2026-XXXX"
  tokenNumber: number; // e.g. 14
  patientMrn?: string;
  patientName: string;
  patientPhone: string;
  patientCnic: string;
  patientAge: number;
  patientGender: 'Female' | 'Male' | 'Other';
  doctorId: string;
  doctorName: string;
  departmentName: string;
  appointmentDate: string; // YYYY-MM-DD
  session: 'Morning OPD' | 'Evening OPD';
  timeSlot: string; // "10:30 AM - 11:00 AM"
  reason: string;
  status: 'Confirmed' | 'Checked-In' | 'In Consultation' | 'Completed' | 'Cancelled';
  roomNo: string;
  feePaid: boolean;
  consultationFee: number;
  createdAt: string;
}

export interface HospitalAnnouncement {
  text: string;
  badge: string; // e.g. "Notice", "OPD Alert", "Announcement"
  emergencyPhone: string;
  isActive: boolean;
  updatedAt: string;
}
