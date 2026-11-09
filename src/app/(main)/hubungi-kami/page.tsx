import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";
import styles from "../apple-v3-pages.module.css";

export default function HubungiKamiPage() {
  return (
    <main className={`${styles.appleV3} apple-v2 ${styles.contactPage} page-contact`}>
      <section className={styles.contactHero}>
        <h1 className={styles.contactTitle}>Mari mulai percakapan.</h1>
        <p className={styles.contactLead}>Tim kami siap membantu kebutuhan perangkat dan solusi teknologi Anda.</p>
      </section>

      <section className={styles.contactContent}>
        <div className={styles.contactGrid}>
          <div className={styles.contactChannels}>
            <article className={styles.channelCard}>
              <div className={styles.channelIcon}><FaEnvelope /></div>
              <h2>Email</h2>
              <p>Kirim pertanyaan atau kebutuhan Anda kepada tim MDN.</p>
              <a href="mailto:sales@mdntech.co.id" className={styles.channelLink}>sales@mdntech.co.id</a>
            </article>
            <article className={styles.channelCard}>
              <div className={`${styles.channelIcon} ${styles.channelIconWhatsApp}`}><FaWhatsapp /></div>
              <h2>WhatsApp</h2>
              <p>Terhubung langsung untuk konsultasi yang lebih cepat.</p>
              <a href="https://api.whatsapp.com/send/?phone=6282128907619&text&type=phone_number&app_absent=0" target="_blank" rel="noopener noreferrer" className={styles.channelLink}>0821-2890-7619</a>
            </article>
          </div>
          <div className={styles.mapCard}>
            <div className={styles.mapLabel}><FaMapMarkerAlt className="inline mr-2" />Lokasi kami</div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4896.365745857295!2d106.86554557585326!3d-6.174107993813293!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f53c7c13a50d%3A0x325b1492c9f2bda5!2sJaxer%20Indonesia!5e1!3m2!1sen!2sid!4v1773204783227!5m2!1sen!2sid"
              className="w-full h-full border-0 min-h-[300px]"
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </section>
    </main>
  );
}
