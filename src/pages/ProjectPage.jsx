// src/pages/ProjectPage.jsx
import { Link } from "react-router-dom";
import { useEffect, useMemo, useRef, useState } from "react";

/* ---------------- HELPERS ---------------- */

const isCloudinaryVideo = (url = "") =>
  typeof url === "string" &&
  url.includes("res.cloudinary.com") &&
  url.includes("/video/upload/");

function VideoPlayer({ src, title }) {
  if (!src || !isCloudinaryVideo(src)) {
    return (
      <div className="w-full aspect-video rounded-xl border border-neutral-200 bg-neutral-950/90 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-sm font-semibold text-white">Video coming soon</div>
          <div className="mt-1 text-xs text-white/60">
            {src ? "Link saved (not Cloudinary mp4)." : "No link yet."}
          </div>
          {title ? <div className="mt-2 text-[11px] text-white/50">{title}</div> : null}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full aspect-video">
      <video
        src={src}
        controls
        playsInline
        muted
        preload="metadata"
        className="h-full w-full rounded-xl border border-neutral-200 bg-black object-cover"
      />
    </div>
  );
}

/* ---------------- HERO ---------------- */

function VideoHero() {
  const texts = [
    "You imagine the space. We bring it to life.",
    "You expect quality. We deliver craftsmanship.",
    "You plan the vision. We build the result.",
    "You choose excellence. We execute with care.",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, 9000);
    return () => clearInterval(interval);
  }, []);

  const HERO_VIDEO =
    "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/20_cvsqhb.mp4";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-neutral-200 bg-black">
      <div className="h-[260px] sm:h-[340px] lg:h-[420px]">
        {isCloudinaryVideo(HERO_VIDEO) ? (
          <video
            src={HERO_VIDEO}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="h-full w-full bg-neutral-950 flex items-center justify-center">
            <div className="text-white/70 text-sm font-semibold">Hero video coming soon</div>
          </div>
        )}
      </div>

      <div className="absolute inset-0 bg-black/50" />

      <div className="absolute inset-0 flex items-end pb-14 sm:pb-20">
        <div className="mx-auto w-full max-w-6xl px-4">
          <h2
            key={index}
            className="max-w-xl text-2xl font-light tracking-wide text-white sm:text-4xl transition-opacity duration-1000 font-serif"
          >
            {texts[index]}
          </h2>
        </div>
      </div>
    </section>
  );
}

/* ---------------- DATA ---------------- */

