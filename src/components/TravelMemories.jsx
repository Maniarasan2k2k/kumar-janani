import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Compass, MapPin } from 'lucide-react';
import { travelData } from '../data/memoriesData';

gsap.registerPlugin(ScrollTrigger);

export default function TravelMemories() {
  const sectionRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const totalWidth = sectionRef.current.scrollWidth - window.innerWidth;

      gsap.to(sectionRef.current, {
        x: -totalWidth,
        ease: 'none',
        scrollTrigger: {
          trigger: triggerRef.current,
          start: 'top top',
          end: () => `+=${totalWidth}`,
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });
    }, triggerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={triggerRef} className="relative overflow-hidden bg-[#080706]">
      {/* Horizontal Scroll Track */}
      <div
        ref={sectionRef}
        className="h-screen flex items-center gap-12 px-12 md:px-24 w-max"
      >
        {/* Intro Card */}
        <div className="w-[85vw] sm:w-[500px] flex-shrink-0 flex flex-col items-start gap-6 p-8 glass-panel-gold rounded-3xl">
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/20 text-[#d4af37] text-sm font-anek">
            <Compass className="w-4 h-4" />
            <span>பயண நினைவுகள்</span>
          </div>

          <h2 className="font-arima text-4xl sm:text-5xl font-bold text-[#f4ebd0] gold-glow">
            நாம் சென்ற பாதைகள்…
          </h2>

          <p className="font-mukta text-xl text-[#e0a96d] font-light leading-relaxed">
            அந்த பயணத்தில் பார்த்த இடங்களை விட,
            <br />
            உன்னுடன் இருந்த நேரம்தான் எனக்கு முக்கியம்.
          </p>

          <div className="text-xs font-anek text-[#8c8275] tracking-widest uppercase mt-4">
            வலப்புறம் நகரவும் →
          </div>
        </div>

        {/* Travel Memory Cards */}
        {travelData.map((item, idx) => (
          <div
            key={item.id}
            className="w-[85vw] sm:w-[650px] h-[70vh] flex-shrink-0 relative rounded-3xl overflow-hidden border border-[#d4af37]/30 shadow-2xl group"
          >
            <img
              src={item.image}
              alt={item.caption}
              className="w-full h-full object-cover transform transition-transform duration-1000 group-hover:scale-110 filter brightness-75 contrast-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/30 to-transparent" />

            <div className="absolute bottom-0 inset-x-0 p-8 sm:p-12 flex flex-col gap-3">
              <div className="flex items-center gap-2 text-[#d4af37] text-sm font-anek">
                <MapPin className="w-4 h-4" />
                <span>பயணம் #{idx + 1}</span>
              </div>
              <h3 className="font-arima text-2xl sm:text-4xl font-bold text-[#f4ebd0] gold-glow">
                {item.caption}
              </h3>
              <p className="font-mukta text-lg text-[#e0a96d] font-light">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
