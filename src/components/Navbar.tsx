import {useEffect, useState} from 'react';
import {Menu, X, ArrowUpRight} from 'lucide-react';
import {STUDIO_CONFIG} from '../config/studioConfig';
import {buildWhatsAppUrl} from '../utils/studioLogic';

interface NavbarProps {
  onBookNow: () => void;
}

const DESKTOP_LINKS = [
  {label: 'Home', href: '#home'},
  {label: 'About', href: '#about'},
  {label: 'Beauty', href: '#beauty'},
  {label: 'Tattoo', href: '#tattoo'},
  {label: 'Gallery', href: '#gallery'},
  {label: 'Reviews', href: '#reviews'},
  {label: 'Contact', href: '#contact'},
];

const MOBILE_LINKS = [
  {label: 'Home', href: '#home'},
  {label: 'About', href: '#about'},
  {label: 'Beauty Services', href: '#beauty'},
  {label: 'Tattoo Studio', href: '#tattoo'},
  {label: 'Gallery', href: '#gallery'},
  {label: 'Reviews', href: '#reviews'},
  {label: 'Contact', href: '#contact'},
];

export function Navbar({onBookNow}: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleMobileNavClick = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({behavior: 'smooth'});
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#F7F4EE]/92 backdrop-blur-md border-b border-[#141312]/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 h-14 lg:h-[72px] flex items-center justify-between gap-4 lg:gap-8">
          {/* Brand Zone */}
          <a
            href="#home"
            className="flex flex-col lg:block shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141312]"
          >
            <span className="font-serif text-xl lg:text-2xl font-semibold tracking-[0.14em] text-[#141312] whitespace-nowrap leading-none">
              {STUDIO_CONFIG.shortBrand}
            </span>
            <span className="lg:hidden text-[10px] tracking-[0.08em] uppercase text-[#5A544E] whitespace-nowrap mt-0.5 leading-none">
              {STUDIO_CONFIG.subBrand}
            </span>
          </a>

          {/* Desktop Nav Links Zone */}
          <nav
            aria-label="Primary navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-7 text-[13px] font-medium tracking-wide text-[#44403B]"
          >
            {DESKTOP_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative py-1 whitespace-nowrap shrink-0 hover:text-[#141312] transition-colors after:absolute after:left-0 after:bottom-0 after:h-px after:w-0 after:bg-[#141312] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#141312]"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Action Zone */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onBookNow}
              className="hidden sm:inline-flex items-center justify-center min-h-[40px] px-4 lg:px-5 py-2 text-[11px] lg:text-xs font-semibold tracking-[0.12em] uppercase bg-[#141312] text-[#F7F4EE] hover:bg-[#2A2826] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141312]"
            >
              Book Appointment
            </button>

            <button
              type="button"
              onClick={onBookNow}
              className="sm:hidden inline-flex items-center justify-center min-h-[44px] px-3 py-2 text-[11px] font-semibold tracking-[0.1em] uppercase text-[#141312] border border-[#141312]/25 hover:bg-[#EAE2D6]/60 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Book Now
            </button>

            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((prev) => !prev)}
              className="lg:hidden inline-flex items-center justify-center min-h-[44px] min-w-[44px] text-[#141312] hover:bg-[#EAE2D6]/60 transition-colors cursor-pointer"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden bg-[#0E0E10]/55 backdrop-blur-xs"
          onClick={() => setMenuOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation menu"
            className="ml-auto h-full w-full max-w-xs bg-[#F7F4EE] text-[#141312] flex flex-col justify-between p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#141312]/10">
                <div>
                  <p className="font-serif text-xl font-semibold tracking-[0.14em]">
                    {STUDIO_CONFIG.shortBrand}
                  </p>
                  <p className="text-[11px] text-[#5A544E] tracking-wide">
                    {STUDIO_CONFIG.subBrand}
                  </p>
                </div>
                <button
                  type="button"
                  aria-label="Close navigation menu"
                  onClick={() => setMenuOpen(false)}
                  className="min-h-[44px] min-w-[44px] inline-flex items-center justify-center text-[#141312] hover:bg-[#EAE2D6]/60 cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav aria-label="Mobile navigation" className="mt-6 flex flex-col gap-1">
                {MOBILE_LINKS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleMobileNavClick(item.href);
                    }}
                    className="min-h-[44px] flex items-center justify-between px-2 py-2.5 text-base font-medium text-[#141312] border-b border-[#141312]/8 hover:text-[#9E726B] transition-colors"
                  >
                    <span>{item.label}</span>
                    <ArrowUpRight className="h-4 w-4 opacity-40" aria-hidden="true" />
                  </a>
                ))}
              </nav>
            </div>

            <div className="pt-6 space-y-3 border-t border-[#141312]/10">
              <button
                type="button"
                onClick={() => {
                  setMenuOpen(false);
                  onBookNow();
                }}
                className="w-full min-h-[48px] bg-[#141312] text-[#F7F4EE] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#2A2826] transition-colors cursor-pointer"
              >
                Book Appointment
              </button>
              <a
                href={buildWhatsAppUrl(
                  STUDIO_CONFIG.whatsappNumber,
                  STUDIO_CONFIG.whatsappMessages.general,
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full min-h-[48px] flex items-center justify-center border border-[#141312]/25 text-[#141312] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#EAE2D6]/60 transition-colors"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
