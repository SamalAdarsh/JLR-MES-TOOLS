import React from 'react';

const LoadingOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-100 bg-slate-900 flex flex-col items-center justify-center overflow-hidden animate-in fade-in duration-500">
     
      <style>{`
        @keyframes driveCar {
          0% { transform: translateX(100vw); }
          35% { transform: translateX(0); }
          65% { transform: translateX(0); }
          100% { transform: translateX(-100vw); }
        }
        .animate-drive {
          animation: driveCar 3.5s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }
      `}</style>
      
    
      <div className="absolute inset-0 bg-linear-to-b from-slate-800 to-slate-950 opacity-80"></div>

      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="animate-drive flex flex-col items-center w-full relative">
           
         

           <img 
             src="/range-rover.png" 
             alt="Range Rover" 
             className="w-80 h-auto drop-shadow-[0_15px_15px_rgba(255,255,255,0.2)]"
           />
        </div>

        <div className="w-[150vw] h-1 bg-linear-to-r from-transparent via-slate-500 to-transparent mt-2 opacity-50 shadow-lg"></div>
      </div>

      <div className="relative z-10 mt-16 flex flex-col items-center w-full px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-linear-to-r from-white to-slate-400 tracking-widest md:tracking-[0.2em] uppercase animate-pulse drop-shadow-xl">
          Fasten your seat belts
        </h2>
        <p className="mt-6 text-blue-400 font-bold tracking-[0.2em] text-xs md:text-sm uppercase opacity-80">
          Initializing MES Dashboard
        </p>
        
        <div className="mt-8 flex gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>

    </div>
  );
};

export default LoadingOverlay;