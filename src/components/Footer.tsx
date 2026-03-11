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

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Newsletter Section */}
      <div className="bg-primary-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="text-2xl font-medium mb-2">
                Subscribe to our newsletter
              </h3>
              <p className="text-primary-100">
                Get the latest updates on new products and upcoming sales
              </p>
            </div>
            <form className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-5 py-3.5 w-full md:w-72 rounded-l-xl text-gray-900 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-3.5 bg-gray-900 hover:bg-gray-800 font-medium rounded-r-xl transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-6">
              <Image
                src="/uploads/mdn-logo.png"
                alt="MDN Tech Logo"
                width={70}
                height={70}
                className="h-18 w-18 object-contain"
              />
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              PT. MDN Industry Power Indonesia Corp — Your trusted technology
              partner for laptops, computers, and industrial
              solutions.
            </p>
            <div className="flex gap-4">
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FaYoutube />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-gray-800 hover:bg-primary-600 rounded-full flex items-center justify-center transition-colors"
              >
                <FaTiktok />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-medium mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="hover:text-primary-400 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/produk"
                  className="hover:text-primary-400 transition-colors"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  href="/tentang-kami"
                  className="hover:text-primary-400 transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/hubungi-kami"
                  className="hover:text-primary-400 transition-colors"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/laporan"
                  className="hover:text-primary-400 transition-colors"
                >
                  Reports
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-medium mb-6">Customer Service</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Return Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="hover:text-primary-400 transition-colors"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-medium mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary-500 mt-1 flex-shrink-0" />
                <span className="text-sm">
                  Jl. Cempaka Putih Tengah XVII No.F33, Cemp. Putih Tim., Kec.
                  Cemp. Putih, Central Jakarta, DKI Jakarta 10510
                </span>
              </li>
              <li className="flex items-center gap-3">
                <FaWhatsapp className="text-green-500 flex-shrink-0" />
                <a
                  href="https://api.whatsapp.com/send/?phone=6282128907619"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition-colors"
                >
                  0821-2890-7619
                </a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary-500 flex-shrink-0" />
                <a
                  href="mailto:sales@mdntech.co.id"
                  className="hover:text-primary-400 transition-colors"
                >
                  sales@mdntech.co.id
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-500">Payment Methods:</p>
            <div className="flex items-center gap-3">
              <div className="px-3 py-2 bg-gray-800 rounded text-xs font-medium">
                VISA
              </div>
              <div className="px-3 py-2 bg-gray-800 rounded text-xs font-medium">
                Mastercard
              </div>
              <div className="px-3 py-2 bg-gray-800 rounded text-xs font-medium">
                BCA
              </div>
              <div className="px-3 py-2 bg-gray-800 rounded text-xs font-medium">
                BNI
              </div>
              <div className="px-3 py-2 bg-gray-800 rounded text-xs font-medium">
                BRI
              </div>
              <div className="px-3 py-2 bg-gray-800 rounded text-xs font-medium">
                Mandiri
              </div>
              <div className="px-3 py-2 bg-gray-800 rounded text-xs font-medium">
                Gopay
              </div>
              <div className="px-3 py-2 bg-gray-800 rounded text-xs font-medium">
                OVO
              </div>
              <div className="px-3 py-2 bg-gray-800 rounded text-xs font-medium">
                DANA
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} MDN Tech. All rights reserved. |
            Powered by PT. MDN Industry Power Indonesia Corp
          </p>
        </div>
      </div>
    </footer>
  );
}
