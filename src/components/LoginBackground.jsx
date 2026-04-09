import React, { useState, useEffect } from 'react';

const CAROUSEL_IMAGES = [
  "/jlr-bg-car-1.jpg",
  "/jlr-bg-car-2.jpg",
  "/jlr-bg-car-3.jpg",
  "/jlr-bg-car-4.jpg",
  "/jlr-bg-car-5.jpg",
  "/jlr-bg-car-6.jpg",
   "/jlr-bg-car-7.jpg",
    "/jlr-bg-car-8.jpg",
     "/jlr-bg-car-9.jpg",
];
const LoginBackground = ({ darkMode }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
  
      <div className={`absolute inset-0 z-0 ${darkMode ? 'bg-slate-900' : 'bg-slate-200'}`}></div>

      {/* --- IMAGE CAROUSEL LAYER --- */}
      <div className="absolute inset-0 z-0">
        {CAROUSEL_IMAGES.map((img, idx) => (
          <div 
            key={idx} 
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${idx === currentImageIndex ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={img} 
              alt="JLR Background" 
              className="w-full h-full object-cover origin-center"
              style={{ 
                transform: idx === currentImageIndex ? 'scale(1.08)' : 'scale(1)', 
                transition: 'transform 10s ease-out' 
              }} 
             
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        ))}
      </div>


      <div className={`absolute inset-0 z-10 transition-colors duration-700 pointer-events-none ${
        darkMode 
          ? 'bg-linear-to-tr from-slate-950/60 via-slate-900/30 to-black/10' 
          : 'bg-linear-to-tr from-white/50 via-white/20 to-transparent'
      }`}></div>
    </>
  );
};

export default LoginBackground;