import { downloads } from "@/data";
import { FaDownload } from "react-icons/fa";

export default function DownloadPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-medium mb-4">
            Download Driver & Software
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Temukan driver dan perangkat lunak terbaru untuk produk MDN Anda di
            sini. Pastikan perangkat Anda selalu diperbarui untuk kinerja
            optimal.
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-4 bg-dark-900 text-white text-sm font-semibold">
            <div className="px-6 py-4">Kode</div>
            <div className="px-6 py-4">Nama</div>
            <div className="px-6 py-4">Deskripsi</div>
            <div className="px-6 py-4">Download</div>
          </div>

          {/* Table Rows */}
          {downloads.map((dl, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 sm:grid-cols-4 border-b border-gray-200 last:border-b-0 ${
                i % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <div className="px-6 py-4">
                <span className="sm:hidden font-semibold text-gray-500 text-xs uppercase">
                  Kode:{" "}
                </span>
                <span className="text-sm text-gray-700">{dl.kode}</span>
              </div>
              <div className="px-6 py-4">
                <span className="sm:hidden font-semibold text-gray-500 text-xs uppercase">
                  Nama:{" "}
                </span>
                <span className="text-sm text-gray-700">{dl.nama}</span>
              </div>
              <div className="px-6 py-4">
                <span className="sm:hidden font-semibold text-gray-500 text-xs uppercase">
                  Deskripsi:{" "}
                </span>
                <span className="text-sm text-gray-700">{dl.deskripsi}</span>
              </div>
              <div className="px-6 py-4">
                <a
                  href={dl.url}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <FaDownload /> Download
                </a>
              </div>
            </div>
          ))}

          {downloads.length === 0 && (
            <div className="px-6 py-12 text-center text-gray-500">
              Belum ada driver atau software yang tersedia.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
