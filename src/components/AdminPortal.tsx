import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  UserCheck, 
  Plus, 
  Edit3, 
  Trash2, 
  Search, 
  Calendar, 
  Clock, 
  FileText, 
  Activity, 
  Pill, 
  FlaskConical, 
  Printer, 
  CheckCircle, 
  X, 
  LogOut, 
  Stethoscope, 
  DollarSign, 
  Database,
  ArrowRight,
  AlertTriangle,
  User,
  MapPin,
  HeartPulse,
  Megaphone,
  BellRing,
  Save
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { Doctor, Patient, Appointment, PrescriptionItem } from '../types/hospital';
import { DEPARTMENTS } from '../data/hospitalData';

export const AdminPortal: React.FC = () => {
  const { 
    isAdminLoggedIn, 
    adminUser, 
    loginWithGoogleAdmin, 
    loginWithPinAdmin, 
    logoutAdmin,
    doctors,
    addDoctor,
    updateDoctor,
    deleteDoctor,
    patients,
    selectedPatient,
    setSelectedPatient,
    findPatientByQuery,
    addPatientVisit,
    appointments,
    updateAppointmentStatus,
    setPrintableSlip,
    isFirebaseConnected,
    setActiveNav,
    announcement,
    updateAnnouncement
  } = useHospital();

  const [pinInput, setPinInput] = useState('');
  const [adminTab, setAdminTab] = useState<'doctors' | 'patients' | 'appointments' | 'announcement'>('doctors');

  // Announcement Bar Form State
  const [annText, setAnnText] = useState(announcement.text);
  const [annBadge, setAnnBadge] = useState(announcement.badge);
  const [annPhone, setAnnPhone] = useState(announcement.emergencyPhone);
  const [annActive, setAnnActive] = useState(announcement.isActive);
  const [isSavingAnn, setIsSavingAnn] = useState(false);

  // Doctor CRUD State
  const [doctorModalOpen, setDoctorModalOpen] = useState(false);
  const [editingDoctor, setEditingDoctor] = useState<Doctor | null>(null);

  const [docName, setDocName] = useState('');
  const [docTitle, setDocTitle] = useState('');
  const [docQualification, setDocQualification] = useState('');
  const [docDeptId, setDocDeptId] = useState('gynae-obs');
  const [docExperience, setDocExperience] = useState(10);
  const [docFee, setDocFee] = useState(1500);
  const [docMorningTiming, setDocMorningTiming] = useState('09:30 AM - 01:30 PM');
  const [docEveningTiming, setDocEveningTiming] = useState('05:00 PM - 09:00 PM');
  const [docRoom, setDocRoom] = useState('Room 01');
  const [docAvatar, setDocAvatar] = useState('https://images.unsplash.com/photo-1594824813586-7a7027d191c9?auto=format&fit=crop&q=80&w=400');
  const [docSpecialties, setDocSpecialties] = useState('Obstetrics, Laparoscopy, Infertility');
  const [docBio, setDocBio] = useState('Senior consultant providing specialized medical care at Naila Qaisar Hospital.');

  // Patient Search & EHR Viewer State
  const [patientSearch, setPatientSearch] = useState('');
  const [activeEhrPatient, setActiveEhrPatient] = useState<Patient>(selectedPatient || patients[0]);
  const [addVisitModalOpen, setAddVisitModalOpen] = useState(false);

  // New Visit Form State
  const [visitDiagnosis, setVisitDiagnosis] = useState('');
  const [visitComplaint, setVisitComplaint] = useState('');
  const [visitNotes, setVisitNotes] = useState('');
  const [visitDoctorId, setVisitDoctorId] = useState(doctors[0]?.id || 'dr-naila-qaisar');
  const [visitBp, setVisitBp] = useState('120/80');
  const [visitPulse, setVisitPulse] = useState(76);
  const [visitTemp, setVisitTemp] = useState(98.6);
  const [visitSpo2, setVisitSpo2] = useState(99);
  const [visitSugar, setVisitSugar] = useState('110');
  const [visitWeight, setVisitWeight] = useState('65');

  // Open doctor modal (for create or edit)
  const handleOpenDoctorModal = (docToEdit?: Doctor) => {
    if (docToEdit) {
      setEditingDoctor(docToEdit);
      setDocName(docToEdit.name);
      setDocTitle(docToEdit.title);
      setDocQualification(docToEdit.qualification);
      setDocDeptId(docToEdit.departmentId);
      setDocExperience(docToEdit.experienceYears);
      setDocFee(docToEdit.consultationFee);
      setDocMorningTiming(docToEdit.timingMorning);
      setDocEveningTiming(docToEdit.timingEvening);
      setDocRoom(docToEdit.roomNo);
      setDocAvatar(docToEdit.avatarUrl);
      setDocSpecialties(docToEdit.specialties.join(', '));
      setDocBio(docToEdit.bio);
    } else {
      setEditingDoctor(null);
      setDocName('');
      setDocTitle('Consultant Specialist');
      setDocQualification('MBBS, FCPS');
      setDocDeptId('gynae-obs');
      setDocExperience(10);
      setDocFee(1500);
      setDocMorningTiming('09:30 AM - 01:30 PM');
      setDocEveningTiming('05:00 PM - 09:00 PM');
      setDocRoom('Room 06');
      setDocAvatar('https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=400');
      setDocSpecialties('General Consultation, Surgery');
      setDocBio('Experienced physician dedicated to patient care at NQH.');
    }
    setDoctorModalOpen(true);
  };

  const handleSaveDoctor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!docName.trim()) return;

    const deptObj = DEPARTMENTS.find(d => d.id === docDeptId) || DEPARTMENTS[0];
    const specialtiesArr = docSpecialties.split(',').map(s => s.trim()).filter(Boolean);

    if (editingDoctor) {
      await updateDoctor(editingDoctor.id, {
        name: docName,
        title: docTitle,
        qualification: docQualification,
        departmentId: docDeptId,
        departmentName: deptObj.name,
        experienceYears: Number(docExperience),
        consultationFee: Number(docFee),
        timingMorning: docMorningTiming,
        timingEvening: docEveningTiming,
        roomNo: docRoom,
        avatarUrl: docAvatar,
        specialties: specialtiesArr,
        bio: docBio,
      });
    } else {
      await addDoctor({
        name: docName,
        title: docTitle,
        qualification: docQualification,
        departmentId: docDeptId,
        departmentName: deptObj.name,
        experienceYears: Number(docExperience),
        consultationFee: Number(docFee),
        availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        timingMorning: docMorningTiming,
        timingEvening: docEveningTiming,
        roomNo: docRoom,
        avatarUrl: docAvatar,
        specialties: specialtiesArr,
        bio: docBio,
      });
    }

    setDoctorModalOpen(false);
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = loginWithPinAdmin(pinInput);
    if (!ok) {
      alert('Invalid passkey. Authorized hospital access only.');
    }
  };

  const handleSaveNewVisit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!visitDiagnosis || !activeEhrPatient) return;

    const docObj = doctors.find(d => d.id === visitDoctorId) || doctors[0];

    await addPatientVisit(activeEhrPatient.mrn, {
      visitDate: new Date().toISOString().split('T')[0],
      doctorId: docObj.id,
      doctorName: docObj.name,
      departmentName: docObj.departmentName,
      visitType: 'OPD Consultation',
      chiefComplaint: visitComplaint || 'Routine medical review',
      clinicalDiagnosis: visitDiagnosis,
      doctorNotes: visitNotes || 'Patient examined. Prescription and care plan explained.',
      vitals: {
        bloodPressure: visitBp,
        pulseRate: Number(visitPulse) || 76,
        temperature: Number(visitTemp) || 98.6,
        oxygenSaturation: Number(visitSpo2) || 99,
        weightKg: Number(visitWeight) || 65,
        bloodSugar: visitSugar ? { type: 'Random', value: Number(visitSugar) } : undefined
      },
      prescriptions: [
        {
          medicineName: 'Tab. Panadol 500mg',
          type: 'Tablet',
          dosage: '1 Tab',
          frequency: '1 - 1 - 1',
          duration: '3 Days',
          instructions: 'After meals'
        }
      ],
      labReports: []
    });

    setAddVisitModalOpen(false);
    setVisitDiagnosis('');
    setVisitComplaint('');
    setVisitNotes('');
  };

  const handleSaveAnnouncement = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAnn(true);
    try {
      await updateAnnouncement({
        text: annText,
        badge: annBadge,
        emergencyPhone: annPhone,
        isActive: annActive
      });
    } finally {
      setIsSavingAnn(false);
    }
  };

  // If not logged in, show secure login screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-slate-200 shadow-2xl p-8 space-y-6">
          <div className="text-center space-y-2">
            <img 
              src="/assets/aistudio/269987747_105111912043228_6478892669618936698_n_099deaf1.jpg" 
              alt="Naila Qaisar Hospital Logo" 
              className="w-16 h-16 rounded-full object-contain mx-auto shadow-md border border-slate-100 bg-white"
            />
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-200">
              Hospital Administration
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 font-display">
              Hospital Staff Login
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              Sign in to manage doctor rosters, update the announcement bar, and access confidential electronic health records.
            </p>
          </div>

          <div className="space-y-4">
            <button
              onClick={loginWithGoogleAdmin}
              className="w-full py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm border border-slate-300 rounded-xl flex items-center justify-center gap-2.5 shadow-xs transition-all hover:border-slate-400"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Sign In with Google</span>
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-slate-200 w-full"></div>
              <span className="bg-white px-3 text-[11px] text-slate-400 uppercase font-semibold">Or Staff Passkey</span>
            </div>

            <form onSubmit={handlePinSubmit} className="space-y-3">
              <div>
                <input
                  type="password"
                  placeholder="Enter staff security passkey"
                  value={pinInput}
                  onChange={(e) => setPinInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-colors"
              >
                Login
              </button>
            </form>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-600 flex items-center justify-between">
              <span>Staff Demo Key:</span>
              <button
                type="button"
                onClick={() => loginWithPinAdmin('nqh2026')}
                className="px-2.5 py-1 bg-white rounded border border-slate-300 font-mono text-[11px] font-bold text-slate-800 hover:bg-slate-100"
              >
                nqh2026
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Logged-in Admin View
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              Authenticated Session
            </span>
            <span className="flex items-center gap-1 text-[11px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-800">
              <Database className="w-3 h-3" />
              <span>Firebase Connected</span>
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
            Hospital Administration & EHR Control
          </h2>
          <p className="text-xs text-slate-300">
            Account: <strong className="text-white">{'email' in adminUser! ? adminUser.email : 'Hospital Administrator'}</strong>
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setActiveNav('home')}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold border border-slate-700 transition-colors"
          >
            View Public Website
          </button>
          <button
            onClick={logoutAdmin}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Admin Nav Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
        <button
          onClick={() => setAdminTab('doctors')}
          className={`px-4 py-3 rounded-t-xl font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            adminTab === 'doctors'
              ? 'border-teal-600 text-teal-700 bg-teal-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Doctor Roster & Schedules CRUD ({doctors.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('announcement')}
          className={`px-4 py-3 rounded-t-xl font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            adminTab === 'announcement'
              ? 'border-teal-600 text-teal-700 bg-teal-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Megaphone className="w-4 h-4" />
          <span>Top Announcement Bar</span>
        </button>

        <button
          onClick={() => setAdminTab('patients')}
          className={`px-4 py-3 rounded-t-xl font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            adminTab === 'patients'
              ? 'border-teal-600 text-teal-700 bg-teal-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>Concealed Patient Health Records ({patients.length})</span>
        </button>

        <button
          onClick={() => setAdminTab('appointments')}
          className={`px-4 py-3 rounded-t-xl font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
            adminTab === 'appointments'
              ? 'border-teal-600 text-teal-700 bg-teal-50/50'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Calendar className="w-4 h-4" />
          <span>Online Appointment Bookings ({appointments.length})</span>
        </button>
      </div>

      {/* TAB: ANNOUNCEMENT BAR MANAGER */}
      {adminTab === 'announcement' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h3 className="text-xl font-bold text-slate-900 font-display flex items-center gap-2">
              <Megaphone className="w-5 h-5 text-teal-600" />
              <span>Top Announcement Bar Manager</span>
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Changes made here update the top alert banner on the public hospital landing page in real-time via Firebase Firestore.
            </p>
          </div>

          {/* Live Preview Box */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
              Live Preview
            </span>
            <div className="bg-slate-950 text-white text-xs py-2 px-4 rounded-xl border border-teal-500/40 flex items-center justify-between gap-3 overflow-hidden">
              <div className="flex items-center gap-2.5 min-w-0 flex-1 overflow-hidden">
                <span className="bg-teal-500/20 text-teal-300 font-bold px-2 py-0.5 rounded-full border border-teal-400/40 text-[10px] uppercase shrink-0">
                  {annBadge || 'Notice'}
                </span>
                
                <div 
                  className="marquee-container relative flex-1 overflow-hidden py-0.5 cursor-pointer"
                  title="Hover cursor to pause announcement"
                >
                  <div className="marquee-track flex items-center whitespace-nowrap">
                    <div className="flex items-center gap-8 pr-8">
                      <span className="text-slate-200 text-xs font-medium">{annText || 'Announcement preview text...'}</span>
                      <span className="text-teal-400 font-bold">•</span>
                      <span className="text-slate-200 text-xs font-medium">{annText || 'Announcement preview text...'}</span>
                      <span className="text-teal-400 font-bold">•</span>
                    </div>
                    <div className="flex items-center gap-8 pr-8" aria-hidden="true">
                      <span className="text-slate-200 text-xs font-medium">{annText || 'Announcement preview text...'}</span>
                      <span className="text-teal-400 font-bold">•</span>
                      <span className="text-slate-200 text-xs font-medium">{annText || 'Announcement preview text...'}</span>
                      <span className="text-teal-400 font-bold">•</span>
                    </div>
                  </div>
                </div>
              </div>

              <span className="bg-red-600 text-white px-2 py-0.5 rounded text-[10px] font-bold shrink-0">
                Helpline: {annPhone}
              </span>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSaveAnnouncement} className="space-y-4 max-w-3xl">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Announcement Message Text *
              </label>
              <textarea
                rows={3}
                required
                value={annText}
                onChange={(e) => setAnnText(e.target.value)}
                placeholder="Hospital announcement, OPD schedule notice, or public advisory..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Alert Badge Label
                </label>
                <input
                  type="text"
                  required
                  value={annBadge}
                  onChange={(e) => setAnnBadge(e.target.value)}
                  placeholder="e.g. Hospital Notice, OPD Update, Holiday Schedule"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Helpline / Emergency Phone
                </label>
                <input
                  type="text"
                  required
                  value={annPhone}
                  onChange={(e) => setAnnPhone(e.target.value)}
                  placeholder="053-7517700"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-slate-800">
                <input
                  type="checkbox"
                  checked={annActive}
                  onChange={(e) => setAnnActive(e.target.checked)}
                  className="w-4 h-4 text-teal-600 rounded"
                />
                <span>Display Announcement Bar on Public Website</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
                Last updated: {new Date(announcement.updatedAt).toLocaleTimeString()}
              </span>

              <button
                type="submit"
                disabled={isSavingAnn}
                className="px-6 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{isSavingAnn ? 'Saving...' : 'Save & Publish Announcement'}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TAB 1: DOCTORS CRUD */}
      {adminTab === 'doctors' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200">
            <div>
              <h3 className="font-bold text-lg text-slate-900">Manage Doctors, Schedules & Consultation Fees</h3>
              <p className="text-xs text-slate-500">
                Create, update, or remove specialist doctors. Updates immediately reflect on the public hospital front page and Firebase.
              </p>
            </div>
            <button
              onClick={() => handleOpenDoctorModal()}
              className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors shrink-0"
            >
              <Plus className="w-4 h-4" />
              <span>+ Add New Doctor</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {doctors.map((doc) => (
              <div
                key={doc.id}
                className="bg-white rounded-3xl border border-slate-200 shadow-xs p-5 flex flex-col justify-between hover:border-slate-300 transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <img
                      src={doc.avatarUrl}
                      alt={doc.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <span className="text-[10px] font-bold uppercase text-teal-800 bg-teal-50 px-2 py-0.5 rounded">
                        {doc.departmentName}
                      </span>
                      <h4 className="font-bold text-base text-slate-900 truncate mt-1">{doc.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{doc.title}</p>
                      <p className="text-[11px] text-slate-400">{doc.qualification}</p>
                    </div>
                  </div>

                  {/* Schedule Box */}
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-500">Morning OPD:</span>
                      <strong className="text-slate-800">{doc.timingMorning}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Evening Clinic:</span>
                      <strong className="text-slate-800">{doc.timingEvening}</strong>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-slate-200">
                      <span className="text-slate-500">Consultation Fee:</span>
                      <strong className="text-teal-700 font-bold">Rs. {doc.consultationFee}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-500">Room:</span>
                      <span className="text-slate-700">{doc.roomNo}</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2">{doc.bio}</p>
                </div>

                {/* Actions */}
                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleOpenDoctorModal(doc)}
                    className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>Edit Schedule / Fee</span>
                  </button>

                  <button
                    onClick={() => {
                      if (confirm(`Remove ${doc.name} from the active clinic roster?`)) {
                        deleteDoctor(doc.id);
                      }
                    }}
                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-xl transition-colors"
                    title="Delete Doctor"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: CONCEALED PATIENT HEALTH RECORDS (EHR) */}
      {adminTab === 'patients' && (
        <div className="space-y-6">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-center gap-3 text-xs text-amber-900">
            <Lock className="w-4 h-4 text-amber-700 shrink-0" />
            <span>
              <strong>Confidentiality Notice:</strong> Patient vitals, lab reports, and consultation histories are strictly restricted to this session and concealed from the public website.
            </span>
          </div>

          <div className="grid lg:grid-cols-12 gap-6 items-start">
            
            {/* Left: Patient List & Search */}
            <div className="lg:col-span-4 bg-white rounded-2xl border border-slate-200 p-4 space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search by MRN, phone, or name..."
                  value={patientSearch}
                  onChange={(e) => setPatientSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl"
                />
              </div>

              <div className="space-y-2 max-h-[500px] overflow-y-auto">
                {patients
                  .filter(p => !patientSearch || p.name.toLowerCase().includes(patientSearch.toLowerCase()) || p.mrn.includes(patientSearch) || p.phone.includes(patientSearch))
                  .map(p => {
                    const isSelected = activeEhrPatient.mrn === p.mrn;
                    return (
                      <div
                        key={p.mrn}
                        onClick={() => setActiveEhrPatient(p)}
                        className={`p-3 rounded-xl cursor-pointer border transition-all ${
                          isSelected
                            ? 'bg-teal-50 border-teal-600 shadow-xs'
                            : 'bg-white border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex justify-between items-start">
                          <h4 className="font-bold text-xs text-slate-900">{p.name}</h4>
                          <span className="text-[10px] font-mono text-teal-800 bg-teal-100 px-1.5 py-0.2 rounded font-bold">
                            {p.mrn}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500 mt-0.5">
                          {p.gender}, {p.age}y • Tel: {p.phone}
                        </p>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          {p.visits.length} Recorded Visits in EHR
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Right: Active Patient Medical History Details */}
            <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-200 p-6 space-y-6">
              
              {/* Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold text-slate-900 font-display">{activeEhrPatient.name}</h3>
                    <span className="text-xs font-mono font-bold text-teal-800 bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
                      {activeEhrPatient.mrn}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-1">
                    Age: {activeEhrPatient.age} | Sex: {activeEhrPatient.gender} | Blood: {activeEhrPatient.bloodGroup} | Phone: {activeEhrPatient.phone}
                  </p>
                </div>

                <button
                  onClick={() => setAddVisitModalOpen(true)}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Record New Visit</span>
                </button>
              </div>

              {/* Visits Timeline */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  Electronic Visit Logs ({activeEhrPatient.visits.length})
                </h4>

                {activeEhrPatient.visits.map((v) => (
                  <div key={v.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-xs font-bold text-slate-900 block">{v.clinicalDiagnosis}</span>
                        <span className="text-[11px] text-teal-700 font-medium">
                          Dr. {v.doctorName} • {v.visitDate} ({v.visitType})
                        </span>
                      </div>

                      <button
                        onClick={() => setPrintableSlip({ type: 'prescription', data: { patient: activeEhrPatient, visit: v } })}
                        className="px-3 py-1 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1 hover:bg-slate-800"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Print Prescription</span>
                      </button>
                    </div>

                    {/* Vitals */}
                    <div className="grid grid-cols-4 gap-2 text-[11px] bg-white p-2.5 rounded-xl border border-slate-200">
                      <div><span className="text-slate-400">BP:</span> <strong>{v.vitals.bloodPressure}</strong></div>
                      <div><span className="text-slate-400">Pulse:</span> <strong>{v.vitals.pulseRate} bpm</strong></div>
                      <div><span className="text-slate-400">Temp:</span> <strong>{v.vitals.temperature}°F</strong></div>
                      <div><span className="text-slate-400">SpO2:</span> <strong>{v.vitals.oxygenSaturation}%</strong></div>
                    </div>

                    <p className="text-xs text-slate-700"><strong>Doctor's Notes:</strong> {v.doctorNotes}</p>

                    {v.prescriptions.length > 0 && (
                      <div className="space-y-1">
                        <span className="text-[11px] font-bold text-slate-500 uppercase">Prescribed (Rx):</span>
                        <div className="space-y-1">
                          {v.prescriptions.map((rx, rIdx) => (
                            <div key={rIdx} className="text-xs text-slate-800 flex justify-between bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                              <span><strong>{rx.medicineName}</strong> ({rx.dosage})</span>
                              <span className="text-teal-700 font-semibold">{rx.frequency} - {rx.duration}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 3: APPOINTMENTS BOOKING LIST */}
      {adminTab === 'appointments' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900">Online OPD Appointments & Tokens</h3>
              <p className="text-xs text-slate-500">Live appointments synced with Firebase Firestore database</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-3">Token #</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Contact</th>
                  <th className="p-3">Doctor</th>
                  <th className="p-3">Date & Slot</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {appointments.map((a) => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="p-3">
                      <span className="px-2 py-1 bg-teal-600 text-white font-extrabold rounded-md text-xs">
                        #{a.tokenNumber}
                      </span>
                    </td>
                    <td className="p-3">
                      <strong className="text-slate-900 block">{a.patientName}</strong>
                      <span className="text-[10px] text-slate-400">Age: {a.patientAge} | {a.patientGender}</span>
                    </td>
                    <td className="p-3 font-mono">{a.patientPhone}</td>
                    <td className="p-3 font-semibold text-slate-800">{a.doctorName}</td>
                    <td className="p-3">
                      <span>{a.appointmentDate}</span>
                      <span className="block text-[10px] text-slate-500">{a.timeSlot}</span>
                    </td>
                    <td className="p-3">
                      <select
                        value={a.status}
                        onChange={(e) => updateAppointmentStatus(a.id, e.target.value as any)}
                        className={`text-xs font-bold rounded-lg px-2 py-1 border ${
                          a.status === 'Confirmed' ? 'bg-emerald-50 text-emerald-800 border-emerald-300' :
                          a.status === 'Checked-In' ? 'bg-blue-50 text-blue-800 border-blue-300' :
                          a.status === 'Completed' ? 'bg-slate-100 text-slate-800 border-slate-300' :
                          'bg-red-50 text-red-800 border-red-300'
                        }`}
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Checked-In">Checked-In</option>
                        <option value="In Consultation">In Consultation</option>
                        <option value="Completed">Completed</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <button
                        onClick={() => setPrintableSlip({ type: 'token', data: a })}
                        className="p-1.5 text-slate-700 hover:text-teal-700 hover:bg-slate-100 rounded-lg"
                        title="Print Token Slip"
                      >
                        <Printer className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* CREATE / EDIT DOCTOR MODAL */}
      {doctorModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-lg font-display">
                  {editingDoctor ? 'Edit Doctor Schedule & Profile' : 'Add New Specialist Doctor'}
                </h3>
                <p className="text-xs text-slate-300">Synchronized directly with Firebase database</p>
              </div>
              <button
                onClick={() => setDoctorModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveDoctor} className="p-6 space-y-4 text-xs">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Doctor Full Name *</label>
                  <input
                    type="text"
                    required
                    value={docName}
                    onChange={(e) => setDocName(e.target.value)}
                    placeholder="Full Name (with Dr. prefix)"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Professional Title</label>
                  <input
                    type="text"
                    value={docTitle}
                    onChange={(e) => setDocTitle(e.target.value)}
                    placeholder="Consultant Obstetrician / General Surgeon"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Medical Department *</label>
                  <select
                    value={docDeptId}
                    onChange={(e) => setDocDeptId(e.target.value)}
                    className="w-full px-3 py-2 border rounded-xl bg-white"
                  >
                    {DEPARTMENTS.map(d => (
                      <option key={d.id} value={d.id}>{d.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Qualifications & Fellowships</label>
                  <input
                    type="text"
                    value={docQualification}
                    onChange={(e) => setDocQualification(e.target.value)}
                    placeholder="MBBS, FCPS, Fellowships"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consultation Fee (PKR) *</label>
                  <input
                    type="number"
                    required
                    value={docFee}
                    onChange={(e) => setDocFee(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl font-bold"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Experience (Years)</label>
                  <input
                    type="number"
                    value={docExperience}
                    onChange={(e) => setDocExperience(Number(e.target.value))}
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Consultation Suite</label>
                  <input
                    type="text"
                    value={docRoom}
                    onChange={(e) => setDocRoom(e.target.value)}
                    placeholder="Room Number / Floor"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Morning OPD Schedule *</label>
                  <input
                    type="text"
                    required
                    value={docMorningTiming}
                    onChange={(e) => setDocMorningTiming(e.target.value)}
                    placeholder="09:00 AM - 01:30 PM"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Evening Clinic Schedule *</label>
                  <input
                    type="text"
                    required
                    value={docEveningTiming}
                    onChange={(e) => setDocEveningTiming(e.target.value)}
                    placeholder="05:00 PM - 09:30 PM"
                    className="w-full px-3 py-2 border rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Specialties & Procedures</label>
                <input
                  type="text"
                  value={docSpecialties}
                  onChange={(e) => setDocSpecialties(e.target.value)}
                  placeholder="Specialization areas separated by commas"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Doctor Biography & Profile</label>
                <textarea
                  rows={2}
                  value={docBio}
                  onChange={(e) => setDocBio(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setDoctorModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl shadow-xs"
                >
                  {editingDoctor ? 'Save Schedule Updates' : 'Add to Doctor Directory'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* RECORD NEW VISIT MODAL */}
      {addVisitModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-slate-900 text-white p-6 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-base font-display">Record Clinical Consultation</h3>
                <p className="text-xs text-slate-300">Patient: {activeEhrPatient.name} (MRN: {activeEhrPatient.mrn})</p>
              </div>
              <button onClick={() => setAddVisitModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveNewVisit} className="p-6 space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Attending Doctor *</label>
                <select
                  value={visitDoctorId}
                  onChange={(e) => setVisitDoctorId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
                >
                  {doctors.map(d => (
                    <option key={d.id} value={d.id}>{d.name} ({d.departmentName})</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-4 gap-2">
                <div>
                  <label className="block font-medium text-slate-600 mb-1">BP (mmHg)</label>
                  <input type="text" value={visitBp} onChange={(e) => setVisitBp(e.target.value)} className="w-full px-2 py-1.5 border rounded-lg font-bold" />
                </div>
                <div>
                  <label className="block font-medium text-slate-600 mb-1">Pulse</label>
                  <input type="number" value={visitPulse} onChange={(e) => setVisitPulse(Number(e.target.value))} className="w-full px-2 py-1.5 border rounded-lg font-bold" />
                </div>
                <div>
                  <label className="block font-medium text-slate-600 mb-1">Temp °F</label>
                  <input type="number" step="0.1" value={visitTemp} onChange={(e) => setVisitTemp(Number(e.target.value))} className="w-full px-2 py-1.5 border rounded-lg font-bold" />
                </div>
                <div>
                  <label className="block font-medium text-slate-600 mb-1">SpO2 %</label>
                  <input type="number" value={visitSpo2} onChange={(e) => setVisitSpo2(Number(e.target.value))} className="w-full px-2 py-1.5 border rounded-lg font-bold" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Chief Complaint Reported</label>
                <input
                  type="text"
                  value={visitComplaint}
                  onChange={(e) => setVisitComplaint(e.target.value)}
                  placeholder="Patient presented complaints"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Primary Clinical Diagnosis *</label>
                <input
                  type="text"
                  required
                  value={visitDiagnosis}
                  onChange={(e) => setVisitDiagnosis(e.target.value)}
                  placeholder="Provisional or confirmed diagnosis"
                  className="w-full px-3 py-2 border rounded-xl font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Clinical Notes & Treatment Plan</label>
                <textarea
                  rows={2}
                  value={visitNotes}
                  onChange={(e) => setVisitNotes(e.target.value)}
                  placeholder="Clinical examination observations and instructions"
                  className="w-full px-3 py-2 border rounded-xl"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setAddVisitModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 text-slate-700 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl"
                >
                  Save to EHR History
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
