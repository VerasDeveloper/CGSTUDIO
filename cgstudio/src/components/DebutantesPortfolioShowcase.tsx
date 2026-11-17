import React, { useState } from 'react';
import { ChevronDown, Maximize2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  DEBUTANTE_EXPERIENCE_ITEMS,
  PortfolioSlot,
} from '../data/studioData';
import { EditorialImage } from './EditorialImage';

interface DebutantesPortfolioShowcaseProps {
  debutanteSlot: PortfolioSlot;
  onOpenLightbox: (slot: PortfolioSlot) => void;
}

export const DebutantesPortfolioShowcase: React.FC<
  DebutantesPortfolioShowcaseProps
> = ({ debutanteSlot, onOpenLightbox }) => {
  const [showExperience, setShowExperience] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* 1. Apresentação Principal — Debutantes · CG Studio */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
        {/* Main Existing Debutante Photography */}
        <div className="lg:col-span-7">
          {debutanteSlot.image && (
            <div className="group flex flex-col">
              <button
                type="button"
                onClick={() => onOpenLightbox(debutanteSlot)}
                aria-label={`Ampliar fotografia: ${debutanteSlot.title}`}
                className="relative w-full h-[360px] sm:h-[440px] lg:h-[520px] overflow-hidden cursor-zoom-in text-left block focus-visible:outline-2 focus-visible:outline-caramel"
              >
                <EditorialImage
                  src={debutanteSlot.image}
                  alt={debutanteSlot.imageAlt || debutanteSlot.title}
                  containerClassName="w-full h-full"
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                />
                <span className="absolute top-4 right-4 w-10 h-10 bg-ivory/90 text-espresso flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Maximize2 className="w-4 h-4" strokeWidth={1.5} />
                </span>
              </button>
              <p className="pt-3 text-xs tracking-[0.06em] text-deep/65">
                {debutanteSlot.title} · Clique na fotografia para ampliar
              </p>
            </div>
          )}
        </div>

        {/* Editorial Presentation Copy */}
        <div className="lg:col-span-5 space-y-6">
          <p className="text-xs tracking-[0.14em] text-caramel">
            DEBUTANTES · CG STUDIO
          </p>

          <h3
            className="font-display font-normal text-deep leading-[1.06]"
            style={{ fontSize: 'clamp(2rem, 3.4vw, 3.1rem)' }}
          >
            Um sonho em{' '}
            <span className="italic text-espresso">cada detalhe</span>.
          </h3>

          <p className="font-sans text-sm sm:text-base text-deep/80 leading-[1.75]">
            Os 15 anos marcam o início de uma nova fase, repleta de sonhos e descobertas. No CG Studio, cada produção é pensada para valorizar a personalidade, a beleza e a essência de quem vive esse momento tão especial.
          </p>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowExperience((prev) => !prev)}
              aria-expanded={showExperience}
              className="inline-flex items-center gap-2 min-h-[44px] py-2 border-b border-espresso/40 hover:border-caramel text-xs sm:text-[13px] tracking-[0.06em] text-espresso hover:text-caramel transition-colors cursor-pointer"
            >
              <span>
                {showExperience
                  ? 'Recolher a experiência da debutante'
                  : 'Conheça a experiência da debutante'}
              </span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-300 ${
                  showExperience ? 'rotate-180' : ''
                }`}
                strokeWidth={1.5}
              />
            </button>
          </div>
        </div>
      </div>

      {/* 2. A Experiência CG Studio (Expandable Editorial Spread, No Commercial CTAs) */}
      <AnimatePresence initial={false}>
        {showExperience && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-12 pt-10 border-t border-sand/70">
              <div className="mb-8 max-w-xl">
                <p className="text-xs tracking-[0.14em] text-caramel mb-2">
                  A experiência CG Studio
                </p>
                <p className="font-display italic text-2xl sm:text-3xl text-espresso leading-snug">
                  Delicadeza, personalidade e cuidado em uma celebração única dos 15 anos.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8">
                {DEBUTANTE_EXPERIENCE_ITEMS.map((item) => (
                  <div
                    key={item.index}
                    className="pt-4 border-t border-sand/60 space-y-2"
                  >
                    <div className="flex items-baseline gap-2.5">
                      <span className="font-display text-base text-caramel tabular-nums">
                        {item.index}.
                      </span>
                      <h4 className="font-display text-xl sm:text-2xl text-deep font-normal">
                        {item.title}
                      </h4>
                    </div>
                    <p className="font-sans text-sm text-deep/80 leading-[1.7]">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
