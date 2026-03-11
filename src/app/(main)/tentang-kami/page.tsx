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

const values = [
  {
    icon: FaLightbulb,
    title: "Inovasi",
    description:
      "Berpikir maju dan terus mengembangkan teknologi untuk menciptakan solusi yang lebih baik.",
    color: "text-yellow-400",
  },
  {
    icon: FaStar,
    title: "Kualitas",
    description:
      "Menjunjung tinggi standar kualitas dalam setiap produk dan layanan yang kami berikan.",
    color: "text-primary-400",
  },
  {
    icon: FaShieldAlt,
    title: "Keandalan",
    description:
      "Memberikan solusi yang dapat diandalkan bagi pelanggan dan mitra bisnis kami.",
    color: "text-green-400",
  },
  {
    icon: FaHandshake,
    title: "Kolaborasi",
    description:
      "Membangun hubungan yang kuat dengan pelanggan, mitra, dan komunitas.",
    color: "text-purple-400",
  },
  {
    icon: FaLeaf,
    title: "Keberlanjutan",
    description:
      "Mengelola bisnis secara ramah lingkungan dan bertanggung jawab.",
    color: "text-emerald-400",
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
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-medium mb-4">
            Tentang Kami
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Menghadirkan inovasi teknologi untuk Indonesia yang lebih maju
          </p>
        </div>
      </section>

      {/* Company Overview */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-md p-8 lg:p-12">
          <p className="text-primary-600 font-semibold text-sm uppercase tracking-widest mb-2">
            PT. MDN Industry Power Indonesia Corp
          </p>
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 mb-6">
            Perusahaan Teknologi Terdepan di Indonesia
          </h2>
          <p className="text-gray-600 leading-relaxed mb-4">
            PT. MDN Industry Power Indonesia Corp adalah perusahaan teknologi
            yang bergerak di bidang manufaktur dan distribusi perangkat
            elektronik, komputer, dan solusi industri.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Kami hadir untuk menyediakan produk berkualitas tinggi yang bisa
            diandalkan untuk kebutuhan bisnis dan anak muda di Indonesia.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 text-center mb-12">
            Visi dan Misi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-lg font-medium text-primary-600 mb-4">Visi</h3>
              <p className="text-gray-600 leading-relaxed">
                Menjadi perusahaan teknologi terdepan di Indonesia yang
                menghadirkan inovasi kelas dunia untuk mendorong industri
                nasional ke level yang lebih tinggi.
              </p>
            </div>
            <div className="bg-white rounded-xl shadow-md p-8">
              <h3 className="text-lg font-medium text-primary-600 mb-4">Misi</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  Mengedepankan prinsip keberlanjutan dalam setiap aspek bisnis.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  Mendorong pengembangan talenta muda di bidang teknologi.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  Menyediakan layanan purna jual yang profesional dan responsif.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  Memberikan solusi industri yang efisien dan andal.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary-500 mt-1">•</span>
                  Mengembangkan dan memproduksi perangkat elektronik berkualitas tinggi.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900">
            Nilai-Nilai Perusahaan
          </h2>
          <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
            Prinsip yang memandu setiap langkah kami dalam menghadirkan solusi
            terbaik
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {values.map((v) => (
            <div
              key={v.title}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <v.icon className={`text-3xl ${v.color} mb-4`} />
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                {v.title}
              </h3>
              <p className="text-gray-500 text-sm">{v.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl sm:text-3xl font-medium text-gray-900 text-center mb-12">
            Layanan Terbaik untuk Anda
          </h2>
          <p className="text-center text-gray-500 -mt-8 mb-12">
            Kami berkomitmen memberikan pengalaman terbaik kepada setiap
            pelanggan.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s) => (
              <div
                key={s.title}
                className="bg-white rounded-xl shadow-md p-8 text-center"
              >
                <s.icon className="text-4xl text-primary-600 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {s.title}
                </h3>
                <p className="text-gray-500 text-sm">{s.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate CTA */}
      <section className="bg-primary-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-2xl sm:text-3xl font-medium mb-4">
            Solusi Korporat untuk Bisnis Anda
          </h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">
            Dapatkan penawaran khusus untuk kebutuhan perangkat teknologi
            perusahaan Anda.
          </p>
          <Link
            href="/hubungi-kami"
            className="inline-flex items-center px-8 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition-colors shadow-lg"
          >
            Hubungi Kami untuk Penawaran Korporat
          </Link>
        </div>
      </section>
    </>
  );
}
