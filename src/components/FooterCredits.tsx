"use client";

import { useState } from "react";
import Image from "next/image";

export default function FooterCredits() {
  const [showCredits, setShowCredits] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const handleLogoClick = () => {
    const newCount = clickCount + 1;
    if (newCount >= 3) {
      setShowCredits(true);
      setClickCount(0);
    } else {
      setClickCount(newCount);
    }
  };

  return (
    <div className="mt-4 flex flex-col items-center justify-center">
      <button 
        onClick={handleLogoClick}
        className="cursor-pointer border-none bg-transparent p-0 flex flex-col items-center justify-center focus:outline-none"
      >
        <Image
          src="/uploads/mdn-logo.png"
          alt="MDN Logo"
          width={40}
          height={40}
          className="h-10 w-10 object-contain hover:opacity-80 transition-opacity"
        />
      </button>

      {showCredits && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm transition-opacity text-left">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 max-w-md w-full shadow-2xl relative animate-in fade-in zoom-in duration-300">
            {/* Content */}
            <div className="text-center">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400">
                Website By
              </h3>

              <div className="flex flex-col gap-3 font-semibold text-[15px] text-gray-700 dark:text-gray-200">
                <a href="https://github.com/ahmadasshidiq" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 hover:scale-[1.03] transition-transform duration-300">
                  <span className="bg-gradient-to-r from-blue-500 to-cyan-500 w-2 h-2 rounded-full inline-block mr-3"></span>
                  M. Abu Bakar Ashidiq
                </a>
                <a href="https://www.linkedin.com/in/famadha-nugraha-setyajati-42aaa6287" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 hover:scale-[1.03] transition-transform duration-300">
                  <span className="bg-gradient-to-r from-indigo-500 to-purple-500 w-2 h-2 rounded-full inline-block mr-3"></span>
                  Famadha Nugraha Setyajati
                </a>
                <a href="https://github.com/suryadharmabakti" target="_blank" rel="noopener noreferrer" className="block px-4 py-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-gray-100 dark:border-gray-600 hover:scale-[1.03] transition-transform duration-300">
                  <span className="bg-gradient-to-r from-orange-500 to-rose-500 w-2 h-2 rounded-full inline-block mr-3"></span>
                  Surya Dharma Bakti RM
                </a>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={() => setShowCredits(false)}
                className="px-8 py-2.5 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium transition-all duration-300 active:scale-95 text-sm"
              >
                Tutup
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
