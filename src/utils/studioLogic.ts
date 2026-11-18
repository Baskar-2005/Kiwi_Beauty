import type {
  BeautyServiceItem,
  ClientReview,
  GalleryCategory,
  GalleryItem,
  TattooArtworkItem,
  TattooCategory,
  TransformationItem,
} from '../data/studioData';

export type BookingServiceType = 'Beauty Service' | 'Tattoo' | 'Consultation';

export interface BookingEnquiryForm {
  name: string;
  phone: string;
  serviceType: BookingServiceType;
  specificInterest?: string;
  preferredDate: string;
  preferredTime: string;
  message: string;
}

export interface BookingValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof BookingEnquiryForm, string>>;
}

export function normalizeWhatsAppDigits(rawPhone: string): string {
  return rawPhone.replace(/\D/g, '');
}

export function buildWhatsAppUrl(phoneNumber: string, message: string): string {
  const digits = normalizeWhatsAppDigits(phoneNumber);
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${digits}?text=${encodedMessage}`;
}

export function buildBookingWhatsAppMessage(form: BookingEnquiryForm): string {
  const interestPart = form.specificInterest
    ? ` (${form.specificInterest})`
    : '';
  const lines = [
    'Hi Kiwi Beauty Care & Tattoo Studio, I would like to request an appointment.',
    `Name: ${form.name.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Service: ${form.serviceType}${interestPart}`,
    `Preferred Date: ${form.preferredDate}`,
    `Preferred Time: ${form.preferredTime}`,
  ];
  if (form.message.trim()) {
    lines.push(`Notes: ${form.message.trim()}`);
  }
  return lines.join('\n');
}

export function getEnabledBeautyServices(
  services: BeautyServiceItem[],
): BeautyServiceItem[] {
  return services.filter((service) => service.enabled);
}

export function getAvailableTattooCategories(
  works: TattooArtworkItem[],
): ('All' | TattooCategory)[] {
  const seen = new Set<TattooCategory>();
  for (const work of works) {
    seen.add(work.category);
  }
  return ['All', ...Array.from(seen)];
}

export function filterTattooWorks(
  works: TattooArtworkItem[],
  selectedCategory: 'All' | TattooCategory,
): TattooArtworkItem[] {
  if (selectedCategory === 'All') {
    return works;
  }
  return works.filter((work) => work.category === selectedCategory);
}

export function filterGalleryItems(
  items: GalleryItem[],
  category: GalleryCategory,
): GalleryItem[] {
  if (category === 'ALL') {
    return items;
  }
  return items.filter((item) => item.category === category);
}

export function shouldShowTransformations(
  transformations: TransformationItem[],
): boolean {
  return transformations.some(
    (item) => Boolean(item.beforeImage.trim()) && Boolean(item.afterImage.trim()),
  );
}

export interface ReviewSummary {
  hasReviews: boolean;
  count: number;
  averageRating: number | null;
}

export function computeReviewSummary(reviews: ClientReview[]): ReviewSummary {
  if (reviews.length === 0) {
    return {
      hasReviews: false,
      count: 0,
      averageRating: null,
    };
  }
  const total = reviews.reduce(
    (sum, review) => sum + Math.min(5, Math.max(1, review.rating)),
    0,
  );
  const average = Math.round((total / reviews.length) * 10) / 10;
  return {
    hasReviews: true,
    count: reviews.length,
    averageRating: average,
  };
}

export function validateBookingEnquiry(
  form: BookingEnquiryForm,
): BookingValidationResult {
  const errors: Partial<Record<keyof BookingEnquiryForm, string>> = {};

  if (form.name.trim().length < 2) {
    errors.name = 'Please enter your full name.';
  }

  const digits = normalizeWhatsAppDigits(form.phone);
  if (digits.length < 10 || digits.length > 15) {
    errors.phone = 'Please enter a valid 10-digit phone or WhatsApp number.';
  }

  if (
    form.serviceType !== 'Beauty Service' &&
    form.serviceType !== 'Tattoo' &&
    form.serviceType !== 'Consultation'
  ) {
    errors.serviceType = 'Please select a service type.';
  }

  if (!form.preferredDate.trim()) {
    errors.preferredDate = 'Please select a preferred date.';
  }

  if (!form.preferredTime.trim()) {
    errors.preferredTime = 'Please select a preferred time.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
