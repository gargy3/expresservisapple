'use client';

import AnimatedSection from './AnimatedSection';
import { MapPin, Award, Users, ShieldCheck, Cpu, Clock } from 'lucide-react';

export default function AboutSection() {
  const tags = ['iPhone', 'iPad', 'MacBook', 'Apple Watch', 'iMac', 'AirPods'];

  return (
    <section id="o-nas" className="py-20 md:py-28 bg-white">
      <div className="container-narrow">
        {/* Top heading — left-aligned */}
        <AnimatedSection direction="left">
          <div className="max-w-2xl mb-14">
            <h2 className="heading-accent text-3xl sm:text-4xl font-extrabold text-dark mb-4">
              O nás
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Jsme specializovaný servis Apple zařízení.
              Kombinujeme rychlost expresních oprav s&nbsp;precizností
              a&nbsp;zárukou kvality. 10&nbsp;let zkušeností, tisíce spokojených
              zákazníků.
            </p>
          </div>
        </AnimatedSection>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Map card — wide */}
          <AnimatedSection direction="up" className="md:col-span-2">
            <div className="relative h-64 md:h-full min-h-[240px] rounded-2xl overflow-hidden group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2607.5!2d16.6037!3d49.1938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47129444f0e6dbd5%3A0x8b1e6e3d3f0e8a1b!2sKosmova%204%2C%20602%2000%20Brno!5e0!3m2!1scs!2scz!4v1700000000000"
                className="absolute inset-0 w-full h-full border-0"
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-dark/80 to-transparent p-5">
                <div className="flex items-center gap-2 text-white">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium">
                    Kosmova 4, 612 00 Brno
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* Stats column */}
          <div className="flex flex-col gap-4">
            <AnimatedSection direction="right" delay={0.1}>
              <div className="bg-primary rounded-2xl p-6 text-white flex flex-col justify-center h-full">
                <Award className="w-8 h-8 mb-3 opacity-80" />
                <span className="text-3xl font-extrabold">10+</span>
                <span className="text-sm opacity-80 mt-1">let na trhu</span>
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="bg-dark rounded-2xl p-6 text-white flex flex-col justify-center h-full">
                <Users className="w-8 h-8 mb-3 opacity-60" />
                <span className="text-3xl font-extrabold">5 000+</span>
                <span className="text-sm text-white/70 mt-1">
                  spokojených zákazníků
                </span>
              </div>
            </AnimatedSection>
          </div>

          {/* Feature tags — bottom row */}
          <AnimatedSection
            direction="up"
            delay={0.15}
            className="md:col-span-2"
          >
            <div className="bg-gray-50 rounded-2xl p-6">
              <p className="text-sm font-semibold text-dark mb-3">
                Opravujeme všechna Apple zařízení
              </p>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </AnimatedSection>

          <AnimatedSection direction="up" delay={0.25}>
            <div className="bg-gray-50 rounded-2xl p-6 flex flex-col gap-4 h-full">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-dark">
                    Záruka
                  </span>
                  <p className="text-xs text-gray-500">24 měsíců na opravu</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Cpu className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-dark">
                    Originální díly
                  </span>
                  <p className="text-xs text-gray-500">Kvalita od výrobce</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <span className="text-sm font-semibold text-dark">
                    Expresní opravy
                  </span>
                  <p className="text-xs text-gray-500">Většina do hodiny</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
