import Link from 'next/link';
import HomeHero from '@/components/HomeHero';

const ACTIVITIES = [
  {
    title:   'Badminton',
    tagline: 'Competitive sport for every level',
    image:   '/shuttle1.jpg',
    desc:    'Certified coaches, weekly drills, and inter-community tournaments for all skill levels.',
  },
  {
    title:   'Karate',
    tagline: 'Discipline, focus, and self-defence',
    image:   '/karatebg.jpg',
    desc:    'Traditional training focused on discipline, self-defence, and mental strength — beginner to black belt.',
  },
  {
    title:   'Dance',
    tagline: 'Classical, folk and contemporary forms',
    image:   '/dance2.jpg',
    desc:    'Bharatanatyam, Mohiniyattam, and folk styles led by professional instructors with stage performance opportunities.',
  },
  {
    title:   'Music',
    tagline: 'Carnatic vocals and instruments',
    image:   '/activities.jpg',
    desc:    'Carnatic vocals and instrumental training. Structured curriculum leads to live performances at community events.',
  },
];

const GALLERY_HIGHLIGHTS = [
  { id: 1, emoji: '🏸', label: 'Badminton Championship 2025',  bg: 'linear-gradient(135deg,#8B5E3C,#C49A2E)',  featured: true },
  { id: 3, emoji: '🎉', label: 'Onam Celebrations 2025',       bg: 'linear-gradient(135deg,#3D1F0A,#8B5E3C)' },
  { id: 4, emoji: '🥋', label: 'Karate Belt Ceremony',         bg: 'linear-gradient(135deg,#A07E20,#E8C656)' },
  { id: 2, emoji: '💃', label: 'Kalolsavam Dance Performance', bg: 'linear-gradient(135deg,#5C3820,#9B6B47)' },
  { id: 8, emoji: '🏆', label: 'Annual Sports Day',            bg: 'linear-gradient(135deg,#E8C656,#C49A2E)' },
  { id: 9, emoji: '🎭', label: 'Cultural Evening',             bg: 'linear-gradient(135deg,#3D1F0A,#6B3A1F)' },
];

const EVENTS = [
  { date: 'JUL 15, 2026', title: 'Annual Sports Day',           desc: 'A full day of inter-community sports including badminton championship and karate demonstrations.' },
  { date: 'AUG 3, 2026',  title: 'Cultural Fest — Kalolsavam', desc: 'A grand showcase of dance and music performances, open to all members and their families.' },
  { date: 'SEP 20, 2026', title: 'Onam Celebration',           desc: 'Traditional Onam festivities with Pookalam, Onasadya and live cultural performances.' },
];

export default function HomePage() {
  return (
    <>
      <HomeHero />

      {/* ── Stats bar ────────────────────────────────────────── */}
      <div className="bg-cream-dark border-b-2 border-gold py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[['500+', 'Members'], ['4', 'Activity Classes'], ['12+', 'Years Active'], ['50+', 'Events Per Year']].map(
            ([num, label]) => (
              <div key={label}>
                <span className="font-playfair text-4xl md:text-5xl text-brown-darkest font-bold block">{num}</span>
                <span className="text-brown-mid text-xs tracking-widest uppercase mt-1 block">{label}</span>
              </div>
            ),
          )}
        </div>
      </div>

      {/* ── Activities preview ───────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag">What We Offer</span>
          <h2 className="section-title mb-4">
            Our <em className="text-gold not-italic">Activities</em>
          </h2>
          <p className="text-brown-mid max-w-lg leading-relaxed font-light mb-12">
            From the discipline of martial arts to the rhythm of music — we offer something for every passion and every age group.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {ACTIVITIES.map(({ title, tagline, image, desc }) => (
    <Link
      href="/activities"
      key={title}
      className="group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
    >
      {/* ── Image panel ── */}
      <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
        <img
          src={image}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover object-center
                     group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <h3 className="font-playfair text-xl text-white leading-tight">{title}</h3>
          <div className="w-8 h-px bg-gold my-2.5 group-hover:w-14 transition-all duration-300" />
          <p className="text-white/70 text-xs font-light tracking-wide">{tagline}</p>
        </div>
      </div>

      {/* ── Description panel ── */}
      <div className="bg-cream-light border border-cream-dark border-t-0 p-5 flex-1 relative overflow-hidden">
        <div
          className="absolute bottom-0 left-0 w-full h-0.5 bg-gold
                     origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        />
        <p className="text-brown-mid text-sm leading-relaxed font-light">{desc}</p>
      </div>
    </Link>
  ))}
</div>
        </div>
      </section>

      {/* ── Events preview ───────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: '#3D1F0A' }}>
        <div className="max-w-7xl mx-auto">
          <span className="section-tag">Coming Up</span>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream leading-tight mb-4">
            Upcoming <em className="text-gold not-italic">Events</em>
          </h2>
          <p className="text-cream-dark font-light max-w-lg leading-relaxed mb-12">
            Stay connected with the pulse of our community through exciting events all year round.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {EVENTS.map(({ date, title, desc }) => (
              <div
                key={title}
                className="border border-gold/20 p-6 hover:border-gold/60 hover:bg-gold/5 transition-all duration-300"
              >
                <span className="inline-block bg-gold text-brown-darkest text-xs font-bold tracking-widest px-3 py-1 mb-4">
                  {date}
                </span>
                <h3 className="font-playfair text-lg text-cream mb-2">{title}</h3>
                <p className="text-cream-dark text-sm font-light leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link href="/events" className="btn-gold">View All Events</Link>
          </div>
        </div>
      </section>

      {/* ── Gallery preview ──────────────────────────────────── */}
      <section className="bg-cream-light py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag">Memories &amp; Moments</span>
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="section-title">
              From Our <em className="text-gold not-italic">Gallery</em>
            </h2>
            <Link
              href="/gallery"
              className="text-xs font-semibold tracking-widest uppercase text-gold border-b border-gold pb-0.5 hover:text-brown-darkest hover:border-brown-darkest transition-colors duration-200"
            >
              View Full Gallery →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {GALLERY_HIGHLIGHTS.map(({ id, emoji, label, bg, featured }) => (
              <Link
                href="/gallery"
                key={id}
                className={`relative overflow-hidden group ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
                style={{ background: bg }}
              >
                <div className={`w-full ${featured ? 'aspect-[4/3] md:aspect-auto md:h-full min-h-48' : 'aspect-[4/3]'}`}>
                  <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-40 select-none">
                    {emoji}
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-cream-light text-sm font-medium leading-snug">{label}</span>
                  </div>
                  <div className="absolute inset-0 bg-brown-darkest/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <span className="font-playfair text-cream text-base">View Gallery</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
