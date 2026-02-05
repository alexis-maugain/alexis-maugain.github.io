import { useState } from 'react';
import { X, Play, Pause, Heart, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';
import { Project } from '../types';

interface ProjectViewProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onToggleFavorite: (projectId: string) => void;
  isFavorite: boolean;
}

export function ProjectView({ 
  project, 
  isOpen, 
  onClose, 
  isPlaying, 
  onTogglePlay,
  onToggleFavorite,
  isFavorite 
}: ProjectViewProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Filter only images (not videos) for the lightbox
  const imageOnly = project?.images.filter(
    (img) => !img.endsWith('.mp4') && !img.endsWith('.webm') && !img.endsWith('.mov')
  ) ?? [];

  const openLightbox = (imgSrc: string) => {
    const idx = imageOnly.indexOf(imgSrc);
    if (idx !== -1) setLightboxIndex(idx);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goToPrev = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + imageOnly.length) % imageOnly.length);
  };

  const goToNext = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % imageOnly.length);
  };

  if (!project || !isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/95 z-40 overflow-y-auto animate-fade-in"
    >
      <div className="min-h-screen pb-32">
        {/* Header with gradient */}
        <div 
          className="relative h-96 bg-gradient-to-b from-neutral-900 to-black"
          style={{
            background: `linear-gradient(180deg, ${project.color}40 0%, #000000 100%)`
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-black/60 hover:bg-black hover:scale-110 active:scale-95 rounded-full flex items-center justify-center text-white z-10 cursor-pointer transition-all"
          >
            <X size={24} />
          </button>

          {/* Project Cover and Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-end gap-4 md:gap-6">
              <img
                src={project.cover}
                alt={project.title}
                className="w-32 h-32 md:w-60 md:h-60 rounded-lg shadow-2xl object-cover flex-shrink-0 animate-fade-in-scale"
                loading="lazy"
              />
              <div className="flex-1 pb-0 md:pb-4">
                <p className="text-xs md:text-sm text-white/80 mb-1 md:mb-2">PROJET</p>
                <h1
                  className="text-white mb-2 md:mb-4 text-3xl md:text-[56px] animate-fade-in"
                >
                  {project.title}
                </h1>
                <div
                  className="flex items-center gap-2 md:gap-4 text-xs md:text-sm text-white/80 animate-fade-in"
                  style={{ animationDelay: '0.1s' }}
                >
                  <span>{project.role}</span>
                  <span>•</span>
                  <span>{project.category}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center gap-4">
            <button
              onClick={onTogglePlay}
              className="w-14 h-14 bg-green-500 hover:bg-green-400 hover:scale-105 active:scale-95 rounded-full flex items-center justify-center transition-all cursor-pointer"
            >
              {isPlaying ? (
                <Pause size={28} fill="black" className="text-black" />
              ) : (
                <Play size={28} fill="black" className="text-black ml-1" />
              )}
            </button>

            <button
              onClick={() => onToggleFavorite(project.id)}
              className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all cursor-pointer hover:scale-110 active:scale-95 ${
                isFavorite
                  ? 'border-green-500 text-green-500'
                  : 'border-neutral-600 text-neutral-400 hover:border-white hover:text-white'
              }`}
            >
              <Heart size={24} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pb-24 md:pb-32">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Description */}
            <section className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
              <h2 className="text-white mb-4">Présentation</h2>
              <p className="text-neutral-300 leading-relaxed">{project.description}</p>
            </section>

            {/* Tools */}
            <div
              className="flex flex-wrap gap-2 animate-fade-in"
              style={{ animationDelay: '0.2s' }}
            >
              {project.tools.map((tool, index) => (
                <span
                  key={index}
                  className="px-4 py-2 bg-neutral-900 text-neutral-300 rounded-full text-sm border border-neutral-800"
                >
                  {tool}
                </span>
              ))}
            </div>

            {/* Images Grid */}
            <section
              className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-fade-in"
              style={{ animationDelay: '0.25s' }}
            >
              {project.images.map((img, index) => {
                const isVideo = img.endsWith('.mp4') || img.endsWith('.webm') || img.endsWith('.mov');
                
                return (
                  <div
                    key={index}
                    className="aspect-video rounded-lg overflow-hidden bg-neutral-900"
                  >
                    {isVideo ? (
                      <video 
                        src={img}
                        controls
                        className="w-full h-full object-cover"
                        preload="metadata"
                      >
                        Votre navigateur ne supporte pas la lecture de vidéos.
                      </video>
                    ) : (
                      <img 
                        src={img} 
                        alt={`${project.title} - Image ${index + 1}`}
                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-300 cursor-pointer"
                        loading="lazy"
                        onClick={() => openLightbox(img)}
                      />
                    )}
                  </div>
                );
              })}
            </section>

            {/* Problem */}
            <section className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <h2 className="text-white mb-4">Problématique</h2>
              <p className="text-neutral-300 leading-relaxed">{project.problem}</p>
            </section>

            {/* Process */}
            <section className="animate-fade-in" style={{ animationDelay: '0.35s' }}>
              <h2 className="text-white mb-4">Processus de Création & Méthodologie</h2>
              <p className="text-neutral-300 leading-relaxed">{project.process}</p>
            </section>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 w-10 h-10 bg-black/60 hover:bg-black hover:scale-110 active:scale-95 rounded-full flex items-center justify-center text-white z-10 cursor-pointer transition-all"
          >
            <X size={24} />
          </button>

          {/* Previous button */}
          {imageOnly.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToPrev(); }}
              className="absolute left-4 md:left-8 w-10 h-10 bg-black/60 hover:bg-black hover:scale-110 active:scale-95 rounded-full flex items-center justify-center text-white z-10 cursor-pointer transition-all"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <ChevronLeft size={24} />
            </button>
          )}

          {/* Next button */}
          {imageOnly.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); goToNext(); }}
              className="absolute right-4 md:right-8 w-10 h-10 bg-black/60 hover:bg-black hover:scale-110 active:scale-95 rounded-full flex items-center justify-center text-white z-10 cursor-pointer transition-all"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            >
              <ChevronRight size={24} />
            </button>
          )}

          {/* Image (centered) */}
          <div className="w-full h-full flex items-center justify-center px-16">
            <img
              src={imageOnly[lightboxIndex]}
              alt={`${project.title} - Image ${lightboxIndex + 1}`}
              className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl animate-fade-in-scale"
              onClick={(e) => e.stopPropagation()}
            />
          </div>

          {/* Image counter */}
          {imageOnly.length > 1 && (
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm">
              {lightboxIndex + 1} / {imageOnly.length}
            </div>
          )}
        </div>
      )}
    </div>
  );
}