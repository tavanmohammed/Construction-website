import { site } from "../data/siteData";
import logo from "../assets/builda.svg"; // <-- your logo

export default function TopContactBar() {
  return (
    <div className="bg-black text-white">
      <div className="mx-auto max-w-6xl px-4 py-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

         
    {/* LEFT */}
    <div className="flex items-center gap-4">
    {/* LOGO */}
      <img
        src={logo}
        alt={`${site.companyName} logo`}
        className="h-24 sm:h-28 lg-40 xl:h-48 w-auto object-contain"

      />

  {/* COMPANY NAME + TAGLINE */}
    <div className="leading-tight">
    <div className="text-2xl font-bold uppercase tracking-[0.28em]">
      {site.companyName}
    </div>
    <div className="mt-1 text-[12px] font-semibold uppercase tracking-[0.22em] text-white/70">
      {site.tagline}
    </div>
    </div>


            <div className="hidden lg:flex items-center gap-10 border-l border-white/15 pl-10">
              <Contact label="Address" value={site.address} />
              <Divider />
              <Contact label="Email" value={site.email} />
              <Divider />
              <Contact label="Phone" value={site.phone} />
            </div>
          </div>

          {/* RIGHT */}
          <a
            href="#contact"
            className="inline-flex rounded-md bg-neutral-800 px-6 py-3 text-sm font-semibold hover:bg-neutral-700 transition"
          >
            Book a Free Consultation
          </a>
        </div>

        {/* MOBILE INFO */}
        <div className="mt-3 grid gap-1 text-xs text-white/80 lg:hidden">
          <div><strong>Address:</strong> {site.address}</div>
          <div><strong>Email:</strong> {site.email}</div>
          <div><strong>Phone:</strong> {site.phone}</div>
        </div>
      </div>
    </div>
  );
}

function Contact({ label, value }) {
  return (
    <div className="leading-tight">
      <div className="text-xs font-semibold">{label}</div>
      <div className="mt-1 text-sm text-white/80">{value}</div>
    </div>
  );
}

function Divider() {
  return <div className="h-10 w-px bg-white/15" />;
}
