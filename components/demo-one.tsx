
import React from 'react';
import { RevealWaveImage } from "./ui/reveal-wave-image";

export default function DemoOne() {
  return (
    <div className="relative w-screen h-screen flex items-center justify-center bg-zinc-950 p-4 md:p-12">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 w-full max-w-6xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
        <RevealWaveImage
          src="https://images.unsplash.com/photo-1761839257469-96c78a7c2dd3?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.1.0"
          waveSpeed={0.2}
          waveFrequency={1.2}
          waveAmplitude={0.4}
          revealRadius={0.3}
          revealSoftness={0.8}
          pixelSize={2}
          mouseRadius={0.4}
          className="w-full h-full"
        />

        {/* Overlay Text */}
        <div className="absolute bottom-8 left-8 text-white pointer-events-none">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-2">
            Surreal <br /> Reflections
          </h1>
          <p className="text-sm md:text-base text-white/60 font-medium tracking-wide">
            MOVE MOUSE TO REVEAL COLORS & RIPPLES
          </p>
        </div>

        {/* Branding/Logo simulation */}
        <div className="absolute top-8 left-8 flex items-center gap-3 pointer-events-none">
          <div className="w-8 h-8 rounded-full border-2 border-white/50 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
          </div>
          <span className="text-white font-bold tracking-[0.2em] text-xs uppercase">
            Vertex Labs
          </span>
        </div>
      </div>
    </div>
  );
}
