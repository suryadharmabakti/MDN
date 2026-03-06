import Link from "next/link";
import { FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-dark-750 text-black-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <Image
                src="/uploads/mdn-logo.png"
                alt="MDN Tech Logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
              />
            </div>
            <p className="text-sm leading-relaxed">
              PT. MDN Industry Power Indonesia Corp — Perusahaan teknologi yang
              bergerak di bidang manufaktur dan distribusi perangkat elektronik,
              komputer, dan solusi industri.
            </p>
          </div>

          <div>
            <h3 className="text-black font-semibold mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/" className="hover:text-primary-400 transition-colors">
                  Beranda
                </Link>
              </li>
              <li>
                <Link href="/produk" className="hover:text-primary-400 transition-colors">
                  Produk
                </Link>
              </li>
              <li>
                <Link href="/tentang-kami" className="hover:text-primary-400 transition-colors">
                  Tentang Kami
                </Link>
              </li>
              <li>
                <Link href="/laporan" className="hover:text-primary-400 transition-colors">
                  Laporan
                </Link>
              </li>
              <li>
                <Link href="/download" className="hover:text-primary-400 transition-colors">
                  Download
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-black font-semibold mb-4">Kontak</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center space-x-2">
                <FaEnvelope className="text-primary-400 flex-shrink-0" />
                <a href="mailto:sales@mdntech.co.id" className="hover:text-primary-400 transition-colors">
                  sales@mdntech.co.id
                </a>
              </li>
              <li className="flex items-center space-x-2">
                <FaWhatsapp className="text-green-500 flex-shrink-0" />
                <a
                  href="https://api.whatsapp.com/send/?phone=6282128907619&text&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  0821-2890-7619
                </a>
              </li>
              <li className="flex items-start space-x-2">
                <FaMapMarkerAlt className="text-red-400 mt-1 flex-shrink-0" />
                <span>
                  Jl. Cempaka Putih Tengah XVII No.F33, Cemp. Putih Tim., Kec.
                  Cemp. Putih, Central Jakarta, DKI Jakarta 10510
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} MDN Tech. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
