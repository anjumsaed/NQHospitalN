/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { HospitalProvider, useHospital } from './context/HospitalContext';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { DoctorsDirectory } from './components/DoctorsDirectory';
import { BookingSystem } from './components/BookingSystem';
import { AboutSection } from './components/AboutSection';
import { AdminPortal } from './components/AdminPortal';
import { PrintableSlipModal } from './components/PrintableSlipModal';
import { EmergencyModal } from './components/EmergencyModal';
import { Footer } from './components/Footer';
import { CheckCircle2, Lock } from 'lucide-react';

const HospitalAppContent: React.FC = () => {
  const { activeNav, notification, isAdminLoggedIn, setActiveNav } = useHospital();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col selection:bg-teal-500 selection:text-white">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 max-w-md bg-slate-900 text-white px-4 py-3 rounded-2xl shadow-2xl border border-teal-500/50 flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="w-8 h-8 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <p className="text-xs font-medium leading-snug">{notification}</p>
        </div>
      )}

      {/* Main Hospital Navigation Header */}
      <Navbar />

      {/* Main Body */}
      <main className="flex-1">
        {/* Front Page: Static Hospital Website showing Doctor Schedule and Hospital Details */}
        {activeNav === 'home' && (
          <>
            <HeroSection />
            <DoctorsDirectory />
            <AboutSection />
          </>
        )}

        {/* Doctor Schedules View */}
        {activeNav === 'doctors' && (
          <div className="pt-4">
            <DoctorsDirectory />
          </div>
        )}

        {/* Online Appointment Booking View */}
        {activeNav === 'book' && (
          <div className="pt-4">
            <BookingSystem />
          </div>
        )}

        {/* About & Hospital Info View */}
        {activeNav === 'about' && (
          <div className="pt-4">
            <AboutSection />
          </div>
        )}

        {/* Concealed Admin & Staff Portal: Sensitive records, Doctor CRUD, and Bookings */}
        {activeNav === 'admin' && (
          <div className="pt-4">
            <AdminPortal />
          </div>
        )}
      </main>

      {/* Modals & Overlays */}
      <PrintableSlipModal />
      <EmergencyModal />

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <HospitalProvider>
      <HospitalAppContent />
    </HospitalProvider>
  );
}
