import React, { useState } from 'react';
import { Key, Mail, User, ArrowRight, Sun, Moon } from 'lucide-react';
import LoadingOverlay from './LoadingOverlay';
import LoginBackground from './LoginBackground';

const Login = ({ onLogin, darkMode = true, setDarkMode }) => {
  const [cdsid, setCdsid] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
 
    if (!cdsid || !email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    setIsLoading(true);
    setShowAnimation(true);
    
  
    setTimeout(() => {
      setIsLoading(false);
      setShowAnimation(false);

      if (onLogin) onLogin(cdsid.toUpperCase()); 
    }, 3500);
  };

  return (
    <>
      <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black">
        
     
        <LoginBackground darkMode={darkMode} />
        
        <div className="absolute top-6 right-8 z-20">
          <button 
            onClick={() => setDarkMode && setDarkMode(!darkMode)}
            className={`p-2.5 rounded-full transition-all backdrop-blur-md border ${
              darkMode 
                ? 'bg-slate-800/50 border-slate-600/50 text-yellow-400 hover:bg-slate-700/80 hover:shadow-[0_0_15px_rgba(250,204,21,0.3)]' 
                : 'bg-white/50 border-white/60 text-indigo-600 hover:bg-white/80 hover:shadow-[0_0_15px_rgba(79,70,229,0.3)]'
            }`}
            title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>

      
        <div className={`w-full max-w-md p-6 rounded-4xl border shadow-2xl relative z-20 overflow-hidden transition-all duration-500 backdrop-blur-xl ${
          darkMode 
            ? 'bg-slate-900/50 border-slate-700/50 shadow-black/60 text-white' 
            : 'bg-white/60 border-white/60 shadow-indigo-900/20 text-slate-900'
        }`}>
          
          <div className="relative z-10">
           
            <div className="flex justify-center mb-4">
              <div className={`p-3 rounded-2xl shadow-xl backdrop-blur-md border ${
                darkMode ? 'bg-slate-800/60 border-slate-600/50' : 'bg-white/70 border-white/60'
              }`}>
                <img 
                  src="https://img.favpng.com/21/11/11/jlr-logo-UnyQiUTN.jpg" 
                  alt="JLR Logo" 
                  className="h-16 w-16 object-contain rounded-xl bg-white p-1.5 shadow-sm" 
                />
              </div>
            </div>
            
            <div className="text-center mb-5">
              <h1 className="text-3xl font-extrabold bg-linear-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent mb-1 drop-shadow-sm">
                MES TOOLS
              </h1>
              <p className={`text-xs font-medium ${darkMode ? 'text-slate-300' : 'text-slate-600'}`}>Secure Operator Access Portal</p>
            </div>

  
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-500/20 border border-red-500/50 rounded-xl text-red-500 text-sm text-center font-medium animate-in zoom-in duration-200 backdrop-blur-md">
                  {error}
                </div>
              )}

              <div className="space-y-1">
                <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 drop-shadow-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>JLR CDSID</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${darkMode ? 'text-slate-400 group-focus-within:text-blue-400' : 'text-slate-500 group-focus-within:text-indigo-600'}`}>
                    <User size={18} />
                  </div>
                  <input 
                    type="text" 
                    value={cdsid}
                    onChange={(e) => setCdsid(e.target.value)}
                   
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium backdrop-blur-md [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#0f172a] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] ${
                      darkMode 
                        ? 'bg-slate-900/50 border-slate-600/50 text-white placeholder-slate-400 focus:bg-slate-900/80 focus:border-indigo-500' 
                        : 'bg-white/60 border-white/60 text-slate-900 placeholder-slate-500 focus:bg-white/90 focus:border-indigo-400'
                    }`}
                    placeholder="e.g. ASAMAL1"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 drop-shadow-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Email ID</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${darkMode ? 'text-slate-400 group-focus-within:text-blue-400' : 'text-slate-500 group-focus-within:text-indigo-600'}`}>
                    <Mail size={18} />
                  </div>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium backdrop-blur-md [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#0f172a] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] ${
                      darkMode 
                        ? 'bg-slate-900/50 border-slate-600/50 text-white placeholder-slate-400 focus:bg-slate-900/80 focus:border-indigo-500' 
                        : 'bg-white/60 border-white/60 text-slate-900 placeholder-slate-500 focus:bg-white/90 focus:border-indigo-400'
                    }`}
                    placeholder="name@jaguarlandrover.com"
                    disabled={isLoading}
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className={`text-[10px] font-bold uppercase tracking-wider ml-1 drop-shadow-sm ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>Password</label>
                <div className="relative group">
                  <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors ${darkMode ? 'text-slate-400 group-focus-within:text-blue-400' : 'text-slate-500 group-focus-within:text-indigo-600'}`}>
                    <Key size={18} />
                  </div>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                 
                    className={`w-full pl-11 pr-4 py-3 rounded-xl border outline-none focus:ring-2 focus:ring-indigo-500 transition-all font-medium backdrop-blur-md [&:-webkit-autofill]:shadow-[inset_0_0_0px_1000px_#0f172a] [&:-webkit-autofill]:[-webkit-text-fill-color:#fff] ${
                      darkMode 
                        ? 'bg-slate-900/50 border-slate-600/50 text-white placeholder-slate-400 focus:bg-slate-900/80 focus:border-indigo-500' 
                        : 'bg-white/60 border-white/60 text-slate-900 placeholder-slate-500 focus:bg-white/90 focus:border-indigo-400'
                    }`}
                    placeholder="••••••••"
                    disabled={isLoading}
                  />
                </div>
              </div>

  
              <button 
                type="submit" 
                disabled={isLoading}
                className={`w-full py-3.5 mt-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all shadow-lg active:scale-95 border border-white/10 ${
                  isLoading 
                  ? 'bg-indigo-500/80 text-white cursor-wait opacity-90 backdrop-blur-md' 
                  : 'bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] hover:from-blue-500 hover:to-indigo-500'
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">Authenticating...</span>
                ) : (
                  <>Login to Dashboard <ArrowRight size={18} /></>
                )}
              </button>
            </form>
            
       
            <div className="mt-5 text-center">
               <p className={`text-[10px] font-medium drop-shadow-sm ${darkMode ? 'text-slate-400' : 'text-slate-600'}`}>Authorized Personnel Only. <br/> Access is logged and monitored.</p>
            </div>
          </div>
        </div>
      </div>

  
      <LoadingOverlay isVisible={showAnimation} />
    </>
  );
};

export default Login;