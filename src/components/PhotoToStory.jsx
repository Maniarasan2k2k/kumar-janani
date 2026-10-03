import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function PhotoToStory({ memory }) {
  const containerRef = useRef(null);
  const imgRef = useRef(null);
  const layer1Ref = useRef(null);
  const layer2Ref = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const text4Ref = useRef(null);

  const bgImg = memory?.customImage || memory?.image;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          scrub: 1,
          pin: true,
          anticipatePin: 1
        }
      });

      // Initial state
      gsap.set([text1Ref.current, text2Ref.current, text3Ref.current, text4Ref.current], {
        opacity: 0,
        y: 30
      });
      gsap.set([layer1Ref.current, layer2Ref.current], { xPercent: 0, opacity: 0 });

      // Stage 1: "ஒரு புகைப்படம்…"
      tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 1 })
      .to(imgRef.current, { scale: 1.15, duration: 1 }, '-=0.5')
      .to(text1Ref.current, { opacity: 0, y: -20, duration: 0.5 })

      // Stage 2: "ஒரு நினைவைக் காப்பாற்றும்."
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 1 })
      .to(text2Ref.current, { opacity: 0, y: -20, duration: 0.5 })

      // Stage 3: Photo splits into layers + "ஆனால் ஒரு கதை…"
      .to([layer1Ref.current, layer2Ref.current], { opacity: 0.4, duration: 0.5 })
      .to(layer1Ref.current, { xPercent: -15, duration: 1 }, '-=0.5')
      .to(layer2Ref.current, { xPercent: 15, duration: 1 }, '-=1')
      .to(text3Ref.current, { opacity: 1, y: 0, duration: 1 }, '-=0.8')
      .to(text3Ref.current, { opacity: 0, y: -20, duration: 0.5 })

      // Stage 4: Layers rejoin + "ஒரு வாழ்க்கையை நினைவில் வைத்திருக்கும்."
      .to([layer1Ref.current, layer2Ref.current], { xPercent: 0, opacity: 0, duration: 1 })
      .to(imgRef.current, { scale: 1.05, filter: 'brightness(0.9)', duration: 1 }, '-=1')
      .to(text4Ref.current, { opacity: 1, y: 0, duration: 1.2 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative h-screen w-full bg-[#080706] text-[#f4ebd0] overflow-hidden flex items-center justify-center"
    >
      {/* Photo Container */}
      <div className="absolute inset-0 overflow-hidden flex items-center justify-center">
        {/* Main Base Image */}
        <img
          ref={imgRef}
          src={bgImg}
          alt="புகைப்படக் கதை"
          className="w-full h-full object-cover filter brightness-65 contrast-105"
        />

        {/* Split Layer 1 */}
        <div
          ref={layer1Ref}
          className="absolute inset-0 bg-cover bg-center filter opacity-0 blur-[1px]"
          style={{ backgroundImage: `url(${bgImg})`, clipPath: 'polygon(0 0, 50% 0, 40% 100%, 0 100%)' }}
        />

        {/* Split Layer 2 */}
        <div
          ref={layer2Ref}
          className="absolute inset-0 bg-cover bg-center filter opacity-0 blur-[1px]"
          style={{ backgroundImage: `url(${bgImg})`, clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 40% 100%)' }}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/40 to-[#080706]" />
      </div>

      {/* Story Text Sequence */}
      <div className="relative z-10 max-w-3xl px-6 text-center">
        <h2 ref={text1Ref} className="font-arima text-4xl sm:text-6xl font-bold gold-glow">
          ஒரு புகைப்படம்…
        </h2>

        <h2 ref={text2Ref} className="font-arima text-4xl sm:text-6xl font-bold gold-glow">
          ஒரு நினைவைக் காப்பாற்றும்.
        </h2>

        <h2 ref={text3Ref} className="font-arima text-4xl sm:text-6xl font-bold gold-glow">
          ஆனால் ஒரு கதை…
        </h2>

        <h2 ref={text4Ref} className="font-arima text-4xl sm:text-6xl font-bold text-[#d4af37] gold-glow leading-tight">
          ஒரு வாழ்க்கையை நினைவில் வைத்திருக்கும்.
        </h2>
      </div>
    </section>
  );
}
