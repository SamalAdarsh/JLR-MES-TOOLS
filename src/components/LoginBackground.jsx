import React, { useState, useEffect } from 'react';

// --- BACKGROUND CAROUSEL COMPONENT ---
// NOTE: Corporate firewalls often block external image services like Unsplash.
// If your background is still flat grey/black, download 4 cool car images 
// from Google, place them in your 'public' folder, and change these paths 
// to "/car1.jpg", "/car2.jpg", etc.
const CAROUSEL_IMAGES = [
  "/jlr-bg-car-1.jpg",
  "/jlr-bg-car-2.jpg",
  "/jlr-bg-car-3.jpg",
  "/jlr-bg-car-4.jpg",
  "/jlr-bg-car-5.jpg",
  "/jlr-bg-car-6.jpg",
];
const LoginBackground = ({ darkMode }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Background Carousel Logic
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % CAROUSEL_IMAGES.length);
    }, 6000); // Change image every 6 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Fallback Base Background (In case images are blocked by firewall) */}
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
              // This hides the ugly broken image icon if the URL gets blocked by JLR firewall
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
        ))}
      </div>

      {/* --- ADAPTIVE GRADIENT OVERLAY FOR READABILITY --- */}
      {/* Reduced the opacity values here significantly so the background is much more visible */}
      <div className={`absolute inset-0 z-10 transition-colors duration-700 pointer-events-none ${
        darkMode 
          ? 'bg-gradient-to-tr from-slate-950/60 via-slate-900/30 to-black/10' 
          : 'bg-gradient-to-tr from-white/50 via-white/20 to-transparent'
      }`}></div>
    </>
  );
};

export default LoginBackground;