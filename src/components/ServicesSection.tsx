import React from 'react';
import { 
  DEPARTMENTS, 
  HOSPITAL_FACILITIES 
} from '../data/hospitalData';
import { 
  Baby, 
  Scissors, 
  Bone, 
  Activity, 
  Scan, 
  HeartPulse, 
  CheckCircle2, 
  ArrowRight,
  ShieldAlert,
  Heart,
  FlaskConical,
  Tv,
  Pill,
  Truck
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';

export const ServicesSection: React.FC = () => {
  const { setActiveNav, setEmergencyModalOpen } = useHospital();

  const getDeptIcon = (name: string) => {
    switch (name) {
      case 'Baby': return <Baby className="w-6 h-6 text-teal-600" />;
      case 'Scissors': return <Scissors className="w-6 h-6 text-teal-600" />;
      case 'Bone': return <Bone className="w-6 h-6 text-teal-600" />;
      case 'Activity': return <Activity className="w-6 h-6 text-teal-600" />;
      case 'Scan': return <Scan className="w-6 h-6 text-teal-600" />;
      default: return <HeartPulse className="w-6 h-6 text-teal-600" />;
    }
  };

  const getFacilityIcon = (iconName: string) => {
    switch (iconName) {
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-red-500" />;
      case 'Activity': return <Activity className="w-5 h-5 text-teal-600" />;
      case 'Baby': return <Baby className="w-5 h-5 text-teal-600" />;
      case 'Heart': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'FlaskConical': return <FlaskConical className="w-5 h-5 text-amber-500" />;
      case 'Tv': return <Tv className="w-5 h-5 text-cyan-600" />;
      case 'Pill': return <Pill className="w-5 h-5 text-emerald-600" />;
      case 'Truck': return <Truck className="w-5 h-5 text-blue-600" />;
      default: return <HeartPulse className="w-5 h-5 text-teal-600" />;
    }
  };

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Departments Section */}
      <div>
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Comprehensive Clinical Care
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mt-2">
            Specialized Medical Departments
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Equipped with modern surgical infrastructure, dedicated maternal suites, and 24-hour diagnostic support on G.T. Road, Lalamusa.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {DEPARTMENTS.map(dept => (
            <div
              key={dept.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 border border-teal-100 flex items-center justify-center">
                  {getDeptIcon(dept.iconName)}
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-slate-900">
                    {dept.name}
                  </h3>
                  <p className="text-xs text-teal-700 font-semibold mt-0.5">
                    Lead: {dept.headDoctor}
                  </p>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed">
                  {dept.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Core Clinical Services:
                  </span>
                  {dept.services.map((srv, sIdx) => (
                    <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                      <span>{srv}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-4">
                <button
                  onClick={() => setActiveNav('book')}
                  className="w-full py-2.5 bg-slate-50 hover:bg-teal-50 text-slate-700 hover:text-teal-800 rounded-xl text-xs font-bold border border-slate-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Book with {dept.name.split(' ')[0]} Specialist</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities & Infrastructure Grid */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 shadow-xl">
        <div className="max-w-3xl mb-10">
          <span className="text-xs font-bold text-teal-400 bg-teal-950 px-3 py-1 rounded-full border border-teal-800 uppercase tracking-wider">
            Hospital Infrastructure
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-white mt-2">
            Modern Hospital Facilities & 24/7 Operations
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-2">
            Engineered to deliver rapid emergency intervention, sterile surgical conditions, and comfortable recovery.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {HOSPITAL_FACILITIES.map((fac, idx) => (
            <div
              key={idx}
              className="bg-slate-800/80 border border-slate-700/80 p-5 rounded-2xl space-y-2.5 hover:border-teal-500/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center border border-slate-700">
                {getFacilityIcon(fac.icon)}
              </div>
              <h4 className="text-sm font-bold text-white">{fac.title}</h4>
              <p className="text-xs text-slate-400 leading-relaxed">{fac.desc}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-300">
            <strong>24/7 Ambulance & Emergency Helpline:</strong> 053-7517700 / +92 333 7004949
          </div>
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold transition-colors"
          >
            Emergency Assistance Protocol
          </button>
        </div>
      </div>

    </section>
  );
};
