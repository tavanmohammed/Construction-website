import { site } from "../data/siteData";

export default function StatsSection() {
  const stats = site.stats ?? []; // ✅ never crashes

  return (
    <section className="bg-black py-16 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={i} className="rounded-xl border border-white/10 bg-white/5 p-6">
              <div className="text-4xl font-extrabold text-yellow-400">
                {s.value}
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
