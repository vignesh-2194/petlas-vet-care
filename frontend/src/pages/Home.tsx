import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Stethoscope, 
  Syringe, 
  Scissors, 
  Activity, 
  Microscope, 
  Pill, 
  Apple, 
  Bone 
} from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();

  // 8 Mapped Medical Modalities with borderless light clouds
  const medicalServices = [
    { icon: <Stethoscope size={28} />, label: "Health Checkup", textColor: "text-teal-600", glow: "bg-teal-400/20" },
    { icon: <Syringe size={28} />, label: "Vaccinations", textColor: "text-cyan-600", glow: "bg-cyan-400/20" },
    { icon: <Scissors size={28} />, label: "Pet Surgery", textColor: "text-indigo-600", glow: "bg-indigo-400/20" },
    { icon: <Activity size={28} />, label: "Emergency Care", badge: true, textColor: "text-rose-600", glow: "bg-rose-400/20" },
    { icon: <Microscope size={28} />, label: "Diagnostics", textColor: "text-purple-600", glow: "bg-purple-400/20" },
    { icon: <Pill size={28} />, label: "Pet Pharmacy", textColor: "text-emerald-600", glow: "bg-emerald-400/20" },
    { icon: <Apple size={28} />, label: "Nutrition", textColor: "text-amber-600", glow: "bg-amber-400/20" },
    { icon: <Bone size={28} />, label: "Grooming", textColor: "text-sky-600", glow: "bg-sky-400/20" }
  ];

  const stats = [
    { value: '15+', label: 'Years Experience' },
    { value: '2000+', label: 'Happy Pet Parents' },
    { value: '5000+', label: 'Pets Treated' },
    { value: '24/7', label: 'Emergency Support' },
    { value: '100%', label: 'Compassionate Care' }
  ];
    return (
    <div className="pb-24 space-y-24 selection:bg-teal-100 selection:text-teal-900">
      
      {/* Immersive Luxury Hero Section Container */}
      <section className="max-w-7xl mx-auto px-6 relative bg-gradient-to-br from-[#EBF5F4] via-[#F3FAF9] to-[#FFFFFF] rounded-[48px] border border-teal-100/30 shadow-xl flex items-center overflow-hidden min-h-[580px]">
        <div className="absolute -top-20 -right-24 w-[550px] h-[550px] bg-gradient-to-br from-teal-400/5 to-emerald-400/5 rounded-full blur-[130px] pointer-events-none z-0" />
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full items-center z-10 relative py-12">
          <div className="lg:col-span-5 space-y-8 text-left pl-6 md:pl-12 pr-4 self-center">
            <div className="inline-flex items-center gap-2 bg-white/80 border border-teal-100/60 text-[#0F766E] px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider shadow-xs backdrop-blur-md">
              <ShieldCheck size={14} className="text-amber-500" /> Trusted Care. Happy Pets. Peace of Mind.
            </div>
            
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight leading-[1.12]">
                Compassionate <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#0F766E] via-[#11998e] to-[#14B8A6]">Veterinary Care</span> for Every Pet
              </h1>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
                Providing expert medical care, preventive treatments, surgeries, vaccinations, diagnostics, grooming guidance, and emergency support for pets in Narsipatnam.
              </p>
            </div>

            <div className="pt-2 flex flex-nowrap gap-4 items-center">
              <button onClick={() => navigate('/appointment')} className="bg-[#0F766E] hover:bg-[#14B8A6] text-white font-bold px-8 py-4 rounded-2xl shadow-lg shadow-teal-700/10 tracking-wide text-xs transition-all duration-300 cursor-pointer whitespace-nowrap">
                Book Now
              </button>
              
              {/* ✅ 100% DIRECT FIXED LINK PATHWAY */}
              
              <form 
  action="https://whatsapp.com" 
  method="GET" 
  target="_blank" 
  className="inline-block"
>
  {/* Native Hidden Values to bypass JavaScript execution locks completely */}
  <input type="hidden" name="phone" value="919550781230" />
  <input type="hidden" name="text" value="Hello Petla's Vet Care! I would like to inquire about a medical consultation for my pet." />
  <input type="hidden" name="type" value="phone_number" />
  <input type="hidden" name="app_absent" value="0" />

  <button
    type="submit"
    className="flex items-center gap-2 px-5 py-3 border border-slate-200 hover:border-emerald-200 bg-white hover:bg-emerald-50/30 text-slate-700 hover:text-emerald-700 font-bold text-xs rounded-xl shadow-sm hover:shadow transition-all duration-300 cursor-pointer"
  >
    <svg className="w-4 h-4 text-emerald-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 11.966.01c3.182.001 6.176 1.242 8.426 3.496 2.25 2.254 3.489 5.252 3.487 8.437-.005 6.611-5.342 11.95-11.913 11.95-2.005-.001-3.973-.507-5.753-1.474L0 24zm6.59-4.846c1.657.983 3.41 1.498 5.273 1.499 5.516 0 10.012-4.497 10.016-10.011.002-2.671-1.037-5.181-2.926-7.071C17.062 1.68 14.555.64 11.963.64 6.452.64 1.956 5.137 1.952 10.652c-.001 1.959.514 3.876 1.493 5.561l-.995 3.633 3.722-.976z"/>
    </svg>
    WhatsApp Assistant
  </button>
</form>

            </div>
          </div>

          <div className="lg:col-span-7 w-full flex items-center justify-center px-6 md:px-12">
            <motion.div whileHover="hover" initial="rest" className="w-full relative flex items-center justify-center max-w-xl cursor-pointer">
              <motion.img variants={{ rest: { opacity: 0, scale: 0.95, filter: "blur(0px)" }, hover: { opacity: 0.22, scale: 1.03, filter: "blur(20px)" } }} transition={{ duration: 0.4 }} src="/hero-banner.jpeg" alt="Bloom" className="absolute inset-0 w-full h-auto rounded-[32px] pointer-events-none select-none" />
              <motion.img variants={{ rest: { scale: 1, y: 0 }, hover: { scale: 1.01, y: -4 } }} transition={{ duration: 0.4 }} src="/hero-banner.jpeg" alt="Artwork" className="w-full h-auto rounded-[32px] shadow-xl z-10 border border-teal-100/40" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mapped Modalities Collection Area Layout */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-8 justify-center items-start">
          {medicalServices.map((service, index) => (
            <motion.div 
              key={index}
              whileHover={{ y: -8, scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 15 }}
              className="flex flex-col items-center text-center group cursor-pointer relative py-2"
            >
              {service.badge && (
                <span className="absolute -top-1 bg-rose-500 text-white font-mono text-[9px] font-bold px-1.5 py-0.5 rounded-full shadow-sm animate-pulse z-20">
                  24/7
                </span>
              )}
              <div className="w-16 h-16 flex items-center justify-center relative mb-2">
                <div className={`absolute inset-1 rounded-full ${service.glow} blur-md group-hover:blur-lg transition-all duration-300 scale-100 group-hover:scale-125`} />
                <div className={`${service.textColor} group-hover:scale-110 transition-transform duration-300 relative z-10 filter drop-shadow-sm`}>
                  {service.icon}
                </div>
              </div>
              <span className="text-[13px] font-extrabold text-slate-700 tracking-tight group-hover:text-[#0F766E] transition-colors duration-300 max-w-[100px] leading-tight mt-1">
                {service.label}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Premium Luxury Deep Blue 5-Column Stats Bar Ribbon Layout */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-[#1E3A5F] text-white p-8 md:p-10 rounded-[32px] shadow-2xl grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center items-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-1">
              <div className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-emerald-400 font-mono tracking-tight">
                {stat.value}
              </div>
              <div className="text-[11px] text-slate-300 font-medium tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

