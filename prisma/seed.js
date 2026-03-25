const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const bcrypt = require("bcryptjs");

async function main() {
  // Hash the admin password
  const hashedPassword = await bcrypt.hash("Admin@MDN2024", 10);

  // Use upsert to create or update the admin user
  await prisma.user.upsert({
    where: { email: "admin@mdn.tech" },
    update: {
      password: hashedPassword,
      name: "Super Admin",
      role: "admin",
    },
    create: {
      email: "admin@mdn.tech",
      password: hashedPassword,
      name: "Super Admin",
      role: "admin",
    },
  });

  // Example laptops
  const laptops = [
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
  ];

  for (const laptop of laptops) {
    await prisma.laptop.upsert({
      where: { serialNumber: laptop.serialNumber },
      update: laptop,
      create: laptop,
    });
  }
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

