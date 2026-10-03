import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Calendar } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function GrowingUpStory({ memories }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.memory-story-card');

      cards.forEach((card, i) => {
        const image = card.querySelector('.story-img');
        const text = card.querySelector('.story-text');

        // Reveal timeline animation for each card
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 75%',
            end: 'bottom 20%',
            toggleActions: 'play reverse play reverse'
          }
        });

        tl.fromTo(
          card,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' }
        )
        .fromTo(
          image,
          { scale: 1.15, filter: 'brightness(0.7)' },
          { scale: 1, filter: 'brightness(1)', duration: 1.5, ease: 'power2.out' },
          '-=1.0'
        )
        .fromTo(
          text,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1, ease: 'power3.out' },
          '-=1.2'
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [memories]);

  // Render all 15 memories in the storytelling sequence
  const storyMemories = memories;

  return (
    <section ref={containerRef} className="relative py-24 px-4 sm:px-8 bg-[#080706] text-[#f4ebd0]">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm font-anek mb-4">
          <Sparkles className="w-4 h-4" />
          <span>வளர்ந்து வந்த காலம்</span>
        </div>
        <h2 className="font-arima text-4xl sm:text-5xl md:text-6xl font-bold gold-glow mb-6">
          நேற்று வரை என் கைகளில் இருந்த குட்டிப் பெண்…
        </h2>
        <p className="font-mukta text-xl sm:text-2xl text-[#e0a96d] font-light max-w-2xl mx-auto cream-glow">
          எப்போது இவ்வளவு பெரியவளாகிவிட்டாய்?
        </p>
      </div>

      {/* Vertical Story Cards Timeline */}
      <div className="max-w-5xl mx-auto flex flex-col gap-28 sm:gap-36">
        {storyMemories.map((mem, idx) => {
          const isEven = idx % 2 === 0;
          const bgImg = mem.customImage || mem.image;

          return (
            <div
              key={mem.id}
              className={`memory-story-card flex flex-col ${
                isEven ? 'md:flex-row' : 'md:flex-row-reverse'
              } items-center gap-8 md:gap-14`}
            >
              {/* Image Frame */}
              <div className="w-full md:w-1/2 relative group">
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-[#d4af37]/20 via-[#e0a96d]/10 to-transparent blur-lg opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative overflow-hidden rounded-2xl border border-[#d4af37]/20 bg-[#14100d] shadow-2xl aspect-[4/3]">
                  <img
                    src={bgImg}
                    alt={mem.title}
                    className="story-img w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#080706]/80 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-[#080706]/70 backdrop-blur-md border border-[#d4af37]/30 text-xs font-anek text-[#d4af37]">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{mem.date}</span>
                  </div>
                </div>
              </div>

              {/* Text Narrative */}
              <div className="story-text w-full md:w-1/2 flex flex-col items-start gap-4">
                <span className="text-sm font-anek font-semibold text-[#d4af37] tracking-wider uppercase">
                  நினைவு #{String(mem.id).padStart(2, '0')} • {mem.stage}
                </span>

                <h3 className="font-arima text-2xl sm:text-3xl font-bold text-[#f4ebd0] leading-snug">
                  {mem.title}
                </h3>

                <p className="font-mukta text-lg text-[#e0a96d] font-light">
                  {mem.subtitle}
                </p>

                <p className="font-anek text-base text-[#c2b6a6] font-light leading-relaxed bg-[#14100d]/60 p-5 rounded-xl border border-[#d4af37]/10 backdrop-blur-sm mt-2">
                  {mem.story}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
