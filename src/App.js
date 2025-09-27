import React, { useState } from "react";
import ContactFormTest from './ContactFormTest.js';

// Componenta ContactForm cu Tailwind CSS
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle form submit
  const handleSubmit = async () => {
    // Validare simplă
    if (!formData.name || !formData.phone || !formData.email || !formData.message) {
      setStatus("Toate câmpurile sunt obligatorii!");
      return;
    }

    setIsSubmitting(true);
    
    // Simulare trimitere cu delay
    setTimeout(() => {
      console.log("Date trimise:", formData);
      setStatus("Mesaj trimis cu succes!");
      setIsSubmitting(false);
      
      // Reset form după 3 secunde
      setTimeout(() => {
        setFormData({ name: "", phone: "", email: "", message: "" });
        setStatus("");
      }, 3000);
    }, 1500);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Ia legătura cu noi
        </h2>
        <p className="text-gray-600">
          Completează formularul și îți vom răspunde în cel mai scurt timp
        </p>
      </div>
      
      <div className="space-y-6">
        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
            Nume complet
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none hover:border-gray-300"
            placeholder="Ion Popescu"
          />
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
            Număr de telefon
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none hover:border-gray-300"
            placeholder="0712 345 678"
          />
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
            Adresa de email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none hover:border-gray-300"
            placeholder="ion.popescu@email.com"
          />
        </div>

        <div className="group">
          <label className="block text-sm font-semibold text-gray-700 mb-2 transition-colors group-focus-within:text-blue-600">
            Mesajul tău
          </label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows="5"
            className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all duration-200 outline-none hover:border-gray-300 resize-none"
            placeholder="Scrie aici mesajul tău..."
          />
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:cursor-not-allowed disabled:transform-none"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Se trimite...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <span>Trimite mesajul</span>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </div>
          )}
        </button>
      </div>

      {status && (
        <div className={`mt-6 p-4 rounded-xl text-center font-medium transition-all duration-300 ${
          status.includes("succes") 
            ? "bg-green-50 text-green-800 border-2 border-green-200" 
            : "bg-red-50 text-red-800 border-2 border-red-200"
        }`}>
          <div className="flex items-center justify-center space-x-2">
            {status.includes("succes") ? (
              <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            )}
            <span>{status}</span>
          </div>
        </div>
      )}
    </div>
  );
};

// Componenta principală App
const App = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Background decorativ */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-6">
              Contact
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
              Avem cele mai bune soluții pentru tine. Completează formularul și să începem o colaborare de succes!
            </p>
          </div>
          
          <ContactForm />
          
          {/* Info cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Telefon</h3>
              <p className="text-gray-600">+40 712 345 678</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600">contact@exemplu.ro</p>
            </div>

            <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20 hover:bg-white/80 transition-all duration-300">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Locație</h3>
              <p className="text-gray-600">București, România</p>
            </div>
          </div>

          {/* Footer */}
          <footer className="text-center mt-16 py-8 border-t border-white/20">
            <p className="text-gray-500">
              &copy; 2024 Aplicația de contact. Toate drepturile rezervate.
            </p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
