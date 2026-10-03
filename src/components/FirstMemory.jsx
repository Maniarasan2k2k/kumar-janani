import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FirstMemory({ memory }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);
  const textGroupRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax scale animation on image
      gsap.fromTo(
        imageRef.current,
        { scale: 1.25, y: -20 },
        {
          scale: 1.05,
          y: 20,
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
          }
        }
      );

      // Text reveal
      gsap.fromTo(
        textGroupRef.current.children,
        { opacity: 0, y: 40, filter: 'blur(8px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.3,
          duration: 1.5,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 70%',
            end: 'top 30%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const bgImage = memory?.customImage || memory?.image;

  return (
    <section
      ref={containerRef}
      id="first-memory"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#080706]"
    >
      {/* Background Image with subtle parallax */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imageRef}
          src={bgImage}
          alt="முதல் நினைவு"
          className="w-full h-full object-cover object-center filter brightness-65 contrast-105"
        />
        {/* Soft Vignette Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/40 to-[#080706]/70" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080706]/50 to-[#080706]" />
      </div>

      {/* Foreground Emotional Content */}
      <div className="relative z-10 max-w-4xl px-6 py-20 text-center">
        <div ref={textGroupRef} className="flex flex-col items-center gap-6">
          {/* Badge */}
          <span className="px-5 py-1.5 rounded-full text-sm font-medium font-anek tracking-wider text-[#d4af37] bg-[#080706]/60 border border-[#d4af37]/30 backdrop-blur-md">
            நினைவு #01 • {memory?.stage || 'குழந்தைப் பருவம்'}
          </span>

          {/* Heading */}
          <h2 className="font-arima text-4xl sm:text-6xl md:text-7xl font-bold text-[#f4ebd0] gold-glow leading-tight">
            {memory?.title || 'ஒரு சிறிய கையை பிடித்த அந்த நாள்…'}
          </h2>

          {/* Decorative Divider */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent my-2 opacity-80" />

          {/* Subtitle */}
          <p className="font-mukta text-xl sm:text-2xl md:text-3xl text-[#e0a96d] font-light max-w-2xl cream-glow leading-relaxed">
            {memory?.subtitle || 'அன்றிலிருந்து என் உலகமே கொஞ்சம் மாறிவிட்டது.'}
          </p>

          {/* Story Paragraph */}
          {memory?.story && (
            <p className="font-anek text-base sm:text-lg text-[#c2b6a6] font-light max-w-xl leading-relaxed mt-4 bg-[#080706]/50 p-6 rounded-2xl border border-[#d4af37]/10 backdrop-blur-sm">
              "{memory.story}"
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
