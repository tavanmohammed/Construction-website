import { navLinks } from "../data/siteData";

export default function MainNavbar() {
  return (
    <header className="bg-black">
      <div className="mx-auto max-w-6xl px-4">
        <nav className="hidden lg:flex items-center">
          {navLinks.map((link, i) => (
            <div key={link.label} className="flex items-stretch">
              <a
                href={link.href}
                className="px-10 py-4 text-sm font-semibold text-white hover:bg-white/10 transition"
              >
                {link.label}
              </a>
              {i !== navLinks.length - 1 && (
                <div className="my-2 w-px bg-white/15" />
              )}
            </div>
          ))}
        </nav>

        {/* MOBILE MENU */}
        <div className="lg:hidden py-3">
          <details className="group">
            <summary className="cursor-pointer rounded-md border border-white/20 px-4 py-2 text-sm font-semibold text-white">
              Menu
            </summary>
            <div className="mt-2 rounded-md border border-white/15 bg-black">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  );
}
