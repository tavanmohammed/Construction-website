// src/components/ServicesSection.jsx (or wherever this file is)

const services = [
  {
    title: "Home Additions",
    bold: "Home Additions in Vaughan and Toronto.",
    desc:
      "Seamless extensions that expand your space while blending with your home’s style.",
    image: "/images/home-additions.jpg",
  },
  {
    title: "Kitchen Renovations",
    bold: "Luxury Kitchen Renovations in Vaughan.",
    desc:
      "Smart layouts, premium finishes, and modern design tailored to how you cook and live.",
    image: "/images/kitchen-renovations.jpg",
  },
  {
    title: "Bathroom Renovations",
    bold: "Bathroom Renovations in Vaughan.",
    desc:
      "Spa-inspired upgrades and functional layouts that enhance comfort and style.",
    image: "/images/bathroom.jpg",
  },
  {
    title: "Basement Renovations",
    bold: "Basement Renovations in Vaughan.",
    desc:
      "Rec rooms, rental suites, and custom living spaces — designed for comfort and value.",
    image: "/images/basement.jpg",
  },
  {
    title: "Construction Management",
    bold: "Residential Construction Management.",
    desc:
      "Expert oversight ensuring quality, timelines, and seamless coordination.",
    image: "/images/construction.jpg",
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-20">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="text-5xl font-extrabold tracking-tight">
              Our Services
            </h2>

            <h3 className="mt-6 text-4xl font-extrabold leading-tight">
              Custom Homes, Renovations &{" "}
              <span className="text-neutral-400">Design-Build Expertise</span>
            </h3>

            <p className="mt-8 text-[15px] leading-7 text-neutral-700">
              From <span className="underline">custom homes</span> to{" "}
              <span className="underline">
                major renovations and design-build projects
              </span>
              , we bring thoughtful craftsmanship and expert project management to
              every home we transform.
            </p>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white shadow-sm">
      <div className="p-6">
        <div className="overflow-hidden rounded-xl">
          <img
            src={service.image}
            alt={service.title}
            className="h-52 w-full object-cover"
            loading="lazy"
          />
        </div>

        <h4 className="mt-6 text-xl font-extrabold">{service.title}</h4>

        <p className="mt-4 text-[15px] font-semibold text-neutral-800">
          {service.bold}
        </p>

        <p className="mt-2 text-[15px] leading-7 text-neutral-700">
          {service.desc}
        </p>
      </div>
    </div>
  );
}
