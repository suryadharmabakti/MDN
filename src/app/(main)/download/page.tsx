import { downloads } from "@/data";
import { FaDownload } from "react-icons/fa";

export default function DownloadPage() {
  return (
    <div className="bg-white">
      {/* Header */}
      <section className="bg-gradient-to-b from-[#f5f9ff] to-white px-4 pt-20 pb-14 sm:pt-28 sm:pb-16 text-center">
        <h1 className="mx-auto max-w-3xl text-4xl font-semibold tracking-[-0.045em] text-ink sm:text-6xl">
          Driver &amp; software.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-ink-secondary">
          Temukan driver dan perangkat lunak terbaru untuk produk MDN Anda.
          Pastikan perangkat selalu diperbarui untuk kinerja optimal.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="bg-white rounded-3xl border border-gray-200 shadow-[0_12px_28px_rgba(0,0,0,0.045)] overflow-hidden">
          {/* Table Header */}
          <div className="hidden sm:grid grid-cols-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wider text-gray-500">
            <div className="px-6 py-4">Kode</div>
            <div className="px-6 py-4">Nama</div>
            <div className="px-6 py-4">Deskripsi</div>
            <div className="px-6 py-4">Download</div>
          </div>

          {/* Table Rows */}
          {downloads.map((dl, i) => (
            <div
              key={i}
              className={`grid grid-cols-1 sm:grid-cols-4 border-b border-gray-200 last:border-b-0 `}
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
              <div className="px-6 py-4 flex items-center">
                <a
                  href={dl.url}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-full transition-colors"
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
    </div>
  );
}
