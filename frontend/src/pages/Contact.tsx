import React from 'react';
import { Mail, Phone, MapPin, Clock, ShieldCheck,} from 'lucide-react';

export const Contact: React.FC = () => {
  return (
    <div className="pb-24 space-y-16 relative">
      
      {/* 1. Header Section */}
      <div className="text-center max-w-xl mx-auto space-y-3 px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0F766E] font-mono bg-teal-50 px-3 py-1 rounded-full border border-teal-100/60">
          Connect Hub
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Get In Touch
        </h1>
      </div>

      {/* 2. THE MAIN TWO-COLUMN GRID CONTAINER */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
        
        {/* ==================== LEFT COLUMN (Takes up 7 spaces) ==================== */}
        <div className="lg:col-span-7 space-y-4">
          
          {/* Phone Card */}
          <div className="group flex items-center gap-5 bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-teal-100/80 transition-all duration-300 relative overflow-hidden">
            <a href="tel:+919550781230" className="flex items-center gap-5 w-full z-10 cursor-pointer">
              <div className="p-3.5 bg-teal-50 text-[#0F766E] rounded-2xl group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300 shadow-inner">
                <Phone size={20} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] uppercase font-bold font-mono text-slate-400 tracking-wider">Emergency Pipeline</div>
                <div className="text-base font-black text-slate-800 tracking-tight mt-0.5 group-hover:text-[#0F766E] transition-colors">+91 95507 81230</div>
              </div>
            </a>
          </div>

          {/* Email Card */}
          <div className="group flex items-center gap-5 bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-teal-100/80 transition-all duration-300 relative overflow-hidden">
            <a href="mailto:nari.petla@://gmail.com" className="flex items-center gap-5 w-full z-10 cursor-pointer">
              <div className="p-3.5 bg-teal-50 text-[#0F766E] rounded-2xl group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300 shadow-inner">
                <Mail size={20} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] uppercase font-bold font-mono text-slate-400 tracking-wider">Email Endpoint</div>
                <div className="text-base font-black text-slate-800 tracking-tight mt-0.5 group-hover:text-[#0F766E] transition-colors">nari.petla@gmail.com</div>
              </div>
            </a>
          </div>

          {/* Location Card */}
          <div className="group flex items-center gap-5 bg-white border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md hover:border-teal-100/80 transition-all duration-300 relative overflow-hidden">
            <a href="https://goo.gl" target="_blank" rel="noopener noreferrer" className="flex items-center gap-5 w-full z-10 cursor-pointer">
              <div className="p-3.5 bg-teal-50 text-[#0F766E] rounded-2xl group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300 shadow-inner">
                <MapPin size={20} />
              </div>
              <div className="flex-1 text-left">
                <div className="text-[10px] uppercase font-bold font-mono text-slate-400 tracking-wider">Clinic Vector Hub</div>
                <div className="text-base font-black text-slate-800 tracking-tight mt-0.5 group-hover:text-[#0F766E] transition-colors">Narsipatnam (531116), AP, India</div>
              </div>
            </a>
          </div>

        </div>

        {/* ==================== RIGHT COLUMN (Takes up 5 spaces) ==================== */}
        <div className="lg:col-span-5">
          
          {/* Operation Streams Dark Card */}
          <div className="bg-slate-950 text-slate-100 p-8 rounded-[32px] shadow-2xl relative overflow-hidden border border-slate-800 text-left">
            <div className="flex items-center gap-3 text-teal-400">
              <Clock size={18} />
              <span className="text-xs font-bold uppercase tracking-wider font-mono">Operation Streams</span>
            </div>
            <h3 className="text-lg font-black mt-2 tracking-tight">Live Shift Timings</h3>
            
            <div className="mt-6 space-y-4 border-t border-slate-800 pt-6">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Monday - Saturday</span>
                <span className="font-mono font-bold text-teal-400">08:00 AM - 08:00 PM</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400 font-medium">Sunday Shift</span>
                <span className="font-mono font-bold text-amber-400">10:00 AM - 07:00 PM</span>
              </div>
            </div>

            <div className="mt-8 p-4 bg-slate-900/50 rounded-2xl border border-slate-800/60 flex gap-3 items-start">
              <ShieldCheck size={16} className="text-teal-500 mt-0.5 flex-shrink-0" />
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">
                Priority home visit medical treatment requests remain prioritized for high-urgency cases during shift hours.
              </p>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};



