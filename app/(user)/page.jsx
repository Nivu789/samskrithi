// app/page.js

import Link from 'next/link';
import HomeHero from '@/components/HomeHero';

import { getHome } from '@/lib/service/home.service';
import { getActivity } from '@/lib/service/activity.service';
import { getEvents } from '@/lib/service/event.service';
import { getGallery } from '@/lib/service/gallery.service';

export const metadata = {
  title: 'Home — Samskrithi',
};

function truncate(text, maxLength = 80) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trimEnd() + '...';
}

function formatEventDate(date) {
  if (!date) return '';
  return new Date(date)
    .toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' })
    .toUpperCase();
}

export default async function HomePage() {
  const [home, activity, events, gallery] = await Promise.all([
    getHome(),
    getActivity(),
    getEvents(),
    getGallery(1, 6),
  ]);

  const activities = activity?.secondSection?.items || [];
  const upcomingEvents = (events || []).slice(0, 3);
  const galleryDocs = gallery?.data || [];

  return (
    <>
      <HomeHero data={home?.bannerSection} />

      {/* ── Stats bar ────────────────────────────────────────── */}
      <div className="bg-cream-dark border-b-2 border-gold py-10 px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          {home?.secondSection?.items?.map(({ number, value }) => (
            <div key={value}>
              <span className="font-playfair text-4xl md:text-5xl text-brown-darkest font-bold block">{number}</span>
              <span className="text-brown-mid text-xs tracking-widest uppercase mt-1 block">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Activities preview ───────────────────────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="section-tag">{home?.thirdSection?.title}</span>
          <h2 className="section-title mb-4" dangerouslySetInnerHTML={{ __html: home?.thirdSection?.subTitle }} />
          {/* {home?.thirdSection?.subTitle}
          </h2> */}
          <p className="text-brown-mid max-w-lg leading-relaxed font-light mb-12">
            {home?.thirdSection?.description}
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {activities.map(({ title, subTitle, image, imageAlt, description }) => (
              <Link
                href="/activities"
                key={title}
                className="group flex flex-col overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative overflow-hidden" style={{ aspectRatio: '4/3' }}>
                  <img
                    src={image}
                    alt={imageAlt || title}
                    className="absolute inset-0 w-full h-full object-cover object-center
                     group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <h3 className="font-playfair text-xl text-white leading-tight">{title}</h3>
                    <div className="w-8 h-px bg-gold my-2.5 group-hover:w-14 transition-all duration-300" />
                    <p className="text-white/70 text-xs font-light tracking-wide">{subTitle}</p>
                  </div>
                </div>

                <div className="bg-cream-light border border-cream-dark border-t-0 p-5 flex-1 relative overflow-hidden">
                  <div
                    className="absolute bottom-0 left-0 w-full h-0.5 bg-gold
                     origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                  />
                  <p className="text-brown-mid text-sm leading-relaxed font-light">{truncate(description, 80)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Events preview ───────────────────────────────────── */}
      <section className="py-20 px-6" style={{ background: '#3D1F0A' }}>
        <div className="max-w-7xl mx-auto">
          <span className="section-tag">{home?.fourthSection?.title}</span>
          <h2 className="font-playfair text-4xl md:text-5xl text-cream leading-tight mb-4" dangerouslySetInnerHTML={{ __html: home?.fourthSection?.subTitle }} />
          {/* {home?.fourthSection?.subTitle}
          </h2> */}
          <p className="text-cream-dark font-light max-w-lg leading-relaxed mb-12">
            {home?.fourthSection?.description}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {upcomingEvents.map(({ _id, date, title, description }) => (
              <div
                key={_id}
                className="border border-gold/20 p-6 hover:border-gold/60 hover:bg-gold/5 transition-all duration-300"
              >
                <span className="inline-block bg-gold text-brown-darkest text-xs font-bold tracking-widest px-3 py-1 mb-4">
                  {formatEventDate(date)}
                </span>
                <h3 className="font-playfair text-lg text-cream mb-2">{title}</h3>
                <p className="text-cream-dark text-sm font-light leading-relaxed">{description}</p>
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
          <span className="section-tag" dangerouslySetInnerHTML={{ __html: home?.fifthSection?.title }} />
          <div className="flex items-end justify-between mb-10 flex-wrap gap-4">
            <h2 className="section-title" dangerouslySetInnerHTML={{ __html: home?.fifthSection?.subTitle }} />
            {/* {home?.fifthSection?.subTitle}
            </h2> */}
            <Link
              href="/gallery"
              className="text-xs font-semibold tracking-widest uppercase text-gold border-b border-gold pb-0.5 hover:text-brown-darkest hover:border-brown-darkest transition-colors duration-200"
            >
              View Full Gallery →
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {galleryDocs.map(({ _id, title, images }, index) => (
              <Link
                href="/gallery"
                key={_id}
                className={`relative overflow-hidden group ${index === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}
              >
                <div className={`w-full ${index === 0 ? 'aspect-[4/3] md:aspect-auto md:h-full min-h-48' : 'aspect-[4/3]'}`}>
                  <img
                    src={images?.[0]}
                    alt={title}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent">
                    <span className="text-cream-light text-sm font-medium leading-snug">{title}</span>
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