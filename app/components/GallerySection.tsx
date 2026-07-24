'use client';

import AnimatedSection from './AnimatedSection';
import Image from 'next/image';

const images = [
  {
    src: '/galerie/11144B4D-219B-4811-B9B5-7C3BFA64CBB9.jpg',
    alt: 'Interiér Apple servisu v Brně',
    span: 'col-span-2 md:col-span-2 row-span-2 md:row-span-2',
  },
  {
    src: '/galerie/239371F5-CEAE-4410-B092-C3933AC706E7.jpg',
    alt: 'Čekací zóna servisu',
    span: '',
  },
  {
    src: '/galerie/2E215144-6314-41B9-BBB8-014086BA75DA.jpg',
    alt: 'Recepce servisu',
    span: '',
  },
  {
    src: '/galerie/48F04EB7-C274-4C61-8CDE-8FD6DCC4BE00.jpg',
    alt: 'Vybavení Apple servisu',
    span: '',
  },
  {
    src: '/galerie/CE5FC19A-34BC-4C7B-8E87-1CCBA5483224.jpg',
    alt: 'Hlavní vstup do servisu',
    span: '',
  },
];

export default function GallerySection() {
  return (
    <section id="galerie" className="py-20 md:py-28 bg-surface">
      <div className="container-narrow">
        <AnimatedSection direction="none">
          <div className="max-w-2xl mb-10">
            <h2 className="heading-accent text-3xl sm:text-4xl font-bold text-dark mb-4 tracking-tight">
              Náš servis
            </h2>
            <p className="text-text-secondary text-lg leading-relaxed">
              Moderní vybavení a příjemné prostředí.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection direction="up">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 auto-rows-[180px] md:auto-rows-[200px]">
            {images.map((img, i) => (
              <div
                key={i}
                className={`relative rounded-2xl overflow-hidden group bg-gray-100 ${img.span}`}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAAIAAoDASIAAhEBAxEB/8QAFgABAQEAAAAAAAAAAAAAAAAABgUEB//EACMQAAIBBAIBBQAAAAAAAAAAAAECAAMEERIhBRMxQVH/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8Amr3VtFdSGaRFZmOS3eqaLQ1BqmrUbH4lG9fKCBkYAjjBHXzERPFHMsTp//Z"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300 flex items-end">
                  <span className="text-white text-sm font-medium p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {img.alt}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
