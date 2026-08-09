export const metadata = {
  title: 'Events — Samskrithi',
};

const EVENTS = [
  {
    day:   '15',
    month: 'Jul 2026',
    title: 'Annual Sports Day',
    desc:  'A community-wide sports celebration featuring badminton championship, karate demonstrations, and friendly athletics. Prizes for winners across all categories. All members and families welcome.',
    venue: 'Community Ground',
    time:  '7:00 AM – 6:00 PM',
    tag:   'Sports',
  },
  {
    day:   '03',
    month: 'Aug 2026',
    title: 'Kalolsavam — Cultural Fest',
    desc:  'An evening of cultural excellence featuring dance recitals, music concerts, and drama performances by members of all age groups. Open to all residents and their guests.',
    venue: 'Community Hall',
    time:  '4:00 PM – 9:00 PM',
    tag:   'Cultural',
  },
  {
    day:   '20',
    month: 'Sep 2026',
    title: 'Onam Celebrations',
    desc:  'A traditional Onam celebration with a grand Pookalam competition, Onasadya feast, Thiruvathirakali, and cultural performances. Dress in traditional attire and celebrate the harvest festival together.',
    venue: 'Community Grounds',
    time:  '9:00 AM – 8:00 PM',
    tag:   'Festival',
  },
  {
    day:   '12',
    month: 'Oct 2026',
    title: 'Karate Grading Ceremony',
    desc:  'The bi-annual karate belt grading and certificate ceremony for students across beginner to advanced levels. Parents and families are warmly invited to witness the achievements.',
    venue: 'Dojo Hall',
    time:  '10:00 AM – 1:00 PM',
    tag:   'Sports',
  },
  {
    day:   '25',
    month: 'Dec 2026',
    title: 'Year-End Gala & Awards Night',
    desc:  'The grand annual celebration honouring the best performers and volunteers across all activity categories. Performances, speeches, and the community awards ceremony make this an unmissable evening.',
    venue: 'Community Hall',
    time:  '5:00 PM – 10:00 PM',
    tag:   'Cultural',
  },
];

export default function EventsPage() {
  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <section className="page-hero text-center">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <span className="section-tag justify-center flex">Calendar</span>
          <h1 className="font-playfair text-5xl md:text-6xl text-cream leading-tight">
            Events &amp; <em className="text-gold not-italic">Programmes</em>
          </h1>
          <p className="text-cream-dark font-light mt-4 max-w-xl mx-auto leading-relaxed text-lg">
            Stay up to date with everything happening at Samskrithi throughout the year.
          </p>
        </div>
      </section>

      {/* ── Event list ───────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto divide-y divide-cream-dark">
          {EVENTS.map(({ day, month, title, desc, venue, time, tag }) => (
            <div
              key={title}
              className="grid grid-cols-1 md:grid-cols-[100px_1fr_auto] gap-5 items-center
                         py-8 px-4 -mx-4 hover:bg-cream-light transition-colors duration-200"
            >
              {/* Date block */}
              <div className="bg-brown-darkest text-center py-4 px-3 w-24 md:w-auto">
                <div className="font-playfair text-4xl text-gold leading-none">{day}</div>
                <div className="text-cream-dark text-xs tracking-widest uppercase mt-1">{month}</div>
              </div>

              {/* Content */}
              <div>
                <h2 className="font-playfair text-xl text-brown-darkest mb-1">{title}</h2>
                <p className="text-brown-mid text-sm font-light leading-relaxed mb-2">{desc}</p>
                <span className="text-xs text-gold font-semibold">
                  📍 {venue}&nbsp;&nbsp;|&nbsp;&nbsp;🕐 {time}
                </span>
              </div>

              {/* Tag */}
              <div className="hidden md:block">
                <span className="tag-pill whitespace-nowrap">{tag}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
