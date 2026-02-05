import { Project } from '../types';
import { ProjectCard } from './ProjectCard';
import { ChevronRight } from 'lucide-react';
import { memo } from 'react';

interface ProjectRowProps {
  title: string;
  projects: Project[];
  onPlayProject: (project: Project) => void;
  onToggleFavorite: (projectId: string) => void;
  favoriteProjects: string[];
  currentProjectId: string | null;
  isPlaying: boolean;
  onViewAll?: () => void;
}

export const ProjectRow = memo(function ProjectRow({
  title,
  projects,
  onPlayProject,
  onToggleFavorite,
  favoriteProjects,
  currentProjectId,
  isPlaying,
  onViewAll
}: ProjectRowProps) {
  return (
    <div className="mb-10">
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-white hover:underline cursor-pointer text-lg md:text-2xl"
          onClick={onViewAll}
        >
          {title}
        </h2>
        {onViewAll && (
          <button
            onClick={onViewAll}
            className="text-sm text-neutral-400 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            Tout afficher
            <ChevronRight size={16} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onPlay={onPlayProject}
            onToggleFavorite={onToggleFavorite}
            isFavorite={favoriteProjects.includes(project.id)}
            isPlaying={currentProjectId === project.id && isPlaying}
          />
        ))}
      </div>
    </div>
  );
});