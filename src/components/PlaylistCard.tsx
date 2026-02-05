import { Play } from 'lucide-react';

interface PlaylistCardProps {
  title: string;
  cover: string;
  gradient: string;
  onClick: () => void;
}

export function PlaylistCard({ title, cover, gradient, onClick }: PlaylistCardProps) {
  return (
    <button
      onClick={onClick}
      className="group relative bg-neutral-900 hover:bg-neutral-800 rounded-md overflow-hidden flex items-center transition-all w-full cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
    >
      <div 
        className="w-20 h-20 flex-shrink-0"
        style={{
          background: `linear-gradient(135deg, ${gradient})`
        }}
      >
        {cover && (
          <img 
            src={cover} 
            alt={title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        )}
      </div>
      
      <div className="flex-1 px-4 text-left">
        <h3 className="text-white truncate">{title}</h3>
      </div>

      {/* Play button on hover */}
      <div
        className="absolute right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-200"
      >
        <Play size={20} fill="black" className="text-black ml-0.5" />
      </div>
    </button>
  );
}