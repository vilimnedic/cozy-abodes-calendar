import React, { useRef, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import ApartmentCard from '@/components/ApartmentCard';
import Calendar from '@/components/Calendar';
import Footer from '@/components/Footer';
import AnimatedSection from '@/components/AnimatedSection';
import { Wifi, Tv, Utensils, Car, Lock, Wind } from 'lucide-react';

// Apartment data - exported for use in other components
export const apartments = [
  {
    id: 1,
    name: 'Luxury Urban Suite',
    description: 'A modern, spacious apartment with stunning city views, perfect for couples or business travelers. Featuring contemporary design and all the amenities you need for a comfortable stay.',
    price: 129,
    bedrooms: 1,
    bathrooms: 1,
    guests: 2,
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1564078516393-cf04bd966897?auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: ['WiFi', 'TV', 'King Bed', 'Air Conditioning']
  },
  {
    id: 2,
    name: 'Family Comfort Haven',
    description: 'Spacious and thoughtfully designed apartment ideal for families. This cozy retreat features two bedrooms, a fully-equipped kitchen, and a comfortable living space perfect for relaxing after exploring the city.',
    price: 189,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    images: [
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1617098474202-5c7f9760c422?auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: ['WiFi', 'TV', 'Queen Bed', 'Kitchen']
  },
  {
    id: 3,
    name: 'Executive Penthouse',
    description: 'Experience luxury living in our stunning penthouse apartment. With panoramic city views, premium finishes, and expansive living spaces, this upscale accommodation is perfect for those seeking an extraordinary stay.',
    price: 259,
    bedrooms: 2,
    bathrooms: 2,
    guests: 4,
    images: [
      'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=2074&q=80',
      'https://images.unsplash.com/photo-1628624747186-a941c476b7ef?auto=format&fit=crop&w=2070&q=80',
      'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=2070&q=80'
    ],
    amenities: ['WiFi', 'TV', 'King Bed', 'Balcony']
  }
];

// Building amenities data
const buildingAmenities = [
  {
    icon: <Wifi className="h-6 w-6" />,
    title: 'High-Speed WiFi',
    description: 'Stay connected with complimentary high-speed internet throughout the property.'
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: 'Secure Access',
    description: 'Enjoy peace of mind with our modern secure entry system and 24/7 monitored security.'
  },
  {
    icon: <Car className="h-6 w-6" />,
    title: 'Free Parking',
    description: 'Convenient free parking available for all guests during their stay.'
  },
  {
    icon: <Wind className="h-6 w-6" />,
    title: 'Air Conditioning',
    description: 'Climate-controlled environments in all apartments for year-round comfort.'
  },
  {
    icon: <Utensils className="h-6 w-6" />,
    title: 'Fully Equipped Kitchen',
    description: 'Modern kitchens with high-end appliances, perfect for preparing home-cooked meals.'
  },
  {
    icon: <Tv className="h-6 w-6" />,
    title: 'Smart Entertainment',
    description: 'Smart TVs with streaming services and high-quality sound systems.'
  }
];

const Index = () => {
  const apartmentsRef = useRef<HTMLDivElement>(null);
  const calendarRef = useRef<HTMLDivElement>(null);
  
  const scrollToApartments = () => {
    apartmentsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToCalendar = () => {
    calendarRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  // Lazy load images
  useEffect(() => {
    const loadImage = (url: string) => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = () => resolve(url);
        img.onerror = reject;
      });
    };
    
    // Preload all apartment images
    const imageUrls = apartments.flatMap(apt => apt.images);
    
    imageUrls.forEach(url => {
      loadImage(url).catch(err => console.error('Failed to preload image:', url, err));
    });
  }, []);
  
  return (
    <div className="overflow-x-hidden">
      <Navbar onScrollToCalendar={scrollToCalendar} />
      
      <Hero onScrollToApartments={scrollToApartments} />
      
      {/* About Section */}
      <section className="bg-white py-24" id="about">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <AnimatedSection className="order-2 md:order-1">
              <div className="relative h-96 overflow-hidden rounded-lg shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1501183638710-841dd1904471?auto=format&fit=crop&w=2070&q=80" 
                  alt="Building exterior" 
                  className="h-full w-full object-cover"
                />
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="order-1 space-y-6 md:order-2" direction="left">
              <div className="inline-block rounded-full bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
                About Our Property
              </div>
              
              <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
                Contemporary Living in a Historic Setting
              </h2>
              
              <p className="text-lg text-muted-foreground">
                Our beautifully renovated property combines modern luxury with historic charm. Located in the heart of downtown, you'll be steps away from restaurants, shopping, and cultural attractions.
              </p>
              
              <p className="text-lg text-muted-foreground">
                Each apartment is thoughtfully designed with high-end finishes, comfortable furnishings, and all the amenities you need for a memorable stay—whether you're visiting for a weekend getaway or an extended stay.
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
      
      {/* Apartments Section */}
      <section className="bg-gray-50 py-24" id="apartments" ref={apartmentsRef}>
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedSection className="mb-12 text-center">
            <div className="mx-auto mb-2 inline-block rounded-full bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Our Apartments
            </div>
            
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Find Your Perfect Stay
            </h2>
            
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Choose from our selection of beautifully designed apartments, each offering unique features and amenities.
            </p>
          </AnimatedSection>
          
          <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {apartments.map((apartment, index) => (
              <ApartmentCard
                key={apartment.id}
                {...apartment}
                delay={index * 100}
                onViewCalendar={scrollToCalendar}
              />
            ))}
          </div>
        </div>
      </section>
      
      {/* Amenities Section */}
      <section className="bg-white py-24" id="amenities">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedSection className="mb-12 text-center">
            <div className="mx-auto mb-2 inline-block rounded-full bg-primary/5 px-3 py-1 text-xs font-medium uppercase tracking-wider text-primary">
              Property Features
            </div>
            
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Premium Amenities
            </h2>
            
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Enjoy these premium amenities designed to enhance your comfort and convenience.
            </p>
          </AnimatedSection>
          
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {buildingAmenities.map((amenity, index) => (
              <AnimatedSection 
                key={index} 
                className="rounded-xl border bg-white p-6 shadow-sm transition-all hover:shadow-md"
                delay={index * 100}
              >
                <div className="mb-4 rounded-full bg-primary/5 p-3 inline-flex">
                  {amenity.icon}
                </div>
                <h3 className="mb-2 text-xl font-semibold">{amenity.title}</h3>
                <p className="text-muted-foreground">{amenity.description}</p>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
      
      {/* Calendar Section */}
      <section className="bg-gray-50 py-24" id="calendar" ref={calendarRef}>
        <Calendar />
      </section>
      
      {/* Map Section */}
      <section className="py-16">
        <div className="container mx-auto max-w-7xl px-4">
          <AnimatedSection className="mb-8 text-center">
            <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Our Location
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Perfectly situated in the heart of the city, close to major attractions.
            </p>
          </AnimatedSection>
          
          <AnimatedSection className="overflow-hidden rounded-xl border shadow-lg">
            <div className="aspect-video w-full">
              <iframe
                width="100%"
                height="100%"
                frameBorder="0"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2624.1614307792253!2d2.2944813999999997!3d48.8740711!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e6701f7e8337b5%3A0xa2cb58dd28914524!2sArc%20de%20Triomphe!5e0!3m2!1sen!2sus!4v1718822522399!5m2!1sen!2sus"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Property Location"
              ></iframe>
            </div>
          </AnimatedSection>
        </div>
      </section>
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