const PROJECTS = [
  {
    title: "Interior Renovation",
    city: "Toronto, ON",
    description:
      "Complete new house renovation, including painting, flooring, drywall and ceiling repairs, kitchen and bathroom upgrades, and finishing work.",
    images: [
      "/images/proj8a.jpeg",
      "/images/proj8b.jpeg",
      "/images/proj8c.jpeg",
      "/images/proj8d.jpeg",
      "/images/proj8e.jpeg",
      "/images/proj8f.jpeg",
      "/images/proj8g.jpeg",
    ],
    videos: [
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/proj8_qb2z19.mp4",
        title: "Full Renovation Walkthrough",
        city: "Toronto, ON",
        description:
          "Walkthrough video showing the finished space after painting, flooring installation, drywall and ceiling repairs, and final detailing.",
      },
    ],
  },
  {
    title: "Backyard Flooring",
    city: "Oakville, ON",
    description:
      "Custom outdoor wood deck installation, including precise plank layout, multi-level platform construction, and professional staining. The project delivered a clean, modern backyard surface with seamless steps, durable finishing, and a refined natural wood appearance designed for long-term outdoor use.",
    images: [
      "/images/proj12a.jpeg",
      "/images/proj12b.jpeg",
      "/images/proj12c.jpeg",
      "/images/proj12d.jpeg",
      "/images/proj12e.jpeg",
    ],
    videos: [
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/6_muwm8b.mp4",
        title: "Final Walkthrough Video",
        city: "Mississauga, ON",
        description:
          "A smooth walkthrough highlighting the finished wood deck, clean lines, and rich stained finish.",
      },
    ],
  },
  {
    title: "Exterior House Painting",
    city: "Vaughan, ON",
    description:
      "The exterior of this house was fully painted black. The work included proper surface preparation and careful painting of the exterior walls and trim. The result is a clean, modern look with a strong finish that improves the home’s appearance and durability.",
    images: ["/images/proj15a.jpg", "/images/hero2.jpeg", "/images/proj15b.jpg"],
    videos: [],
  },
  {
    title: "Bathroom Renovation",
    city: "GTA, ON",
    description:
      "Complete bathroom renovation, including full demolition, waterproofing, tile installation, vanity and countertop installation, bathtub and glass shower enclosure, plumbing fixture upgrades, drywall repair, painting, and finishing work.",
    images: [
      "/images/proj4a.jpeg",
      "/images/proj4b.jpeg",
      "/images/proj4c.jpeg",
      "/images/proj4d.jpeg",
      "/images/proj4e.JPG",
      "/images/proj4f.JPG",
      "/images/proj4g.JPG",
      "/images/proj4h.jpeg",
    ],
    videos: [
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/12_hg6jbe.mp4",
        title: "Before our work",
        city: "",
        description: "",
      },
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/11_fb7hgw.mp4",
        title: "After our work",
        city: "",
        description: "",
      },
    ],
  },
  {
    title: "Apartment Renovation",
    city: "Toronto, ON",
    description:
      "Complete kitchen renovation, including demolition, cabinetry installation, countertop replacement, backsplash tile, flooring, electrical and plumbing updates, drywall repair, painting, and finishing work.",
    images: [
      "/images/proj14a.jpeg",
      "/images/proj14b.jpeg",
      "/images/proj14c.jpeg",
      "/images/proj14d.jpeg",
    ],
    videos: [
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/10_uzzuc1.mp4",
        title: "Final Walkthrough Video",
        city: "Mississauga, ON",
        description: "",
      },
    ],
  },
  {
    title: "Beautiful Cottage Full Renovation",
    city: "Barrie, ON",
    description:
      "Complete cottage renovation, including interior painting, drywall installation and repairs, new flooring, and finishing work.",
    images: ["/images/20.jpg", "/images/21.jpg"],
    videos: [
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/20_cvsqhb.mp4",
        title: "Amazing Final Walkthrough Video",
        city: "Barrie, ON",
        description: "",
      },
    ],
  },
  {
    title: "Living Room Renovation",
    city: "Toronto, ON",
    description:
      "Renovation included drywall repairs, custom wall paneling, and full interior painting for a smooth, clean finish.",
    images: ["/images/proj13a.jpeg", "/images/proj13b.jpeg", "/images/proj13c.jpeg"],
    videos: [
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/15_kuosai.mp4",
        title: "Before our work",
        city: "",
        description: "",
      },
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/14_qcfyai.mp4",
        title: "After our work",
        city: "",
        description: "",
      },
    ],
  },
  {
    title: "Apartment Renovation",
    city: "Toronto, ON",
    description:
      "Complete apartment renovation, including kitchen, living areas, and bathroom upgrades, along with full interior painting, new flooring installation, drywall repairs, and finishing work.",
    images: [
      "/images/proj6a.jpg",
      "/images/proj6b.jpg",
      "/images/proj6c.jpg",
      "/images/proj6d.jpg",
      "/images/proj6e.jpg",
      "/images/proj6f.jpg",
      "/images/proj6g.jpg",
    ],
    videos: [],
  },
  {
    title: "Stair Repair and Paint",
    city: "Scarborough, ON",
    description: "This project involved repairing and upgrading an interior staircase…",
    images: ["/images/proj16a.jpeg", "/images/proj16b.jpeg", "/images/proj16c.jpeg"],
    videos: [
      {
        src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/13_qstmbv.mp4",
        title: "Final result",
        city: "",
        description: "",
      },
    ],
  },
  {
    title: "Apartment Renovation",
    city: "Mississauga, ON",
    description:
      "Complete kitchen renovation, including new cabinetry, countertop installation, full interior painting, and new flooring throughout the space.",
    images: ["/images/proj5a.jpg", "/images/proj5b.jpg", "/images/proj5c.jpg"],
    videos: [],
  },
  {
    title: "Living Space Renovation & Design",
    city: "Markham, ON",
    description:
      "Living space renovation, including custom wall paneling, built-in shelving, fireplace surround installation, painting, and finishing details.",
    images: ["/images/proj9a.jpeg", "/images/proj9b.jpeg", "/images/proj9c.jpeg"],
    videos: [],
  },
];

const EXTRA_VIDEOS = [
  {
    src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/32_c3d7rl.mp4",
    title: "Project Walkthrough",
    city: "Markham, ON",
    description: "",
  },
  {
    src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/30_edvvve.mp4",
    title: "Renovation Progress",
    city: "Mississauga, ON",
    description: "",
  },
  {
    src: "https://res.cloudinary.com/drpj52sog/video/upload/f_auto,q_auto/31_l2o0ev.mp4",
    title: "Finishing & Details",
    city: "Ajax, ON",
    description: "",
  },
];

