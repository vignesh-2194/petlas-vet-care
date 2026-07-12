import React from 'react';
import { motion } from 'framer-motion';
import { 
  HeartPulse, 
  Scissors, 
  Microscope, 
  ShieldCheck, 
  Sparkles, 
  Activity 
} from 'lucide-react';

export const Services: React.FC = () => {
  // 6 Specialty Veterinary Data Nodes integrated with high-end premium Unsplash imagery links
  const specialtyServices = [
    {
      icon: <Activity size={22} />,
      title: "Critical Trauma Ingestion & ICU",
      desc: "24/7 continuous high-acuity trauma prioritization lanes engineered to stabilize acute shock and severe toxic ingestion events immediately.",
      imageUrl: "/service-1.jpg"
    },
    {
      icon: <Scissors size={22} />,
      title: "Advanced Soft Tissue Surgery",
      desc: "Ultra-sterile operating theatre suites utilizing strict aseptic protocols for complex internal trauma fixes and multi-layer reconstructions.",
      imageUrl: "/service-2.jpg"
    },
    {
      icon: <Microscope size={22} />,
      title: "Molecular Biomarker Diagnostics",
      desc: "High-throughput laboratory evaluation layers streaming automated hematology metrics, direct blood panels, and instant organ function metrics.",
      imageUrl: "/service-3.jpg"
    },
    {
      icon: <HeartPulse size={22} />,
      title: "Comprehensive Cardiorespiratory Care",
      desc: "Targeted cardiovascular staging metrics, blood pressure tracking matrices, and proactive oxygenation therapeutics designed to handle heart tracks.",
      imageUrl: "/service-4.jpg"
    },
    {
      icon: <ShieldCheck size={22} />,
      title: "Proactive Immunological Shielding",
      desc: "Customized diagnostic profile tracking to establish hyper-specific core vaccine boosters, custom parasite blockers, and preventive immune cycles.",
      imageUrl: "/service-5.jpg"
    },
    {
      icon: <Sparkles size={22} />,
      title: "Therapeutic Clinical Grooming",
      desc: "Medically managed hygiene care targeting skin barrier recovery, anti-inflammatory medicated washes, and complete external condition updates.",
      imageUrl: "/service-6.jpg"
    }
  ];

  return (
    <div className="pb-24 space-y-16 selection:bg-teal-100 selection:text-teal-900 relative">
      {/* Background Ambient Soft Glow Aura Shapes */}
      <div className="absolute top-20 right-10 w-96 h-96 bg-teal-500/[0.03] rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-40 left-10 w-80 h-80 bg-amber-500/[0.02] rounded-full blur-[120px] pointer-events-none" />

      {/* Header Copywriting Context */}
      <div className="text-center max-w-xl mx-auto space-y-3 px-6">
        <span className="text-xs font-bold uppercase tracking-widest text-[#0F766E] font-mono bg-teal-50 px-3 py-1 rounded-full border border-teal-100/60">
          Clinical Specialty Matrices
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
          Advanced Care Modalities
        </h1>
        <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed font-medium">
          Petla's Vet Care operates an integrated medical cluster deploying deep technical interventions for patient lifecycle stability.
        </p>
      </div>

      {/* Premium Visual Image-Card Grid Matrix */}
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {specialtyServices.map((service, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
            whileHover={{ y: -8 }}
            className="bg-white border border-slate-100 rounded-[32px] overflow-hidden shadow-premium hover:shadow-2xl transition-all duration-300 flex flex-col group relative"
          >
            {/* TOP BLOCK: High-Fidelity Clinical Image Container */}
            <div className="w-full aspect-[16/10] overflow-hidden bg-slate-100 relative">
              <img 
                src={service.imageUrl} 
                alt={service.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 select-none"
              />
              {/* Soft overlay gradient block rendering inside image limits */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/10 to-transparent pointer-events-none" />
              
              {/* Floating Translucent Glass Lens Icon Badge */}
              <div className="absolute bottom-4 left-6 w-12 h-12 rounded-xl bg-white/90 backdrop-blur-md text-[#0F766E] shadow-lg flex items-center justify-center border border-white/40 group-hover:bg-[#0F766E] group-hover:text-white transition-all duration-300 z-20">
                {service.icon}
              </div>
            </div>

            {/* BOTTOM BLOCK: Core Copywriting Text Details Package */}
            <div className="p-6 flex-grow flex flex-col justify-between items-start space-y-3">
              <div className="space-y-2 text-left">
                <h3 className="text-base font-extrabold text-slate-800 tracking-tight group-hover:text-[#0F766E] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed font-medium">
                  {service.desc}
                </p>
              </div>

              {/* Minimalist Interactive Accent Indicator Strip */}
              <div className="w-12 h-[3px] bg-slate-100 group-hover:w-full group-hover:bg-gradient-to-r group-hover:from-[#0F766E] group-hover:to-[#14B8A6] mt-4 transition-all duration-500 rounded-full" />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
