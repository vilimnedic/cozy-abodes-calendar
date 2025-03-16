
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Bed, Bath, Users, Wifi, Tv, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import AnimatedSection from '@/components/AnimatedSection';
import ImageGallery from '@/components/ImageGallery';

// Import apartment data
import { apartments } from './Index';

const ApartmentDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Find the apartment by ID
  const apartment = apartments.find(apt => apt.id === Number(id));
  
  // If apartment not found, redirect to home page
  useEffect(() => {
    if (!apartment) {
      navigate('/');
    }
  }, [apartment, navigate]);
  
  if (!apartment) {
    return null;
  }
  
  const amenityIcons: Record<string, React.ReactNode> = {
    wifi: <Wifi className="h-5 w-5" />,
    tv: <Tv className="h-5 w-5" />,
    'king bed': <Bed className="h-5 w-5" />,
    'queen bed': <Bed className="h-5 w-5" />,
    'air conditioning': <Star className="h-5 w-5" />,
    kitchen: <Star className="h-5 w-5" />,
    balcony: <Star className="h-5 w-5" />,
  };
  
  const handleGoBack = () => {
    navigate(-1);
  };
  
  const handleScrollToCalendar = () => {
    const element = document.getElementById('calendar');
    element?.scrollIntoView({ behavior: 'smooth' });
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onScrollToCalendar={handleScrollToCalendar} />
      
      <div className="pt-24">
        {/* Main content */}
        <div className="container mx-auto max-w-7xl px-4 py-8">
          <Button 
            variant="ghost" 
            onClick={handleGoBack} 
            className="mb-6 gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Apartments
          </Button>
          
          <AnimatedSection>
            <h1 className="mb-2 text-3xl font-bold md:text-4xl">{apartment.name}</h1>
            
            <div className="mb-6 flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Bed className="h-4 w-4" />
                <span>{apartment.bedrooms} bedroom{apartment.bedrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <Bath className="h-4 w-4" />
                <span>{apartment.bathrooms} bathroom{apartment.bathrooms !== 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center gap-1">
                <Users className="h-4 w-4" />
                <span>Up to {apartment.guests} guests</span>
              </div>
            </div>
          </AnimatedSection>
          
          {/* Gallery */}
          <AnimatedSection className="mb-10 h-[60vh] overflow-hidden rounded-xl">
            <ImageGallery images={apartment.images} className="h-full w-full" />
          </AnimatedSection>
          
          <div className="grid gap-8 md:grid-cols-3">
            <AnimatedSection className="md:col-span-2 space-y-8">
              {/* Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">About this space</h2>
                  <p className="text-muted-foreground leading-relaxed">{apartment.description}</p>
                </CardContent>
              </Card>
              
              {/* Amenities */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="mb-4 text-xl font-semibold">Amenities</h2>
                  <div className="grid grid-cols-2 gap-4">
                    {apartment.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-2">
                        {amenityIcons[amenity.toLowerCase()] || <Star className="h-5 w-5" />}
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
            
            {/* Booking Card */}
            <AnimatedSection className="md:sticky md:top-24 h-fit">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="mb-4 flex items-center justify-between">
                      <div className="text-2xl font-bold">${apartment.price}</div>
                      <div className="text-sm text-muted-foreground">per night</div>
                    </div>
                    
                    <div className="space-y-3">
                      <Button 
                        className="w-full gap-2"
                        onClick={handleScrollToCalendar}
                      >
                        Check Availability
                      </Button>
                      
                      <Button 
                        variant="outline" 
                        className="w-full gap-2"
                        onClick={() => window.open('https://airbnb.com', '_blank')}
                      >
                        Book on Airbnb
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default ApartmentDetail;
