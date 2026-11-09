import Link from "next/link";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa";
import Image from "next/image";
import FooterCredits from "./FooterCredits";

export default function Footer() {
  return (
    <footer className="bg-surface text-ink-secondary text-[12px] leading-relaxed border-t border-line">
      <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
        {/* Newsletter Integrated */}
        <div className="mb-12 pb-12 border-b border-line">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-[17px] font-semibold text-ink mb-1">
                Berlangganan Newsletter Kami
              </h3>
              <p className="text-ink-secondary max-w-md">
                Dapatkan pembaruan terbaru mengenai produk baru dan penawaran menarik langsung di email Anda.
              </p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Alamat email"
                className="px-4 py-2 w-full md:w-64 bg-white border border-line rounded-l-lg focus:outline-none focus:ring-1 focus:ring-primary-500 transition-all"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-ink text-white font-medium rounded-r-lg hover:bg-black transition-colors"
              >
                Langganan
              </button>
            </form>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Quick Links */}
          <div>
            <h4 className="text-ink font-semibold mb-4 uppercase tracking-wider text-[11px]">Tautan Cepat</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-ink hover:underline transition-all">Home</Link></li>
              <li><Link href="/produk" className="hover:text-ink hover:underline transition-all">Shop</Link></li>
              <li><Link href="/tentang-kami" className="hover:text-ink hover:underline transition-all">Tentang Kami</Link></li>
              <li><Link href="/hubungi-kami" className="hover:text-ink hover:underline transition-all">Kontak</Link></li>
              <li><Link href="/laporan" className="hover:text-ink hover:underline transition-all">Laporan</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-ink font-semibold mb-4 uppercase tracking-wider text-[11px]">Layanan Pelanggan</h4>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-ink hover:underline transition-all">Kebijakan Pengiriman</Link></li>
              <li><Link href="#" className="hover:text-ink hover:underline transition-all">Kebijakan Pengembalian</Link></li>
              <li><Link href="#" className="hover:text-ink hover:underline transition-all">Kebijakan Privasi</Link></li>
              <li><Link href="#" className="hover:text-ink hover:underline transition-all">Syarat & Ketentuan</Link></li>
              <li><Link href="#" className="hover:text-ink hover:underline transition-all">FAQ</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-ink font-semibold mb-4 uppercase tracking-wider text-[11px]">Hubungi Kami</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <FaMapMarkerAlt className="mt-1 flex-shrink-0 opacity-70" />
                <span>
                  Jl. Cempaka Putih Tengah XVII No.F33, Cemp. Putih Tim., Kec.
                  Cemp. Putih, Jakarta Pusat, DKI Jakarta 10510
                </span>
              </li>
              <li className="flex items-center gap-2">
                <FaWhatsapp className="flex-shrink-0 opacity-70" />
                <a
                  href="https://api.whatsapp.com/send/?phone=6282128907619"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-ink hover:underline transition-all"
                >
                  08131536969
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FaEnvelope className="flex-shrink-0 opacity-70" />
                <a
                  href="mailto:sales@mdntech.co.id"
                  className="hover:text-ink hover:underline transition-all"
                >
                  sales@mdntech.co.id
                </a>
              </li>
            </ul>
          </div>

          {/* Company Info & Socials */}
          <div>
            <h4 className="text-ink font-semibold mb-4 uppercase tracking-wider text-[11px]"></h4>
            <p className="mb-4 text-ink-secondary leading-relaxed">
              PT. MDN Industry Power Indonesia Corp — Mitra teknologi terpercaya Anda untuk laptop, komputer, dan solusi industri.
            </p>
            <div className="flex gap-4 items-center">
              <a href="#" className="text-ink-secondary hover:text-ink transition-colors"><FaFacebook className="text-[18px]" /></a>
              <a href="#" className="text-ink-secondary hover:text-ink transition-colors"><FaInstagram className="text-[18px]" /></a>
              <a href="#" className="text-ink-secondary hover:text-ink transition-colors"><FaTwitter className="text-[18px]" /></a>
              <a href="#" className="text-ink-secondary hover:text-ink transition-colors"><FaYoutube className="text-[18px]" /></a>
              <a href="#" className="text-ink-secondary hover:text-ink transition-colors"><FaTiktok className="text-[18px]" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Legal Row */}
        <div className="border-t border-line mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <p className="text-ink-secondary">
                Copyright &copy; {new Date().getFullYear()} MDN Tech. Seluruh hak cipta dilindungi undang-undang.
              </p>
              <div className="flex items-center gap-3">
                <span className="w-[1px] h-3 bg-line hidden md:block"></span>
                <Link href="#" className="hover:text-ink hover:underline">Privasi</Link>
                <span className="w-[1px] h-3 bg-line"></span>
                <Link href="#" className="hover:text-ink hover:underline">Legal</Link>
                <span className="w-[1px] h-3 bg-line"></span>
                <Link href="#" className="hover:text-ink hover:underline">Peta Situs</Link>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <span className="px-2 py-0.5 border border-line rounded text-[10px]">VISA</span>
              <span className="px-2 py-0.5 border border-line rounded text-[10px]">MASTERCARD</span>
              <span className="px-2 py-0.5 border border-line rounded text-[10px]">BCA</span>
              <span className="px-2 py-0.5 border border-line rounded text-[10px]">BNI</span>
              <span className="px-2 py-0.5 border border-line rounded text-[10px]">BRI</span>
              <span className="px-2 py-0.5 border border-line rounded text-[10px]">MANDIRI</span>
              <span className="px-2 py-0.5 border border-line rounded text-[10px]">GOPAY</span>
            </div>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row justify-between items-center gap-4 border-t border-line/50 pt-8">
            <p className="text-ink-secondary opacity-80 italic">
              Powered by PT. MDN Industry Power Indonesia Corp
            </p>
            <FooterCredits />
          </div>
        </div>
      </div>
    </footer>
  );
}
