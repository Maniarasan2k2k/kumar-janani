import React, { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { initialMemories, fatherLetterText } from './data/memoriesData';

import OpeningScreen from './components/OpeningScreen';
import FirstMemory from './components/FirstMemory';
import GrowingUpStory from './components/GrowingUpStory';
import EmotionalSpectrum from './components/EmotionalSpectrum';
import TravelMemories from './components/TravelMemories';
import TimeTravelTimeline from './components/TimeTravelTimeline';
import MemoriesAlive from './components/MemoriesAlive';
import FathersPerspective from './components/FathersPerspective';
import WallOfMemories from './components/WallOfMemories';
import PhotoToStory from './components/PhotoToStory';
import FinalPhotoSection from './components/FinalPhotoSection';
import FathersLetter from './components/FathersLetter';
import FinalEndingScene from './components/FinalEndingScene';
import FloatingNav from './components/FloatingNav';
import EditDataModal from './components/EditDataModal';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Load persisted memories or fall back to defaults
  const [memories, setMemories] = useState(() => {
    const saved = localStorage.getItem('frameo_memories');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length >= initialMemories.length) {
          return parsed;
        }
      } catch (e) {}
    }
    return initialMemories;
  });

  // Load persisted father letter or fall back to default
  const [letterText, setLetterText] = useState(() => {
    const saved = localStorage.getItem('frameo_letter');
    return saved || fatherLetterText;
  });

  const lenisRef = useRef(null);

  // Initialize Lenis smooth scroll and GSAP ScrollTrigger sync
  useEffect(() => {
    if (!hasEntered) return;

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.1
    });

    lenisRef.current = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, [hasEntered]);

  const handleSaveMemories = (newMemories) => {
    setMemories(newMemories);
    localStorage.setItem('frameo_memories', JSON.stringify(newMemories));
  };

  const handleSaveLetter = (newLetter) => {
    setLetterText(newLetter);
    localStorage.setItem('frameo_letter', newLetter);
  };

  const handleResetDefaults = () => {
    setMemories(initialMemories);
    setLetterText(fatherLetterText);
    localStorage.removeItem('frameo_memories');
    localStorage.removeItem('frameo_letter');
  };

  const handleReplay = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setHasEntered(false);
  };

  return (
    <div className="min-h-screen bg-[#080706] text-[#f4ebd0] relative selection:bg-[#d4af37] selection:text-[#080706]">
      {/* 01 & 02 — Opening Screen & Cinematic Transition */}
      {!hasEntered && (
        <OpeningScreen onEnter={() => setHasEntered(true)} />
      )}

      {/* Main Experience (Visible after entering) */}
      {hasEntered && (
        <main className="relative w-full overflow-hidden">
          {/* Floating Minimal Navigation Bar & Sound Controls */}
          <FloatingNav onOpenEdit={() => setIsEditModalOpen(true)} />

          {/* 03 — First Memory */}
          <FirstMemory memory={memories[0]} />

          {/* 04 & 05 — Growing Up Story (15 Memories Narrative) */}
          <GrowingUpStory memories={memories} />

          {/* 06 — Emotional Spectrum */}
          <EmotionalSpectrum />

          {/* 07 — Travel Memories (Horizontal Scroll) */}
          <TravelMemories />

          {/* 08 — Time Travel Timeline */}
          <TimeTravelTimeline memories={memories} />

          {/* 09 — Memories Alive */}
          <MemoriesAlive memories={memories} />

          {/* 10 — Father's Perspective */}
          <FathersPerspective memories={memories} />

          {/* 11 — Wall of Memories */}
          <WallOfMemories memories={memories} />

          {/* 12 — Photo to Story */}
          <PhotoToStory memory={memories[13] || memories[0]} />

          {/* 13 — Final Photo Section */}
          <FinalPhotoSection memory={memories[14] || memories[0]} />

          {/* 14 — Father's Climax Letter */}
          <FathersLetter
            letterText={letterText}
            onOpenEdit={() => setIsEditModalOpen(true)}
          />

          {/* 15 — Final Ending Scene */}
          <FinalEndingScene
            memory={memories[13] || memories[0]}
            onReplay={handleReplay}
          />
        </main>
      )}

      {/* Memory Data & Letter Editor Modal */}
      <EditDataModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        memories={memories}
        letterText={letterText}
        onSaveMemories={handleSaveMemories}
        onSaveLetter={handleSaveLetter}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
