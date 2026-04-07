import { useState } from 'react';

export const useTheme = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = {
    bg: darkMode 
      ? 'bg-gradient-to-br from-slate-900 via-slate-900 to-slate-950' 
      : 'bg-gradient-to-br from-indigo-50 via-white to-blue-50',
    text: darkMode ? 'text-slate-100' : 'text-slate-800',
    card: darkMode 
      ? 'bg-slate-900/80 backdrop-blur-sm border-slate-700 shadow-xl shadow-black/20' 
      : 'bg-white/80 backdrop-blur-sm border-white shadow-xl shadow-indigo-100/50',
    cardHeader: darkMode ? 'bg-slate-800/50 border-slate-700' : 'bg-slate-50/80 border-slate-100',
    input: darkMode 
      ? 'bg-slate-950 border-slate-700 text-white placeholder-slate-600 focus:border-blue-500' 
      : 'bg-white border-slate-200 text-slate-900 focus:border-indigo-500 focus:ring-indigo-100',
    subText: darkMode ? 'text-slate-400' : 'text-slate-500',
    tableHeader: darkMode ? 'text-slate-500 border-slate-700' : 'text-slate-400 border-slate-100',
    tableRow: darkMode ? 'border-slate-800' : 'border-slate-100',
    codeBlock: darkMode ? 'bg-black/30 border-slate-800 text-green-400' : 'bg-slate-50 border-slate-200 text-slate-700',
    navItemActive: 'bg-blue-600 text-white shadow-lg shadow-blue-900/20',
    navItemInactive: darkMode ? 'text-slate-400 hover:bg-slate-800' : 'text-slate-400 hover:bg-white hover:text-indigo-600',
  };

  return { darkMode, setDarkMode, theme };
};