import React, { useState } from 'react';
import { 
  Phone, 
  MapPin, 
  Calendar, 
  Stethoscope, 
  ShieldAlert, 
  Menu, 
  X, 
  Lock, 
  HelpCircle,
  Megaphone,
  BellRing,
  Building2
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { HOSPITAL_INFO } from '../data/hospitalData';

export const Navbar: React.FC = () => {
  const { activeNav, setActiveNav, setEmergencyModalOpen, isAdminLoggedIn, announcement } = useHospital();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'doctors', label: "Doctors & Schedules", icon: Stethoscope },
    { id: 'book', label: 'Book Appointment', highlight: true, icon: Calendar },
    { id: 'about', label: 'About & FAQs', icon: HelpCircle },
  ];

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200/80 shadow-xs">
      {/* Top Announcement Bar (Configurable from Admin Console) */}
      {announcement.isActive && (
        <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-teal-950 text-white text-xs py-2 px-4 sm:px-6 border-b border-teal-500/30">
          <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2.5">
            
            {/* Announcement Notice with moving ticker and pause on hover */}
            <div className="flex items-center gap-3 min-w-0 flex-1 overflow-hidden">
              <span className="flex items-center gap-1.5 shrink-0 bg-teal-500/20 text-teal-300 font-bold px-2.5 py-0.5 rounded-full border border-teal-400/40 text-[10px] uppercase tracking-wide shadow-xs z-20">
                <BellRing className="w-3 h-3 text-teal-300 animate-pulse" />
                <span>{announcement.badge || 'Hospital Notice'}</span>
              </span>

              {/* Marquee ticker container with gradient edge masks and hover pause */}
              <div 
                className="marquee-container relative flex-1 overflow-hidden py-0.5 cursor-pointer group"
                title="Hover cursor to pause announcement"
              >
                {/* Soft gradient edge fade */}
                <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-6 bg-gradient-to-r from-slate-950 to-transparent z-10" />
                <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-slate-900 to-transparent z-10" />

                <div className="marquee-track flex items-center whitespace-nowrap">
                  <div className="flex items-center gap-8 pr-8">
                    <span className="text-slate-200 text-xs font-medium tracking-wide">
                      {announcement.text}
                    </span>
                    <span className="text-teal-400 font-bold text-xs select-none">•</span>
                    <span className="text-slate-200 text-xs font-medium tracking-wide">
                      {announcement.text}
                    </span>
                    <span className="text-teal-400 font-bold text-xs select-none">•</span>
                  </div>
                  <div className="flex items-center gap-8 pr-8" aria-hidden="true">
                    <span className="text-slate-200 text-xs font-medium tracking-wide">
                      {announcement.text}
                    </span>
                    <span className="text-teal-400 font-bold text-xs select-none">•</span>
                    <span className="text-slate-200 text-xs font-medium tracking-wide">
                      {announcement.text}
                    </span>
                    <span className="text-teal-400 font-bold text-xs select-none">•</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Emergency & Login CTA Group */}
            <div className="flex items-center gap-2.5 shrink-0">
              <a 
                href={`tel:${announcement.emergencyPhone || HOSPITAL_INFO.phonePrimary}`}
                className="flex items-center gap-1.5 text-white bg-red-600/90 hover:bg-red-600 px-2.5 py-1 rounded-md font-semibold transition-colors text-[11px]"
              >
                <Phone className="w-3 h-3" />
                <span>24/7 Helpline: {announcement.emergencyPhone || HOSPITAL_INFO.phonePrimary}</span>
              </a>

              <button
                onClick={() => handleNavClick('admin')}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-bold transition-all ${
                  isAdminLoggedIn
                    ? 'bg-teal-600 text-white hover:bg-teal-500 shadow-xs'
                    : 'bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700'
                }`}
              >
                <Lock className="w-3 h-3 text-teal-400" />
                <span>Login</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
        {/* Brand */}
        <button 
          onClick={() => handleNavClick('home')}
          className="flex items-center gap-3 text-left group"
        >
          <img 
            src="/assets/aistudio/269987747_105111912043228_6478892669618936698_n_099deaf1.jpg" 
            alt="Naila Qaisar Hospital Logo" 
            className="w-12 h-12 rounded-full object-contain border border-teal-100 shadow-sm group-hover:scale-105 transition-transform bg-white"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-extrabold text-lg sm:text-xl text-slate-900 tracking-tight">
                Naila Qaisar Hospital
              </span>
              <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-teal-100 text-teal-800 border border-teal-200">
                PMC Verified
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">
              Medical Complex & Specialized Maternity Center • Lalamusa
            </p>
          </div>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-teal-700 bg-teal-50 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {item.icon && <item.icon className="w-4 h-4 opacity-80" />}
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* CTA Group */}
        <div className="hidden sm:flex items-center gap-2.5">
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="flex items-center gap-1.5 text-xs font-bold text-red-700 bg-red-50 hover:bg-red-100 border border-red-200 px-3 py-2 rounded-lg transition-colors"
          >
            <ShieldAlert className="w-4 h-4 text-red-600" />
            <span>Emergency SOS</span>
          </button>

          <button
            onClick={() => handleNavClick('book')}
            className="flex items-center gap-1.5 text-sm font-semibold text-white bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 px-4 py-2 rounded-lg shadow-sm shadow-teal-700/20 transition-all hover:shadow-md"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Appointment</span>
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => setEmergencyModalOpen(true)}
            className="p-2 text-red-600 bg-red-50 rounded-lg border border-red-200"
            title="Emergency SOS"
          >
            <ShieldAlert className="w-5 h-5" />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 space-y-1.5 shadow-xl">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                activeNav === item.id
                  ? 'bg-teal-50 text-teal-800 font-semibold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              {item.icon && <item.icon className="w-4 h-4 text-teal-600" />}
              <span>{item.label}</span>
            </button>
          ))}

          <button
            onClick={() => handleNavClick('admin')}
            className="w-full text-left px-3.5 py-2.5 rounded-lg text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 flex items-center gap-2"
          >
            <Lock className="w-4 h-4 text-teal-600" />
            <span>Login</span>
          </button>

          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-2">
            <button
              onClick={() => handleNavClick('book')}
              className="w-full py-2.5 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-1.5"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Token</span>
            </button>
            <a
              href={`tel:${announcement.emergencyPhone || HOSPITAL_INFO.phonePrimary}`}
              className="w-full py-2.5 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg flex items-center justify-center gap-1.5"
            >
              <Phone className="w-4 h-4" />
              <span>Call Helpline</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
