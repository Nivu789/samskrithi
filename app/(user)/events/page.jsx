import Html from '@/components/Html';
import RelatedLinks from '@/components/RelatedLinks';
import { getEvents } from "@/lib/service/event.service";

export const metadata = {
  title: 'Cultural & Sports Events in Pullur, Kerala | Samskrithi',
  description:
    'See upcoming and past Samskrithi events in Pullur, Kerala, from cultural celebrations to sports meets. Find dates and details and join in.',
  alternates: { canonical: '/events' },
};

function formatEventDate(dateString) {
  const date = new Date(dateString);
  const day = date.toLocaleDateString("en-US", { day: "2-digit" });
  const month = date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
  return { day, month };
}

export default async function EventsPage() {

  const events = await getEvents();

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <section className="page-hero text-center">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <span className="section-tag justify-center flex">Calendar</span>
          <h1 className="font-playfair text-5xl md:text-6xl text-cream leading-tight">
            Cultural &amp; Sports <em className="text-gold not-italic">Events</em> in Pullur, Kerala
          </h1>
          <p className="text-cream-dark font-light mt-4 max-w-xl mx-auto leading-relaxed text-lg">
            Stay up to date with everything happening at Samskrithi throughout the year.
          </p>
        </div>
      </section>

      {/* ── Event list ───────────────────────────────────────── */}
      <section className="bg-white py-16 px-6">
        <div className="max-w-5xl mx-auto divide-y divide-cream-dark">
          {events?.length > 0 ? (
            events.map((event) => {
              const { day, month } = formatEventDate(event.date);

              return (
                <div
                  key={event._id}
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
                    <h2 className="font-playfair text-xl text-brown-darkest mb-1"><Html text={event.title} /></h2>
                    <p className="text-brown-mid text-sm font-light leading-relaxed mb-2"><Html text={event.description} /></p>
                    <span className="text-xs text-gold font-semibold">
                      📍 <Html text={event.venue} />&nbsp;&nbsp;|&nbsp;&nbsp;🕐 <Html text={event.time} />
                    </span>
                  </div>

                  {/* Tag */}
                  <div className="hidden md:block">
                    <span className="tag-pill whitespace-nowrap"><Html text={event.tag} /></span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-16 text-brown-mid font-light">
              No upcoming events right now. Check back soon!
            </div>
          )}
        </div>
      </section>
      <RelatedLinks
        heading="More from Samskrithi"
        links={[
          { href: '/gallery', label: 'Browse photos from past events' },
          { href: '/activities', label: 'Explore our activities' },
          { href: '/contact', label: 'Ask us about an event' },
        ]}
      />
    </>
  );
}