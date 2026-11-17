import React from 'react';
import { Instagram, MessageCircle } from 'lucide-react';
import { STUDIO_CONFIG, buildWhatsAppUrl } from '../data/studioData';

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-deep text-champagne py-14 lg:py-16 border-t border-espresso">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-10 border-b border-champagne/15">
          <div className="md:col-span-5 space-y-3">
            <p className="font-display text-2xl tracking-[0.14em] text-ivory">
              {STUDIO_CONFIG.brandShort}
            </p>
            <p className="text-sm text-champagne/80">
              By {STUDIO_CONFIG.professionalName}
            </p>
            <p className="text-xs text-champagne/65 max-w-sm leading-relaxed pt-1">
              Maquiagem profissional, penteados e consultoria de beleza para noivas, debutantes e eventos sociais na Região dos Lagos e Rio de Janeiro.
            </p>
          </div>

          <div className="md:col-span-3 space-y-3">
            <p className="text-xs tracking-[0.12em] text-sand">Navegação</p>
            <nav aria-label="Links do rodapé" className="flex flex-col gap-2 text-sm">
              <a href="#servicos" className="hover:text-ivory transition-colors">
                Serviços
              </a>
              <a href="#sobre" className="hover:text-ivory transition-colors">
                Sobre Cássia
              </a>
              <a href="#pacotes" className="hover:text-ivory transition-colors">
                Pacotes
              </a>
              <a href="#portfolio" className="hover:text-ivory transition-colors">
                Portfólio
              </a>
              <a href="#agendamento" className="hover:text-ivory transition-colors">
                Agendar
              </a>
            </nav>
          </div>

          <div className="md:col-span-4 space-y-3">
            <p className="text-xs tracking-[0.12em] text-sand">Atendimento</p>
            <p className="text-sm text-champagne/85">
              Armação dos Búzios · Região dos Lagos · Rio de Janeiro
            </p>
            <p className="text-xs text-champagne/65 leading-relaxed">
              Atendimento mediante solicitação e confirmação prévia pela equipe.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-sm">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ivory hover:text-sand transition-colors"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                <span className="tabular-nums">{STUDIO_CONFIG.whatsappDisplay}</span>
              </a>
              <a
                href={STUDIO_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-ivory hover:text-sand transition-colors"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
                <span>{STUDIO_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-champagne/60">
          <p>
            © {year} {STUDIO_CONFIG.brandFull}. Todos os direitos reservados.
          </p>
          <p>{STUDIO_CONFIG.slogan}</p>
        </div>
      </div>
    </footer>
  );
};
