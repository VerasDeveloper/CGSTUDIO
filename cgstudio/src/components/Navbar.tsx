import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { STUDIO_CONFIG } from '../data/studioData';

interface NavbarProps {
  onScheduleClick: () => void;
}

const NAV_LINKS = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Quem sou?', href: '#sobre' },
  { label: 'Pacotes', href: '#pacotes' },
  { label: 'Portfólio', href: '#portfolio' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Contato', href: '#agendamento' },
];

export const Navbar: React.FC<NavbarProps> = ({ onScheduleClick }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleMobileNav = (href: string) => {
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`sticky top-0 z-40 transition-colors duration-200 ${
        scrolled
          ? 'bg-ivory/95 backdrop-blur-md border-b border-sand/60'
          : 'bg-ivory/90 backdrop-blur-sm border-b border-transparent'
      }`}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 h-16 md:h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Single clean wordmark */}
        <a
          href="#topo"
          className="font-display text-2xl md:text-[1.7rem] font-medium tracking-[0.14em] text-espresso whitespace-nowrap shrink-0"
        >
          {STUDIO_CONFIG.brandShort}
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Navegação principal"
          className="hidden md:flex items-center gap-5 lg:gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-[13px] tracking-[0.06em] text-deep/80 hover:text-espresso transition-colors duration-150 whitespace-nowrap shrink-0 py-1 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-px after:bg-caramel hover:after:w-full after:transition-all after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single primary action + Mobile trigger */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onScheduleClick}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 min-h-[40px] bg-espresso text-ivory text-[13px] tracking-[0.06em] hover:bg-deep transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
          >
            Agendar meu momento
          </button>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            aria-expanded={mobileOpen}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 text-espresso hover:bg-champagne/60 transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
            className="md:hidden bg-ivory border-b border-sand/80 px-5 pb-6 pt-3"
          >
            <nav aria-label="Menu mobile" className="flex flex-col divide-y divide-sand/50">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMobileNav(link.href);
                  }}
                  className="py-3.5 text-base tracking-[0.04em] text-deep hover:text-espresso transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </nav>
            <button
              type="button"
              onClick={() => {
                setMobileOpen(false);
                onScheduleClick();
              }}
              className="mt-4 w-full min-h-[44px] py-3 px-6 bg-espresso text-ivory text-sm tracking-[0.06em] hover:bg-deep transition-colors cursor-pointer"
            >
              Agendar meu momento
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
