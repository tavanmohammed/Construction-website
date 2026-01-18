// src/pages/CommercialProjectsPage.jsx
import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/* ---------------- HERO ---------------- */

function CommercialHero() {
  return (
    <section className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-black">
      {/* Background image from public/images */}
      <img
        src="/images/proj18e.jpg"
        alt="Commercial renovation projects"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Text */}
      <div className="relative z-10 flex h-[260px] items-end pb-10 sm:h-[340px] sm:pb-14 lg:h-[420px]">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h1 className="max-w-2xl text-2xl font-light tracking-wide text-[#e8ddcf] sm:text-4xl lg:text-5xl">
            Commercial Projects
          </h1>
          <p className="mt-4 max-w-xl text-sm text-[#e8ddcf]/80">
            Offices, retail spaces, dealerships, and large-scale interior work —
            delivered with precision and professionalism.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- DATA ---------------- */

const COMMERCIAL_PROJECTS = [
  {
    title: "Commercial Building Renovation",
    city: "Toronto, ON",
    description:
      "This commercial renovation included full interior painting, wall and ceiling finishing, custom millwork, and modern lighting installation. The project features upgraded flooring, glass partitions, built-in shelving, and refined detailing throughout open work areas, lounges, and meeting spaces. The result is a clean, modern, and professional interior designed for both functionality and visual impact.",
    images: [
      "/images/proj18a.jpg",
      "/images/proj18b.jpg",
      "/images/proj18c.jpg",
      "/images/proj18d.jpg",
      "/images/proj18e.jpg",
      "/images/proj18f.jpg",
      "/images/proj18g.jpg",
    ],
    videos: [],
  },
  {
    title: "Healthy Planet Store",
    city: "Ajax, ON",
    description:
      "Commercial interior renovation including full painting, repairs, and finishing work. The high exposed ceiling was upgraded with modern lighting, creating a bright, clean, and customer-ready retail space.",
    images: [
      "/images/proj17a.jpg",
      "/images/proj17b.jpg",
      "/images/proj17c.jpg",
      "/images/proj17d.jpg",
    ],
    videos: [],
  },
  {
    title: "Commercial Exterior Refresh",
    city: "St. Catharines, ON",
    description:
      "Exterior work including masonry repairs, brick restoration, window detailing, and finishing. Scaffolding was used for safe access, resulting in a clean, restored exterior with a refreshed, well-maintained look.",
    images: [
      "/images/proj10a.jpeg",
      "/images/proj10b.jpeg",
      "/images/proj10c.jpeg",
      "/images/proj10d.jpeg",
      "/images/proj10e.jpeg",
    ],
    videos: [],
  },
  {
    title: "Retail / Restaurant Renovation",
    city: "Toronto, ON",
    description:
      "Commercial interior renovation including wall and ceiling prep, painting, repairs, and clean finishing details to deliver a customer-ready space with a bright and modern feel.",
    images: [
      "/images/proj3a.jpeg",
      "/images/proj3b.jpeg",
      "/images/proj3c.jpeg",
      "/images/proj3d.jpeg",
    ],
    videos: [],
  },
  {
    title: "Exterior Building Painting + Window Painting",
    city: "Toronto, ON",
    description:
      "Exterior refresh including façade painting, window frame painting, surface repairs, and finishing work. The project improved durability and delivered a cleaner, more modern, well-maintained appearance.",
    images: [
      "/images/proj11a.jpeg",
      "/images/proj11b.jpeg",
      "/images/proj11c.jpeg",
      "/images/proj11d.jpeg",
    ],
    videos: [],
  },
  {
    title: "Genesis Dealership Store",
    city: "Brampton, ON",
    description:
      "Commercial interior renovation focused on exposed ceiling painting, structural steel and beam coating, ductwork painting, and full surface protection. The project delivered a clean, consistent finish while preserving the open industrial style, resulting in a bright, modern, showroom-ready dealership space.",
    images: ["/images/proj19a.jpeg", "/images/proj19b.jpeg"],
    videos: [
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/44_elejqr.mp4",
        title: "Before Our Work",
        city: "Brampton, ON",
        description:
          "Overview of the space before preparation, repairs, and painting work began.",
      },
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/46_uwllcd.mp4",
        title: "After Our Work",
        city: "Brampton, ON",
        description:
          "Completed interior after ceiling, steel, and ductwork painting with a clean professional finish.",
      },
    ],
  },
];

/* ---------------- PAGE ---------------- */

