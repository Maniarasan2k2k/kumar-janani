// Utility to create warm emotional SVG data-URIs for father-daughter memory placeholders
// Provides fallback warm visuals with golden glows, silhouettes, and emotional Tamil art

export function getMemoryPlaceholder(id, title, subtitle, bgGradient) {
  const gradients = [
    { start: '#2c1810', mid: '#4a2511', end: '#1a0b05', accent: '#e0a96d' }, // Babyhood warm amber
    { start: '#1c2541', mid: '#3a506b', end: '#0b132b', accent: '#6fffe9' }, // Father's shoulders night sky
    { start: '#3d1308', mid: '#6b2715', end: '#1f0702', accent: '#f7a072' }, // Family warmth sunset
    { start: '#191c0b', mid: '#3a401c', end: '#0d0e05', accent: '#d4af37' }, // Laughter golden morning
    { start: '#2b1b36', mid: '#502963', end: '#140c1a', accent: '#ff9ebb' }, // Playful lavender dusk
    { start: '#381616', mid: '#662424', end: '#1b0909', accent: '#ff8585' }, // Cute anger warm crimson
    { start: '#0d1f2d', mid: '#1d4e89', end: '#050c12', accent: '#70d6ff' }, // Tears soft rain blue
    { start: '#2a1a08', mid: '#593915', end: '#120b03', accent: '#ffb703' }, // Dad walking together
    { start: '#17252a', mid: '#2b7a78', end: '#0b1417', accent: '#3aafa9' }, // School dawn horizon
    { start: '#331832', mid: '#69306d', end: '#190a19', accent: '#f2b5d4' }, // Celebration purple spark
    { start: '#0b2512', mid: '#1e532b', end: '#041208', accent: '#80ed99' }, // Travel nature green
    { start: '#2e1c0c', mid: '#5c3a1d', end: '#140c04', accent: '#f4a261' }, // Travel journey mountain dusk
    { start: '#3b1820', mid: '#6e2b3b', end: '#1c0a0f', accent: '#ffb4a2' }, // Recent smile warm rose
    { start: '#1b1b2f', mid: '#383a59', end: '#0f0f1d', accent: '#e2b714' }, // Father daughter starry night
    { start: '#261120', mid: '#522245', end: '#12070f', accent: '#f39237' }  // Daughter today golden future
  ];

  const g = gradients[(id - 1) % gradients.length];
  const safeTitle = (title || '').replace(/"/g, '&quot;');
  const safeSubtitle = (subtitle || '').replace(/"/g, '&quot;');

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
    <defs>
      <linearGradient id="bg_${id}" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="${g.start}" />
        <stop offset="50%" stop-color="${g.mid}" />
        <stop offset="100%" stop-color="${g.end}" />
      </linearGradient>
      <radialGradient id="glow_${id}" cx="50%" cy="40%" r="60%">
        <stop offset="0%" stop-color="${g.accent}" stop-opacity="0.35" />
        <stop offset="100%" stop-color="${g.end}" stop-opacity="0" />
      </radialGradient>
      <filter id="shadow_${id}">
        <feDropShadow dx="0" dy="10" stdDeviation="15" flood-color="#000" flood-opacity="0.6" />
      </filter>
    </defs>
    
    <!-- Background -->
    <rect width="1200" height="800" fill="url(#bg_${id})" />
    <rect width="1200" height="800" fill="url(#glow_${id})" />
    
    <!-- Subtle Decorative Elements -->
    <circle cx="600" cy="360" r="280" fill="none" stroke="${g.accent}" stroke-opacity="0.15" stroke-width="1.5" stroke-dasharray="10 15" />
    <circle cx="600" cy="360" r="190" fill="none" stroke="${g.accent}" stroke-opacity="0.25" stroke-width="1" />
    <circle cx="600" cy="360" r="80" fill="${g.accent}" fill-opacity="0.08" />

    <!-- Soft Grain / Dust Particle Dots -->
    <g fill="${g.accent}" opacity="0.4">
      <circle cx="200" cy="180" r="2" />
      <circle cx="950" cy="220" r="3" />
      <circle cx="350" cy="620" r="1.5" />
      <circle cx="820" cy="580" r="2.5" />
      <circle cx="150" cy="480" r="2" />
      <circle cx="1050" cy="420" r="2" />
    </g>

    <!-- Center Icon Silhouette Art -->
    <g transform="translate(600, 340)" filter="url(#shadow_${id})" text-anchor="middle">
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="${g.accent}" opacity="0.8" transform="scale(3.5) translate(-12, -16)"/>
    </g>

    <!-- Memory Number Tag -->
    <g transform="translate(600, 140)">
      <rect x="-80" y="-22" width="160" height="44" rx="22" fill="#080706" fill-opacity="0.6" stroke="${g.accent}" stroke-opacity="0.4" stroke-width="1" />
      <text x="0" y="7" font-family="'Anek Tamil', sans-serif" font-size="20" font-weight="600" fill="${g.accent}" text-anchor="middle">நினைவு #${String(id).padStart(2, '0')}</text>
    </g>

    <!-- Tamil Caption overlay in SVG image -->
    <g transform="translate(600, 560)">
      <text x="0" y="0" font-family="'Anek Tamil', sans-serif" font-size="34" font-weight="700" fill="#f4ebd0" text-anchor="middle" filter="url(#shadow_${id})">${safeTitle}</text>
      <text x="0" y="45" font-family="'Mukta Malar', sans-serif" font-size="22" font-weight="400" fill="${g.accent}" text-anchor="middle">${safeSubtitle}</text>
    </g>
  </svg>`;

  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
