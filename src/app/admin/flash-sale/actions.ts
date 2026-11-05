"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function updateFlashSaleSettings(data: {
  productIds: number[];
  endTime: string | null;
}) {
  try {
    // 1. Turn off semua flash sale yang ada
    await prisma.product.updateMany({
      where: { isFlashSale: true },
      data: { isFlashSale: false, flashSaleEndTime: null },
    });

    // 2. Set produk yang dipilih jadi flash sale
    if (data.productIds.length > 0) {
      const endTimeDate = data.endTime ? new Date(data.endTime) : null;
      await prisma.product.updateMany({
        where: { id: { in: data.productIds } },
        data: {
          isFlashSale: true,
          flashSaleEndTime: endTimeDate,
        },
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/flash-sale");
    revalidatePath("/produk");
    return { success: true };
  } catch (error: any) {
    console.error("Flash sale update error:", error);
    return { success: false, error: error.message || "Gagal memperbarui flash sale" };
  }
}
