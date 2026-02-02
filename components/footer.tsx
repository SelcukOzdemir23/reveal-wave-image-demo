
import React from 'react';

const Footer = () => {
  return (
    <footer className="relative z-10 bg-black/60 backdrop-blur-md py-20 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <h4 className="text-xl font-black italic tracking-tighter uppercase drop-shadow-lg" style={{textShadow: '0 2px 6px rgba(0,0,0,0.7)'}}>UncleLabs</h4>
            <p className="text-white/60 text-sm max-w-xs leading-relaxed drop-shadow" style={{textShadow: '0 1px 4px rgba(0,0,0,0.7)'}}>
              Synthesizing digital emotions through mathematics and interaction. Available for world-class collaborations.
            </p>
          </div>
          
          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 drop-shadow" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>Socials</h5>
            <div className="flex flex-col gap-2 text-sm text-white/60 drop-shadow" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>
              <a href="https://kodlabjunior.com/" className="hover:text-white transition-colors">X.com (Twitter)</a>
              <a href="https://kodlabjunior.com/" className="hover:text-white transition-colors">GitHub Repository</a>
              <a href="https://kodlabjunior.com/" className="hover:text-white transition-colors">Instagram Lab</a>
            </div>
          </div>

          <div className="space-y-4">
            <h5 className="text-[10px] font-black uppercase tracking-[0.2em] text-white/90 drop-shadow" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>Location</h5>
            <p className="text-sm text-white/60 leading-relaxed drop-shadow" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>
              Galata, Istanbul<br />
              Distributed Studio<br />
              Remote First
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-[10px] uppercase tracking-[0.3em] font-bold text-white/30 drop-shadow" style={{textShadow: '0 1px 3px rgba(0,0,0,0.7)'}}>
          <p>© {new Date().getFullYear()} UncleLabs. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0">
            <a href="https://kodlabjunior.com/" className="hover:text-white transition-colors">Privacy</a>
            <a href="https://kodlabjunior.com/" className="hover:text-white transition-colors">Terms</a>
            <p className="text-white/50 italic">Code is Poetry</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
