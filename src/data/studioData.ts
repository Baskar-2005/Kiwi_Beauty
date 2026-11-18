export type BeautyCategory =
  | 'Hair Styling'
  | 'Hair Care'
  | 'Facials'
  | 'Skin Care'
  | 'Makeup'
  | 'Eyebrows'
  | 'Eyelashes'
  | 'Nail Care'
  | 'Bridal / Event Beauty'
  | 'Other Beauty Services';

export interface BeautyServiceItem {
  id: string;
  title: string;
  category: BeautyCategory;
  description: string;
  image: string;
  alt: string;
  enabled: boolean;
}

export type TattooCategory =
  | 'Minimal'
  | 'Floral'
  | 'Lettering'
  | 'Geometric'
  | 'Traditional'
  | 'Black & Grey'
  | 'Custom Designs';

export interface TattooArtworkItem {
  id: string;
  title: string;
  category: TattooCategory;
  placement: string;
  description: string;
  image: string;
  alt: string;
}

export interface TattooProcessStep {
  stepNumber: string;
  title: string;
  description: string;
}

export type GalleryCategory = 'ALL' | 'BEAUTY' | 'TATTOO' | 'STUDIO';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'ALL'>;
  caption: string;
  image: string;
  alt: string;
  aspect: 'portrait' | 'landscape' | 'square';
}

export interface TransformationItem {
  id: string;
  title: string;
  category: string;
  beforeImage: string;
  afterImage: string;
  notes: string;
}

export interface ClientReview {
  id: string;
  clientName: string;
  rating: number;
  service: string;
  comment: string;
  date: string;
  source?: 'Google' | 'Studio';
}

export const TRUST_PILLARS = [
  {
    id: 'beauty',
    title: 'Beauty Care',
    subtitle: 'Professional beauty services',
  },
  {
    id: 'tattoo',
    title: 'Tattoo Art',
    subtitle: 'Creative custom tattoo designs',
  },
  {
    id: 'personalized',
    title: 'Personalized',
    subtitle: 'Services tailored to you',
  },
  {
    id: 'hygienic',
    title: 'Hygienic Experience',
    subtitle: 'Clean and professional environment',
  },
] as const;

export const HERO_MEDIA = {
  beautyPortrait: {
    src: '/src/assets/images/hero_beauty_portrait_1795009104810.jpg',
    alt: 'Editorial beauty portrait with luminous skin and sleek hair styling at Kiwi Studio',
  },
  tattooArtistry: {
    src: '/src/assets/images/hero_tattoo_artistry_1795009105211.jpg',
    alt: 'Tattoo artist working with precision in warm studio lighting',
  },
  salonTreatment: {
    src: '/src/assets/images/beauty_hair_skin_1795009107257.jpg',
    alt: 'Calm hair styling and skin care session in travertine beauty interior',
  },
  fineLineTattoo: {
    src: '/src/assets/images/tattoo_fine_line_1795009106979.jpg',
    alt: 'Close-up of delicate black and grey fine-line botanical tattoo artwork',
  },
} as const;

/**
 * Editable Beauty Services list.
 * Toggle `enabled: true/false` or add/remove entries to match confirmed studio offerings.
 */
export const BEAUTY_SERVICES: BeautyServiceItem[] = [
  {
    id: 'hair-styling-care',
    title: 'Hair Styling & Care',
    category: 'Hair Styling',
    description:
      'Personalized cuts, nourishing rituals, and effortless everyday or occasion styling designed around your texture.',
    image: '/src/assets/images/beauty_hair_skin_1795009107257.jpg',
    alt: 'Stylist shaping hair in a serene travertine beauty room',
    enabled: true,
  },
  {
    id: 'skin-facials',
    title: 'Facials & Skin Care',
    category: 'Facials',
    description:
      'Calm, restorative facial treatments and skin prep focused on balanced hydration and a natural healthy glow.',
    image: '/src/assets/images/hero_beauty_portrait_1795009104810.jpg',
    alt: 'Woman with glowing, well-cared-for skin in soft natural lighting',
    enabled: true,
  },
  {
    id: 'makeup-bridal',
    title: 'Makeup & Event Beauty',
    category: 'Bridal / Event Beauty',
    description:
      'Refined, skin-first makeup artistry for weddings, celebrations, and portrait days without feeling heavy.',
    image: '/src/assets/images/beauty_makeup_nails_1795009106939.jpg',
    alt: 'Artisan makeup brushes, serums, and natural manicure on cream marble',
    enabled: true,
  },
  {
    id: 'brows-lashes-nails',
    title: 'Brows, Lashes & Nail Care',
    category: 'Nail Care',
    description:
      'Clean brow shaping, lash definition, and manicured nail care tailored to an understated, polished finish.',
    image: '/src/assets/images/studio_interior_editorial_1795009107946.jpg',
    alt: 'Warm ivory and brass beauty care station inside Kiwi Studio',
    enabled: true,
  },
];

/**
 * Editable Tattoo Portfolio items.
 * Category filter tabs automatically derive from the categories present here.
 */
