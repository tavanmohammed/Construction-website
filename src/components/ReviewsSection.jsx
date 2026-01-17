import { reviews } from "../data/siteData";

export default function ReviewsSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 py-16 lg:py-20">
        <div className="text-center">
          <h2 className="text-4xl font-extrabold tracking-tight text-black">
            {reviews.heading}
          </h2>

          <div className="mt-4 text-2xl font-extrabold text-black">
            {reviews.subheading}
          </div>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-7 text-neutral-700">
            {reviews.description}
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {reviews.cards.map((r, idx) => (
            <ReviewCard key={idx} review={r} />
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-neutral-200 bg-white py-10 text-center shadow-sm">
          <a
            href={reviews.ctaHref}
            className="text-3xl font-extrabold text-black hover:underline"
          >
            {reviews.ctaText}
          </a>
        </div>
      </div>
    </section>
  );
}

function ReviewCard({ review }) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-8 shadow-sm">
      <Stars count={review.stars ?? 5} />
      <p className="mt-6 text-[15px] leading-7 text-neutral-800">{review.text}</p>
      <div className="mt-8 text-sm font-semibold text-neutral-900">
        {review.name}
      </div>
    </div>
  );
}

function Stars({ count = 5 }) {
  return (
    <div className="text-[22px] leading-none">
      {"★".repeat(count)}
    </div>
  );
}
