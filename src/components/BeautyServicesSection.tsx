import {motion} from 'motion/react';
import {ArrowRight} from 'lucide-react';
import {BEAUTY_SERVICES} from '../data/studioData';
import {getEnabledBeautyServices} from '../utils/studioLogic';
import {StudioImage} from './StudioImage';

interface BeautyServicesSectionProps {
  onBookService: (serviceTitle: string) => void;
}

export function BeautyServicesSection({
  onBookService,
}: BeautyServicesSectionProps) {
  const services = getEnabledBeautyServices(BEAUTY_SERVICES);

  return (
    <section
      id="beauty"
      className="py-16 sm:py-20 lg:py-24 bg-[#EFE9DF]/65 border-t border-[#141312]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7B6B5B]">
              Beauty Care
            </p>
            <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141312]">
              Beauty, Your Way.
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5A544E] max-w-md leading-relaxed">
            Calm, one-on-one beauty sessions tailored to your skin, hair, and
            personal aesthetic. Enquire directly to confirm availability.
          </p>
        </div>

        <div className="mt-10 sm:mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {services.map((service, index) => (
            <motion.article
              key={service.id}
              initial={{opacity: 0, y: 14}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true, margin: '-60px'}}
              transition={{duration: 0.45, delay: index * 0.05}}
              className="group flex flex-col bg-[#F7F4EE] border border-[#141312]/10 rounded-xl overflow-hidden"
            >
              <div className="aspect-[4/3] w-full bg-[#EAE2D6]">
                <StudioImage
                  src={service.image}
                  alt={service.alt}
                  title={service.title}
                  className="w-full h-full"
                  imgClassName="group-hover:scale-[1.04]"
                />
              </div>

              <div className="flex flex-col flex-1 justify-between p-5 sm:p-6">
                <div>
                  <p className="text-[11px] tracking-[0.14em] uppercase text-[#7B6B5B]">
                    {service.category}
                  </p>
                  <h3 className="mt-1.5 font-serif text-2xl text-[#141312]">
                    {service.title}
                  </h3>
                  <p className="mt-2 text-sm text-[#5A544E] leading-relaxed">
                    {service.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#141312]/8">
                  <button
                    type="button"
                    onClick={() => onBookService(service.title)}
                    className="w-full min-h-[44px] inline-flex items-center justify-between px-4 py-2.5 text-xs font-semibold tracking-[0.14em] uppercase text-[#141312] bg-[#EFE9DF]/70 hover:bg-[#141312] hover:text-[#F7F4EE] transition-colors cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
