import {useState} from 'react';
import {ChevronLeft, ChevronRight, ExternalLink, MessageCircle, Star} from 'lucide-react';
import {
  CLIENT_REVIEWS,
  REAL_TRANSFORMATIONS,
  type TransformationItem,
} from '../data/studioData';
import {STUDIO_CONFIG} from '../config/studioConfig';
import {
  buildWhatsAppUrl,
  computeReviewSummary,
  shouldShowTransformations,
} from '../utils/studioLogic';
import {StudioImage} from './StudioImage';

function TransformationCard({item}: {item: TransformationItem}) {
  const [showAfter, setShowAfter] = useState(true);

  return (
    <article className="bg-[#F7F4EE] border border-[#141312]/10 rounded-2xl overflow-hidden">
      <div className="relative aspect-[4/3] bg-[#EAE2D6]">
        <StudioImage
          src={showAfter ? item.afterImage : item.beforeImage}
          alt={`${item.title} - ${showAfter ? 'After' : 'Before'}`}
          title={item.title}
          className="w-full h-full"
        />
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
          <span className="px-3 py-1 bg-[#141312]/85 text-[#F7F4EE] text-[11px] font-semibold tracking-[0.14em] uppercase">
            {showAfter ? 'After' : 'Before'}
          </span>
          <div className="inline-flex bg-[#F7F4EE]/95 p-0.5 rounded-md border border-[#141312]/15">
            <button
              type="button"
              onClick={() => setShowAfter(false)}
              className={`min-h-[36px] px-3 text-xs font-medium rounded cursor-pointer ${
                !showAfter ? 'bg-[#141312] text-[#F7F4EE]' : 'text-[#141312]'
              }`}
            >
              Before
            </button>
            <button
              type="button"
              onClick={() => setShowAfter(true)}
              className={`min-h-[36px] px-3 text-xs font-medium rounded cursor-pointer ${
                showAfter ? 'bg-[#141312] text-[#F7F4EE]' : 'text-[#141312]'
              }`}
            >
              After
            </button>
          </div>
        </div>
      </div>

      <div className="p-5">
        <p className="text-[11px] tracking-[0.14em] uppercase text-[#7B6B5B]">
          {item.category}
        </p>
        <h3 className="mt-1 font-serif text-xl text-[#141312]">{item.title}</h3>
        <p className="mt-1.5 text-sm text-[#5A544E]">{item.notes}</p>
      </div>
    </article>
  );
}

export function TransformationsSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!shouldShowTransformations(REAL_TRANSFORMATIONS)) {
    return null;
  }

  return (
    <section
      id="transformations"
      className="py-16 sm:py-20 bg-[#EFE9DF]/65 border-t border-[#141312]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7B6B5B]">
              Before &amp; After
            </p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl text-[#141312]">
              Real Transformations.
            </h2>
          </div>

          {REAL_TRANSFORMATIONS.length > 1 && (
            <div className="flex items-center gap-2 sm:hidden">
              <button
                type="button"
                aria-label="Previous transformation"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === 0 ? REAL_TRANSFORMATIONS.length - 1 : prev - 1,
                  )
                }
                className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#141312]/20 rounded-lg"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                aria-label="Next transformation"
                onClick={() =>
                  setActiveIndex((prev) =>
                    prev === REAL_TRANSFORMATIONS.length - 1 ? 0 : prev + 1,
                  )
                }
                className="min-h-[44px] min-w-[44px] flex items-center justify-center border border-[#141312]/20 rounded-lg"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          )}
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REAL_TRANSFORMATIONS.map((item, idx) => (
            <div
              key={item.id}
              className={idx === activeIndex ? 'block' : 'hidden md:block'}
            >
              <TransformationCard item={item} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  const summary = computeReviewSummary(CLIENT_REVIEWS);

  return (
    <section
      id="reviews"
      className="py-16 sm:py-20 lg:py-24 bg-[#EFE9DF]/60 border-t border-[#141312]/10"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <p className="text-[11px] font-semibold tracking-[0.2em] uppercase text-[#7B6B5B]">
              Client Experiences
            </p>
            <h2 className="mt-2.5 font-serif text-3xl sm:text-4xl lg:text-5xl text-[#141312]">
              What Our Clients Say
            </h2>
          </div>

          {summary.hasReviews && summary.averageRating !== null && (
            <div className="flex items-center gap-3 text-sm text-[#141312]">
              <div className="flex items-center gap-1 text-[#C6A46C]">
                <Star className="h-4 w-4 fill-current" aria-hidden="true" />
                <span className="font-semibold tabular-nums text-[#141312]">
                  {summary.averageRating.toFixed(1)}
                </span>
              </div>
              <span aria-hidden="true">·</span>
              <span className="text-[#5A544E] tabular-nums">
                Based on {summary.count}{' '}
                {summary.count === 1 ? 'verified review' : 'verified reviews'}
              </span>
            </div>
          )}
        </div>

        {summary.hasReviews ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
            {CLIENT_REVIEWS.map((review) => (
              <article
                key={review.id}
                className="p-6 bg-[#F7F4EE] border border-[#141312]/10 rounded-xl flex flex-col justify-between"
              >
                <div>
                  <div
                    className="flex items-center gap-1 text-[#C6A46C]"
                    aria-label={`${review.rating} out of 5 stars`}
                  >
                    {Array.from({length: 5}).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating ? 'fill-current' : 'opacity-25'
                        }`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-sm sm:text-base text-[#2C2926] leading-relaxed">
                    &ldquo;{review.comment}&rdquo;
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#141312]/8 flex items-center justify-between text-xs text-[#5A544E]">
                  <span className="font-semibold text-[#141312]">
                    {review.clientName}
                  </span>
                  <span>
                    {review.service}
                    {review.source ? ` · ${review.source}` : ''}
                  </span>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-10 p-6 sm:p-10 bg-[#F7F4EE] border border-[#141312]/10 rounded-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="max-w-2xl">
              <h3 className="font-serif text-2xl sm:text-3xl text-[#141312]">
                Verified Google Reviews Coming Soon
              </h3>
              <p className="mt-2.5 text-sm sm:text-base text-[#5A544E] leading-relaxed">
                We only publish real client feedback and verified ratings.
                Visited Kiwi Beauty Care &amp; Tattoo Studio in{' '}
                {STUDIO_CONFIG.city}? Share your experience directly on Google
                or message us with your feedback.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <a
                href={STUDIO_CONFIG.googleReviewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 bg-[#141312] text-[#F7F4EE] text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#2A2826] transition-colors whitespace-nowrap shrink-0"
              >
                <span>View on Google Maps</span>
                <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
              <a
                href={buildWhatsAppUrl(
                  STUDIO_CONFIG.whatsappNumber,
                  'Hi Kiwi Beauty Care & Tattoo Studio, I would like to share feedback about my recent visit.',
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 min-h-[44px] px-5 py-2.5 border border-[#141312]/25 text-[#141312] text-xs font-semibold tracking-[0.12em] uppercase hover:bg-[#EAE2D6]/60 transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Share Feedback</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
