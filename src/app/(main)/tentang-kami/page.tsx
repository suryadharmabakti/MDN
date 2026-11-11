import Link from "next/link";
import {
  FaLightbulb,
  FaStar,
  FaShieldAlt,
  FaHandshake,
  FaLeaf,
  FaHeadset,
  FaCreditCard,
  FaCertificate,
} from "react-icons/fa";
import styles from "../apple-v3-pages.module.css";

const values = [
  {
    icon: FaLightbulb,
    title: "Inovasi",
    description:
      "Berpikir maju dan terus mengembangkan teknologi untuk menciptakan solusi yang lebih baik.",
  },
  {
    icon: FaStar,
    title: "Kualitas",
    description:
      "Menjunjung tinggi standar kualitas dalam setiap produk dan layanan yang kami berikan.",
  },
  {
    icon: FaShieldAlt,
    title: "Keandalan",
    description:
      "Memberikan solusi yang dapat diandalkan bagi pelanggan dan mitra bisnis kami.",
  },
  {
    icon: FaHandshake,
    title: "Kolaborasi",
    description:
      "Membangun hubungan yang kuat dengan pelanggan, mitra, dan komunitas.",
  },
  {
    icon: FaLeaf,
    title: "Keberlanjutan",
    description:
      "Mengelola bisnis secara ramah lingkungan dan bertanggung jawab.",
  },
];

const services = [
  {
    icon: FaHeadset,
    title: "Dukungan Pelanggan 24/7",
    description: "Tim support siap membantu Anda kapan saja.",
  },
  {
    icon: FaCreditCard,
    title: "Fasilitas Pembayaran",
    description: "Cicilan hingga 12 bulan tanpa biaya tambahan.",
  },
  {
    icon: FaCertificate,
    title: "Garansi Resmi",
    description:
      "Produk dilengkapi garansi resmi dan layanan purna jual terpercaya.",
  },
];

export default function TentangKamiPage() {
  return (
    <main className={`${styles.appleV3} apple-v2 page-about`}>
      {/* Header */}
      <section className={styles.contactHero}>
        <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className={`${styles.contactTitle} text-gray-900`}>
            Teknologi yang bergerak bersama Indonesia.
          </h1>
          <p className={`${styles.contactLead} !max-w-2xl`}>
            Menghadirkan inovasi teknologi untuk Indonesia yang lebih maju.
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-start gap-10 md:grid-cols-2 md:gap-16">
          <div>
            <p className="text-sm font-semibold tracking-[0.16em] text-primary-600">TENTANG MDN</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-gray-900 sm:text-5xl">
              Perusahaan teknologi untuk Indonesia.
            </h2>
          </div>
          <div className="space-y-5 text-lg leading-relaxed text-gray-600 md:pt-10">
            <p>
              PT. MDN Industry Power Indonesia Corp adalah perusahaan teknologi
              yang bergerak di bidang manufaktur dan distribusi perangkat
              elektronik, komputer, dan solusi industri.
            </p>
            <p>
              Kami hadir untuk menyediakan produk berkualitas tinggi yang bisa
              diandalkan untuk kebutuhan bisnis dan anak muda di Indonesia.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-[#f5f5f7] py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="flex flex-col rounded-[28px] bg-[#0a3d91] p-8 text-white lg:p-12">
              <p className="text-sm font-semibold tracking-[0.16em] text-[#9cc4ff]">VISI</p>
              <p className="mt-auto pt-12 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
                Menjadi perusahaan teknologi terdepan di Indonesia yang
                menghadirkan inovasi kelas dunia untuk mendorong industri
                nasional ke level yang lebih tinggi.
              </p>
            </div>
            <div className="rounded-[28px] bg-white p-8 lg:p-12">
              <p className="text-sm font-semibold tracking-[0.16em] text-primary-600">MISI</p>
              <ol className="mt-8 divide-y divide-gray-100">
                <li className="flex gap-5 py-4 first:pt-0 last:pb-0">
                  <span className="text-sm font-semibold text-gray-400">01</span>
                  <span className="text-gray-700">Mengedepankan prinsip keberlanjutan dalam setiap aspek bisnis.</span>
                </li>
                <li className="flex gap-5 py-4 first:pt-0 last:pb-0">
                  <span className="text-sm font-semibold text-gray-400">02</span>
                  <span className="text-gray-700">Mendorong pengembangan talenta muda di bidang teknologi.</span>
                </li>
                <li className="flex gap-5 py-4 first:pt-0 last:pb-0">
                  <span className="text-sm font-semibold text-gray-400">03</span>
                  <span className="text-gray-700">Menyediakan layanan purna jual yang profesional dan responsif.</span>
                </li>
                <li className="flex gap-5 py-4 first:pt-0 last:pb-0">
                  <span className="text-sm font-semibold text-gray-400">04</span>
                  <span className="text-gray-700">Memberikan solusi industri yang efisien dan andal.</span>
                </li>
                <li className="flex gap-5 py-4 first:pt-0 last:pb-0">
                  <span className="text-sm font-semibold text-gray-400">05</span>
                  <span className="text-gray-700">Mengembangkan dan memproduksi perangkat elektronik berkualitas tinggi.</span>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold tracking-[0.16em] text-primary-600">NILAI KAMI</p>
          <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-gray-900 sm:text-5xl">
            Prinsip di balik setiap langkah.
          </h2>
        </div>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="rounded-[28px] bg-[#f5f5f7] p-7 transition-transform duration-300 hover:-translate-y-1 lg:col-span-2 lg:[&:nth-child(n+4)]:col-span-3 sm:last:col-span-2 lg:last:col-span-3"
            >
              <v.icon className="text-2xl text-primary-600" aria-hidden="true" />
              <h3 className="mt-8 text-xl font-semibold tracking-tight text-gray-900">{v.title}</h3>
              <p className="mt-2 leading-relaxed text-gray-500">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-gray-100 py-20 lg:py-28">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold tracking-[0.16em] text-primary-600">LAYANAN</p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.035em] text-gray-900 sm:text-5xl">
              Layanan terbaik untuk Anda.
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Kami berkomitmen memberikan pengalaman terbaik kepada setiap pelanggan.
            </p>
          </div>
          <div className="mt-12 grid gap-10 border-t border-gray-200 pt-10 md:grid-cols-3">
            {services.map((s) => (
              <div key={s.title}>
                <s.icon className="text-2xl text-primary-600" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-gray-900">{s.title}</h3>
                <p className="mt-2 leading-relaxed text-gray-500">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate CTA */}
      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="rounded-[28px] bg-gradient-to-b from-[#0a3d91] to-[#072a66] px-6 py-16 text-center text-white sm:py-24">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] sm:text-5xl">
            Solusi korporat untuk bisnis Anda.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Dapatkan penawaran khusus untuk kebutuhan perangkat teknologi
            perusahaan Anda.
          </p>
          <Link
            href="/hubungi-kami"
            className="mt-9 inline-flex items-center rounded-full bg-white px-6 py-3 font-medium text-[#0a3d91] transition-colors hover:bg-[#e8f0ff]"
          >
            Hubungi kami
          </Link>
        </div>
      </section>
    </main>
  );
}
