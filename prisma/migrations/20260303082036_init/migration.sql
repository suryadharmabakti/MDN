-- CreateTable
CREATE TABLE "Laptop" (
    "id" SERIAL NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "modelName" TEXT NOT NULL,
    "productId" TEXT,
    "purchaseDate" TIMESTAMP(3),
    "warrantyMonths" INTEGER NOT NULL DEFAULT 24,
    "customerName" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Laptop_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "image" TEXT NOT NULL DEFAULT '',
    "merk" TEXT NOT NULL DEFAULT '',
    "tipe" TEXT NOT NULL DEFAULT '',
    "prosesor" TEXT NOT NULL DEFAULT '',
    "kapasitas" TEXT NOT NULL DEFAULT '',
    "sistemOperasi" TEXT NOT NULL DEFAULT '',
    "berat" TEXT NOT NULL DEFAULT '',
    "dimensi" TEXT NOT NULL DEFAULT '',
    "masaGaransi" TEXT NOT NULL DEFAULT '',
    "stok" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'admin',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Laptop_serialNumber_key" ON "Laptop"("serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
