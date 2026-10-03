import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Heart, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

gsap.registerPlugin(ScrollTrigger);

export default function FinalEndingScene({ memory, onReplay }) {
  const containerRef = useRef(null);
  const photoBoxRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);
  const replayBtnRef = useRef(null);

  const bgImg = memory?.customImage || memory?.image;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 50%',
          onEnter: () => {
            // Trigger gentle warm heart confetti
            try {
              confetti({
                particleCount: 40,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#d4af37', '#f4ebd0', '#e0a96d', '#ff9ebb']
              });
            } catch (e) {}
          }
        }
      });

      gsap.set([photoBoxRef.current, text1Ref.current, text2Ref.current, text3Ref.current, replayBtnRef.current], {
        opacity: 0,
        y: 30,
        filter: 'blur(8px)'
      });

      tl.to(photoBoxRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 })
        .to(text1Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 })
        .to({}, { duration: 0.6 })
        .to(text2Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.2 })
        .to({}, { duration: 0.8 })
        .to(text3Ref.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.5 })
        .to(replayBtnRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen w-full bg-[#040303] text-[#f4ebd0] overflow-hidden flex flex-col items-center justify-center py-24 px-6"
    >
      <div className="relative z-10 max-w-xl text-center flex flex-col items-center gap-8">
        {/* Small Glowing Dad + Daughter Photo */}
        <div
          ref={photoBoxRef}
          className="relative w-48 sm:w-64 aspect-square rounded-full overflow-hidden border-2 border-[#d4af37] shadow-[0_0_50px_rgba(212,175,55,0.4)]"
        >
          <img src={bgImg} alt="அப்பா + மகள்" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#040303]/40 via-transparent to-transparent" />
        </div>

        {/* Text Line 1 */}
        <p ref={text1Ref} className="font-arima text-2xl sm:text-4xl text-[#e0a96d] font-light">
          நினைவுகள் மாறலாம்…
        </p>

        {/* Text Line 2 */}
        <h2 ref={text2Ref} className="font-arima text-3xl sm:text-5xl font-extrabold text-[#f4ebd0] gold-glow">
          அன்பு மட்டும் மாறாது.
        </h2>

        {/* Text Line 3: Final Signoff */}
        <div ref={text3Ref} className="flex flex-col items-center gap-2 pt-4">
          <p className="font-arima text-2xl sm:text-3xl text-[#d4af37] gold-glow">
            அன்புடன்,
          </p>
          <div className="flex items-center gap-2 text-3xl sm:text-4xl font-bold font-arima text-[#d4af37]">
            <span>அப்பா</span>
            <Heart className="w-7 h-7 fill-[#d4af37] stroke-none animate-pulse" />
          </div>
        </div>

        {/* Replay Button */}
        <button
          ref={replayBtnRef}
          onClick={onReplay}
          className="mt-8 flex items-center gap-3 px-8 py-3.5 rounded-full glass-panel-gold text-[#f4ebd0] font-anek text-lg transition-all duration-300 hover:scale-105 hover:border-[#d4af37] cursor-pointer"
        >
          <RotateCcw className="w-5 h-5 text-[#d4af37]" />
          <span>மீண்டும் காண்க</span>
        </button>
      </div>
    </section>
  );
}
