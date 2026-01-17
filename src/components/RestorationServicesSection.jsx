import { restorationServices } from "../data/siteData";

export default function RestorationServicesSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:py-16 lg:py-20">
        <div className="rounded-2xl border border-neutral-200 bg-neutral-50 px-4 py-10 shadow-sm sm:px-8">
          {/* HEADER */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-black">
              {restorationServices.title}
            </h2>

            <p className="mt-3 sm:mt-4 text-lg sm:text-xl font-semibold text-neutral-800">
              {restorationServices.subtitle}
            </p>

            <p className="mt-4 sm:mt-6 text-[15px] leading-7 text-neutral-700 max-w-2xl">
              {restorationServices.description}
            </p>
          </div>

          {/* CARDS */}
          <div className="mt-8 grid gap-5 sm:gap-6 sm:grid-cols-2">
            {restorationServices.items.map((service) => (
              <div
                key={service.title}
                className="group overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Phone: stacked | Tablet+: landscape */}
                <div className="flex flex-col sm:flex-row">
                  {/* Image */}
                  <div className="relative w-full overflow-hidden h-44 sm:h-40 sm:w-56">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
                  </div>

                  {/* Title */}
                  <div className="flex flex-1 items-center justify-center sm:justify-start px-5 py-4 sm:py-0">
                    <h3 className="text-base font-extrabold tracking-tight text-black text-center sm:text-left">
                      {service.title}
                    </h3>
                  </div>
                </div>

                {/* Extra small padding bottom on phone to feel nicer */}
                <div className="sm:hidden h-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
