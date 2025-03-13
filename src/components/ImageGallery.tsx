
import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface ImageGalleryProps {
  images: string[];
  className?: string;
}

export const ImageGallery = ({ images, className }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className={cn('relative overflow-hidden rounded-lg', className)}>
        <div className="relative h-full w-full">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Gallery image ${index + 1}`}
              className={cn(
                'h-full w-full object-cover transition-opacity duration-300',
                currentIndex === index ? 'opacity-100' : 'opacity-0 absolute inset-0'
              )}
              onClick={openModal}
            />
          ))}
        </div>
        
        {images.length > 1 && (
          <>
            <button
              className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 shadow-md transition-all hover:bg-white"
              onClick={prevImage}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-1.5 text-gray-800 shadow-md transition-all hover:bg-white"
              onClick={nextImage}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
            <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
              {images.map((_, index) => (
                <button
                  key={index}
                  className={cn(
                    'h-1.5 w-6 rounded-full transition-all',
                    currentIndex === index ? 'bg-white' : 'bg-white/40'
                  )}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={closeModal}
        >
          <button
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white transition-all hover:bg-white/20"
            onClick={closeModal}
          >
            <X className="h-6 w-6" />
          </button>
          
          <img
            src={images[currentIndex]}
            alt={`Gallery image ${currentIndex + 1}`}
            className="max-h-[90vh] max-w-full rounded object-contain"
          />
          
          <button
            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
            onClick={prevImage}
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          
          <button
            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-all hover:bg-white/20"
            onClick={nextImage}
          >
            <ChevronRight className="h-6 w-6" />
          </button>
          
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  'h-1.5 w-8 rounded-full transition-all',
                  currentIndex === index ? 'bg-white' : 'bg-white/30'
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(index);
                }}
              />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;
