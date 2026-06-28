'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const EVENTS = [
  {
    id:     'gandhi',
    title:  'Gandhi Jayanti Programme',
    cover:  '/gandhi.jpg',
    images: [
      '/gandhi.jpg', '/gandhi2.jpg', '/gandhi3.jpg', '/gandhi4.jpg',
      '/gandhi5.jpg', '/gandhi6.jpg', '/gandhi7.jpg', '/gandhi8.jpg',
    ],
  },
  {
    id:     'dance',
    title:  'Dance Performances',
    cover:  '/dance1.jpg',
    images: [
      '/dance1.jpg', '/dance2.jpg', '/dance3.jpg',
      '/dance4.jpg', '/reach_dance.jpg', '/danceMaster.jpg',
    ],
  },
  {
    id:     'karate',
    title:  'Karate Training',
    cover:  '/karatebg.jpg',
    images: ['/karatebg.jpg', '/karateMaster.jpg', '/karateMaster2.jpg'],
  },
  {
    id:     'badminton',
    title:  'Badminton Championship',
    cover:  '/shuttle1.jpg',
    images: ['/shuttle1.jpg', '/shuttle2.jpg', '/shuttle3.jpg', '/shuttleSmash.png'],
  },
  {
    id:     'english',
    title:  'Spoken English Classes',
    cover:  '/spokenenglish1.jpg',
    images: ['/spokenenglish1.jpg', '/spokenenglish2.jpg', '/spokenenglish3.jpg'],
  },
];

const AUTOPLAY_MS = 3500;

export default function GalleryPage() {
  const [selected, setSelected] = useState(null);
  const [idx, setIdx]           = useState(0);

  const open  = (event) => { setSelected(event); setIdx(0); };
  const close = ()       => setSelected(null);

  // Auto-play: reset whenever slide changes or modal opens
  useEffect(() => {
    if (!selected) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % selected.images.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(t);
  }, [selected, idx]);

  // Keyboard navigation
  useEffect(() => {
    if (!selected) return;
    const onKey = (e) => {
      if (e.key === 'ArrowLeft')
        setIdx((i) => (i - 1 + selected.images.length) % selected.images.length);
      if (e.key === 'ArrowRight')
        setIdx((i) => (i + 1) % selected.images.length);
      if (e.key === 'Escape')
        close();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [selected]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="page-hero text-center">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <span className="section-tag justify-center flex">Memories &amp; Moments</span>
          <h1 className="font-playfair text-5xl md:text-6xl text-cream leading-tight">
            Our <em className="text-gold not-italic">Gallery</em>
          </h1>
          <p className="text-cream-dark font-light mt-4 max-w-xl mx-auto leading-relaxed text-lg">
            Browse our events — click any album to view the full collection.
          </p>
        </div>
      </section>

      {/* ── Event albums grid ─────────────────────────────────── */}
      <section className="bg-cream-light py-16 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {EVENTS.map((event) => (
            <button
              key={event.id}
              onClick={() => open(event)}
              className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
            >
              {/* Cover image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                <img
                  src={event.cover}
                  alt={event.title}
                  className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                />
                {/* Dark overlay */}
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                {/* Photo count badge */}
                <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 tracking-wide">
                  {event.images.length} photos
                </span>
                {/* Hover play prompt */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-gold text-brown-darkest rounded-full w-14 h-14 flex items-center justify-center shadow-xl">
                    <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
              {/* Title bar */}
              <div className="bg-white border border-cream-dark border-t-0 px-5 py-4 group-hover:border-gold transition-colors duration-300">
                <h3 className="font-playfair text-lg text-brown-darkest leading-snug">{event.title}</h3>
                <p className="text-xs text-gold font-semibold tracking-widest uppercase mt-1">
                  View Album →
                </p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Modal portal ──────────────────────────────────────── */}
      {selected && createPortal(
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={close}
        >
          {/* Modal container — stop propagation so clicks inside don't close */}
          <div
            className="relative flex flex-col items-center w-full max-w-5xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header row */}
            <div className="w-full flex items-center justify-between mb-4 px-1">
              <div>
                <p className="text-gold text-xs font-semibold tracking-widest uppercase">
                  {selected.title}
                </p>
                <p className="text-white/50 text-xs mt-0.5">
                  {idx + 1} / {selected.images.length}
                </p>
              </div>
              <button
                onClick={close}
                className="text-white/70 hover:text-white text-3xl leading-none transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* Image + side arrows */}
            <div className="relative w-full flex items-center justify-center">
              {/* Prev */}
              <button
                onClick={() => setIdx((i) => (i - 1 + selected.images.length) % selected.images.length)}
                className="absolute left-0 z-10 -translate-x-2 md:-translate-x-12 text-white/70 hover:text-white
                           bg-black/40 hover:bg-black/70 w-10 h-10 flex items-center justify-center
                           rounded-full transition-all duration-200"
                aria-label="Previous"
              >
                ‹
              </button>

              <img
                key={idx}
                src={selected.images[idx]}
                alt={`${selected.title} — ${idx + 1}`}
                className="max-h-[70vh] max-w-full object-contain select-none"
                style={{ animation: 'fadeIn 0.25s ease' }}
              />

              {/* Next */}
              <button
                onClick={() => setIdx((i) => (i + 1) % selected.images.length)}
                className="absolute right-0 z-10 translate-x-2 md:translate-x-12 text-white/70 hover:text-white
                           bg-black/40 hover:bg-black/70 w-10 h-10 flex items-center justify-center
                           rounded-full transition-all duration-200"
                aria-label="Next"
              >
                ›
              </button>
            </div>

            {/* Autoplay progress bar */}
            <div className="w-full mt-5 h-px bg-white/15 overflow-hidden">
              <div
                key={`bar-${idx}`}
                className="h-full bg-gold"
                style={{ animation: `autoplay-bar ${AUTOPLAY_MS}ms linear forwards` }}
              />
            </div>

            {/* Dot navigation */}
            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {selected.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === idx
                      ? 'bg-gold w-5 h-2'
                      : 'bg-white/30 hover:bg-white/60 w-2 h-2'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
        , document.body
      )}

      {/* Fade-in keyframe for slide transition */}
      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </>
  );
}
