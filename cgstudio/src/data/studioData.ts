import brushesRitualImg from '../assets/images/portfolio_brushes_ritual_1794783123844.jpg';

export type BookingCategoryId = 'noiva' | 'debutante' | 'social' | 'outro';

export interface PackageGroup {
  groupTitle: string;
  items: string[];
}

export interface PackageItem {
  id: string;
  category: 'noiva' | 'debutante';
  name: string;
  priceLabel: string;
  priceNumeric: number;
  summary: string;
  highlights: string[];
  detailGroups: PackageGroup[];
  editorialNote?: string;
}

export interface ServiceItem {
  id: string;
  index: string;
  categoryName: string;
  title: string;
  description: string;
  possibilities: string[];
  note?: string;
  priceLabel?: string;
  ctaLabel: string;
  targetAction:
    | { type: 'packages'; tab: 'noiva' | 'debutante' }
    | { type: 'booking'; category: BookingCategoryId; serviceId?: string };
  image?: string;
  imageAlt?: string;
}

export interface PortfolioSlot {
  id: string;
  category: 'noivas' | 'debutantes' | 'social';
  categoryLabel: string;
  title: string;
  subtitle: string;
  caption: string;
  image?: string;
  imageAlt?: string;
  isReferenceEditorial: boolean;
  aspectClass: string;
}

export const STUDIO_CONFIG = {
  brandShort: 'CG STUDIO',
  brandFull: 'CG Studio by Cássia Gonçalves',
  professionalName: 'Cássia Gonçalves',
  slogan: 'Sua beleza. Sua essência. Seu momento.',
  subheadline:
    'Maquiagem e penteados que revelam o melhor de você em momentos inesquecíveis.',
  whatsappNumberRaw: '5522999050879',
  whatsappDisplay: '(22) 99905-0879',
  whatsappDefaultMessage:
    'Olá, Cássia! Conheci o CG Studio pelo site e gostaria de saber mais sobre os serviços e a disponibilidade para um atendimento.',
  instagramUrl: 'https://www.instagram.com/cassiabeauty_/',
  instagramHandle: '@cassiabeauty_',
  address: {
    primaryDisplay: 'R. Justiniano de Souza, 114 - 119, Armação dos Búzios - RJ, 28950-000',
    institutionalAlternative: 'Rua Justiniano de Souza, 8 — Armação dos Búzios, RJ',
    validationNotice:
      'Endereço sujeito à confirmação final com a equipe antes do atendimento presencial.',
  },
  regions: {
    lagos: [
      'Armação dos Búzios',
      'Cabo Frio',
      'Arraial do Cabo',
      'Araruama',
      'São Pedro da Aldeia',
      'Iguaba',
      'Saquarema',
      'Maricá',
    ],
    rio: ['Rio de Janeiro', 'Regiões adjacentes'],
  },
};

export function buildWhatsAppUrl(customMessage?: string): string {
  const sanitizedPhone = STUDIO_CONFIG.whatsappNumberRaw.replace(/\D/g, '');
  const message = customMessage || STUDIO_CONFIG.whatsappDefaultMessage;
  return `https://wa.me/${sanitizedPhone}?text=${encodeURIComponent(message)}`;
}

