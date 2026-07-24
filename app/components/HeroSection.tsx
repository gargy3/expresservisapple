'use client';

import { motion } from 'framer-motion';
import { Phone, ArrowRight } from 'lucide-react';
import Image from 'next/image';

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-[90vh] flex items-center bg-white overflow-hidden pt-24 md:pt-28"
    >
      {/* Subtle surface tint on right half */}
      <div className="absolute inset-y-0 right-0 w-1/2 bg-surface/60 rounded-l-[3rem] hidden lg:block" />

      <div className="relative container-narrow py-16 md:py-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — text */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.25, 0.4, 0.25, 1] }}
          >
            {/* Open badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-50 text-green-700 text-xs font-semibold mb-7">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
              Otevřeno Po–Pá 8:30–18:00
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold text-dark leading-[1.1] tracking-tight mb-5">
              Opravíme váš iPhone.
              <br />
              <span className="text-primary">Na počkání.</span>
            </h1>

            <p className="text-text-secondary text-lg leading-relaxed mb-9 max-w-lg">
              Expresní servis Apple zařízení (iPhone, iPad i MacBook) s
              24měsíční zárukou. Většina oprav do hodiny.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a href="tel:+420777041184" className="btn-primary py-3.5 px-7">
                <Phone className="w-4 h-4" />
                Zavolat +420 777 041 184
              </a>
              <a href="#cenik" className="btn-secondary py-3.5 px-7">
                Zobrazit ceník
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Trust signals — inline, no boxes */}
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-text-secondary">
              {[
                'Originální kvalita dílů',
                'Záruka 24 měsíců',
                '10+ let praxe',
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-green-500 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {item}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Right — service photo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.15,
              ease: [0.25, 0.4, 0.25, 1],
            }}
            className="relative hidden lg:block"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] shadow-[0_4px_40px_rgba(0,0,0,0.1)]">
              <Image
                src="/galerie/hero.jpg"
                alt="Expres Servis Apple, opravna Apple zařízení v Brně"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
              />
            </div>
            {/* Floating accent badge */}
            <div className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.12)] px-5 py-3.5">
              <p className="text-xs text-text-secondary mb-0.5">Diagnostika</p>
              <p className="text-xl font-bold text-dark">Zdarma k opravě</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
