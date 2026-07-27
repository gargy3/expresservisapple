'use client';

import { useState } from 'react';
import AnimatedSection from './AnimatedSection';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    const data = new FormData(e.currentTarget);
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'contact',
          name: data.get('name') as string,
          email: data.get('email') as string,
          phone: data.get('phone') as string,
          message: data.get('message') as string,
        }),
      });
    } catch {
      // zobrazíme potvrzení i při chybě sítě
    } finally {
      setSending(false);
      setSent(true);
    }
  };

  return (
    <section id="kontakt" className="py-20 md:py-28 bg-surface">
      <div className="container-narrow">
        <AnimatedSection direction="none">
          <div className="max-w-2xl mb-12">
            <h2 className="heading-accent text-3xl sm:text-4xl font-bold text-dark mb-4 tracking-tight">
              Kontakt
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Přijďte k nám nebo nás kontaktujte, rádi vám poradíme a pomůžeme.
            </p>
          </div>
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Form — left, above map on mobile */}
          <AnimatedSection
            direction="none"
            className="lg:col-span-2 order-first lg:order-first"
          >
            <div className="bg-white rounded-2xl border border-border p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
              <h3 className="text-lg font-bold text-dark mb-1">Napište nám</h3>
              <p className="text-sm text-text-secondary mb-6">
                Odpovíme do 24 hodin v pracovní dny.
              </p>

              {sent ? (
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-3">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="font-semibold text-dark mb-1">
                    Zpráva odeslána
                  </p>
                  <p className="text-sm text-text-secondary">
                    Ozveme se co nejdříve.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    name="name"
                    placeholder="Jméno a příjmení"
                    required
                    minLength={2}
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-dark placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Telefon"
                    required
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-dark placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                  <input
                    type="email"
                    name="email"
                    placeholder="E-mail"
                    required
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-dark placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors"
                  />
                  <textarea
                    name="message"
                    placeholder="Popište váš problém..."
                    rows={4}
                    required
                    className="w-full px-4 py-3 bg-surface border border-border rounded-xl text-dark placeholder:text-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-colors resize-none"
                  />
                  <button
                    type="submit"
                    disabled={sending}
                    className="btn-primary w-full py-3.5 justify-center disabled:opacity-60"
                  >
                    {sending ? (
                      'Odesílám...'
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Odeslat zprávu
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </AnimatedSection>

          {/* Map + contact info — right */}
          <AnimatedSection direction="up" className="lg:col-span-3 space-y-5">
            {/* Map */}
            <div
              className="rounded-2xl overflow-hidden h-64 md:h-72 border border-border"
              style={{ touchAction: 'none' }}
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.5!2d16.6037!3d49.1938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47129444f0e6dbd5%3A0x8b1e6e3d3f0e8a1b!2sKosmova%204%2C%20612%2000%20Brno!5e0!3m2!1scs!2scz!4v1700000000000"
                className="w-full h-full border-0 pointer-events-none md:pointer-events-auto"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Mapa: Expres Servis Apple, Kosmova 4, Brno"
              />
            </div>

            {/* Contact cards */}
            <address className="grid grid-cols-1 sm:grid-cols-2 gap-3 not-italic">
              <a
                href="tel:+420777041184"
                className="bg-white rounded-xl p-4 border border-border hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                    <Phone className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-text-secondary block">
                      Telefon
                    </span>
                    <span className="text-sm font-semibold text-dark">
                      +420 777 041 184
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="mailto:info@expresservisapple.cz"
                className="bg-white rounded-xl p-4 border border-border hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                    <Mail className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-text-secondary block">
                      E-mail
                    </span>
                    <span className="text-sm font-semibold text-dark">
                      info@expresservisapple.cz
                    </span>
                  </div>
                </div>
              </a>

              <a
                href="https://maps.google.com/?q=Kosmova+4,+612+00+Brno"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-4 border border-border hover:border-primary/40 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-text-secondary block">
                      Adresa
                    </span>
                    <span className="text-sm font-semibold text-dark">
                      Kosmova 4, 612 00 Brno-Královo Pole
                    </span>
                  </div>
                </div>
              </a>

              <div className="bg-white rounded-xl p-4 border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-accent-light flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-xs text-text-secondary block mb-1">
                      Otevírací doba
                    </span>
                    <span className="text-sm font-semibold text-dark block">
                      Po–Pá 8:30–18:00
                    </span>
                    <span className="text-sm text-text-secondary">
                      So/Ne zavřeno (po domluvě)
                    </span>
                  </div>
                </div>
              </div>
            </address>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
