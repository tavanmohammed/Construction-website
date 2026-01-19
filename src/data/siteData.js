// src/data/siteData.js
// ✅ Using public/images (NO imports needed)

/* =========================
   NAVIGATION
========================= */
export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Residential Projects", href: "/projects" },
  { label: "Commercial Projects", href: "/commercialprojects" },
  { label: "Contact", href: "#contact" },
];

/* =========================
   SITE INFO (TOP BAR)
========================= */
export const site = {
  companyName: "Buildara Group",
  tagline: "Construction & Renovation",
  phone: "(647)819-9317",
  email: "info@buildaragroup.ca",
  address: "Toronto, Ontario",
  hours: "Mon–Sat: 8am–6pm",
};

/* =========================
   HERO SECTION
========================= */
export const hero = {
  bgImage: "/images/hero-bg.jpg",
  eyebrow: "Custom Home Builders & Renovation Experts in Toronto & the GTA",
  title: "Specialists in Restoration & Structural Renewal ",
  description: "Building Restoration- Thoughtfully Repaired, Expertly Reinforced.",
  primaryCta: "Book a Free Consultation",
  secondaryCta: "View Our Projects",
  primaryHref: "#contact",
  secondaryHref: "#projects",
};

/* =========================
   ABOUT SECTION
========================= */
export const about = {
  title: "Trusted Commercial & Residential Renovation Experts",
  description:
    "We are a full-service renovation and construction company with experience across commercial and residential projects. Our work includes dealerships, retail spaces, restaurants, offices, commercial buildings, and private cottages. We focus on quality workmanship, clean finishes, and reliable timelines.",

  bullets: [
    "Commercial & residential renovation expertise",
    "Automotive dealerships and retail brands",
    "Restaurants, offices, and commercial buildings",
    "Apartments, homes, and private cottages",
  ],

  // ✅ Logos now use public/images
  logos: [
    { name: "Toyota", src: "/images/toyota.jpg" },
    { name: "BMW", src: "/images/bmw.jpg" },
    { name: "Sheraton Hotel", src: "/images/sheraton.jpeg" },
    { name: "Healthy Planet", src: "/images/healthy.jpeg" },
  ],

  // ✅ About image now uses public/images
  image: "/images/about.jpg",
};

/* =========================
   STATS
========================= */
export const stats = [
  { value: "10+", label: "Years Experience" },
  { value: "250+", label: "Projects Done" },
  { value: "4.9★", label: "Client Rating" },
  { value: "24/7", label: "Support" },
];

/* =========================
   SERVICES
========================= */
export const services = [
  { title: "Home Renovations", description: "Kitchens, bathrooms, basements, and full remodels." },
  { title: "Commercial Work", description: "Retail, offices, and small commercial upgrades." },
  { title: "Flooring & Drywall", description: "Framing, drywall, paint, flooring, and finishing." },
  { title: "Custom Projects", description: "Decks, fences, feature walls, and more." },
];

/* =========================
   PROJECTS
========================= */
export const projects = [
  {
    slug: "kitchen-renovation",
    tag: "Renovation",
    title: "Kitchen Renovation",
    image: "/images/proj5a.jpg",
    description: "Modern kitchen renovation with custom finishes.",
  },
  {
    slug: "bathroom-remodel",
    tag: "Remodel",
    title: "Bathroom Remodel",
    image: "/images/proj4a.jpeg",
    description: "Complete bathroom upgrade with tile and fixtures.",
  },
  {
    slug: "basement-finish",
    tag: "Renovation",
    title: "Basement Finishing",
    image: "/images/proj2a.jpg",
    description: "Basement drywall, flooring, and lighting.",
  },
  {
    slug: "outdoor-restoration",
    tag: "Restoration",
    title: "Outdoor Restoration",
    image: "/images/proj3a.jpeg",
    description: "Exterior repairs and protective coatings.",
  },
];

/* =========================
   CONTACT
========================= */
export const contact = {
  title: "Let’s build something great",
  description: "Send us a message with your project details. We’ll reply fast with next steps.",
};

export const reviews = {
  heading: "What Our Clients Say",
  subheading: "Google ★★★★★ Rated Custom Home Builders & Renovation Experts",
  description:
    "Discover why homeowners across Toronto & the GTA trust Builda for custom homes and renovation projects.",
  cards: [
    {
      text:
        "“Builda made our renovation smooth from start to finish. Great communication and excellent craftsmanship.”",
      name: "— Sarah M. (Toronto)",
      stars: 5,
    },
    {
      text:
        "“Professional, reliable, and detail-oriented. The whole team went above and beyond for our project.”",
      name: "— Daniel K. (North York)",
      stars: 5,
    },
    {
      text:
        "“Excellent experience. Organized, clean work, and the results were better than we imagined.”",
      name: "— Lisa G. (Vaughan)",
      stars: 5,
    },
  ],
};

export const serviceAreas = {
  title: "Where We Build Custom Homes & Renovations",
  description:
    "Serving homeowners across Toronto and the GTA with full design-build delivery for custom homes, major renovations, and home additions.",
  areas: [
    "Toronto",
    "Vaughan",
    "Richmond Hill",
    "King City",
    "Markham",
    "Stouffville",
    "Newmarket",
    "Hamilton",
    "Milton",
    "Burlington",
    "Aurora",
    "Mississauga",
    "Brampton",
    "Caledon",
    "Halton Hills",
    "Oakville",
  ],
  helperText: "Don’t see your neighbourhood?",
  helperLinkText: "Get in touch",
  helperHref: "#contact",
  mapCtaText: "View Coverage Map",
};

/* =========================
   REPAIR SERVICES
========================= */
export const repairServices = {
  title: "Repair Services",
  subtitle: "Small fixes. Big difference.",
  description:
    "From cosmetic touch-ups to essential repairs, we handle the details that keep your home looking and functioning at its best.",
  items: [
    { title: "Painting & Touch-Ups", image: "/images/painting.jpg" },
    { title: "Flooring Repairs", image: "/images/flooring.jpg" },
    { title: "Drywall Repair", image: "/images/drywall.jpg" },
    { title: "Ceiling Repair", image: "/images/ceiling.jpg" },
  ],
};

export const restorationServices = {
  title: "Restoration Services",
  subtitle: "Structural strength. Long-term protection.",
  description:
    "Our restoration services focus on reinforcing, protecting, and extending the life of your property using proven materials and expert craftsmanship.",
  items: [
    { title: "Masonry Restoration", image: "/images/masonry.jpeg" },
    { title: "Masonry & Concrete Repair", image: "/images/masonry-concrete.jpg" },
    { title: "Waterproofing Solutions", image: "/images/waterproofing.jpg" },
    { title: "Concrete & Balcony Restoration", image: "/images/balcony.jpg" },
    { title: "Outdoor Restoration", image: "/images/outdoor.jpeg" },
  ],
};

export const serviceOptions = [
  "Home Renovations",
  "Commercial Work",
  "Custom Projects",
  "Repair – Painting & Touch-Ups",
  "Repair – Flooring Repairs",
  "Repair – Drywall Repair",
  "Repair – Ceiling Repair",
  "Restoration – Masonry Restoration",
  "Restoration – Masonry & Concrete Repair",
  "Restoration – Waterproofing Solutions",
  "Restoration – Concrete & Balcony Restoration",
  "Restoration – Outdoor Restoration",
  "Other",
];

export const cityOptions = [
  "Toronto",
  "North York",
  "Scarborough",
  "Etobicoke",
  "Vaughan",
  "Richmond Hill",
  "Markham",
  "Mississauga",
  "Brampton",
  "Oakville",
  "Other",
];
