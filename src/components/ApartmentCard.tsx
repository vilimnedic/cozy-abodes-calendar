
import React from 'react';
import { cn } from '@/lib/utils';
import { Bed, Bath, Users, Wifi, Tv, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ImageGallery from './ImageGallery';
import AnimatedSection from './AnimatedSection';

interface Amenity {
  icon: React.ReactNode;
  label: string;
}

interface ApartmentCardProps {
  id: number;
  name: string;
  description: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  guests: number;
  images: string[];
  amenities: string[];
  className?: string;
  delay?: number;
  onViewCalendar: () => void;
}

export const ApartmentCard = ({
  id,
  name,
  description,
  price,
  bedrooms,
  bathrooms,
  guests,
  images,
  amenities,
  className,
  delay = 0,
  onViewCalendar,
}: ApartmentCardProps) => {
  const amenityIcons: Record<string, Amenity> = {
    wifi: { icon: <Wifi className="h-4 w-4" />, label: 'WiFi' },
    tv: { icon: <Tv className="h-4 w-4" />, label: 'TV' },
    'king bed': { icon: <Bed className="h-4 w-4" />, label: 'King Bed' },
    'queen bed': { icon: <Bed className="h-4 w-4" />, label: 'Queen Bed' },
  };

  return (
    <AnimatedSection
      className={cn('group overflow-hidden rounded-xl bg-white transition-all', className)}
      delay={delay}
    >
      <div className="h-72 sm:h-80 md:h-96 lg:h-80 xl:h-96">
        <ImageGallery images={images} className="h-full w-full" />
      </div>
      
      <div className="p-6">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-2">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <div className="mt-1 flex items-center text-sm text-muted-foreground">
              <Bed className="mr-1 h-4 w-4" />
              <span>{bedrooms} bedroom{bedrooms !== 1 ? 's' : ''}</span>
              <span className="mx-2">•</span>
              <Bath className="mr-1 h-4 w-4" />
              <span>{bathrooms} bathroom{bathrooms !== 1 ? 's' : ''}</span>
              <span className="mx-2">•</span>
              <Users className="mr-1 h-4 w-4" />
              <span>Up to {guests} guests</span>
            </div>
          </div>
          
          <div className="flex flex-col items-end">
            <div className="text-lg font-bold">${price}</div>
            <div className="text-sm text-muted-foreground">per night</div>
          </div>
        </div>
        
        <p className="mb-5 text-muted-foreground trim-text-3">{description}</p>
        
        <div className="mb-6">
          <h4 className="mb-2.5 text-sm font-medium uppercase tracking-wide text-muted-foreground">Amenities</h4>
          <div className="flex flex-wrap gap-2">
            {amenities.map((amenity, index) => {
              const amenityInfo = amenityIcons[amenity.toLowerCase()];
              return (
                <div
                  key={index}
                  className="flex items-center rounded-full bg-secondary px-3 py-1 text-xs"
                >
                  {amenityInfo?.icon || null}
                  <span className="ml-1.5">{amenityInfo?.label || amenity}</span>
                </div>
              );
            })}
          </div>
        </div>
        
        <div className="flex gap-3">
          <Button 
            variant="outline" 
            className="flex-1 gap-1.5"
            onClick={onViewCalendar}
          >
            <Calendar className="h-4 w-4" />
            <span>Check Availability</span>
          </Button>
          <Button 
            className="flex-1 gap-1.5"
            onClick={() => window.open('https://airbnb.com', '_blank')}
          >
            Book Now
          </Button>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default ApartmentCard;
