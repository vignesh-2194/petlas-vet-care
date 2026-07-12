import React from 'react';
import { Mail, Phone, MapPin, Clock, ArrowRight, ShieldCheck, HeartPulse, Home, Stethoscope } from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 pt-28 pb-20 text-slate-700 selection:bg-teal-100 selection:text-teal-900">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* MAGICAL ENHANCED TITLE CARD HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 border border-teal-100 text-[#0F766E] text-[10px] font-bold uppercase tracking-wider font-mono animate-fade-in">
            <HeartPulse size={12} className="animate-pulse" /> Reliable Veterinary Care Vector
          </div>
          
          <div className="relative inline-block pb-3">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase font-mono bg-gradient-to-r from-slate-950 via-[#0F766E] to-slate-900 bg-clip-text text-transparent">
              Get In Touch
            </h1>
            {/* Elegant Custom Modern Text Ribbon Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-teal-600 to-[#0F766E] rounded-full shadow-sm" />
          </div>
          
          <p className="text-xs sm:text-sm text-slate-500 leading-relaxed font-medium pt-2">
            Have questions about your pet's healthcare plan or need home visits? Reach out over our secure operational support communication grids.
          </p>
        </div>

        {/* Main Grid Matrix */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                      {/* Left Column: Premium Contact Touchpoints */}
          <div className="lg:col-span-7 space-y-4 text-left">
            
            {/* NEW MAGICAL ADDITION: EMERGENCY HOME TREATMENT SLOT */}
            <div className="group flex items-center gap-5 bg-[#0F766E] border border-teal-800 p-5 rounded-3xl shadow-md hover:shadow-xl transition-all duration-300 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl -mr-6 -mt-6 group-hover:bg-teal-500/30 transition-colors" />
              <div className="p-3.5 bg-teal-800/80 text-teal-300 rounded-2xl group-hover:scale-105 transition-transform shadow-inner">
                <Home size={20} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase font-bold font-mono text-teal-200 tracking-wider flex items-center gap-1.5">
                  <Stethoscope size={10} className="animate-pulse" /> 24/7 Home Call Support
                </div>
                <h4 className="text-base font-black tracking-tight mt-0.5 text-white">Emergency Home Treatment</h4>
                <div className="text-sm font-mono text-teal-100 font-bold mt-0.5">+91 95507 81230</div>
              </div>
              <ArrowRight size={14} className="text-teal-200 group-hover:translate-x-1 transition-all" />
            </div>

            {/* Standard Clinic Phone Card */}
            <div className="group flex items-center gap-5 bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-teal-100/80 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/20 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-teal-50/40 transition-colors" />
              <div className="p-3.5 bg-teal-50 text-[#0F766E] rounded-2xl group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300 shadow-inner">
                <Phone size={20} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase font-bold font-mono text-slate-400 tracking-wider">Emergency Pipeline</div>
                <div className="text-base font-black text-slate-800 tracking-tight mt-0.5 group-hover:text-[#0F766E] transition-colors">+91 95507 81230</div>
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-[#0F766E] group-hover:translate-x-1 transition-all" />
            </div>

            {/* Email Card */}
            <div className="group flex items-center gap-5 bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-teal-100/80 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/20 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-teal-50/40 transition-colors" />
              <div className="p-3.5 bg-teal-50 text-[#0F766E] rounded-2xl group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300 shadow-inner">
                <Mail size={20} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase font-bold font-mono text-slate-400 tracking-wider">Email Endpoint</div>
                <div className="text-base font-black text-slate-800 tracking-tight mt-0.5 group-hover:text-[#0F766E] transition-colors">nari.petla@gmail.com</div>
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-[#0F766E] group-hover:translate-x-1 transition-all" />
            </div>

            {/* Location Card */}
            <div className="group flex items-center gap-5 bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-teal-100/80 transition-all duration-300 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-teal-50/20 rounded-full blur-xl -mr-6 -mt-6 group-hover:bg-teal-50/40 transition-colors" />
              <div className="p-3.5 bg-teal-50 text-[#0F766E] rounded-2xl group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300 shadow-inner">
                <MapPin size={20} />
              </div>
              <div className="flex-1">
                <div className="text-[10px] uppercase font-bold font-mono text-slate-400 tracking-wider">Clinic Vector Hub</div>
                <div className="text-base font-black text-slate-800 tracking-tight mt-0.5 group-hover:text-[#0F766E] transition-colors">Narsipatnam (531116), AP, India</div>
              </div>
              <ArrowRight size={14} className="text-slate-300 group-hover:text-[#0F766E] group-hover:translate-x-1 transition-all" />
            </div>

          </div>
                    {/* Right Column: Premium Operational Timings Panel */}
          <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 text-slate-300 rounded-[32px] p-6 sm:p-8 shadow-xl shadow-slate-950/20 relative overflow-hidden border border-slate-800 text-left self-stretch flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-48 h-48 bg-teal-500/10 rounded-full blur-3xl -mr-12 -mt-12" />
            
            <div className="relative space-y-6 w-full">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="p-2 bg-slate-800 text-teal-400 rounded-xl">
                  <Clock size={18} />
                </div>
                <div>
                  <h3 className="font-extrabold text-white text-sm sm:text-base tracking-tight">Operation Streams</h3>
                  <p className="text-[10px] font-mono text-slate-400 uppercase tracking-wider mt-0.5">Live Shift Timings</p>
                </div>
              </div>

              {/* Dynamic Timetable Matrix */}
              <div className="space-y-4 font-mono text-xs divide-y divide-slate-800/60">
                <div className="flex justify-between items-center pt-1">
                  <span className="text-slate-400 font-medium">Monday - Saturday</span>
                  <span className="font-bold text-teal-400 text-right">08:00 AM - 08:00 PM</span>
                </div>
                <div className="flex justify-between items-center pt-4">
                  <span className="text-slate-400 font-medium">Sunday Shift</span>
                  <span className="font-bold text-amber-400 text-right">10:00 AM - 07:00 PM</span>
                </div>
              </div>

              {/* Safety/Trust Banner Footer */}
              <div className="flex items-start gap-3 bg-slate-800/40 border border-slate-800 rounded-2xl p-4 mt-8">
                <ShieldCheck size={18} className="text-teal-400 flex-shrink-0 mt-0.5" />
                <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                  Priority home visit medical treatment requests remain prioritized for high-urgency cases during shift hours.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};


