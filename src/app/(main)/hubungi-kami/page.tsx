import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from "react-icons/fa";

export default function HubungiKamiPage() {
  return (
    <>
      {/* Header */}
      <section className="bg-gradient-to-br from-dark-900 via-dark-800 to-primary-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-medium mb-4">
            Hubungi Kami
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Kami siap membantu Anda. Hubungi kami melalui salah satu kanal di bawah ini.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Email */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaEnvelope className="text-2xl text-primary-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              Hubungi kami melalui email
            </h3>
            <a
              href="mailto:sales@mdntech.co.id"
              className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
            >
              sales@mdntech.co.id
            </a>
          </div>

          {/* WhatsApp */}
          <div className="bg-white rounded-xl shadow-md p-8 text-center hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaWhatsapp className="text-2xl text-green-600" />
            </div>
            <h3 className="font-medium text-gray-900 mb-2">
              Hubungi kami melalui WhatsApp
            </h3>
            <a
              href="https://api.whatsapp.com/send/?phone=6282128907619&text&type=phone_number&app_absent=0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 hover:text-green-700 font-medium transition-colors"
            >
              0821-2890-7619
            </a>
          </div>

          {/* Service Center */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow h-full min-h-[300px]">
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
    </>
  );
}
