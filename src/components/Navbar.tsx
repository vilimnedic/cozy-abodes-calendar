
import React, { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { Menu, X, Calendar, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface NavbarProps {
  onScrollToCalendar: () => void;
}

export const Navbar = ({ onScrollToCalendar }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <header
      className={cn(
        'fixed left-0 right-0 top-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container flex max-w-7xl items-center justify-between px-4">
        <a href="#" className="text-2xl font-bold tracking-tight">
          CozyStay
        </a>
        
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            <li>
              <a href="#about" className="font-medium text-gray-700 hover:text-gray-900">
                About
              </a>
            </li>
            <li>
              <a href="#apartments" className="font-medium text-gray-700 hover:text-gray-900">
                Apartments
              </a>
            </li>
            <li>
              <a href="#amenities" className="font-medium text-gray-700 hover:text-gray-900">
                Amenities
              </a>
            </li>
            <li>
              <a href="#contact" className="font-medium text-gray-700 hover:text-gray-900">
                Contact
              </a>
            </li>
          </ul>
        </nav>
        
        <div className="hidden md:flex md:items-center md:space-x-4">
          <Button variant="outline" size="sm" onClick={onScrollToCalendar} className="bg-white text-black hover:bg-transparent hover:text-white border-white transition-colors">
            <Calendar className="h-4 w-4" />
            <span>Availability</span>
          </Button>
              
          <Button size="sm" onClick={() => window.open('https://airbnb.com', '_blank')}>
            Book Now
          </Button>
        </div>
        
        <button 
          className="rounded-md p-2 text-gray-700 md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={cn(
          'absolute inset-x-0 top-full flex flex-col bg-white px-4 py-4 shadow-lg md:hidden',
          isOpen ? 'opacity-100' : 'pointer-events-none opacity-0',
          'transition-all duration-300 ease-in-out'
        )}
      >
        <a 
          href="#about" 
          className="border-b border-gray-100 py-3 font-medium"
          onClick={() => setIsOpen(false)}
        >
          About
        </a>
        <a 
          href="#apartments" 
          className="border-b border-gray-100 py-3 font-medium"
          onClick={() => setIsOpen(false)}
        >
          Apartments
        </a>
        <a 
          href="#amenities" 
          className="border-b border-gray-100 py-3 font-medium"
          onClick={() => setIsOpen(false)}
        >
          Amenities
        </a>
        <a 
          href="#contact" 
          className="border-b border-gray-100 py-3 font-medium"
          onClick={() => setIsOpen(false)}
        >
          Contact
        </a>
        
        <div className="mt-4 flex flex-col space-y-2">
          <Button variant="outline" size="sm" onClick={() => {
            onScrollToCalendar();
            setIsOpen(false);
          }} className="w-full justify-center gap-1.5">
            <Calendar className="h-4 w-4" />
            <span>Check Availability</span>
          </Button>
          
          <Button size="sm" onClick={() => window.open('https://airbnb.com', '_blank')} className="w-full justify-center">
            Book Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