export const STUDIO_IMAGES = {
  heroBridal: '/assets/aistudio/Retrato_de_noiva_em_tons_quentes_aa4620f1.png',
  cassiaPortrait: '/assets/aistudio/image_302d0813.png',
  debutanteEditorial: '/assets/aistudio/Retrato_Radiante_em_Tons_Quentes_1e566682.png',
  socialEditorial: '/assets/aistudio/Retrato_Elegante_com_Sorriso_Radiante_a435c2bb.png',
  bridalDetail: '/assets/aistudio/Retrato_Nupcial_em_Luz_Quente_c19776fc.png',
  debutantePortfolio: '/assets/aistudio/Retrato_elegante_com_tiara_brilhante_7ec3baa2.png',
  brushesRitual: brushesRitualImg,
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: 'noivas',
    index: '01',
    categoryName: 'Noivas',
    title: 'Para o seu grande sim.',
    description:
      'Uma produção pensada para valorizar sua essência e acompanhar cada instante do seu casamento.',
    possibilities: [
      'Maquiagem profissional',
      'Penteado',
      'Prévia de maquiagem e penteado',
      'Consultoria personalizada',
      'Preparação da pele',
      'Acompanhamento na preparação, conforme pacote',
      'Auxílio com acessórios e vestido',
    ],
    ctaLabel: 'Conhecer pacotes para noivas',
    targetAction: { type: 'packages', tab: 'noiva' },
  },
  {
    id: 'debutantes',
    index: '02',
    categoryName: 'Debutantes',
    title: 'Um momento para brilhar.',
    description:
      'Produções exclusivas para celebrar seus 15 anos com personalidade, beleza e elegância.',
    possibilities: [
      'Maquiagem profissional',
      'Penteado',
      'Prévia de produção',
      'Consultoria de estilo',
      'Preparação da pele',
      'Produção para ensaios fotográficos, conforme pacote',
    ],
    ctaLabel: 'Conhecer pacotes para debutantes',
    targetAction: { type: 'packages', tab: 'debutante' },
    image: STUDIO_IMAGES.debutanteEditorial,
    imageAlt:
      'Retrato em tons quentes com pele luminosa, maquiagem natural e penteado preso elegante',
  },
  {
    id: 'eventos-sociais',
    index: '03',
    categoryName: 'Eventos Sociais',
    title: 'Especial em cada detalhe.',
    description:
      'Maquiagem e penteados para destacar sua beleza em celebrações e ocasiões especiais.',
    possibilities: [
      'Madrinhas',
      'Mães dos noivos',
      'Convidadas',
      'Formandas',
      'Clientes de eventos sociais',
    ],
    priceLabel: 'Maquiagem + penteado — R$ 420',
    ctaLabel: 'Agendar produção',
    targetAction: {
      type: 'booking',
      category: 'social',
      serviceId: 'social-completo',
    },
    image: STUDIO_IMAGES.socialEditorial,
    imageAlt:
      'Retrato elegante em tons quentes com maquiagem social, pele iluminada e penteado meio preso com ondas definidas',
  },
  {
    id: 'beleza-personalizada',
    index: '04',
    categoryName: 'Beleza Personalizada',
    title: 'Beleza que respeita sua essência.',
    description:
      'Uma abordagem que considera suas características, seu estilo e sua personalidade.',
    possibilities: [
      'Colorimetria',
      'Visagismo',
      'Estilo pessoal',
      'Consultoria de beleza',
    ],
    note: 'Recursos integrados a pacotes selecionados; consulte nossa equipe para avaliar a inclusão no seu atendimento.',
    ctaLabel: 'Falar com Cássia',
    targetAction: { type: 'booking', category: 'outro' },
  },
];

