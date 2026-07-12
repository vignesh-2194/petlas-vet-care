import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Calendar, PawPrint } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const AppLayout: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Medical Store', path: '/store' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#1E293B] flex flex-col font-sans relative selection:bg-teal-100 selection:text-teal-900">
      
      {/* Sticky Premium Navbar */}
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        scrolled ? 'bg-white/80 backdrop-blur-xl border-b border-slate-100 shadow-sm py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2.5 bg-gradient-to-br from-[#0F766E] to-[#14B8A6] rounded-xl text-white shadow-md shadow-teal-600/20 group-hover:rotate-12 transition-transform duration-300">
              <PawPrint size={22} fill="currentColor" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              Petla's <span className="text-[#0F766E]">Vet Care</span>
            </span>
          </Link>

          {/* Desktop Navigation Link Array */}
          <div className="hidden xl:flex items-center gap-7">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link key={link.path} to={link.path} className="relative py-1 text-sm font-medium text-slate-600 hover:text-[#0F766E] transition-colors">
                  {link.name}
                  {isActive && (
                    <motion.div layoutId="underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0F766E] rounded-full" />
                  )}
                </Link>
              );
            })}
          </div>

          <div className="hidden xl:flex items-center gap-4">
            <Link to="/login" className="text-xs font-bold uppercase tracking-wider text-slate-400 hover:text-[#0F766E] transition-colors px-3">
              Admin Gateway
            </Link>
            <button onClick={() => navigate('/appointment')} className="bg-[#0F766E] text-white px-5 py-3 rounded-xl font-semibold text-xs tracking-wider uppercase shadow-md hover:bg-[#14B8A6] hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 cursor-pointer">
              <Calendar size={14} /> Appointment
            </button>
          </div>

          {/* Mobile Hamburguer Menu Button */}
          <button className="xl:hidden text-slate-800 p-1" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Sidebar Dropdown Drawer */}
        <AnimatePresence>
          {isOpen && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute top-full left-0 w-full bg-white/95 backdrop-blur-2xl border-b border-slate-100 shadow-xl p-6 xl:hidden flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="text-base font-semibold text-slate-700 hover:text-[#0F766E] transition-colors py-2 border-b border-slate-50">
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 flex flex-col gap-3">
                <button onClick={() => { setIsOpen(false); navigate('/appointment'); }} className="w-full bg-[#0F766E] text-white py-3 rounded-xl font-bold text-center text-sm">
                  Book Appointment
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Primary Layout Injection Window */}
      <main className="flex-grow pt-28 relative z-10">
        <Outlet />
      </main>

      {/* Footer Ecosystem */}
      <footer className="bg-slate-900 text-slate-400 text-xs border-t border-slate-800 relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2 text-white">
            <PawPrint size={16} className="text-[#14B8A6]" fill="currentColor" />
            <span className="font-bold tracking-tight text-sm">Petla's Vet Care Specialty Hospital Group</span>
          </div>
          <span className="text-slate-500 font-mono">&copy; {new Date().getFullYear()} VetLuxe Global. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
};
