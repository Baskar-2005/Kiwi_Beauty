export const STUDIO_CONFIG = {
  brandName: 'Kiwi Beauty Care & Tattoo Studio',
  shortBrand: 'KIWI',
  subBrand: 'Beauty Care & Tattoo Studio',
  city: 'Chidambaram',
  addressLines: [
    'Meelaveethi,',
    'Kachithotty,',
    'Chidambaram,',
    'Tamil Nadu 608001',
  ],
  fullAddress: 'Meelaveethi, Kachithotty, Chidambaram, Tamil Nadu 608001',
  openingHours: '10:00 AM – 8:00 PM',
  openingDays: 'Open Daily',

  /**
   * Single source of truth for the studio's WhatsApp & phone number.
   * Update `whatsappNumber` (with country code, digits only) before going live.
   */
  whatsappNumber: '919876543210',
  displayPhone: '+91 98765 43210',
  instagramHandle: '@kiwibeautyandtattoo',
  instagramUrl: 'https://www.instagram.com/',
  googleReviewUrl:
    'https://www.google.com/maps/search/?api=1&query=Kiwi+Beauty+Care+%26+Tattoo+Studio+Meelaveethi+Kachithotty+Chidambaram+Tamil+Nadu+608001',
  googleMapsDirectionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Meelaveethi%2C+Kachithotty%2C+Chidambaram%2C+Tamil+Nadu+608001',
  googleMapsSearchQuery:
    'Meelaveethi, Kachithotty, Chidambaram, Tamil Nadu 608001',
  fallbackCoordinates: {
    lat: 11.3992,
    lng: 79.6935,
  },

  whatsappMessages: {
    general:
      "Hi Kiwi Beauty Care & Tattoo Studio, I'd like to enquire about booking an appointment.",
    beauty:
      "Hi Kiwi Beauty Care & Tattoo Studio, I'd like to enquire about a beauty service.",
    tattoo:
      "Hi Kiwi Beauty Care & Tattoo Studio, I'd like to enquire about getting a tattoo.",
    consultation:
      "Hi Kiwi Beauty Care & Tattoo Studio, I'd like to schedule a consultation.",
  },
} as const;
