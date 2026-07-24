'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Phone, MapPin, Clock } from 'lucide-react';
import Image from 'next/image';

const navLinks = [
  { label: 'Služby', href: '#sluzby' },
  { label: 'Ceník', href: '#cenik' },
  { label: 'Prodej & výkup', href: '#prodej' },
  { label: 'Časté dotazy', href: '#faq' },
  { label: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      {/* Top info bar */}
      <div
        className={`fixed top-0 left-0 right-0 z-50 bg-surface text-text-secondary text-[13px] transition-all duration-300 overflow-hidden ${
          scrolled ? 'h-0 opacity-0' : 'h-9 opacity-100'
        }`}
      >
        <div className="container-narrow h-full flex items-center justify-between">
          <div className="hidden sm:flex items-center gap-5">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              Kosmova 4, Brno
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3 h-3" />
              Po–Pá 8:30–18:00
            </span>
          </div>
          <a
            href="tel:+420777041184"
            className="flex items-center gap-1.5 font-medium text-dark hover:text-primary transition-colors"
          >
            <Phone className="w-3 h-3" />
            +420 777 041 184
          </a>
        </div>
      </div>

      {/* Main navbar */}
      <header
        className={`fixed left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'top-0 bg-white/90 backdrop-blur-xl border-b border-border shadow-sm'
            : 'top-9 bg-white/80 backdrop-blur-lg border-b border-border/50'
        }`}
      >
        <div className="container-narrow">
          <div className="flex items-center justify-between h-14 md:h-16">
            {/* Logo */}
            <a href="#home" className="flex items-center group">
              <Image
                src="/Logo/logo-expres-servis orange.png"
                alt="Expres Servis Apple"
                width={90}
                height={40}
                className="group-hover:opacity-80 transition-opacity"
                priority
              />
            </a>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-0.5">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-3.5 py-2 rounded-lg text-sm font-medium text-gray-500 hover:text-dark hover:bg-surface transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="tel:+420777041184"
                className="btn-primary ml-3 !py-2 !px-4 !text-sm"
              >
                <Phone className="w-3.5 h-3.5" />
                Zavolat
              </a>
            </nav>

            {/* Mobile: phone icon + hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <a
                href="tel:+420777041184"
                className="p-2 rounded-lg text-primary hover:bg-accent-light transition-colors"
                aria-label="Zavolat"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-dark hover:bg-surface transition-colors"
                aria-label={isOpen ? 'Zavřít menu' : 'Otevřít menu'}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-white flex flex-col"
          >
            {/* Header row */}
            <div className="flex items-center justify-between px-5 h-14 border-b border-border">
              <Image
                src="/Logo/logo-expres-servis orange.png"
                alt="Expres Servis Apple"
                width={80}
                height={36}
              />
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-dark hover:bg-surface transition-colors"
                aria-label="Zavřít menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Nav items */}
            <nav className="flex-1 flex flex-col justify-center px-8">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.25 }}
                  className="block py-4 text-2xl font-semibold text-dark border-b border-border/50 last:border-0 tracking-tight"
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom CTA */}
            <div className="px-8 pb-10">
              <a
                href="tel:+420777041184"
                className="btn-primary w-full justify-center py-4 text-base"
                onClick={() => setIsOpen(false)}
              >
                <Phone className="w-4 h-4" />
                +420 777 041 184
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
