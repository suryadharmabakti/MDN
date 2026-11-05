"use client";

import { useEffect, useState } from "react";

interface Props {
  endTime: string | null; // ISO string
}

function pad(n: number) {
  return String(n).padStart(2, "0");
}

export default function FlashSaleCountdown({ endTime }: Props) {
  const [timeLeft, setTimeLeft] = useState({ h: 0, m: 0, s: 0, expired: false });

  useEffect(() => {
    if (!endTime) {
      setTimeLeft({ h: 0, m: 0, s: 0, expired: true });
      return;
    }

    const calculate = () => {
      const now = Date.now();
      const end = new Date(endTime).getTime();
      const diff = Math.max(0, Math.floor((end - now) / 1000));

      if (diff <= 0) {
        setTimeLeft({ h: 0, m: 0, s: 0, expired: true });
        return;
      }

      const h = Math.floor(diff / 3600);
      const m = Math.floor((diff % 3600) / 60);
      const s = diff % 60;
      setTimeLeft({ h, m, s, expired: false });
    };

    calculate();
    const interval = setInterval(calculate, 1000);
    return () => clearInterval(interval);
  }, [endTime]);

  if (timeLeft.expired) {
    return (
      <span className="px-3 py-1 bg-white/30 text-white text-sm font-medium rounded-lg">
        Berakhir
      </span>
    );
  }

  return (
    <div className="flex gap-2 items-center">
      <div className="flex flex-col items-center">
        <span className="px-3 py-1 bg-white text-red-600 font-bold rounded-lg text-sm min-w-[36px] text-center">
          {pad(timeLeft.h)}
        </span>
        <span className="text-white/70 text-[9px] mt-0.5">JAM</span>
      </div>
      <span className="text-white font-bold text-lg">:</span>
      <div className="flex flex-col items-center">
        <span className="px-3 py-1 bg-white text-red-600 font-bold rounded-lg text-sm min-w-[36px] text-center">
          {pad(timeLeft.m)}
        </span>
        <span className="text-white/70 text-[9px] mt-0.5">MENIT</span>
      </div>
      <span className="text-white font-bold text-lg">:</span>
      <div className="flex flex-col items-center">
        <span className="px-3 py-1 bg-white text-red-600 font-bold rounded-lg text-sm min-w-[36px] text-center">
          {pad(timeLeft.s)}
        </span>
        <span className="text-white/70 text-[9px] mt-0.5">DETIK</span>
      </div>
    </div>
  );
}
