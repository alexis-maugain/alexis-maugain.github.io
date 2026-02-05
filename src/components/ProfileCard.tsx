import { Music2 } from 'lucide-react';

interface ProfileCardProps {
  onViewAbout: () => void;
}

export function ProfileCard({ onViewAbout }: ProfileCardProps) {
  return (
    <div
      className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg p-6 text-white sticky top-0 animate-fade-in"
    >
      <div className="flex flex-col items-center text-center">
        {/* Profile Image */}
        <div className="w-32 h-32 rounded-full bg-black/20 mb-4 flex items-center justify-center overflow-hidden">
          <Music2 size={48} className="text-white" />
        </div>

        {/* Name */}
        <h2 className="text-white mb-2">Creative Designer</h2>
        <p className="text-sm text-white/80 mb-1">Designer & Developer</p>
        <p className="text-xs text-white/70 mb-6">Paris, France</p>

        {/* Stats */}
        <div className="flex gap-6 mb-6 w-full justify-center">
          <div className="text-center">
            <div className="text-white mb-1">6</div>
            <div className="text-xs text-white/70">Projets</div>
          </div>
          <div className="text-center">
            <div className="text-white mb-1">4</div>
            <div className="text-xs text-white/70">Playlists</div>
          </div>
        </div>

        {/* Bio */}
        <p className="text-sm text-white/90 mb-6 leading-relaxed">
          Passionné par la création d'expériences digitales mémorables et innovantes.
        </p>

        {/* View Profile Button */}
        <button
          onClick={onViewAbout}
          className="w-full bg-black/30 hover:bg-black/40 text-white py-3 rounded-full transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-105 active:scale-95"
        >
          <span>Voir mon profil</span>
        </button>
      </div>
    </div>
  );
}