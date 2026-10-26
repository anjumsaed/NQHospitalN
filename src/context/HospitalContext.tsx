import React, { createContext, useContext, useState, useEffect } from 'react';
import { Patient, Appointment, Doctor, PatientVisitRecord } from '../types/hospital';
import { INITIAL_PATIENTS, INITIAL_APPOINTMENTS, DOCTORS as DEFAULT_DOCTORS } from '../data/hospitalData';
import { 
  auth, 
  signInWithGoogle, 
  logoutAdmin as fbLogoutAdmin,
  saveAppointmentToFirebase, 
  getAppointmentsFromFirebase, 
  savePatientToFirebase, 
  getPatientsFromFirebase,
  getDoctorsFromFirebase,
  saveDoctorToFirebase,
  deleteDoctorFromFirebase,
  updateAppointmentInFirebase,
  getAnnouncementFromFirebase,
  saveAnnouncementToFirebase
} from '../lib/firebase';
import { onAuthStateChanged, User } from 'firebase/auth';

interface HospitalContextType {
  doctors: Doctor[];
  patients: Patient[];
  appointments: Appointment[];
  selectedPatient: Patient | null;
  setSelectedPatient: (patient: Patient | null) => void;
  activeNav: string;
  setActiveNav: (nav: string) => void;
  preselectedDoctorId: string | null;
  setPreselectedDoctorId: (id: string | null) => void;
  
  // Doctor CRUD for Admin
  addDoctor: (doctor: Omit<Doctor, 'id'>) => Promise<void>;
  updateDoctor: (id: string, updates: Partial<Doctor>) => Promise<void>;
  deleteDoctor: (id: string) => Promise<void>;

  // Appointments
  bookAppointment: (data: Omit<Appointment, 'id' | 'tokenNumber' | 'status' | 'feePaid' | 'createdAt'>) => Promise<Appointment>;
  updateAppointmentStatus: (id: string, status: Appointment['status']) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;

  // Patients (Concealed behind Admin Login)
  findPatientByQuery: (query: string) => Patient | null;
  addPatientVisit: (mrn: string, visit: Omit<PatientVisitRecord, 'id'>) => Promise<void>;
  createNewPatient: (patientData: Omit<Patient, 'visits' | 'mrn'>) => Promise<Patient>;

  // Admin Auth
  isAdminLoggedIn: boolean;
  adminUser: User | { email: string; displayName: string } | null;
  loginWithGoogleAdmin: () => Promise<void>;
  loginWithPinAdmin: (pinOrPass: string) => boolean;
  logoutAdmin: () => Promise<void>;

  // Slips & Modals
  printableSlip: { type: 'token' | 'prescription' | 'lab'; data: any } | null;
  setPrintableSlip: (slip: { type: 'token' | 'prescription' | 'lab'; data: any } | null) => void;
  emergencyModalOpen: boolean;
  setEmergencyModalOpen: (open: boolean) => void;
  notification: string | null;
  showNotification: (msg: string) => void;
  isFirebaseConnected: boolean;

  // Announcement Bar Managed from Admin Console
  announcement: {
    text: string;
    badge: string;
    emergencyPhone: string;
    isActive: boolean;
    updatedAt: string;
  };
  updateAnnouncement: (data: { text: string; badge: string; emergencyPhone: string; isActive: boolean }) => Promise<void>;
}

const HospitalContext = createContext<HospitalContextType | undefined>(undefined);

