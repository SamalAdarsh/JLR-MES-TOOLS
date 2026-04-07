import React, { useState, useRef, useEffect } from 'react';
import { Sun, Moon, User, Settings, LogOut } from 'lucide-react';

const Header = ({ darkMode, setDarkMode, theme, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className={`relative z-50 px-6 py-4 border-b flex justify-between items-center transition-colors ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-white bg-white/50 backdrop-blur'}`}>
      
      {/* Left Area: JLR Branding (Hamburger removed) */}
      <div className="flex-1 flex items-center gap-3">
        <img 
          src="https://img.favpng.com/21/11/11/jlr-logo-UnyQiUTN.jpg" 
          alt="JLR Logo" 
          className="h-8 w-auto rounded bg-white p-1.5 object-contain shadow-sm hidden sm:block"
        />
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent hidden md:block">
          MES TOOLS
        </h1>
      </div>
      
      {/* Center Area: Page Title */}
      <div className="flex-1 flex justify-center pr-12 md:pr-24 lg:pr-48 xl:pr-64">
        <h2 className={`text-2xl font-black tracking-wide whitespace-nowrap bg-gradient-to-r bg-clip-text text-transparent ${darkMode ? 'from-white to-slate-400 drop-shadow-sm' : 'from-slate-900 to-slate-500'}`}>
          FA3 TLS Sequencing
        </h2>
      </div>
      
      {/* Right Area: Controls & Profile */}
      <div className="flex items-center gap-6 flex-shrink-0">
        <div className="relative flex items-center gap-3 pl-6 border-l border-slate-200/50" ref={dropdownRef}>
          <div className="text-right leading-tight hidden md:block">
            <div className={`font-bold text-sm ${theme.text}`}>Adarsh Samal</div>
            <div className={`text-xs ${theme.subText}`}>Operator • Morning</div>
          </div>
          
          <button 
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20 transition-transform active:scale-95 ${darkMode ? 'bg-indigo-600 text-white hover:bg-indigo-500' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white hover:shadow-indigo-500/30'}`}
            title="User Menu"
          >
            <User size={20} />
          </button>

          {isDropdownOpen && (
            <div className={`absolute top-14 right-0 w-48 rounded-xl shadow-2xl border overflow-hidden z-50 ${darkMode ? 'bg-slate-800 border-slate-700' : 'bg-white border-slate-100'}`}>
              <div className="py-2">
                <button 
                  onClick={() => setIsDropdownOpen(false)}
                  className={`w-full px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors ${darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  <User size={16} /> Profile
                </button>
                <button 
                  onClick={() => setIsDropdownOpen(false)}
                  className={`w-full px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors ${darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-slate-700 hover:bg-slate-50'}`}
                >
                  <Settings size={16} /> Settings
                </button>
                
                <div className={`h-px my-1 ${darkMode ? 'bg-slate-700' : 'bg-slate-100'}`}></div>
                
                <button 
                  onClick={() => {
                    setIsDropdownOpen(false);
                    if (onLogout) onLogout();
                  }}
                  className={`w-full px-4 py-2.5 text-sm font-medium flex items-center gap-3 transition-colors ${darkMode ? 'text-red-400 hover:bg-slate-700' : 'text-red-600 hover:bg-red-50'}`}
                >
                  <LogOut size={16} /> Logout
                </button>
              </div>
            </div>
          )}
        </div>

        <button 
          onClick={() => setDarkMode(!darkMode)}
          className={`p-2.5 rounded-xl transition-all ${darkMode ? 'bg-slate-800 text-yellow-400 hover:bg-slate-700' : 'bg-white text-slate-500 hover:text-indigo-600 hover:shadow-md'}`}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;