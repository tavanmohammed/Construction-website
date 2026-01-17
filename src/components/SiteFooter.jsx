import { navLinks, site, serviceAreas } from "../data/siteData";
import logo from "../assets/builda.svg";

export default function SiteFooter() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* subtle pattern strip */}
      <div className="h-14 bg-[linear-gradient(135deg,rgba(255,255,255,0.06)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.06)_50%,rgba(255,255,255,0.06)_75%,transparent_75%,transparent)] bg-[length:24px_24px]" />

      <div className="mx-auto max-w-6xl px-4 py-14">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Logo + blurb */}
          <div>
            <div className="flex items-center gap-4">
              <img src={logo} alt="logo" className="h-14 w-auto" />
              <div>
                <div className="text-lg font-extrabold tracking-wide">
                  {site.companyName.toUpperCase()}
                </div>
                <div className="text-sm text-white/70">{site.tagline}</div>
              </div>
            </div>

            <p className="mt-6 text-sm leading-6 text-white/70">
              Trusted construction & renovation services across Toronto and the GTA.
              We focus on clean workmanship, clear timelines, and solid results.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <div className="text-lg font-extrabold">Quick Links</div>
            <div className="mt-5 space-y-3 text-sm">
              {navLinks.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  className="flex items-center gap-3 text-white/80 hover:text-white"
                >
                  <span className="text-white/60">→</span>
                  <span>{l.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <div className="text-lg font-extrabold">Connect with Us</div>

            <div className="mt-5 space-y-3 text-sm text-white/80">
              <div>
                <span className="font-semibold text-white">Phone:</span>{" "}
                {site.phone}
              </div>
              <div>
                <span className="font-semibold text-white">Email:</span>{" "}
                {site.email}
              </div>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm hover:bg-white/10"
              >
                Get Directions
              </a>

              <a
                href="#contact"
                className="mt-4 inline-block text-sm font-semibold underline underline-offset-4 hover:text-white"
              >
                Schedule Your Free Consultation →
              </a>
            </div>
          </div>

          {/* Service Areas */}
          <div>
            <div className="text-lg font-extrabold">Service Areas</div>
            <div className="mt-5 grid grid-cols-2 gap-x-8 gap-y-2 text-sm text-white/80">
              {serviceAreas.areas.slice(0, 12).map((a) => (
                <div key={a}>{a}</div>
              ))}
            </div>

            <a
              href="#"
              className="mt-6 inline-block text-sm font-semibold underline underline-offset-4 hover:text-white"
            >
              View full service area map →
            </a>
          </div>
        </div>

        {/* Service Area Map */}
<div className="mt-12 rounded-xl border border-white/10 bg-white/5 p-3">
  <iframe
    title="Greater Toronto Area"
    className="h-64 w-full rounded-lg"
    loading="lazy"
    src="https://www.google.com/maps?q=Greater+Toronto+Area,ON&output=embed"
  />
</div>


        <div className="mt-10 text-center text-xs text-white/60">
          {site.companyName} proudly serves Toronto & the GTA. © {new Date().getFullYear()}{" "}
          {site.companyName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
