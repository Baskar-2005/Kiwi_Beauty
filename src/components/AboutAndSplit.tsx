import {motion} from 'motion/react';
import {ArrowRight} from 'lucide-react';
import {StudioImage} from './StudioImage';

const STUDIO_PILLARS = [
  'Personal Attention',
  'Creative Styling',
  'Modern Beauty Care',
  'Tattoo Artistry',
  'Comfortable Experience',
];

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 sm:py-20 lg:py-24 bg-[#F7F4EE] border-t border-[#141312]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <motion.div
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.5}}
            className="lg:col-span-6"
          >
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7B6B5B]">
              About The Studio
            </p>
            <h2 className="mt-3 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141312] leading-tight">
              More Than A Beauty Studio.
            </h2>
            <p className="mt-5 text-base sm:text-lg text-[#4C4640] leading-relaxed max-w-xl">
              Kiwi Beauty Care &amp; Tattoo Studio brings beauty, creativity and
              self-expression together under one roof.
            </p>
            <p className="mt-4 text-sm sm:text-base text-[#5A544E] leading-relaxed max-w-xl">
              Whether you are stepping in for calm hair and skin care, event
              styling, or a custom tattoo crafted from a personal story, every
              appointment is paced around your comfort and taste.
            </p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 pt-6 border-t border-[#141312]/10">
              {STUDIO_PILLARS.map((item, idx) => (
                <div
                  key={item}
                  className="flex items-center gap-3 text-sm font-medium text-[#141312]"
                >
                  <span className="text-[11px] tabular-nums text-[#8B7355]">
                    0{idx + 1}
                  </span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{opacity: 0, y: 16}}
            whileInView={{opacity: 1, y: 0}}
            viewport={{once: true, margin: '-80px'}}
            transition={{duration: 0.55, delay: 0.08}}
            className="lg:col-span-6"
          >
            <div className="relative aspect-[16/11] rounded-2xl overflow-hidden bg-[#EAE2D6]">
              <StudioImage
                src="/src/assets/images/studio_interior_editorial_1795009107946.jpg"
                alt="Inside Kiwi Beauty Care and Tattoo Studio featuring warm beauty stations and dark tattoo space"
                title="Kiwi Studio Space"
                className="w-full h-full"
                imgClassName="hover:scale-[1.03]"
              />
            </div>
            <p className="mt-3 text-xs text-[#6B645D] flex items-center justify-between">
              <span>Meelaveethi, Kachithotty, Chidambaram</span>
              <span>Beauty Lounge · Tattoo Space</span>
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface BrandSplitSectionProps {
  onSelectBeauty: () => void;
  onSelectTattoo: () => void;
}

export function BrandSplitSection({
  onSelectBeauty,
  onSelectTattoo,
}: BrandSplitSectionProps) {
  return (
    <section
      aria-label="Beauty and Tattoo Brand Philosophy"
      className="grid grid-cols-1 md:grid-cols-2"
    >
      {/* Left: Feel Beautiful */}
      <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] bg-[#EAE2D6] overflow-hidden group">
        <StudioImage
          src="/src/assets/images/beauty_hair_skin_1795009107257.jpg"
          alt="Luxury beauty care and hair styling experience"
          title="Feel Beautiful"
          className="absolute inset-0 w-full h-full"
          imgClassName="group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#141312]/80 via-[#141312]/25 to-transparent" />
        <div className="relative z-10 h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 text-[#F7F4EE]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#EAE2D6]/90">
            Beauty &amp; Self-Care
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl">
            Feel Beautiful.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#F7F4EE]/85 max-w-md">
            Thoughtful hair, skin, makeup, and grooming rituals tailored to
            bring out your natural confidence.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={onSelectBeauty}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#F7F4EE] text-[#141312] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#EAE2D6] transition-colors cursor-pointer"
            >
              <span>Book Beauty Service</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Express Yourself */}
      <div className="relative min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] bg-[#0E0E10] overflow-hidden group">
        <StudioImage
          src="/src/assets/images/tattoo_fine_line_1795009106979.jpg"
          alt="Custom fine-line tattoo art on forearm"
          title="Express Yourself"
          darkFallback
          className="absolute inset-0 w-full h-full"
          imgClassName="group-hover:scale-[1.04]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E10]/85 via-[#0E0E10]/30 to-transparent" />
        <div className="relative z-10 h-full min-h-[420px] sm:min-h-[500px] lg:min-h-[560px] flex flex-col justify-end p-6 sm:p-10 lg:p-14 text-[#F7F4EE]">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#C6A46C]">
            Ink &amp; Identity
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl lg:text-5xl">
            Express Yourself.
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#F7F4EE]/85 max-w-md">
            Minimal marks, botanical details, and custom tattoo compositions
            crafted with care and precision.
          </p>
          <div className="mt-5">
            <button
              type="button"
              onClick={onSelectTattoo}
              className="inline-flex items-center gap-2 min-h-[44px] px-5 py-2.5 border border-[#F7F4EE]/45 text-[#F7F4EE] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#F7F4EE] hover:text-[#141312] transition-colors cursor-pointer"
            >
              <span>Start Tattoo Enquiry</span>
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
