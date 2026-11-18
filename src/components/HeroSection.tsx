import {motion} from 'motion/react';
import {ArrowRight} from 'lucide-react';
import {HERO_MEDIA, TRUST_PILLARS} from '../data/studioData';
import {STUDIO_CONFIG} from '../config/studioConfig';
import {StudioImage} from './StudioImage';

interface HeroSectionProps {
  onBookAppointment: () => void;
}

export function HeroSection({onBookAppointment}: HeroSectionProps) {
  return (
    <section id="home" className="relative bg-[#F7F4EE] overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10 pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Editorial Column */}
          <motion.div
            initial={{opacity: 0, y: 16}}
            animate={{opacity: 1, y: 0}}
            transition={{duration: 0.55, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-6 flex flex-col justify-center"
          >
            <p className="text-[11px] sm:text-xs font-medium tracking-[0.22em] uppercase text-[#7B6B5B]">
              BEAUTY <span aria-hidden="true">·</span> ART{' '}
              <span aria-hidden="true">·</span> SELF EXPRESSION
            </p>

            <h1 className="mt-4 sm:mt-5 font-serif text-[2.45rem] sm:text-5xl lg:text-[3.75rem] leading-[1.06] tracking-[-0.015em] text-[#141312]">
              Beauty That Defines You.
              <span className="block mt-1.5 italic font-normal text-[#4B433C]">
                Art That Stays With You.
              </span>
            </h1>

            <p className="mt-5 sm:mt-6 text-base sm:text-lg leading-relaxed text-[#4C4640] max-w-xl">
              Premium beauty care and creative tattoo artistry in{' '}
              {STUDIO_CONFIG.city} — designed around your style.
            </p>

            <div className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                type="button"
                onClick={onBookAppointment}
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 bg-[#141312] text-[#F7F4EE] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#2A2826] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141312]"
              >
                <span>Book Appointment</span>
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </button>

              <a
                href="#tattoo"
                className="inline-flex items-center justify-center min-h-[48px] px-7 py-3.5 border border-[#141312]/30 text-[#141312] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#EAE2D6]/70 transition-colors whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141312]"
              >
                Explore Tattoos
              </a>
            </div>

            <div className="mt-8 pt-6 border-t border-[#141312]/10 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#5A544E]">
              <span>Meelaveethi, Kachithotty</span>
              <span aria-hidden="true">·</span>
              <span>Chidambaram</span>
              <span aria-hidden="true">·</span>
              <span className="tabular-nums">{STUDIO_CONFIG.openingHours}</span>
            </div>
          </motion.div>

          {/* Right Split Editorial Composition */}
          <motion.div
            initial={{opacity: 0, scale: 0.985}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.65, ease: [0.16, 1, 0.3, 1]}}
            className="lg:col-span-6 grid grid-cols-12 gap-3 sm:gap-4 min-h-[380px] sm:min-h-[460px] lg:min-h-[540px]"
          >
            {/* Primary Beauty & Salon Column */}
            <div className="col-span-7 flex flex-col gap-3 sm:gap-4">
              <div className="relative flex-1 min-h-[250px] sm:min-h-[320px] rounded-xl overflow-hidden bg-[#EAE2D6]">
                <StudioImage
                  src={HERO_MEDIA.beautyPortrait.src}
                  alt={HERO_MEDIA.beautyPortrait.alt}
                  title="Beauty Care"
                  eager
                  className="w-full h-full"
                  imgClassName="hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E10]/70 via-[#0E0E10]/10 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#F7F4EE]/85">
                    Beauty Care
                  </p>
                  <p className="font-serif text-base sm:text-lg text-[#F7F4EE]">
                    Skin, Hair &amp; Styling
                  </p>
                </div>
              </div>

              <div className="relative h-28 sm:h-36 rounded-xl overflow-hidden bg-[#EAE2D6]">
                <StudioImage
                  src={HERO_MEDIA.salonTreatment.src}
                  alt={HERO_MEDIA.salonTreatment.alt}
                  title="Salon Rituals"
                  eager
                  className="w-full h-full"
                  imgClassName="hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E10]/45 via-transparent to-transparent" />
              </div>
            </div>

            {/* Tattoo Craft Column */}
            <div className="col-span-5 flex flex-col gap-3 sm:gap-4 pt-4 sm:pt-8">
              <div className="relative h-28 sm:h-36 rounded-xl overflow-hidden bg-[#171618]">
                <StudioImage
                  src={HERO_MEDIA.fineLineTattoo.src}
                  alt={HERO_MEDIA.fineLineTattoo.alt}
                  title="Fine-Line Ink"
                  eager
                  darkFallback
                  className="w-full h-full"
                  imgClassName="hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E10]/55 via-transparent to-transparent" />
              </div>

              <div className="relative flex-1 min-h-[220px] sm:min-h-[290px] rounded-xl overflow-hidden bg-[#171618]">
                <StudioImage
                  src={HERO_MEDIA.tattooArtistry.src}
                  alt={HERO_MEDIA.tattooArtistry.alt}
                  title="Tattoo Studio"
                  eager
                  darkFallback
                  className="w-full h-full"
                  imgClassName="hover:scale-[1.03]"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E10]/80 via-[#0E0E10]/15 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 sm:bottom-4 sm:left-4">
                  <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.16em] text-[#C6A46C]">
                    Tattoo Studio
                  </p>
                  <p className="font-serif text-base sm:text-lg text-[#F7F4EE]">
                    Precision &amp; Custom Ink
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Full-Width 4-Card Trust Strip Below Hero */}
        <div className="mt-10 sm:mt-14 pt-8 border-t border-[#141312]/10 grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5">
          {TRUST_PILLARS.map((pillar, index) => (
            <div
              key={pillar.id}
              className="p-4 sm:p-5 bg-[#EFE9DF]/70 border border-[#141312]/10 rounded-xl"
            >
              <span className="block text-[11px] font-medium tabular-nums tracking-[0.16em] text-[#7B6B5B]">
                0{index + 1}
              </span>
              <h2 className="mt-1.5 font-sans text-xs sm:text-sm font-semibold tracking-[0.1em] uppercase text-[#141312]">
                {pillar.title}
              </h2>
              <p className="mt-1 text-xs sm:text-sm text-[#5A544E] leading-snug">
                {pillar.subtitle}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
