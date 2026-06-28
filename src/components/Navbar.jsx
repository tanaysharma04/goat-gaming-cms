import { useEffect, useState } from 'react';
import { FaBars, FaGamepad, FaTimes } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Games', href: '#games' },
  { label: 'Setup', href: '#setup' },
  { label: 'Location', href: '#location' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const headerClass =
    'fixed left-0 right-0 top-0 z-50 transition-all duration-300 ' +
    (isScrolled
      ? 'border-b border-white/10 bg-obsidian/75 shadow-premium backdrop-blur-xl'
      : 'bg-transparent');

  const mobileMenuClass =
    'overflow-hidden border-white/10 bg-obsidian/95 backdrop-blur-xl transition-all duration-300 md:hidden ' +
    (isOpen ? 'max-h-80 border-t' : 'max-h-0');

  return (
    <header className={headerClass}>
      <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="group flex items-center gap-3" onClick={() => setIsOpen(false)}>
          <span className="grid h-10 w-10 place-items-center rounded-lg border border-white/10 bg-white/10 text-plasma shadow-glow transition group-hover:border-plasma/60">
            <FaGamepad aria-hidden="true" />
          </span>
          <span className="font-heading text-3xl leading-none text-white">GOAT GAMING</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold uppercase text-white/70 transition hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>

        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-lg border border-white/10 bg-white/10 text-white md:hidden"
          aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
          onClick={() => setIsOpen((value) => !value)}
        >
          {isOpen ? <FaTimes aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </nav>

      <div className={mobileMenuClass}>
        <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="rounded-lg px-3 py-3 text-sm font-semibold uppercase text-white/80 transition hover:bg-white/10 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}
