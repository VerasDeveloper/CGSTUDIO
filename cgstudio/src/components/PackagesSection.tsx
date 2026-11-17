import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Plus, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  BRIDAL_PACKAGES,
  BookingCategoryId,
  DEBUTANTE_PACKAGES,
  PackageItem,
} from '../data/studioData';

interface PackagesSectionProps {
  activeTab: 'noiva' | 'debutante';
  onTabChange: (tab: 'noiva' | 'debutante') => void;
  onRequestQuote: (category: BookingCategoryId, serviceId: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  activeTab,
  onTabChange,
  onRequestQuote,
}) => {
  const [selectedPackage, setSelectedPackage] = useState<PackageItem | null>(null);

  const packages = activeTab === 'noiva' ? BRIDAL_PACKAGES : DEBUTANTE_PACKAGES;

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPackage(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  return (
    <section
      id="pacotes"
      className="py-24 lg:py-32 bg-ivory border-b border-sand/60"
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Header & Category Switch */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14 lg:mb-18">
          <div className="max-w-2xl">
            <p className="text-xs tracking-[0.14em] text-caramel mb-3">
              Pacotes exclusivos
            </p>
            <h2
              className="font-display font-normal text-deep leading-[1.06]"
              style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)' }}
            >
              Investimento transparente para{' '}
              <span className="italic text-espresso">noivas e debutantes</span>.
            </h2>
          </div>

          {/* Strictly Separated Category Selector */}
          <div
            role="tablist"
            aria-label="Categoria de pacotes"
            className="inline-flex p-1 bg-champagne/70 border border-sand/70 self-start lg:self-auto"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'noiva'}
              onClick={() => onTabChange('noiva')}
              className={`min-h-[42px] px-6 py-2 text-xs sm:text-sm tracking-[0.06em] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'noiva'
                  ? 'bg-espresso text-ivory'
                  : 'text-deep/75 hover:text-espresso'
              }`}
            >
              Noivas
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === 'debutante'}
              onClick={() => onTabChange('debutante')}
              className={`min-h-[42px] px-6 py-2 text-xs sm:text-sm tracking-[0.06em] transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                activeTab === 'debutante'
                  ? 'bg-espresso text-ivory'
                  : 'text-deep/75 hover:text-espresso'
              }`}
            >
              Debutantes e Eventos
            </button>
          </div>
        </div>

        {/* Packages Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8"
          >
            {packages.map((pkg, idx) => {
              const isFeatured = idx === 0;
              return (
                <article
                  key={pkg.id}
                  className={`flex flex-col justify-between p-7 sm:p-9 border transition-colors ${
                    isFeatured
                      ? 'bg-soft border-espresso/45'
                      : 'bg-champagne/55 border-sand/90'
                  }`}
                >
                  <div>
                    <div className="flex items-baseline justify-between gap-4 pb-5 border-b border-sand/70">
                      <div>
                        <p className="text-xs tracking-[0.12em] text-caramel mb-1">
                          {activeTab === 'noiva' ? 'Para noivas' : 'Para debutantes'}
                        </p>
                        <h3 className="font-display text-3xl text-deep font-normal">
                          {pkg.name}
                        </h3>
                      </div>
                      <p className="font-display text-3xl text-espresso tabular-nums whitespace-nowrap">
                        {pkg.priceLabel}
                      </p>
                    </div>

                    <p className="mt-5 text-sm text-deep/80 leading-relaxed">
                      {pkg.summary}
                    </p>

                    <div className="mt-6">
                      <p className="text-xs tracking-[0.1em] text-caramel mb-3">
                        Principais benefícios
                      </p>
                      <ul className="space-y-2.5 text-sm text-deep/85">
                        {pkg.highlights.map((item) => (
                          <li key={item} className="flex items-start gap-2.5">
                            <Check
                              className="w-4 h-4 text-caramel shrink-0 mt-0.5"
                              strokeWidth={1.5}
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-sand/60 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => onRequestQuote(pkg.category, pkg.id)}
                      className="w-full min-h-[46px] px-5 py-3 bg-espresso text-ivory text-xs sm:text-[13px] tracking-[0.06em] hover:bg-deep transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>Solicitar orçamento</span>
                      <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setSelectedPackage(pkg)}
                      className="w-full min-h-[44px] px-5 py-2.5 border border-espresso/30 text-espresso text-xs sm:text-[13px] tracking-[0.05em] hover:bg-champagne/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
                      <span>Visualizar detalhes completos</span>
                    </button>
                  </div>
                </article>
              );
            })}
          </motion.div>
        </AnimatePresence>

        {/* Quiet Social Event Notice & Honest Policy Footnote */}
        <div className="mt-12 pt-8 border-t border-sand/70 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-sm text-deep/85">
              <span className="font-medium text-espresso">
                Eventos sociais (Madrinhas, Mães dos noivos, Convidadas e Formandas):
              </span>{' '}
              Maquiagem + penteado — <span className="tabular-nums font-medium">R$ 420</span>.
            </p>
            <p className="text-xs text-deep/65">
              Os pacotes contemplam a preparação conforme os itens descritos; taxas de deslocamento são informadas mediante consulta da cidade do evento.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onRequestQuote('social', 'social-completo')}
            className="self-start md:self-auto inline-flex items-center gap-2 min-h-[44px] px-6 py-2.5 border border-espresso text-espresso text-xs tracking-[0.06em] hover:bg-espresso hover:text-ivory transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <span>Agendar evento social</span>
            <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Package Detail Modal */}
      <AnimatePresence>
        {selectedPackage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 z-50 bg-deep/65 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
            onClick={() => setSelectedPackage(null)}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-package-title"
          >
            <motion.div
              initial={{ opacity: 0, y: 14, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.985 }}
              transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="bg-ivory border border-sand w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 sm:p-10"
            >
              <div className="flex items-start justify-between gap-6 pb-6 border-b border-sand/80">
                <div>
                  <p className="text-xs tracking-[0.12em] text-caramel mb-1">
                    {selectedPackage.category === 'noiva'
                      ? 'Pacote para Noivas'
                      : 'Pacote para Debutantes'}
                  </p>
                  <h3
                    id="modal-package-title"
                    className="font-display text-3xl sm:text-4xl text-deep font-normal"
                  >
                    {selectedPackage.name} —{' '}
                    <span className="tabular-nums text-espresso">
                      {selectedPackage.priceLabel}
                    </span>
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => setSelectedPackage(null)}
                  aria-label="Fechar detalhes do pacote"
                  className="w-10 h-10 flex items-center justify-center text-espresso hover:bg-champagne/70 transition-colors shrink-0 cursor-pointer"
                >
                  <X className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>

              <p className="mt-5 text-sm sm:text-base text-deep/80 leading-relaxed">
                {selectedPackage.summary}
              </p>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
                {selectedPackage.detailGroups.map((group) => (
                  <div key={group.groupTitle} className="space-y-3">
                    <h4 className="text-xs tracking-[0.12em] text-caramel border-b border-sand/60 pb-2">
                      {group.groupTitle}
                    </h4>
                    <ul className="space-y-2 text-sm text-deep/85">
                      {group.items.map((item) => (
                        <li key={item} className="flex items-start gap-2">
                          <span className="text-caramel" aria-hidden="true">
                            —
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              {selectedPackage.editorialNote && (
                <p className="mt-6 pt-4 border-t border-sand/60 text-xs text-deep/70 leading-relaxed">
                  {selectedPackage.editorialNote}
                </p>
              )}

              <div className="mt-8 pt-6 border-t border-sand/80 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
                <span className="text-xs text-deep/65">
                  Disponibilidade confirmada diretamente pela equipe CG Studio.
                </span>
                <button
                  type="button"
                  onClick={() => {
                    const pkg = selectedPackage;
                    setSelectedPackage(null);
                    onRequestQuote(pkg.category, pkg.id);
                  }}
                  className="min-h-[46px] px-7 py-3 bg-espresso text-ivory text-xs sm:text-sm tracking-[0.06em] hover:bg-deep transition-colors flex items-center justify-center gap-2 whitespace-nowrap cursor-pointer"
                >
                  <span>Solicitar orçamento</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};
