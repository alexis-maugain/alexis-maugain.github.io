import { Home, Trophy, Grid3x3, Palette, Code, Film, User, Mail, Heart } from 'lucide-react';

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string) => void;
  favoriteProjects: string[];
}

export function Sidebar({ activeView, onNavigate, favoriteProjects }: SidebarProps) {
  const mainLinks = [
    { id: 'home', label: 'Accueil', icon: Home },
    { id: 'top-france', label: 'Top France', icon: Trophy },
    { id: 'all', label: 'Tous les singles', icon: Grid3x3 }
  ];

  const playlists = [
    { id: 'ui-ux', label: 'UX/UI Design', icon: Palette },
    { id: 'web', label: 'Web', icon: Code },
    { id: 'motion', label: 'Motion & 3D', icon: Film }
  ];

  const footerLinks = [
    { id: 'about', label: 'À propos', icon: User },
    { id: 'contact', label: 'Contact', icon: Mail }
  ];

  return (
    <div className="w-64 bg-black h-screen flex flex-col fixed left-0 top-0 border-r border-neutral-900 hidden md:flex">
      {/* Logo */}
      <div className="p-6">
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <div className="w-8 h-8 flex items-center justify-center">
            <img src="./assets/logospoti.svg" alt="Spotfolio Logo" className="w-8 h-8" />
          </div>
          <span className="text-white tracking-tight">Spotfolio</span>
        </button>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 px-3 overflow-y-auto">
        <div className="space-y-1 mb-6">
          {mainLinks.map((link) => {
            const Icon = link.icon;
            const isActive = activeView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`w-full flex items-center gap-4 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                  isActive 
                    ? 'bg-neutral-800 text-white' 
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                }`}
              >
                <Icon size={20} />
                <span>{link.label}</span>
              </button>
            );
          })}
        </div>

        {/* Playlists */}
        <div className="mb-6">
          <h3 className="px-3 mb-2 text-xs uppercase tracking-wider text-neutral-500">
            Playlists
          </h3>
          <div className="space-y-1">
            {playlists.map((playlist) => {
              const Icon = playlist.icon;
              const isActive = activeView === playlist.id;
              return (
                <button
                  key={playlist.id}
                  onClick={() => onNavigate(playlist.id)}
                  className={`w-full flex items-center gap-4 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-neutral-800 text-white' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Icon size={20} />
                  <span>{playlist.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Library */}
        <div>
          <h3 className="px-3 mb-2 text-xs uppercase tracking-wider text-neutral-500">
            Bibliothèque
          </h3>
          <div className="space-y-1">
            <button
              onClick={() => onNavigate('favorites')}
              className={`w-full flex items-center gap-4 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                activeView === 'favorites'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
              }`}
            >
              <Heart size={20} />
              <span>Favoris</span>
              {favoriteProjects.length > 0 && (
                <span className="ml-auto text-xs bg-neutral-700 px-2 py-0.5 rounded-full">
                  {favoriteProjects.length}
                </span>
              )}
            </button>
            
            <div className="my-4 border-t border-neutral-800"></div>
            
            {footerLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeView === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavigate(link.id)}
                  className={`w-full flex items-center gap-4 px-3 py-2 rounded-md transition-colors cursor-pointer ${
                    isActive 
                      ? 'bg-neutral-800 text-white' 
                      : 'text-neutral-400 hover:text-white hover:bg-neutral-900'
                  }`}
                >
                  <Icon size={20} />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
}