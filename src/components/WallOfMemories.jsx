import React, { useState } from 'react';
import { Sparkles, Maximize2, X } from 'lucide-react';

export default function WallOfMemories({ memories }) {
  const [selectedMem, setSelectedMem] = useState(null);

  // Creative rotations & positioning tweaks for photo wall effect
  const cardStyles = [
    'rotate-[-3deg] translate-y-2',
    'rotate-[4deg] -translate-y-3',
    'rotate-[-2deg] translate-y-4',
    'rotate-[3deg] -translate-y-1',
    'rotate-[-4deg] translate-y-3',
    'rotate-[2deg] -translate-y-2',
    'rotate-[-1deg] translate-y-5',
    'rotate-[5deg] -translate-y-4',
    'rotate-[-3deg] translate-y-1',
    'rotate-[2deg] -translate-y-3',
    'rotate-[-5deg] translate-y-2',
    'rotate-[4deg] -translate-y-2',
    'rotate-[-2deg] translate-y-3',
    'rotate-[3deg] -translate-y-1',
    'rotate-[-4deg] translate-y-4'
  ];

  return (
    <section id="wall-of-memories" className="relative py-28 px-4 sm:px-8 bg-[#080706] text-[#f4ebd0]">
      {/* Section Header */}
      <div className="max-w-4xl mx-auto text-center mb-20">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 text-[#d4af37] text-sm font-anek mb-4">
          <Sparkles className="w-4 h-4" />
          <span>நினைவுகளின் சுவர்</span>
        </div>
        <h2 className="font-arima text-4xl sm:text-6xl font-bold gold-glow mb-4">
          நமது வாழ்க்கைப் பாதையின் புகைப்படங்கள்
        </h2>
        <p className="font-mukta text-xl text-[#e0a96d] font-light max-w-2xl mx-auto">
          ஒவ்வொரு புகைப்படத்தின் மீதும் உங்கள் சுட்டியை நகர்த்தி அல்லது தொட்டு அதன் கதையை உணருங்கள்
        </p>
      </div>

      {/* Wall Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {memories.map((mem, idx) => {
          const bgImg = mem.customImage || mem.image;
          const rotStyle = cardStyles[idx % cardStyles.length];

          return (
            <div
              key={mem.id}
              onClick={() => setSelectedMem(mem)}
              className={`group relative rounded-2xl overflow-hidden glass-panel border border-[#d4af37]/20 cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-3 hover:z-30 hover:shadow-[0_15px_40px_rgba(212,175,55,0.3)] hover:border-[#d4af37] ${rotStyle}`}
            >
              {/* Photo */}
              <div className="relative aspect-[4/5] overflow-hidden bg-[#14100d]">
                <img
                  src={bgImg}
                  alt={mem.title}
                  className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080706] via-[#080706]/20 to-transparent opacity-70 group-hover:opacity-40 transition-opacity" />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#080706]/80 text-[11px] font-anek text-[#d4af37] border border-[#d4af37]/30">
                  #{String(mem.id).padStart(2, '0')}
                </div>

                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#080706]/70 flex items-center justify-center text-[#d4af37] opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-4 h-4" />
                </div>
              </div>

              {/* Caption Overlay */}
              <div className="p-5 flex flex-col gap-1.5 bg-[#0f0c0a]">
                <span className="text-xs font-anek text-[#d4af37] font-semibold">
                  {mem.stage}
                </span>
                <h3 className="font-arima text-lg font-bold text-[#f4ebd0] line-clamp-1">
                  {mem.title}
                </h3>
                <p className="font-mukta text-xs text-[#e0a96d] line-clamp-2">
                  {mem.subtitle}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal Popup for Selected Photo */}
      {selectedMem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080706]/90 backdrop-blur-xl animate-fadeIn">
          <div className="relative w-full max-w-4xl glass-panel-gold rounded-3xl overflow-hidden border border-[#d4af37]/40 p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#080706]/80 flex items-center justify-center text-[#f4ebd0] hover:text-[#d4af37] border border-[#d4af37]/30 cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Photo in Modal */}
            <div className="w-full md:w-1/2 rounded-2xl overflow-hidden border border-[#d4af37]/20 aspect-[4/5] bg-[#14100d]">
              <img
                src={selectedMem.customImage || selectedMem.image}
                alt={selectedMem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content in Modal */}
            <div className="w-full md:w-1/2 flex flex-col items-start gap-4">
              <span className="px-3.5 py-1 rounded-full text-xs font-anek text-[#d4af37] bg-[#d4af37]/10 border border-[#d4af37]/30">
                நினைவு #{String(selectedMem.id).padStart(2, '0')} • {selectedMem.stage}
              </span>
              <h3 className="font-arima text-3xl font-bold text-[#f4ebd0] gold-glow">
                {selectedMem.title}
              </h3>
              <p className="font-mukta text-xl text-[#e0a96d] font-light">
                {selectedMem.subtitle}
              </p>
              <p className="font-anek text-base text-[#c2b6a6] font-light bg-[#080706]/60 p-5 rounded-2xl border border-[#d4af37]/10 leading-relaxed">
                "{selectedMem.story}"
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
