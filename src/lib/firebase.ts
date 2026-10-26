import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut as fbSignOut,
  onAuthStateChanged,
  User
} from 'firebase/auth';
import { 
  getFirestore, 
  collection, 
  doc, 
  getDoc,
  getDocs, 
  setDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  getDocFromServer,
  onSnapshot
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Doctor, Patient, Appointment } from '../types/hospital';

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user;
  } catch (error) {
    console.error('Google Sign In Error:', error);
    throw error;
  }
};

export const logoutAdmin = async () => {
  try {
    await fbSignOut(auth);
  } catch (error) {
    console.error('Logout Error:', error);
  }
};

// Validate initial connection
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn("Please check your Firebase configuration or internet connection.");
    }
  }
}
testFirestoreConnection();

// Doctors Database Services (CRUD)
export const getDoctorsFromFirebase = async (): Promise<Doctor[]> => {
  const path = 'doctors';
  try {
    const snap = await getDocs(collection(db, path));
    const list: Doctor[] = [];
    snap.forEach(d => {
      list.push(d.data() as Doctor);
    });
    return list;
  } catch (error) {
    console.error('Could not fetch doctors from Firestore:', error);
    return [];
  }
};

export const saveDoctorToFirebase = async (doctor: Doctor): Promise<void> => {
  const path = `doctors/${doctor.id}`;
  try {
    await setDoc(doc(db, 'doctors', doctor.id), doctor, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const deleteDoctorFromFirebase = async (doctorId: string): Promise<void> => {
  const path = `doctors/${doctorId}`;
  try {
    await deleteDoc(doc(db, 'doctors', doctorId));
  } catch (error) {
    handleFirestoreError(error, OperationType.DELETE, path);
  }
};

// Appointments Database Services
export const saveAppointmentToFirebase = async (appointment: Appointment): Promise<void> => {
  const path = `appointments/${appointment.id}`;
  try {
    await setDoc(doc(db, 'appointments', appointment.id), appointment);
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const getAppointmentsFromFirebase = async (): Promise<Appointment[]> => {
  const path = 'appointments';
  try {
    const snap = await getDocs(collection(db, path));
    const list: Appointment[] = [];
    snap.forEach(d => {
      list.push(d.data() as Appointment);
    });
    return list;
  } catch (error) {
    console.warn('Could not read appointments from Firestore (requires admin login):', error);
    return [];
  }
};

export const updateAppointmentInFirebase = async (id: string, updates: Partial<Appointment>): Promise<void> => {
  const path = `appointments/${id}`;
  try {
    await updateDoc(doc(db, 'appointments', id), updates);
  } catch (error) {
    handleFirestoreError(error, OperationType.UPDATE, path);
  }
};

// Confidential Patients Database Services (Concealed for Admin)
export const savePatientToFirebase = async (patient: Patient): Promise<void> => {
  const path = `patients/${patient.mrn}`;
  try {
    await setDoc(doc(db, 'patients', patient.mrn), patient, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};

export const getPatientsFromFirebase = async (): Promise<Patient[]> => {
  const path = 'patients';
  try {
    const snap = await getDocs(collection(db, path));
    const list: Patient[] = [];
    snap.forEach(d => {
      list.push(d.data() as Patient);
    });
    return list;
  } catch (error) {
    console.warn('Could not read patients from Firestore (requires admin login):', error);
    return [];
  }
};

// Announcement Bar Services (Public Read, Admin Write)
export const getAnnouncementFromFirebase = async () => {
  const path = 'settings/announcement';
  try {
    const snap = await getDoc(doc(db, 'settings', 'announcement'));
    if (snap.exists()) {
      return snap.data();
    }
  } catch (error) {
    console.warn('Could not read announcement from Firestore:', error);
  }
  return null;
};

export const saveAnnouncementToFirebase = async (announcement: any) => {
  const path = 'settings/announcement';
  try {
    await setDoc(doc(db, 'settings', 'announcement'), announcement, { merge: true });
  } catch (error) {
    handleFirestoreError(error, OperationType.WRITE, path);
  }
};
