import React, { useState } from 'react';
import { timelineStages } from '../data/memoriesData';
import { Clock, ChevronRight } from 'lucide-react';

export default function TimeTravelTimeline({ memories }) {
  const [activeStage, setActiveStage] = useState(0);

  const currentStage = timelineStages[activeStage];
  const matchedMemory = memories[activeStage % memories.length];
  const bgImg = matchedMemory?.customImage || matchedMemory?.image;

  return (
    <section className="relative py-28 px-6 bg-[#080706] text-[#f4ebd0] overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm font-anek mb-4">
            <Clock className="w-4 h-4" />
            <span>காலப்பயணம்</span>
          </div>
          <h2 className="font-arima text-4xl sm:text-6xl font-bold gold-glow mb-4">
            காலத்தின் தடங்களில் நமது பயணம்
          </h2>
          <p className="font-mukta text-xl text-[#e0a96d] font-light max-w-xl mx-auto">
            ஒவ்வொரு காலகட்டமும் ஒரு அழகிய ஓவியம்
          </p>
        </div>

        {/* Timeline Horizontal Navigation Bar */}
        <div className="flex items-center justify-start md:justify-center gap-3 overflow-x-auto no-scrollbar pb-6 mb-12">
          {timelineStages.map((stg, i) => {
            const isActive = i === activeStage;
            return (
              <button
                key={i}
                onClick={() => setActiveStage(i)}
                className={`flex-shrink-0 px-6 py-3 rounded-2xl font-anek text-base transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'glass-panel-gold text-[#f4ebd0] border-[#d4af37] shadow-[0_0_20px_rgba(212,175,55,0.3)] scale-105'
                    : 'bg-[#14100d] text-[#8c8275] hover:text-[#f4ebd0] border border-[#2a241f]'
                }`}
              >
                <span>{stg.tag}</span>
                {isActive && <ChevronRight className="w-4 h-4 text-[#d4af37]" />}
              </button>
            );
          })}
        </div>

        {/* Active Stage Display Panel */}
        <div className="relative rounded-3xl overflow-hidden glass-panel border border-[#d4af37]/30 grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-12 items-center">
          {/* Photo */}
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[#d4af37]/20 shadow-2xl group">
            <img
              src={bgImg}
              alt={currentStage.title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-transparent to-transparent opacity-40" />
            <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#080706]/70 backdrop-blur-md text-xs font-anek text-[#d4af37] border border-[#d4af37]/30">
              {currentStage.year}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col items-start gap-6">
            <span className="px-4 py-1 rounded-full text-xs font-anek tracking-wider text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30">
              {currentStage.tag}
            </span>
            <h3 className="font-arima text-3xl sm:text-4xl font-bold text-[#f4ebd0] leading-snug">
              {currentStage.title}
            </h3>
            <p className="font-mukta text-lg text-[#e0a96d] font-light leading-relaxed">
              "{matchedMemory?.subtitle || 'காலங்கள் மாறினாலும் உன் மீதான அன்பு மாறவில்லை.'}"
            </p>
            <p className="font-anek text-base text-[#c2b6a6] font-light bg-[#080706]/60 p-5 rounded-2xl border border-[#d4af37]/10">
              {matchedMemory?.story}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
