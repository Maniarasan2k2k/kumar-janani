import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { emotionalSpectrumData } from '../data/memoriesData';

gsap.registerPlugin(ScrollTrigger);

export default function EmotionalSpectrum() {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const states = emotionalSpectrumData;

      states.forEach((_, idx) => {
        ScrollTrigger.create({
          trigger: `.emotion-trigger-${idx}`,
          start: 'top 60%',
          end: 'bottom 60%',
          onEnter: () => setActiveIndex(idx),
          onEnterBack: () => setActiveIndex(idx)
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const currentItem = emotionalSpectrumData[activeIndex];

  return (
    <section ref={containerRef} className="relative bg-[#080706] text-[#f4ebd0]">
      {/* Sticky Cinematic Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden z-10">
        {/* Background Image with Transition */}
        {emotionalSpectrumData.map((item, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
            }`}
          >
            <img
              src={item.image}
              alt={item.state}
              className="w-full h-full object-cover filter brightness-50 contrast-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/60 to-[#080706]/70" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#080706]/40 to-[#080706]" />
          </div>
        ))}

        {/* Floating Narrative Content */}
        <div className="relative z-20 max-w-3xl px-6 text-center flex flex-col items-center gap-6">
          <span className="px-6 py-2 rounded-full text-sm font-anek tracking-widest text-[#d4af37] border border-[#d4af37]/40 bg-[#080706]/70 backdrop-blur-md">
            உணர்ச்சிகளின் பயணம் • {currentItem.state}
          </span>

          <h3 className="font-arima text-3xl sm:text-5xl md:text-6xl font-bold text-[#f4ebd0] gold-glow leading-snug transition-all duration-700">
            {currentItem.text}
          </h3>

          {/* Progress Indicators */}
          <div className="flex items-center gap-3 mt-8">
            {emotionalSpectrumData.map((st, i) => (
              <div
                key={i}
                className={`h-2 rounded-full transition-all duration-500 ${
                  i === activeIndex ? 'w-10 bg-[#d4af37]' : 'w-2 bg-[#f4ebd0]/30'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Invisible Scroll Triggers Container */}
      <div className="relative z-0">
        {emotionalSpectrumData.map((item, idx) => (
          <div
            key={idx}
            className={`emotion-trigger-${idx} h-screen flex items-center justify-center pointer-events-none opacity-0`}
          >
            Trigger {idx + 1}
          </div>
        ))}
      </div>
    </section>
  );
}
