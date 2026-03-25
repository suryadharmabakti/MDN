"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const ProductSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nama produk wajib diisi"),
  category: z.string().min(1, "Kategori wajib diisi"),
  description: z.string().default(""),
  merk: z.string().default(""),
  tipe: z.string().default(""),
  prosesor: z.string().default(""),
  kapasitas: z.string().default(""),
  sistemOperasi: z.string().default(""),
  berat: z.string().default(""),
  dimensi: z.string().default(""),
  masaGaransi: z.string().default(""),
  stok: z.string().default(""),
  image: z.string().default(""),
  images: z.array(z.string()).default([]),
  price: z.number().default(0),
  oldPrice: z.number().default(0),
  isFlashSale: z.boolean().default(false),
  isBestSeller: z.boolean().default(false),
  isNew: z.boolean().default(false),
  rating: z.number().default(0),
  reviewCount: z.number().default(0),
});

export async function createProduct(data: z.infer<typeof ProductSchema>) {
  try {
    const validated = ProductSchema.parse(data);
    
    // Explicitly remove ID for new products to avoid Prisma issues
    const { id, ...productData } = validated;
    
    console.log("Creating product with data:", productData);
    
    const product = await prisma.product.create({
      data: productData,
    });
    
    console.log("Product created successfully:", product.id);
    
    revalidatePath("/admin");
    revalidatePath("/produk");
    revalidatePath("/");
    return { success: true, product };
  } catch (error: any) {
    console.error("Create product error detailed:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Gagal membuat produk" 
    };
  }
}

export async function updateProduct(data: z.infer<typeof ProductSchema>) {
  try {
    const validated = ProductSchema.parse(data);
    if (!validated.id) return { success: false, error: "ID produk tidak ada" };

    console.log(`Updating product ${validated.id} with data:`, validated);

    const product = await prisma.product.update({
      where: { id: validated.id },
      data: validated,
    });
    
    console.log("Product updated successfully");
    
    revalidatePath("/admin");
    revalidatePath("/produk");
    revalidatePath("/");
    return { success: true, product };
  } catch (error: any) {
    console.error("Update product error detailed:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Gagal memperbarui produk" 
    };
  }
}

export async function deleteProduct(id: number) {
  try {
    await prisma.product.delete({
      where: { id },
    });
    revalidatePath("/admin");
    revalidatePath("/produk");
    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    console.error("Delete product error detailed:", error);
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Gagal menghapus produk" 
    };
  }
}
