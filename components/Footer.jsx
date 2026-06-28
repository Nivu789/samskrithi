import Link from 'next/link';

const PAGES  = [['/', 'Home'], ['/about', 'About Us'], ['/activities', 'Activities'], ['/gallery', 'Gallery'], ['/events', 'Events'], ['/contact', 'Contact']];
const ACTS   = ['Badminton', 'Karate', 'Dance', 'Music'];

export default function Footer() {
  return (
    <footer className="bg-brown-darkest text-cream-dark pt-14 pb-6">
      <div className="max-w-7xl mx-auto px-6">

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gold/20">

          {/* Brand */}
          <div className="lg:col-span-1">
            <h3 className="font-playfair text-2xl text-cream mb-3">
              Samskrithi<span className="text-gold">.</span>
            </h3>
            <p className="text-sm leading-relaxed opacity-70 max-w-xs">
              A community rooted in culture, sport, and the arts. Building bonds that last a lifetime through shared passion and purpose.
            </p>
          </div>

          {/* Navigate */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-5 font-medium">Navigate</h4>
            <ul className="space-y-2">
              {PAGES.map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-all duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Activities */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-5 font-medium">Activities</h4>
            <ul className="space-y-2">
              {ACTS.map((a) => (
                <li key={a}>
                  <Link href="/activities" className="text-sm opacity-70 hover:opacity-100 hover:text-gold transition-all duration-200">
                    {a}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gold text-xs tracking-[0.2em] uppercase mb-5 font-medium">Contact</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>info@samskrithi.in</li>
              <li>+91 XXXXX XXXXX</li>
              <li>Community Centre,</li>
              <li>Kerala, India</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 pt-6 text-xs opacity-50">
          <span>© 2026 Samskrithi Community. All rights reserved.</span>
          <span>Designed with ❤️ for our community</span>
        </div>
      </div>
    </footer>
  );
}
