
import React, { useState, useEffect } from 'react';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { format, addMonths, isBefore, isAfter, isSameDay } from 'date-fns';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Info } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from '@/lib/utils';
import AnimatedSection from './AnimatedSection';

interface BookingDay {
  date: Date;
  status: 'available' | 'booked' | 'pending';
  apartment: number; // 1, 2, or 3
}

// Simulated booking data (would come from Airbnb API in a real implementation)
const generateMockBookings = (): BookingDay[] => {
  const today = new Date();
  const mockBookings: BookingDay[] = [];
  
  // Create 3 months of data
  for (let month = 0; month < 3; month++) {
    const currentMonth = addMonths(today, month);
    const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
    
    for (let day = 1; day <= daysInMonth; day++) {
      const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
      
      // Skip dates in the past
      if (isBefore(currentDate, today) && !isSameDay(currentDate, today)) continue;
      
      // For each apartment
      for (let apt = 1; apt <= 3; apt++) {
        // Randomize booking status (more availability than bookings)
        const randomNum = Math.random();
        let status: 'available' | 'booked' | 'pending';
        
        if (randomNum < 0.7) {
          status = 'available';
        } else if (randomNum < 0.9) {
          status = 'booked';
        } else {
          status = 'pending';
        }
        
        mockBookings.push({
          date: currentDate,
          status,
          apartment: apt
        });
      }
    }
  }
  
  return mockBookings;
};

interface CalendarProps {
  className?: string;
}

