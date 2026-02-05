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
    </button>
  );
}