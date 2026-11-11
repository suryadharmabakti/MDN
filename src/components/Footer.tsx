import Link from "next/link";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaTiktok,
  FaGlobe,
  FaUserLock,
} from "react-icons/fa";
import FooterCredits from "./FooterCredits";

const linkClass = "transition-colors hover:text-ink hover:underline";
const headingClass = "mb-4 text-[11px] font-semibold uppercase tracking-wider text-ink";

const quickLinks = [
  { href: "/", label: "Home" },
  { href: "/produk", label: "Shop" },
  { href: "/tentang-kami", label: "About Us" },
  { href: "/hubungi-kami", label: "Contact" },
  { href: "/laporan", label: "Reports" },
];

const serviceLinks = [
  { href: "#", label: "Shipping Policy" },
  { href: "#", label: "Return Policy" },
  { href: "#", label: "Privacy Policy" },
  { href: "#", label: "Terms & Conditions" },
  { href: "#", label: "FAQ" },
];

const socials = [
  { href: "https://www.instagram.com/mdnindonesia", label: "Instagram @mdnindonesia", icon: FaInstagram },
  { href: "https://www.linkedin.com/company/mdnindonesia", label: "LinkedIn MDN Indonesia", icon: FaLinkedin },
  { href: "https://www.youtube.com/@mdnindonesia", label: "YouTube MDN Indonesia", icon: FaYoutube },
  { href: "https://www.tiktok.com/@mdnindonesia", label: "TikTok @mdnindonesia", icon: FaTiktok },
  { href: "https://www.mdntech.co.id", label: "Website www.mdntech.co.id", icon: FaGlobe },
];

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface text-[12px] leading-relaxed text-ink-secondary">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:py-16">
        {/* Newsletter */}
        <div className="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <h3 className="text-[17px] font-semibold tracking-tight text-ink">Subscribe to our newsletter</h3>
            <p className="mt-1 max-w-md">Get the latest product updates and special offers delivered to your inbox.</p>
          </div>
          <form className="flex w-full gap-2 md:w-auto">
            <input
              type="email"
              placeholder="Email address"
              aria-label="Email address"
              className="w-full rounded-full border border-line bg-white px-4 py-2.5 outline-none transition focus:border-[#0071e3] focus:ring-4 focus:ring-[#0071e3]/15 md:w-64"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[#0071e3] px-5 py-2.5 font-medium text-white transition-colors hover:bg-[#0077ed]"
            >
              Subscribe
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12">
          <div>
            <h4 className={headingClass}>Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>Customer Service</h4>
            <ul className="space-y-2">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href} className={linkClass}>{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 opacity-70" />
                <span>
                  Jl. Cempaka Putih Tengah XVII No. F33, Cempaka Putih Timur,
                  Cempaka Putih, Central Jakarta, DKI Jakarta 10510
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="flex-shrink-0 opacity-70" />
                <a href="https://api.whatsapp.com/send/?phone=6282128907619" target="_blank" rel="noopener noreferrer" className={linkClass}>
                  0821-2890-7619
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="flex-shrink-0 opacity-70" />
                <a href="mailto:sales@mdntech.co.id" className={linkClass}>sales@mdntech.co.id</a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className={headingClass}>Follow Us</h4>
            <p className="mb-4 leading-relaxed">
              PT. MDN Industry Power Indonesia Corp — Mitra teknologi terpercaya Anda untuk laptop, komputer, dan solusi industri.
            </p>
            <div className="flex items-center gap-4">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="text-ink-secondary transition-colors hover:text-ink"
                >
                  <s.icon className="text-[18px]" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom row */}
        <div className="mt-12 flex flex-col gap-4 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p>
              Copyright © {new Date().getFullYear()} PT. MDN Industry Power Indonesia Corp. All rights reserved.
            </p>
            <div className="flex items-center gap-3">
              <Link href="#" className={linkClass}>Privacy</Link>
              <span className="h-3 w-px bg-line" />
              <Link href="#" className={linkClass}>Legal</Link>
              <span className="h-3 w-px bg-line" />
              <Link href="#" className={linkClass}>Sitemap</Link>
              <span className="h-3 w-px bg-line" />
              <Link
                href="/login"
                aria-label="Admin login"
                title="Admin login"
                className="inline-flex items-center transition-colors hover:text-ink"
              >
                <FaUserLock className="text-[13px]" />
              </Link>
            </div>
          </div>
          <FooterCredits />
        </div>
      </div>
    </footer>
  );
}