export const TATTOO_WORKS: TattooArtworkItem[] = [
  {
    id: 'botanical-forearm',
    title: 'Botanical Geometry',
    category: 'Floral',
    placement: 'Inner Forearm',
    description:
      'Fine-line wildflower stems paired with crisp geometric framing in soft black and grey shading.',
    image: '/src/assets/images/tattoo_fine_line_1795009106979.jpg',
    alt: 'Fine-line floral and geometric tattoo on inner forearm',
  },
  {
    id: 'studio-precision',
    title: 'Custom Black & Grey Work',
    category: 'Black & Grey',
    placement: 'Forearm Session',
    description:
      'Detailed lineweight and smooth tonal gradients executed in a calm, clean studio environment.',
    image: '/src/assets/images/hero_tattoo_artistry_1795009105211.jpg',
    alt: 'Tattoo artist tattooing custom black and grey detail on forearm',
  },
  {
    id: 'custom-stencil-studies',
    title: 'Bespoke Line Studies',
    category: 'Custom Designs',
    placement: 'Concept Sheet',
    description:
      'Original hand-drawn botanical, minimal, and geometric concepts sketched to fit your body proportions.',
    image: '/src/assets/images/tattoo_custom_ink_1795009107168.jpg',
    alt: 'Hand-drawn minimal floral and geometric tattoo concept sketches on tracing paper',
  },
];

/**
 * Editable 5-step Tattoo Artist Experience.
 */
export const TATTOO_PROCESS_STEPS: TattooProcessStep[] = [
  {
    stepNumber: '01',
    title: 'Share Your Idea',
    description:
      'Send your inspiration, references, or personal story — even a rough thought is a great starting point.',
  },
  {
    stepNumber: '02',
    title: 'Discuss The Design',
    description:
      'We refine the style, line weight, and details together so the artwork feels distinctly yours.',
  },
  {
    stepNumber: '03',
    title: 'Finalize Placement & Size',
    description:
      'Test stencil sizing and body flow in front of the mirror until the proportions feel right.',
  },
  {
    stepNumber: '04',
    title: 'Tattoo Session',
    description:
      'Relax in a clean, unhurried studio setting with fresh single-use equipment and steady focus.',
  },
  {
    stepNumber: '05',
    title: 'Aftercare Guidance',
    description:
      'Leave with clear, practical healing steps so your ink settles crisp and vibrant.',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-beauty-portrait',
    title: 'Luminous Skin & Hair Finish',
    category: 'BEAUTY',
    caption: 'Soft natural glow and sleek styling',
    image: '/src/assets/images/hero_beauty_portrait_1795009104810.jpg',
    alt: 'Editorial beauty portrait with glowing skin and sleek hair',
    aspect: 'portrait',
  },
  {
    id: 'gal-tattoo-forearm',
    title: 'Fine-Line Botanical Ink',
    category: 'TATTOO',
    caption: 'Floral & geometric inner forearm piece',
    image: '/src/assets/images/tattoo_fine_line_1795009106979.jpg',
    alt: 'Fine-line floral and geometric forearm tattoo',
    aspect: 'portrait',
  },
  {
    id: 'gal-studio-space',
    title: 'The Chidambaram Space',
    category: 'STUDIO',
    caption: 'Beauty stations & dark tattoo wing',
    image: '/src/assets/images/studio_interior_editorial_1795009107946.jpg',
    alt: 'Kiwi Beauty Care and Tattoo Studio interior architecture',
    aspect: 'landscape',
  },
  {
    id: 'gal-beauty-treatment',
    title: 'Hair & Facial Care',
    category: 'BEAUTY',
    caption: 'Tailored beauty care sessions',
    image: '/src/assets/images/beauty_hair_skin_1795009107257.jpg',
    alt: 'Calm hair styling and facial care in studio',
    aspect: 'landscape',
  },
  {
    id: 'gal-tattoo-session',
    title: 'Precision Session',
    category: 'TATTOO',
    caption: 'Focused black & grey execution',
    image: '/src/assets/images/hero_tattoo_artistry_1795009105211.jpg',
    alt: 'Tattoo artist working on custom forearm piece',
    aspect: 'portrait',
  },
  {
    id: 'gal-beauty-makeup',
    title: 'Event & Bridal Prep',
    category: 'BEAUTY',
    caption: 'Skin-first makeup and nail care',
    image: '/src/assets/images/beauty_makeup_nails_1795009106939.jpg',
    alt: 'Makeup brushes, skincare serums, and natural nails',
    aspect: 'landscape',
  },
  {
    id: 'gal-tattoo-desk',
    title: 'Custom Concept Sketching',
    category: 'TATTOO',
    caption: 'Original drawings before stencil transfer',
    image: '/src/assets/images/tattoo_custom_ink_1795009107168.jpg',
    alt: 'Hand-drawn tattoo concepts on tracing paper',
    aspect: 'landscape',
  },
];

/**
 * Real Transformations (Before / After).
 * Remains empty and hidden until real client before/after images are supplied.
 */
export const REAL_TRANSFORMATIONS: TransformationItem[] = [];

/**
 * Verified Client Reviews.
 * Remains empty until real Google or verified client reviews are supplied.
 * Star ratings are only rendered when backed by entries in this array.
 */
export const CLIENT_REVIEWS: ClientReview[] = [];
