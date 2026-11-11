"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const credits = [
  { name: "M. Abu Bakar Ashidiq", href: "https://github.com/ahmadasshidiq", via: "GitHub" },
  { name: "Famadha Nugraha Setyajati", href: "https://www.linkedin.com/in/famadha-nugraha-setyajati-42aaa6287", via: "LinkedIn" },
  { name: "Surya Dharma Bakti RM", href: "https://github.com/suryadharmabakti", via: "GitHub" },
];

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

  useEffect(() => {
    if (!showCredits) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setShowCredits(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [showCredits]);

  return (
    <div className="flex shrink-0 items-center self-start md:self-auto">
      <button
        onClick={handleLogoClick}
        className="flex cursor-pointer items-center border-none bg-transparent p-0 focus:outline-none"
      >
        <Image
          src="/uploads/mdn-logo.png"
          alt="MDN Logo"
          width={40}
          height={40}
          className="h-8 w-8 object-contain opacity-80 transition-opacity hover:opacity-100"
        />
      </button>

      {showCredits && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm text-left"
          onClick={() => setShowCredits(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="credits-title"
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-sm rounded-3xl bg-white px-8 pt-10 pb-8 shadow-[0_24px_60px_rgba(0,0,0,0.18)]"
          >
            <button
              onClick={() => setShowCredits(false)}
              aria-label="Tutup"
              className="absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
                <path d="M1 1l12 12M13 1L1 13" />
              </svg>
            </button>

            <p className="text-center text-[11px] font-medium uppercase tracking-[0.2em] text-gray-400">
              Created By
            </p>
            <h3 id="credits-title" className="mt-2 text-center text-xl font-semibold tracking-tight text-gray-900">
              Development Team
            </h3>

            <ul className="mt-7 divide-y divide-gray-100 border-y border-gray-100">
              {credits.map((c) => (
                <li key={c.name}>
                  <a
                    href={c.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-4 transition-colors"
                  >
                    <span className="text-[15px] font-medium text-gray-800 group-hover:text-gray-950">{c.name}</span>
                    <span className="flex items-center gap-1 text-xs text-gray-400 transition-colors group-hover:text-primary-600">
                      {c.via}
                      <span className="transition-transform group-hover:translate-x-0.5">→</span>
                    </span>
                  </a>
                </li>
              ))}
            </ul>

            <p className="mt-6 text-center text-xs text-gray-400">
              PT. MDN Industry Power Indonesia Corp
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
