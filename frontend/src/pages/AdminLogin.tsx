import React, { useState } from 'react';
import { ShieldCheck, Lock, User, AlertCircle } from 'lucide-react';

export const AdminLogin: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    
    if (!username || !password) {
      setErrorMessage('Please complete all credential fields.');
      return;
    }

    setSubmitting(true);

    // SECURE LOCAL CREDENTIAL VALIDATION DECK BINDING
    if (username === 'petlas_vet_care' && password === 'Pnaresh@2026') {
      // Injects a lifetime validation access token key signature inside the user state storage
      localStorage.setItem('adminToken', 'petlas_authenticated_secure_token_2026');
      alert('🔒 Identity verified successfully! Unlocking Admin Hub Workspace Matrix...');
      window.location.href = '/dashboard';
    } else {
      setErrorMessage('Invalid administrative username identifier or security passcode mapping.');
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6 text-left select-none">
      <div className="w-full max-w-md bg-slate-950 border border-slate-800 rounded-[32px] p-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-3xl -mr-6 -mt-6" />
        
        <div className="space-y-6 relative">
          {/* Header Icon Deck Layout */}
          <div className="text-center space-y-2">
            <div className="inline-flex p-3.5 bg-teal-950/60 border border-teal-800/50 text-teal-400 rounded-2xl mb-1">
              <ShieldCheck size={26} />
            </div>
            <h2 className="text-xl font-black text-white uppercase tracking-wider font-mono">Secure Admin Gateway</h2>
            <p className="text-[11px] text-slate-500 font-medium">Authorized clinical operation credentials required.</p>
          </div>

          {/* Validation Alert Notification Banner */}
          {errorMessage && (
            <div className="flex items-start gap-2.5 p-3.5 bg-rose-950/40 border border-rose-900/60 text-rose-400 rounded-xl text-[11px] font-bold font-mono">
              <AlertCircle size={14} className="flex-shrink-0 mt-0.5" />
              <div>{errorMessage}</div>
            </div>
          )}

          {/* Core Credentials Input fields form */}
          <form onSubmit={handleLoginSubmit} className="space-y-4 text-xs font-semibold text-slate-400">
            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px] font-mono">Username Identifier</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-600 focus:bg-slate-900/40"
                  placeholder="e.g. admin"
                  autoComplete="off"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="font-bold text-slate-500 uppercase tracking-wide text-[9px] font-mono">Security Passcode</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-600 focus:outline-none focus:border-teal-600 focus:bg-slate-900/40"
                  placeholder="••••••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3.5 bg-teal-700 hover:bg-teal-800 text-white font-bold rounded-xl text-xs uppercase tracking-widest transition-all shadow-md shadow-teal-950/50 mt-4 cursor-pointer"
            >
              {submitting ? "Verifying Token Signature..." : "Initialize Session Matrix"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
