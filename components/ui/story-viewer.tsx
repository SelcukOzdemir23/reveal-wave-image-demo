
"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX, Pause, Loader2 } from "lucide-react";
import { cn } from "../../lib/utils";

export interface Story {
  id: string;
  type: "image" | "video";
  src: string;
  duration?: number;
}

export interface StoryViewerProps {
  stories: Story[];
  username: string;
  avatar: string;
  timestamp?: string;
  onStoryView?: (storyId: string) => void;
  onAllStoriesViewed?: () => void;
  className?: string;
}

const DEFAULT_IMAGE_DURATION = 5000;

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
    scale: 0.9,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
    scale: 0.9,
  }),
};

function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes <= 1 ? "Just now" : `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  return `${Math.floor(diffHours / 24)}d ago`;
}

interface StoryThumbnailProps {
  stories: Story[];
  username: string;
  viewedIndices: Set<number>;
  onClick: () => void;
  className?: string;
}

function StoryThumbnail({
  stories,
  username,
  viewedIndices,
  onClick,
  className,
}: StoryThumbnailProps) {
  const segmentCount = stories.length;
  const gapDegrees = segmentCount > 1 ? 12 : 0;
  const segmentDegrees = (360 - gapDegrees * segmentCount) / segmentCount;
  const allViewed = viewedIndices.size === stories.length;

  const lastStory = stories[stories.length - 1];

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-2 group transition-transform active:scale-90 flex-shrink-0",
        className
      )}
      aria-label={`View ${username}'s stories`}
    >
      <div className="relative w-[72px] h-[72px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {stories.map((_, index) => {
            const startAngle = -90 + index * (segmentDegrees + gapDegrees);
            const endAngle = startAngle + segmentDegrees;
            const isViewed = viewedIndices.has(index);

            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const radius = 46;
            const x1 = 50 + radius * Math.cos(startRad);
            const y1 = 50 + radius * Math.sin(startRad);
            const x2 = 50 + radius * Math.cos(endRad);
            const y2 = 50 + radius * Math.sin(endRad);
            const largeArc = segmentDegrees > 180 ? 1 : 0;

            return (
              <path
                key={index}
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                className={cn(
                  "transition-colors duration-300",
                  isViewed || allViewed
                    ? "stroke-white/20"
                    : "stroke-white"
                )}
              />
            );
          })}
        </svg>

        <div className="absolute inset-[5px] rounded-full bg-black p-[2px]">
          <div className="w-full h-full rounded-full overflow-hidden bg-zinc-900">
            {lastStory.type === "video" ? (
              <video
                src={lastStory.src}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                muted
                playsInline
                preload="metadata"
              />
            ) : (
              <img
                src={lastStory.src}
                alt={`${username}'s story`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            )}
          </div>
        </div>
      </div>

      <span className="text-[10px] text-white/40 uppercase tracking-widest font-black truncate max-w-[80px]">
        {username}
      </span>
    </button>
  );
}

function ProgressBar({ count, currentIndex, progress, viewedIndices }: any) {
  return (
    <div className="flex gap-1 w-full px-2">
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === currentIndex;
        const isPast = index < currentIndex;
        return (
          <div key={index} className="flex-1 h-0.5 bg-white/20 rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-white"
              initial={{ width: isPast ? "100%" : "0%" }}
              animate={{ width: isActive ? `${progress}%` : isPast ? "100%" : "0%" }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        );
      })}
    </div>
  );
}

