import React from 'react';
import { ArrowDownRight } from 'lucide-react';
import { motion } from 'motion/react';
import { STUDIO_CONFIG, STUDIO_IMAGES } from '../data/studioData';
import { EditorialImage } from './EditorialImage';

interface HeroSectionProps {
  onScheduleClick: () => void;
  onExploreServices: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScheduleClick,
  onExploreServices,
}) => {
  return (
    <section
      id="topo"
      className="relative bg-ivory pt-6 pb-16 sm:pt-10 sm:pb-20 lg:pt-8 lg:pb-24 border-b border-sand/60"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch min-h-[calc(100svh-8.5rem)] lg:min-h-[78vh]">
          {/* Left Typographic Editorial Column */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 flex flex-col justify-between py-2 lg:py-8"
          >
            <div className="space-y-6 lg:space-y-8 my-auto">
              <p className="text-xs sm:text-[13px] tracking-[0.14em] text-caramel">
                {STUDIO_CONFIG.brandFull} · Armação dos Búzios
              </p>

              <h1
                className="font-display font-normal text-deep leading-[0.98] tracking-[-0.015em]"
                style={{ fontSize: 'clamp(2.85rem, 5.4vw, 5.35rem)' }}
              >
                <span className="block">Sua beleza.</span>
                <span className="block italic text-espresso font-normal">
                  Sua essência.
                </span>
                <span className="block">Seu momento.</span>
              </h1>

              <p className="text-base sm:text-lg text-deep/80 max-w-md leading-relaxed font-light">
                {STUDIO_CONFIG.subheadline}
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-2">
                <button
                  type="button"
                  onClick={onScheduleClick}
                  className="inline-flex items-center justify-center min-h-[48px] px-8 py-3.5 bg-espresso text-ivory text-sm tracking-[0.06em] hover:bg-deep transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  Agendar meu momento
                </button>

                <button
                  type="button"
                  onClick={onExploreServices}
                  className="inline-flex items-center gap-2 min-h-[44px] py-2 text-sm tracking-[0.04em] text-espresso hover:text-caramel transition-colors duration-150 whitespace-nowrap shrink-0 border-b border-espresso/30 hover:border-caramel cursor-pointer"
                >
                  <span>Conhecer os serviços</span>
                  <ArrowDownRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Quiet Regional & Studio Attribution */}
            <div className="pt-10 lg:pt-8 border-t border-sand/60 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-deep/65 tracking-[0.04em]">
              <span>Maquiagem profissional e penteados</span>
              <span aria-hidden="true">·</span>
              <span>Noivas, debutantes e eventos sociais</span>
              <span aria-hidden="true">·</span>
              <span>Região dos Lagos &amp; Rio de Janeiro</span>
            </div>
          </motion.div>

          {/* Right Editorial Photography Column */}
          <motion.div
            initial={{ opacity: 0, scale: 0.985 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="lg:col-span-6 flex"
          >
            <EditorialImage
              src={STUDIO_IMAGES.heroBridal}
              alt="Retrato de noiva em tons quentes com maquiagem iluminada, penteado meio preso com ondas naturais e vestido de renda"
              priority
              containerClassName="w-full h-[460px] sm:h-[560px] lg:h-full lg:min-h-[620px] relative"
              className="w-full h-full object-cover object-top"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
