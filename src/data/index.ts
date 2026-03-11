export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: {
    merk: string;
    tipe: string;
    prosesor: string;
    kapasitas: string;
    sistemOperasi: string;
    berat: string;
    dimensi: string;
    masaGaransi: string;
    stok: string;
  };
}

export interface Download {
  kode: string;
  nama: string;
  deskripsi: string;
  url: string;
}

export const products: Product[] = [
  {
    id: "l5",
    name: "Maknum Saber",
    category: "Laptop",
    description: "Laptop performa tinggi dengan desain modern untuk kebutuhan profesional dan gaming.",
    image: "/images/laptop-placeholder.png",
    specs: {
      merk: "MDN Tech",
      tipe: "Maknum Saber",
      prosesor: "Intel Core i7-13700H",
      kapasitas: "16GB RAM / 512GB SSD",
      sistemOperasi: "Windows 11 Home",
      berat: "1.8 Kg",
      dimensi: "35.6 x 25.4 x 1.8 cm",
      masaGaransi: "2 Tahun",
      stok: "Tersedia (25)",
    },
  },
  {
    id: "a1",
    name: "Aliquam provident p",
    category: "Aksesoris",
    description: "Enim saepe incididun. Maxime molestiae atq.",
    image: "/images/accessory-placeholder.png",
    specs: {
      merk: "Perspiciatis dignis",
      tipe: "-",
      prosesor: "Culpa in amet beat",
      kapasitas: "Quo exercitationem e",
      sistemOperasi: "Consectetur quia co",
      berat: "Tenetur ea sit opti",
      dimensi: "Consectetur quasi au",
      masaGaransi: "-",
      stok: "Tersedia (53)",
    },
  },
  {
    id: "a2",
    name: "Aliquam provident p",
    category: "Aksesoris",
    description: "Enim saepe incididun. Maxime molestiae atq.",
    image: "/images/accessory-placeholder.png",
    specs: {
      merk: "Perspiciatis dignis",
      tipe: "-",
      prosesor: "Culpa in amet beat",
      kapasitas: "Quo exercitationem e",
      sistemOperasi: "Consectetur quia co",
      berat: "Tenetur ea sit opti",
      dimensi: "Consectetur quasi au",
      masaGaransi: "-",
      stok: "Tersedia (53)",
    },
  },
];

export const downloads: Download[] = [
  {
    kode: "mdn",
    nama: "driver mdn",
    deskripsi: "mdn indonesia",
    url: "#",
  },
];

export const categories = [
  "Semua Produk",
  "Laptop",
  "PC",
  "Aksesoris",
  "Lainnya",
];
