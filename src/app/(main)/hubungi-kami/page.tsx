import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import styles from "../apple-v3-pages.module.css";

const channels = [
  {
    icon: FaWhatsapp,
    title: "WhatsApp",
    text: "Terhubung langsung untuk konsultasi yang lebih cepat.",
    label: "0821-2890-7619",
    href: "https://api.whatsapp.com/send/?phone=6282128907619&text&type=phone_number&app_absent=0",
    external: true,
  },
  {
    icon: FaEnvelope,
    title: "Email",
    text: "Kirim pertanyaan atau kebutuhan Anda kepada tim MDN.",
    label: "sales@mdntech.co.id",
    href: "mailto:sales@mdntech.co.id",
    external: false,
  },
];

export default function HubungiKamiPage() {
  return (
    <main className={`${styles.appleV3} apple-v2 ${styles.contactPage} page-contact`}>
      <section className={styles.contactHero}>
        <h1 className={styles.contactTitle}>Mari mulai percakapan.</h1>
        <p className={styles.contactLead}>Tim kami siap membantu kebutuhan perangkat dan solusi teknologi Anda.</p>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20 sm:px-6 lg:px-8 lg:pb-28">
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="grid gap-4">
            {channels.map((c) => (
              <a
                key={c.title}
                href={c.href}
                {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="group flex flex-col rounded-[28px] bg-[#f5f5f7] p-8 transition-colors hover:bg-[#eef0f4] lg:p-10"
              >
                <c.icon className="text-2xl text-primary-600" aria-hidden="true" />
                <h2 className="mt-6 text-2xl font-semibold tracking-tight text-gray-900">{c.title}</h2>
                <p className="mt-2 leading-relaxed text-gray-500">{c.text}</p>
                <span className="mt-6 inline-flex items-center gap-1.5 font-medium text-[#0071e3]">
                  {c.label}
                  <span className="text-lg leading-none transition-transform group-hover:translate-x-0.5">›</span>
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-col overflow-hidden rounded-[28px] bg-[#f5f5f7]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4896.365745857295!2d106.86554557585326!3d-6.174107993813293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f53c7c13a50d%3A0x325b1492c9f2bda5!2sJaxer%20Indonesia!5e0!3m2!1sen!2sid!4v1773204783227!5m2!1sen!2sid"
              title="Lokasi MDN"
              className="min-h-[320px] w-full flex-1 border-0"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="flex gap-4 p-8 lg:p-10">
              <FaMapMarkerAlt className="mt-1 shrink-0 text-xl text-primary-600" aria-hidden="true" />
              <div>
                <h2 className="text-lg font-semibold tracking-tight text-gray-900">Kantor kami</h2>
                <p className="mt-1 leading-relaxed text-gray-500">
                  Jl. Cempaka Putih Tengah XVII No.F33, Cemp. Putih Tim., Kec. Cemp. Putih, Jakarta Pusat, DKI Jakarta 10510
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
