'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import AnimatedSection from './AnimatedSection';
import { MessageSquare, Search, Wrench, ThumbsUp } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: 'Kontaktujete nás',
    desc: 'Zavolejte, napište nebo přijďte rovnou do servisu. Poradíme vám s problémem a navrhneme řešení.',
  },
  {
    icon: Search,
    title: 'Diagnostika a nacenění',
    desc: 'Zařízení zdiagnostikujeme a sdělíme vám přesnou cenu opravy. Při realizaci opravy je diagnostika zdarma.',
  },
  {
    icon: Wrench,
    title: 'Expresní oprava',
    desc: 'Většinu oprav zvládneme do hodiny na počkání. Používáme kvalitní originální díly.',
  },
  {
    icon: ThumbsUp,
    title: 'Předání s garancí',
    desc: 'Zařízení vám předáme otestované a funkční. Ke každé opravě poskytujeme záruku 24 měsíců. Na výměnu baterie se vztahuje záruka 6 měsíců.',
  },
];

function TimelineStep({
  step,
  index,
}: {
  step: (typeof steps)[number];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const Icon = step.icon;
  const delay = index * 0.35;

  return (
    <div ref={ref} className="relative flex items-start gap-5">
      {/* Animated line segment leading to this step */}
      {index > 0 && (
        <motion.div
          className="absolute left-5 -top-10 w-px h-10 origin-top bg-primary"
          initial={{ scaleY: 0 }}
          animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.5, delay: delay - 0.15, ease: 'easeOut' }}
        />
      )}

      {/* Animated circle */}
      <motion.div
        className="relative z-10 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{
          duration: 0.5,
          delay,
          type: 'spring',
          stiffness: 260,
          damping: 20,
        }}
        style={{
          backgroundColor: isInView ? '#ff6b2c' : '#ffffff',
          border: isInView ? 'none' : '2px solid #d2d2d7',
          color: '#ffffff',
        }}
      >
        <Icon className="w-4 h-4" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="pt-1 flex-1"
        initial={{ opacity: 0, x: 40 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 40 }}
        transition={{
          duration: 0.6,
          delay: delay + 0.15,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        <motion.span
          className="text-xs font-semibold text-primary uppercase tracking-wider inline-block"
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: 0.4, delay: delay + 0.25 }}
        >
          Krok {index + 1}
        </motion.span>
        <h3 className="text-lg font-bold text-dark mt-0.5 mb-1.5">
          {step.title}
        </h3>
        <p className="text-gray-500 text-sm leading-relaxed max-w-md">
          {step.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function ProcessSection() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section id="postup" className="py-20 md:py-28 bg-surface">
      <div className="container-narrow">
        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Left — sticky heading */}
          <div className="lg:col-span-2">
            <AnimatedSection direction="left">
              <div className="lg:sticky lg:top-32">
                <h2 className="heading-accent text-3xl sm:text-4xl font-bold text-dark mb-4 tracking-tight">
                  Jak to funguje
                </h2>
                <p className="text-text-secondary text-lg leading-relaxed">
                  Celý proces opravy je jednoduchý a transparentní, od prvního
                  kontaktu až po předání opraveného zařízení.
                </p>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — animated vertical timeline */}
          <div className="lg:col-span-3" ref={sectionRef}>
            <div className="relative">
              {/* Static background line */}
              <div className="absolute left-5 top-6 bottom-6 w-px bg-gray-100" />

              {/* Animated progress line */}
              <motion.div
                className="absolute left-5 top-6 bottom-6 w-px bg-primary origin-top"
                initial={{ scaleY: 0 }}
                animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
                transition={{ duration: 2, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
              />

              <div className="space-y-10">
                {steps.map((step, i) => (
                  <TimelineStep key={i} step={step} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
