import { useEffect, useMemo, useState } from "react";
import { hero } from "../data/siteData";

export default function Hero() {
  // ✅ Add your 3 images + 3 text sets here
  const SLIDES = useMemo(
    () => [
      {
        bgImage: "/src/assets/hero.jpg", // you can replace with "/src/assets/hero1.jpg"
        eyebrow: hero.eyebrow,
        title: hero.title,
        description: hero.description,
      },
      {
        bgImage: "/src/assets/building.jpeg",
        eyebrow: "Commercial & Residential Renovations",
        title: "High-Quality Finishes, Built to Last",
        description:
          "Painting, drywall, flooring, kitchens, bathrooms, and full renovations delivered with clean, professional results.",
      },
      {
        bgImage: "/src/assets/hero3.jpg",
        eyebrow: "Serving Toronto & the GTA",
        title: "Craftsmanship You Can See",
        description:
          "We focus on details, timelines, and communication—so your project feels smooth from start to finish.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  // Auto-rotate
  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5500); // ⬅️ change speed here
    return () => clearInterval(id);
  }, [SLIDES.length]);

  const active = SLIDES[index];

  return (
    <section className="relative">
      {/* Background */}
      <div className="relative h-[520px] w-full sm:h-[600px] lg:h-[680px] overflow-hidden">
        {/* Background image (animated) */}
        <img
          key={active.bgImage}
          src={active.bgImage}
          alt="Hero background"
          className="absolute inset-0 h-full w-full object-cover animate-heroFade"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-6xl items-center px-4">
          <div className="w-full">
            {/* Text box (animated) */}
            <div
              key={index}
              className="mx-auto w-full max-w-4xl rounded-xl bg-black/45 p-6 text-center text-white shadow-lg backdrop-blur-[2px] sm:p-10 animate-heroSlideUp"
            >
              {/* Eyebrow */}
              <div className="mx-auto inline-flex max-w-full items-center justify-center rounded-md bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                {active.eyebrow}
              </div>

              {/* Title */}
              <h1 className="mt-5 text-3xl font-semibold leading-snug sm:text-4xl lg:text-5xl">
                {active.title}
              </h1>

              {/* Description */}
              <p className="mx-auto mt-4 max-w-3xl text-sm leading-6 text-white/85 sm:text-base sm:leading-7">
                {active.description}
              </p>

              {/* Buttons bar (unchanged) */}
              <div className="mx-auto mt-7 grid w-full max-w-3xl gap-3 sm:grid-cols-2 sm:gap-0">
                <a
                  href={hero.primaryHref}
                  className="inline-flex items-center justify-center bg-black px-6 py-4 text-sm font-semibold text-white hover:bg-black/90 transition sm:rounded-l-md"
                >
                  {hero.primaryCta}
                </a>

                <a
                  href={hero.secondaryHref}
                  className="inline-flex items-center justify-center bg-white px-6 py-4 text-sm font-semibold text-black hover:bg-neutral-100 transition sm:rounded-r-md"
                >
                  {hero.secondaryCta} <span className="ml-2">→</span>
                </a>
              </div>

              {/* Dots (optional, nice on mobile) */}
              <div className="mt-6 flex items-center justify-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to slide ${i + 1}`}
                    className={`h-2.5 w-2.5 rounded-full transition ${
                      i === index ? "bg-white" : "bg-white/40 hover:bg-white/70"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Small spacing below box like screenshot */}
            <div className="h-10" />
          </div>
        </div>
      </div>

      {/* Animations */}
      <style>{`
        @keyframes heroFade {
          0% { opacity: 0; transform: scale(1.02); }
          100% { opacity: 1; transform: scale(1); }
        }
        .animate-heroFade {
          animation: heroFade 700ms ease-out;
        }

        @keyframes heroSlideUp {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .animate-heroSlideUp {
          animation: heroSlideUp 520ms ease-out;
        }
      `}</style>
    </section>
  );
}
