"use client";

import { useState } from "react";
import { createProduct, deleteProduct, updateProduct } from "./actions";
import { Product } from "@prisma/client";
import {
  FaPlus, FaEdit, FaTrash,
  FaSave, FaTimes, FaBox,
  FaTags, FaInfoCircle, FaDesktop, FaSearch
} from "react-icons/fa";
import Image from "next/image";

// Utilitas untuk mengkompresi gambar di client secara native
const compressImage = async (file: File): Promise<File> => {
  return new Promise((resolve, reject) => {
    // Jika file sudah kecil, tidak perlu dikompres, langsung return (opsional)
    if (file.size < 800 * 1024 && file.type === "image/jpeg") {
      return resolve(file);
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new window.Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const MAX_WIDTH = 800; // Pengecilan ekstrim agar sangat kecil
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height && width > MAX_WIDTH) {
          height = Math.round((height * MAX_WIDTH) / width);
          width = MAX_WIDTH;
        } else if (height > MAX_HEIGHT) { // BUG FIX: Before it compared against MAX_WIDTH instead of MAX_HEIGHT
          width = Math.round((width * MAX_HEIGHT) / height);
          height = MAX_HEIGHT;
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name.replace(/\.[^/.]+$/, ".jpg"), {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }));
              } else {
                reject(new Error("Gagal membuat blob dari gambar"));
              }
            },
            "image/jpeg",
            0.6 // 60% Kualitas - menjamin ukuran < 500KB
          );
        } else {
          reject(new Error("Canvas context tidak tersedia"));
        }
      };
      img.onerror = () => reject(new Error("Gagal meload gambar untuk kompresi"));
    };
    reader.onerror = () => reject(new Error("Gagal membaca file gambar"));
  });
};

interface Props {
  initialProducts: Product[];
}

// Extended Product type to support extra fields not yet in Prisma schema
type ExtendedProduct = Product & { nomorSeri?: string };

