import React, { useEffect, useState, useRef } from 'react';
import { Heart, Edit3 } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FathersLetter({ letterText, onOpenEdit }) {
  const containerRef = useRef(null);
  const letterBoxRef = useRef(null);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    let index = 0;
    let timer = null;

    // Trigger typing effect when scrolled into view
    const trigger = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top 60%',
      onEnter: () => {
        if (displayedText.length === 0) {
          timer = setInterval(() => {
            if (index < letterText.length) {
              setDisplayedText(letterText.slice(0, index + 1));
              index++;
            } else {
              clearInterval(timer);
            }
          }, 35); // Typing speed
        }
      }
    });

    return () => {
      trigger.kill();
      if (timer) clearInterval(timer);
    };
  }, [letterText]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        letterBoxRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      id="fathers-letter"
      className="relative py-28 px-4 sm:px-8 bg-[#080706] text-[#f4ebd0] overflow-hidden"
    >
      {/* Background Subtle Dust Grid */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10 flex flex-col items-center">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]/20" />
          <h2 className="font-arima text-4xl sm:text-5xl font-bold text-[#d4af37] gold-glow">
            அப்பாவிடமிருந்து…
          </h2>
          <Heart className="w-6 h-6 text-[#d4af37] fill-[#d4af37]/20" />
        </div>

        {/* Letter Card Box */}
        <div
          ref={letterBoxRef}
          className="w-full relative glass-panel-gold rounded-3xl p-8 sm:p-14 border border-[#d4af37]/40 shadow-[0_20px_60px_rgba(0,0,0,0.8)]"
        >
          {/* Edit Button */}
          <button
            onClick={onOpenEdit}
            className="absolute top-6 right-6 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#080706]/70 text-[#d4af37] hover:text-[#f4ebd0] border border-[#d4af37]/30 text-xs font-anek transition-colors cursor-pointer"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>செய்தியைத் திருத்து</span>
          </button>

          {/* Letter Text Content */}
          <div className="font-arima text-lg sm:text-2xl text-[#f4ebd0] leading-relaxed whitespace-pre-line tracking-wide">
            {displayedText}
            {displayedText.length < letterText.length && (
              <span className="inline-block w-2 h-6 bg-[#d4af37] ml-1 animate-pulse" />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
