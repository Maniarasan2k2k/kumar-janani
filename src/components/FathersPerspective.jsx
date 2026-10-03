import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function FathersPerspective({ memories }) {
  const containerRef = useRef(null);
  const line1Ref = useRef(null);
  const line2Ref = useRef(null);
  const line3Ref = useRef(null);
  const floatBgRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background floating items animation
      const floats = floatBgRef.current.children;
      gsap.to(floats, {
        y: 'random(-40, 40)',
        rotate: 'random(-10, 10)',
        duration: 'random(6, 12)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.5
      });

      // Pinned Text Timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=250%',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Initial state
      gsap.set([line1Ref.current, line2Ref.current, line3Ref.current], {
        opacity: 0,
        y: 40,
        filter: 'blur(10px)'
      });

      // Line 1: "நான் உன்னை வளர்த்தேன் என்று நினைத்தேன்…"
      tl.to(line1Ref.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.5
      })
      .to({}, { duration: 1 }) // Pause
      // Line 2: "ஆனால் உண்மையில்…"
      .to(line2Ref.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 1.5
      })
      .to({}, { duration: 1 }) // Pause
      // Line 3: "நீதான் என்னை ஒரு அப்பாவாக மாற்றினாய்."
      .to(line3Ref.current, {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        duration: 2
      })
      .to({}, { duration: 1.5 }); // Final pause
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const floatingPhotos = memories.slice(0, 8);

  return (
    <section
      ref={containerRef}
      id="fathers-perspective"
      className="relative h-screen w-full bg-[#050404] text-[#f4ebd0] overflow-hidden flex items-center justify-center"
    >
      {/* Floating Background Memory Photos */}
      <div ref={floatBgRef} className="absolute inset-0 pointer-events-none opacity-20">
        {floatingPhotos.map((mem, i) => {
          const img = mem.customImage || mem.image;
          const positions = [
            'top-12 left-10 w-48 aspect-video',
            'top-20 right-16 w-56 aspect-[4/3]',
            'bottom-16 left-16 w-52 aspect-[3/4]',
            'bottom-24 right-20 w-60 aspect-video',
            'top-1/3 left-6 w-40 aspect-square',
            'top-1/2 right-8 w-44 aspect-[4/3]',
            'bottom-1/3 left-1/4 w-48 aspect-video',
            'top-16 left-1/3 w-52 aspect-[4/3]'
          ];

          return (
            <div
              key={mem.id}
              className={`absolute rounded-xl overflow-hidden border border-[#d4af37]/30 shadow-2xl filter blur-[1px] brightness-75 ${positions[i % positions.length]}`}
            >
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          );
        })}
      </div>

      {/* Dark Vignette Overlay */}
      <div className="absolute inset-0 bg-radial from-transparent via-[#050404]/80 to-[#050404]" />

      {/* Central Pinned Narrative Text */}
      <div className="relative z-10 max-w-4xl px-6 text-center flex flex-col items-center gap-10">
        <span className="px-5 py-1.5 rounded-full text-xs font-anek tracking-widest text-[#d4af37] border border-[#d4af37]/30 bg-[#080706]/80 backdrop-blur-md">
          அப்பாவின் இதயம்
        </span>

        {/* Line 1 */}
        <h2
          ref={line1Ref}
          className="font-arima text-3xl sm:text-5xl md:text-6xl font-bold text-[#f4ebd0] gold-glow leading-tight"
        >
          நான் உன்னை வளர்த்தேன் என்று நினைத்தேன்…
        </h2>

        {/* Line 2 */}
        <p
          ref={line2Ref}
          className="font-mukta text-2xl sm:text-4xl text-[#e0a96d] font-light cream-glow"
        >
          ஆனால் உண்மையில்…
        </p>

        {/* Line 3 */}
        <h3
          ref={line3Ref}
          className="font-arima text-3xl sm:text-5xl md:text-6xl font-extrabold text-[#d4af37] gold-glow leading-tight"
        >
          நீதான் என்னை ஒரு அப்பாவாக மாற்றினாய்.
        </h3>
      </div>
    </section>
  );
}
