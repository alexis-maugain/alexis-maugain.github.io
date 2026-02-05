interface PlaylistHeaderProps {
  title: string;
  description: string;
  coverGradient: string;
  projectCount: number;
  onPlayAll: () => void;
}

export function PlaylistHeader({ title, description, coverGradient, projectCount, onPlayAll }: PlaylistHeaderProps) {
  return (
    <div 
      className="relative h-64 md:h-80 mb-6 rounded-lg overflow-hidden animate-fade-in"
      style={{
        background: `linear-gradient(135deg, ${coverGradient})`
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60" />
      
      <div className="relative h-full flex items-end p-4 md:p-8">
        <div>
          <p className="text-xs md:text-sm uppercase tracking-wider mb-2 text-white/80">
            Playlist
          </p>
          <h1 className="text-white mb-4 text-[28px] md:text-[48px]">
            {title}
          </h1>
          <p className="text-white/80 mb-4 max-w-2xl text-sm md:text-base">
            {description}
          </p>
          <p className="text-xs md:text-sm text-white/60">
            {projectCount} {projectCount === 1 ? 'projet' : 'projets'}
          </p>
        </div>
      </div>
    </div>
  );
}