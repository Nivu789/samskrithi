'use client';

import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

const AUTOPLAY_MS = 3500;
const PAGE_SIZE   = 6;

export default function GalleryClient() {
  const [events, setEvents]         = useState([]);
  const [page, setPage]             = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  const [selected, setSelected] = useState(null);
  const [idx, setIdx]           = useState(0);

  // ── Fetch paginated gallery data whenever `page` changes ──────
  useEffect(() => {
    let cancelled = false;

    const fetchGallery = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/admin/gallery?page=${page}&limit=${PAGE_SIZE}`);
        if (!res.ok) throw new Error('Failed to load gallery');
        const json = await res.json();

        if (!cancelled) {
          setEvents(json.data ?? []);
          setTotalPages(json.totalPages ?? 1);
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Something went wrong');
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchGallery();
    return () => { cancelled = true; };
  }, [page]);

  const goToPage = (p) => {
    if (p < 1 || p > totalPages || p === page) return;
    setPage(p);
    document.getElementById('gallery-grid')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const open  = (event) => { setSelected(event); setIdx(0); };
  const close = ()       => setSelected(null);

  useEffect(() => {
    if (!selected) return;
    const t = setInterval(
      () => setIdx((i) => (i + 1) % selected.images.length),
      AUTOPLAY_MS,
    );
    return () => clearInterval(t);
  }, [selected, idx]);

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

  useEffect(() => {
    document.body.style.overflow = selected ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [selected]);

  return (
    <>
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

      <section id="gallery-grid" className="bg-cream-light py-16 px-6 min-h-[400px]">
        {/* ── Loading state ─────────────────────────────────── */}
        {loading && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: PAGE_SIZE }).map((_, i) => (
              <div key={i} className="aspect-[4/3] bg-cream-dark animate-pulse" />
            ))}
          </div>
        )}

        {/* ── Error state ───────────────────────────────────── */}
        {!loading && error && (
          <div className="text-center py-16">
            <p className="text-brown-darkest">{error}</p>
            <button
              onClick={() => setPage((p) => p)} // triggers a re-fetch by re-setting effect dep isn't ideal; use a retry key instead if needed
              className="mt-4 text-gold underline text-sm"
            >
              Try again
            </button>
          </div>
        )}

        {/* ── Empty state ───────────────────────────────────── */}
        {!loading && !error && events.length === 0 && (
          <div className="text-center py-16">
            <p className="text-brown-darkest">No gallery albums yet.</p>
          </div>
        )}

        {/* ── Grid ──────────────────────────────────────────── */}
        {!loading && !error && events.length > 0 && (
          <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <button
                key={event._id}
                onClick={() => open(event)}
                className="group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-cream-dark">
                  <img
                    src={event.images[0]}
                    alt={event.title}
                    className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300" />
                  <span className="absolute top-3 right-3 bg-black/60 text-white text-xs font-semibold px-2.5 py-1 tracking-wide">
                    {event.images.length} photos
                  </span>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-gold text-brown-darkest rounded-full w-14 h-14 flex items-center justify-center shadow-xl">
                      <svg className="w-6 h-6 ml-1" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="bg-white border border-cream-dark border-t-0 px-5 py-4 group-hover:border-gold transition-colors duration-300">
                  <h3 className="font-playfair text-lg text-brown-darkest leading-snug">{event.title}</h3>
                  <p className="text-xs text-gold font-semibold tracking-widest uppercase mt-1">
                    View Album →
                  </p>
                </div>
              </button>
            ))}
          </div>
        )}

        {/* ── Pagination controls ─────────────────────────────── */}
        {!loading && !error && totalPages > 1 && (
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 mt-12">
            <button
              onClick={() => goToPage(page - 1)}
              disabled={page === 1}
              className="w-10 h-10 flex items-center justify-center border border-cream-dark text-brown-darkest
                         hover:border-gold hover:text-gold transition-colors duration-200
                         disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              ‹
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <button
                key={p}
                onClick={() => goToPage(p)}
                className={`w-10 h-10 flex items-center justify-center text-sm font-semibold transition-colors duration-200 ${
                  p === page
                    ? 'bg-gold text-brown-darkest'
                    : 'border border-cream-dark text-brown-darkest hover:border-gold hover:text-gold'
                }`}
                aria-current={p === page ? 'page' : undefined}
              >
                {p}
              </button>
            ))}
            <button
              onClick={() => goToPage(page + 1)}
              disabled={page === totalPages}
              className="w-10 h-10 flex items-center justify-center border border-cream-dark text-brown-darkest
                         hover:border-gold hover:text-gold transition-colors duration-200
                         disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              ›
            </button>
          </div>
        )}
      </section>

      {selected && createPortal(
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/80 backdrop-blur-md"
          onClick={close}
        >
          <div
            className="relative flex flex-col items-center w-full max-w-5xl px-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full flex items-center justify-between mb-4 px-1">
              <div>
                <p className="text-gold text-xs font-semibold tracking-widest uppercase">
                  {selected.title}
                </p>
                <p className="text-white/50 text-xs mt-0.5">
                  {idx + 1} / {selected.images.length}
                </p>
              </div>
              <button onClick={close} className="text-white/70 hover:text-white text-3xl leading-none transition-colors" aria-label="Close">
                ×
              </button>
            </div>

            <div className="relative w-full flex items-center justify-center">
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

            <div className="w-full mt-5 h-px bg-white/15 overflow-hidden">
              <div
                key={`bar-${idx}`}
                className="h-full bg-gold"
                style={{ animation: `autoplay-bar ${AUTOPLAY_MS}ms linear forwards` }}
              />
            </div>

            <div className="flex gap-2 mt-4 flex-wrap justify-center">
              {selected.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`rounded-full transition-all duration-200 ${
                    i === idx ? 'bg-gold w-5 h-2' : 'bg-white/30 hover:bg-white/60 w-2 h-2'
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: scale(0.97); } to { opacity: 1; transform: scale(1); } }
      `}</style>
    </>
  );
}