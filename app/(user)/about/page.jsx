import { getAbout } from "@/lib/service/about.service";


export const metadata = {
  title: 'About — Samskrithi',
};

// Static fallback data — kept for reference, no longer used for rendering.
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

function MemberCard({ role, name, image, imageAlt, large = false }) {
  return (
    <div className={`flex flex-col items-center ${large ? 'w-60' : 'w-48'}`}>
      <div className={`w-full ${large ? 'h-72' : 'h-56'} overflow-hidden bg-cream-light`}>
        <img
          src={image}
          alt={imageAlt || name}
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

export default async function AboutPage() {

  const about = await getAbout();

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="max-w-7xl mx-auto px-6 py-24">
          <span className="section-tag">{about.firstSection?.subTitle}</span>
          <h1 className="font-playfair text-5xl md:text-6xl text-cream leading-tight">
            {about.firstSection?.title}
          </h1>
          <p className="text-cream-dark font-light mt-4 max-w-xl leading-relaxed text-lg">
            {about.firstSection?.description}
          </p>
        </div>
      </section>

      {/* ── Members ──────────────────────────────────────────── */}
      <section className="bg-cream py-20 px-6">
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-16">
            <span className="section-tag">{about.secondSection?.subTitle}</span>
            <h2 className="font-playfair text-4xl md:text-5xl text-brown-darkest">
              {about.secondSection?.title}
            </h2>
          </div>

          {/* Leadership / Management */}
          <div className="flex flex-wrap justify-center gap-8 mb-20">
            {about.secondSection?.items?.map((item) => (
              <MemberCard
                key={item.name}
                role={item.designation}
                name={item.name}
                image={item.image}
                imageAlt={item.imageAlt}
                large
              />
            ))}
          </div>

          {/* Executive members */}
          <div className="text-center mb-10">
            <h3 className="font-playfair text-2xl text-brown-darkest border-b-2 border-gold pb-1 inline-block">
              {about.thirdSection?.title}
            </h3>
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            {about.thirdSection?.items?.map((item) => (
              <MemberCard
                key={item.name}
                name={item.name}
                image={item.image}
                imageAlt={item.imageAlt}
              />
            ))}
          </div>

        </div>
      </section>

      {/* ── Main content ─────────────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left column — text blocks */}
          <div className="space-y-10">
            {about.fourthSection?.items?.map(({ title, description }) => (
              <div key={title}>
                <h3 className="font-playfair text-xl text-brown-darkest border-b-2 border-gold pb-1 inline-block">
                  {title}
                </h3>
                <p className="text-brown-mid leading-relaxed font-light mt-3">{description}</p>
              </div>
            ))}
          </div>

          {/* Right column — values + quote */}
          <div>
            <h3 className="font-playfair text-xl text-brown-darkest border-b-2 border-gold pb-1 inline-block mb-6">
              {about.fifthSection?.title}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {about.fifthSection?.items?.map(({ image, imageAlt, title, description }) => (
                <div key={title} className="bg-cream-light border-l-4 border-gold p-5">
                  <div className="w-10 h-10 mb-2 overflow-hidden rounded-full">
                    <img
                      src={image}
                      alt={imageAlt || title}
                      className="w-full h-full object-cover object-center"
                    />
                  </div>
                  <h4 className="font-playfair text-brown-darkest mb-1">{title}</h4>
                  <p className="text-sm text-brown-mid leading-relaxed font-light">{description}</p>
                </div>
              ))}
            </div>

            <blockquote className="mt-8 bg-cream p-6 border-l-4 border-gold">
              <p className="font-playfair text-xl text-brown-darkest italic leading-relaxed">
                &ldquo;{about.sixthSection?.message}&rdquo;
              </p>
              <footer className="mt-4 text-xs text-brown-mid font-semibold tracking-widest uppercase">
                — {about.sixthSection?.name}
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
}