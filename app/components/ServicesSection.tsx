'use client';

import AnimatedSection from './AnimatedSection';
import { Smartphone, Tablet, Laptop, ArrowRight } from 'lucide-react';

const services = [
  {
    title: 'iPhone servis',
    icon: Smartphone,
    from: '990',
    desc: 'Kompletní opravy všech modelů iPhone. Displej, baterie, nabíjení i základní deska.',
    repairs: [
      'Výměna displeje',
      'Výměna baterie',
      'Oprava nabíjení',
      'Face ID / Touch ID',
      'Oprava základní desky',
      'Výměna zadního skla',
    ],
  },
  {
    title: 'iPad servis',
    icon: Tablet,
    from: '1 490',
    desc: 'Opravy iPadů všech generací: displej, baterie, konektor i tlačítka.',
    repairs: [
      'Výměna displeje',
      'Výměna baterie',
      'Oprava konektoru',
      'Oprava tlačítek',
      'Výměna kamery',
      'Softwarová oprava',
    ],
  },
  {
    title: 'MacBook servis',
    icon: Laptop,
    from: '1 990',
    desc: 'Servis MacBooků Air i Pro: klávesnice, displeje, SSD upgrade a opravy logické desky.',
    repairs: [
      'Výměna displeje',
      'Výměna klávesnice',
      'Oprava logické desky',
      'SSD výměna / upgrade',
      'Výměna baterie',
      'Čištění a údržba',
    ],
  },
];

export default function ServicesSection() {
  return (
    <section id="sluzby" className="py-20 md:py-28 bg-white">
      <div className="container-narrow">
        <AnimatedSection direction="none">
          <div className="max-w-2xl mb-14">
            <h2 className="heading-accent text-3xl sm:text-4xl font-bold text-dark mb-4 tracking-tight">
              Co opravujeme
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Specializujeme se na expresní opravy Apple zařízení. Většinu oprav
              zvládneme na&nbsp;počkání do jedné hodiny.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid md:grid-cols-3 gap-5 mb-10">
          {services.map((svc, i) => {
            const Icon = svc.icon;
            return (
              <AnimatedSection key={i} direction="up" delay={i * 0.08}>
                <div className="bg-white rounded-2xl border border-border p-6 md:p-7 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow h-full flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl bg-accent-light flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="text-lg font-bold text-dark tracking-tight">
                      {svc.title}
                    </h3>
                  </div>

                  <p className="text-text-secondary text-sm leading-relaxed mb-5">
                    {svc.desc}
                  </p>

                  <ul className="space-y-2 mb-6 flex-1">
                    {svc.repairs.map((repair, j) => (
                      <li
                        key={j}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="w-1 h-1 rounded-full bg-border flex-shrink-0" />
                        {repair}
                      </li>
                    ))}
                  </ul>

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <span className="text-sm text-text-secondary">
                      Od <strong className="text-dark">{svc.from} Kč</strong>
                    </span>
                    <a
                      href="#cenik"
                      className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-hover transition-colors"
                    >
                      Ceník
                      <ArrowRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            );
          })}
        </div>

        {/* Inline "Další zařízení" — no icon grid */}
        <AnimatedSection direction="none" delay={0.2}>
          <p className="text-sm text-text-secondary text-center">
            Opravujeme také <strong className="text-dark">Apple Watch</strong>.{' '}
            <a
              href="#kontakt"
              className="text-primary font-semibold hover:underline"
            >
              Kontaktujte nás
            </a>{' '}
            pro nacenění.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
