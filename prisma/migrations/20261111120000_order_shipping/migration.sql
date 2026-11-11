-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "destinationId" INTEGER,
ADD COLUMN     "shippingCost" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "shippingCourier" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "shippingEtd" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "shippingService" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "totalWeight" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "trackingNumber" TEXT;

