import Link from 'next/link';

export const metadata = {
  title: 'Activities — Samskrithi',
};

const ACTIVITIES = [
  {
    title:   'Badminton',
    tagline: 'Competitive sport for every level',
    image:   '/shuttle1.jpg',
    desc:    'Our badminton programme caters to players at every level — from beginners picking up a racket for the first time to seasoned competitive players. Sessions focus on footwork, stroke technique, match strategy, and physical conditioning under the guidance of certified professionals.',
    highlights: [
      'Certified professional coaches',
      'Beginner through advanced levels',
      'Inter-community tournaments year-round',
    ],
    tags:   ['All Ages', 'Competitive', 'Recreational'],
    timing: '6–8 AM · 5–7 PM',
    days:   'Mon, Wed, Fri',
    venue:  'Community Court',
    leader: 'Rajesh Kumar',
    phone:  '+91 98765 43210',
  },
  {
    title:   'Karate',
    tagline: 'Discipline, focus, and self-defence',
    image:   '/karatebg.jpg',
    desc:    'Traditional karate classes that build discipline, focus, and self-confidence in students of all ages. Under the guidance of a qualified black-belt instructor, students progress through the belt system at their own pace — covering kata, kumite, and self-defence with a strong emphasis on mental fortitude.',
    highlights: [
      'Qualified black-belt instructor',
      'Progressive belt grading system',
      'Kids and adults both welcome',
    ],
    tags:   ['Kids & Adults', 'Self-Defence', 'Belt System'],
    timing: '7–8 AM · 4–5 PM',
    days:   'Tue, Thu, Sat',
    venue:  'Dojo Hall',
    leader: 'Sensei Mohan Das',
    phone:  '+91 97654 32109',
  },
  {
    title:   'Dance',
    tagline: 'Classical, folk and contemporary forms',
    image:   '/dance2.jpg',
    desc:    'A rich variety of styles — from classical Bharatanatyam and vibrant Mohiniyattam to folk forms and contemporary choreography. Our instructors bring years of professional performance experience. Students regularly take the stage at community events and cultural celebrations throughout the year.',
    highlights: [
      'Bharatanatyam, Mohiniyattam & folk styles',
      'Professional performance instructors',
      'Regular stage performance opportunities',
    ],
    tags:   ['Classical', 'Folk', 'Contemporary'],
    timing: '4–6 PM',
    days:   'Mon – Sat',
    venue:  'Dance Studio',
    leader: 'Priya Nair',
    phone:  '+91 96543 21098',
  },
  {
    title:   'Music',
    tagline: 'Carnatic vocals and instruments',
    image:   '/activities.jpg',
    desc:    'From soulful Carnatic vocals to violin, tabla, mridangam, and keyboard — our music classes are led by accomplished, practising musicians. Suitable for absolute beginners and intermediate learners alike, the curriculum is structured progressively and leads to live performances at community events.',
    highlights: [
      'Vocals & multiple instruments offered',
      'Structured, progressive curriculum',
      'Live performance at community events',
    ],
    tags:   ['Carnatic', 'Instrumental', 'Western'],
    timing: '5–7 PM',
    days:   'Tue, Thu, Sat, Sun',
    venue:  'Music Room',
    leader: 'Sunil Varma',
    phone:  '+91 95432 10987',
  },
];

