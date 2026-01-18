import { useEffect, useMemo, useState } from "react";
import { hero } from "../data/siteData";

export default function Hero() {
  const SLIDES = useMemo(
    () => [
      {
        bgImage: "/images/hero.jpg",
        eyebrow: hero.eyebrow,
        title: hero.title,
        description: hero.description,
      },
      {
        bgImage: "/images/building.jpeg",
        eyebrow: "Commercial & Residential Renovations",
        title: "High-Quality Finishes, Built to Last",
        description:
          "Painting, drywall, flooring, kitchens, bathrooms, and full renovations delivered with clean, professional results.",
      },
      {
        bgImage: "/images/hero3.jpg",
        eyebrow: "Serving Toronto & the GTA",
        title: "Craftsmanship You Can See",
        description:
          "We focus on details, timelines, and communication—so your project feels smooth from start to finish.",
      },
    ],
    []
  );

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % SLIDES.length);
    }, 5500);
    return () => clearInterval(id);
  }, [SLIDES.length]);

  const active = SLIDES[index];

  return (
    <section className="relative">
      <div className="relative h-[520px] w-full overflow-hidden sm:h-[600px] lg:h-[680px]">
        {/* Background image */}
        <img
          key={active.bgImage}
          src={active.bgImage}
          alt="Hero background"
          className="absolute inset-0 h-full w-full object-cover animate-heroFade"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Content */}
        <div className="relative mx-auto flex h-full max-w-6xl items-center px-4">
          <div className="w-full">
            <div
              key={index}
              className="mx-auto w-full max-w-4xl rounded-xl bg-black/45 p-6 text-center text-white shadow-lg backdrop-blur-[2px] sm:p-10 animate-heroSlideUp"
            >
              <div className="mx-auto inline-flex rounded-md bg-white/10 px-4 py-2 text-xs font-semibold text-white/90">
                {active.eyebrow}
              </div>

              <h1 className="mt-5 text-3xl font-semibold sm:text-4xl lg:text-5xl">
                {active.title}
              </h1>

              <p className="mx-auto mt-4 max-w-3xl text-sm sm:text-base text-white/85">
                {active.description}
              </p>

              <div className="mx-auto mt-7 grid w-full max-w-3xl gap-3 sm:grid-cols-2">
                <a
                  href={hero.primaryHref}
                  className="inline-flex items-center justify-center bg-black px-6 py-4 text-sm font-semibold text-white hover:bg-black/90 sm:rounded-l-md"
                >
                  {hero.primaryCta}
                </a>
                <a
                  href={hero.secondaryHref}
                  className="inline-flex items-center justify-center bg-white px-6 py-4 text-sm font-semibold text-black hover:bg-neutral-100 sm:rounded-r-md"
                >
                  {hero.secondaryCta} <span className="ml-2">→</span>
                </a>
              </div>

              <div className="mt-6 flex justify-center gap-2">
                {SLIDES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    className={`h-2.5 w-2.5 rounded-full ${
                      i === index ? "bg-white" : "bg-white/40"
                    }`}
                  />
                ))}
              </div>
            </div>

            <div className="h-10" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes heroFade {
          from { opacity: 0; transform: scale(1.02); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-heroFade { animation: heroFade 700ms ease-out; }

        @keyframes heroSlideUp {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-heroSlideUp { animation: heroSlideUp 520ms ease-out; }
      `}</style>
    </section>
  );
}
