import Link from "next/link";
import Image from "next/image";
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
  { icon: FaLightbulb, title: "Inovasi", description: "Berpikir maju dan terus mengembangkan teknologi untuk menciptakan solusi yang lebih baik." },
  { icon: FaStar, title: "Kualitas", description: "Menjunjung tinggi standar kualitas dalam setiap produk dan layanan yang kami berikan." },
  { icon: FaShieldAlt, title: "Keandalan", description: "Memberikan solusi yang dapat diandalkan bagi pelanggan dan mitra bisnis kami." },
  { icon: FaHandshake, title: "Kolaborasi", description: "Membangun hubungan yang kuat dengan pelanggan, mitra, dan komunitas." },
  { icon: FaLeaf, title: "Keberlanjutan", description: "Mengelola bisnis secara ramah lingkungan dan bertanggung jawab." },
];

const services = [
  { icon: FaHeadset, title: "Dukungan Pelanggan 24/7", description: "Tim support siap membantu Anda kapan saja." },
  { icon: FaCreditCard, title: "Fasilitas Pembayaran", description: "Cicilan hingga 12 bulan tanpa biaya tambahan." },
  { icon: FaCertificate, title: "Garansi Resmi", description: "Produk dilengkapi garansi resmi dan layanan purna jual terpercaya." },
];

const missions = [
  "Mengembangkan dan memproduksi perangkat elektronik berkualitas tinggi.",
  "Memberikan solusi industri yang efisien dan andal.",
  "Menyediakan layanan purna jual yang profesional dan responsif.",
  "Mendorong pengembangan talenta muda di bidang teknologi.",
  "Mengedepankan prinsip keberlanjutan dalam setiap aspek bisnis.",
];

const pillars = [
  { no: "01", title: "Manufaktur", text: "Merancang dan merakit perangkat komputer serta server yang disesuaikan dengan kebutuhan Indonesia." },
  { no: "02", title: "Distribusi", text: "Menghadirkan perangkat elektronik dan komputer berkualitas ke pelanggan di seluruh Indonesia." },
  { no: "03", title: "Solusi industri", text: "Mendampingi instansi dan perusahaan membangun infrastruktur, dari konsultasi hingga dukungan purna jual." },
];

const facts = [
  ["Nama resmi", "PT. MDN Industry Power Indonesia Corp"],
  ["Kantor pusat", "Cempaka Putih, Jakarta Pusat"],
  ["Bidang usaha", "Manufaktur, distribusi, dan solusi teknologi"],
  ["Pelanggan", "Pemerintahan, BUMN, perbankan, dan swasta"],
];

const clientLogos = [
  ["sektor-pemerintah-0-1.png", "Kementerian Keuangan"], ["sektor-pemerintah-0-2.png", "Kementerian Kesehatan"], ["sektor-pemerintah-0-3.png", "Kementerian Pendidikan"], ["sektor-pemerintah-0-4.png", "Kementerian Pertahanan"],
  ["sektor-komersial-0-0.png", "Telkom Indonesia"], ["sektor-komersial-0-1.png", "Telkomsel"], ["sektor-komersial-0-2.png", "Indosat"], ["sektor-komersial-0-4.png", "BCA"],
  ["sektor-komersial-1-0.png", "BRI"], ["sektor-komersial-1-1.png", "Bank Mandiri"], ["sektor-komersial-2-1.png", "Pertamina"], ["sektor-komersial-2-2.png", "PLN"],
] as const;

const eyebrow = "text-sm font-semibold tracking-[0.16em] text-primary-600";
const heading = "mt-4 text-3xl font-semibold tracking-[-0.035em] text-gray-900 sm:text-5xl";

