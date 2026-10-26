import React, { useState } from 'react';
import { 
  Stethoscope, 
  User, 
  Calendar, 
  Plus, 
  Trash2, 
  Save, 
  CheckCircle, 
  Activity, 
  Pill, 
  FlaskConical,
  ArrowRight
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { DOCTORS } from '../data/hospitalData';
import { PrescriptionItem, LabReport } from '../types/hospital';

export const DoctorClinicalDesk: React.FC = () => {
  const { patients, selectedPatient, setSelectedPatient, addPatientVisit, setActiveNav } = useHospital();

  const [targetMrn, setTargetMrn] = useState(selectedPatient?.mrn || patients[0]?.mrn || '');
  const [selectedDocId, setSelectedDocId] = useState('dr-naila-qaisar');
  const [visitType, setVisitType] = useState<'OPD Consultation' | 'Follow-up' | 'Emergency' | 'Antenatal Checkup'>('OPD Consultation');
  const [visitDate, setVisitDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Vitals
  const [bp, setBp] = useState('120/80');
  const [pulse, setPulse] = useState(76);
  const [temp, setTemp] = useState(98.6);
  const [spo2, setSpo2] = useState(99);
  const [weight, setWeight] = useState(65);
  const [bloodSugar, setBloodSugar] = useState<number | ''>(110);

  // Clinical info
  const [complaint, setComplaint] = useState('Follow-up review of symptoms and routine monitoring.');
  const [diagnosis, setDiagnosis] = useState('Acute Pharyngitis & Mild Fever');
  const [notes, setNotes] = useState('Patient examined. Chest clear, throat mildly erythematous. Hydration advised. Course of oral analgesics and antipyretics started.');
  const [followUpDate, setFollowUpDate] = useState('');

  // Prescriptions list
  const [prescriptions, setPrescriptions] = useState<PrescriptionItem[]>([
    {
      medicineName: 'Tab. Panadol 500mg',
      type: 'Tablet',
      dosage: '1 Tab',
      frequency: '1 - 1 - 1 (Thrice daily)',
      duration: '3 Days',
      instructions: 'After meals if temperature rises.'
    }
  ]);

  const handleAddMedication = () => {
    setPrescriptions(prev => [
      ...prev,
      {
        medicineName: 'Cap. Amoxil 500mg',
        type: 'Capsule',
        dosage: '1 Cap',
        frequency: '1 - 0 - 1 (Twice daily)',
        duration: '5 Days',
        instructions: 'After breakfast and dinner.'
      }
    ]);
  };

  const handleRemoveMedication = (index: number) => {
    setPrescriptions(prev => prev.filter((_, i) => i !== index));
  };

  const handleUpdateMed = (index: number, field: keyof PrescriptionItem, value: any) => {
    setPrescriptions(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
  };

  const currentDoctor = DOCTORS.find(d => d.id === selectedDocId) || DOCTORS[0];
  const targetPatient = patients.find(p => p.mrn === targetMrn) || selectedPatient || patients[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!targetMrn) {
      alert('Please select a patient.');
      return;
    }

    addPatientVisit(targetMrn, {
      visitDate,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      departmentName: currentDoctor.departmentName,
      visitType,
      chiefComplaint: complaint,
      clinicalDiagnosis: diagnosis,
      doctorNotes: notes,
      vitals: {
        bloodPressure: bp,
        pulseRate: Number(pulse) || 72,
        temperature: Number(temp) || 98.6,
        oxygenSaturation: Number(spo2) || 99,
        weightKg: Number(weight) || 60,
        bloodSugar: bloodSugar ? { type: 'Random', value: Number(bloodSugar) } : undefined
      },
      prescriptions,
      labReports: [],
      nextFollowUpDate: followUpDate || undefined
    });

    if (targetPatient) {
      setSelectedPatient(targetPatient);
    }
    setActiveNav('patient-portal');
  };

  return (
    <section className="py-10 px-4 sm:px-6 max-w-6xl mx-auto">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-xl overflow-hidden">
        {/* Desk Header */}
        <div className="bg-slate-900 text-white p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800">
                Staff & Physician Clinical Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold font-display">
                Record Clinical Consultation / Add Visit Log
              </h2>
              <p className="text-xs sm:text-sm text-slate-300">
                Input clinical findings, recorded vitals, prescription orders, and update the patient's permanent electronic history.
              </p>
            </div>

            <button
              onClick={() => setActiveNav('patient-portal')}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-700 self-start sm:self-auto"
            >
              <span>View Existing Records</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Clinical Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          
          {/* Patient and Doctor Selection */}
          <div className="grid sm:grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Target Patient Medical Record (MRN) *
              </label>
              <select
                value={targetMrn}
                onChange={(e) => {
                  setTargetMrn(e.target.value);
                  const p = patients.find(pat => pat.mrn === e.target.value);
                  if (p) setSelectedPatient(p);
                }}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-teal-500"
              >
                {patients.map(p => (
                  <option key={p.mrn} value={p.mrn}>
                    {p.name} - MRN: {p.mrn} ({p.gender}, {p.age}y - {p.phone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Attending Consultant Physician *
              </label>
              <select
                value={selectedDocId}
                onChange={(e) => setSelectedDocId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold bg-white focus:ring-2 focus:ring-teal-500"
              >
                {DOCTORS.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name} ({d.departmentName})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Visit Type *
              </label>
              <select
                value={visitType}
                onChange={(e) => setVisitType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              >
                <option value="OPD Consultation">OPD Consultation</option>
                <option value="Follow-up">Follow-up</option>
                <option value="Antenatal Checkup">Antenatal Checkup</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Consultation Date *
              </label>
              <input
                type="date"
                required
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white"
              />
            </div>
          </div>

          {/* Vitals Input */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-teal-600" />
              <span>Patient Vitals at Triage</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  BP (mmHg)
                </label>
                <input
                  type="text"
                  value={bp}
                  onChange={(e) => setBp(e.target.value)}
                  placeholder="120/80"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Pulse (bpm)
                </label>
                <input
                  type="number"
                  value={pulse}
                  onChange={(e) => setPulse(Number(e.target.value))}
                  placeholder="76"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Temp (°F)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={temp}
                  onChange={(e) => setTemp(Number(e.target.value))}
                  placeholder="98.6"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  SpO2 (%)
                </label>
                <input
                  type="number"
                  value={spo2}
                  onChange={(e) => setSpo2(Number(e.target.value))}
                  placeholder="99"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  placeholder="65"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                  Blood Sugar (mg/dL)
                </label>
                <input
                  type="number"
                  value={bloodSugar}
                  onChange={(e) => setBloodSugar(e.target.value ? Number(e.target.value) : '')}
                  placeholder="110"
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-bold"
                />
              </div>
            </div>
          </div>

          {/* Diagnosis & Notes */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Chief Complaint Reported *
              </label>
              <input
                type="text"
                required
                value={complaint}
                onChange={(e) => setComplaint(e.target.value)}
                placeholder="e.g. Headache, high fever, abdominal cramps..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Primary Clinical Diagnosis *
              </label>
              <input
                type="text"
                required
                value={diagnosis}
                onChange={(e) => setDiagnosis(e.target.value)}
                placeholder="e.g. Acute Viral Bronchitis, Type 2 DM uncontrolled, Third Trimester Routine..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm font-semibold text-teal-900 focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Physician's Examination Notes & Treatment Plan *
              </label>
              <textarea
                rows={3}
                required
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Clinical observations, advice, dietary instructions..."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 text-sm focus:ring-2 focus:ring-teal-500"
              />
            </div>
          </div>

          {/* Prescriptions (Rx) Builder */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Pill className="w-4 h-4 text-teal-600" />
                <span>Prescription Orders (Rx)</span>
              </h3>
              <button
                type="button"
                onClick={handleAddMedication}
                className="px-3 py-1.5 bg-teal-50 text-teal-800 hover:bg-teal-100 rounded-lg text-xs font-bold flex items-center gap-1 border border-teal-200 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add Medicine</span>
              </button>
            </div>

            <div className="space-y-3">
              {prescriptions.map((rx, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid sm:grid-cols-12 gap-3 items-end">
                  <div className="sm:col-span-3">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Medicine Name</label>
                    <input
                      type="text"
                      value={rx.medicineName}
                      onChange={(e) => handleUpdateMed(idx, 'medicineName', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-slate-300 text-xs font-bold"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Type</label>
                    <select
                      value={rx.type}
                      onChange={(e) => handleUpdateMed(idx, 'type', e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-slate-300 text-xs"
                    >
                      <option value="Tablet">Tablet</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Syrup">Syrup</option>
                      <option value="Injection">Injection</option>
                      <option value="Drops">Drops</option>
                      <option value="Ointment">Ointment</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Frequency</label>
                    <input
                      type="text"
                      value={rx.frequency}
                      onChange={(e) => handleUpdateMed(idx, 'frequency', e.target.value)}
                      placeholder="1 - 0 - 1"
                      className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Duration</label>
                    <input
                      type="text"
                      value={rx.duration}
                      onChange={(e) => handleUpdateMed(idx, 'duration', e.target.value)}
                      placeholder="5 Days"
                      className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="block text-[11px] font-semibold text-slate-600 mb-1">Instructions</label>
                    <input
                      type="text"
                      value={rx.instructions}
                      onChange={(e) => handleUpdateMed(idx, 'instructions', e.target.value)}
                      placeholder="After meals"
                      className="w-full px-2.5 py-1.5 bg-white rounded-lg border border-slate-300 text-xs"
                    />
                  </div>

                  <div className="sm:col-span-1 flex justify-end">
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(idx)}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <label className="text-xs font-semibold text-slate-600">Next Follow-Up (Optional):</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-3.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-md shadow-teal-700/20 transition-all hover:scale-[1.01]"
            >
              <Save className="w-4 h-4" />
              <span>Save & Log Consultation to Patient History</span>
            </button>
          </div>

        </form>
      </div>
    </section>
  );
};
