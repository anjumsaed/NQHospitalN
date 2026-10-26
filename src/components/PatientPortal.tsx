import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  User, 
  Calendar, 
  Clock, 
  Activity, 
  Pill, 
  FlaskConical, 
  Printer, 
  Plus, 
  CheckCircle, 
  AlertTriangle, 
  ChevronDown, 
  ChevronUp, 
  ExternalLink,
  Shield,
  Heart,
  Droplets,
  Thermometer,
  Zap,
  MapPin,
  Phone,
  ArrowRight
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { Patient, PatientVisitRecord } from '../types/hospital';

export const PatientPortal: React.FC = () => {
  const { 
    patients, 
    selectedPatient, 
    setSelectedPatient, 
    findPatientByQuery, 
    setPrintableSlip, 
    setActiveNav,
    appointments 
  } = useHospital();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'visits' | 'prescriptions' | 'labs' | 'appointments'>('visits');
  const [expandedVisitId, setExpandedVisitId] = useState<string | null>(
    selectedPatient?.visits[0]?.id || null
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    const found = findPatientByQuery(searchQuery);
    if (found) {
      setSelectedPatient(found);
      setExpandedVisitId(found.visits[0]?.id || null);
    } else {
      alert(`No patient record found matching "${searchQuery}". Please check MRN or Mobile number.`);
    }
  };

  const currentPatient = selectedPatient || patients[0];

  const patientAppointments = appointments.filter(
    a => a.patientMrn === currentPatient?.mrn || a.patientPhone === currentPatient?.phone
  );

  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Shield className="w-3.5 h-3.5 text-teal-600" />
            <span>Confidential Electronic Health Record (EHR)</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
            Patient History Logs & Medical Records
          </h2>
          <p className="text-sm text-slate-600 mt-1 max-w-2xl">
            Access lifetime diagnostic reports, physician consultation notes, prescription histories, 
            and vital sign logs from Naila Qaisar Hospital.
          </p>
        </div>

        {/* Doctor / Staff Log Action */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveNav('clinical-desk')}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>+ Add Clinical Visit (Doctor Desk)</span>
          </button>
        </div>
      </div>

      {/* Patient Search Bar & Quick Demo Patients Switcher */}
      <div className="my-6 bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleSearch} className="flex flex-col sm:flex-row items-stretch gap-2.5">
          <div className="relative flex-1">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by Patient MRN (e.g. NQH-2024-1042), Phone (0333-7004949), CNIC or Name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm text-slate-900 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition-colors shadow-xs"
          >
            <Search className="w-4 h-4" />
            <span>Search Patient Records</span>
          </button>
        </form>

        {/* Sample Patient Quick Switcher */}
        <div className="flex items-center gap-2 text-xs flex-wrap pt-1 border-t border-slate-100">
          <span className="text-slate-500 font-semibold">Select Pre-loaded Hospital File:</span>
          {patients.map(p => {
            const isSelected = currentPatient?.mrn === p.mrn;
            return (
              <button
                key={p.mrn}
                onClick={() => {
                  setSelectedPatient(p);
                  setExpandedVisitId(p.visits[0]?.id || null);
                }}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-teal-700 text-white shadow-xs font-bold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                <span>{p.name}</span>
                <span className={`text-[10px] px-1 py-0.2 rounded ${isSelected ? 'bg-teal-800 text-teal-200' : 'bg-slate-200 text-slate-600'}`}>
                  {p.gender === 'Female' ? 'F' : 'M'}, {p.age}y
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {currentPatient ? (
        <div className="space-y-6">
          {/* Patient Overview Bio Banner */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-teal-950 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-slate-700/80">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-teal-500/20 border-2 border-teal-400 text-teal-300 flex items-center justify-center font-bold text-2xl font-display shrink-0">
                  {currentPatient.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white">
                      {currentPatient.name}
                    </h3>
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                      MRN: {currentPatient.mrn}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-300">
                    <span><strong>Age:</strong> {currentPatient.age} Years</span>
                    <span>•</span>
                    <span><strong>Gender:</strong> {currentPatient.gender}</span>
                    <span>•</span>
                    <span><strong>Blood Group:</strong> {currentPatient.bloodGroup}</span>
                    <span>•</span>
                    <span><strong>Phone:</strong> {currentPatient.phone}</span>
                  </div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-teal-400 shrink-0" />
                    <span>{currentPatient.address}, {currentPatient.city}</span>
                    <span>|</span>
                    <span>CNIC: {currentPatient.cnic}</span>
                  </div>
                </div>
              </div>

              {/* Badges / Medical Alerts */}
              <div className="flex flex-wrap lg:flex-col items-start lg:items-end gap-2.5 border-t lg:border-t-0 pt-4 lg:pt-0 border-slate-700">
                {currentPatient.allergies && currentPatient.allergies.length > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-950/80 border border-red-700 text-red-200 text-xs font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                    <span>Allergies: {currentPatient.allergies.join(', ')}</span>
                  </div>
                )}
                
                {currentPatient.chronicConditions && currentPatient.chronicConditions.length > 0 && (
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-950/80 border border-amber-700 text-amber-200 text-xs font-semibold">
                    <Heart className="w-3.5 h-3.5 text-amber-400" />
                    <span>Chronic: {currentPatient.chronicConditions.join(', ')}</span>
                  </div>
                )}

                <div className="text-xs text-slate-400 flex items-center gap-2">
                  <Phone className="w-3 h-3 text-slate-400" />
                  <span>Emergency Kin: {currentPatient.emergencyContact.name} ({currentPatient.emergencyContact.phone})</span>
                </div>
              </div>

            </div>
          </div>

          {/* Sub Navigation Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-200 overflow-x-auto pb-1">
            <button
              onClick={() => setActiveTab('visits')}
              className={`px-4 py-3 rounded-t-xl font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'visits'
                  ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FileText className="w-4 h-4" />
              <span>Medical History Logs ({currentPatient.visits.length} Visits)</span>
            </button>

            <button
              onClick={() => setActiveTab('prescriptions')}
              className={`px-4 py-3 rounded-t-xl font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'prescriptions'
                  ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Pill className="w-4 h-4" />
              <span>Prescriptions & Medications</span>
            </button>

            <button
              onClick={() => setActiveTab('labs')}
              className={`px-4 py-3 rounded-t-xl font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'labs'
                  ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <FlaskConical className="w-4 h-4" />
              <span>Diagnostic Lab & Ultrasound Reports</span>
            </button>

            <button
              onClick={() => setActiveTab('appointments')}
              className={`px-4 py-3 rounded-t-xl font-bold text-sm flex items-center gap-2 border-b-2 transition-all whitespace-nowrap ${
                activeTab === 'appointments'
                  ? 'border-teal-600 text-teal-700 bg-teal-50/50'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Scheduled OPD Appointments ({patientAppointments.length})</span>
            </button>
          </div>

          {/* TAB 1: VISITS & CONSULTATION LOGS */}
          {activeTab === 'visits' && (
            <div className="space-y-4">
              {currentPatient.visits.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
                  <FileText className="w-12 h-12 text-slate-300 mx-auto mb-2" />
                  <h4 className="text-base font-bold text-slate-700">No Consultation History Yet</h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Book an OPD appointment or use the Clinical Entry Desk to log a clinical visit.
                  </p>
                </div>
              ) : (
                currentPatient.visits.map((visit, index) => {
                  const isExpanded = expandedVisitId === visit.id;
                  return (
                    <div
                      key={visit.id}
                      className="bg-white rounded-2xl border border-slate-200/90 shadow-xs overflow-hidden transition-all hover:border-slate-300"
                    >
                      {/* Visit Header Strip */}
                      <div 
                        onClick={() => setExpandedVisitId(isExpanded ? null : visit.id)}
                        className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/70"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2.5 py-0.5 rounded-full">
                              {visit.visitType}
                            </span>
                            <span className="text-xs font-semibold text-slate-500 flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5 text-slate-400" />
                              {new Date(visit.visitDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                            </span>
                            <span className="text-xs text-slate-400">ID: {visit.id}</span>
                          </div>
                          <h4 className="text-lg font-bold text-slate-900">
                            {visit.clinicalDiagnosis}
                          </h4>
                          <p className="text-xs text-slate-600">
                            Consultant: <strong className="text-teal-800">{visit.doctorName}</strong> ({visit.departmentName})
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <div className="text-right hidden sm:block">
                            <span className="text-[11px] text-slate-400 block">Vitals Summary</span>
                            <span className="text-xs font-bold text-slate-800">
                              BP {visit.vitals.bloodPressure} • Pulse {visit.vitals.pulseRate} bpm
                            </span>
                          </div>
                          
                          <div className="p-2 text-slate-500 hover:text-slate-800 rounded-lg bg-slate-100">
                            {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                          </div>
                        </div>
                      </div>

                      {/* Expandable Clinical Details */}
                      {isExpanded && (
                        <div className="p-5 sm:p-6 bg-slate-50/50 border-t border-slate-200 space-y-6 animate-in fade-in duration-200">
                          
                          {/* Vitals Signs Grid */}
                          <div>
                            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2.5">
                              Recorded Vital Signs at Triage
                            </span>
                            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                              <div className="p-3 bg-white rounded-xl border border-slate-200">
                                <span className="text-[11px] text-slate-500 block">Blood Pressure</span>
                                <span className="text-base font-bold text-slate-900">{visit.vitals.bloodPressure}</span>
                                <span className="text-[10px] text-slate-400 block">mmHg</span>
                              </div>
                              <div className="p-3 bg-white rounded-xl border border-slate-200">
                                <span className="text-[11px] text-slate-500 block">Pulse Rate</span>
                                <span className="text-base font-bold text-slate-900">{visit.vitals.pulseRate}</span>
                                <span className="text-[10px] text-slate-400 block">bpm (Regular)</span>
                              </div>
                              <div className="p-3 bg-white rounded-xl border border-slate-200">
                                <span className="text-[11px] text-slate-500 block">Temperature</span>
                                <span className="text-base font-bold text-slate-900">{visit.vitals.temperature}° F</span>
                                <span className="text-[10px] text-slate-400 block">Oral/Axillary</span>
                              </div>
                              <div className="p-3 bg-white rounded-xl border border-slate-200">
                                <span className="text-[11px] text-slate-500 block">SpO2 Oxygen</span>
                                <span className="text-base font-bold text-emerald-700">{visit.vitals.oxygenSaturation}%</span>
                                <span className="text-[10px] text-slate-400 block">Room air</span>
                              </div>
                              {visit.vitals.bloodSugar ? (
                                <div className="p-3 bg-white rounded-xl border border-slate-200">
                                  <span className="text-[11px] text-slate-500 block">Blood Sugar ({visit.vitals.bloodSugar.type})</span>
                                  <span className={`text-base font-bold ${visit.vitals.bloodSugar.value > 140 ? 'text-amber-600' : 'text-slate-900'}`}>
                                    {visit.vitals.bloodSugar.value} mg/dL
                                  </span>
                                </div>
                              ) : (
                                <div className="p-3 bg-white rounded-xl border border-slate-200">
                                  <span className="text-[11px] text-slate-500 block">Patient Weight</span>
                                  <span className="text-base font-bold text-slate-900">
                                    {visit.vitals.weightKg ? `${visit.vitals.weightKg} kg` : 'N/A'}
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Chief Complaint & Physician Clinical Notes */}
                          <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                                Chief Complaint Reported
                              </span>
                              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                                {visit.chiefComplaint}
                              </p>
                            </div>

                            <div className="p-4 bg-white rounded-xl border border-slate-200 space-y-1">
                              <span className="text-xs font-bold text-teal-800 uppercase tracking-wider block">
                                Physician Clinical Examination & Findings
                              </span>
                              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed">
                                {visit.doctorNotes}
                              </p>
                            </div>
                          </div>

                          {/* Prescribed Medications */}
                          {visit.prescriptions.length > 0 && (
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                                  <Pill className="w-4 h-4 text-teal-600" />
                                  <span>Prescribed Medications (Rx)</span>
                                </span>
                                <span className="text-xs text-slate-500">
                                  {visit.prescriptions.length} items prescribed
                                </span>
                              </div>

                              <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
                                <table className="w-full text-left text-xs">
                                  <thead className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                                    <tr>
                                      <th className="py-2.5 px-3">Medicine Name</th>
                                      <th className="py-2.5 px-3">Type</th>
                                      <th className="py-2.5 px-3">Dosage</th>
                                      <th className="py-2.5 px-3">Frequency</th>
                                      <th className="py-2.5 px-3">Duration</th>
                                      <th className="py-2.5 px-3">Special Instructions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-slate-100 text-slate-800">
                                    {visit.prescriptions.map((rx, rIdx) => (
                                      <tr key={rIdx} className="hover:bg-slate-50">
                                        <td className="py-2.5 px-3 font-bold text-slate-900">{rx.medicineName}</td>
                                        <td className="py-2.5 px-3">
                                          <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-medium">
                                            {rx.type}
                                          </span>
                                        </td>
                                        <td className="py-2.5 px-3 font-medium">{rx.dosage}</td>
                                        <td className="py-2.5 px-3 font-semibold text-teal-700">{rx.frequency}</td>
                                        <td className="py-2.5 px-3">{rx.duration}</td>
                                        <td className="py-2.5 px-3 text-slate-600">{rx.instructions}</td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          )}

                          {/* Diagnostic Tests / Lab reports during this visit */}
                          {visit.labReports.length > 0 && (
                            <div className="space-y-3">
                              <span className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5">
                                <FlaskConical className="w-4 h-4 text-teal-600" />
                                <span>Diagnostics & Radiology Ordered</span>
                              </span>

                              <div className="grid gap-3">
                                {visit.labReports.map((lab) => (
                                  <div key={lab.id} className="bg-white rounded-xl p-4 border border-slate-200">
                                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100">
                                      <div className="flex items-center gap-2">
                                        <span className="text-xs font-bold text-slate-900">{lab.testName}</span>
                                        <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-full">
                                          {lab.category}
                                        </span>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <span className="text-[11px] text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full font-bold">
                                          {lab.status}
                                        </span>
                                        <button
                                          onClick={() => setPrintableSlip({ type: 'lab', data: { patient: currentPatient, lab } })}
                                          className="text-xs text-teal-700 hover:text-teal-900 font-semibold flex items-center gap-1"
                                        >
                                          <Printer className="w-3.5 h-3.5" />
                                          <span>Print Lab Slip</span>
                                        </button>
                                      </div>
                                    </div>

                                    {/* Parameters table */}
                                    <div className="mt-3 overflow-x-auto">
                                      <table className="w-full text-xs text-left">
                                        <thead>
                                          <tr className="text-slate-400 border-b border-slate-100">
                                            <th className="py-1 px-2">Investigation</th>
                                            <th className="py-1 px-2">Observed Value</th>
                                            <th className="py-1 px-2">Reference Biological Interval</th>
                                            <th className="py-1 px-2">Status</th>
                                          </tr>
                                        </thead>
                                        <tbody>
                                          {lab.results.map((param, pIdx) => (
                                            <tr key={pIdx} className="border-b border-slate-50">
                                              <td className="py-1.5 px-2 font-medium text-slate-800">{param.parameter}</td>
                                              <td className="py-1.5 px-2 font-bold text-slate-900">
                                                {param.value} {param.unit}
                                              </td>
                                              <td className="py-1.5 px-2 text-slate-500">{param.referenceRange}</td>
                                              <td className="py-1.5 px-2">
                                                {param.isAbnormal ? (
                                                  <span className="text-[10px] bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">
                                                    Abnormal / Low
                                                  </span>
                                                ) : (
                                                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-medium">
                                                    Normal
                                                  </span>
                                                )}
                                              </td>
                                            </tr>
                                          ))}
                                        </tbody>
                                      </table>
                                    </div>

                                    {lab.impression && (
                                      <div className="mt-3 p-2.5 bg-slate-50 rounded-lg text-xs text-slate-700">
                                        <strong>Clinical Impression:</strong> {lab.impression}
                                      </div>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Print and Follow-up Footer */}
                          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
                            {visit.nextFollowUpDate && (
                              <div className="text-xs font-semibold text-teal-800 flex items-center gap-1.5">
                                <Calendar className="w-4 h-4 text-teal-600" />
                                <span>Recommended Next Follow-up: {visit.nextFollowUpDate}</span>
                              </div>
                            )}

                            <div className="flex items-center gap-2 ml-auto">
                              <button
                                onClick={() => setPrintableSlip({ type: 'prescription', data: { patient: currentPatient, visit } })}
                                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                              >
                                <Printer className="w-3.5 h-3.5" />
                                <span>Print Official Prescription Slip</span>
                              </button>

                              <button
                                onClick={() => setActiveNav('book')}
                                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
                              >
                                <Calendar className="w-3.5 h-3.5" />
                                <span>Book Follow-up Token</span>
                              </button>
                            </div>
                          </div>

                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          )}

          {/* TAB 2: ACTIVE & HISTORICAL PRESCRIPTIONS */}
          {activeTab === 'prescriptions' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Patient Medication Regimen</h3>
                  <p className="text-xs text-slate-500">Comprehensive medicine history compiled across all consultations</p>
                </div>
              </div>

              <div className="grid gap-3">
                {currentPatient.visits.flatMap(v => v.prescriptions.map(p => ({ ...p, doctor: v.doctorName, date: v.visitDate }))).map((med, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-900">{med.medicineName}</span>
                        <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded">
                          {med.type}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600">
                        Dosage: <strong>{med.dosage}</strong> • Frequency: <strong className="text-teal-700">{med.frequency}</strong> • Duration: {med.duration}
                      </p>
                      <p className="text-[11px] text-slate-500 italic">
                        Directions: {med.instructions}
                      </p>
                    </div>

                    <div className="text-right sm:border-l sm:border-slate-200 sm:pl-4 text-xs text-slate-500 shrink-0">
                      <span>Prescribed by {med.doctor}</span>
                      <span className="block text-[11px] text-slate-400">{med.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: DIAGNOSTIC LAB REPORTS & ULTRASOUNDS */}
          {activeTab === 'labs' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">Diagnostic Laboratory & Ultrasound Reports</h3>
                <p className="text-xs text-slate-500">
                  Reports validated by Consultant Pathologists and Dr. Sadia Noreen (Sonologist)
                </p>
              </div>

              {currentPatient.visits.flatMap(v => v.labReports).length === 0 ? (
                <p className="text-xs text-slate-500 py-6 text-center">No lab reports found for this patient.</p>
              ) : (
                currentPatient.visits.flatMap(v => v.labReports.map(l => ({ ...l, visitDate: v.visitDate }))).map(report => (
                  <div key={report.id} className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 space-y-3">
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-200">
                      <div>
                        <span className="text-xs text-slate-400 block font-mono">Report ID: {report.id}</span>
                        <h4 className="text-base font-bold text-slate-900">{report.testName}</h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded-full">
                          {report.status}
                        </span>
                        <button
                          onClick={() => setPrintableSlip({ type: 'lab', data: { patient: currentPatient, lab: report } })}
                          className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-slate-800"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Slip</span>
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto bg-white rounded-xl border border-slate-200">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-100 text-slate-700 font-semibold">
                          <tr>
                            <th className="py-2 px-3">Test Parameter</th>
                            <th className="py-2 px-3">Result</th>
                            <th className="py-2 px-3">Reference Range</th>
                            <th className="py-2 px-3">Evaluation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {report.results.map((res, rIdx) => (
                            <tr key={rIdx}>
                              <td className="py-2 px-3 font-medium text-slate-800">{res.parameter}</td>
                              <td className="py-2 px-3 font-bold text-slate-900">{res.value} {res.unit}</td>
                              <td className="py-2 px-3 text-slate-500">{res.referenceRange}</td>
                              <td className="py-2 px-3">
                                {res.isAbnormal ? (
                                  <span className="text-[10px] bg-red-100 text-red-800 px-1.5 py-0.5 rounded font-bold">
                                    Flagged
                                  </span>
                                ) : (
                                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded">
                                    Normal
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {report.impression && (
                      <div className="p-3 bg-white rounded-xl border border-slate-200 text-xs text-slate-800">
                        <strong className="text-teal-800">Impression:</strong> {report.impression}
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          )}

          {/* TAB 4: UPCOMING APPOINTMENTS */}
          {activeTab === 'appointments' && (
            <div className="bg-white rounded-2xl p-6 border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">OPD Appointments & Token History</h3>
                  <p className="text-xs text-slate-500">Live tokens and scheduled consultations</p>
                </div>
                <button
                  onClick={() => setActiveNav('book')}
                  className="px-3.5 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Book New Appointment</span>
                </button>
              </div>

              {patientAppointments.length === 0 ? (
                <div className="text-center py-8">
                  <Calendar className="w-10 h-10 text-slate-300 mx-auto mb-2" />
                  <p className="text-xs text-slate-500">No active bookings for this patient.</p>
                </div>
              ) : (
                <div className="grid gap-3">
                  {patientAppointments.map(app => (
                    <div key={app.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="px-2 py-0.5 rounded bg-teal-600 text-white font-bold text-xs">
                            Token #{app.tokenNumber}
                          </span>
                          <span className="text-xs font-bold text-slate-900">{app.doctorName}</span>
                          <span className="text-xs text-slate-500">({app.departmentName})</span>
                        </div>
                        <p className="text-xs text-slate-600">
                          Date: <strong>{app.appointmentDate}</strong> • Slot: <strong>{app.timeSlot}</strong> ({app.session})
                        </p>
                        <p className="text-[11px] text-slate-400">
                          Room: {app.roomNo} | Ref: {app.id}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setPrintableSlip({ type: 'token', data: app })}
                          className="px-3 py-1.5 bg-slate-900 text-white rounded-lg text-xs font-semibold flex items-center gap-1"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Print Slip</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      ) : null}
    </section>
  );
};
