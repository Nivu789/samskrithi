import Link from 'next/link';

export default function RelatedLinks({ heading = 'Explore more', links }) {
  return (
    <section className="bg-cream py-12 px-6 border-t border-cream-dark">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-playfair text-2xl text-brown-darkest mb-4">{heading}</h2>
        <ul className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-sm">
          {links.map(({ href, label }) => (
            <li key={href}>
              <Link href={href} className="text-gold underline underline-offset-4 hover:text-brown-darkest">
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
