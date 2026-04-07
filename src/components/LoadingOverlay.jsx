import React from 'react';

const LoadingOverlay = ({ isVisible }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950 flex flex-col items-center justify-center overflow-hidden animate-in fade-in duration-500">
      
      {/* Custom CSS Animation Keyframes for the Car */}
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
      
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black opacity-80"></div>

      {/* Car Graphic & Logo Wrapper */}
      <div className="relative z-10 w-full max-w-4xl flex flex-col items-center">
        <div className="animate-drive flex flex-col items-center w-full relative">
          
           {/* Glowing JLR Logo floating above car */}
           <div className="absolute -top-24">
             <img 
               src="https://img.favpng.com/21/11/11/jlr-logo-UnyQiUTN.jpg" 
               alt="JLR Logo" 
               className="h-10 w-auto rounded bg-white p-1.5 object-contain shadow-[0_0_25px_rgba(255,255,255,0.4)]"
             />
           </div>

           {/* Requested Range Rover Silhouette Image */}
           {/* 'brightness-0 invert' forces the image to be solid white to fit the theme */}
           <img 
             src="https://www.pngfind.com/pngs/m/176-1760205_range-rover-from-the-side-png-download-2011.png" 
             alt="Range Rover Silhouette" 
             className="w-80 h-auto drop-shadow-[0_15px_15px_rgba(255,255,255,0.2)] brightness-0 invert"
             onError={(e) => {
               // Fallback in case pngfind.com blocks local hotlinking
               e.target.src = "https://freepngimg.com/thumb/land_rover/28414-land-rover-transparent-background.png";
             }}
           />
        </div>

        {/* Faded Road Line */}
        <div className="w-[150vw] h-1 bg-gradient-to-r from-transparent via-slate-600 to-transparent mt-2 opacity-50 shadow-lg"></div>
      </div>

      {/* Loading Typography (Changed to Relative and pushed down to prevent overlapping) */}
      <div className="relative z-10 mt-16 flex flex-col items-center w-full px-4 text-center">
        <h2 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400 tracking-[0.1em] md:tracking-[0.2em] uppercase animate-pulse drop-shadow-xl">
          Fasten your seat belts
        </h2>
        <p className="mt-6 text-blue-400 font-bold tracking-[0.2em] text-xs md:text-sm uppercase opacity-80">
          Initializing MES Dashboard
        </p>
        
        {/* Loading Dots */}
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