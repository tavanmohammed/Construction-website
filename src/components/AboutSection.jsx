import { about } from "../data/siteData";

export default function AboutSection() {
  return (
    <section id="about" className="bg-[#f7f7f6]">
      <div className="mx-auto max-w-7xl px-4 py-16 lg:py-20 space-y-14">

        {/* TOP CONTENT */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-[#424242]">
              About Us
            </h2>

            <h3 className="mt-4 text-3xl sm:text-4xl font-extrabold leading-tight text-[#424242]">
              {about.title}
            </h3>

            <p className="mt-5 max-w-xl text-[15px] leading-7 text-neutral-700">
              {about.description}
            </p>

            <ul className="mt-7 grid gap-3 text-[15px] text-neutral-800 sm:grid-cols-2">
              {about.bullets.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-[#424242]" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT IMAGE */}
          <div className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
            <div className="overflow-hidden rounded-xl">
              <img
                src={about.image}
                alt="About our work"
                className="h-[320px] w-full object-cover sm:h-[400px]"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* LOGOS SECTION */}
        <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
          <h4 className="text-center text-sm font-semibold uppercase tracking-widest text-[#424242]">
            Trusted By
          </h4>

          <div className="mt-8 grid grid-cols-2 items-center gap-8 sm:grid-cols-3 lg:grid-cols-5">
            {about.logos.map((logo) => (
              <div
              key={logo.name}
              className="flex items-center justify-center opacity-90 hover:opacity-100 transition"
            >
            
                <img
                  src={logo.src}
                  alt={logo.name}
                  className="h-12 sm:h-14 object-contain"
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          <p className="mt-6 text-center text-xs text-neutral-500">
            Including automotive dealerships, retail brands, restaurants,
            commercial offices, and residential projects.
          </p>
        </div>
      </div>
    </section>
  );
}
