const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

async function main() {
  // Hash the admin password
  const hashedPassword = await bcrypt.hash("Admin@MDN2024", 10);

  // Clear existing users
  await prisma.user.deleteMany({});

  // Create admin user
  await prisma.user.create({
    data: {
      email: "admin@mdn.tech",
      password: hashedPassword,
      name: "Super Admin",
      role: "admin",
    },
  });

  await prisma.laptop.deleteMany({});
  await prisma.laptop.createMany({
    data: [
      {
        serialNumber: "MDN-L5-0001",
        modelName: "Maknum Saber",
        productId: "l5",
        purchaseDate: new Date("2025-01-15"),
        warrantyMonths: 24,
        customerName: "Contoh Pelanggan",
      },
      {
        serialNumber: "MDN-L5-0002",
        modelName: "Maknum Saber",
        productId: "l5",
        purchaseDate: new Date("2024-06-01"),
        warrantyMonths: 24,
      },
      {
        serialNumber: "MDN-L4-1234",
        modelName: "Seri L4",
        productId: "l4",
        purchaseDate: new Date("2023-03-20"),
        warrantyMonths: 12,
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.log("Seed data inserted");
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

