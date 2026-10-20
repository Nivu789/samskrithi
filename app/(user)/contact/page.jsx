import Html from '@/components/Html';
import { getContact } from "@/lib/service/contact.service";
import ContactForm from "./ContactForm";

export const metadata = {
  title: 'Contact Samskrithi Pullur | Address, Phone & Enquiries',
  description:
    'Get in touch with Samskrithi in Pullur, Kerala. Find our address, phone and email, or send a message to join activities or ask about events.',
  alternates: { canonical: '/contact' },
};

export default async function ContactPage() {
  const contact = await getContact();

  return (
    <>
      {/* ── Page hero ─────────────────────────────────────────── */}
      <section className="page-hero text-center">
        <div className="max-w-4xl mx-auto px-6 py-24">
          <span className="section-tag justify-center flex" dangerouslySetInnerHTML={{ __html: contact.hero?.subTitle }} />
          <h1 className="font-playfair text-5xl md:text-6xl text-cream leading-tight" dangerouslySetInnerHTML={{ __html: contact.hero?.title }} />
            {/* {contact.hero?.title} */}
          
          <p className="text-cream-dark font-light mt-4 max-w-xl mx-auto leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: contact.hero?.description }} />
            {/* {contact.hero?.description}
          </p> */}
        </div>
      </section>

      {/* ── Two-column layout ────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[2fr_3fr]">

        {/* Left — info panel */}
        <div className="bg-brown-darkest text-cream-light p-10 space-y-8">
          <div>
            <span className="section-tag"><Html text={contact.infoPanel?.subTitle} /></span>
            <h2 className="font-playfair text-3xl text-cream" dangerouslySetInnerHTML={{ __html: contact.infoPanel?.title }} />
              {/* {contact.infoPanel?.title}
            </h2> */}
            <div className="gold-divider" />
            <p className="text-cream-dark font-light text-sm leading-relaxed">
              <Html text={contact.infoPanel?.description} />
            </p>
          </div>

          {contact.contactDetails?.map(({ icon, title, info }) => (
            <div key={title} className="flex gap-4 items-start">
              <div className="w-11 h-11 bg-gold/10 border border-gold/30 flex items-center justify-center text-xl shrink-0">
                {icon}
              </div>
              <div>
                <h4 className="text-gold text-xs tracking-widest uppercase mb-1 font-medium"><Html text={title} /></h4>
                <p className="text-cream-dark text-sm leading-relaxed whitespace-pre-line"><Html text={info} /></p>
              </div>
            </div>
          ))}
        </div>

        {/* Right — form (client) */}
        <ContactForm interests={contact.interests || []} />
      </div>
    </>
  );
}