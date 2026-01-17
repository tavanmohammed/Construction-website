import { site } from "../data/siteData";

export default function Footer() {
  return (
    <footer className="bg-black py-10 text-white">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="font-bold tracking-wide">
            {site.companyName} <span className="text-white/60">•</span>{" "}
            {site.tagline}
          </div>
          <div className="text-sm text-white/60">
            © {new Date().getFullYear()} {site.companyName}. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
