import React, { useState } from 'react';
import { Volume2, VolumeX, Edit, Menu, X, Heart } from 'lucide-react';
import { audioEngine } from '../utils/audioSynth';

export default function FloatingNav({ onOpenEdit }) {
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleAudio = () => {
    const isNowPlaying = audioEngine.toggle();
    setIsPlayingAudio(isNowPlaying);
  };

  const scrollToSection = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Left Floating Minimal Logo / Title */}
      <div className="fixed top-6 left-6 z-40 flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#d4af37]/20 text-[#f4ebd0] font-arima text-base sm:text-lg select-none">
        <Heart className="w-4 h-4 text-[#d4af37] fill-[#d4af37]" />
        <span>என் செல்ல மகளுக்காக…</span>
      </div>

      {/* Top Right Floating Controls (Audio & Edit Buttons) */}
      <div className="fixed top-6 right-6 z-40 flex items-center gap-3">
        {/* Audio Toggle Button */}
        <button
          onClick={toggleAudio}
          className={`flex items-center gap-2 px-4 py-2 rounded-full glass-panel border text-xs sm:text-sm font-anek transition-all duration-300 cursor-pointer ${
            isPlayingAudio
              ? 'border-[#d4af37] text-[#d4af37] bg-[#d4af37]/10'
              : 'border-[#d4af37]/20 text-[#c2b6a6] hover:text-[#f4ebd0]'
          }`}

        >
          {isPlayingAudio ? (
            <>
              <Volume2 className="w-4 h-4 text-[#d4af37] animate-bounce" />
              <span>இசை: இயக்கம்</span>
            </>
          ) : (
            <>
              <VolumeX className="w-4 h-4" />
              <span>இசை: நிறுத்தம்</span>
            </>
          )}
        </button>

        {/* Memory Data Editor Trigger Button */}
        <button
          onClick={onOpenEdit}
          className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full glass-panel border border-[#d4af37]/30 text-xs sm:text-sm font-anek text-[#f4ebd0] hover:border-[#d4af37] hover:text-[#d4af37] transition-all cursor-pointer"
        >
          <Edit className="w-4 h-4 text-[#d4af37]" />
          <span>நினைவுகளைத் திருத்து</span>
        </button>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden flex items-center justify-center w-10 h-10 rounded-full glass-panel border border-[#d4af37]/30 text-[#f4ebd0] cursor-pointer"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Bottom Floating Minimal Navigation Bar (Desktop) */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 hidden md:flex items-center gap-2 px-6 py-3 rounded-full glass-panel-gold border border-[#d4af37]/30 shadow-2xl">
        <button
          onClick={() => scrollToSection('first-memory')}
          className="px-4 py-1.5 rounded-full text-sm font-anek text-[#f4ebd0] hover:text-[#d4af37] transition-colors cursor-pointer"
        >
          நினைவுகள்
        </button>
        <div className="w-1 h-1 rounded-full bg-[#d4af37]/40" />
        <button
          onClick={() => scrollToSection('fathers-perspective')}
          className="px-4 py-1.5 rounded-full text-sm font-anek text-[#f4ebd0] hover:text-[#d4af37] transition-colors cursor-pointer"
        >
          நம் கதை
        </button>
        <div className="w-1 h-1 rounded-full bg-[#d4af37]/40" />
        <button
          onClick={() => scrollToSection('wall-of-memories')}
          className="px-4 py-1.5 rounded-full text-sm font-anek text-[#f4ebd0] hover:text-[#d4af37] transition-colors cursor-pointer"
        >
          புகைப்படங்கள்
        </button>
        <div className="w-1 h-1 rounded-full bg-[#d4af37]/40" />
        <button
          onClick={() => scrollToSection('fathers-letter')}
          className="px-4 py-1.5 rounded-full text-sm font-anek text-[#f4ebd0] hover:text-[#d4af37] transition-colors cursor-pointer"
        >
          அப்பாவின் செய்தி
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#080706]/95 backdrop-blur-xl md:hidden flex flex-col items-center justify-center gap-8 p-6 animate-fadeIn">
          <button
            onClick={() => scrollToSection('first-memory')}
            className="font-arima text-2xl font-bold text-[#f4ebd0] hover:text-[#d4af37]"
          >
            நினைவுகள்
          </button>
          <button
            onClick={() => scrollToSection('fathers-perspective')}
            className="font-arima text-2xl font-bold text-[#f4ebd0] hover:text-[#d4af37]"
          >
            நம் கதை
          </button>
          <button
            onClick={() => scrollToSection('wall-of-memories')}
            className="font-arima text-2xl font-bold text-[#f4ebd0] hover:text-[#d4af37]"
          >
            புகைப்படங்கள்
          </button>
          <button
            onClick={() => scrollToSection('fathers-letter')}
            className="font-arima text-2xl font-bold text-[#f4ebd0] hover:text-[#d4af37]"
          >
            அப்பாவின் செய்தி
          </button>

          <button
            onClick={() => {
              setIsMobileMenuOpen(false);
              onOpenEdit();
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-full glass-panel-gold border border-[#d4af37] text-base font-anek text-[#d4af37] mt-4"
          >
            <Edit className="w-4 h-4" />
            <span>நினைவுகளைத் திருத்து</span>
          </button>
        </div>
      )}
    </>
  );
}