/* ---------------- PAGE ---------------- */

export default function ProjectPage() {
  const [lightbox, setLightbox] = useState(null);

  return (
    <main className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-14">
        <Link
          to="/#projects"
          className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
        >
          <span aria-hidden>←</span> Back to Projects
        </Link>

        <div className="mt-6">
          <VideoHero />
        </div>

        <h1 className="mt-4 text-2xl font-extrabold text-black sm:text-3xl lg:text-4xl">
          Our Projects
        </h1>

        <p className="mt-3 text-sm text-neutral-700">Tap any image to view fullscreen and swipe.</p>

        <div className="mt-10 space-y-10 sm:space-y-14">
          {PROJECTS.map((p, pIndex) => (
            <section
              key={p.title + pIndex}
              className="rounded-2xl border border-neutral-200 bg-white p-4 sm:p-6 shadow-sm"
            >
              <div className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                Project {pIndex + 1}
              </div>

              <div className="rounded-2xl bg-gradient-to-br from-[#f8f5f2] to-[#f1ece6] px-5 py-4 shadow-sm border border-[#e6e0d9]">
                <h2 className="text-xl font-bold text-[#2b2b2b] sm:text-2xl">{p.title}</h2>
                <div className="mt-1 text-sm italic text-[#6b5e55]">{p.city}</div>
                {p.description && (
                  <p className="mt-3 text-sm leading-relaxed text-[#3f3a36]">{p.description}</p>
                )}
              </div>

              {/* IMAGES */}
              <div className="mt-6 grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {p.images.map((img, i) => (
                  <button
                    key={img + i}
                    onClick={() =>
                      setLightbox({ images: p.images, index: i, title: p.title, city: p.city })
                    }
                    className="group overflow-hidden rounded-xl focus:outline-none focus:ring-2 focus:ring-black/30"
                    aria-label={`Open ${p.title} image ${i + 1}`}
                  >
                    <img
                      src={img}
                      alt={`${p.title} image ${i + 1}`}
                      className="h-56 w-full rounded-xl object-cover transition group-hover:scale-105 sm:h-64"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>

              {/* VIDEOS */}
              {Array.isArray(p.videos) && p.videos.length > 0 && (
                <div className="mt-10">
                  <h3 className="text-lg font-bold text-black sm:text-xl">Videos</h3>

                  <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
                    {p.videos.map((video, i) => (
                      <div key={(video?.src || "video") + i}>
                        <div className="mb-3 rounded-xl bg-gradient-to-br from-[#eef2f7] to-[#e4ebf5] px-4 py-3 shadow-sm border border-[#d7e0ee]">
                          <div className="text-sm font-semibold text-[#1f2a44]">
                            {video.title || "Project Video"}
                            {video.city ? (
                              <span className="ml-1 italic text-[#4b5d80]">— {video.city}</span>
                            ) : null}
                          </div>

                          {video.description ? (
                            <p className="mt-2 text-sm leading-relaxed text-[#2e3b55]">
                              {video.description}
                            </p>
                          ) : null}
                        </div>

                        <VideoPlayer src={video.src} title={video.title} />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* EXTRA VIDEOS SECTION */}
        <section className="mt-14 sm:mt-20">
          <h2 className="text-2xl font-extrabold text-black sm:text-3xl">
            Full Interior House Walkthrough
          </h2>

          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {EXTRA_VIDEOS.map((video, i) => (
              <div key={(video.src || "extra") + i}>
                <div className="mb-2">
                  <div className="text-sm font-semibold text-neutral-900">
                    {video.title} <span className="text-neutral-500">— {video.city}</span>
                  </div>
                  {video.description && (
                    <p className="mt-1 text-sm leading-relaxed text-neutral-600">
                      {video.description}
                    </p>
                  )}
                </div>

                <VideoPlayer src={video.src} title={video.title} />
              </div>
            ))}
          </div>
        </section>
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

  let startX = useMemo(() => ({ v: 0 }), []);

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
        onTouchStart={(e) => (startX.v = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const delta = e.changedTouches[0].clientX - startX.v;
          if (delta > 50) prev();
          if (delta < -50) next();
        }}
      >
        <div className="mb-3 flex items-start justify-between gap-3">
          <div className="text-white">
            <div className="text-sm font-semibold">{title}</div>
            <div className="text-xs text-white/70">{city}</div>
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
