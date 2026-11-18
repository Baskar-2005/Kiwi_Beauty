import {useEffect, useState} from 'react';
import {X, ZoomIn} from 'lucide-react';
import {
  GALLERY_ITEMS,
  type GalleryCategory,
  type GalleryItem,
} from '../data/studioData';
import {filterGalleryItems} from '../utils/studioLogic';
import {StudioImage} from './StudioImage';

const GALLERY_TABS: GalleryCategory[] = ['ALL', 'BEAUTY', 'TATTOO', 'STUDIO'];

export function GallerySection() {
  const [activeTab, setActiveTab] = useState<GalleryCategory>('ALL');
  const [lightboxItem, setLightboxItem] = useState<GalleryItem | null>(null);

  const visibleItems = filterGalleryItems(GALLERY_ITEMS, activeTab);

  useEffect(() => {
    if (!lightboxItem) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setLightboxItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxItem]);

  return (
    <section
      id="gallery"
      className="py-16 sm:py-20 lg:py-24 bg-[#F7F4EE] border-t border-[#141312]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7B6B5B]">
              Visual Journal
            </p>
            <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141312]">
              Inside Kiwi Studio
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Gallery categories"
            className="inline-flex items-center gap-1 p-1 bg-[#EAE2D6]/80 border border-[#141312]/10 rounded-lg self-start md:self-auto"
          >
            {GALLERY_TABS.map((tab) => {
              const isSelected = activeTab === tab;
              return (
                <button
                  key={tab}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveTab(tab)}
                  className={`min-h-[40px] px-3.5 sm:px-4 py-1.5 text-xs font-semibold tracking-[0.12em] rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isSelected
                      ? 'bg-[#141312] text-[#F7F4EE]'
                      : 'text-[#5A544E] hover:text-[#141312]'
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* 2-Column Masonry on Mobile, 3-Column Editorial Masonry on Desktop */}
        <div className="mt-10 columns-2 md:columns-3 gap-3 sm:gap-5 space-y-3 sm:space-y-5">
          {visibleItems.map((item) => (
            <figure
              key={item.id}
              className="break-inside-avoid group relative rounded-xl overflow-hidden bg-[#EAE2D6]"
            >
              <button
                type="button"
                aria-label={`Inspect ${item.title}`}
                onClick={() => setLightboxItem(item)}
                className="relative block w-full text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#141312]"
              >
                <div
                  className={
                    item.aspect === 'portrait'
                      ? 'aspect-[3/4]'
                      : 'aspect-[4/3]'
                  }
                >
                  <StudioImage
                    src={item.image}
                    alt={item.alt}
                    title={item.title}
                    className="w-full h-full"
                    imgClassName="group-hover:scale-[1.05]"
                  />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0E10]/75 via-[#0E0E10]/10 to-transparent opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300" />
                <div className="pointer-events-none absolute top-3 right-3 hidden sm:flex h-8 w-8 items-center justify-center rounded-full bg-[#F7F4EE]/90 text-[#141312] opacity-0 group-hover:opacity-100 transition-opacity">
                  <ZoomIn className="h-4 w-4" aria-hidden="true" />
                </div>
                <figcaption className="absolute bottom-2.5 left-3 right-3 sm:bottom-4 sm:left-4 sm:right-4 text-[#F7F4EE] sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <span className="block text-[10px] tracking-[0.16em] uppercase text-[#EAE2D6]">
                    {item.category}
                  </span>
                  <span className="block font-serif text-sm sm:text-lg leading-snug">
                    {item.title}
                  </span>
                </figcaption>
              </button>
            </figure>
          ))}
        </div>
      </div>

      {/* Fullscreen Lightbox */}
      {lightboxItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightboxItem.title}
          className="fixed inset-0 z-50 bg-[#0E0E10]/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#171618] border border-[#F7F4EE]/15 rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Close gallery preview"
              onClick={() => setLightboxItem(null)}
              className="absolute top-3 right-3 z-10 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-[#0E0E10]/80 text-[#F7F4EE] hover:bg-[#F7F4EE] hover:text-[#0E0E10] transition-colors cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="max-h-[75vh] aspect-[4/3] w-full bg-[#0E0E10]">
              <StudioImage
                src={lightboxItem.image}
                alt={lightboxItem.alt}
                title={lightboxItem.title}
                darkFallback
                eager
                className="w-full h-full"
                imgClassName="object-contain"
              />
            </div>

            <div className="p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[#F7F4EE]">
              <div>
                <p className="text-[11px] tracking-[0.18em] uppercase text-[#C6A46C]">
                  {lightboxItem.category}
                </p>
                <h3 className="font-serif text-2xl mt-0.5">
                  {lightboxItem.title}
                </h3>
              </div>
              <p className="text-sm text-[#BDB6AC]">{lightboxItem.caption}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
