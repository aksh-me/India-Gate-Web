// ─── Images (local, optimized by astro:assets at build time) ────────────────
import imgHero from '../assets/india-gate-restaurant-dining-room-st-johns.jpg';
import imgKitchen from '../assets/indian-kitchen-chef-cooking.jpg';
import imgButterChicken from '../assets/butter-chicken-st-johns.jpg';
import imgLambCurry from '../assets/lamb-curry-st-johns.jpg';
import imgTandoori from '../assets/tandoori-chicken-clay-oven.jpg';
import imgAlooGobi from '../assets/aloo-gobi-vegan-curry.jpg';
import imgFineDining from '../assets/fine-dining-restaurant-st-johns.jpg';
import imgSamosas from '../assets/vegetable-samosas-appetizer.jpg';
import imgCurryPlated from '../assets/indian-curry-plated.jpg';
import imgPrawnCurry from '../assets/prawn-curry-dish.jpg';
import imgSimmering from '../assets/simmering-curry-spices.jpg';
import imgDiningInterior from '../assets/restaurant-dining-interior.jpg';

export const heroImage = imgHero;
export const aboutImage = imgKitchen;

// ─── Business data ───────────────────────────────────────────────────────────
// PLACEHOLDERS: verify domain, phone, hours, geo and socials with the client
// before launch. Everything downstream (schema, canonicals, sitemap) reads
// from this one object.
export const site = {
  name: 'India Gate',
  domain: 'https://indiagatenl.ca', // PLACEHOLDER — must match the production domain
  location: "ST. JOHN'S · NEWFOUNDLAND",
  phone: '(709) 753-6006',
  phoneHref: 'tel:+17097536006',
  website: 'indiagatenl.ca',
  websiteHref: 'https://indiagatenl.ca',
  facebookHref: 'https://facebook.com/indiagatenl', // PLACEHOLDER social profile
  address: ['286 Duckworth Street', "St. John's, NL · A1C 1H3"],
  schemaAddress: {
    streetAddress: '286 Duckworth Street',
    addressLocality: "St. John's",
    addressRegion: 'NL',
    postalCode: 'A1C 1H3',
    addressCountry: 'CA',
  },
  geo: { latitude: 47.5648, longitude: -52.7068 }, // PLACEHOLDER — verify pin
  priceRange: '$$',
  cuisine: ['Indian', 'North Indian'],
  // Google's keyless iframe endpoints refuse to load (ERR_ABORTED), so the
  // inline map is OpenStreetMap; directions still open in Google Maps.
  mapEmbed:
    'https://www.openstreetmap.org/export/embed.html?bbox=-52.7168%2C47.5598%2C-52.6968%2C47.5698&layer=mapnik&marker=47.5648%2C-52.7068',
  directionsHref:
    "https://www.google.com/maps/search/?api=1&query=India+Gate+286+Duckworth+Street+St.+John's+NL",
};

export const defaultDescription =
  "Enjoy authentic Indian cuisine in St. John's, Newfoundland. Fresh curries, tandoori specialties, vegetarian dishes and naan — dine-in, takeout and catering on Duckworth Street.";

// ─── Menu ────────────────────────────────────────────────────────────────────
export interface Dish {
  name: string;
  tag: string;
  price: string;
  img: ImageMetadata;
  alt: string;
  desc: string;
}

export const signatureDishes: Dish[] = [
  {
    name: 'Butter Chicken',
    tag: 'Most Loved',
    price: '$24',
    img: imgButterChicken,
    alt: 'Butter chicken in creamy tomato gravy served over basmati rice at India Gate, St. John’s',
    desc: 'Tender tandoori chicken in a rich, mildly spiced tomato-and-butter gravy — our signature for 25 years.',
  },
  {
    name: 'Lamb Curry',
    tag: 'House Classic',
    price: '$26',
    img: imgLambCurry,
    alt: 'Slow-cooked North Indian lamb curry with fresh coriander',
    desc: 'Slow-cooked lamb in a fragrant North Indian curry of ginger, garlic and warming spices.',
  },
  {
    name: 'Tandoori Chicken',
    tag: 'From the Tandoor',
    price: '$22',
    img: imgTandoori,
    alt: 'Char-grilled tandoori chicken skewers from the clay oven',
    desc: 'Chicken marinated overnight in yoghurt and spices, char-grilled in our clay tandoor.',
  },
  {
    name: 'Aloo Gobi',
    tag: 'Vegan',
    price: '$17',
    img: imgAlooGobi,
    alt: 'Aloo gobi — vegan potato and cauliflower curry with cumin and turmeric',
    desc: 'Potato and cauliflower simmered with cumin, turmeric and tomato — vegan and gluten-free.',
  },
];

export interface MenuGroup {
  title: string;
  items: { name: string; price: string; desc: string }[];
}

