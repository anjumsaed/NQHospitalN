import React, { useState } from 'react';
import { 
  Stethoscope, 
  Clock, 
  MapPin, 
  Award, 
  CheckCircle, 
  ArrowRight,
  ShieldCheck,
  Star
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { DOCTORS, DEPARTMENTS } from '../data/hospitalData';

export const DoctorsDirectory: React.FC = () => {
  const { doctors } = useHospital();
  const [selectedDept, setSelectedDept] = useState<string>('all');

  const filtered = selectedDept === 'all'
    ? doctors
    : doctors.filter(d => d.departmentId === selectedDept);

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
          Distinguished Medical Faculty
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mt-2">
          Consultant Specialists & Physicians
        </h2>
        <p className="text-sm text-slate-600 mt-2">
          Meet our board-certified, PMDC/PMC verified specialists leading patient-centered healthcare in Lalamusa, Gujrat.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-10">
        <button
          onClick={() => setSelectedDept('all')}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            selectedDept === 'all'
              ? 'bg-teal-700 text-white shadow-xs'
              : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
          }`}
        >
          All Departments ({doctors.length})
        </button>
        {DEPARTMENTS.map(d => (
          <button
            key={d.id}
            onClick={() => setSelectedDept(d.id)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              selectedDept === d.id
                ? 'bg-teal-700 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Doctors Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(doc => (
          <div
            key={doc.id}
            className="bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md hover:border-slate-300 transition-all group"
          >
            <div>
              {/* Image & Header */}
              <div className="p-6 pb-4 flex items-start gap-4">
                <img
                  src={doc.avatarUrl}
                  alt={doc.name}
                  className="w-20 h-20 rounded-2xl object-cover shrink-0 border border-slate-200 shadow-inner group-hover:scale-105 transition-transform"
                />
                <div className="min-w-0 space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-teal-800 bg-teal-50 px-2 py-0.5 rounded-full border border-teal-200">
                    {doc.departmentName}
                  </span>
                  <h3 className="font-display font-extrabold text-lg text-slate-900 group-hover:text-teal-700 transition-colors">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-medium line-clamp-1">
                    {doc.title}
                  </p>
                  <p className="text-[11px] text-slate-400">
                    {doc.experienceYears}+ Years Clinical Practice
                  </p>
                </div>
              </div>

              {/* Qualifications & Bio */}
              <div className="px-6 py-2 space-y-3">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-700">
                  <strong className="text-slate-900 block mb-0.5">Qualifications:</strong>
                  {doc.qualification}
                </div>

                {/* Specialties tags */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {doc.specialties.map((spec, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md font-medium"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Timings & Booking Footer */}
            <div className="p-6 pt-4 mt-4 border-t border-slate-100 bg-slate-50/50 space-y-3">
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <div className="space-y-0.5">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-teal-600" /> Morning OPD
                  </span>
                  <span className="font-semibold text-slate-800">{doc.timingMorning}</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-slate-400 flex items-center gap-1">
                    <Clock className="w-3 h-3 text-teal-600" /> Evening Clinic
                  </span>
                  <span className="font-semibold text-slate-800">{doc.timingEvening}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
