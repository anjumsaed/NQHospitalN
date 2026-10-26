import React from 'react';
import { 
  ShieldCheck, 
  Clock, 
  HeartPulse, 
  MapPin, 
  CheckCircle2 
} from 'lucide-react';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Background ambient medical glow */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 relative z-10">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Hospital Identity & Primary Actions */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-teal-400" />
              <span>G.T. Road, Lalamusa, Gujrat • PMC Registered Hospital</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-display text-white leading-tight">
              Naila Qaisar Hospital{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-teal-400">
                & Medical Complex
              </span>
            </h1>

            {/* Core Services Highlights */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Maternity & C-Section</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Laparoscopic Surgeries</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Pediatric Incubators</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Trauma & Fracture Care</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>Diagnostic Ultrasound</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
                <span>24/7 Clinical Pathology</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hospital Information Card */}
          <div className="lg:col-span-5 space-y-4">
            
            <div className="bg-slate-800/90 border border-slate-700 rounded-3xl p-6 shadow-2xl relative overflow-hidden space-y-5">
              <div className="flex items-center justify-between border-b border-slate-700/80 pb-3">
                <div className="flex items-center gap-2.5">
                  <img 
                    src="/assets/aistudio/269987747_105111912043228_6478892669618936698_n_099deaf1.jpg" 
                    alt="Naila Qaisar Hospital Logo" 
                    className="w-10 h-10 rounded-full object-contain bg-white p-0.5 border border-teal-400/40 shadow-xs shrink-0"
                  />
                  <div>
                    <h3 className="font-display font-bold text-base text-white">Clinical Timings & Access</h3>
                    <p className="text-[11px] text-slate-400">Grand Trunk Road, Lalamusa</p>
                  </div>
                </div>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-700">
                  Open 24/7
                </span>
              </div>

              {/* Timing Grid */}
              <div className="space-y-2 text-xs">
                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>Morning OPD Consultations</span>
                  </span>
                  <span className="font-bold text-white">09:00 AM - 01:30 PM</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-teal-400" />
                    <span>Evening Specialist Clinic</span>
                  </span>
                  <span className="font-bold text-white">05:00 PM - 09:30 PM</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/70 border border-slate-700/60 flex items-center justify-between">
                  <span className="text-slate-300 flex items-center gap-2">
                    <HeartPulse className="w-3.5 h-3.5 text-red-400" />
                    <span>Emergency, Delivery & Pharmacy</span>
                  </span>
                  <span className="font-bold text-emerald-400">24 Hours / 7 Days</span>
                </div>
              </div>

              {/* Location Landmark */}
              <div className="p-3 bg-teal-950/40 rounded-xl border border-teal-800/40 text-[11px] text-teal-200 flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  Conveniently situated on <strong>Grand Trunk (G.T.) Road</strong>, near Qasim Marriage Hall, Lalamusa. Easy ambulance and patient parking access.
                </span>
              </div>
            </div>

          </div>

        </div>

        {/* Hospital Trust Numbers */}
        <div className="mt-14 pt-8 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-display">18+</div>
            <div className="text-xs text-slate-400 mt-1">Years Clinical Excellence</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-teal-400 font-display">250,000+</div>
            <div className="text-xs text-slate-400 mt-1">Patients Treated in Lalamusa</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-display">10,000+</div>
            <div className="text-xs text-slate-400 mt-1">Safe Deliveries & Surgeries</div>
          </div>
          <div>
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display">24 / 7</div>
            <div className="text-xs text-slate-400 mt-1">Emergency, Lab & Pharmacy</div>
          </div>
        </div>

      </div>
    </div>
  );
};
