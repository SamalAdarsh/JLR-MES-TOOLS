import React from 'react';
import { Sun, Moon, User } from 'lucide-react';

const Header = ({ darkMode, setDarkMode, theme }) => {
  return (
    <header className={`px-8 py-4 border-b flex justify-between items-center transition-colors ${darkMode ? 'border-slate-800 bg-slate-900/50' : 'border-white bg-white/50 backdrop-blur'}`}>
      <h2 className={`text-xl font-bold bg-gradient-to-r from-slate-700 to-slate-500 bg-clip-text text-transparent ${darkMode ? 'from-slate-100 to-slate-400' : 'from-slate-800 to-slate-600'}`}>
        TLS Sequencing
      </h2>
      
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 pl-6 border-l border-slate-200/50">
          <div className="text-right leading-tight hidden md:block">
            <div className={`font-bold text-sm ${theme.text}`}>Adarsh Samal</div>
            <div className={`text-xs ${theme.subText}`}>Operator • Morning</div>
          </div>
          <div className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg ring-2 ring-white/20 ${darkMode ? 'bg-indigo-600 text-white' : 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white'}`}>
            <User size={20} />
          </div>
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