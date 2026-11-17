import React from 'react';
import { motion } from 'motion/react';
import { EXPERIENCE_PILLARS, STUDIO_IMAGES } from '../data/studioData';
import { EditorialImage } from './EditorialImage';

export const AboutSection: React.FC = () => {
  return (
    <section id="sobre" className="bg-champagne/65">
      {/* Part 1: Editorial Biography Spread */}
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12 py-24 lg:py-32">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-14 items-start">
          {/* Portrait Left (smaller editorial frame) */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-4 flex justify-center md:justify-start"
          >
            <EditorialImage
              src={STUDIO_IMAGES.cassiaPortrait}
              alt="Fotografia real de Cássia Gonçalves sorrindo no estúdio CG Studio em Búzios"
              containerClassName="aspect-square w-full max-w-[280px] sm:max-w-[320px] md:max-w-[340px] border border-sand/80"
              className="w-full h-full object-cover object-center"
            />
          </motion.div>

          {/* Biography Right */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="md:col-span-8 space-y-6"
          >
            <div>
              <p className="text-xs tracking-[0.14em] text-caramel mb-3">
                Quem sou? · Cássia Gonçalves
              </p>
              <h2
                className="font-display font-normal text-deep leading-[1.06]"
                style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.6rem)' }}
              >
                Da Arquitetura à <span className="italic text-espresso">arte de revelar</span> sua Beleza Única.
              </h2>
            </div>

            <blockquote className="font-display italic text-2xl sm:text-[1.7rem] text-espresso leading-snug border-y border-sand py-5">
              “Acredito que a verdadeira beleza está na essência de cada mulher. Meu trabalho é revelar essa beleza com sensibilidade, técnica e atenção aos detalhes, transformando momentos especiais em lembranças inesquecíveis.”
            </blockquote>

            <div className="space-y-4 text-base text-deep/85 leading-relaxed">
              <p>
                Nascida no Rio de Janeiro em <span className="tabular-nums font-medium text-espresso">03/05</span>, taurina, apaixonada pela vida e por pessoas, Cássia Gonçalves trocou a Arquitetura pela Beleza aos 18 anos, sendo a mais jovem de sua turma a se formar como Cabeleireira. Desde então, transforma a autoestima e a história de diversas mulheres.
              </p>
              <p>
                A paixão pela profissão se consolidou em 2012, quando se mudou para a Península buziana, passando a fazer parte da trajetória de mais de 50 noivas a dizerem o seu “sim”. Com uma proposta que mescla Colorimetria e Visagismo, encontra em cada mulher a sua Beleza Única — tornando esse dia um marco para noivas, madrinhas, mães e pessoas especiais.
              </p>
              <p>
                Hoje lidera duas equipes formadas por profissionais do Estado do Rio de Janeiro: uma equipe buziana que atende toda a Região dos Lagos (Iguaba, São Pedro da Aldeia, Araruama, Saquarema, Maricá, Búzios, Cabo Frio e Arraial) e outra equipe dedicada ao Rio de Janeiro e adjacências.
              </p>
            </div>

            <div className="p-6 bg-soft/80 border border-sand/90 space-y-2.5">
              <p className="text-xs tracking-[0.12em] text-caramel">
                A Equipe CG Studio
              </p>
              <p className="text-sm sm:text-base text-deep/85 leading-relaxed">
                A Equipe CG Studio enxerga além da mulher que senta na cadeira: são profissionais que treinam, acompanham as tendências do mercado e estudam continuamente para entregar o melhor. Apaixonados pelo que fazem, estão prontos para conduzir qualquer imprevisto com tranquilidade, trazendo leveza para a noiva e proporcionando um atendimento único.
              </p>
              <p className="font-display italic text-xl text-espresso pt-1">
                Se você pretende nos contratar, está em ótimas mãos.
              </p>
            </div>

            {/* Verified Milestones Row (Clean unboxed typography) */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-sand/80 text-sm">
              <div>
                <p className="font-display text-2xl text-espresso tabular-nums">
                  Desde 2012
                </p>
                <p className="text-deep/70 mt-1">
                  Trajetória consolidada na Península buziana
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-espresso tabular-nums">
                  +50 noivas
                </p>
                <p className="text-deep/70 mt-1">
                  Celebrando o seu “sim” com beleza única
                </p>
              </div>
              <div>
                <p className="font-display text-2xl text-espresso tabular-nums">
                  2 equipes
                </p>
                <p className="text-deep/70 mt-1">
                  Região dos Lagos e Rio e adjacências
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Part 2: Espresso Dark Contrast Band — Experiência CG Studio */}
      <div className="bg-espresso text-ivory py-20 lg:py-28">
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-4 space-y-4">
              <p className="text-xs tracking-[0.14em] text-sand">
                Experiência CG Studio
              </p>
              <h3
                className="font-display font-normal text-ivory leading-[1.06]"
                style={{ fontSize: 'clamp(2rem, 3.2vw, 3rem)' }}
              >
                Mais que maquiagem. <span className="italic text-champagne">Uma experiência.</span>
              </h3>
              <p className="text-sm text-champagne/85 leading-relaxed">
                Cada detalhe do atendimento foi pensado para oferecer tranquilidade, acolhimento e confiança do primeiro alinhamento até o instante de subir ao altar ou celebrar seus 15 anos.
              </p>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-8">
              {EXPERIENCE_PILLARS.map((pillar) => (
                <div
                  key={pillar.index}
                  className="pt-4 border-t border-champagne/20"
                >
                  <div className="flex items-baseline gap-3 mb-2">
                    <span className="font-display text-lg text-sand tabular-nums">
                      {pillar.index}.
                    </span>
                    <h4 className="font-display text-xl sm:text-2xl text-ivory font-normal">
                      {pillar.title}
                    </h4>
                  </div>
                  <p className="text-sm text-champagne/85 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
