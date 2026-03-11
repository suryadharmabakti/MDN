"use client";

import { useState } from "react";

export default function SerialSearch() {
  const [sn, setSn] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const onSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!sn) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`/api/serial?sn=${encodeURIComponent(sn)}`);
      const data = await res.json();
      setResult({ ok: res.ok, ...data });
    } catch (err) {
      setResult({ ok: false, error: "Gagal menghubungi server" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-3">
        <h3 className="text-sm font-black uppercase tracking-[0.3em] text-primary-300">Serial Number</h3>
        <p className="text-xs text-gray-300">Masukkan serial untuk cek garansi perangkat</p>
      </div>
      <form onSubmit={onSearch} className="mb-6">
        <div className="flex gap-2 items-stretch bg-white rounded-lg overflow-hidden shadow-lg max-w-xl">
          <input
            type="text"
            value={sn}
            onChange={(e) => setSn(e.target.value)}
            placeholder="Cek garansi, masukan serial number"
            className="flex-1 px-4 py-3 text-gray-900 outline-none"
          />
          <button
            type="submit"
            className="px-5 bg-primary-600 hover:bg-primary-700 text-white font-semibold whitespace-nowrap"
            disabled={loading}
          >
            {loading ? "Mencari..." : "Search"}
          </button>
        </div>
      </form>
      {result && (
        <div
          className={`max-w-xl p-4 rounded-lg mb-4 animate-in fade-in slide-in-from-top-2 duration-300 ${
            result.ok ? "bg-green-50 text-green-800 border border-green-200" : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {result.ok ? (
            <div>
              <p className="font-medium mb-1">Serial ditemukan: {result.data.serialNumber}</p>
              <div className="text-sm space-y-0.5">
                <p>Model: {result.data.modelName}</p>
                {result.data.warrantyUntil && (
                  <p>
                    Garansi berlaku hingga:{" "}
                    <span className="font-medium">
                      {new Date(result.data.warrantyUntil).toLocaleDateString("id-ID")}
                    </span>
                    {" "}({result.data.warrantyValid ? (
                      <span className="text-green-600 font-medium">MASIH BERLAKU</span>
                    ) : (
                      <span className="text-red-600 font-medium">KADALUARSA</span>
                    )})
                  </p>
                )}
              </div>
            </div>
          ) : (
            <p className="font-medium">{result.error || result.message || "Serial number tidak ditemukan"}</p>
          )}
        </div>
      )}
    </div>
  );
}
