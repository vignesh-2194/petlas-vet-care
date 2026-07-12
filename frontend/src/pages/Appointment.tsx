import React, { useState } from 'react';
import axios from 'axios';

export const Appointment: React.FC = () => {
  // Input fields hook states management alignment mapping
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [petName, setPetName] = useState('');
  const [petType, setPetType] = useState('Canine Matrix');
  const [breed, setBreed] = useState('');
  const [age, setAge] = useState('1');
  const [problemDescription, setProblemDescription] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('');
  
  const [bannerMessage, setBannerMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !phone || !petName || !preferredDate || !preferredTime) {
      setBannerMessage({ type: 'error', text: 'Please complete all critical booking validation fields.' });
      return;
    }

    setSubmitting(true);
    setBannerMessage(null);

    // Explicit dictionary wrapper structure matching the backend schema
    const appointmentPayload = {
      customerName,
      phone,
      email,
      petName,
      petType,
      breed: breed || "Unknown Lineage",
      age: parseInt(age) || 1,
      problemDescription,
      preferredDate,
      preferredTime
    };

    try {
      await axios.post('/api/appointments', appointmentPayload);
      setBannerMessage({ type: 'success', text: '🎉 Intake record submitted successfully! Check Admin Hub dashboard matrix.' });
      // Reset input layout values fields
      setCustomerName('');
      setPhone('');
      setEmail('');
      setPetName('');
      setBreed('');
      setAge('1');
      setProblemDescription('');
      setPreferredDate('');
      setPreferredTime('');
    } catch (err) {
      console.error(err);
      setBannerMessage({ type: 'error', text: 'API node ingestion connection failed. Ensure your Python backend server is running!' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12 px-4 sm:px-6 lg:px-8 text-left text-slate-700">
      <div className="max-w-3xl mx-auto bg-white border border-slate-100 rounded-3xl p-8 shadow-premium">
        
        <h2 className="text-xl font-black text-slate-800 tracking-tight mb-6 uppercase font-mono border-b pb-4 text-center">
          Clinical Intake Intake Form
        </h2>

        {/* Global Notification Banner Alert Channel */}
        {bannerMessage && (
          <div className={`p-4 rounded-xl mb-6 text-xs font-bold font-mono border transition-all ${
            bannerMessage.type === 'success' 
              ? 'bg-emerald-50 text-emerald-700 border-emerald-200' 
              : 'bg-rose-50 text-rose-700 border-rose-100'
          }`}>
            {bannerMessage.text}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="space-y-8 text-xs font-medium">
          {/* Section 1: Client Contact vector */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold text-teal-600 font-mono uppercase tracking-wider mb-2">
              📋 1. Client Contact Vector Data
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Full Name</label>
                <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 text-slate-800" placeholder="John Doe" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Phone Vector</label>
                <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 text-slate-800" placeholder="9398900802" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Email Endpoint</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 text-slate-800" placeholder="karmaverse26@gmail.com" />
              </div>
            </div>
          </fieldset>

          {/* Section 2: Patient Biological Matrix */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold text-teal-600 font-mono uppercase tracking-wider mb-2">
              🧬 2. Patient Biological Matrix
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Pet Name</label>
                <input type="text" value={petName} onChange={(e) => setPetName(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 text-slate-800" placeholder="Leo" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Taxonomy Type</label>
                <select value={petType} onChange={(e) => setPetType(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 font-bold text-slate-700">
                  <option value="Canine Matrix">Canine Matrix</option>
                  <option value="Feline Matrix">Feline Matrix</option>
                  <option value="Avian Element">Avian Element</option>
                  <option value="Exotic Cluster">Exotic Cluster</option>
                </select>
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Breed Line</label>
                <input type="text" value={breed} onChange={(e) => setBreed(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 text-slate-800" placeholder="Labrador" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Pet Age (Years)</label>
                <input type="number" min="0" value={age} onChange={(e) => setAge(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 text-slate-800" />
              </div>
            </div>
          </fieldset>

          {/* Section 3: Schedule Integration */}
          <fieldset className="space-y-4">
            <legend className="text-xs font-bold text-teal-600 font-mono uppercase tracking-wider mb-2">
              🗓️ 3. Schedule Integration
            </legend>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Target Booking Date</label>
                <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 text-slate-800 font-mono" />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Target Window Time</label>
                <input type="time" value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 text-slate-800 font-mono" />
              </div>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-500 uppercase tracking-wide text-[10px]">Clinical Pathology Observations</label>
              <textarea rows={3} value={problemDescription} onChange={(e) => setProblemDescription(e.target.value)} className="w-full p-3 bg-slate-50/50 border rounded-xl focus:outline-none focus:border-teal-600 text-slate-800 leading-relaxed" placeholder="Describe symptoms or primary health reasons..."></textarea>
            </div>
          </fieldset>

          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-3.5 bg-[#0F766E] text-white font-bold rounded-xl text-xs uppercase tracking-widest shadow-md hover:bg-teal-800 transition-all cursor-pointer ${
              submitting ? 'opacity-50 animate-pulse cursor-not-allowed' : ''
            }`}
          >
            {submitting ? "Transmitting payload..." : "Publish Reservation to Matrix"}
          </button>
        </form>

      </div>
    </div>
  );
};