export default function TentangKamiPage() {
  return (
    <main className={`${styles.appleV3} apple-v2 page-about`}>
      {/* Brand hero */}
      <section className="relative isolate overflow-hidden bg-[#071a42] px-4 pb-20 pt-24 text-center text-white sm:px-6 lg:px-8 lg:pb-28 lg:pt-32">
        <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-80 w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0071e3]/30 blur-[110px]" />
        <Image src="/uploads/mdn-logo-mark.png" alt="Logo MDN" width={326} height={126} priority className="mx-auto h-16 w-auto brightness-0 invert sm:h-20" />
        <p className="mt-10 text-sm font-semibold tracking-[0.16em] text-[#9cc4ff]">PT. MDN INDUSTRY POWER INDONESIA CORP</p>
        <h1 className="mx-auto mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.045em] text-white [text-wrap:balance] sm:text-6xl lg:text-7xl">
          Teknologi yang bergerak bersama Indonesia.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/70 sm:text-xl">
          Mitra teknologi terpercaya Anda untuk laptop, komputer, server, dan solusi industri.
        </p>
      </section>

      {/* Who we are */}
      <section className="mx-auto max-w-[1216px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid items-start gap-12 md:grid-cols-[1.1fr_0.9fr] md:gap-16">
          <div>
           
            <h2 className={heading}>Perusahaan teknologi Indonesia, untuk Indonesia.</h2>
            <div className="mt-8 space-y-5 text-lg leading-relaxed text-gray-600">
              <p>
                PT. MDN Industry Power Indonesia Corp adalah perusahaan teknologi yang bergerak di bidang
                manufaktur dan distribusi perangkat elektronik, komputer, dan solusi industri.
              </p>
              <p>
                Kami hadir untuk menyediakan produk berkualitas tinggi yang bisa diandalkan untuk kebutuhan
                bisnis dan anak muda di Indonesia.
              </p>
            </div>
          </div>
          <dl className="rounded-[28px] bg-[#f5f5f7] p-8 lg:p-10">
            {facts.map(([label, value]) => (
              <div key={label} className="border-b border-black/10 py-5 first:pt-0 last:border-0 last:pb-0">
                <dt className="text-sm text-gray-500">{label}</dt>
                <dd className="mt-1 text-lg font-semibold tracking-tight text-gray-900">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What we do */}
      <section className="bg-[#f5f5f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          
          <h2 className={`${heading} max-w-3xl`}>Dari perakitan hingga sistem berjalan di lokasi Anda.</h2>
          <div className="mt-12 grid gap-4 md:grid-cols-3">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-[28px] bg-white p-8 lg:p-10">
                <span className="bg-gradient-to-br from-[#0071e3] to-[#42a1ff] bg-clip-text text-5xl font-semibold tracking-[-0.05em] text-transparent">{p.no}</span>
                <h3 className="mt-10 text-2xl font-semibold tracking-tight text-gray-900">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-gray-500">{p.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="mx-auto max-w-[1216px] px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="flex flex-col rounded-[28px] bg-gradient-to-br from-[#0a3d91] to-[#071a42] p-8 text-white lg:p-12">
            <p className="text-sm font-semibold tracking-[0.16em] text-[#9cc4ff]">VISI</p>
            <p className="mt-auto pt-12 text-2xl font-semibold leading-snug tracking-tight sm:text-3xl">
              Menjadi perusahaan teknologi terdepan di Indonesia yang menghadirkan inovasi kelas dunia untuk
              mendorong industri nasional ke level yang lebih tinggi.
            </p>
          </div>
          <div className="rounded-[28px] bg-[#f5f5f7] p-8 lg:p-12">
            <p className={eyebrow}>MISI</p>
            <ol className="mt-8 divide-y divide-black/10">
              {missions.map((m, i) => (
                <li key={m} className="flex gap-5 py-4 first:pt-0 last:pb-0">
                  <span className="text-sm font-semibold text-gray-400">0{i + 1}</span>
                  <span className="text-gray-700">{m}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-t border-gray-100 px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
           
            <h2 className={heading}>Prinsip di balik setiap langkah.</h2>
          </div>
          <div className="mt-12 grid gap-x-8 gap-y-10 border-t border-gray-200 pt-10 sm:grid-cols-2 lg:grid-cols-5">
            {values.map((v) => (
              <div key={v.title}>
                <v.icon className="text-2xl text-primary-600" aria-hidden="true" />
                <h3 className="mt-5 text-xl font-semibold tracking-tight text-gray-900">{v.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-gray-500">{v.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients */}
      <section className="bg-[#f5f5f7] px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-6xl text-center">

          <h2 className={`${heading} mx-auto max-w-2xl`}>Mitra bagi instansi dan perusahaan nasional.</h2>
          <div className="mt-12 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
            {clientLogos.map(([file, label]) => (
              <div key={file} className="relative h-24 rounded-2xl bg-white">
                <Image src={`/uploads/${file}`} alt={label} fill sizes="160px" className="object-contain px-6 py-5 opacity-80 grayscale transition duration-300 hover:opacity-100 hover:grayscale-0" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="max-w-2xl">
            <h2 className={heading}>Layanan terbaik untuk Anda.</h2>
            <p className="mt-4 text-lg text-gray-500">Kami berkomitmen memberikan pengalaman terbaik kepada setiap pelanggan.</p>
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
      <section className="mx-auto max-w-[1216px] px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="rounded-[28px] bg-gradient-to-b from-[#0a3d91] to-[#072a66] px-6 py-16 text-center text-white sm:py-24">
          <h2 className="text-3xl font-semibold tracking-[-0.035em] text-white sm:text-5xl">Solusi korporat untuk bisnis Anda.</h2>
          <p className="mx-auto mt-5 max-w-xl text-lg leading-relaxed text-white/70">
            Dapatkan penawaran khusus untuk kebutuhan perangkat teknologi perusahaan Anda.
          </p>
          <Link
            href="/hubungi-kami"
            className="mt-9 inline-flex items-center rounded-full bg-white px-6 py-3 font-medium text-[#0a3d91] transition-colors hover:bg-[#e8f0ff]"
          >
            Hubungi kami
          </Link>
          <p className="mx-auto mt-10 max-w-md text-sm leading-relaxed text-white/50">
            Jl. Cempaka Putih Tengah XVII No. F33, Cempaka Putih Timur, Cempaka Putih, Jakarta Pusat, DKI Jakarta 10510
          </p>
        </div>
      </section>
    </main>
  );
}
