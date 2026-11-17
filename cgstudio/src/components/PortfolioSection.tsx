import React, { useEffect, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Instagram,
  Maximize2,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  PORTFOLIO_SLOTS,
  PortfolioSlot,
  STUDIO_CONFIG,
} from '../data/studioData';
import { EditorialImage } from './EditorialImage';
import { DebutantesPortfolioShowcase } from './DebutantesPortfolioShowcase';
import { NoivasPortfolioShowcase } from './NoivasPortfolioShowcase';
import { TestimonialsCarousel } from './TestimonialsCarousel';

type FilterType = 'noivas' | 'debutantes' | 'social';

const FILTERS: { id: FilterType; label: string }[] = [
  { id: 'noivas', label: 'Noivas' },
  { id: 'debutantes', label: 'Debutantes' },
  { id: 'social', label: 'Eventos sociais' },
];

export const PortfolioSection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<FilterType>('noivas');
  const [lightboxItem, setLightboxItem] = useState<PortfolioSlot | null>(null);

  const visibleItems = PORTFOLIO_SLOTS.filter(
    (item) => item.category === activeFilter
  );

  const bridalSlot = PORTFOLIO_SLOTS.find((item) => item.category === 'noivas');
  const debutanteSlot = PORTFOLIO_SLOTS.find(
    (item) => item.category === 'debutantes'
  );
  const gridItems = visibleItems.filter(
    (item) => item.category !== 'noivas' && item.category !== 'debutantes'
  );

  const imageItems = visibleItems.filter((item) => Boolean(item.image));

  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!lightboxItem || imageItems.length === 0) return;
    const currentIndex = imageItems.findIndex((i) => i.id === lightboxItem.id);
    if (currentIndex === -1) return;
    const nextIndex =
      direction === 'next'
        ? (currentIndex + 1) % imageItems.length
        : (currentIndex - 1 + imageItems.length) % imageItems.length;
    setLightboxItem(imageItems[nextIndex]);
  };

  useEffect(() => {
    if (!lightboxItem) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxItem(null);
      if (e.key === 'ArrowRight') navigateLightbox('next');
      if (e.key === 'ArrowLeft') navigateLightbox('prev');
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  });

  return (
    <section
      id="portfolio"
      className="py-24 lg:py-32 bg-champagne/65 border-b border-sand/70"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Portfolio Header & Category Filters */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12 lg:mb-16">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.14em] text-caramel mb-3">
              Portfólio &amp; Curadoria Visual
            </p>
            <h2
              className="font-display font-normal text-deep leading-[1.06]"
              style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)' }}
            >
              Estética editorial em{' '}
              <span className="italic text-espresso">pele natural</span> e acabamentos atemporais.
            </h2>
          </div>

          <div
            role="group"
            aria-label="Filtrar portfólio por categoria"
            className="flex flex-wrap items-center gap-2"
          >
            {FILTERS.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`min-h-[40px] px-4 py-2 text-xs tracking-[0.06em] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-espresso text-ivory'
                    : 'bg-ivory/80 text-deep/80 border border-sand/80 hover:border-espresso/40'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Noivas Editorial Presentation */}
        {activeFilter === 'noivas' && bridalSlot && (
          <NoivasPortfolioShowcase
            bridalSlot={bridalSlot}
            onOpenLightbox={setLightboxItem}
          />
        )}

        {/* Featured Debutantes Editorial Presentation */}
        {activeFilter === 'debutantes' && debutanteSlot && (
          <DebutantesPortfolioShowcase
            debutanteSlot={debutanteSlot}
            onOpenLightbox={setLightboxItem}
          />
        )}

        {/* Remaining Category Gallery Grid */}
        {gridItems.length > 0 && (
          <div className="space-y-10">
            {gridItems.map((slot) => (
              <motion.article
                key={slot.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="group"
              >
                {slot.image ? (
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                    <div className="lg:col-span-7">
                      <button
                        type="button"
                        onClick={() => setLightboxItem(slot)}
                        aria-label={`Ampliar fotografia: ${slot.title}`}
                        className="relative w-full h-[360px] sm:h-[440px] lg:h-[500px] overflow-hidden cursor-zoom-in text-left block focus-visible:outline-2 focus-visible:outline-caramel"
                      >
                        <EditorialImage
                          src={slot.image}
                          alt={slot.imageAlt || slot.title}
                          containerClassName="w-full h-full"
                          className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <span className="absolute top-4 right-4 w-10 h-10 bg-ivory/90 text-espresso flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                          <Maximize2 className="w-4 h-4" strokeWidth={1.5} />
                        </span>
                      </button>
                      <p className="pt-3 text-xs tracking-[0.06em] text-deep/65">
                        {slot.title} · Clique na fotografia para ampliar
                      </p>
                    </div>

                    <div className="lg:col-span-5 space-y-4">
                      <p className="text-xs tracking-[0.14em] text-caramel">
                        {slot.categoryLabel.toUpperCase()} · {slot.subtitle}
                      </p>
                      <h3
                        className="font-display font-normal text-deep leading-[1.08]"
                        style={{ fontSize: 'clamp(1.9rem, 3vw, 2.8rem)' }}
                      >
                        {slot.title}
                      </h3>
                      <p className="text-sm sm:text-base text-deep/80 leading-[1.75]">
                        {slot.caption}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="max-w-2xl min-h-[260px] bg-ivory/90 border border-sand p-7 sm:p-9 flex flex-col justify-between gap-6">
                    <div className="space-y-2">
                      <p className="text-xs tracking-[0.08em] text-caramel">
                        {slot.categoryLabel} · {slot.subtitle}
                      </p>
                      <h3 className="font-display text-2xl text-deep font-normal leading-snug">
                        {slot.title}
                      </h3>
                      <p className="text-sm text-deep/75 leading-relaxed pt-1">
                        {slot.caption}
                      </p>
                    </div>

                    <div className="pt-5 border-t border-sand/60 flex flex-wrap items-center justify-between gap-3">
                      <span className="text-xs text-deep/60">
                        Portfólio oficial no Instagram
                      </span>
                      <a
                        href={STUDIO_CONFIG.instagramUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 min-h-[40px] text-xs tracking-[0.06em] text-espresso hover:text-caramel transition-colors whitespace-nowrap shrink-0"
                      >
                        <Instagram className="w-4 h-4" strokeWidth={1.5} />
                        <span>Ver {STUDIO_CONFIG.instagramHandle}</span>
                        <ExternalLink className="w-3.5 h-3.5" strokeWidth={1.5} />
                      </a>
                    </div>
                  </div>
                )}
              </motion.article>
            ))}
          </div>
        )}

        {/* Testimonials Carousel: "O carinho de quem viveu." */}
        <TestimonialsCarousel />
      </div>

      {/* Accessible Lightbox Viewer */}
      <AnimatePresence>
        {lightboxItem && lightboxItem.image && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-50 bg-deep/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8"
            role="dialog"
            aria-modal="true"
            aria-label={lightboxItem.title}
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-5xl w-full flex flex-col items-center"
            >
              <div className="w-full flex items-center justify-between text-ivory mb-4 gap-4">
                <div>
                  <p className="text-xs tracking-[0.1em] text-sand">
                    {lightboxItem.categoryLabel} · {lightboxItem.subtitle}
                  </p>
                  <p className="font-display text-2xl">{lightboxItem.title}</p>
                </div>
                <button
                  type="button"
                  onClick={() => setLightboxItem(null)}
                  aria-label="Fechar visualização ampliada"
                  className="w-11 h-11 flex items-center justify-center text-ivory hover:bg-ivory/10 transition-colors cursor-pointer"
                >
                  <X className="w-6 h-6" strokeWidth={1.5} />
                </button>
              </div>

              <div className="relative w-full max-h-[74vh] flex items-center justify-center bg-deep">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.imageAlt || lightboxItem.title}
                  referrerPolicy="no-referrer"
                  className="max-h-[74vh] w-auto object-contain"
                />

                {imageItems.length > 1 && (
                  <>
                    <button
                      type="button"
                      onClick={() => navigateLightbox('prev')}
                      aria-label="Imagem anterior"
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-ivory/90 text-espresso flex items-center justify-center hover:bg-ivory transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigateLightbox('next')}
                      aria-label="Próxima imagem"
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 bg-ivory/90 text-espresso flex items-center justify-center hover:bg-ivory transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </>
                )}
              </div>

              <p className="mt-4 text-xs sm:text-sm text-champagne/85 text-center max-w-xl">
                {lightboxItem.caption}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
