import {Calendar, MessageCircle} from 'lucide-react';
import {STUDIO_CONFIG} from '../config/studioConfig';
import {buildWhatsAppUrl} from '../utils/studioLogic';

interface MobileStickyBarProps {
  onBookAppointment: () => void;
}

export function MobileStickyBar({onBookAppointment}: MobileStickyBarProps) {
  return (
    <>
      {/* Fixed Bottom Mobile Action Bar (Compact <= 56px to respect 15% sticky budget) */}
      <div
        role="region"
        aria-label="Quick studio booking actions"
        className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-[#0E0E10]/95 backdrop-blur-md border-t border-[#F7F4EE]/15 px-3 py-2"
      >
        <div className="grid grid-cols-2 gap-2.5 max-w-lg mx-auto">
          <button
            type="button"
            onClick={onBookAppointment}
            className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-[#F7F4EE] text-[#0E0E10] text-[11px] font-semibold tracking-[0.1em] uppercase rounded-md whitespace-nowrap cursor-pointer"
          >
            <Calendar className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            <span>Book Appointment</span>
          </button>

          <a
            href={buildWhatsAppUrl(
              STUDIO_CONFIG.whatsappNumber,
              STUDIO_CONFIG.whatsappMessages.general,
            )}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-3 py-2 border border-[#F7F4EE]/30 text-[#F7F4EE] text-[11px] font-semibold tracking-[0.1em] uppercase rounded-md whitespace-nowrap"
          >
            <MessageCircle
              className="h-3.5 w-3.5 shrink-0 text-[#C6A46C]"
              aria-hidden="true"
            />
            <span>WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Desktop Floating WhatsApp Conversion Channel */}
      <a
        href={buildWhatsAppUrl(
          STUDIO_CONFIG.whatsappNumber,
          STUDIO_CONFIG.whatsappMessages.general,
        )}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Kiwi Beauty Care & Tattoo Studio"
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2.5 min-h-[46px] px-5 py-2.5 bg-[#0E0E10] text-[#F7F4EE] border border-[#C6A46C]/45 rounded-full shadow-lg hover:bg-[#1E1D20] transition-colors text-xs font-semibold tracking-[0.1em] uppercase"
      >
        <MessageCircle className="h-4 w-4 text-[#C6A46C]" aria-hidden="true" />
        <span>WhatsApp</span>
      </a>
    </>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#0E0E10] text-[#D0C9BF] border-t border-[#F7F4EE]/10 pb-20 md:pb-0">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 py-12 sm:py-14">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-8 border-b border-[#F7F4EE]/10">
          <div>
            <p className="font-serif text-2xl tracking-[0.12em] text-[#F7F4EE]">
              {STUDIO_CONFIG.brandName}
            </p>
            <p className="mt-1.5 text-sm text-[#A8A199]">
              {STUDIO_CONFIG.fullAddress} ·{' '}
              <span className="tabular-nums">{STUDIO_CONFIG.openingHours}</span>
            </p>
          </div>

          <nav
            aria-label="Footer navigation"
            className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs uppercase tracking-[0.12em]"
          >
            <a href="#about" className="hover:text-[#F7F4EE] transition-colors">
              About
            </a>
            <a href="#beauty" className="hover:text-[#F7F4EE] transition-colors">
              Beauty
            </a>
            <a href="#tattoo" className="hover:text-[#F7F4EE] transition-colors">
              Tattoo
            </a>
            <a href="#gallery" className="hover:text-[#F7F4EE] transition-colors">
              Gallery
            </a>
            <a href="#book" className="hover:text-[#F7F4EE] transition-colors">
              Book
            </a>
            <a href="#contact" className="hover:text-[#F7F4EE] transition-colors">
              Contact
            </a>
          </nav>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#8D867E] md:pr-44">
          <p>
            © {year} {STUDIO_CONFIG.brandName}. All rights reserved.
          </p>
          <p>Chidambaram, Tamil Nadu</p>
        </div>
      </div>
    </footer>
  );
}
