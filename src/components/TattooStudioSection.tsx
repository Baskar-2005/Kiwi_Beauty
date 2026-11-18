import {useState} from 'react';
import {motion} from 'motion/react';
import {ArrowDown, ArrowRight, MessageCircle} from 'lucide-react';
import {
  TATTOO_PROCESS_STEPS,
  TATTOO_WORKS,
  type TattooCategory,
} from '../data/studioData';
import {STUDIO_CONFIG} from '../config/studioConfig';
import {
  buildWhatsAppUrl,
  filterTattooWorks,
  getAvailableTattooCategories,
} from '../utils/studioLogic';
import {StudioImage} from './StudioImage';

interface TattooStudioSectionProps {
  onStartTattooEnquiry: (styleNote?: string) => void;
}

export function TattooStudioSection({
  onStartTattooEnquiry,
}: TattooStudioSectionProps) {
  const categories = getAvailableTattooCategories(TATTOO_WORKS);
  const [selectedCategory, setSelectedCategory] = useState<'All' | TattooCategory>('All');

  const visibleWorks = filterTattooWorks(TATTOO_WORKS, selectedCategory);

  return (
    <section
      id="tattoo"
      className="bg-[#0E0E10] text-[#F7F4EE] py-16 sm:py-20 lg:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Header & Category Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C6A46C]">
              Tattoo Studio
            </p>
            <h2 className="mt-3 font-sans text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-[-0.02em] text-[#F7F4EE]">
              Your Story. Your Ink.
            </h2>
            <p className="mt-4 text-base sm:text-lg text-[#D0C9BF] leading-relaxed">
              From minimal designs to meaningful custom artwork, turn your idea
              into something personal.
            </p>
          </div>

          <div
            role="tablist"
            aria-label="Filter tattoo styles"
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#171618] border border-[#F7F4EE]/12 rounded-lg self-start lg:self-auto"
          >
            {categories.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setSelectedCategory(category)}
                  className={`min-h-[40px] px-3.5 py-2 text-xs font-medium tracking-wide rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    active
                      ? 'bg-[#F7F4EE] text-[#0E0E10]'
                      : 'text-[#C8C1B8] hover:text-[#F7F4EE]'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tattoo Gallery Grid */}
        <div className="mt-10 sm:mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {visibleWorks.map((work, index) => (
            <motion.article
              key={work.id}
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-50px'}}
              transition={{duration: 0.45, delay: index * 0.05}}
              className="group flex flex-col bg-[#171618] border border-[#F7F4EE]/10 rounded-xl overflow-hidden"
            >
              <div className="aspect-[3/4] w-full bg-[#1C1B1E]">
                <StudioImage
                  src={work.image}
                  alt={work.alt}
                  title={work.title}
                  darkFallback
                  className="w-full h-full"
                  imgClassName="group-hover:scale-[1.06]"
                />
              </div>

              <div className="flex flex-col flex-1 justify-between p-5 sm:p-6">
                <div>
                  <div className="flex items-center gap-2 text-[11px] tracking-[0.12em] uppercase text-[#C6A46C] whitespace-nowrap overflow-hidden">
                    <span className="shrink-0">{work.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-[#A8A199] truncate">{work.placement}</span>
                  </div>
                  <h3 className="mt-2 font-sans text-lg font-semibold text-[#F7F4EE]">
                    {work.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#BDB6AC] leading-relaxed">
                    {work.description}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onStartTattooEnquiry(work.title)}
                  className="mt-5 w-full min-h-[44px] inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase border border-[#F7F4EE]/20 text-[#F7F4EE] hover:bg-[#F7F4EE] hover:text-[#0E0E10] transition-colors cursor-pointer"
                >
                  <span>Enquire This Style</span>
                  <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TattooProcessSection({
  onStartTattooEnquiry,
}: TattooStudioSectionProps) {
  return (
    <section
      id="tattoo-process"
      className="bg-[#0E0E10] text-[#F7F4EE] py-16 sm:py-20 lg:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        {/* Tattoo Artist Experience Process */}
        <div>
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.22em] uppercase text-[#C6A46C]">
              Tattoo Artist Experience
            </p>
            <h2 className="mt-2.5 font-sans text-2xl sm:text-3xl lg:text-4xl font-semibold tracking-tight text-[#F7F4EE]">
              From First Idea To Healed Artwork
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#BDB6AC]">
              A calm, collaborative five-step process designed around clarity,
              cleanliness, and personal comfort.
            </p>
          </div>

          <ol className="mt-10 grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-5">
            {TATTOO_PROCESS_STEPS.map((step, index) => (
              <li key={step.stepNumber} className="relative flex flex-col">
                <div className="flex-1 p-5 sm:p-6 bg-[#171618] border border-[#F7F4EE]/10 rounded-xl">
                  <span className="font-sans text-2xl font-semibold tabular-nums text-[#C6A46C]">
                    {step.stepNumber}
                  </span>
                  <h3 className="mt-3 font-sans text-base font-semibold text-[#F7F4EE]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#B3ACA2] leading-relaxed">
                    {step.description}
                  </p>
                </div>

                {index < TATTOO_PROCESS_STEPS.length - 1 && (
                  <div
                    className="flex lg:hidden justify-center py-2 text-[#C6A46C]/70"
                    aria-hidden="true"
                  >
                    <ArrowDown className="h-4 w-4" />
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Tattoo CTA Block */}
        <div className="mt-16 sm:mt-20 p-6 sm:p-10 lg:p-14 bg-[#171618] border border-[#F7F4EE]/14 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#C6A46C]">
              Custom Tattoo Consultation
            </p>
            <h3 className="mt-2.5 font-sans text-2xl sm:text-4xl font-semibold tracking-tight text-[#F7F4EE]">
              Thinking About Your Next Tattoo?
            </h3>
            <p className="mt-3 text-base text-[#D0C9BF]">
              Bring your idea. Let&apos;s turn it into art.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 shrink-0">
            <button
              type="button"
              onClick={() => onStartTattooEnquiry()}
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 bg-[#F7F4EE] text-[#0E0E10] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#EAE2D6] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span>Start Your Tattoo Enquiry</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </button>

            <a
              href={buildWhatsAppUrl(
                STUDIO_CONFIG.whatsappNumber,
                STUDIO_CONFIG.whatsappMessages.tattoo,
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3.5 border border-[#F7F4EE]/30 text-[#F7F4EE] text-xs font-semibold tracking-[0.14em] uppercase hover:bg-[#F7F4EE]/10 transition-colors whitespace-nowrap shrink-0"
            >
              <MessageCircle className="h-4 w-4" aria-hidden="true" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
