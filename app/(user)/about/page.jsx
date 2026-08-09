export const metadata = {
  title: 'About — Samskrithi',
};

const LEADERSHIP = [
  { role: 'President',       name: 'Rathnakaran V V', image: '/presidentsamskrithi.png' },
  { role: 'Secretary',       name: 'Sasi A T',        image: '/secretarysamskrithi.png' },
  { role: 'Treasurer',       name: 'Unnikrishnan V V', image: '/tresurersamskrithi.png' },
];

const MANAGEMENT = [
  { role: 'Vice President',  name: 'Balakrishnan',    image: '/vicePresident1.jpg' },
  { role: 'Vice President',  name: 'Sasidharan K',    image: '/vicePresident2.png' },
  { role: 'Joint Secretary', name: 'Pramod',          image: '/jointSecretary1.png' },
  { role: 'Joint Secretary', name: 'Gopi Karakode',   image: '/jointSecretary2.png' },
];

const EXECUTIVE_MEMBERS = [
  { name: 'Kannan',        image: '/member1.png' },
  { name: 'Vinod',         image: '/member2.png' },
  { name: 'Murali Krishnan', image: '/member3.png' },
  { name: 'Praveen',       image: '/member4.png' },
  { name: 'Baskaran',      image: '/member5.png' },
  { name: 'Krishnan',      image: '/member6.png' },
  { name: 'Ashokan',       image: '/member7.png' },
  { name: 'Suresh Kumar N', image: '/member8.png' },
  { name: 'Narayanan V',   image: '/member9.png' },
  { name: 'Santhosh V V',  image: '/member10.png' },
  { name: 'Sharath',       image: '/member11.png' },
];

const VALUES = [
  { emoji: '🌿', title: 'Unity',     text: 'A unified community that supports and uplifts every member, building strength together.' },
  { emoji: '🎭', title: 'Culture',   text: 'Preserving and promoting our rich cultural heritage through arts, music, and dance.' },
  { emoji: '⚡', title: 'Growth',    text: 'Encouraging personal development and excellence in every activity we offer.' },
  { emoji: '🤝', title: 'Inclusion', text: 'Creating spaces where everyone belongs, regardless of age, background, or skill level.' },
];

function MemberCard({ role, name, image, large = false }) {
  return (
    <div className={`flex flex-col items-center ${large ? 'w-60' : 'w-48'}`}>
      <div className={`w-full ${large ? 'h-72' : 'h-56'} overflow-hidden bg-cream-light`}>
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover object-center"
        />
      </div>
      <div className="w-full text-center bg-brown-darkest py-3 px-2">
        {role && (
          <p className="text-xs text-gold font-semibold tracking-widest uppercase mb-0.5">
            {role}
          </p>
        )}
        <p className="text-cream font-playfair text-sm font-semibold">{name}</p>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <span className="section-tag">Our Story</span>
          <h1 className="font-playfair text-5xl md:text-6xl text-cream leading-tight">
            About <em className="text-gold not-italic">Samskrithi</em>
          </h1>
          <p className="text-cream-dark font-light mt-4 max-w-xl leading-relaxed text-lg">
            A community built on culture, unity and the joy of shared experience.
          </p>
        </div>
      </section>

      {/* ── Members ──────────────────────────────────────────── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <span className="section-tag">Our People</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-brown-darkest">
              Meet the <em className="text-gold not-italic">Team</em>
            </h2>
          </div>

          {/* Leadership */}
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            {LEADERSHIP.map(({ role, name, image }) => (
              <MemberCard key={name} role={role} name={name} image={image} large />
            ))}
          </div>

          {/* Management */}
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            {MANAGEMENT.map(({ role, name, image }) => (
              <MemberCard key={name} role={role} name={name} image={image} />
            ))}
          </div>

          {/* Executive members */}
          <div className="text-center mb-10">
            <h3 className="font-playfair text-2xl text-brown-darkest border-b-2 border-gold pb-1 inline-block">
              Executive Members
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {EXECUTIVE_MEMBERS.map(({ name, image }) => (
              <MemberCard key={name} name={name} image={image} />
            ))}
          </div>

        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left column — text blocks */}
          <div className="space-y-10">
            {[
              {
                title: 'Who We Are',
                text:  'Samskrithi is a vibrant local community association dedicated to fostering cultural, sporting, and artistic growth among residents. Founded over a decade ago, we bring together people of all ages to participate in meaningful activities and build lasting bonds.',
              },
              {
                title: 'Our Mission',
                text:  'To nurture talent, promote culture, and build a strong, inclusive community where every member — young and old — has the opportunity to learn, perform, and celebrate their heritage.',
              },
              {
                title: 'Our Vision',
                text:  'To be the most celebrated community in the region — known for excellence in the arts and sports, and deeply rooted in the values of togetherness, respect, and cultural pride.',
              },
            ].map(({ title, text }) => (
              <div key={title}>
                <h3 className="font-playfair text-xl text-brown-darkest border-b-2 border-gold pb-1 inline-block">
                  {title}
                </h3>
                <p className="text-brown-mid leading-relaxed font-light mt-3">{text}</p>
              </div>
            ))}
          </div>

          {/* Right column — values + quote */}
          <div>
            <h3 className="font-playfair text-xl text-brown-darkest border-b-2 border-gold pb-1 inline-block mb-6">
              Our Core Values
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {VALUES.map(({ emoji, title, text }) => (
                <div key={title} className="bg-cream-light border-l-4 border-gold p-5">
                  <h4 className="font-playfair text-brown-darkest mb-1">{emoji} {title}</h4>
                  <p className="text-sm text-brown-mid leading-relaxed font-light">{text}</p>
                </div>
              ))}
            </div>

            <blockquote className="mt-8 bg-cream p-6 border-l-4 border-gold">
              <p className="font-playfair text-xl text-brown-darkest italic leading-relaxed">
                &ldquo;Samskrithi is more than a club — it is a second home, a family bound not by blood
                but by the joy of art, sport, and shared purpose.&rdquo;
              </p>
              <footer className="mt-4 text-xs text-brown-mid font-semibold tracking-widest uppercase">
                — Community Founding Member
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}
