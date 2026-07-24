import AnimatedSection from './AnimatedSection';

const faqs = [
  {
    question: 'Jak dlouho trvá oprava iPhone?',
    answer:
      'Většinu oprav iPhone zvládáme do 60 minut na počkání. Výměna baterie trvá přibližně 20 minut, výměna displeje 30 minut.',
  },
  {
    question: 'Jaká je záruka na opravu?',
    answer:
      'Na všechny opravy poskytujeme záruku 24 měsíců. Na výměnu baterie se vztahuje záruka 6 měsíců.',
  },
  {
    question: 'Používáte originální díly?',
    answer:
      'Ano, používáme originální díly od výrobce nebo OEM díly nejvyšší kvality.',
  },
  {
    question: 'Kolik stojí diagnostika?',
    answer:
      'Diagnostika je zdarma, pokud se rozhodnete pro opravu u nás. V případě, že opravu nerealizujete, účtujeme poplatek za diagnostiku.',
  },
  {
    question: 'Kde se servis nachází?',
    answer:
      'Náš servis se nachází na adrese Kosmova 4, 612 00 Brno, v centru města.',
  },
  {
    question: 'Vykupujete staré iPhony?',
    answer:
      'Ano, vykupujeme starší iPhony a další Apple zařízení za férové ceny. Přijďte k nám nebo nás kontaktujte pro nacenění.',
  },
  {
    question: 'Opravujete i Apple Watch?',
    answer:
      'Ano, opravujeme Apple Watch všech generací v omezeném rozsahu. Kontaktujte nás pro nacenění konkrétní opravy.',
  },
];

export default function FAQSection() {
  return (
    <section
      id="faq"
      aria-label="Časté dotazy"
      className="py-20 md:py-28 bg-surface"
    >
      <div className="container-narrow">
        <AnimatedSection direction="none">
          <div className="max-w-2xl mb-10">
            <h2 className="heading-accent text-3xl sm:text-4xl font-bold text-dark mb-4 tracking-tight">
              Časté dotazy
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Odpovědi na nejčastější otázky o opravách, záruce a diagnostice.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <div className="max-w-3xl divide-y divide-border border-y border-border">
            {faqs.map((faq) => (
              <details key={faq.question} className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-base font-semibold text-dark">
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="text-text-secondary transition-transform duration-200 group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 text-text-secondary leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
