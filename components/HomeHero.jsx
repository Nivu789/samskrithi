'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function HomeHero() {
  const sectionRef = useRef(null);
  const mouseRef   = useRef({ x: -500, y: -500 });
  const ringRef    = useRef({ x: -500, y: -500 });
  const rafRef     = useRef(null);

  const [mouse,  setMouse]  = useState({ x: -500, y: -500 });
  const [ring,   setRing]   = useState({ x: -500, y: -500 });
  const [inside, setInside] = useState(false);

  // Lerp ring position toward cursor on every frame
  useEffect(() => {
    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ringRef.current.x = lerp(ringRef.current.x, mouseRef.current.x, 0.08);
      ringRef.current.y = lerp(ringRef.current.y, mouseRef.current.y, 0.08);
      setRing({ x: ringRef.current.x, y: ringRef.current.y });
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const onMove = (e) => {
    const rect = sectionRef.current.getBoundingClientRect();
    mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    setMouse({ x: mouseRef.current.x, y: mouseRef.current.y });
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center text-center overflow-hidden pt-16 cursor-none"
      style={{
        background: `
          radial-gradient(600px circle at ${mouse.x}px ${mouse.y}px, rgba(196,154,46,0.14) 0%, transparent 65%),
          linear-gradient(135deg, #3D1F0A 0%, #6B3A1F 60%, #9B6B47 100%)
        `,
      }}
      onMouseMove={onMove}
      onMouseEnter={() => setInside(true)}
      onMouseLeave={() => setInside(false)}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C49A2E' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Custom cursor — dot + lagging ring */}
      {inside && (
        <>
          <div
            className="absolute z-30 rounded-full bg-gold pointer-events-none"
            style={{
              width: 7, height: 7,
              left: mouse.x, top: mouse.y,
              transform: 'translate(-50%, -50%)',
            }}
          />
          <div
            className="absolute z-30 rounded-full border border-gold/50 pointer-events-none"
            style={{
              width: 40, height: 40,
              left: ring.x, top: ring.y,
              transform: 'translate(-50%, -50%)',
            }}
          />
        </>
      )}

      {/* Content */}
      <div className="relative z-10 px-6 max-w-2xl mx-auto">
        <p className="section-tag justify-center flex">Welcome to Our Community</p>
        <h1 className="font-playfair text-6xl md:text-8xl text-white leading-[1.05] mb-6">
          We Are<br />
          <em className="text-gold not-italic">Samskrithi</em>
        </h1>
        <p className="text-cream-dark text-lg max-w-md mx-auto mb-10 leading-relaxed font-light">
          A vibrant community rooted in culture, sport, and the arts — bringing people together
          through shared passions and meaningful activities.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/activities" className="btn-gold cursor-none">Explore Activities</Link>
          <Link href="/about"      className="btn-outline cursor-none">Learn More</Link>
        </div>
      </div>
    </section>
  );
}
