import { X } from 'lucide-react';

interface WrappedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WrappedModal({ isOpen, onClose }: WrappedModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 bg-neutral-800 hover:bg-neutral-700 hover:scale-110 active:scale-95 rounded-full flex items-center justify-center text-white transition-all z-10 cursor-pointer"
      >
        <X size={24} />
      </button>

      {/* Image */}
      <img
        src="./assets/wrapped2025.webp"
        alt="Wrapped 2025"
        className="max-w-full max-h-full object-contain rounded-lg animate-fade-in-scale"
        onClick={(e) => e.stopPropagation()}
        loading="lazy"
      />
    </div>
  );
}