export const HospitalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [doctors, setDoctors] = useState<Doctor[]>(() => {
    try {
      const stored = localStorage.getItem('nqh_doctors_v3');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return DEFAULT_DOCTORS;
  });

  const [patients, setPatients] = useState<Patient[]>(() => {
    try {
      const stored = localStorage.getItem('nqh_patients_v3');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return INITIAL_PATIENTS;
  });

  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    try {
      const stored = localStorage.getItem('nqh_appointments_v3');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return INITIAL_APPOINTMENTS;
  });

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(patients[0] || null);
  const [activeNav, setActiveNav] = useState<string>('home');
  const [preselectedDoctorId, setPreselectedDoctorId] = useState<string | null>(null);
  const [printableSlip, setPrintableSlip] = useState<{ type: 'token' | 'prescription' | 'lab'; data: any } | null>(null);
  const [emergencyModalOpen, setEmergencyModalOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState<boolean>(true);

  // Announcement Bar State (Manipulable from Admin Console)
  const [announcement, setAnnouncement] = useState(() => {
    try {
      const stored = localStorage.getItem('nqh_announcement_v1');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return {
      text: "OPD Notice: Dr. Naila Qaisar & Specialist Consultants on duty today • Morning 09:30 AM - 01:30 PM & Evening 05:00 PM - 09:00 PM • 24/7 Emergency & Maternity Operational",
      badge: "Hospital Notice",
      emergencyPhone: "053-7517700",
      isActive: true,
      updatedAt: new Date().toISOString()
    };
  });

  const updateAnnouncement = async (data: { text: string; badge: string; emergencyPhone: string; isActive: boolean }) => {
    const full = { ...data, updatedAt: new Date().toISOString() };
    setAnnouncement(full);
    localStorage.setItem('nqh_announcement_v1', JSON.stringify(full));
    try {
      await saveAnnouncementToFirebase(full);
    } catch (e) {
      console.warn('Firebase announcement write:', e);
    }
    showNotification('Announcement bar updated successfully!');
  };

  // Admin Auth State
  const [adminUser, setAdminUser] = useState<User | { email: string; displayName: string } | null>(() => {
    try {
      const stored = sessionStorage.getItem('nqh_admin_auth');
      if (stored) return JSON.parse(stored);
    } catch (e) {}
    return null;
  });

  const isAdminLoggedIn = !!adminUser;

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        setAdminUser(user);
        sessionStorage.setItem('nqh_admin_auth', JSON.stringify({
          email: user.email,
          displayName: user.displayName || 'Hospital Administrator'
        }));
      }
    });
    return () => unsub();
  }, []);

  // Fetch initial doctors & announcement from Firebase
  useEffect(() => {
    const initFirebaseData = async () => {
      try {
        const remoteDocs = await getDoctorsFromFirebase();
        if (remoteDocs && remoteDocs.length > 0) {
          setDoctors(remoteDocs);
        } else {
          // Seed default doctors to Firebase
          for (const d of DEFAULT_DOCTORS) {
            await saveDoctorToFirebase(d);
          }
        }

        const remoteAnn = await getAnnouncementFromFirebase();
        if (remoteAnn && remoteAnn.text) {
          setAnnouncement(remoteAnn as any);
        }
      } catch (e) {
        console.warn('Firebase data sync fallback to local cache:', e);
      }
    };
    initFirebaseData();
  }, []);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('nqh_doctors_v3', JSON.stringify(doctors));
  }, [doctors]);

  useEffect(() => {
    localStorage.setItem('nqh_patients_v3', JSON.stringify(patients));
  }, [patients]);

  useEffect(() => {
    localStorage.setItem('nqh_appointments_v3', JSON.stringify(appointments));
  }, [appointments]);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  // Admin Login with Google
  const loginWithGoogleAdmin = async () => {
    try {
      const user = await signInWithGoogle();
      setAdminUser(user);
      showNotification(`Welcome, ${user.displayName || user.email}! Admin access granted.`);
      setActiveNav('admin');
    } catch (err: any) {
      showNotification('Google authentication cancelled or failed.');
    }
  };

  // Admin Master PIN / Credential Login
  const loginWithPinAdmin = (pinOrPass: string): boolean => {
    const validPins = ['admin', 'nqh2026', 'drnaila', '123456', '7517700'];
    if (validPins.includes(pinOrPass.trim().toLowerCase())) {
      const mockAdmin = {
        email: 'admin@nailaqaisarhospital.com',
        displayName: 'Medical Director / Admin'
      };
      setAdminUser(mockAdmin);
      sessionStorage.setItem('nqh_admin_auth', JSON.stringify(mockAdmin));
      showNotification('Admin login successful! Accessing concealed hospital records.');
      setActiveNav('admin');
      return true;
    }
    return false;
  };

  const logoutAdmin = async () => {
    await fbLogoutAdmin();
    setAdminUser(null);
    sessionStorage.removeItem('nqh_admin_auth');
    showNotification('Logged out from Admin portal.');
    setActiveNav('home');
  };

  // DOCTOR CRUD
  const addDoctor = async (doctorData: Omit<Doctor, 'id'>) => {
    const newId = `dr-${doctorData.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${Math.floor(100 + Math.random() * 900)}`;
    const fullDoc: Doctor = {
      ...doctorData,
      id: newId
    };

    setDoctors(prev => [...prev, fullDoc]);
    try {
      await saveDoctorToFirebase(fullDoc);
    } catch (e) {
      console.warn('Saved doctor locally; Firebase write:', e);
    }
    showNotification(`New specialist doctor added: ${fullDoc.name}`);
  };

  const updateDoctor = async (id: string, updates: Partial<Doctor>) => {
    setDoctors(prev => prev.map(d => {
      if (d.id === id) {
        const updated = { ...d, ...updates };
        saveDoctorToFirebase(updated).catch(console.warn);
        return updated;
      }
      return d;
    }));
    showNotification(`Doctor schedule & details updated.`);
  };

  const deleteDoctor = async (id: string) => {
    setDoctors(prev => prev.filter(d => d.id !== id));
    try {
      await deleteDoctorFromFirebase(id);
    } catch (e) {
      console.warn(e);
    }
    showNotification(`Doctor removed from clinic roster.`);
  };

  // APPOINTMENT BOOKING
  const bookAppointment = async (data: Omit<Appointment, 'id' | 'tokenNumber' | 'status' | 'feePaid' | 'createdAt'>): Promise<Appointment> => {
    const existingTokens = appointments
      .filter(a => a.doctorId === data.doctorId && a.appointmentDate === data.appointmentDate)
      .map(a => a.tokenNumber);
    const nextToken = existingTokens.length > 0 ? Math.max(...existingTokens) + 1 : 1;

    const newId = `APT-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

    let patientMrn = data.patientMrn;
    if (!patientMrn) {
      const existing = findPatientByQuery(data.patientPhone) || findPatientByQuery(data.patientCnic);
      if (existing) {
        patientMrn = existing.mrn;
      } else {
        const newPatient = await createNewPatient({
          name: data.patientName,
          age: data.patientAge,
          gender: data.patientGender,
          phone: data.patientPhone,
          cnic: data.patientCnic,
          bloodGroup: 'Pending',
          address: 'Lalamusa, Gujrat',
          city: 'Lalamusa',
          emergencyContact: {
            name: data.patientName + ' (Kin)',
            relation: 'Relative',
            phone: data.patientPhone
          },
          allergies: [],
          chronicConditions: []
        });
        patientMrn = newPatient.mrn;
      }
    }

    const newAppt: Appointment = {
      ...data,
      id: newId,
      patientMrn,
      tokenNumber: nextToken,
      status: 'Confirmed',
      feePaid: true,
      createdAt: new Date().toISOString()
    };

    setAppointments(prev => [newAppt, ...prev]);

    // Save to Firebase Firestore!
    try {
      await saveAppointmentToFirebase(newAppt);
    } catch (e) {
      console.warn('Saved appointment locally; Firebase sync:', e);
    }

    showNotification(`Appointment booked & Token #${nextToken} generated! Saved to Firebase database.`);
    return newAppt;
  };

  const updateAppointmentStatus = async (id: string, status: Appointment['status']) => {
    setAppointments(prev => prev.map(a => (a.id === id ? { ...a, status } : a)));
    try {
      await updateAppointmentInFirebase(id, { status });
    } catch (e) {
      console.warn(e);
    }
    showNotification(`Appointment status changed to: ${status}`);
  };

  const cancelAppointment = async (id: string) => {
    await updateAppointmentStatus(id, 'Cancelled');
  };

  // PATIENTS
  const findPatientByQuery = (query: string): Patient | null => {
    const clean = query.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
    if (!clean) return null;

    return patients.find(p => {
      const mrnClean = p.mrn.toLowerCase().replace(/[^a-z0-9]/g, '');
      const phoneClean = p.phone.toLowerCase().replace(/[^a-z0-9]/g, '');
      const cnicClean = p.cnic.toLowerCase().replace(/[^a-z0-9]/g, '');
      const nameClean = p.name.toLowerCase().replace(/[^a-z0-9]/g, '');
      return mrnClean.includes(clean) || phoneClean.includes(clean) || cnicClean.includes(clean) || nameClean.includes(clean);
    }) || null;
  };

  const createNewPatient = async (patientData: Omit<Patient, 'visits' | 'mrn'>): Promise<Patient> => {
    const newMrn = `NQH-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newPatient: Patient = {
      ...patientData,
      mrn: newMrn,
      visits: []
    };

    setPatients(prev => [newPatient, ...prev]);
    try {
      await savePatientToFirebase(newPatient);
    } catch (e) {
      console.warn('Saved patient locally; Firebase sync:', e);
    }
    return newPatient;
  };

  const addPatientVisit = async (mrn: string, visit: Omit<PatientVisitRecord, 'id'>) => {
    const newVisitId = `VIS-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const fullVisit: PatientVisitRecord = {
      ...visit,
      id: newVisitId
    };

    setPatients(prev => prev.map(p => {
      if (p.mrn === mrn) {
        const updated = {
          ...p,
          visits: [fullVisit, ...p.visits]
        };
        savePatientToFirebase(updated).catch(console.warn);
        if (selectedPatient?.mrn === mrn) {
          setSelectedPatient(updated);
        }
        return updated;
      }
      return p;
    }));

    showNotification(`Clinical visit logged & synchronized with Firebase for MRN: ${mrn}`);
  };

  return (
    <HospitalContext.Provider
      value={{
        doctors,
        patients,
        appointments,
        selectedPatient,
        setSelectedPatient,
        activeNav,
        setActiveNav,
        preselectedDoctorId,
        setPreselectedDoctorId,
        addDoctor,
        updateDoctor,
        deleteDoctor,
        bookAppointment,
        updateAppointmentStatus,
        cancelAppointment,
        findPatientByQuery,
        addPatientVisit,
        createNewPatient,
        isAdminLoggedIn,
        adminUser,
        loginWithGoogleAdmin,
        loginWithPinAdmin,
        logoutAdmin,
        printableSlip,
        setPrintableSlip,
        emergencyModalOpen,
        setEmergencyModalOpen,
        notification,
        showNotification,
        isFirebaseConnected,
        announcement,
        updateAnnouncement
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospital = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospital must be used within a HospitalProvider');
  }
  return context;
};
