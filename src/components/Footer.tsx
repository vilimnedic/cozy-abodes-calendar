
import React from 'react';
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import AnimatedSection from './AnimatedSection';

export const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16" id="contact">
      <div className="container mx-auto max-w-7xl px-4">
        <div className="grid gap-10 pb-16 md:grid-cols-2 lg:grid-cols-4">
          <AnimatedSection className="space-y-4" delay={0}>
            <h3 className="text-xl font-bold">CozyStay</h3>
            <p className="text-muted-foreground">
              Luxury apartments in the heart of the city, designed for comfort and elegance.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full hover:bg-black/5">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </AnimatedSection>
          
          <AnimatedSection className="space-y-4" delay={100}>
            <h3 className="text-lg font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gray-500" />
                <span>123 Main Street, Cityville</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-gray-500" />
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-gray-500" />
                <span>info@cozystay.com</span>
              </li>
            </ul>
          </AnimatedSection>
          
          <AnimatedSection className="space-y-4" delay={200}>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li>
                <a href="#" className="hover:text-gray-900 hover:underline">Home</a>
              </li>
              <li>
                <a href="#about" className="hover:text-gray-900 hover:underline">About</a>
              </li>
              <li>
                <a href="#apartments" className="hover:text-gray-900 hover:underline">Apartments</a>
              </li>
              <li>
                <a href="#amenities" className="hover:text-gray-900 hover:underline">Amenities</a>
              </li>
              <li>
                <a href="https://airbnb.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 hover:underline">Book on Airbnb</a>
              </li>
            </ul>
          </AnimatedSection>
          
          <AnimatedSection className="space-y-4" delay={300}>
            <h3 className="text-lg font-semibold">Newsletter</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter for updates and special offers.
            </p>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="rounded-md border border-gray-300 bg-white px-3 py-2 focus:border-gray-500 focus:outline-none"
              />
              <Button>Subscribe</Button>
            </div>
          </AnimatedSection>
        </div>
        
        <div className="border-t border-gray-200 py-6 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} CozyStay. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
