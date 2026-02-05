import { Play, Pause, SkipBack, SkipForward, Heart, Maximize2 } from 'lucide-react';
import { Project } from '../types';
import { useState, useEffect, memo } from 'react';

interface PlayerProps {
  currentProject: Project | null;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onToggleFavorite: (projectId: string) => void;
  isFavorite: boolean;
  onExpand: () => void;
}

export const Player = memo(function Player({ 
  currentProject, 
  isPlaying, 
  onTogglePlay, 
  onPrevious, 
  onNext,
  onToggleFavorite,
  isFavorite,
  onExpand
}: PlayerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isPlaying && currentProject) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + 0.56;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, currentProject]);

  if (!currentProject) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 bg-neutral-950 border-t border-neutral-800 z-[60] md:bottom-0 bottom-16 animate-slide-up"
    >
      {/* Progress Bar */}
      <div className="relative h-1 bg-neutral-800 group cursor-pointer">
        <div
          className="absolute h-full bg-green-500 transition-[width] duration-1000 linear"
          style={{ width: `${progress}%` }}
        />
        <div 
          className="absolute h-full hover:bg-green-400/20 w-full"
          onClick={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = (x / rect.width) * 100;
            setProgress(percentage);
          }}
        />
      </div>

      <div className="flex items-center justify-between px-4 py-3">
        {/* Current Project Info */}
        <div className="flex items-center gap-4 flex-1 min-w-0">
          <img
            src={currentProject.cover}
            alt={currentProject.title}
            className="w-14 h-14 rounded-md object-cover cursor-pointer hidden md:block hover:scale-105 transition-transform"
            onClick={onExpand}
            loading="lazy"
          />
          <div className="min-w-0">
            <h4 className="text-white truncate cursor-pointer hover:underline text-sm md:text-base" onClick={onExpand}>
              {currentProject.title}
            </h4>
            <p className="text-xs md:text-sm text-neutral-400 truncate">{currentProject.category}</p>
          </div>
          <button
            onClick={() => onToggleFavorite(currentProject.id)}
            className={`hidden md:block cursor-pointer hover:scale-110 active:scale-95 transition-transform ${
              isFavorite ? 'text-green-500' : 'text-neutral-400 hover:text-white'
            } transition-colors`}
          >
            <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center gap-2 flex-1">
          <div className="flex items-center gap-4">
            <button
              onClick={onPrevious}
              className="text-neutral-400 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <SkipBack size={20} />
            </button>
            
            <button
              onClick={onTogglePlay}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 active:scale-95 transition-transform cursor-pointer"
            >
              {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} fill="black" className="ml-0.5" />}
            </button>
            
            <button
              onClick={onNext}
              className="text-neutral-400 hover:text-white hover:scale-110 active:scale-95 transition-all cursor-pointer"
            >
              <SkipForward size={20} />
            </button>
          </div>
          
          {/* Progress Time */}
          <div className="flex items-center gap-2 text-xs text-neutral-400">
            <span>{Math.floor(progress / 100 * 180)}s</span>
            <span>/</span>
            <span>180s</span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center justify-end gap-2 flex-1">
          <button
            onClick={onExpand}
            className="bg-green-500 hover:bg-green-400 hover:scale-120 active:scale-95 rounded-full p-2 transition-all shadow-lg shadow-green-500/50 cursor-pointer"
          >
            <Maximize2 size={20} className="text-black" />
          </button>
        </div>
      </div>
    </div>
  );
});