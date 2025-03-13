
import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

interface HeroProps {
  onScrollToApartments: () => void;
}

export const Hero = ({ onScrollToApartments }: HeroProps) => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Hero Background with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ 
          backgroundImage: `url('/lovable-uploads/858a0427-a0ea-409f-a5ef-777675a5dced.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-transparent"></div>
      </div>
      
      {/* Content Container */}
      <div className="container relative z-10 mx-auto flex h-full max-w-7xl flex-col items-center justify-center px-4 text-center">
        <AnimatedSection className="max-w-3xl space-y-6">
          <h1 className="text-balance text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl lg:text-6xl">
            Coastal Paradise Awaits
          </h1>
          
          <p className="mx-auto max-w-2xl text-balance text-lg text-white/90 sm:text-xl">
            Experience the perfect blend of luxury and nature in our waterfront villas,
            with crystal clear waters and stunning views just steps from your door.
          </p>
          
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Button 
              size="lg" 
              className="bg-white text-gray-900 hover:bg-white/90"
              onClick={onScrollToApartments}
            >
              View Apartments
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="border-white text-white hover:bg-white/10"
              onClick={() => window.open('https://airbnb.com', '_blank')}
            >
              Book on Airbnb
            </Button>
          </div>
        </AnimatedSection>
        
        {/* Scroll Down Button */}
        <AnimatedSection 
          className="absolute bottom-10 left-0 right-0 flex justify-center"
          delay={600}
        >
          <button 
            onClick={onScrollToApartments}
            className="flex animate-bounce flex-col items-center text-white/80 transition-colors hover:text-white"
          >
            <span className="mb-2 text-sm font-medium">Explore</span>
            <ChevronDown className="h-6 w-6" />
          </button>
        </AnimatedSection>
      </div>
    </div>
  );
};

export default Hero;