function StoryViewerModal({
  stories,
  username,
  avatar,
  timestamp,
  initialIndex,
  viewedIndices,
  onClose,
  onStoryChange,
}: any) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [progress, setProgress] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const [isVideoBuffering, setIsVideoBuffering] = React.useState(false);
  const videoRef = React.useRef<HTMLVideoElement | null>(null);
  const duration = stories[currentIndex].duration || DEFAULT_IMAGE_DURATION;

  const goToNext = React.useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex((prev: number) => prev + 1);
      setProgress(0);
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goToPrevious = React.useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev: number) => prev - 1);
      setProgress(0);
    }
  }, [currentIndex]);

  React.useEffect(() => {
    onStoryChange(currentIndex);
  }, [currentIndex, onStoryChange]);

  React.useEffect(() => {
    if (isPaused || !isVideoReady || isVideoBuffering) return;
    if (stories[currentIndex].type === 'video') return;

    const start = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const p = Math.min((elapsed / duration) * 100, 100);
      setProgress(p);
      if (p >= 100) goToNext();
    }, 32);
    return () => clearInterval(interval);
  }, [currentIndex, isPaused, isVideoReady, isVideoBuffering, goToNext, duration, stories]);

  React.useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[10000] bg-black/95 backdrop-blur-3xl flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="relative w-full h-full md:h-[90vh] md:max-w-lg md:rounded-[3rem] overflow-hidden bg-black shadow-[0_0_120px_rgba(0,0,0,1)] md:border md:border-white/10"
        initial={{ scale: 0.9, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 30 }}
        transition={{ type: "spring", damping: 30, stiffness: 400 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-0 inset-x-0 z-50 p-6 bg-gradient-to-b from-black/90 to-transparent">
          <ProgressBar count={stories.length} currentIndex={currentIndex} progress={progress} viewedIndices={viewedIndices} />
          <div className="flex items-center justify-between mt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border border-white/20 overflow-hidden">
                <img src={avatar} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest italic">{username}</div>
                <div className="text-[8px] text-white/40 uppercase tracking-widest">{timestamp ? formatTimestamp(timestamp) : 'LIVE'}</div>
              </div>
            </div>
            <button onClick={onClose} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="h-full w-full flex items-center justify-center bg-zinc-950 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute inset-0 flex items-center justify-center"
            >
              {(isVideoBuffering || !isVideoReady) && (
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                  <Loader2 className="w-8 h-8 text-white/20 animate-spin" />
                </div>
              )}
              {stories[currentIndex].type === 'video' ? (
                <video
                  ref={videoRef}
                  src={stories[currentIndex].src}
                  className="w-full h-full object-contain md:object-cover"
                  autoPlay
                  playsInline
                  muted={isMuted}
                  onCanPlay={() => setIsVideoReady(true)}
                  onWaiting={() => setIsVideoBuffering(true)}
                  onPlaying={() => setIsVideoBuffering(false)}
                  onTimeUpdate={(e) => {
                    const v = e.currentTarget;
                    if (v.duration) setProgress((v.currentTime / v.duration) * 100);
                  }}
                  onEnded={goToNext}
                />
              ) : (
                <img src={stories[currentIndex].src} className="w-full h-full object-contain md:object-cover" onLoad={() => setIsVideoReady(true)} alt="" />
              )}
            </motion.div>
          </AnimatePresence>

          <div className="absolute inset-y-0 left-0 w-1/3 z-40 cursor-pointer" onClick={goToPrevious} />
          <div className="absolute inset-y-0 right-0 w-1/3 z-40 cursor-pointer" onClick={goToNext} />
        </div>
        
        <div className="absolute bottom-10 right-6 z-50 flex flex-col gap-4">
           {stories[currentIndex].type === 'video' && (
             <button onClick={() => setIsMuted(!isMuted)} className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center backdrop-blur-md hover:bg-black/80 transition-colors">
               {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
             </button>
           )}
           <button onClick={() => setIsPaused(!isPaused)} className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center backdrop-blur-md hover:bg-black/80 transition-colors">
             {isPaused ? <ChevronRight className="w-5 h-5 ml-0.5" /> : <Pause className="w-4 h-4" />}
           </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export const StoryViewer = ({ stories, username, avatar, timestamp, className }: StoryViewerProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [viewed, setViewed] = React.useState(new Set<number>());
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  return (
    <>
      <StoryThumbnail 
        stories={stories} 
        username={username} 
        viewedIndices={viewed} 
        onClick={() => setIsOpen(true)} 
        className={className} 
      />
      {mounted && isOpen && createPortal(
        <AnimatePresence>
          <StoryViewerModal
            stories={stories}
            username={username}
            avatar={avatar}
            timestamp={timestamp}
            initialIndex={0}
            viewedIndices={viewed}
            onClose={() => setIsOpen(false)}
            onStoryChange={(idx: number) => setViewed(prev => new Set([...prev, idx]))}
          />
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};