export const BRIDAL_PACKAGES: PackageItem[] = [
  {
    id: 'noiva-premium',
    category: 'noiva',
    name: 'Pacote Premium',
    priceLabel: 'R$ 2.500',
    priceNumeric: 2500,
    summary:
      'Experiência completa com consultoria de colorimetria, visagismo, cronograma personalizado e produção para pré-wedding.',
    highlights: [
      'Colorimetria, visagismo, estilo e personalidade',
      'Prévia de maquiagem e penteado',
      'Esfoliação, hidratação e cronograma no dia',
      'Robe para making of + maquiagem e cabelo para pré-wedding',
    ],
    detailGroups: [
      {
        groupTitle: 'Reunião online ou presencial',
        items: [
          'Alinhamento de expectativas',
          'Consultoria de colorimetria',
          'Consultoria de visagismo',
          'Avaliação de estilo pessoal',
          'Avaliação de personalidade',
        ],
      },
      {
        groupTitle: 'Prévia',
        items: [
          'Ajuda na escolha da maquiagem',
          'Ajuda na escolha do penteado',
        ],
      },
      {
        groupTitle: 'No dia do casamento',
        items: [
          'Cronograma personalizado',
          'Esfoliação facial',
          'Hidratação facial',
          'Maquiagem escolhida na prévia',
          'Penteado escolhido na prévia',
          'Auxílio com acessórios',
          'Auxílio com véu',
          'Auxílio com vestido',
        ],
      },
      {
        groupTitle: 'Benefícios adicionais',
        items: [
          'Robe para fotografias do making of',
          'Maquiagem e cabelo para pré-wedding',
        ],
      },
    ],
  },
  {
    id: 'noiva-deluxe',
    category: 'noiva',
    name: 'Pacote Deluxe',
    priceLabel: 'R$ 2.000',
    priceNumeric: 2000,
    summary:
      'Produção personalizada com consultoria de estilo e personalidade, prévia completa e robe para o making of.',
    highlights: [
      'Consultoria de estilo pessoal e personalidade',
      'Prévia de maquiagem e penteado',
      'Auxílio com acessórios, véu e vestido',
      'Robe para fotografias do making of',
    ],
    detailGroups: [
      {
        groupTitle: 'Reunião online ou presencial',
        items: [
          'Alinhamento de expectativas',
          'Consultoria de estilo pessoal',
          'Consultoria de personalidade',
        ],
      },
      {
        groupTitle: 'Prévia',
        items: ['Escolha da maquiagem', 'Escolha do penteado'],
      },
      {
        groupTitle: 'No casamento',
        items: [
          'Maquiagem escolhida na prévia',
          'Penteado escolhido na prévia',
          'Auxílio com acessórios',
          'Auxílio com véu',
          'Auxílio com vestido',
        ],
      },
      {
        groupTitle: 'Benefício adicional',
        items: ['Robe para fotografias do making of'],
      },
    ],
  },
  {
    id: 'noiva-soft',
    category: 'noiva',
    name: 'Pacote Soft',
    priceLabel: 'R$ 1.500',
    priceNumeric: 1500,
    summary:
      'Essencial e cuidadoso: alinhamento, prévia, produção completa no casamento e maquiagem para pré-wedding ou pessoa especial.',
    highlights: [
      'Reunião de alinhamento de expectativas',
      'Prévia de maquiagem e penteado',
      'Auxílio com acessórios, véu e vestido',
      'Maquiagem para pré-wedding ou para uma pessoa especial',
    ],
    detailGroups: [
      {
        groupTitle: 'Reunião online ou presencial',
        items: ['Alinhamento de expectativas'],
      },
      {
        groupTitle: 'Prévia',
        items: [
          'Ajuda na escolha da maquiagem',
          'Ajuda na escolha do penteado',
        ],
      },
      {
        groupTitle: 'No casamento',
        items: [
          'Maquiagem escolhida na prévia',
          'Penteado escolhido na prévia',
          'Auxílio com acessórios',
          'Auxílio com véu',
          'Auxílio com vestido',
        ],
      },
      {
        groupTitle: 'Benefício adicional',
        items: ['Maquiagem para pré-wedding ou para uma pessoa especial'],
      },
    ],
  },
];

