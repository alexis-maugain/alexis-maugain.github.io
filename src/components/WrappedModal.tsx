import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface WrappedModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function WrappedModal({ isOpen, onClose }: WrappedModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black z-[100] flex items-center justify-center p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-neutral-800 hover:bg-neutral-700 rounded-full flex items-center justify-center text-white transition-colors z-10 cursor-pointer"
          >
            <X size={24} />
          </motion.button>

          {/* Image */}
          <motion.img
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            src="./assets/wrapped2025.webp"
            alt="Wrapped 2025"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}