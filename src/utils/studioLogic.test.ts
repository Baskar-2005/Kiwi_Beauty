import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildBookingWhatsAppMessage,
  buildWhatsAppUrl,
  computeReviewSummary,
  filterGalleryItems,
  filterTattooWorks,
  getAvailableTattooCategories,
  getEnabledBeautyServices,
  shouldShowTransformations,
  validateBookingEnquiry,
} from './studioLogic';
import {
  BEAUTY_SERVICES,
  CLIENT_REVIEWS,
  GALLERY_ITEMS,
  REAL_TRANSFORMATIONS,
  TATTOO_WORKS,
} from '../data/studioData';

test('buildWhatsAppUrl strips formatting and encodes message', () => {
  const url = buildWhatsAppUrl('+91 98765-43210', 'Hi Kiwi Studio!');
  assert.equal(url, 'https://wa.me/919876543210?text=Hi%20Kiwi%20Studio!');
});

test('getEnabledBeautyServices returns only enabled services', () => {
  const enabled = getEnabledBeautyServices([
    ...BEAUTY_SERVICES,
    {
      id: 'disabled-item',
      title: 'Hidden',
      category: 'Other Beauty Services',
      description: 'Not offered yet',
      image: '/img.jpg',
      alt: 'Hidden',
      enabled: false,
    },
  ]);
  assert.equal(enabled.some((item) => item.id === 'disabled-item'), false);
  assert.equal(enabled.length, BEAUTY_SERVICES.filter((s) => s.enabled).length);
});

test('tattoo categories reflect only categories present in actual works', () => {
  const categories = getAvailableTattooCategories(TATTOO_WORKS);
  assert.equal(categories[0], 'All');
  assert.equal(categories.includes('Floral'), true);
  assert.equal(categories.includes('Lettering'), false);

  const floralWorks = filterTattooWorks(TATTOO_WORKS, 'Floral');
  assert.equal(floralWorks.every((w) => w.category === 'Floral'), true);
  assert.equal(filterTattooWorks(TATTOO_WORKS, 'All').length, TATTOO_WORKS.length);
});

test('filterGalleryItems filters accurately across ALL, BEAUTY, TATTOO, STUDIO', () => {
  assert.equal(filterGalleryItems(GALLERY_ITEMS, 'ALL').length, GALLERY_ITEMS.length);
  const tattoo = filterGalleryItems(GALLERY_ITEMS, 'TATTOO');
  assert.ok(tattoo.length > 0);
  assert.equal(tattoo.every((item) => item.category === 'TATTOO'), true);
  const studio = filterGalleryItems(GALLERY_ITEMS, 'STUDIO');
  assert.ok(studio.length > 0);
  assert.equal(studio.every((item) => item.category === 'STUDIO'), true);
});

test('transformations stay hidden when no real before/after images exist', () => {
  assert.equal(shouldShowTransformations(REAL_TRANSFORMATIONS), false);
  assert.equal(
    shouldShowTransformations([
      {
        id: '1',
        title: 'Bridal Look',
        category: 'Makeup',
        beforeImage: '/before.jpg',
        afterImage: '/after.jpg',
        notes: 'Real session',
      },
    ]),
    true,
  );
});

test('review summary returns null rating when no real reviews are supplied', () => {
  const emptySummary = computeReviewSummary(CLIENT_REVIEWS);
  assert.equal(emptySummary.hasReviews, false);
  assert.equal(emptySummary.averageRating, null);
  assert.equal(emptySummary.count, 0);

  const realSummary = computeReviewSummary([
    {
      id: 'r1',
      clientName: 'Ananya R.',
      rating: 5,
      service: 'Fine-Line Tattoo',
      comment: 'Clean studio and calm guidance.',
      date: '2026-10-01',
      source: 'Google',
    },
    {
      id: 'r2',
      clientName: 'Divya K.',
      rating: 4,
      service: 'Hair Styling',
      comment: 'Very attentive styling.',
      date: '2026-10-05',
      source: 'Google',
    },
  ]);
  assert.equal(realSummary.hasReviews, true);
  assert.equal(realSummary.count, 2);
  assert.equal(realSummary.averageRating, 4.5);
});

test('validateBookingEnquiry rejects incomplete or invalid fields and builds WhatsApp summary', () => {
  const invalid = validateBookingEnquiry({
    name: '',
    phone: '123',
    serviceType: 'Tattoo',
    preferredDate: '',
    preferredTime: '',
    message: '',
  });
  assert.equal(invalid.valid, false);
  assert.ok(invalid.errors.name);
  assert.ok(invalid.errors.phone);
  assert.ok(invalid.errors.preferredDate);
  assert.ok(invalid.errors.preferredTime);

  const validForm = {
    name: 'Meera Sundaram',
    phone: '+91 98765 43210',
    serviceType: 'Tattoo' as const,
    specificInterest: 'Botanical Geometry',
    preferredDate: '2026-12-01',
    preferredTime: '11:30 AM',
    message: 'Inner forearm placement, approx 3 inches',
  };
  const valid = validateBookingEnquiry(validForm);
  assert.equal(valid.valid, true);
  assert.deepEqual(valid.errors, {});

  const msg = buildBookingWhatsAppMessage(validForm);
  assert.match(msg, /Meera Sundaram/);
  assert.match(msg, /Tattoo \(Botanical Geometry\)/);
  assert.match(msg, /2026-12-01/);
});
