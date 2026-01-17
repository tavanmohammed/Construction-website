import { serviceAreas } from "../data/siteData";

export default function ServiceAreasSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 lg:pb-20">
        <div className="rounded-2xl border border-neutral-200 bg-white px-6 py-10 shadow-sm sm:px-10">
          <h2 className="text-center text-4xl font-extrabold tracking-tight text-black">
            {serviceAreas.title}
          </h2>

          <p className="mx-auto mt-4 max-w-3xl text-center text-[15px] leading-7 text-neutral-700">
            {serviceAreas.description}
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {serviceAreas.areas.map((a) => (
              <AreaPill key={a} text={a} />
            ))}
          </div>

          <div className="mt-10 text-center text-[15px] text-neutral-700">
            {serviceAreas.helperText}{" "}
            <a
              href={serviceAreas.helperHref}
              className="font-semibold text-black underline"
            >
              {serviceAreas.helperLinkText}
            </a>{" "}
            — we likely build there too.
          </div>

          <div className="mt-8 overflow-hidden rounded-xl border border-neutral-200">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white px-6 py-4 text-left text-[15px] font-semibold text-black hover:bg-neutral-50"
            >
              <span>{serviceAreas.mapCtaText}</span>
              <span className="text-lg">▾</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function AreaPill({ text }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-neutral-200 bg-white px-5 py-3 text-sm text-black shadow-[0_1px_0_rgba(0,0,0,0.02)]">
      <span className="h-2 w-2 rounded-full bg-black" />
      <span className="font-medium">{text}</span>
    </div>
  );
}
