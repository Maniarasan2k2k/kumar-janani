import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Heart, ChevronDown } from 'lucide-react';
import { getMemoryPlaceholder } from '../utils/imageGenerator';

export default function OpeningScreen({ onEnter }) {
  const containerRef = useRef(null);
  const bgRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const btnRef = useRef(null);

  const heroBg = getMemoryPlaceholder(1, 'என் செல்ல மகளுக்காக…', 'நினைவுகளின் காவியம்');

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // Initial state
      gsap.set(bgRef.current, { scale: 1.15, opacity: 0 });
      gsap.set(text1Ref.current, { opacity: 0, y: 30, filter: 'blur(10px)' });
      gsap.set(text2Ref.current, { opacity: 0, y: 30, filter: 'blur(10px)' });
      gsap.set(btnRef.current, { opacity: 0, y: 20 });

      // Animate background blur fade-in
      tl.to(bgRef.current, {
        opacity: 0.35,
        scale: 1,
        duration: 2.5,
        ease: 'power2.out'
      })
      // Line 1: "என் செல்ல மகளுக்காக…"
      .to(text1Ref.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.8,
        ease: 'power3.out'
      }, '-=1.2')
      // Line 2: "நாம் சேர்ந்து கடந்த ஆண்டுகளை மீண்டும் ஒருமுறை வாழ்ந்து பார்க்கலாம்…"
      .to(text2Ref.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 2,
        ease: 'power3.out'
      }, '+=0.4')
      // Button reveal
      .to(btnRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.2,
        ease: 'back.out(1.7)'
      }, '+=0.5');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleEnterClick = () => {
    // Cinematic exit animation
    const tl = gsap.timeline({
      onComplete: () => {
        if (onEnter) onEnter();
      }
    });

    tl.to([text1Ref.current, text2Ref.current, btnRef.current], {
      opacity: 0,
      y: -40,
      duration: 1.2,
      stagger: 0.15,
      ease: 'power2.inOut'
    })
    .to(bgRef.current, {
      scale: 1.5,
      opacity: 0.8,
      duration: 1.6,
      ease: 'power3.inOut'
    }, '-=0.8')
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.in'
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#080706] text-[#f4ebd0] overflow-hidden select-none"
    >
      {/* Background blurred old photo texture */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center filter blur-lg brightness-50 transform pointer-events-none"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Dark Vignette and Overlay Gradients */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-[#080706] opacity-90" />
      <div className="absolute inset-0 bg-radial from-transparent via-[#080706]/70 to-[#080706]" />

      {/* Subtle Dust & Warm Sparks */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Center Emotional Content */}
      <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center">
        {/* Heart Icon */}
        <div className="mb-6 opacity-80 animate-pulse text-[#d4af37]">
          <Heart className="w-8 h-8 fill-[#d4af37]/20 stroke-[#d4af37]" />
        </div>

        {/* Line 1 */}
        <h1
          ref={text1Ref}
          className="font-arima text-4xl sm:text-6xl md:text-7xl font-bold tracking-wide text-[#f4ebd0] gold-glow mb-6 leading-tight"
        >
          என் செல்ல மகளுக்காக…
        </h1>

        {/* Line 2 */}
        <p
          ref={text2Ref}
          className="font-mukta text-xl sm:text-2xl md:text-3xl font-light text-[#e0a96d] max-w-2xl leading-relaxed cream-glow mb-12"
        >
          நாம் சேர்ந்து கடந்த ஆண்டுகளை
          <br />
          மீண்டும் ஒருமுறை வாழ்ந்து பார்க்கலாம்…
        </p>

        {/* Action Button: "உள்ளே செல்லுங்கள் ↓" */}
        <button
          ref={btnRef}
          onClick={handleEnterClick}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full glass-panel-gold text-[#f4ebd0] font-anek text-lg sm:text-xl font-medium tracking-wide transition-all duration-500 hover:scale-105 hover:border-[#d4af37] hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] cursor-pointer"
        >
          <span>உள்ளே செல்லுங்கள்</span>
          <ChevronDown className="w-5 h-5 text-[#d4af37] transition-transform duration-300 group-hover:translate-y-1" />
          <span className="absolute inset-0 rounded-full bg-[#d4af37]/10 blur-sm opacity-0 group-hover:opacity-100 transition-opacity" />
        </button>
      </div>

      {/* Subtext Footer */}
      <div className="absolute bottom-8 text-xs sm:text-sm font-anek text-[#8c8275] tracking-widest uppercase opacity-60">
        அன்புடன் வழங்கும் டிஜிட்டல் நினைவுகள்
      </div>
    </div>
  );
}
