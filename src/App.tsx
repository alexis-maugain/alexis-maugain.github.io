import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, Mail, Github, MapPin, Linkedin } from 'lucide-react';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { ProjectCard } from './components/ProjectCard';
import { ProjectView } from './components/ProjectView';
import { PlaylistHeader } from './components/PlaylistHeader';
import { ProjectRow } from './components/ProjectRow';
import { PlaylistCard } from './components/PlaylistCard';
import { ProfileCard } from './components/ProfileCard';
import { LoadingScreen } from './components/LoadingScreen';
import { WrappedBanner } from './components/WrappedBanner';
import { WrappedModal } from './components/WrappedModal';
import { WelcomeBanner } from './components/WelcomeBanner';
import { MobileNav } from './components/MobileNav';
import { projects, playlists } from './data/projects';
import { Project } from './types';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('home');
  const [currentProject, setCurrentProject] = useState<Project | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [favoriteProjects, setFavoriteProjects] = useState<string[]>([]);
  const [isProjectViewOpen, setIsProjectViewOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Tout');
  const [isWrappedModalOpen, setIsWrappedModalOpen] = useState(false);

  const handlePlayProject = (project: Project) => {
    setCurrentProject(project);
    setIsPlaying(true);
    setIsProjectViewOpen(false);
    
    // Ouvre la vue détaillée après 1 seconde
    setTimeout(() => {
      setIsProjectViewOpen(true);
    }, 1000);
  };

  const handleTogglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const handleToggleFavorite = (projectId: string) => {
    setFavoriteProjects((prev) =>
      prev.includes(projectId)
        ? prev.filter((id) => id !== projectId)
        : [...prev, projectId]
    );
  };

  const handlePrevious = () => {
    if (!currentProject) return;
    const currentPlaylist = getFilteredProjects();
    const currentIndex = currentPlaylist.findIndex((p) => p.id === currentProject.id);
    const prevIndex = currentIndex > 0 ? currentIndex - 1 : currentPlaylist.length - 1;
    setCurrentProject(currentPlaylist[prevIndex]);
  };

  const handleNext = () => {
    if (!currentProject) return;
    const currentPlaylist = getFilteredProjects();
    const currentIndex = currentPlaylist.findIndex((p) => p.id === currentProject.id);
    const nextIndex = currentIndex < currentPlaylist.length - 1 ? currentIndex + 1 : 0;
    setCurrentProject(currentPlaylist[nextIndex]);
  };

  const getFilteredProjects = (): Project[] => {
    if (activeView === 'all') {
      return projects;
    }
    if (activeView === 'favorites') {
      return projects.filter((p) => favoriteProjects.includes(p.id));
    }
    const playlist = playlists.find((pl) => pl.id === activeView);
    if (playlist) {
      return projects.filter((p) => playlist.projects.includes(p.id));
    }
    return projects;
  };

  const getViewTitle = (): string => {
    if (activeView === 'home') return 'Accueil';
    if (activeView === 'all') return 'Tous les singles';
    if (activeView === 'favorites') return 'Mes Favoris';
    if (activeView === 'about') return 'À propos';
    if (activeView === 'contact') return 'Contact';
    const playlist = playlists.find((pl) => pl.id === activeView);
    return playlist?.name || 'Portfolio';
  };

  const getViewDescription = (): string => {
    if (activeView === 'top-france') {
      return 'Mes meilleurs projets, classés par pertinence et impact. Une sélection de réalisations qui ont marqué ma carrière créative.';
    }
    if (activeView === 'ui-ux') {
      return 'Une collection de projets centrés sur l\'expérience utilisateur et le design d\'interface.';
    }
    if (activeView === 'web') {
      return 'Développements web, applications et expériences digitales interactives.';
    }
    if (activeView === 'motion') {
      return 'Motion design, animations 3D et expériences visuelles immersives.';
    }
    if (activeView === 'all') {
      return 'L\'intégralité de mes projets créatifs dans tous les domaines.';
    }
    if (activeView === 'favorites') {
      return 'Vos projets favoris sauvegardés pour un accès rapide.';
    }
    return '';
  };

  const getGradient = (): string => {
    if (activeView === 'top-france') return '#1DB954, #1ed760';
    if (activeView === 'ui-ux') return '#9333EA, #C026D3';
    if (activeView === 'web') return '#3B82F6, #06B6D4';
    if (activeView === 'motion') return '#F59E0B, #EF4444';
    return '#1DB954, #1ed760';
  };

  const filteredProjects = getFilteredProjects();

  const renderContent = () => {
    if (activeView === 'home') {
      // Page d'accueil avec sections multiples
      const recentProjects = [...projects].slice(0, 6);
      const trendingProjects = [projects[1], projects[0], projects[3], projects[2], projects[4], projects[5]];
      const topProjects = [...projects].sort((a, b) => b.id.localeCompare(a.id)).slice(0, 6);
      const uiuxProjects = projects.filter(p => p.category.includes('UI/UX')).slice(0, 6);

      const playlistsData = [
        { id: 'all', title: 'Tous les singles', gradient: '#EC4899, #8B5CF6', cover: projects[4]?.cover },
        { id: 'favorites', title: 'Mes Favoris', gradient: '#10B981, #059669', cover: projects[5]?.cover },
        { id: 'top-france', title: 'Top France', gradient: '#1DB954, #1ed760', cover: projects[0]?.cover },
        { id: 'ui-ux', title: 'UX/UI Design', gradient: '#9333EA, #C026D3', cover: projects[1]?.cover },
        { id: 'web', title: 'Web', gradient: '#3B82F6, #06B6D4', cover: projects[2]?.cover },
        { id: 'motion', title: 'Motion & 3D', gradient: '#F59E0B, #EF4444', cover: projects[3]?.cover },
      ];

      const categories = [
        { label: 'Tout', view: 'all' },
        { label: 'UI/UX', view: 'ui-ux' },
        { label: 'Web', view: 'web' },
        { label: 'Motion', view: 'motion' },
        { label: '3D', view: 'motion' }
      ];
      
      return (
        <div>
          {/* Welcome Banner */}
          <WelcomeBanner />

          {/* Top Bar with Avatar and Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            {/* Profile Avatar */}
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActiveView('about')}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white flex-shrink-0 cursor-pointer"
            >
              <img src="./assets/logo.svg" alt="Profile" className="w-8 h-8 rounded-full object-cover" />
            </motion.button>

            {/* Filter Pills */}
            {categories.map((category, index) => (
              <motion.button
                key={category.label}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setActiveView(category.view)}
                className="px-4 md:px-5 py-2 rounded-full whitespace-nowrap transition-all bg-neutral-800 text-white hover:bg-neutral-700 text-sm md:text-base flex-shrink-0 cursor-pointer"
              >
                {category.label}
              </motion.button>
            ))}
          </div>

          {/* Playlists Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-10">
            {playlistsData.map((playlist, index) => (
              <motion.div
                key={playlist.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <PlaylistCard
                  title={playlist.title}
                  cover={playlist.cover}
                  gradient={playlist.gradient}
                  onClick={() => setActiveView(playlist.id)}
                />
              </motion.div>
            ))}
          </div>

          {/* Wrapped 2025 Banner */}
          <WrappedBanner onStart={() => setIsWrappedModalOpen(true)} />

          {/* Dernières sorties */}
          <ProjectRow
            title="Dernières sorties"
            projects={recentProjects}
            onPlayProject={handlePlayProject}
            onToggleFavorite={handleToggleFavorite}
            favoriteProjects={favoriteProjects}
            currentProjectId={currentProject?.id || null}
            isPlaying={isPlaying}
            onViewAll={() => setActiveView('all')}
          />

          {/* En tendance */}
          <ProjectRow
            title="En tendance"
            projects={trendingProjects}
            onPlayProject={handlePlayProject}
            onToggleFavorite={handleToggleFavorite}
            favoriteProjects={favoriteProjects}
            currentProjectId={currentProject?.id || null}
            isPlaying={isPlaying}
            onViewAll={() => setActiveView('top-france')}
          />

          {/* Top France */}
          <ProjectRow
            title="Top France - Projets les plus écoutés"
            projects={topProjects}
            onPlayProject={handlePlayProject}
            onToggleFavorite={handleToggleFavorite}
            favoriteProjects={favoriteProjects}
            currentProjectId={currentProject?.id || null}
            isPlaying={isPlaying}
            onViewAll={() => setActiveView('top-france')}
          />

          {/* UI/UX Design */}
          {uiuxProjects.length > 0 && (
            <ProjectRow
              title="UX/UI Design"
              projects={uiuxProjects}
              onPlayProject={handlePlayProject}
              onToggleFavorite={handleToggleFavorite}
              favoriteProjects={favoriteProjects}
              currentProjectId={currentProject?.id || null}
              isPlaying={isPlaying}
              onViewAll={() => setActiveView('ui-ux')}
            />
          )}
        </div>
      );
    }
    
    if (activeView === 'about') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl"
        >
          <div className="mb-8 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center flex-shrink-0">
              <img src="./assets/moi.webp" alt="Alexis MAUGAIN" className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover" />
            </div>
            <div>
              <h1 className="text-white mb-4 text-[32px] md:text-[40px]">Alexis MAUGAIN</h1>
              <p className="text-lg md:text-xl text-neutral-300">
                Je compose des expériences numériques comme des morceaux bien produits.
              </p>
            </div>
          </div>

          <div className="space-y-6 text-neutral-300 pb-12 md:pb-16">
            <p>
              Chaque projet est une playlist immersive où création, interaction et technologie s'accordent pour offrir une expérience fluide et mémorable.
            </p>
            <p>
              Étudiant en BUT MMI, spécialisé en création numérique, je façonne des interfaces claires, esthétiques et pensées pour l'utilisateur. De l'idée à la réalisation, chaque élément est travaillé comme une note juste : à sa place, utile et cohérente dans l'ensemble.
            </p>
            <p>
              J'aime transformer des concepts en expériences digitales engageantes, capables de capter l'attention et de guider naturellement l'utilisateur, comme un morceau qu'on relance encore et encore.
            </p>

            <div className="mt-12 pt-8 border-t border-neutral-800">
              <h2 className="text-white mb-6">Compétences</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {['Design graphique', 'Web design', 'Gestion de projet', 'Communication', 'Développement', 'Audiovisuel'].map((skill) => (
                  <div key={skill} className="bg-neutral-900 rounded-lg px-4 py-3 text-center">
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Télécharger le CV */}
            <div className="mt-12 pt-8 border-t border-neutral-800">
              <a
                href="./assets/CV_Alexis_Maugain.pdf"
                download="CV_Alexis_Maugain"
                className="inline-flex items-center gap-3 px-6 py-4 bg-green-500 hover:bg-green-600 text-white rounded-full transition-colors group"
              >
                <Download size={20} />
                <span>Télécharger mon CV</span>
              </a>
            </div>
          </div>
        </motion.div>
      );
    }

    if (activeView === 'contact') {
      return (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <h1 className="text-white mb-6 text-6xl">Contact</h1>
          <p className="text-xl text-neutral-300 mb-12">
            Une envie de featuring ? On appuie sur play et on en parle.
          </p>

          <div className="space-y-6">
            <a
              href="mailto:alexis.maugain@gmail.com"
              className="flex items-center gap-4 p-6 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <Mail className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-white">Email</p>
                <p className="text-neutral-400">alexis.maugain@gmail.com</p>
              </div>
            </a>

            <a
              href="https://github.com/alexouuuuuuuuuuu"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <Github className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-white">GitHub</p>
                <p className="text-neutral-400">@alexouuuuuuuuuuu</p>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/alexis-maugain"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-6 bg-neutral-900 hover:bg-neutral-800 rounded-lg transition-colors group"
            >
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                <Linkedin className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-white">LinkedIn</p>
                <p className="text-neutral-400">@alexis-maugain</p>
              </div>
            </a>

            <div className="flex items-center gap-4 p-6 bg-neutral-900 rounded-lg">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <MapPin className="text-green-500" size={24} />
              </div>
              <div>
                <p className="text-white">Localisation</p>
                <p className="text-neutral-400">Nantes - Limoges, France</p>
              </div>
            </div>
          </div>
        </motion.div>
      );
    }

    return (
      <>
        <PlaylistHeader
          title={getViewTitle()}
          description={getViewDescription()}
          coverGradient={getGradient()}
          projectCount={filteredProjects.length}
          onPlayAll={() => {
            if (filteredProjects.length > 0) {
              handlePlayProject(filteredProjects[0]);
            }
          }}
        />

        {filteredProjects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-neutral-400 text-lg">Aucun projet dans cette playlist</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProjectCard
                  project={project}
                  onPlay={handlePlayProject}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favoriteProjects.includes(project.id)}
                  isPlaying={currentProject?.id === project.id && isPlaying}
                />
              </motion.div>
            ))}
          </div>
        )}
      </>
    );
  };

  useEffect(() => {
    // Simulate a loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Scroll to top when changing views
    window.scrollTo(0, 0);
  }, [activeView]);

  useEffect(() => {
    // Handle spacebar to play/pause
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === 'Space' && currentProject) {
        // Prevent scrolling when spacebar is pressed
        e.preventDefault();
        handleTogglePlay();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [currentProject, handleTogglePlay]);

  return (
    <div className="min-h-screen bg-black">
      {isLoading && <LoadingScreen />}
      
      <Sidebar
        activeView={activeView}
        onNavigate={setActiveView}
        favoriteProjects={favoriteProjects}
      />

      <main className="ml-0 md:ml-64 p-4 md:p-8 pb-32 md:pb-32">
        {renderContent()}
      </main>

      <Player
        currentProject={currentProject}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onPrevious={handlePrevious}
        onNext={handleNext}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={currentProject ? favoriteProjects.includes(currentProject.id) : false}
        onExpand={() => setIsProjectViewOpen(true)}
      />

      <MobileNav
        activeView={activeView}
        onNavigate={setActiveView}
        favoriteProjects={favoriteProjects}
      />

      <ProjectView
        project={currentProject}
        isOpen={isProjectViewOpen}
        onClose={() => setIsProjectViewOpen(false)}
        isPlaying={isPlaying}
        onTogglePlay={handleTogglePlay}
        onToggleFavorite={handleToggleFavorite}
        isFavorite={currentProject ? favoriteProjects.includes(currentProject.id) : false}
      />

      <WrappedModal
        isOpen={isWrappedModalOpen}
        onClose={() => setIsWrappedModalOpen(false)}
      />
    </div>
  );
}