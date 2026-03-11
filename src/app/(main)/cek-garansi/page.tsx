"use client";

import { useState } from "react";
import Link from "next/link";
import { FaLaptop, FaMapMarkerAlt, FaQuestionCircle, FaShieldAlt } from "react-icons/fa";

export default function CheckWarrantyPage() {
    const [sn, setSn] = useState("");
    const [country, setCountry] = useState("Indonesia");
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [hasSearched, setHasSearched] = useState(false);

    const onSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!sn) return;
        setLoading(true);
        setResult(null);
        setHasSearched(true);

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
        <div className="min-h-screen bg-gray-50 flex flex-col items-center py-16 px-4 sm:px-6 lg:px-8">
            {/* Header Symbol */}
            <div className="mb-8">
                <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <FaShieldAlt className="text-4xl text-primary-600" />
                </div>
            </div>

            <div className="text-center mb-10 max-w-2xl mx-auto">
                <h1 className="text-4xl md:text-4xl font-bold text-gray-900 tracking-tight mb-4">
                    Check Warranty Status
                </h1>
                <p className="text-lg text-gray-500">
                    Verify your MDN Technology device warranty status and coverage details by entering your serial number below.
                </p>
            </div>

            <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 p-8 md:p-10">
                <form onSubmit={onSearch} className="space-y-6">

                    {/* Country Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">
                            Country/Region of purchase
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaMapMarkerAlt className="text-gray-400" />
                            </div>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="block w-full pl-11 pr-10 py-4 text-base border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rounded-xl transition-colors appearance-none cursor-pointer"
                            >
                                <option value="Indonesia">Indonesia</option>
                                <option value="Malaysia">Malaysia</option>
                                <option value="Singapore">Singapore</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>

                    {/* Serial Number Field */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700 flex justify-between items-center">
                            <span>Serial Number</span>
                            <button type="button" className="text-primary-600 hover:text-primary-700 text-xs flex items-center gap-1 font-semibold group">
                                <FaQuestionCircle className="text-gray-400 group-hover:text-primary-600 transition-colors" />
                                Find my serial number
                            </button>
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <FaLaptop className="text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={sn}
                                onChange={(e) => setSn(e.target.value)}
                                placeholder="e.g. MDN-XYZ-123456"
                                className="block w-full pl-11 pr-4 py-4 text-base border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 rounded-xl transition-colors placeholder-gray-400 uppercase"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading || !sn}
                        className={`w-full flex justify-center py-4 px-4 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white ${loading || !sn
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-primary-600 hover:bg-primary-700 shadow-primary-500/30 hover:shadow-lg transition-all"
                            }`}
                    >
                        {loading ? "Checking Database..." : "Check Warranty"}
                    </button>
                </form>

                {/* Results Area */}
                {hasSearched && (
                    <div className={`mt-8 p-6 rounded-2xl border ${loading ? "hidden" :
                            result?.ok ? "bg-green-50/50 border-green-100" : "bg-red-50/50 border-red-100"
                        }`}>
                        {result?.ok ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center shrink-0">
                                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-medium text-gray-900">Device Found</h3>
                                        <p className="text-sm text-gray-500 font-mono">{result.data.serialNumber}</p>
                                    </div>
                                </div>

                                <div className="bg-white rounded-xl p-4 border border-green-100 space-y-3 shadow-sm">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                        <span className="text-gray-500 text-sm">Product Model</span>
                                        <span className="font-medium text-gray-900 text-right">{result.data.modelName || "MDN Device"}</span>
                                    </div>

                                    {result.data.warrantyUntil && (
                                        <>
                                            <div className="flex justify-between items-center py-2 border-b border-gray-50">
                                                <span className="text-gray-500 text-sm">Warranty Expiration</span>
                                                <span className="font-medium text-gray-900">
                                                    {new Date(result.data.warrantyUntil).toLocaleDateString("id-ID", {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </span>
                                            </div>
                                            <div className="flex justify-between items-center py-2">
                                                <span className="text-gray-500 text-sm">Status</span>
                                                {result.data.warrantyValid ? (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-green-100 text-green-800">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 bg-red-100 text-red-800">
                                                        Expired
                                                    </span>
                                                )}
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        ) : (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 text-center py-4">
                                <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-3">
                                    <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 mb-1">Device Not Found</h3>
                                <p className="text-sm text-gray-600">
                                    {result?.error || result?.message || "We couldn't find a device with that serial number. Please check the number and try again."}
                                </p>
                                <div className="mt-4 pt-4 border-t border-red-100">
                                    <p className="text-xs text-gray-500">Need help? <Link href="/hubungi-kami" className="text-primary-600 font-medium hover:underline">Contact Support</Link></p>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Help section beneath form */}
            <div className="mt-12 text-center text-sm text-gray-500">
                <p>Multiple products to check? <a href="#" className="text-primary-600 font-medium hover:underline">Sign in to your account</a></p>
            </div>
        </div>
    );
}