export default function ProductManager({ initialProducts }: Props) {
  const [products, setProducts] = useState<ExtendedProduct[]>(initialProducts as ExtendedProduct[]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState<number | null>(null);
  const [editingProduct, setEditingProduct] = useState<(Partial<ExtendedProduct> & { images?: string[] }) | null>(null);
  const [formData, setFormData] = useState<Partial<ExtendedProduct> & { images?: string[] }>({});
  const [loading, setLoading] = useState(false);
  const [imagesList, setImagesList] = useState<{ url: string, file: File | null }[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = [
    "Laptop",
    "PC",
    "SmartPhone",
    "Aksesoris",
    "Lainnya",
  ];

  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      category: "Laptop",
      description: "",
      merk: "MDN Tech",
      tipe: "",
      prosesor: "",
      kapasitas: "",
      nomorSeri: "",
      sistemOperasi: "",
      berat: "",
      dimensi: "",
      masaGaransi: "2 Tahun",
      stok: "Tersedia",
      image: "",
      images: [],
      price: 0,
      oldPrice: 0,
      isFlashSale: false,
      isBestSeller: false,
      isNew: false,
      rating: 0,
      reviewCount: 0,
    });
    setImagesList([]);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData(product);
    const existingImages = (product as any).images && (product as any).images.length > 0 ? (product as any).images : (product.image ? [product.image] : []);
    setImagesList(existingImages.map((url: string) => ({ url, file: null })));
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;
    setIsDeleting(id);
    const result = await deleteProduct(id);
    if (result.success) {
      setProducts(products.filter((p) => p.id !== id));
    } else {
      alert(result.error);
    }
    setIsDeleting(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const dataToSend = {
      ...formData,
      id: editingProduct ? editingProduct.id : undefined,
    } as any;

    try {
      if (imagesList.length > 0) {
        const uploadedPaths: string[] = [];
        for (const item of imagesList) {
          if (item.file) {
            const fd = new FormData();
            fd.append("file", item.file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            let data: any = {};
            const isJson = res.headers.get("content-type")?.includes("application/json");

            if (isJson) {
              data = await res.json();
            } else {
              const text = await res.text();
              console.error("Non-JSON response from server:", text.substring(0, 200));
            }

            if (!res.ok) {
              throw new Error(data?.error || `Upload gagal (${res.status} ${res.statusText}). Cek batas ukuran upload server Anda.`);
            }
            uploadedPaths.push(data.path);
          } else {
            uploadedPaths.push(item.url);
          }
        }
        dataToSend.images = uploadedPaths;
        dataToSend.image = uploadedPaths[0]; // Set the main thumbnail
      } else {
        dataToSend.images = [];
        dataToSend.image = "";
      }
    } catch (err: any) {
      alert(err.message || "Upload gambar gagal");
      setLoading(false);
      return;
    }

    const result = editingProduct
      ? await updateProduct(dataToSend)
      : await createProduct(dataToSend);

    if (result.success && result.product) {
      if (editingProduct) {
        setProducts(products.map((p) => (p.id === result.product!.id ? result.product as Product : p)));
      } else {
        setProducts([result.product as Product, ...products]);
      }
      setIsModalOpen(false);
    } else {
      alert(result.error);
    }
    setLoading(false);
  };

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    if (imagesList.length + selectedFiles.length > 10) {
      alert("Maksimal 10 foto yang diperbolehkan");
      return;
    }

    const validFiles: File[] = [];
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];

    // Tampilkan loading state atau peringatan kompresi jika perlu
    let overSizeDetected = false;

    for (const f of selectedFiles) {
      if (!allowedTypes.includes(f.type)) {
        alert(`File "${f.name}" ditolak. Hanya diperbolehkan format PNG, JPG, dan WEBP.`);
        continue;
      }
      if (f.size > 10 * 1024 * 1024) { // 10MB Max Size Validation (Murni dari client)
        alert(`File "${f.name}" terlalu besar. Maksimal ukuran file adalah 10MB.`);
        continue;
      }
      if (f.size > 1024 * 1024) { // Tandai jika ada file yang lebih dari 1MB untuk dikompress (opsional indikatornya)
        overSizeDetected = true;
      }

      // Kompres secara otomatis semua gambar yang dipilih
      try {
        const compressedFile = await compressImage(f);
        validFiles.push(compressedFile);
      } catch (err: any) {
        alert(`Gagal memproses gambar ${f.name}: ` + (err.message || "Error saat kompresi"));
      }
    }

    const newItems = validFiles.map(f => ({ url: URL.createObjectURL(f), file: f }));
    setImagesList([...imagesList, ...newItems]);
    // Reset file input target value so the same file could be picked again if needed
    e.target.value = '';
  };

  const removeImage = (index: number) => {
    setImagesList(imagesList.filter((_, i) => i !== index));
  };

  const filteredProducts = products.filter((p) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      (p.tipe || "").toLowerCase().includes(q) ||
      (p.nomorSeri || "").toLowerCase().includes(q) ||
      (p.name || "").toLowerCase().includes(q) ||
      (p.merk || "").toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-medium text-gray-900 tracking-tight">Katalog Produk</h1>
          <p className="text-gray-500 mt-1">Manajemen data produk website MDN Tech</p>
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/api/products/template"
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors"
          >
            Download Template Excel
          </a>
          <label className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
            Import Excel
            <input
              type="file"
              accept=".xlsx"
              className="hidden"
              onChange={async (e) => {
                const f = e.target.files?.[0];
                if (!f) return;

                // Validate size for excel 10MB
                if (f.size > 10 * 1024 * 1024) {
                  alert("File Excel terlalu besar. Ukuran maksimal adalah 10MB.");
                  e.target.value = "";
                  return;
                }

                const fd = new FormData();
                fd.append("file", f);
                const res = await fetch("/api/products/import", { method: "POST", body: fd });
                let data: any = {};
                const isJson = res.headers.get("content-type")?.includes("application/json");
                if (isJson) {
                  data = await res.json();
                } else {
                  console.error("Non-JSON response (import):", await res.text().catch(() => ""));
                }

                if (!res.ok) {
                  alert(data?.error || `Import gagal (${res.status} ${res.statusText}). Cek file dan batas ukuran server.`);
                  return;
                }
                setProducts((prev) => [...data.products, ...prev]);
                alert(`Import berhasil: ${data.inserted} baris`);
                e.target.value = "";
              }}
            />
          </label>
          <button
            onClick={handleOpenAdd}
            className="bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-lg flex items-center space-x-2 font-medium shadow-md transform hover:scale-105 transition-all active:scale-95"
          >
            <FaPlus size={14} />
            <span>Tambah Produk Baru</span>
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
          <input
            type="text"
            placeholder="Cari No. Seri, nama produk, atau merk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-10 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <FaTimes size={12} />
            </button>
          )}
        </div>
        <p className="text-sm text-gray-400 whitespace-nowrap">
          {searchQuery
            ? <span><span className="font-medium text-gray-700">{filteredProducts.length}</span> dari {products.length} produk ditemukan</span>
            : <span><span className="font-medium text-gray-700">{products.length}</span> produk total</span>
          }
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Produk</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">No. Seri</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Kategori</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:table-cell">Spesifikasi</th>
              <th className="px-4 sm:px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:table-cell">Stok</th>
              <th className="px-4 sm:px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Aksi</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {products.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 sm:px-6 py-12 text-center text-gray-400">
                  <FaBox className="mx-auto text-4xl mb-4 opacity-20" />
                  <p className="text-sm">Belum ada data produk di database.</p>
                </td>
              </tr>
            ) : filteredProducts.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 sm:px-6 py-12 text-center text-gray-400">
                  <FaSearch className="mx-auto text-4xl mb-4 opacity-20" />
                  <p className="text-sm font-medium">Tidak ada produk dengan nomor seri &ldquo;{searchQuery}&rdquo;</p>
                  <button onClick={() => setSearchQuery("")} className="mt-3 text-xs text-primary-600 hover:underline">Hapus pencarian</button>
                </td>
              </tr>
            ) : (
              filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50/50 transition-colors group">
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {p.image ? (
                        <Image
                          src={p.image.startsWith("data:") || p.image.startsWith("/") ? p.image : `/${p.image}`}
                          alt={p.name}
                          width={48}
                          height={48}
                          className="h-12 w-12 rounded-lg object-cover ring-1 ring-gray-200"
                        />
                      ) : (
                        <div className="h-12 w-12 flex-shrink-0 bg-primary-50 rounded-lg flex items-center justify-center text-primary-600 group-hover:scale-110 transition-transform">
                          <FaDesktop size={20} />
                        </div>
                      )}
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{p.name}</div>
                        <div className="text-xs text-gray-500 truncate max-w-[200px]">{p.merk} - {p.tipe}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                    {p.nomorSeri ? (
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-mono font-medium tracking-wide ${searchQuery && p.nomorSeri.toLowerCase().includes(searchQuery.toLowerCase())
                        ? "bg-yellow-100 text-yellow-800 ring-1 ring-yellow-300"
                        : "bg-gray-100 text-gray-700"
                        }`}>
                        {p.nomorSeri}
                      </span>
                    ) : (
                      <span className="text-gray-300 text-xs">—</span>
                    )}
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <span className="px-2.5 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {p.category}
                    </span>
                  </td>
                  <td className="px-4 sm:px-6 py-4 hidden md:table-cell">
                    <div className="text-xs text-gray-600">
                      <p className="truncate max-w-[250px]"><span className="font-medium">Processor:</span> {p.prosesor || '-'}</p>
                      <p className="truncate max-w-[250px]"><span className="font-medium">OS:</span> {p.sistemOperasi || '-'}</p>
                    </div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap hidden sm:table-cell">
                    <div className="text-sm text-gray-700 font-medium">{p.stok || '0'}</div>
                  </td>
                  <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleOpenEdit(p)}
                        className="text-primary-600 hover:text-primary-900 bg-primary-50 p-2 rounded-full transition-colors"
                        title="Edit Produk"
                      >
                        <FaEdit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(p.id)}
                        disabled={isDeleting === p.id}
                        className="text-red-600 hover:text-red-900 bg-red-50 p-2 rounded-full transition-colors disabled:opacity-50"
                        title="Hapus Produk"
                      >
                        <FaTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-[95%] sm:max-w-2xl shadow-2xl transform transition-all animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-gray-100 flex justify-between items-center shrink-0">
              <h3 className="text-xl font-medium text-gray-900 flex items-center space-x-2">
                {editingProduct ? <FaEdit className="text-primary-600" /> : <FaPlus className="text-primary-600" />}
                <span>{editingProduct ? "Edit Produk" : "Tambah Produk"}</span>
              </h3>
              <button type="button" onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600 transition-colors">
                <FaTimes size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-widest flex items-center space-x-1">
                    <FaInfoCircle /> <span>Informasi Dasar</span>
                  </h4>
                  <div>
                    <label title="nama" className="block text-sm font-semibold text-gray-700 mb-1">Nama Produk *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                      value={formData.name || ""}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Contoh: Maknum Saber Pro"
                    />
                  </div>
                  <div className="col-span-1 md:col-span-2">
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Gambar Produk ({imagesList.length}/10)
                    </label>
                    {imagesList.length > 0 ? (
                      <div className="mb-3 flex flex-wrap gap-3">
                        {imagesList.map((p, i) => (
                          <div key={i} className="relative group w-24 h-24 rounded-lg overflow-hidden ring-1 ring-gray-200">
                            <Image
                              src={p.url.startsWith("data:") || p.url.startsWith("blob:") || p.url.startsWith("/") ? p.url : `/${p.url}`}
                              alt={`Preview ${i + 1}`}
                              fill
                              className="object-cover"
                            />
                            {/* Number badge */}
                            <span className="absolute top-1 right-1 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-sm z-10">
                              {i + 1}
                            </span>
                            {/* Remove button */}
                            <button
                              type="button"
                              title="Hapus gambar"
                              onClick={() => removeImage(i)}
                              className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            >
                              <FaTimes className="text-white text-xl drop-shadow-md" />
                            </button>
                          </div>
                        ))}
                      </div>
                    ) : null}
                    {imagesList.length < 10 && (
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={onFileChange}
                        className="block w-full text-sm text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                      />
                    )}
                    <p className="text-xs text-gray-400 mt-2">Maksimal 10MB per file. Format PNG, JPG, dan WEBP diperbolehkan.</p>
                  </div>
                  <div>
                    <label title="kategori" className="block text-sm font-semibold text-gray-700 mb-1">Kategori *</label>
                    <select
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 focus:bg-white transition-all outline-none"
                      value={formData.category || ""}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label title="merk" className="block text-sm font-semibold text-gray-700 mb-1">Merk</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      value={formData.merk || ""}
                      onChange={(e) => setFormData({ ...formData, merk: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Nomor Seri</label>
                    <input
                      type="text"
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none font-mono"
                      value={formData.nomorSeri || ""}
                      onChange={(e) => setFormData({ ...formData, nomorSeri: e.target.value })}
                      placeholder="Contoh: MDN-L5-PRO-001"
                    />
                  </div>
                  <div>
                    <label title="deskripsi" className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi Singkat</label>
                    <textarea
                      className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none h-24 resize-none"
                      value={formData.description || ""}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Harga (Rp)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        value={formData.price || 0}
                        onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">Harga Coret (Rp)</label>
                      <input
                        type="number"
                        className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        value={formData.oldPrice || 0}
                        onChange={(e) => setFormData({ ...formData, oldPrice: parseFloat(e.target.value) || 0 })}
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isFlashSale || false}
                        onChange={(e) => setFormData({ ...formData, isFlashSale: e.target.checked })}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">Flash Sale</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isBestSeller || false}
                        onChange={(e) => setFormData({ ...formData, isBestSeller: e.target.checked })}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">Best Seller</span>
                    </label>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.isNew || false}
                        onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                        className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-semibold text-gray-700">Produk Baru</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-medium text-gray-400 uppercase tracking-widest flex items-center space-x-1">
                    <FaTags /> <span>Spesifikasi Teknikal</span>
                  </h4>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label title="tipe" className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Tipe</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 text-sm outline-none"
                        value={formData.tipe || ""}
                        onChange={(e) => setFormData({ ...formData, tipe: e.target.value })}
                      />
                    </div>
                    <div>
                      <label title="stok" className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Stok</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 text-sm outline-none"
                        value={formData.stok || ""}
                        onChange={(e) => setFormData({ ...formData, stok: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label title="prosesor" className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Prosesor</label>
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 text-sm outline-none"
                      value={formData.prosesor || ""}
                      onChange={(e) => setFormData({ ...formData, prosesor: e.target.value })}
                    />
                  </div>
                  <div>
                    <label title="kapasitas" className="block text-xs font-semibold text-gray-500 mb-1 uppercase">RAM / Kapasitas</label>
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 text-sm outline-none"
                      value={formData.kapasitas || ""}
                      onChange={(e) => setFormData({ ...formData, kapasitas: e.target.value })}
                    />
                  </div>
                  <div>
                    <label title="os" className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Sistem Operasi</label>
                    <input
                      type="text"
                      className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 text-sm outline-none"
                      value={formData.sistemOperasi || ""}
                      onChange={(e) => setFormData({ ...formData, sistemOperasi: e.target.value })}
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label title="garansi" className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Masa Garansi</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 text-sm outline-none"
                        value={formData.masaGaransi || ""}
                        onChange={(e) => setFormData({ ...formData, masaGaransi: e.target.value })}
                      />
                    </div>
                    <div>
                      <label title="berat" className="block text-xs font-semibold text-gray-500 mb-1 uppercase">Berat</label>
                      <input
                        type="text"
                        className="w-full px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md focus:ring-2 focus:ring-primary-500 text-sm outline-none"
                        value={formData.berat || ""}
                        onChange={(e) => setFormData({ ...formData, berat: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-10 flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-2.5 text-sm font-medium text-gray-500 hover:text-gray-800 transition-colors"
                >
                  Batalkan
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-8 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-medium rounded-lg shadow-lg hover:shadow-primary-500/20 flex items-center space-x-2 transition-all active:scale-95 disabled:opacity-50"
                >
                  {loading ? (
                    <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                  ) : (
                    <><FaSave /> <span>Simpan Perangkat</span></>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
