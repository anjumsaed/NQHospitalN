import React from 'react';
import { 
  X, 
  Printer, 
  MapPin, 
  Phone, 
  ShieldCheck, 
  Calendar, 
  Clock, 
  FileText,
  HeartPulse
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const PrintableSlipModal: React.FC = () => {
  const { printableSlip, setPrintableSlip } = useHospital();

  if (!printableSlip) return null;

  const handlePrint = () => {
    window.print();
  };

  const { type, data } = printableSlip;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-xs flex items-center justify-center p-4">
      
      {/* Modal Container */}
      <div className="bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Top Control Bar (Hidden on print) */}
        <div className="no-print bg-slate-900 text-white px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Printer className="w-5 h-5 text-teal-400" />
            <span className="font-bold text-sm">
              {type === 'token' && 'Official OPD Token Slip'}
              {type === 'prescription' && 'Official Hospital Prescription Slip'}
              {type === 'lab' && 'Diagnostic Laboratory Investigation Report'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-1.5 bg-teal-600 hover:bg-teal-500 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Document</span>
            </button>
            <button
              onClick={() => setPrintableSlip(null)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Printable Paper Canvas */}
        <div id="printable-slip" className="p-8 sm:p-10 bg-white text-slate-900 space-y-6">
          
          {/* Hospital Official Letterhead */}
          <div className="border-b-2 border-slate-900 pb-4 flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <img 
                  src="/assets/aistudio/269987747_105111912043228_6478892669618936698_n_099deaf1.jpg" 
                  alt="Naila Qaisar Hospital" 
                  className="w-14 h-14 rounded-full object-contain shrink-0"
                />
                <div>
                  <h1 className="font-display font-extrabold text-2xl text-slate-950 tracking-tight leading-none uppercase">
                    NAILA QAISAR HOSPITAL
                  </h1>
                  <span className="text-xs font-bold text-teal-800 tracking-wider">
                    SPECIALIZED MATERNITY, SURGICAL & DIAGNOSTIC COMPLEX
                  </span>
                </div>
              </div>
              <p className="text-[11px] text-slate-600 pt-1">
                Grand Trunk (G.T.) Road, Near Qasim Marriage Hall, Lalamusa, Gujrat • Tel: 053-7517700
              </p>
            </div>

            <div className="text-right text-[11px] text-slate-600 shrink-0">
              <span className="block font-bold text-slate-900">24/7 EMERGENCY & OPD</span>
              <span>WhatsApp: +92 333 7004949</span>
              <span className="block text-[10px] text-teal-700 font-semibold">PMC / PMDC Registered</span>
            </div>
          </div>

          {/* DOCUMENT TYPE 1: TOKEN SLIP */}
          {type === 'token' && (
            <div className="space-y-5">
              <div className="bg-slate-50 border-2 border-dashed border-slate-300 p-5 rounded-2xl text-center space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  OPD Consultation Token
                </span>
                <div className="text-5xl font-black text-slate-950 font-display">
                  #{data.tokenNumber}
                </div>
                <div className="text-xs font-mono font-bold text-teal-800">
                  REF ID: {data.id}
                </div>
              </div>

              {/* Token Details */}
              <div className="grid grid-cols-2 gap-4 text-xs border border-slate-200 rounded-xl p-4">
                <div>
                  <span className="text-slate-400 block">Patient Name:</span>
                  <span className="font-bold text-slate-900 text-sm">{data.patientName}</span>
                  <span className="text-slate-500 block">Age/Sex: {data.patientAge}y / {data.patientGender}</span>
                  <span className="text-slate-500 block">Phone: {data.patientPhone}</span>
                  {data.patientMrn && <span className="text-teal-700 font-bold block">MRN: {data.patientMrn}</span>}
                </div>

                <div>
                  <span className="text-slate-400 block">Consultant Doctor:</span>
                  <span className="font-bold text-teal-900 text-sm">{data.doctorName}</span>
                  <span className="text-slate-600 block">{data.departmentName}</span>
                  <span className="text-slate-800 font-semibold block mt-1">Room: {data.roomNo}</span>
                  <span className="text-slate-900 font-bold block">Fee: Rs. {data.consultationFee}</span>
                </div>

                <div className="col-span-2 pt-2 border-t border-slate-100 flex justify-between">
                  <span><strong>Date:</strong> {data.appointmentDate}</span>
                  <span><strong>Session:</strong> {data.session} ({data.timeSlot})</span>
                </div>
              </div>

              <div className="text-[11px] text-slate-500 space-y-1 bg-slate-50 p-3 rounded-lg border border-slate-200">
                <p>• Please report to the reception counter 10 minutes before your scheduled slot.</p>
                <p>• Token calls will be announced according to the live display in the waiting lounge.</p>
                <p>• Emergency cases take priority over routine outpatient tokens.</p>
              </div>
            </div>
          )}

          {/* DOCUMENT TYPE 2: PRESCRIPTION SLIP */}
          {type === 'prescription' && (
            <div className="space-y-4 text-xs">
              
              {/* Patient Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 grid grid-cols-3 gap-2 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px]">Patient Name</span>
                  <strong className="text-slate-900">{data.patient.name}</strong>
                  <span className="text-slate-500 block text-[10px]">MRN: {data.patient.mrn}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Age / Gender</span>
                  <span className="text-slate-800 font-semibold">{data.patient.age} Yrs / {data.patient.gender}</span>
                  <span className="text-slate-500 block text-[10px]">Blood: {data.patient.bloodGroup}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Date of Consultation</span>
                  <span className="text-slate-800 font-semibold">{data.visit.visitDate}</span>
                  <span className="text-slate-500 block text-[10px]">Type: {data.visit.visitType}</span>
                </div>
              </div>

              {/* Vitals Ribbon */}
              <div className="flex items-center justify-between p-2.5 bg-teal-50/70 border border-teal-200 rounded-lg text-xs font-semibold text-teal-950">
                <span>BP: {data.visit.vitals.bloodPressure} mmHg</span>
                <span>Pulse: {data.visit.vitals.pulseRate} bpm</span>
                <span>Temp: {data.visit.vitals.temperature}°F</span>
                <span>SpO2: {data.visit.vitals.oxygenSaturation}%</span>
                {data.visit.vitals.weightKg && <span>Wt: {data.visit.vitals.weightKg} kg</span>}
              </div>

              {/* Diagnosis */}
              <div className="border border-slate-200 p-3 rounded-xl">
                <span className="text-slate-400 text-[10px] uppercase font-bold block">Provisional / Clinical Diagnosis:</span>
                <span className="font-bold text-slate-900 text-sm">{data.visit.clinicalDiagnosis}</span>
                <p className="text-slate-600 text-xs mt-1">{data.visit.doctorNotes}</p>
              </div>

              {/* Rx Medicines Table */}
              <div>
                <span className="font-black text-sm text-slate-900 block mb-1">Rx (Medications Prescribed):</span>
                <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                  <thead className="bg-slate-100 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-2">#</th>
                      <th className="p-2">Medicine & Strength</th>
                      <th className="p-2">Dosage & Frequency</th>
                      <th className="p-2">Duration</th>
                      <th className="p-2">Instructions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.visit.prescriptions.map((rx: any, idx: number) => (
                      <tr key={idx}>
                        <td className="p-2 text-slate-400">{idx + 1}</td>
                        <td className="p-2 font-bold text-slate-900">{rx.medicineName}</td>
                        <td className="p-2 font-semibold text-teal-800">{rx.dosage} ({rx.frequency})</td>
                        <td className="p-2">{rx.duration}</td>
                        <td className="p-2 text-slate-600">{rx.instructions}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Doctor Stamp & Signature */}
              <div className="pt-8 flex items-end justify-between">
                <div className="text-[11px] text-slate-400">
                  <span>Next Follow-up: {data.visit.nextFollowUpDate || 'As advised / SOS'}</span>
                  <span className="block">Naila Qaisar Hospital Electronic Records System</span>
                </div>

                <div className="text-center space-y-1">
                  <div className="w-40 border-b border-slate-400 pb-1">
                    <span className="font-serif italic text-sm text-slate-600">Naila Qaisar</span>
                  </div>
                  <span className="text-xs font-bold text-slate-900 block">{data.visit.doctorName}</span>
                  <span className="text-[10px] text-slate-500 block">{data.visit.departmentName}</span>
                </div>
              </div>

            </div>
          )}

          {/* DOCUMENT TYPE 3: LAB REPORT */}
          {type === 'lab' && (
            <div className="space-y-4 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-slate-400 block text-[10px]">Patient Name</span>
                  <strong className="text-slate-900">{data.patient.name}</strong> (MRN: {data.patient.mrn})
                </div>
                <div>
                  <span className="text-slate-400 block text-[10px]">Investigation</span>
                  <strong className="text-teal-900">{data.lab.testName}</strong>
                </div>
              </div>

              <table className="w-full text-left text-xs border border-slate-200">
                <thead className="bg-slate-100 font-bold border-b border-slate-200">
                  <tr>
                    <th className="p-2">Test Parameter</th>
                    <th className="p-2">Observed Result</th>
                    <th className="p-2">Biological Reference Interval</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.lab.results.map((r: any, idx: number) => (
                    <tr key={idx}>
                      <td className="p-2 font-medium">{r.parameter}</td>
                      <td className={`p-2 font-bold ${r.isAbnormal ? 'text-red-700' : 'text-slate-900'}`}>
                        {r.value} {r.unit}
                      </td>
                      <td className="p-2 text-slate-500">{r.referenceRange}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {data.lab.impression && (
                <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
                  <strong className="text-slate-900 block">Conclusion / Impression:</strong>
                  <p className="text-slate-700 text-xs mt-0.5">{data.lab.impression}</p>
                </div>
              )}

              <div className="pt-8 flex justify-between text-[11px] text-slate-500">
                <span>Verified by Laboratory Information System (LIS)</span>
                <span className="font-bold text-slate-900">{data.lab.consultantRadiologistOrPathologist}</span>
              </div>
            </div>
          )}

        </div>

        {/* Modal Bottom Footer (Hidden on print) */}
        <div className="no-print bg-slate-100 px-6 py-3 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Click "Print Document" to generate PDF or print to receipt printer.</span>
          <button
            onClick={() => setPrintableSlip(null)}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold rounded-lg transition-colors"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
};
