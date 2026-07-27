'use client';

import { Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const navLinks = [
  { label: 'Služby', href: '/#sluzby' },
  { label: 'Ceník', href: '/#cenik' },
  { label: 'Prodej & výkup', href: '/#prodej' },
  { label: 'Časté dotazy', href: '/#faq' },
  { label: 'Kontakt', href: '/#kontakt' },
];

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-border">
      <div className="container-narrow py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
          {/* Brand */}
          <div>
            <Link href="/#home" className="inline-block mb-4">
              <Image
                src="/Logo/logo-expres-servis orange.png"
                alt="Expres Servis Apple"
                width={120}
                height={54}
              />
            </Link>
            <p className="text-text-secondary text-sm leading-relaxed mb-3">
              Expresní opravy Apple zařízení.
            </p>
            <p className="text-xs text-gray-400">
              IČ: 07042515 · DIČ: CZ07042515
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">
              Navigace
            </h4>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + hours */}
          <div>
            <h4 className="text-xs font-bold text-dark uppercase tracking-wider mb-4">
              Kontakt
            </h4>
            <address className="not-italic">
              <ul className="space-y-3 mb-5">
                <li>
                  <a
                    href="tel:+420777041184"
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    <Phone className="w-3.5 h-3.5 flex-shrink-0" />
                    +420 777 041 184
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:info@expresservisapple.cz"
                    className="flex items-center gap-2 text-sm text-text-secondary hover:text-primary transition-colors"
                  >
                    <Mail className="w-3.5 h-3.5 flex-shrink-0" />
                    info@expresservisapple.cz
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-text-secondary">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  Kosmova 4, 612 00 Brno-Královo Pole
                </li>
              </ul>
              <div className="text-sm text-text-secondary space-y-0.5">
                <div className="flex justify-between max-w-[200px]">
                  <span>Po – Pá</span>
                  <span className="font-medium text-dark">8:30–18:00</span>
                </div>
                <div className="flex justify-between max-w-[200px]">
                  <span>So / Ne</span>
                  <span className="text-text-secondary">
                    Zavřeno (po domluvě)
                  </span>
                </div>
              </div>
            </address>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
          <p className="text-xs text-text-secondary">
            &copy; {new Date().getFullYear()} Expres Servis Apple. Všechna práva
            vyhrazena.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5">
            <Link
              href="/obchodni-podminky"
              className="text-xs text-text-secondary hover:text-primary transition-colors"
            >
              Obchodní podmínky
            </Link>
            <p className="text-xs text-text-secondary">Brno, Česká republika</p>
            <a
              href="https://www.linkedin.com/in/janiktomas/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-text-secondary hover:text-primary transition-colors"
            >
              Web vytvořil Thomasix-Cloud
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
