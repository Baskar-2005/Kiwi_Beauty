import {useEffect, useState} from 'react';
import {Navbar} from './components/Navbar';
import {HeroSection} from './components/HeroSection';
import {AboutSection, BrandSplitSection} from './components/AboutAndSplit';
import {BeautyServicesSection} from './components/BeautyServicesSection';
import {
  TattooProcessSection,
  TattooStudioSection,
} from './components/TattooStudioSection';
import {GallerySection} from './components/GallerySection';
import {
  ReviewsSection,
  TransformationsSection,
} from './components/TransformationsAndReviews';
import {BookingSection} from './components/BookingSection';
import {ContactAndMapSection} from './components/ContactAndMapSection';
import {Footer, MobileStickyBar} from './components/MobileStickyBar';
import type {BookingServiceType} from './utils/studioLogic';

export default function App() {
  const [bookingType, setBookingType] =
    useState<BookingServiceType>('Consultation');
  const [bookingInterest, setBookingInterest] = useState<string>('');
  const [mapsQuotaExceeded, setMapsQuotaExceeded] = useState(false);

  useEffect(() => {
    const onQuotaExceeded = () => setMapsQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', onQuotaExceeded);
    return () =>
      window.removeEventListener('gmp-quota-exceeded', onQuotaExceeded);
  }, []);

  const navigateToBooking = (
    type: BookingServiceType,
    interest: string = '',
  ) => {
    setBookingType(type);
    setBookingInterest(interest);
    const el = document.getElementById('book');
    if (el) {
      el.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F4EE] text-[#141312] flex flex-col">
      {mapsQuotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      <Navbar onBookNow={() => navigateToBooking('Consultation')} />

      <main className="flex-1">
        <HeroSection
          onBookAppointment={() => navigateToBooking('Consultation')}
        />

        <AboutSection />

        <BeautyServicesSection
          onBookService={(serviceTitle) =>
            navigateToBooking('Beauty Service', serviceTitle)
          }
        />

        <TattooStudioSection
          onStartTattooEnquiry={(styleNote) =>
            navigateToBooking('Tattoo', styleNote)
          }
        />

        <BrandSplitSection
          onSelectBeauty={() => navigateToBooking('Beauty Service')}
          onSelectTattoo={() => navigateToBooking('Tattoo')}
        />

        <TattooProcessSection
          onStartTattooEnquiry={(styleNote) =>
            navigateToBooking('Tattoo', styleNote)
          }
        />

        <GallerySection />

        <TransformationsSection />

        <ReviewsSection />

        <BookingSection
          preselectedType={bookingType}
          preselectedInterest={bookingInterest}
        />

        <ContactAndMapSection />
      </main>

      <Footer />

      <MobileStickyBar
        onBookAppointment={() => navigateToBooking('Consultation')}
      />
    </div>
  );
}
