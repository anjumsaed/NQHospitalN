import React from 'react';
import { 
  X, 
  Phone, 
  MessageCircle, 
  ShieldAlert, 
  MapPin, 
  Truck, 
  Baby, 
  AlertCircle,
  Clock
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const EmergencyModal: React.FC = () => {
  const { emergencyModalOpen, setEmergencyModalOpen } = useHospital();

  if (!emergencyModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/80 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-red-200 overflow-hidden relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-red-600 to-rose-700 text-white p-6 relative">
          <button
            onClick={() => setEmergencyModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <ShieldAlert className="w-7 h-7 text-white animate-pulse" />
            </div>
            <div>
              <span className="text-xs uppercase tracking-wider font-bold bg-white/25 px-2 py-0.5 rounded-full">
                24/7 Rapid Response
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold font-display">
                Emergency & Trauma Hotline
              </h2>
            </div>
          </div>
          <p className="text-xs text-red-100 mt-2">
            Naila Qaisar Hospital Emergency Department is staffed 24 hours daily with doctors, trauma specialists, and obstetricians.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          
          {/* Quick Hotline Calling Buttons */}
          <div className="grid sm:grid-cols-2 gap-3">
            <a
              href={`tel:${HOSPITAL_INFO.phonePrimary}`}
              className="p-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl font-bold flex flex-col items-center justify-center gap-1.5 shadow-md shadow-red-700/20 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2">
                <Phone className="w-5 h-5" />
                <span className="text-sm">Direct Emergency Call</span>
              </div>
              <span className="text-lg font-mono tracking-wider">{HOSPITAL_INFO.phonePrimary}</span>
            </a>

            <a
              href={`https://wa.me/${HOSPITAL_INFO.whatsappRaw}?text=${encodeURIComponent('EMERGENCY: I need urgent medical assistance / ambulance from Naila Qaisar Hospital Lalamusa.')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold flex flex-col items-center justify-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all hover:scale-[1.02]"
            >
              <div className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5" />
                <span className="text-sm">Emergency WhatsApp</span>
              </div>
              <span className="text-lg font-mono tracking-wider">{HOSPITAL_INFO.whatsapp}</span>
            </a>
          </div>

          {/* Maternity & Critical Care Triage Alert */}
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2">
            <div className="flex items-center gap-2 text-amber-900 font-bold text-xs uppercase tracking-wider">
              <Baby className="w-4 h-4 text-amber-700" />
              <span>Obstetric & Maternity Emergency Protocol</span>
            </div>
            <p className="text-xs text-amber-800 leading-relaxed">
              If an expectant mother experiences sudden amniotic fluid leakage, vaginal bleeding, intense continuous abdominal cramps, or decreased fetal movement, report immediately to our <strong>Labor & Delivery Emergency Reception</strong> without prior token booking.
            </p>
          </div>

          {/* Location & Directions */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs text-slate-700 space-y-2">
            <div className="flex items-center gap-2 font-bold text-slate-900">
              <MapPin className="w-4 h-4 text-teal-600 shrink-0" />
              <span>Hospital Physical Location & Landmarks</span>
            </div>
            <p className="text-slate-600">
              Grand Trunk (G.T.) Road, Near Qasim Marriage Hall, Lalamusa, Gujrat District, Punjab, Pakistan.
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3 text-teal-600" /> 24/7 Gate & Triage Open
              </span>
              <span className="flex items-center gap-1">
                <Truck className="w-3 h-3 text-teal-600" /> Dedicated Ambulance Bay
              </span>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              onClick={() => setEmergencyModalOpen(false)}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors"
            >
              Close Emergency Window
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