export const menuGroups: MenuGroup[] = [
  {
    title: 'To Begin',
    items: [
      { name: 'Vegetable Samosas', price: '$8', desc: 'Crisp pastry filled with spiced potato and peas.' },
      { name: 'Onion Bhaji', price: '$8', desc: 'Sliced onion fritters in seasoned gram-flour batter.' },
      { name: 'Vegetable Pakora', price: '$9', desc: 'Mixed vegetables fried in spiced batter, with chutney.' },
      { name: 'Papadam', price: '$3', desc: 'Crisp lentil wafers served with chutneys.' },
    ],
  },
  {
    title: 'From the Tandoor',
    items: [
      { name: 'Tandoori Chicken', price: '$22', desc: 'Half chicken in an overnight yoghurt-spice marinade.' },
      { name: 'Chicken Tikka', price: '$21', desc: 'Boneless chicken char-grilled in the clay oven.' },
      { name: 'Mixed Grill', price: '$26', desc: 'An assortment from the tandoor, for sharing.' },
    ],
  },
  {
    title: 'Curries & Mains',
    items: [
      { name: 'Butter Chicken', price: '$24', desc: 'Our most-loved creamy tomato-butter curry.' },
      { name: 'Lamb Curry', price: '$26', desc: 'Slow-cooked lamb, fragrant North Indian spices.' },
      { name: 'Aloo Gobi', price: '$17', desc: 'Potato and cauliflower, cumin and turmeric — vegan & gluten-free.' },
      { name: 'Dal', price: '$16', desc: 'Lentils simmered with garlic and spices — vegetarian.' },
    ],
  },
  {
    title: 'Breads & Rice',
    items: [
      { name: 'Plain Naan', price: '$4', desc: 'Pulled fresh from the tandoor.' },
      { name: 'Garlic Naan', price: '$5', desc: 'Brushed with garlic and butter.' },
      { name: 'Cheese & Onion Kulcha', price: '$6', desc: 'Stuffed leavened bread, baked to order.' },
      { name: 'Rice Pilau', price: '$6', desc: 'Basmati rice gently spiced and fragrant.' },
    ],
  },
];

// ─── Gallery ─────────────────────────────────────────────────────────────────
export interface GalleryImage {
  alt: string;
  img: ImageMetadata;
  size?: 'big' | 'wide';
}

export const gallery: GalleryImage[] = [
  { alt: 'Fine dining table set for dinner service in St. John’s', img: imgFineDining, size: 'big' },
  { alt: 'Crisp vegetable samosas with green chutney', img: imgSamosas },
  { alt: 'Plated Indian curry garnished with fresh herbs', img: imgCurryPlated },
  { alt: 'Prawn curry in a spiced coconut sauce', img: imgPrawnCurry },
  { alt: 'Curry simmering with whole Indian spices', img: imgSimmering },
  { alt: 'Warmly lit dining room at India Gate restaurant', img: imgDiningInterior, size: 'wide' },
];

// ─── Reviews (placeholder quotes — replace with real Google reviews) ────────
export interface Review {
  quote: string;
  name: string;
  meta: string;
}

export const reviews: Review[] = [
  {
    quote: 'The finest Indian meal we have had in Atlantic Canada — every dish was a quiet revelation.',
    name: 'Margaret D.',
    meta: "St. John's · via Google",
  },
  {
    quote: 'Service that makes you feel like family, and a butter chicken I still dream about.',
    name: 'Aiden R.',
    meta: 'Mount Pearl · via Yelp',
  },
  {
    quote: 'A genuinely special-occasion room. The tandoori prawns alone are worth the trip downtown.',
    name: 'Priya & Tom',
    meta: "St. John's · via TripAdvisor",
  },
];

// ─── Hours ───────────────────────────────────────────────────────────────────
export const hours = [
  { day: 'Lunch Buffet · Wed – Fri', time: '11:30 AM – 1:30 PM' },
  { day: 'Dinner · Tue – Sun', time: '5:00 – 9:30 PM' },
  { day: 'Monday', time: 'Closed' },
];

// Machine-readable hours for LocalBusiness schema (PLACEHOLDER — verify)
export const openingHoursSpecification = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Wednesday', 'Thursday', 'Friday'],
    opens: '11:30',
    closes: '13:30',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    opens: '17:00',
    closes: '21:30',
  },
];

// ─── FAQ (rendered on the home page + FAQPage schema) ────────────────────────
export const faqs = [
  {
    q: 'Does India Gate offer takeout in St. John’s?',
    a: 'Yes — our full menu is available for takeout. Call (709) 753-6006 to place your order and pick it up at 286 Duckworth Street in downtown St. John’s.',
  },
  {
    q: 'Do you have vegetarian, vegan or gluten-free options?',
    a: 'Absolutely. Many of our dishes are vegetarian, and favourites like aloo gobi and dal are vegan and gluten-free. Tell us about any dietary needs and the kitchen will guide you.',
  },
  {
    q: 'Do I need a reservation?',
    a: 'Walk-ins are always welcome, but we recommend reserving for dinner — especially weekends. You can request a table through our reservation form or by calling (709) 753-6006. For parties of 8 or more, please phone us directly.',
  },
  {
    q: 'Where is India Gate located and is there parking?',
    a: 'We’re at 286 Duckworth Street in downtown St. John’s, Newfoundland. Metered street parking is available on Duckworth and nearby side streets, with paid lots a short walk away.',
  },
  {
    q: 'Does India Gate cater events?',
    a: 'Yes — we offer full-service catering for events large and small, from office lunches to weddings. Call (709) 753-6006 to discuss your menu.',
  },
  {
    q: 'What are your opening hours?',
    a: 'Lunch buffet runs Wednesday to Friday, 11:30 AM – 1:30 PM. Dinner is served Tuesday to Sunday, 5:00 – 9:30 PM. We’re closed Mondays.',
  },
];
