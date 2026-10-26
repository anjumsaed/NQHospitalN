import React, { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  Clock, 
  User, 
  Phone, 
  CheckCircle, 
  Printer, 
  MapPin, 
  BadgeCheck,
  Stethoscope,
  Database,
  CreditCard,
  Building2,
  ArrowLeft
} from 'lucide-react';
import { useHospital } from '../context/HospitalContext';
import { Appointment } from '../types/hospital';

export const BookingSystem: React.FC = () => {
  const { 
    doctors,
    bookAppointment, 
    preselectedDoctorId, 
    setPreselectedDoctorId, 
    setPrintableSlip,
    setActiveNav
  } = useHospital();

  const [selectedDoctorId, setSelectedDoctorId] = useState<string>(preselectedDoctorId || doctors[0]?.id || 'dr-naila-qaisar');
  
  // Dates: Next 7 days
  const today = new Date();
  const dateOptions = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    return {
      iso: d.toISOString().split('T')[0],
      dayName: i === 0 ? 'Today' : i === 1 ? 'Tomorrow' : d.toLocaleDateString('en-US', { weekday: 'short' }),
      formatted: d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  });

  const [selectedDate, setSelectedDate] = useState<string>(dateOptions[0].iso);
  const [selectedSession, setSelectedSession] = useState<'Morning OPD' | 'Evening OPD'>('Morning OPD');
  const [selectedSlot, setSelectedSlot] = useState<string>('10:00 AM - 10:30 AM');

  // Patient inputs - realistic clinical fields
  const [patientName, setPatientName] = useState('');
  const [patientAge, setPatientAge] = useState<number | ''>(28);
  const [patientGender, setPatientGender] = useState<'Female' | 'Male' | 'Other'>('Female');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientCnic, setPatientCnic] = useState('');
  const [patientReason, setPatientReason] = useState('Antenatal ultrasound and routine outpatient consultation');

  // Booking Result Modal / State
  const [confirmedBooking, setConfirmedBooking] = useState<Appointment | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (preselectedDoctorId) {
      setSelectedDoctorId(preselectedDoctorId);
    }
  }, [preselectedDoctorId]);

  const selectedDoctor = doctors.find(d => d.id === selectedDoctorId) || doctors[0];

  const morningSlots = [
    '09:30 AM - 10:00 AM',
    '10:00 AM - 10:30 AM',
    '10:30 AM - 11:00 AM',
    '11:00 AM - 11:30 AM',
    '11:30 AM - 12:00 PM',
    '12:00 PM - 12:30 PM',
    '12:30 PM - 01:00 PM'
  ];

  const eveningSlots = [
    '05:00 PM - 05:30 PM',
    '05:30 PM - 06:00 PM',
    '06:00 PM - 06:30 PM',
    '06:30 PM - 07:00 PM',
    '07:00 PM - 07:30 PM',
    '07:30 PM - 08:00 PM',
    '08:00 PM - 08:30 PM'
  ];

  const currentSlots = selectedSession === 'Morning OPD' ? morningSlots : eveningSlots;

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !patientPhone.trim()) {
      alert('Please enter patient name and contact phone number.');
      return;
    }

    setIsSubmitting(true);
    try {
      const appt = await bookAppointment({
        patientName,
        patientAge: Number(patientAge) || 25,
        patientGender,
        patientPhone,
        patientCnic: patientCnic.trim() || '34201-0000000-0',
        doctorId: selectedDoctor.id,
        doctorName: selectedDoctor.name,
        departmentName: selectedDoctor.departmentName,
        appointmentDate: selectedDate,
        session: selectedSession,
        timeSlot: selectedSlot,
        reason: patientReason || 'Outpatient Consultation',
        roomNo: selectedDoctor.roomNo,
        consultationFee: selectedDoctor.consultationFee
      });

      setConfirmedBooking(appt);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="book-appointment" className="py-8 sm:py-12 px-4 sm:px-6 max-w-7xl mx-auto animate-in fade-in duration-300">
      {/* Back to Home & Breadcrumb */}
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <button
          onClick={() => {
            setActiveNav('home');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="inline-flex items-center gap-2 text-xs font-bold text-slate-700 hover:text-teal-700 bg-white hover:bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-xl transition-all shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-teal-600" />
          <span>Back to Home</span>
        </button>
        <span className="text-xs text-slate-400 font-medium hidden sm:inline-flex items-center gap-1.5">
          <span>Naila Qaisar Hospital</span>
          <span>•</span>
          <span className="text-teal-700 font-semibold">Online Appointment Portal</span>
        </span>
      </div>

      {/* Title */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
          OPD Appointment Desk
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display mt-2">
          Online Appointment Booking
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2">
          Generate your verified consultation token in advance. Appointments are securely registered in the hospital database.
        </p>
      </div>

      {/* Confirmation Success View */}
      {confirmedBooking ? (
        <div className="max-w-2xl mx-auto bg-white rounded-3xl border border-teal-200 shadow-xl overflow-hidden p-6 sm:p-8 animate-in fade-in duration-300">
          <div className="text-center space-y-3 pb-6 border-b border-slate-100">
            <div className="w-16 h-16 bg-teal-100 text-teal-700 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              <Database className="w-3.5 h-3.5 text-emerald-700" />
              <span>Token Registered in Hospital Database</span>
            </div>
            <h3 className="text-3xl font-extrabold text-slate-900 font-display">
              Token #{confirmedBooking.tokenNumber}
            </h3>
            <p className="text-xs text-slate-500">
              Reference: <span className="font-mono font-bold text-slate-800">{confirmedBooking.id}</span>
            </p>
          </div>

          {/* Token Card Details */}
          <div className="my-6 bg-slate-50 rounded-2xl p-5 border border-slate-200/80 space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-xs text-slate-500 block">Patient Name</span>
                <span className="font-bold text-slate-900">{confirmedBooking.patientName}</span>
                <span className="text-xs text-slate-500 block mt-0.5">
                  Age: {confirmedBooking.patientAge} | {confirmedBooking.patientGender}
                </span>
                <span className="text-xs text-slate-500 block">Phone: {confirmedBooking.patientPhone}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Consultant Physician</span>
                <span className="font-bold text-teal-800">{confirmedBooking.doctorName}</span>
                <span className="text-xs text-slate-600 block">{confirmedBooking.departmentName}</span>
                <span className="text-xs text-slate-700 font-medium block mt-0.5">OPD Fee: Rs. {confirmedBooking.consultationFee}</span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Appointment Date & Slot</span>
                <span className="font-semibold text-slate-900">
                  {new Date(confirmedBooking.appointmentDate).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="text-xs text-teal-700 font-medium block">
                  {confirmedBooking.session} • {confirmedBooking.timeSlot}
                </span>
              </div>
              <div>
                <span className="text-xs text-slate-500 block">Clinic Room</span>
                <span className="font-semibold text-slate-900">{confirmedBooking.roomNo}</span>
                <span className="text-[11px] text-slate-500 block mt-0.5">Payment at Registration Desk</span>
              </div>
            </div>

            <div className="p-3 bg-teal-50/70 border border-teal-200 rounded-xl text-xs text-teal-900 flex items-start gap-2">
              <MapPin className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
              <span>
                Please arrive 10 minutes prior to your time slot at <strong>Naila Qaisar Hospital, G.T. Road, Lalamusa</strong>. 
                Present this token at the reception counter for priority consultation.
              </span>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <button
              onClick={() => {
                setPrintableSlip({ type: 'token', data: confirmedBooking });
              }}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <Printer className="w-4 h-4" />
              <span>Print Official OPD Token Slip</span>
            </button>

            <button
              onClick={() => {
                setConfirmedBooking(null);
                setPatientName('');
                setPatientPhone('');
              }}
              className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 shadow-sm transition-colors"
            >
              <CalendarIcon className="w-4 h-4" />
              <span>Book Another Appointment</span>
            </button>
          </div>
        </div>
      ) : (
        /* Streamlined Booking Stepper */
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Doctor Selection & Slot Picker */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Step 1: Select Doctor & View Schedule */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Step 1: Select Attending Specialist Doctor
              </label>

              <select
                value={selectedDoctorId}
                onChange={(e) => setSelectedDoctorId(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-300 font-bold text-sm text-slate-900 bg-white focus:ring-2 focus:ring-teal-500"
              >
                {doctors.map(doc => (
                  <option key={doc.id} value={doc.id}>
                    {doc.name} — {doc.departmentName} (Fee: Rs. {doc.consultationFee})
                  </option>
                ))}
              </select>

              {/* Selected Doctor Summary Card */}
              {selectedDoctor && (
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-0.5">
                    <span className="font-bold text-slate-900 text-sm block">{selectedDoctor.name}</span>
                    <span className="text-teal-700 font-medium">{selectedDoctor.title}</span>
                    <span className="text-slate-500 block">{selectedDoctor.qualification}</span>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <span className="text-slate-500 block">Consultation Fee</span>
                    <strong className="text-slate-900 text-sm">Rs. {selectedDoctor.consultationFee}</strong>
                    <span className="text-slate-400 block text-[11px]">{selectedDoctor.roomNo}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Step 2: Date & Slot Picker */}
            <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-4">
              <label className="text-xs font-bold text-slate-600 uppercase tracking-wider block">
                Step 2: Appointment Date & Time
              </label>

              {/* Date Pills */}
              <div className="grid grid-cols-4 sm:grid-cols-7 gap-2">
                {dateOptions.map(opt => {
                  const isChosen = selectedDate === opt.iso;
                  return (
                    <button
                      key={opt.iso}
                      type="button"
                      onClick={() => setSelectedDate(opt.iso)}
                      className={`p-2.5 rounded-xl text-center border-2 transition-all ${
                        isChosen
                          ? 'border-teal-600 bg-teal-600 text-white shadow-xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white text-slate-800'
                      }`}
                    >
                      <span className={`block text-[11px] font-semibold ${isChosen ? 'text-teal-100' : 'text-slate-500'}`}>
                        {opt.dayName}
                      </span>
                      <span className="block text-xs font-bold mt-0.5">
                        {opt.formatted}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Session Switch (Morning vs Evening) */}
              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedSession('Morning OPD');
                    setSelectedSlot('10:00 AM - 10:30 AM');
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    selectedSession === 'Morning OPD'
                      ? 'bg-teal-50 border-teal-600 text-teal-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>Morning OPD ({selectedDoctor.timingMorning})</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedSession('Evening OPD');
                    setSelectedSlot('05:30 PM - 06:00 PM');
                  }}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold border transition-all flex items-center justify-center gap-2 ${
                    selectedSession === 'Evening OPD'
                      ? 'bg-teal-50 border-teal-600 text-teal-800'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Clock className="w-3.5 h-3.5 text-teal-600" />
                  <span>Evening Clinic ({selectedDoctor.timingEvening})</span>
                </button>
              </div>

              {/* Slots Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1">
                {currentSlots.map(slot => {
                  const isSlotSelected = selectedSlot === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setSelectedSlot(slot)}
                      className={`p-2.5 rounded-xl text-xs font-medium border text-left flex items-center justify-between transition-all ${
                        isSlotSelected
                          ? 'border-teal-600 bg-teal-50 text-teal-900 font-bold'
                          : 'border-slate-200 hover:border-slate-300 text-slate-700 bg-white'
                      }`}
                    >
                      <span>{slot}</span>
                      <span className="text-[10px] text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                        Available
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Patient Information Form */}
          <div className="lg:col-span-5 space-y-6">
            
            <form onSubmit={handleFormSubmit} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                <h3 className="font-display font-bold text-lg text-slate-900 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  <span>Patient Demographics</span>
                </h3>
                <span className="text-[11px] font-semibold text-teal-700 bg-teal-50 px-2.5 py-0.5 rounded-full border border-teal-100">
                  Step 3
                </span>
              </div>

              {/* Form Fields - Concrete and Professional */}
              <div className="space-y-3.5 text-sm">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Patient Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    placeholder="Patient name as on National ID / B-Form"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Age (Years) *
                    </label>
                    <input
                      type="number"
                      required
                      min={1}
                      max={120}
                      value={patientAge}
                      onChange={(e) => setPatientAge(e.target.value ? Number(e.target.value) : '')}
                      placeholder="Age"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Gender *
                    </label>
                    <select
                      value={patientGender}
                      onChange={(e) => setPatientGender(e.target.value as any)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 bg-white"
                    >
                      <option value="Female">Female</option>
                      <option value="Male">Male</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Contact Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={patientPhone}
                    onChange={(e) => setPatientPhone(e.target.value)}
                    placeholder="03XXXXXXXXX (11 digits)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    CNIC / B-Form Number (Optional)
                  </label>
                  <input
                    type="text"
                    value={patientCnic}
                    onChange={(e) => setPatientCnic(e.target.value)}
                    placeholder="13-digit National ID without dashes"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Reason for Consultation
                  </label>
                  <textarea
                    rows={2}
                    value={patientReason}
                    onChange={(e) => setPatientReason(e.target.value)}
                    placeholder="Describe symptoms, pregnancy checkup, or medical query..."
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-300 focus:outline-hidden focus:ring-2 focus:ring-teal-500 text-xs"
                  />
                </div>
              </div>

              {/* Consultation Summary & Price */}
              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Selected Consultant:</span>
                  <span className="font-bold text-slate-900">{selectedDoctor.name}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Assigned Suite:</span>
                  <span className="font-medium text-slate-800">{selectedDoctor.roomNo}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Date & Slot:</span>
                  <span className="font-medium text-slate-800">{selectedDate} ({selectedSlot})</span>
                </div>
                <div className="flex justify-between text-slate-900 font-bold text-sm pt-2 border-t border-slate-100">
                  <span>Hospital OPD Fee:</span>
                  <span className="text-teal-700 font-extrabold text-base">Rs. {selectedDoctor.consultationFee}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 bg-gradient-to-r from-teal-600 to-teal-700 hover:from-teal-700 hover:to-teal-800 text-white rounded-xl font-bold text-sm shadow-md shadow-teal-700/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] disabled:opacity-50"
              >
                <CheckCircle className="w-5 h-5" />
                <span>{isSubmitting ? 'Registering Booking...' : 'Confirm Appointment & Generate Token'}</span>
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-slate-500 pt-1">
                <Database className="w-3 h-3 text-teal-600" />
                <span>Secure registration in Hospital Database</span>
              </div>
            </form>

          </div>

        </div>
      )}
    </section>
  );
};