export default function CommercialProjectsPage() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
        <Link
          to="/#about"
          className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
        >
          <span aria-hidden>←</span> Back
        </Link>

        <div className="mt-6">
          <CommercialHero />
        </div>

        <div className="mt-10 space-y-14">
          {COMMERCIAL_PROJECTS.map((p, pIndex) => (
            <section
              key={p.title + pIndex}
              className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm"
            >
              {/* Header */}
              <div className="rounded-2xl bg-[#f7f7f6] px-5 py-4 border border-neutral-200">
                <div className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  Commercial Project {pIndex + 1}
                </div>

                <h2 className="mt-2 text-xl font-extrabold text-black sm:text-2xl">
                  {p.title}{" "}
                  <span className="text-neutral-500 font-semibold">— {p.city}</span>
                </h2>

                {p.description && (
                  <p className="mt-3 text-sm leading-relaxed text-neutral-700 max-w-3xl">
                    {p.description}
                  </p>
                )}
              </div>

              {/* Images */}
              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {p.images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() =>
                      setLightbox({
                        images: p.images,
                        index: i,
                        title: p.title,
                        city: p.city,
                      })
                    }
                    className="group overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-black/30"
                    aria-label={`Open ${p.title} image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${p.title} image ${i + 1}`}
                      className="h-60 w-full rounded-xl object-cover transition group-hover:scale-105 sm:h-64"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              {/* Videos */}
              {p.videos?.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-black sm:text-xl">Videos</h3>

                  <div className="mt-4 space-y-10">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {p.videos.slice(0, 2).map((video, i) => (
                        <div key={(video.src || "video") + i}>
                          <div className="mb-3 rounded-xl bg-gradient-to-br from-[#eef2f7] to-[#e4ebf5] px-4 py-3 shadow-sm border border-[#d7e0ee]">
                            <div className="text-sm font-semibold text-[#1f2a44]">
                              {video.title}
                              <span className="ml-1 italic text-[#4b5d80]">
                                — {video.city || p.city}
                              </span>
                            </div>
                            {video.description && (
                              <p className="mt-2 text-sm leading-relaxed text-[#2e3b55]">
                                {video.description}
                              </p>
                            )}
                          </div>

                          <video
                            src={video.src}
                            controls
                            playsInline
                            className="w-full rounded-xl border border-neutral-200 bg-black"
                          />
                        </div>
                      ))}
                    </div>

                    {p.videos[2] && (
                      <div className="max-w-2xl mx-auto">
                        <div className="mb-3 rounded-xl bg-gradient-to-br from-[#eef2f7] to-[#e4ebf5] px-4 py-3 shadow-sm border border-[#d7e0ee]">
                          <div className="text-sm font-semibold text-[#1f2a44]">
                            {p.videos[2].title}
                            <span className="ml-1 italic text-[#4b5d80]">
                              — {p.videos[2].city || p.city}
                            </span>
                          </div>
                          {p.videos[2].description && (
                            <p className="mt-2 text-sm leading-relaxed text-[#2e3b55]">
                              {p.videos[2].description}
                            </p>
                          )}
                        </div>

                        <video
                          src={p.videos[2].src}
                          controls
                          playsInline
                          className="w-full rounded-xl border border-neutral-200 bg-black"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>
      </div>

      {lightbox && (
        <Lightbox
          images={lightbox.images}
          startIndex={lightbox.index}
          title={lightbox.title}
          city={lightbox.city}
          onClose={() => setLightbox(null)}
        />
      )}
    </main>
  );
}

/* ---------------- LIGHTBOX ---------------- */

function Lightbox({ images, startIndex, onClose, title, city }) {
  const [index, setIndex] = useState(startIndex);
  const hasMany = images.length > 1;
  const dialogRef = useRef(null);
  const startX = useRef(0);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialogRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center px-3 sm:px-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      <div
        ref={dialogRef}
        className="relative w-full max-w-6xl outline-none"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => {
          if (e.key === "Escape") onClose();
          if (e.key === "ArrowRight") next();
          if (e.key === "ArrowLeft") prev();
        }}
        tabIndex={0}
        onTouchStart={(e) => (startX.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - startX.current;
          if (delta > 50) prev();
          if (delta < -50) next();
        }}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="text-white">
            <div className="text-sm font-semibold">{title || "Preview"}</div>
            {city && <div className="text-xs text-white/70">{city}</div>}
          </div>

          <button
            onClick={onClose}
            className="shrink-0 rounded-full bg-white/10 px-3 py-2 text-white text-sm font-semibold"
          >
            Close ✕
          </button>
        </div>

        <img
          src={images[index]}
          alt={`Preview ${index + 1}`}
          className="mx-auto max-h-[75vh] sm:max-h-[85vh] w-auto rounded-xl object-contain"
        />

        {hasMany && (
          <>
            <button
              onClick={prev}
              className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-4 py-3 text-white text-lg"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              onClick={next}
              className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/20 px-4 py-3 text-white text-lg"
              aria-label="Next image"
            >
              ›
            </button>
          </>
        )}

        {hasMany && (
          <div className="mt-3 text-center text-xs text-white/70">
            {index + 1} / {images.length}
          </div>
        )}

        {hasMany && (
          <div className="mt-1 text-center text-[11px] text-white/50">
            Swipe left/right to navigate
          </div>
        )}
      </div>
    </div>
  );
}
