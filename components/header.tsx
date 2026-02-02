
import React from 'react';
import { Triangle } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full z-[100] h-20 flex items-center">
      <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Triangle className="w-5 h-5 fill-white animate-spin-slow" />
          <span className="font-black tracking-tighter text-2xl uppercase italic">UncleLabs</span>
        </div>
        
        <nav className="hidden md:flex items-center gap-12">
          {['Experiments', 'Services', 'Archive'].map((item) => (
            <a 
              key={item}
              href="https://kodlabjunior.com/" 
              className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/40 hover:text-white transition-all relative group"
            >
              {item}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-white transition-all group-hover:w-full" />
            </a>
          ))}
        </nav>

        <a 
          href="https://kodlabjunior.com/"
          className="px-5 py-2.5 border border-white/20 rounded-full text-[10px] uppercase tracking-widest font-black hover:bg-white hover:text-black hover:border-white transition-all"
        >
          Connect
        </a>
      </div>
      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 12s linear infinite;
        }
      `}</style>
    </header>
  );
};

export default Header;
