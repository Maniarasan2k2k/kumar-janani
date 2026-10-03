import React, { useState, useEffect } from 'react';
import { X, Save, RotateCcw, Image, MessageSquare, Plus, Check } from 'lucide-react';

export default function EditDataModal({
  isOpen,
  onClose,
  memories,
  letterText,
  onSaveMemories,
  onSaveLetter,
  onResetDefaults
}) {
  const [activeTab, setActiveTab] = useState('memories'); // 'memories' | 'letter'
  const [editingMemories, setEditingMemories] = useState(memories);
  const [editingLetter, setEditingLetter] = useState(letterText);
  const [selectedMemId, setSelectedMemId] = useState(1);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setEditingMemories(memories);
      setEditingLetter(letterText);
    }
  }, [isOpen, memories, letterText]);

  if (!isOpen) return null;

  const currentMem = editingMemories.find((m) => m.id === selectedMemId) || editingMemories[0];

  const handleMemChange = (field, val) => {
    setEditingMemories((prev) =>
      prev.map((m) => (m.id === selectedMemId ? { ...m, [field]: val } : m))
    );
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleMemChange('customImage', reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveAll = () => {
    onSaveMemories(editingMemories);
    onSaveLetter(editingLetter);
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080706]/90 backdrop-blur-2xl animate-fadeIn">
      <div className="relative w-full max-w-5xl glass-panel-gold rounded-3xl overflow-hidden border border-[#d4af37]/40 shadow-2xl flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="p-6 border-b border-[#d4af37]/20 flex items-center justify-between bg-[#14100d]">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('memories')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-anek text-sm transition-all cursor-pointer ${
                activeTab === 'memories'
                  ? 'bg-[#d4af37] text-[#080706] font-bold'
                  : 'text-[#f4ebd0] hover:text-[#d4af37]'
              }`}
            >
              <Image className="w-4 h-4" />
              <span>புகைப்படங்கள் & நினைவுகள் ({editingMemories.length})</span>
            </button>

            <button
              onClick={() => setActiveTab('letter')}
              className={`flex items-center gap-2 px-5 py-2 rounded-full font-anek text-sm transition-all cursor-pointer ${
                activeTab === 'letter'
                  ? 'bg-[#d4af37] text-[#080706] font-bold'
                  : 'text-[#f4ebd0] hover:text-[#d4af37]'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>அப்பாவின் செய்தி</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#080706] flex items-center justify-center text-[#f4ebd0] hover:text-[#d4af37] border border-[#d4af37]/30 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto flex-1 bg-[#0a0807]">
          {activeTab === 'memories' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Memory List Sidebar */}
              <div className="flex flex-col gap-3">
                {/* Quick Dropdown Selector for all 15 memories */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-anek text-[#d4af37] font-semibold">
                    நினைவைத் தேர்ந்தெடுக்கவும் (15 இல் 1):
                  </label>
                  <select
                    value={selectedMemId}
                    onChange={(e) => setSelectedMemId(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#14100d] border border-[#d4af37]/40 text-sm font-anek text-[#f4ebd0] focus:border-[#d4af37] outline-none cursor-pointer"
                  >
                    {editingMemories.map((m) => (
                      <option key={m.id} value={m.id} className="bg-[#14100d] text-[#f4ebd0]">
                        நினைவு #{String(m.id).padStart(2, '0')}: {m.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Visible Scrollable Memory List */}
                <div className="flex flex-col gap-2 max-h-[45vh] overflow-y-auto pr-1 border border-[#d4af37]/10 rounded-xl p-2 bg-[#080706]">
                  {editingMemories.map((m) => (
                    <button
                      key={m.id}
                      onClick={() => setSelectedMemId(m.id)}
                      className={`flex items-center justify-between p-3 rounded-xl font-anek text-left transition-all cursor-pointer ${
                        m.id === selectedMemId
                          ? 'bg-[#d4af37]/25 border border-[#d4af37] text-[#f4ebd0] shadow-[0_0_15px_rgba(212,175,55,0.2)]'
                          : 'bg-[#14100d] border border-[#2a241f] text-[#8c8275] hover:text-[#f4ebd0] hover:border-[#d4af37]/40'
                      }`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs text-[#d4af37] font-semibold">
                          நினைவு #{String(m.id).padStart(2, '0')}
                        </span>
                        <span className="text-xs font-medium line-clamp-1">{m.title}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Memory Item Detail Form */}
              <div className="md:col-span-2 flex flex-col gap-5 bg-[#120f0d] p-6 rounded-2xl border border-[#d4af37]/20">
                <h3 className="font-arima text-xl font-bold text-[#d4af37]">
                  நினைவு #{selectedMemId} திருத்துதல்
                </h3>

                {/* Photo Preview & Replace */}
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-anek text-[#e0a96d]">புகைப்படம்</label>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 rounded-xl overflow-hidden border border-[#d4af37]/30 bg-[#080706]">
                      <img
                        src={currentMem.customImage || currentMem.image}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex flex-col gap-2 flex-1">
                      <input
                        type="text"
                        placeholder="Image URL உள்ளிடுக..."
                        value={currentMem.customImage || ''}
                        onChange={(e) => handleMemChange('customImage', e.target.value)}
                        className="w-full px-4 py-2 rounded-xl bg-[#080706] border border-[#2a241f] text-sm text-[#f4ebd0] focus:border-[#d4af37] outline-none"
                      />
                      <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#2a241f] hover:bg-[#3d342c] text-xs font-anek text-[#f4ebd0] cursor-pointer w-max transition-colors">
                        <Image className="w-3.5 h-3.5 text-[#d4af37]" />
                        <span>கணினியிலிருந்து பதிவேற்று</span>
                        <input type="file" accept="image/*" onChange={handleFileUpload} className="hidden" />
                      </label>
                    </div>
                  </div>
                </div>

                {/* Title Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-anek text-[#e0a96d]">தலைப்பு</label>
                  <input
                    type="text"
                    value={currentMem.title}
                    onChange={(e) => handleMemChange('title', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080706] border border-[#2a241f] text-sm text-[#f4ebd0] focus:border-[#d4af37] outline-none font-arima font-bold"
                  />
                </div>

                {/* Subtitle Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-anek text-[#e0a96d]">துணைத்தலைப்பு</label>
                  <input
                    type="text"
                    value={currentMem.subtitle}
                    onChange={(e) => handleMemChange('subtitle', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080706] border border-[#2a241f] text-sm text-[#f4ebd0] focus:border-[#d4af37] outline-none font-mukta"
                  />
                </div>

                {/* Story Narrative Input */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-anek text-[#e0a96d]">நினைவுக்கதை</label>
                  <textarea
                    rows={4}
                    value={currentMem.story}
                    onChange={(e) => handleMemChange('story', e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#080706] border border-[#2a241f] text-sm text-[#f4ebd0] focus:border-[#d4af37] outline-none font-anek leading-relaxed"
                  />
                </div>
              </div>
            </div>
          ) : (
            /* Father's Letter Editor */
            <div className="flex flex-col gap-4 max-w-3xl mx-auto">
              <label className="text-sm font-anek text-[#e0a96d]">
                அப்பாவின் இறுதி செய்தி (தமிழ் வரிகள்):
              </label>
              <textarea
                rows={14}
                value={editingLetter}
                onChange={(e) => setEditingLetter(e.target.value)}
                className="w-full p-6 rounded-2xl bg-[#120f0d] border border-[#d4af37]/30 text-lg font-arima text-[#f4ebd0] leading-relaxed focus:border-[#d4af37] outline-none"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-[#d4af37]/20 flex items-center justify-between bg-[#14100d]">
          <button
            onClick={onResetDefaults}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-anek text-[#8c8275] hover:text-[#f4ebd0] transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>இயல்புநிலைக்கு திருப்பு</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl font-anek text-sm text-[#f4ebd0] bg-[#2a241f] hover:bg-[#3d342c] transition-colors cursor-pointer"
            >
              மூடு
            </button>
            <button
              onClick={handleSaveAll}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl font-anek text-sm font-bold text-[#080706] bg-[#d4af37] hover:bg-[#e0a96d] shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all cursor-pointer"
            >
              {savedSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>சேமிக்கப்பட்டது!</span>
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>மாற்றங்களை சேமி</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
