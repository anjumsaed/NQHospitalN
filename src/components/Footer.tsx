import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  MessageCircle, 
  ShieldCheck, 
  Lock
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const Footer: React.FC = () => {
  const { setActiveNav } = useHospital();

  const handleNav = (nav: string) => {
    setActiveNav(nav);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 items-start">
          
          {/* Column 1: Hospital Logo (Enlarged, without H4 or description) */}
          <div className="flex flex-col items-start gap-3">
            <img 
              src="/assets/aistudio/269987747_105111912043228_6478892669618936698_n_099deaf1.jpg" 
              alt="Naila Qaisar Hospital Logo" 
              className="w-28 h-28 sm:w-36 sm:h-36 rounded-full object-contain bg-white p-2 shadow-lg border border-teal-500/30 shrink-0 hover:scale-105 transition-transform"
            />
            <div className="flex items-center gap-1.5 text-xs text-teal-300 font-medium pt-1">
              <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0" />
              <span>PMC / PMDC Registered</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Quick Links
            </h5>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-teal-400 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('doctors')} className="hover:text-teal-400 transition-colors">
                  Doctor Roster & Schedules
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('book')} className="hover:text-teal-400 transition-colors">
                  Book Doctor Token Online
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-teal-400 transition-colors">
                  About Hospital & FAQs
                </button>
              </li>
              <li className="pt-1">
                <button 
                  onClick={() => handleNav('admin')} 
                  className="inline-flex items-center gap-1.5 text-teal-400 hover:text-teal-300 font-semibold transition-colors"
                >
                  <Lock className="w-3 h-3" />
                  <span>Login</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Emergency */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Contact & Emergency
            </h5>
            <div className="space-y-2.5 text-xs text-slate-400">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>G.T. Road, Near Qasim Marriage Hall, Lalamusa, Gujrat</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`tel:${HOSPITAL_INFO.phonePrimary}`} className="hover:text-white transition-colors">
                  053-7517700 (24/7 Helpline)
                </a>
              </p>
              <p className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a 
                  href={`https://wa.me/${HOSPITAL_INFO.whatsapp.replace(/[^0-9]/g, '')}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="hover:text-white transition-colors"
                >
                  WhatsApp: {HOSPITAL_INFO.whatsapp}
                </a>
              </p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <span>{HOSPITAL_INFO.email}</span>
              </p>
            </div>
          </div>

          {/* Column 4: Social Media Handles Section */}
          <div className="space-y-3">
            <h5 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Social Media Handles
            </h5>
            <div className="space-y-2 text-xs">
              {/* Facebook */}
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white">Facebook</div>
                  <div className="text-[11px] text-slate-400 truncate">@NailaQaisarHospital</div>
                </div>
              </a>

              {/* YouTube */}
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-red-600/20 text-red-400 flex items-center justify-center shrink-0 group-hover:bg-red-600 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white">YouTube</div>
                  <div className="text-[11px] text-slate-400 truncate">NQH Health Awareness</div>
                </div>
              </a>

              {/* Instagram */}
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-800 transition-colors group"
              >
                <div className="w-7 h-7 rounded-lg bg-pink-600/20 text-pink-400 flex items-center justify-center shrink-0 group-hover:bg-pink-600 group-hover:text-white transition-colors">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="font-semibold text-white">Instagram</div>
                  <div className="text-[11px] text-slate-400 truncate">@nailaqaisarhospital</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Minimal Centered Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-slate-900 flex flex-col items-center justify-center text-center gap-1.5 text-xs text-slate-500">
          <p className="ml-0 text-slate-400">
            © {new Date().getFullYear()} Naila Qaisar Hospital (NQH). All rights reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};
