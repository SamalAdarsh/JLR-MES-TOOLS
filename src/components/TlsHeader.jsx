import React, { useState } from 'react';
import { ArrowLeft, User, Settings, LogOut, Sun, Moon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const TlsHeader = ({ darkMode, setDarkMode, user, onLogout }) => {
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleLogoutClick = () => {
    if (onLogout) onLogout();
    navigate('/login');
  };

  return (
    <header className={`px-6 py-3 border-b flex justify-between items-center shadow-sm relative z-20 shrink-0 ${darkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200'}`}>
      <div className="flex items-center gap-4">
        <button 
          onClick={() => navigate('/')}
          className={`p-2 rounded-full transition-colors ${darkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'}`}
        >
          <ArrowLeft size={20} />
        </button>
        <div className="flex items-center gap-3">
          <img src="https://img.favpng.com/21/11/11/jlr-logo-UnyQiUTN.jpg" alt="JLR" className="h-7 w-7 object-contain rounded bg-white p-0.5" />
          <h1 className="text-xl font-bold tracking-tight hidden sm:block">TLS Sequencing Control</h1>
        </div>
      </div>
      
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-3 relative">
          <div className="text-right hidden md:block">
            <div className={`text-sm font-extrabold tracking-wide ${darkMode ? 'text-white' : 'text-slate-900'}`}>
              {user || 'ASAMAL1'}
            </div>
            <div className={`text-[11px] font-medium ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
              Operator • Morning
            </div>
          </div>
          
          <button 
            onClick={() => setIsProfileOpen(!isProfileOpen)}
            className="h-10 w-10 rounded-full bg-[#4f46e5] flex items-center justify-center text-white hover:bg-[#4338ca] transition-colors shadow-md focus:outline-none ring-2 ring-transparent focus:ring-[#4f46e5]/50 relative z-50"
          >
            <User size={18} strokeWidth={2.5} />
          </button>

          {/* Click-away overlay */}
          {isProfileOpen && (
            <div className="fixed inset-0 z-40" onClick={() => setIsProfileOpen(false)}></div>
          )}

          {isProfileOpen && (
            <div className={`absolute top-12 right-0 mt-2 w-48 rounded-xl border shadow-2xl py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-200'}`}>
              <button className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${darkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                <User size={16} /> Profile
              </button>
              <button className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors ${darkMode ? 'hover:bg-slate-700 text-slate-200' : 'hover:bg-slate-50 text-slate-700'}`}>
                <Settings size={16} /> Settings
              </button>
              <div className={`my-1 border-t ${darkMode ? 'border-slate-700' : 'border-slate-100'}`}></div>
              <button 
                onClick={handleLogoutClick}
                className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 transition-colors text-red-500 ${darkMode ? 'hover:bg-red-500/10' : 'hover:bg-red-50'}`}
              >
                <LogOut size={16} /> Logout
              </button>
            </div>
          )}
        </div>

        <div className={`h-8 w-px ${darkMode ? 'bg-slate-800' : 'bg-slate-200'}`}></div>

        <button 
          onClick={() => setDarkMode && setDarkMode(!darkMode)}
          className={`p-2.5 rounded-xl transition-all shadow-sm ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-slate-50 border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
        >
          {darkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </header>
  );
};

export default TlsHeader;