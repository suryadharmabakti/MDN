export interface ProductWithMeta {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  merk: string;
  tipe: string;
  prosesor: string;
  kapasitas: string;
  sistemOperasi: string;
  berat: string;
  dimensi: string;
  masaGaransi: string;
  stok: string;
  createdAt: Date;
  updatedAt: Date;
  price?: number;
  oldPrice?: number;
  isFlashSale?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  rating?: number;
  reviewCount?: number;
}
