import React, { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { BookingCategoryId, SERVICES_LIST, ServiceItem } from '../data/studioData';
import { EditorialImage } from './EditorialImage';

interface ServicesSectionProps {
  onSelectPackagesTab: (tab: 'noiva' | 'debutante') => void;
  onBookService: (category: BookingCategoryId, serviceId?: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectPackagesTab,
  onBookService,
}) => {
  const [expandedId, setExpandedId] = useState<string | null>('noivas');

  const handleAction = (service: ServiceItem) => {
    if (service.targetAction.type === 'packages') {
      onSelectPackagesTab(service.targetAction.tab);
    } else {
      onBookService(service.targetAction.category, service.targetAction.serviceId);
    }
  };

  return (
    <section
      id="servicos"
      className="py-24 lg:py-32 bg-ivory border-b border-sand/60"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Section Editorial Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-end mb-16 lg:mb-24"
        >
          <div className="lg:col-span-7">
            <p className="text-xs tracking-[0.14em] text-caramel mb-3">
              Serviços oferecidos
            </p>
            <h2
              className="font-display font-normal text-deep leading-[1.05]"
              style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)' }}
            >
              Produções criadas para <span className="italic text-espresso">cada capítulo</span> da sua história.
            </h2>
          </div>
          <div className="lg:col-span-5">
            <p className="text-base text-deep/75 leading-relaxed">
              Do atendimento íntimo da noiva às celebrações de 15 anos e eventos sociais, cada produção une técnica apurada, escuta atenta e respeito à sua identidade.
            </p>
          </div>
        </motion.div>

        {/* Asymmetric Editorial Service Rows (No repetitive 4-card grid) */}
        <div className="space-y-16 lg:space-y-24">
          {SERVICES_LIST.map((service, idx) => {
            const isExpanded = expandedId === service.id;
            const hasImage = Boolean(service.image);
            const imageLeft = idx % 2 === 1;

            return (
              <motion.article
                key={service.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="pt-10 border-t border-sand/80"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
                  {/* Optional Editorial Photo */}
                  {hasImage && service.image && (
                    <div
                      className={`lg:col-span-5 ${
                        imageLeft ? 'lg:order-1' : 'lg:order-2'
                      }`}
                    >
                      <EditorialImage
                        src={service.image}
                        alt={service.imageAlt || service.title}
                        containerClassName="aspect-[4/3] w-full"
                        className="w-full h-full object-cover object-[50%_18%] transition-transform duration-500 hover:scale-[1.02]"
                      />
                    </div>
                  )}

                  {/* Content Column */}
                  <div
                    className={`${
                      hasImage
                        ? `lg:col-span-7 ${imageLeft ? 'lg:order-2' : 'lg:order-1'}`
                        : 'lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-start'
                    }`}
                  >
                    <div className={hasImage ? '' : 'lg:col-span-5'}>
                      <div className="flex items-center gap-3 text-xs tracking-[0.12em] text-caramel mb-3">
                        <span className="tabular-nums">{service.index}.</span>
                        <span aria-hidden="true">/</span>
                        <span>{service.categoryName}</span>
                      </div>

                      <h3
                        className="font-display font-normal text-deep leading-[1.08]"
                        style={{ fontSize: 'clamp(1.85rem, 3vw, 2.75rem)' }}
                      >
                        {service.title}
                      </h3>

                      {service.priceLabel && (
                        <p className="mt-3 text-sm font-medium text-espresso tabular-nums tracking-[0.02em]">
                          {service.priceLabel}
                        </p>
                      )}
                    </div>

                    <div className={hasImage ? 'mt-5' : 'lg:col-span-7'}>
                      <p className="text-base text-deep/80 leading-relaxed max-w-xl">
                        {service.description}
                      </p>

                      {service.note && (
                        <p className="mt-3 text-xs text-deep/65 leading-relaxed max-w-xl">
                          {service.note}
                        </p>
                      )}

                      {/* Expandable Details Toggle + Action CTA */}
                      <div className="mt-6 flex flex-wrap items-center gap-5">
                        <button
                          type="button"
                          onClick={() => handleAction(service)}
                          className="inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 bg-espresso text-ivory text-xs sm:text-[13px] tracking-[0.06em] hover:bg-deep transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>{service.ctaLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setExpandedId(isExpanded ? null : service.id)
                          }
                          aria-expanded={isExpanded}
                          className="inline-flex items-center gap-1.5 min-h-[44px] py-2 text-xs sm:text-[13px] tracking-[0.04em] text-espresso hover:text-caramel transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                        >
                          <span>
                            {isExpanded ? 'Ocultar possibilidades' : 'Ver detalhes do serviço'}
                          </span>
                          <ChevronDown
                            className={`w-4 h-4 transition-transform duration-200 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                            strokeWidth={1.5}
                          />
                        </button>
                      </div>

                      <AnimatePresence initial={false}>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden"
                          >
                            <div className="mt-6 pt-5 border-t border-sand/60">
                              <p className="text-xs tracking-[0.1em] text-caramel mb-3">
                                {service.id === 'eventos-sociais'
                                  ? 'Públicos atendidos'
                                  : service.id === 'beleza-personalizada'
                                  ? 'Destaques da abordagem'
                                  : 'Possibilidades incluídas conforme pacote'}
                              </p>
                              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-sm text-deep/85">
                                {service.possibilities.map((item) => (
                                  <li key={item} className="flex items-baseline gap-2.5">
                                    <span className="text-caramel text-xs" aria-hidden="true">
                                      —
                                    </span>
                                    <span>{item}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