export const DEBUTANTE_PACKAGES: PackageItem[] = [
  {
    id: 'debutante-premium',
    category: 'debutante',
    name: 'Pacote Premium',
    priceLabel: 'R$ 1.900',
    priceNumeric: 1900,
    summary:
      'Produção completa para os 15 anos com colorimetria, visagismo, cronograma, preparação da pele e fotos pré-evento.',
    highlights: [
      'Colorimetria, visagismo, estilo pessoal e personalidade',
      'Prévia de maquiagem e penteado',
      'Cronograma, esfoliação e hidratação facial no evento',
      'Robe + maquiagem e cabelo para fotos pré-evento ou pessoa especial',
    ],
    detailGroups: [
      {
        groupTitle: 'Reunião online ou presencial',
        items: [
          'Alinhamento de expectativas',
          'Consultoria de colorimetria',
          'Consultoria de visagismo',
          'Estilo pessoal',
          'Personalidade',
        ],
      },
      {
        groupTitle: 'Prévia',
        items: ['Escolha da maquiagem', 'Escolha do penteado'],
      },
      {
        groupTitle: 'No evento',
        items: [
          'Cronograma personalizado',
          'Esfoliação facial',
          'Hidratação facial',
          'Maquiagem escolhida na prévia',
          'Penteado escolhido na prévia',
          'Auxílio com acessórios',
          'Auxílio com vestido',
        ],
      },
      {
        groupTitle: 'Benefícios adicionais',
        items: [
          'Robe para fotografias do making of',
          'Maquiagem e cabelo para fotos antes do evento ou para uma pessoa especial',
        ],
      },
    ],
  },
  {
    id: 'debutante-deluxe',
    category: 'debutante',
    name: 'Pacote Deluxe',
    priceLabel: 'R$ 1.300',
    priceNumeric: 1300,
    summary:
      'Consultoria de estilo e personalidade, prévia dedicada e robe para eternizar o making of dos 15 anos.',
    highlights: [
      'Consultoria de estilo pessoal e personalidade',
      'Prévia de maquiagem e penteado',
      'Auxílio com acessórios e vestido',
      'Robe para fotografias do making of',
    ],
    detailGroups: [
      {
        groupTitle: 'Reunião online ou presencial',
        items: [
          'Alinhamento de expectativas',
          'Consultoria de estilo pessoal',
          'Consultoria de personalidade',
        ],
      },
      {
        groupTitle: 'Prévia',
        items: ['Escolha da maquiagem', 'Escolha do penteado'],
      },
      {
        groupTitle: 'No evento',
        items: [
          'Maquiagem escolhida na prévia',
          'Penteado escolhido na prévia',
          'Auxílio com acessórios',
          'Auxílio com vestido',
        ],
      },
      {
        groupTitle: 'Benefício adicional',
        items: ['Robe para fotografias do making of'],
      },
    ],
  },
  {
    id: 'debutante-soft',
    category: 'debutante',
    name: 'Pacote Soft',
    priceLabel: 'R$ 1.000',
    priceNumeric: 1000,
    summary:
      'Alinhamento de expectativas, prévia de beleza e maquiagem adicional para fotos de pré-aniversário ou pessoa especial.',
    highlights: [
      'Alinhamento de expectativas',
      'Prévia de maquiagem e penteado',
      'Auxílio com acessórios e vestido',
      'Maquiagem para fotos de pré-aniversário ou pessoa especial',
    ],
    detailGroups: [
      {
        groupTitle: 'Reunião online ou presencial',
        items: ['Alinhamento de expectativas'],
      },
      {
        groupTitle: 'Prévia',
        items: ['Escolha da maquiagem', 'Escolha do penteado'],
      },
      {
        groupTitle: 'No evento',
        items: [
          'Maquiagem escolhida na prévia',
          'Penteado escolhido na prévia',
          'Auxílio com acessórios',
          'Auxílio com vestido',
        ],
      },
      {
        groupTitle: 'Benefício adicional',
        items: ['Maquiagem para fotos de pré-aniversário ou para uma pessoa especial'],
      },
    ],
    editorialNote:
      'Nota de registro: os documentos de referência do pacote Soft também mencionam auxílio com véu como item disponível quando aplicável à produção.',
  },
];

export const EXPERIENCE_PILLARS = [
  {
    index: '01',
    title: 'Atendimento personalizado',
    description:
      'Cada produção considera as características, preferências e expectativas da cliente.',
  },
  {
    index: '02',
    title: 'Colorimetria e visagismo',
    description: 'Técnicas utilizadas para valorizar a beleza individual.',
  },
  {
    index: '03',
    title: 'Planejamento',
    description:
      'Reuniões, prévias e cronogramas personalizados conforme o pacote contratado.',
  },
  {
    index: '04',
    title: 'Atendimento humanizado',
    description:
      'Atenção, acolhimento e tranquilidade durante momentos importantes.',
  },
  {
    index: '05',
    title: 'Equipe profissional',
    description:
      'Duas equipes que atendem diferentes regiões do Rio de Janeiro.',
  },
  {
    index: '06',
    title: 'Atualização constante',
    description:
      'Profissionais que acompanham tendências e buscam aperfeiçoamento.',
  },
];

export const REVIEW_HIGHLIGHTS = [
  'Profissionalismo',
  'Atendimento acolhedor',
  'Pontualidade',
  'Agilidade',
  'Qualidade técnica',
  'Atenção aos detalhes',
  'Capacidade de tranquilizar noivas',
  'Satisfação com maquiagem e penteado',
  'Segurança durante a preparação',
];