export default function ActivitiesPage() {
  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────── */}
      <section className="page-hero text-center relative overflow-hidden">

        {/* Floating glow orbs */}
        <div
          className="absolute top-10 right-10 w-80 h-80 rounded-full bg-gold/10 blur-3xl pointer-events-none"
          style={{ animation: 'float-a 9s ease-in-out infinite' }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-gold/8 blur-3xl pointer-events-none"
          style={{ animation: 'float-b 13s ease-in-out infinite' }}
        />
        <div
          className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-gold/5 blur-2xl pointer-events-none"
          style={{ animation: 'float-c 11s ease-in-out infinite' }}
        />

        {/* Watermark */}
        <div
          className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden"
          aria-hidden
        >
          <span
            className="font-playfair font-bold text-white/[0.03] whitespace-nowrap"
            style={{ fontSize: 'clamp(80px, 18vw, 220px)' }}
          >
            SAMSKRITHI
          </span>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 py-28">
          <span
            className="section-tag justify-center flex"
            style={{ animation: 'fade-up 0.6s ease forwards', opacity: 0 }}
          >
            Classes &amp; Training
          </span>

          <h1
            className="font-playfair text-5xl md:text-7xl text-cream leading-tight"
            style={{ animation: 'fade-up 0.6s ease 0.15s forwards', opacity: 0 }}
          >
            Our <em className="shimmer-gold not-italic">Activities</em>
          </h1>

          <p
            className="text-cream-dark font-light mt-6 max-w-xl mx-auto leading-relaxed text-lg"
            style={{ animation: 'fade-up 0.6s ease 0.3s forwards', opacity: 0 }}
          >
            Four disciplines. One community. Endless passion for learning and performance.
          </p>

          <div className="flex justify-center gap-3 mt-10 flex-wrap">
            {ACTIVITIES.map(({ title }, i) => (
              <span
                key={title}
                className="border border-gold/40 text-cream-dark text-xs px-5 py-2 tracking-wide"
                style={{
                  animation: 'fade-up 0.5s ease forwards',
                  opacity: 0,
                  animationDelay: `${0.45 + i * 0.1}s`,
                }}
              >
                {title}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Stats strip ───────────────────────────────────────── */}
      <div className="bg-brown-darkest py-8 px-6 border-b border-gold/20">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {[
            ['4',    'Disciplines'],
            ['500+', 'Active Members'],
            ['6',    'Days a Week'],
            ['12+',  'Years Running'],
          ].map(([num, label]) => (
            <div key={label}>
              <span className="font-playfair text-3xl text-gold font-bold block">{num}</span>
              <span className="text-cream-dark text-xs tracking-widest uppercase block mt-1">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Activity sections ─────────────────────────────────── */}
      <section className="bg-white">
        {ACTIVITIES.map(({ title, tagline, image, desc, highlights, tags, timing, days, venue, leader, phone }, i) => (
          <div
            key={title}
            className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} border-b border-cream-dark`}
          >
            {/* Photo panel */}
            <div className="md:w-2/5 relative overflow-hidden min-h-80 md:min-h-[420px]">
              <img
                src={image}
                alt={title}
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h2 className="font-playfair text-4xl text-white leading-tight">{title}</h2>
                <div className="w-10 h-px bg-gold my-3" />
                <p className="text-white/75 text-sm font-light tracking-wide">{tagline}</p>
              </div>
            </div>

            {/* Content panel */}
            <div className="md:w-3/5 py-12 px-8 lg:px-14 flex flex-col justify-center">
              <p className="text-brown-mid leading-relaxed font-light mb-8">{desc}</p>

              {/* Highlights */}
              <ul className="space-y-2.5 mb-8">
                {highlights.map((h) => (
                  <li key={h} className="flex items-start gap-3 text-sm text-brown-mid">
                    <span className="text-gold font-bold shrink-0 mt-0.5">✦</span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>

              {/* Schedule grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-cream-light p-5 mb-6">
                {[['Timing', timing], ['Days', days], ['Venue', venue], ['Contact', `${leader} · ${phone}`]].map(([label, value]) => (
                  <div key={label}>
                    <span className="block text-xs text-gold font-semibold tracking-widest uppercase mb-1">
                      {label}
                    </span>
                    <span className="text-brown-darkest text-sm font-medium leading-snug">{value}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* ── CTA ───────────────────────────────────────────────── */}
      <section className="py-24 px-6 text-center" style={{ background: '#3D1F0A' }}>
        <span className="section-tag justify-center flex">Get Involved</span>
        <h2 className="font-playfair text-4xl md:text-5xl text-cream mb-4">
          Ready to <em className="text-gold not-italic">Start?</em>
        </h2>
        <p className="text-cream-dark font-light max-w-md mx-auto mb-10 leading-relaxed">
          Join hundreds of community members already learning, growing, and performing together.
        </p>
        <Link href="/contact" className="btn-gold">Enquire &amp; Join Us</Link>
      </section>
    </>
  );
}
