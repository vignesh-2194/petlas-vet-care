import React from 'react';
import { ShieldCheck, Award, HeartPulse } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="pb-24 space-y-24 selection:bg-teal-100">
      <section className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
        
        {/* Left Column: Premium Narrative Typography Context */}
        <div className="lg:col-span-6 space-y-6 text-left">
          <div className="inline-flex items-center gap-2 bg-[#0F766E]/5 border border-[#0F766E]/10 text-[#0F766E] px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs">
            <HeartPulse size={14} className="text-[#14B8A6]" /> Academic Medical Standard
          </div>
          
          <div className="space-y-4">
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Setting the Gold Standard in <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] to-[#14B8A6]">Veterinary Medicine</span>
            </h1>
            <p className="text-sm sm:text-base text-slate-500 leading-relaxed font-medium">
              At Petla's Vet Care, our mission is to fuse state-of-the-art diagnostic technology with a deep, uncompromising devotion to animal wellness. Led by Dr. Naresh Petla and backed by a world-class board, our hospital functions as a premium tier sanctuary engineered for advanced healing and critical trauma intake operations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="flex gap-3 items-start bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
              <div className="p-2 bg-teal-50 text-primary rounded-xl shrink-0"><ShieldCheck size={18}/></div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">Elite Standards</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Rigorous modern safety operational metrics.</p>
              </div>
            </div>
            <div className="flex gap-3 items-start bg-white p-4 rounded-2xl border border-slate-100 shadow-xs">
              <div className="p-2 bg-teal-50 text-primary rounded-xl shrink-0"><Award size={18}/></div>
              <div>
                <h4 className="text-xs font-bold text-slate-800">15+ Years Mastery</h4>
                <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">Proven molecular surgical clinical expertise.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Premium High-End Overlapping Two-Image Stack */}
        <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-tr from-teal-500/5 to-amber-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* IMAGE ONE CONTAINER: Large Main Base Frame */}
          <div className="absolute left-0 top-4 w-[65%] aspect-[4/5] bg-slate-100 rounded-3xl overflow-hidden border-4 border-white shadow-xl z-10 flex items-center justify-center">
            <img 
              src="/about-banner-1.png" 
              alt="Petla's Veterinary Advanced Infrastructure" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                // Auto-fallback chain checking for image naming varieties (.jpg or .png)
                if (img.src.includes('.png')) {
                  img.src = "/about-banner-1.png";
                } else if (img.src.includes('.png')) {
                  img.src = "/about-banner-1.png";
                } else {
                  img.src = "https://unsplash.com";
                }
              }}
            />
          </div>

          {/* IMAGE TWO CONTAINER: Overlapping Floating Accent Frame */}
          <div className="absolute right-0 bottom-4 w-[50%] aspect-square bg-slate-100 rounded-3xl overflow-hidden border-4 border-white shadow-2xl z-20 flex items-center justify-center">
            <img 
              src="/about-banner-2.png" 
              alt="Petla's Compassionate Patient Care" 
              className="w-full h-full object-cover"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                if (img.src.includes('.png')) {
                  img.src = "/about-banner-2.png";
                } else if (img.src.includes('.png')) {
                  img.src = "/about-banner-2.png";
                } else {
                  img.src = "https://unsplash.com";
                }
              }}
            />
          </div>
        </div>

      </section>
    </div>
  );
};