export interface ClientReview {
  id: string;
  author: string;
  source: 'Google' | 'Instagram';
  stars?: 5;
  text: string;
}

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'isabela',
    author: 'Isabela',
    source: 'Google',
    stars: 5,
    text: 'Cassia é simplesmente excelente, técnica perfeita, super ágil, nos deixa super a vontade e é muito atenciosa! Atendimento e produção impecáveis! Fiquei muito feliz com o resultado final, todos na festa elogiaram muito! Ela arrasa!!',
  },
  {
    id: 'camila',
    author: 'Camila',
    source: 'Google',
    stars: 5,
    text: 'Cassia é ótima profissional, entretém a cliente com sua conversa boa, atende como uma amiga e passa uma enorme confiança em seu trabalho. O seu espaço é super aconchegante. Recomendo muito!!!',
  },
  {
    id: 'carolina',
    author: 'Carolina',
    source: 'Google',
    stars: 5,
    text: 'Simplesmente maravilhoso o trabalho e a atenção!\n\nA Cássia é uma fofa, super simpática, sempre conversando e ajudando nos nervos da noiva. Super indico. Colocou a responsabilidade acima até mesmo de eventuais problemas de cunho pessoal que ocorreram de último momento, mostrando profissionalismo total e super confiança para a noiva né. A make ficou maravilhosa, os cabelos nem se fala. Então super indico.\n\nNosso casamento foi ainda melhor, graças a ajuda dela.\n\nObrigada, e gente... pode confiar que ela é show.',
  },
  {
    id: 'adriana',
    author: 'Adriana',
    source: 'Google',
    stars: 5,
    text: 'Só uma palavra define o trabalho delas! Perfeição! Cassia e a Liliana, foram anjos que Deus enviou para tornar nosso dia bem mais leve! Já disse para elas Deus não poderia ter colocado melhor equipe em nossos caminhos. Trabalho perfeito! Cabelo, unha, maquiagem e uma conversa acolhedora. Já me sinto íntima e elas rsrs! Super recomendo os serviços! Excelência foi o que nos entregou! Obrigada por tudo!',
  },
  {
    id: 'psikatiasouza',
    author: '@psikatiasouza_',
    source: 'Instagram',
    text: 'Você é muitoooo maravilhosa!\n\nTornou o meu dia muito mais especial e cuidou de mim feito princesa!\n\nObrigada por tudo Cássia, pelo carinho, pelo trabalho incrível em um dia tão especial da minha vida, pelos papos e pelo amor a sua profissão!\n\nEu amei o resultado!',
  },
  {
    id: 'gabrielachami',
    author: '@gabrielachami',
    source: 'Instagram',
    text: 'Maravilhosa!',
  },
  {
    id: 'laryssa-vidotti',
    author: '@laryssa_vidotti',
    source: 'Instagram',
    text: 'Amei Cássia, entregou tudo! Me senti linda, cabeluda kkk confesso que fiquei receosa por nunca ter prendido o cabelo, e o penteado ficou lindo e durou toda a festa.',
  },
];

export const PORTFOLIO_SLOTS: PortfolioSlot[] = [
  {
    id: 'noivas-preparacao',
    category: 'noivas',
    categoryLabel: 'Noivas',
    title: 'Beleza nupcial em luz quente',
    subtitle: 'Referência editorial',
    caption:
      'Pele iluminada, maquiagem natural e penteado meio preso com ondas definidas.',
    image: STUDIO_IMAGES.bridalDetail,
    imageAlt:
      'Retrato de noiva em luz quente com vestido de renda floral, maquiagem natural iluminada e penteado meio preso com ondas longas',
    isReferenceEditorial: true,
    aspectClass: 'md:col-span-7',
  },
  {
    id: 'debutantes-acervo',
    category: 'debutantes',
    categoryLabel: 'Debutantes',
    title: 'Produções de 15 anos',
    subtitle: 'CG Studio · Beleza & Penteado',
    caption:
      'Pele iluminada, ondas definidas e tiara para celebrar os 15 anos com delicadeza e presença.',
    image: STUDIO_IMAGES.debutantePortfolio,
    imageAlt:
      'Retrato de debutante em preparação com tiara brilhante, cabelos escuros com ondas longas e maquiagem iluminada',
    isReferenceEditorial: true,
    aspectClass: 'md:col-span-7',
  },
  {
    id: 'social-acervo',
    category: 'social',
    categoryLabel: 'Eventos sociais',
    title: 'Madrinhas, mães e convidadas',
    subtitle: 'Acervo CG Studio',
    caption:
      'Acompanhe as produções reais publicadas no perfil @cassiabeauty_ no Instagram.',
    isReferenceEditorial: false,
    aspectClass: 'md:col-span-7',
  },
];

export interface BridalExperienceItem {
  index: string;
  title: string;
  description: string;
}

