
import React from 'react';
import { RevealWaveImage } from "./ui/reveal-wave-image";
import { StoryViewer } from "./ui/story-viewer";
import LiquidGradient from "./ui/flow-gradient-hero-section";
import { ConnoisseurStackInteractor } from "./ui/connoisseur-stack-interactor";
import FooterSection from "./ui/footer";
import { Zap, Layers, Globe, FlaskConical } from 'lucide-react';

const users = [
  {
    username: "Fluid_01",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=fluid",
    timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
    stories: [
      { id: "f1", type: "video" as const, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4" },
      { id: "f2", type: "image" as const, src: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?w=800&h=1200&fit=crop" },
    ],
  },
  {
    username: "Vertex_Lab",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=vertex",
    timestamp: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
    stories: [
      { id: "v1", type: "image" as const, src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&h=1200&fit=crop" },
      { id: "v2", type: "video" as const, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4" },
    ],
  },
  {
    username: "Shaders",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=shader",
    timestamp: new Date(Date.now() - 120 * 60 * 1000).toISOString(),
    stories: [
      { id: "s1", type: "image" as const, src: "https://images.unsplash.com/photo-1633167606207-d840b5070fc2?w=800&h=1200&fit=crop" },
    ],
  },
  {
    username: "Motion_X",
    avatar: "https://api.dicebear.com/7.x/shapes/svg?seed=motion",
    timestamp: new Date(Date.now() - 300 * 60 * 1000).toISOString(),
    stories: [
      { id: "m1", type: "video" as const, src: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4" },
    ],
  },
];

const LandingPage = () => {
  return (
    <div className="relative min-h-screen bg-transparent text-white font-sans">
      {/* IMMERSIVE BACKGROUND */}
      <div className="fixed inset-0 w-full h-full -z-10 pointer-events-auto">
        <RevealWaveImage
          src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
          waveSpeed={0.15}
          waveFrequency={0.8}
          waveAmplitude={0.3}
          revealRadius={0.4}
          revealSoftness={0.9}
          pixelSize={2}
          mouseRadius={0.3}
          className="w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/60 pointer-events-none" />
      </div>

      <div className="pt-24 space-y-24">
        {/* LAB FEED (STORIES) SECTION */}
        <section className="relative px-6 z-50">
          <div className="max-w-7xl mx-auto backdrop-blur-xl bg-white/5 rounded-full border border-white/10 p-3 shadow-2xl flex items-center gap-6">
            <div className="flex items-center gap-2 pl-4 border-r border-white/10 pr-6">
              <FlaskConical className="w-4 h-4 text-white/40" />
              <h2 className="text-[10px] uppercase tracking-[0.4em] font-black italic text-white/60 whitespace-nowrap">Lab Live</h2>
            </div>
            
            <div className="flex gap-4 overflow-x-auto scrollbar-hide py-1">
              {users.map((user) => (
                <StoryViewer
                  key={user.username}
                  stories={user.stories}
                  username={user.username}
                  avatar={user.avatar}
                  timestamp={user.timestamp}
                  className="scale-90"
                />
              ))}
            </div>
            
            <div className="ml-auto pr-4 hidden md:flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-[8px] uppercase tracking-widest font-black text-white/40">Active Nodes: 12</span>
            </div>
          </div>
        </section>

        {/* HERO SECTION WITH LIQUID GRADIENT */}
        <section className="relative px-6">
          <div className="max-w-7xl mx-auto">
            <LiquidGradient 
                title="Synthesizing Digital Emotions"
                ctaText="Start Experiment"
                onCtaClick={() => window.open('https://kodlabjunior.com/', '_blank')}
            />
            
            <div className="mt-12 flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12">
                <div className="max-w-md">
                    <p className="text-white/60 text-lg font-light leading-relaxed">
                        Independent research studio creating <span className="text-white italic">reactive digital soul</span> through recursive physics and fragment shaders.
                    </p>
                </div>
                <div className="flex gap-12">
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Efficiency</span>
                        <span className="text-xl font-bold italic">99.9%</span>
                    </div>
                    <div className="flex flex-col gap-1">
                        <span className="text-[10px] font-black text-white/20 uppercase tracking-widest">Interactivity</span>
                        <span className="text-xl font-bold italic">Realtime</span>
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* PHILOSOPHY SECTION */}
        <section className="relative py-32 px-6 backdrop-blur-[2px] bg-black/40 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24">
              <div className="space-y-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-black italic">Reactive Motion</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  We believe interfaces should breathe. Our work focuses on organic movement that responds to human touch, not just static pixels.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  <Layers className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-black italic">Shader Crafts</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  Specializing in WebGL and custom fragment shaders to push the boundaries of what's possible in a browser environment.
                </p>
              </div>

              <div className="space-y-6">
                <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
                  <Globe className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-sm uppercase tracking-[0.2em] font-black italic">Global Aesthetic</h3>
                <p className="text-white/40 text-sm leading-relaxed font-light">
                  Minimalist form met with maximum impact. We design for a global audience that values clarity, speed, and digital soul.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL MODULE SECTION */}
        <section className="relative px-6 pb-48">
          <div className="max-w-7xl mx-auto">
            <ConnoisseurStackInteractor />
          </div>
        </section>
      </div>

      <FooterSection />
    </div>
  );
};

export default LandingPage;
