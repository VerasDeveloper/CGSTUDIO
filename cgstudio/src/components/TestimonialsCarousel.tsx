import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Star, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { CLIENT_REVIEWS, ClientReview, STUDIO_CONFIG } from '../data/studioData';

export const TestimonialsCarousel: React.FC = () => {
  const [cardsPerView, setCardsPerView] = useState<1 | 2 | 3>(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedReview, setSelectedReview] = useState<ClientReview | null>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const updateCardsPerView = () => {
      const width = window.innerWidth;
      if (width >= 1024) {
        setCardsPerView(3);
      } else if (width >= 640) {
        setCardsPerView(2);
      } else {
        setCardsPerView(1);
      }
    };

    updateCardsPerView();
    window.addEventListener('resize', updateCardsPerView);
    return () => window.removeEventListener('resize', updateCardsPerView);
  }, []);

  const maxIndex = Math.max(0, CLIENT_REVIEWS.length - cardsPerView);

  useEffect(() => {
    setCurrentIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  useEffect(() => {
    if (!selectedReview) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedReview(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [selectedReview]);

  const canGoPrev = currentIndex > 0;
  const canGoNext = currentIndex < maxIndex;

  const handlePrev = () => {
    if (canGoPrev) setCurrentIndex((prev) => prev - 1);
  };

  const handleNext = () => {
    if (canGoNext) setCurrentIndex((prev) => prev + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrev();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNext();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStartRef.current) return;
    const touch = e.changedTouches[0];
    const dx = touch.clientX - touchStartRef.current.x;
    const dy = touch.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        handleNext();
      } else {
        handlePrev();
      }
    }
  };

  const totalPositions = maxIndex + 1;
  const gapPx = cardsPerView === 1 ? 0 : 24;

  return (
    <motion.div
      id="avaliacoes"
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className="mt-24 pt-16 border-t border-sand/80 scroll-mt-24"
    >
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div className="max-w-2xl space-y-3">
          <p className="text-xs tracking-[0.14em] text-caramel">
            Avaliações reais das clientes
          </p>
          <h3
            className="font-display font-normal text-deep leading-[1.06]"
            style={{ fontSize: 'clamp(2rem, 3.4vw, 3.1rem)' }}
          >
            O carinho de <span className="italic text-espresso">quem viveu</span>.
          </h3>
          <p className="text-sm sm:text-base text-deep/75 leading-relaxed">
            Relatos reais publicados por noivas e clientes no Google e no Instagram do {STUDIO_CONFIG.brandShort}.
          </p>
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center gap-3 self-start md:self-auto">
          <motion.button
            type="button"
            onClick={handlePrev}
            disabled={!canGoPrev}
            whileHover={canGoPrev ? { x: -2 } : undefined}
            transition={{ duration: 0.2 }}
            aria-label="Avaliação anterior"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
              canGoPrev
                ? 'border-espresso/40 bg-ivory text-espresso hover:bg-espresso hover:text-ivory cursor-pointer'
                : 'border-sand/60 bg-champagne/30 text-deep/30 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>

          <motion.button
            type="button"
            onClick={handleNext}
            disabled={!canGoNext}
            whileHover={canGoNext ? { x: 2 } : undefined}
            transition={{ duration: 0.2 }}
            aria-label="Próxima avaliação"
            className={`w-11 h-11 rounded-full border flex items-center justify-center transition-colors ${
              canGoNext
                ? 'border-espresso/40 bg-ivory text-espresso hover:bg-espresso hover:text-ivory cursor-pointer'
                : 'border-sand/60 bg-champagne/30 text-deep/30 cursor-not-allowed'
            }`}
          >
            <ChevronRight className="w-5 h-5" strokeWidth={1.5} />
          </motion.button>
        </div>
      </div>

      {/* Horizontal Carousel Viewport */}
      <div
        role="region"
        aria-roledescription="carrossel"
        aria-label="Depoimentos reais das clientes"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="overflow-hidden focus-visible:outline-2 focus-visible:outline-caramel"
      >
        <motion.div
          animate={{
            x: `calc(-${currentIndex} * ((100% + ${gapPx}px) / ${cardsPerView}))`,
          }}
          transition={{ duration: 0.48, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-stretch"
          style={{ gap: `${gapPx}px` }}
        >
          {CLIENT_REVIEWS.map((review, index) => {
            const isCenterDesktop =
              cardsPerView === 3 && index === currentIndex + 1;
            const isLongReview = review.text.length > 135;

            return (
              <motion.article
                key={review.id}
                animate={{
                  scale: isCenterDesktop ? 1 : cardsPerView === 3 ? 0.98 : 1,
                  opacity:
                    cardsPerView === 3
                      ? isCenterDesktop
                        ? 1
                        : 0.88
                      : 1,
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  flex: `0 0 calc((100% - ${(cardsPerView - 1) * gapPx}px) / ${cardsPerView})`,
                }}
                className={`rounded-xl border p-7 sm:p-8 flex flex-col justify-between transition-colors duration-400 ${
                  isCenterDesktop
                    ? 'bg-soft border-espresso/30'
                    : 'bg-ivory/90 border-sand/80'
                }`}
              >
                <div>
                  {/* Editorial Large Quote + Source / Stars */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <span
                      aria-hidden="true"
                      className="font-display text-5xl leading-none text-caramel/75 select-none"
                    >
                      “
                    </span>

                    {review.source === 'Google' && review.stars === 5 && (
                      <div
                        className="flex items-center gap-1 pt-1"
                        aria-label="Avaliação 5 estrelas no Google"
                      >
                        {Array.from({ length: 5 }).map((_, starIdx) => (
                          <Star
                            key={starIdx}
                            className="w-3.5 h-3.5 text-caramel fill-caramel"
                            strokeWidth={1.5}
                          />
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Review Text (4-line preview on longer testimonials, full text on short ones) */}
                  <p
                    className={`font-sans text-sm sm:text-[15px] text-deep/85 leading-[1.7] whitespace-pre-line ${
                      isLongReview ? 'line-clamp-4' : ''
                    }`}
                  >
                    {review.text}
                  </p>

                  {isLongReview && (
                    <button
                      type="button"
                      onClick={() => setSelectedReview(review)}
                      className="mt-3 inline-flex items-center text-xs tracking-[0.06em] text-espresso hover:text-caramel border-b border-espresso/30 hover:border-caramel pb-0.5 transition-colors cursor-pointer"
                    >
                      Ler mais
                    </button>
                  )}
                </div>

                {/* Author & Origin */}
                <footer className="mt-7 pt-5 border-t border-sand/60 flex items-baseline justify-between gap-3">
                  <h4 className="font-display text-2xl text-deep font-normal tracking-wide">
                    {review.author}
                  </h4>
                  <span className="text-xs tracking-[0.08em] text-caramel whitespace-nowrap">
                    {review.source}
                  </span>
                </footer>
              </motion.article>
            );
          })}
        </motion.div>
      </div>

      {/* Discrete Position Indicators */}
      <div
        className="mt-8 flex items-center justify-between gap-4"
        aria-live="polite"
      >
        <div className="flex items-center gap-2" role="tablist" aria-label="Posição das avaliações">
          {Array.from({ length: totalPositions }).map((_, idx) => {
            const isActive = idx === currentIndex;
            return (
              <button
                key={idx}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Ir para posição ${idx + 1} de ${totalPositions}`}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'w-7 bg-espresso'
                    : 'w-2 bg-sand hover:bg-caramel/70'
                }`}
              />
            );
          })}
        </div>

        <p className="text-xs text-deep/60 tabular-nums">
          {currentIndex + 1} / {totalPositions}
        </p>
      </div>

      {/* Full Testimonial Modal */}
      <AnimatePresence>
        {selectedReview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setSelectedReview(null)}
            className="fixed inset-0 z-50 bg-deep/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-modal-author"
          >
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.985 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory border border-sand rounded-xl w-full max-w-xl max-h-[85vh] overflow-y-auto p-7 sm:p-10"
            >
              <div className="flex items-start justify-between gap-4 pb-5 border-b border-sand/70">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-xs tracking-[0.1em] text-caramel">
                      {selectedReview.source}
                    </span>
                    {selectedReview.source === 'Google' &&
                      selectedReview.stars === 5 && (
                        <span
                          className="inline-flex items-center gap-0.5"
                          aria-label="Avaliação 5 estrelas no Google"
                        >
                          {Array.from({ length: 5 }).map((_, starIdx) => (
                            <Star
                              key={starIdx}
                              className="w-3.5 h-3.5 text-caramel fill-caramel"
                              strokeWidth={1.5}
                            />
                          ))}
                        </span>
                      )}
                  </div>
                  <h4
                    id="review-modal-author"
                    className="font-display text-3xl text-deep font-normal"
                  >
                    {selectedReview.author}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedReview(null)}
                  aria-label="Fechar depoimento completo"
                  className="w-10 h-10 rounded-full flex items-center justify-center text-espresso hover:bg-champagne/70 transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              <div className="pt-6">
                <span
                  aria-hidden="true"
                  className="font-display text-5xl leading-none text-caramel/75 block mb-2 select-none"
                >
                  “
                </span>
                <p className="font-sans text-base text-deep/90 leading-[1.75] whitespace-pre-line">
                  {selectedReview.text}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