export const Calendar = ({ className }: CalendarProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [bookings, setBookings] = useState<BookingDay[]>([]);
  const [viewMonth, setViewMonth] = useState<Date>(new Date());
  const [selectedApartment, setSelectedApartment] = useState<number>(0); // 0 means all apartments
  
  useEffect(() => {
    // In a real app, this would fetch data from Airbnb API
    setBookings(generateMockBookings());
  }, []);
  
  const getDateAvailability = (date: Date, apartment: number) => {
    if (isBefore(date, new Date()) && !isSameDay(date, new Date())) {
      return 'past';
    }
    
    const dateBookings = bookings.filter(
      booking => 
        isSameDay(booking.date, date) && 
        (apartment === 0 || booking.apartment === apartment)
    );
    
    if (apartment === 0) {
      // Check if all apartments are available for "all apartments" view
      const allAvailable = dateBookings.length === 3 && dateBookings.every(b => b.status === 'available');
      const someAvailable = dateBookings.some(b => b.status === 'available');
      const allBooked = dateBookings.length === 3 && dateBookings.every(b => b.status === 'booked');
      
      if (allAvailable) return 'all-available';
      if (someAvailable) return 'some-available';
      if (allBooked) return 'all-booked';
      return 'mixed';
    } else {
      // Single apartment view
      const aptBooking = dateBookings[0];
      return aptBooking ? aptBooking.status : 'unknown';
    }
  };
  
  const handleDayClick = (date: Date) => {
    setSelectedDate(date);
  };
  
  const nextMonth = () => {
    setViewMonth(addMonths(viewMonth, 1));
  };
  
  const prevMonth = () => {
    const newMonth = addMonths(viewMonth, -1);
    if (!isBefore(newMonth, new Date())) {
      setViewMonth(newMonth);
    }
  };
  
  const getDayClass = (date: Date) => {
    const availability = getDateAvailability(date, selectedApartment);
    
    switch (availability) {
      case 'available': 
        return 'bg-green-100 text-green-900 hover:bg-green-200';
      case 'all-available': 
        return 'bg-green-100 text-green-900 hover:bg-green-200';
      case 'some-available': 
        return 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200';
      case 'booked': 
        return 'bg-red-100 text-red-900 hover:bg-red-200';
      case 'all-booked': 
        return 'bg-red-100 text-red-900 hover:bg-red-200';
      case 'pending': 
        return 'bg-blue-100 text-blue-900 hover:bg-blue-200';
      case 'past': 
        return 'bg-gray-100 text-gray-400 opacity-50';
      default: 
        return 'bg-gray-50';
    }
  };
  
  return (
    <AnimatedSection className={cn('mx-auto max-w-xl p-4', className)}>
      <div className="mb-6 flex flex-col space-y-2">
        <h2 className="text-2xl font-bold">Check Availability</h2>
        <p className="text-muted-foreground">Select dates to see availability across all apartments</p>
      </div>
      
      <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
        <div className="flex space-x-1">
          <Button 
            variant="outline" 
            size="sm" 
            className={cn('transition-all', selectedApartment === 0 && 'bg-primary text-primary-foreground')}
            onClick={() => setSelectedApartment(0)}
          >
            All
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn('transition-all', selectedApartment === 1 && 'bg-primary text-primary-foreground')}
            onClick={() => setSelectedApartment(1)}
          >
            Apt 1
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn('transition-all', selectedApartment === 2 && 'bg-primary text-primary-foreground')}
            onClick={() => setSelectedApartment(2)}
          >
            Apt 2
          </Button>
          <Button 
            variant="outline" 
            size="sm" 
            className={cn('transition-all', selectedApartment === 3 && 'bg-primary text-primary-foreground')}
            onClick={() => setSelectedApartment(3)}
          >
            Apt 3
          </Button>
        </div>
        
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={prevMonth} disabled={isBefore(addMonths(viewMonth, -1), new Date())}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="mx-2 min-w-32 text-center font-medium">
            {format(viewMonth, 'MMMM yyyy')}
          </span>
          <Button variant="ghost" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div className="rounded-lg border bg-white p-3 shadow-sm">
        <CalendarComponent
          mode="single"
          selected={selectedDate}
          onSelect={handleDayClick}
          month={viewMonth}
          onMonthChange={setViewMonth}
          className="pointer-events-auto"
          modifiers={{
            booked: (date) => getDateAvailability(date, selectedApartment) === 'booked' || 
                              getDateAvailability(date, selectedApartment) === 'all-booked',
            available: (date) => getDateAvailability(date, selectedApartment) === 'available' || 
                                getDateAvailability(date, selectedApartment) === 'all-available',
            someAvailable: (date) => getDateAvailability(date, selectedApartment) === 'some-available',
            pending: (date) => getDateAvailability(date, selectedApartment) === 'pending',
          }}
          modifiersClassNames={{
            booked: 'bg-red-100 text-red-900 hover:bg-red-200',
            available: 'bg-green-100 text-green-900 hover:bg-green-200',
            someAvailable: 'bg-yellow-100 text-yellow-900 hover:bg-yellow-200',
            pending: 'bg-blue-100 text-blue-900 hover:bg-blue-200',
          }}
        />
      </div>
      
      <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-sm">
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-green-100 ring-1 ring-green-400"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-yellow-100 ring-1 ring-yellow-400"></div>
          <span>Partially Available</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-100 ring-1 ring-red-400"></div>
          <span>Booked</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="h-3 w-3 rounded-full bg-blue-100 ring-1 ring-blue-400"></div>
          <span>Pending</span>
        </div>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-1 h-7 w-7">
              <Info className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-4 text-sm" align="end">
            <div className="space-y-2">
              <p className="font-medium">About This Calendar</p>
              <p className="text-muted-foreground">
                This calendar shows the availability of our three apartments. In a real
                implementation, this would sync with Airbnb's availability API.
              </p>
              <p className="text-muted-foreground">
                Click on a date to see detailed availability information for each apartment.
              </p>
            </div>
          </PopoverContent>
        </Popover>
      </div>
      
      {selectedDate && (
        <div className="mt-6 rounded-lg border bg-white p-4 shadow-sm">
          <h3 className="mb-3 font-medium">
            Availability for {format(selectedDate, 'MMMM d, yyyy')}
          </h3>
          
          <div className="space-y-2">
            {[1, 2, 3].map(apt => {
              const aptBookings = bookings.filter(
                b => isSameDay(b.date, selectedDate) && b.apartment === apt
              );
              const status = aptBookings.length > 0 ? aptBookings[0].status : 'unknown';
              
              return (
                <div key={apt} className="flex justify-between rounded-md border p-3">
                  <span className="font-medium">Apartment {apt}</span>
                  <span className={cn(
                    'px-2 py-0.5 rounded-full text-xs font-medium',
                    status === 'available' && 'bg-green-100 text-green-700',
                    status === 'booked' && 'bg-red-100 text-red-700',
                    status === 'pending' && 'bg-blue-100 text-blue-700',
                  )}>
                    {status.charAt(0).toUpperCase() + status.slice(1)}
                  </span>
                </div>
              );
            })}
          </div>
          
          <div className="mt-4">
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.open('https://airbnb.com', '_blank')}
            >
              Book on Airbnb
            </Button>
          </div>
        </div>
      )}
    </AnimatedSection>
  );
};

export default Calendar;
