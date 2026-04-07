import React, { useState } from 'react';
import { Key, Mail, User, Shield, ArrowRight, Sun, Moon } from 'lucide-react';
import LoadingOverlay from './LoadingOverlay';

const Login = ({ onLogin, theme, darkMode, setDarkMode }) => {
  const [cdsid, setCdsid] = useState('ASAMAL1');
  const [email, setEmail] = useState('ASAMAL@gmail.com');
  const [password, setPassword] = useState('ASAMAL1');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    // Simple validation
    if (!cdsid || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setShowAnimation(true);
    
    // Let the car animation play for 3.5 seconds before navigating to the dashboard
    setTimeout(() => {
      setIsLoading(false);
      setShowAnimation(false);
      onLogin(); 
    }, 3500);
  };

  return (
    <>
      {/* --- MAIN LOGIN SCREEN --- */}
      <div className={`min-h-screen w-full flex items-center justify-center transition-colors duration-500 ${theme.bg}`}>
        
        {/* Theme Toggle positioned at the top right of the login screen */}
        <div className="absolute top-6 right-8 z-10">
          <button 
            onClick={() => setDarkMode(!darkMode)}
            className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white text-slate-500 hover:text-indigo-600 hover:shadow-md'}`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

        <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${theme.card}`}>
          {/* Cool background glowing orb effects */}
          <div className={`absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${darkMode ? 'bg-blue-500' : 'bg-indigo-400'}`}></div>
          <div className={`absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none ${darkMode ? 'bg-indigo-500' : 'bg-blue-400'}`}></div>

          <div className="relative z-10">
            <div className="flex justify-center mb-6">
              <div className={`p-4 rounded-2xl shadow-lg ${darkMode ? 'bg-slate-800' : 'bg-white'}`}>
                <Shield size={48} strokeWidth={1.5} className={darkMode ? 'text-blue-400' : 'text-indigo-600'} />
              </div>
            </div>
            
            <div className="text-center mb-8">
              <h1 className="text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-2">
                JLR MES TOOLS
              </h1>
              <p className={`text-sm ${theme.subText}`}>Secure Operator Access Portal</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/50 rounded-xl text-red-500 text-sm text-center font-medium animate-in zoom-in duration-200">
                  {error}
                </div>
              )}

              <div className="space-y-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${theme.subText}`}>JLR CDSID</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={cdsid}
                    onChange={(e) => setCdsid(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium ${theme.input}`}
                    placeholder="e.g. ASAMAL1"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${theme.subText}`}>Email ID</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium ${theme.input}`}
                    placeholder="name@jaguarlandrover.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 ${theme.subText}`}>Password</label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-500 transition-colors">
                    <Key size={18} />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all font-medium ${theme.input}`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-3.5 mt-6 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg active:scale-95 ${
                  isLoading 
                  ? 'bg-indigo-500 text-white cursor-wait opacity-90' 
                  : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-indigo-500/30 hover:from-blue-500 hover:to-indigo-500'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">Authenticating...</span>
                ) : (
                  <>Login to Dashboard <ArrowRight size={18} /></>
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center">
               <p className={`text-xs ${theme.subText}`}>Authorized Personnel Only. <br/> Access is logged and monitored.</p>
            </div>
          </div>
        </div>
      </div>

      {/* --- PREMIUM CINEMATIC LOADING OVERLAY --- */}
      <LoadingOverlay isVisible={showAnimation} />
    </>
  );
};

export default Login;