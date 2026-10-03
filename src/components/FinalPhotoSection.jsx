import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FinalPhotoSection({ memory }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const darkOverlayRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);

  const bgImg = memory?.customImage || memory?.image;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Initial setup
      gsap.set([text1Ref.current, text2Ref.current], { opacity: 0, y: 30, filter: 'blur(8px)' });

      // Image zoom + slow darkening overlay
      tl.to(imgRef.current, { scale: 1.25, duration: 2, ease: 'power1.out' })
        .to(darkOverlayRef.current, { opacity: 0.8, duration: 2 }, '-=2')
        .to(text1Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 })
        .to({}, { duration: 0.8 }) // Pause
        .to(text2Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 })
        .to({}, { duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#080706] text-[#f4ebd0] overflow-hidden flex items-center justify-center"
    >
      {/* Background Special Dad & Daughter Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          ref={imgRef}
          src={bgImg}
          alt="இறுதி புகைப்படம்"
          className="w-full h-full object-cover"
        />
        {/* Darkening Overlay */}
        <div ref={darkOverlayRef} className="absolute inset-0 bg-[#080706] opacity-40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#080706]/40 to-[#080706]" />
      </div>

      {/* Narrative Lines */}
      <div className="relative z-10 max-w-3xl px-6 text-center flex flex-col items-center gap-6">
        <h3 ref={text1Ref} className="font-arima text-3xl sm:text-5xl font-bold text-[#f4ebd0] gold-glow">
          இது முடிவு அல்ல…
        </h3>

        <h2 ref={text2Ref} className="font-arima text-4xl sm:text-6xl font-extrabold text-[#d4af37] gold-glow leading-tight">
          நம் அடுத்த நினைவுக்கான தொடக்கம்.
        </h2>
      </div>
    </section>
  );
}