export const BRIDAL_EXPERIENCE_ITEMS: BridalExperienceItem[] = [
  {
    index: '01',
    title: 'Uma beleza que é só sua',
    description:
      'Cada produção considera as características, o estilo e a personalidade da noiva, valorizando sua beleza individual por meio de técnicas de maquiagem, colorimetria e visagismo.',
  },
  {
    index: '02',
    title: 'Tudo começa antes do sim',
    description:
      'A preparação começa com o alinhamento das expectativas e a escolha da maquiagem e do penteado, permitindo que a noiva participe das decisões sobre sua produção.',
  },
  {
    index: '03',
    title: 'Cuidado em cada detalhe',
    description:
      'Da escolha do penteado aos últimos detalhes da produção, o objetivo é proporcionar uma preparação tranquila, acolhedora e cuidadosamente planejada.',
  },
  {
    index: '04',
    title: 'Experiência que transmite confiança',
    description:
      'Desde 2012, Cássia Gonçalves constrói sua trajetória profissional na região de Búzios e já participou da preparação de mais de 50 noivas.',
  },
  {
    index: '05',
    title: 'Uma equipe dedicada ao seu momento',
    description:
      'O CG Studio conta com equipes que atendem a Região dos Lagos, o Rio de Janeiro e regiões adjacentes, oferecendo atendimento humanizado e atenção às necessidades de cada cliente.',
  },
];

export const DEBUTANTE_EXPERIENCE_ITEMS: BridalExperienceItem[] = [
  {
    index: '01',
    title: 'Uma beleza que conta sua história',
    description:
      'Cada debutante possui características, preferências e uma personalidade única. O CG Studio busca valorizar essa individualidade por meio de produções que combinam maquiagem, penteado, colorimetria e visagismo.',
  },
  {
    index: '02',
    title: 'O encanto começa antes da festa',
    description:
      'A preparação pode incluir reuniões de alinhamento e prévias de maquiagem e penteado, permitindo que cada detalhe seja pensado de acordo com as expectativas da debutante.',
  },
  {
    index: '03',
    title: 'Cada detalhe faz a diferença',
    description:
      'Da escolha da maquiagem ao penteado, passando pelos acessórios e pelos últimos detalhes da produção, o objetivo é criar uma experiência especial e cuidadosamente planejada.',
  },
  {
    index: '04',
    title: 'Uma experiência para recordar',
    description:
      'Mais do que uma produção de beleza, a preparação para os 15 anos representa um momento de celebração, autoestima e realização de sonhos, em uma experiência acolhedora que valoriza cada debutante.',
  },
  {
    index: '05',
    title: 'Experiência e dedicação',
    description:
      'Cássia Gonçalves iniciou sua trajetória profissional ainda jovem e consolidou sua paixão em 2012, ao se mudar para a região de Búzios, participando de momentos especiais de debutantes, noivas e clientes de eventos sociais.',
  },
  {
    index: '06',
    title: 'Uma equipe dedicada ao seu momento',
    description:
      'O CG Studio conta com duas equipes que atendem a Região dos Lagos, o Rio de Janeiro e regiões adjacentes, valorizando o atendimento humanizado, o aperfeiçoamento profissional e as particularidades de cada cliente.',
  },
];

export const BOOKING_OPTIONS: Record<
  BookingCategoryId,
  {
    label: string;
    description: string;
    services: { id: string; label: string; priceLabel?: string }[];
  }
> = {
  noiva: {
    label: 'Noiva',
    description: 'Produção completa com prévia e acompanhamento na preparação.',
    services: [
      { id: 'noiva-premium', label: 'Pacote Premium', priceLabel: 'R$ 2.500' },
      { id: 'noiva-deluxe', label: 'Pacote Deluxe', priceLabel: 'R$ 2.000' },
      { id: 'noiva-soft', label: 'Pacote Soft', priceLabel: 'R$ 1.500' },
    ],
  },
  debutante: {
    label: 'Debutante',
    description: 'Produção exclusiva para celebração de 15 anos.',
    services: [
      { id: 'debutante-premium', label: 'Pacote Premium', priceLabel: 'R$ 1.900' },
      { id: 'debutante-deluxe', label: 'Pacote Deluxe', priceLabel: 'R$ 1.300' },
      { id: 'debutante-soft', label: 'Pacote Soft', priceLabel: 'R$ 1.000' },
    ],
  },
  social: {
    label: 'Evento social',
    description: 'Madrinhas, mães dos noivos, convidadas e formandas.',
    services: [
      {
        id: 'social-completo',
        label: 'Maquiagem e penteado',
        priceLabel: 'R$ 420',
      },
    ],
  },
  outro: {
    label: 'Outro atendimento',
    description: 'Ensaios fotográficos ou produções sob medida.',
    services: [
      {
        id: 'orcamento-personalizado',
        label: 'Solicitar orçamento personalizado',
      },
    ],
  },
};
