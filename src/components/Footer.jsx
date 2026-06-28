const links = [
  { label: 'Games', href: '#games' },
  { label: 'Setup', href: '#setup' },
  { label: 'Location', href: '#location' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#070707] px-5 py-10 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-heading text-4xl leading-none text-white">GOAT GAMING</p>
          <p className="mt-2 text-sm text-white/60">Where Legends Play.</p>
        </div>
        <nav aria-label="Quick links">
          <p className="mb-3 text-xs font-black uppercase text-white/40">Quick Links</p>
          <div className="flex flex-wrap gap-5">
            {links.map((link) => (
              <a key={link.href} href={link.href} className="text-sm font-semibold uppercase text-white/60 transition hover:text-white">
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      </div>
    </footer>
  );
}
