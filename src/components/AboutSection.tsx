import React, { useState } from 'react';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ShieldCheck, 
  Award, 
  HeartHandshake
} from 'lucide-react';
import { FAQS } from '../data/hospitalData';

export const AboutSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="py-12 px-4 sm:px-6 max-w-7xl mx-auto space-y-16">
      
      {/* Hospital Story & Profile (Full Width) */}
      <div className="w-full space-y-5 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-xs">
        <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
          About Our Healthcare Complex
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display">
          A Legacy of Healing & Compassionate Medicine in Lalamusa
        </h2>
        <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
          Founded under the clinical leadership of <strong>Dr. Naila Qaisar</strong>, Naila Qaisar Hospital (NQH) has evolved into one of the most trusted tertiary healthcare institutions in Lalamusa and the greater Gujrat district.
        </p>
        <p className="text-sm text-slate-600 leading-relaxed">
          Our state-of-the-art facility integrates advanced diagnostic ultrasonography, minimally invasive laparoscopic surgical theaters, high-dependency neonatal incubators, and full electronic medical records. Whether arriving for a routine maternal checkup or critical emergency surgery, patients receive the utmost clinical dignity and evidence-based treatment.
        </p>

        <div className="grid sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
            <ShieldCheck className="w-6 h-6 text-teal-700 mb-2" />
            <h4 className="text-sm font-bold text-slate-900">PMDC Verified</h4>
            <p className="text-xs text-slate-500 mt-0.5">Board-certified specialist consultants</p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
            <Award className="w-6 h-6 text-teal-700 mb-2" />
            <h4 className="text-sm font-bold text-slate-900">18+ Years</h4>
            <p className="text-xs text-slate-500 mt-0.5">Serving Gujrat, Kharian & Lalamusa</p>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50/60 border border-teal-100">
            <HeartHandshake className="w-6 h-6 text-teal-700 mb-2" />
            <h4 className="text-sm font-bold text-slate-900">Patient Centered</h4>
            <p className="text-xs text-slate-500 mt-0.5">Digital OPD tokens & history logs</p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center">
          <span className="text-xs font-bold text-teal-800 bg-teal-50 border border-teal-200 px-3 py-1 rounded-full uppercase tracking-wider">
            Patient Support
          </span>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-display mt-2">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold text-slate-900 text-sm sm:text-base hover:bg-slate-50"
                >
                  <span className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  {isOpen ? <ChevronUp className="w-5 h-5 text-slate-500 shrink-0" /> : <ChevronDown className="w-5 h-5 text-slate-500 shrink-0" />}
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </section>
  );
};
