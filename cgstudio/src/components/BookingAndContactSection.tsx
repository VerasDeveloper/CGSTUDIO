import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronDown,
  Instagram,
  MapPin,
  MessageCircle,
  Phone,
} from 'lucide-react';
import {
  BOOKING_OPTIONS,
  BookingCategoryId,
  STUDIO_CONFIG,
  buildWhatsAppUrl,
} from '../data/studioData';

interface BookingAndContactSectionProps {
  preselectedCategory?: BookingCategoryId;
  preselectedServiceId?: string;
  selectionTimestamp?: number;
}

interface BookingFormState {
  category: BookingCategoryId;
  serviceId: string;
  fullName: string;
  whatsapp: string;
  eventDate: string;
  preferredTime: string;
  city: string;
  venue: string;
  notes: string;
}

const CITY_OPTIONS = [
  ...STUDIO_CONFIG.regions.lagos,
  ...STUDIO_CONFIG.regions.rio,
];

export const BookingAndContactSection: React.FC<BookingAndContactSectionProps> = ({
  preselectedCategory,
  preselectedServiceId,
  selectionTimestamp,
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [form, setForm] = useState<BookingFormState>({
    category: 'noiva',
    serviceId: 'noiva-premium',
    fullName: '',
    whatsapp: '',
    eventDate: '',
    preferredTime: '',
    city: 'Armação dos Búzios',
    venue: '',
    notes: '',
  });

  useEffect(() => {
    if (!preselectedCategory) return;
    const categoryConfig = BOOKING_OPTIONS[preselectedCategory];
    const defaultService =
      preselectedServiceId &&
      categoryConfig.services.some((s) => s.id === preselectedServiceId)
        ? preselectedServiceId
        : categoryConfig.services[0].id;

    setForm((prev) => ({
      ...prev,
      category: preselectedCategory,
      serviceId: defaultService,
    }));
    setStep(preselectedServiceId ? 3 : 2);
  }, [preselectedCategory, preselectedServiceId, selectionTimestamp]);

  const currentCategoryConfig = BOOKING_OPTIONS[form.category];
  const currentService =
    currentCategoryConfig.services.find((s) => s.id === form.serviceId) ||
    currentCategoryConfig.services[0];

  const handleCategorySelect = (category: BookingCategoryId) => {
    const firstService = BOOKING_OPTIONS[category].services[0].id;
    setForm((prev) => ({
      ...prev,
      category,
      serviceId: firstService,
    }));
    setStep(2);
  };

  const handleServiceSelect = (serviceId: string) => {
    setForm((prev) => ({ ...prev, serviceId }));
    setStep(3);
  };

  const validateStep3 = (): boolean => {
    const nextErrors: Record<string, string> = {};
    if (!form.fullName.trim() || form.fullName.trim().length < 2) {
      nextErrors.fullName = 'Informe seu nome completo.';
    }
    const digits = form.whatsapp.replace(/\D/g, '');
    if (digits.length < 10) {
      nextErrors.whatsapp = 'Informe um número de WhatsApp válido com DDD.';
    }
    if (!form.eventDate) {
      nextErrors.eventDate = 'Selecione a data prevista para o evento.';
    }
    if (!form.preferredTime) {
      nextErrors.preferredTime = 'Informe o horário desejado para avaliação.';
    }
    if (!form.city.trim()) {
      nextErrors.city = 'Informe a cidade onde será realizado o atendimento.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateStep3()) {
      setStep(4);
    }
  };

  const formatDatePtBr = (isoDate: string): string => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    if (!year || !month || !day) return isoDate;
    return `${day}/${month}/${year}`;
  };

  const buildBookingWhatsAppLink = (): string => {
    const lines = [
      'Olá, Cássia! Gostaria de solicitar um agendamento pelo site do CG Studio:',
      '',
      `• Nome: ${form.fullName.trim()}`,
      `• WhatsApp para retorno: ${form.whatsapp.trim()}`,
      `• Atendimento: ${currentCategoryConfig.label}`,
      `• Serviço / Pacote: ${currentService.label}${
        currentService.priceLabel ? ` (${currentService.priceLabel})` : ''
      }`,
      `• Data do evento: ${formatDatePtBr(form.eventDate)}`,
      `• Horário desejado: ${form.preferredTime}`,
      `• Cidade: ${form.city.trim()}`,
    ];

    if (form.venue.trim()) {
      lines.push(`• Local do evento: ${form.venue.trim()}`);
    }
    if (form.notes.trim()) {
      lines.push(`• Observações: ${form.notes.trim()}`);
    }

    lines.push(
      '',
      'Aguardo a verificação de disponibilidade e os próximos passos com a equipe.'
    );

    return buildWhatsAppUrl(lines.join('\n'));
  };

  return (
    <section id="agendamento" className="py-24 lg:py-32 bg-ivory">
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Regional Coverage Sub-band */}
        <div className="pb-16 lg:pb-20 mb-16 lg:mb-20 border-b border-sand/80">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            <div className="lg:col-span-5">
              <p className="text-xs tracking-[0.14em] text-caramel mb-3">
                Regiões atendidas
              </p>
              <h2
                className="font-display font-normal text-deep leading-[1.06]"
                style={{ fontSize: 'clamp(2.2rem, 3.6vw, 3.35rem)' }}
              >
                Beleza onde <span className="italic text-espresso">sua história</span> acontece.
              </h2>
              <p className="mt-4 text-sm sm:text-base text-deep/75 leading-relaxed">
                O CG Studio conta com duas equipes dedicadas no estado do Rio de Janeiro. Valores e condições de deslocamento são informados sob consulta conforme o local do evento.
              </p>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="p-6 sm:p-7 bg-champagne/35 border border-sand/70">
                <p className="text-xs tracking-[0.12em] text-caramel mb-2">
                  Equipe 01
                </p>
                <h3 className="font-display text-2xl text-espresso mb-4">
                  Região dos Lagos
                </h3>
                <ul className="grid grid-cols-1 gap-1.5 text-sm text-deep/85">
                  {STUDIO_CONFIG.regions.lagos.map((city) => (
                    <li key={city} className="flex items-center gap-2">
                      <span className="text-caramel text-xs" aria-hidden="true">
                        —
                      </span>
                      <span>{city}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 sm:p-7 bg-champagne/35 border border-sand/70 flex flex-col justify-between">
                <div>
                  <p className="text-xs tracking-[0.12em] text-caramel mb-2">
                    Equipe 02
                  </p>
                  <h3 className="font-display text-2xl text-espresso mb-4">
                    Rio de Janeiro
                  </h3>
                  <ul className="space-y-1.5 text-sm text-deep/85">
                    {STUDIO_CONFIG.regions.rio.map((area) => (
                      <li key={area} className="flex items-center gap-2">
                        <span className="text-caramel text-xs" aria-hidden="true">
                          —
                        </span>
                        <span>{area}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="mt-6 pt-4 border-t border-sand/60 text-xs text-deep/65 leading-relaxed">
                  Consulte nossa equipe para verificar a disponibilidade de atendimento na cidade escolhida.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Request Wizard + Direct Contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left 7 cols: 4-Step Solicitação de Agendamento */}
          <div className="lg:col-span-7 bg-soft border border-sand p-6 sm:p-10">
            <div className="pb-6 border-b border-sand/70">
              <p className="text-xs tracking-[0.14em] text-caramel mb-2">
                Agendamento online
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-deep font-normal">
                Solicite a reserva da sua data
              </h3>
              <p className="mt-2 text-xs sm:text-sm text-deep/70">
                Preencha as etapas abaixo para enviar sua solicitação diretamente para a equipe do CG Studio pelo WhatsApp.
              </p>

              {/* Step Progress Bar */}
              <div className="mt-6 grid grid-cols-4 gap-2 text-[11px] sm:text-xs">
                {[
                  { num: 1, label: 'Atendimento' },
                  { num: 2, label: 'Pacote' },
                  { num: 3, label: 'Evento' },
                  { num: 4, label: 'Resumo' },
                ].map((item) => {
                  const isActive = step === item.num;
                  const isDone = step > item.num;
                  return (
                    <button
                      key={item.num}
                      type="button"
                      disabled={item.num > step}
                      onClick={() => {
                        if (item.num < step) setStep(item.num as 1 | 2 | 3 | 4);
                      }}
                      className={`text-left pt-2 border-t-2 transition-colors ${
                        isActive
                          ? 'border-espresso text-espresso font-bold'
                          : isDone
                          ? 'border-caramel text-deep/80 cursor-pointer'
                          : 'border-sand/70 text-deep/45 cursor-default'
                      }`}
                    >
                      <span className="tabular-nums mr-1">0{item.num}.</span>
                      <span className="hidden sm:inline">{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* STEP 1: Escolher o atendimento */}
            {step === 1 && (
              <div className="pt-8 space-y-5">
                <p className="text-sm font-medium text-espresso">
                  Etapa 1 — Escolha o tipo de atendimento
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {(Object.keys(BOOKING_OPTIONS) as BookingCategoryId[]).map(
                    (catId) => {
                      const option = BOOKING_OPTIONS[catId];
                      const selected = form.category === catId;
                      return (
                        <button
                          key={catId}
                          type="button"
                          onClick={() => handleCategorySelect(catId)}
                          className={`p-5 text-left border transition-colors cursor-pointer ${
                            selected
                              ? 'border-espresso bg-champagne/40'
                              : 'border-sand/80 bg-ivory hover:border-caramel'
                          }`}
                        >
                          <p className="font-display text-2xl text-deep">
                            {option.label}
                          </p>
                          <p className="mt-1.5 text-xs text-deep/75 leading-relaxed">
                            {option.description}
                          </p>
                        </button>
                      );
                    }
                  )}
                </div>
              </div>
            )}

            {/* STEP 2: Escolher o serviço ou pacote */}
            {step === 2 && (
              <div className="pt-8 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-espresso">
                    Etapa 2 — Escolha o serviço para {currentCategoryConfig.label}
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1 text-xs text-caramel hover:text-espresso cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Voltar</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {currentCategoryConfig.services.map((srv) => {
                    const selected = form.serviceId === srv.id;
                    return (
                      <button
                        key={srv.id}
                        type="button"
                        onClick={() => handleServiceSelect(srv.id)}
                        className={`w-full p-5 text-left border flex items-center justify-between gap-4 transition-colors cursor-pointer ${
                          selected
                            ? 'border-espresso bg-champagne/40'
                            : 'border-sand/80 bg-ivory hover:border-caramel'
                        }`}
                      >
                        <div>
                          <p className="font-display text-2xl text-deep">
                            {srv.label}
                          </p>
                          {srv.priceLabel && (
                            <p className="text-sm text-caramel tabular-nums mt-0.5">
                              {srv.priceLabel}
                            </p>
                          )}
                        </div>
                        <ArrowRight
                          className="w-4 h-4 text-espresso shrink-0"
                          strokeWidth={1.5}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* STEP 3: Informações do evento */}
            {step === 3 && (
              <form onSubmit={handleStep3Submit} noValidate className="pt-8 space-y-5">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-espresso">
                    Etapa 3 — Informações do evento
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1 text-xs text-caramel hover:text-espresso cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Alterar pacote</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="cg-fullname"
                      className="block text-xs tracking-[0.06em] text-deep/80 mb-1.5"
                    >
                      Nome completo *
                    </label>
                    <input
                      id="cg-fullname"
                      type="text"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, fullName: e.target.value }))
                      }
                      placeholder="Seu nome completo"
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-ivory border border-sand text-sm text-deep focus:border-espresso focus:outline-none"
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-espresso font-medium">
                        {errors.fullName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cg-whatsapp"
                      className="block text-xs tracking-[0.06em] text-deep/80 mb-1.5"
                    >
                      WhatsApp *
                    </label>
                    <input
                      id="cg-whatsapp"
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, whatsapp: e.target.value }))
                      }
                      placeholder="(22) 99999-9999"
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-ivory border border-sand text-sm text-deep focus:border-espresso focus:outline-none tabular-nums"
                    />
                    {errors.whatsapp && (
                      <p className="mt-1 text-xs text-espresso font-medium">
                        {errors.whatsapp}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cg-date"
                      className="block text-xs tracking-[0.06em] text-deep/80 mb-1.5"
                    >
                      Data do evento *
                    </label>
                    <input
                      id="cg-date"
                      type="date"
                      value={form.eventDate}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, eventDate: e.target.value }))
                      }
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-ivory border border-sand text-sm text-deep focus:border-espresso focus:outline-none tabular-nums"
                    />
                    {errors.eventDate && (
                      <p className="mt-1 text-xs text-espresso font-medium">
                        {errors.eventDate}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cg-time"
                      className="block text-xs tracking-[0.06em] text-deep/80 mb-1.5"
                    >
                      Horário desejado (para análise) *
                    </label>
                    <input
                      id="cg-time"
                      type="time"
                      value={form.preferredTime}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, preferredTime: e.target.value }))
                      }
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-ivory border border-sand text-sm text-deep focus:border-espresso focus:outline-none tabular-nums"
                    />
                    {errors.preferredTime && (
                      <p className="mt-1 text-xs text-espresso font-medium">
                        {errors.preferredTime}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cg-city"
                      className="block text-xs tracking-[0.06em] text-deep/80 mb-1.5"
                    >
                      Cidade do atendimento *
                    </label>
                    <div className="relative">
                      <select
                        id="cg-city"
                        value={form.city}
                        onChange={(e) =>
                          setForm((p) => ({ ...p, city: e.target.value }))
                        }
                        className="w-full min-h-[44px] pl-3.5 pr-10 py-2.5 bg-ivory border border-sand text-sm text-deep focus:border-espresso focus:outline-none appearance-none cursor-pointer"
                      >
                        {CITY_OPTIONS.map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                      <ChevronDown
                        className="w-4 h-4 text-caramel pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </div>
                    {errors.city && (
                      <p className="mt-1 text-xs text-espresso font-medium">
                        {errors.city}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="cg-venue"
                      className="block text-xs tracking-[0.06em] text-deep/80 mb-1.5"
                    >
                      Local do evento (opcional)
                    </label>
                    <input
                      id="cg-venue"
                      type="text"
                      value={form.venue}
                      onChange={(e) =>
                        setForm((p) => ({ ...p, venue: e.target.value }))
                      }
                      placeholder="Pousada, espaço ou residência"
                      className="w-full min-h-[44px] px-3.5 py-2.5 bg-ivory border border-sand text-sm text-deep focus:border-espresso focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="cg-notes"
                    className="block text-xs tracking-[0.06em] text-deep/80 mb-1.5"
                  >
                    Observações adicionais (opcional)
                  </label>
                  <textarea
                    id="cg-notes"
                    rows={3}
                    value={form.notes}
                    onChange={(e) =>
                      setForm((p) => ({ ...p, notes: e.target.value }))
                    }
                    placeholder="Conte brevemente sobre sua cerimônia, horário de término ou pessoas adicionais."
                    className="w-full px-3.5 py-2.5 bg-ivory border border-sand text-sm text-deep focus:border-espresso focus:outline-none resize-y"
                  />
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    type="submit"
                    className="min-h-[46px] px-7 py-3 bg-espresso text-ivory text-xs sm:text-sm tracking-[0.06em] hover:bg-deep transition-colors inline-flex items-center gap-2 cursor-pointer"
                  >
                    <span>Revisar solicitação</span>
                    <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 4: Confirmação e Envio pelo WhatsApp */}
            {step === 4 && (
              <div className="pt-8 space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium text-espresso">
                    Etapa 4 — Resumo da solicitação
                  </p>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-1 text-xs text-caramel hover:text-espresso cursor-pointer"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    <span>Editar dados</span>
                  </button>
                </div>

                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 p-6 bg-ivory border border-sand/80 text-sm">
                  <div>
                    <dt className="text-xs text-caramel">Nome</dt>
                    <dd className="text-deep font-medium mt-0.5">{form.fullName}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-caramel">Categoria</dt>
                    <dd className="text-deep font-medium mt-0.5">
                      {currentCategoryConfig.label}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-caramel">Serviço escolhido</dt>
                    <dd className="text-deep font-medium mt-0.5">
                      {currentService.label}
                    </dd>
                  </div>
                  {currentService.priceLabel && (
                    <div>
                      <dt className="text-xs text-caramel">Valor informado</dt>
                      <dd className="text-espresso font-medium tabular-nums mt-0.5">
                        {currentService.priceLabel}
                      </dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-xs text-caramel">Data do evento</dt>
                    <dd className="text-deep font-medium tabular-nums mt-0.5">
                      {formatDatePtBr(form.eventDate)}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-caramel">Horário desejado</dt>
                    <dd className="text-deep font-medium tabular-nums mt-0.5">
                      {form.preferredTime}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-xs text-caramel">Cidade</dt>
                    <dd className="text-deep font-medium mt-0.5">{form.city}</dd>
                  </div>
                  {form.venue && (
                    <div>
                      <dt className="text-xs text-caramel">Local do evento</dt>
                      <dd className="text-deep font-medium mt-0.5">{form.venue}</dd>
                    </div>
                  )}
                </dl>

                <div className="p-4 bg-champagne/40 border border-sand/70 text-xs text-deep/80 leading-relaxed flex items-start gap-2.5">
                  <Check
                    className="w-4 h-4 text-espresso shrink-0 mt-0.5"
                    strokeWidth={1.5}
                  />
                  <span>
                    Esta etapa gera uma <strong>solicitação de agendamento</strong>. A confirmação da disponibilidade da data e do horário é realizada diretamente pela equipe do CG Studio após o envio da mensagem.
                  </span>
                </div>

                <a
                  href={buildBookingWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full min-h-[50px] px-7 py-3.5 bg-espresso text-ivory text-sm tracking-[0.06em] hover:bg-deep transition-colors flex items-center justify-center gap-2.5"
                >
                  <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                  <span>Solicitar agendamento pelo WhatsApp</span>
                </a>
              </div>
            )}
          </div>

          {/* Right 5 cols: Direct Contact & Address Validation */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <p className="text-xs tracking-[0.14em] text-caramel mb-3">
                Atendimento direto
              </p>
              <h3 className="font-display text-3xl sm:text-4xl text-deep font-normal leading-tight">
                Prefere conversar diretamente com a equipe?
              </h3>
              <p className="mt-3 text-sm sm:text-base text-deep/75 leading-relaxed">
                Tire dúvidas sobre datas, deslocamento entre cidades, prévia de produção ou orçamentos personalizados para grupos.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[48px] px-7 py-3.5 bg-espresso text-ivory text-sm tracking-[0.06em] hover:bg-deep transition-colors inline-flex items-center justify-center gap-2.5 whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
                <span>Falar com Cássia</span>
              </a>

              <a
                href={STUDIO_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="min-h-[46px] px-7 py-3 border border-espresso/35 text-espresso text-sm tracking-[0.05em] hover:bg-champagne/50 transition-colors inline-flex items-center justify-center gap-2 whitespace-nowrap"
              >
                <Instagram className="w-4 h-4" strokeWidth={1.5} />
                <span>Instagram {STUDIO_CONFIG.instagramHandle}</span>
              </a>
            </div>

            <div className="pt-8 border-t border-sand/80 space-y-5 text-sm">
              <div className="flex items-start gap-3">
                <Phone
                  className="w-4 h-4 text-caramel shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <div>
                  <p className="text-xs tracking-[0.08em] text-caramel">
                    WhatsApp oficial
                  </p>
                  <p className="text-deep font-medium tabular-nums mt-0.5">
                    {STUDIO_CONFIG.whatsappDisplay}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin
                  className="w-4 h-4 text-caramel shrink-0 mt-1"
                  strokeWidth={1.5}
                />
                <div className="space-y-1.5">
                  <p className="text-xs tracking-[0.08em] text-caramel">
                    Endereço em Armação dos Búzios
                  </p>
                  <p className="text-deep leading-relaxed">
                    {STUDIO_CONFIG.address.primaryDisplay}
                  </p>
                  <p className="text-xs text-deep/65 leading-relaxed">
                    {STUDIO_CONFIG.address.validationNotice} (Referência alternativa em material anterior: {STUDIO_CONFIG.address.institutionalAlternative}).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
