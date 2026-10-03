import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MemoriesAlive({ memories }) {
  const containerRef = useRef(null);

  // Take memories 6 to 12 for Memories Alive experience
  const activeMemories = memories.slice(5, 12);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray('.alive-memory-block');

      sections.forEach((sec, idx) => {
        const bg = sec.querySelector('.alive-bg');
        const text = sec.querySelector('.alive-text');

        gsap.fromTo(
          bg,
          { scale: 1.3, yPercent: -15, filter: 'blur(6px) brightness(0.6)' },
          {
            scale: 1,
            yPercent: 15,
            filter: 'blur(0px) brightness(0.85)',
            scrollTrigger: {
              trigger: sec,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true
            }
          }
        );

        gsap.fromTo(
          text,
          { opacity: 0, scale: 0.9, y: 50 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sec,
              start: 'top 65%',
              toggleActions: 'play reverse play reverse'
            }
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [memories]);

  return (
    <section ref={containerRef} className="relative bg-[#080706] text-[#f4ebd0]">
      {activeMemories.map((mem, idx) => {
        const img = mem.customImage || mem.image;
        return (
          <div
            key={mem.id}
            className="alive-memory-block relative h-screen w-full flex items-center justify-center overflow-hidden"
          >
            {/* Layered Parallax Background */}
            <div className="absolute inset-0 overflow-hidden">
              <img
                src={img}
                alt={mem.title}
                className="alive-bg w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/50 to-[#080706]" />
              <div className="absolute inset-0 bg-radial from-transparent via-[#080706]/40 to-[#080706]" />
            </div>

            {/* Text Overlay */}
            <div className="alive-text relative z-10 max-w-3xl px-6 text-center glass-panel-gold p-8 sm:p-12 rounded-3xl">
              <span className="text-xs font-anek text-[#d4af37] tracking-widest uppercase mb-3 block">
                உயிருள்ள நினைவு #{String(mem.id).padStart(2, '0')}
              </span>
              <h3 className="font-arima text-3xl sm:text-5xl font-bold text-[#f4ebd0] gold-glow mb-4">
                {mem.title}
              </h3>
              <p className="font-mukta text-xl text-[#e0a96d] font-light">
                {mem.subtitle}
              </p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
