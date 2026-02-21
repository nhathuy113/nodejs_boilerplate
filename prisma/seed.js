const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();

  try {
    const products = [
      {
        id: "11111111-1111-1111-1111-111111111111",
        name: "Seed Product A",
        variants: [
          { id: "aaaa1111-0001-0001-0001-000000000001", sku: "SPA-SM", price: 150000, stock: 25 },
          { id: "aaaa1111-0001-0001-0001-000000000002", sku: "SPA-LG", price: 250000, stock: 10 },
        ],
      },
      {
        id: "22222222-2222-2222-2222-222222222222",
        name: "Seed Product B",
        variants: [
          { id: "bbbb2222-0001-0001-0001-000000000001", sku: "SPB-DEFAULT", price: 99000, stock: 50 },
        ],
      },
    ];

    for (const p of products) {
      await prisma.product.upsert({
        where: { id: p.id },
        update: { name: p.name },
        create: { id: p.id, name: p.name },
      });

      for (const v of p.variants) {
        await prisma.variant.upsert({
          where: { id: v.id },
          update: { sku: v.sku, price: v.price, stock: v.stock },
          create: { ...v, productId: p.id },
        });
      }
    }

    const all = await prisma.product.findMany({
      include: { variants: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    });
    // eslint-disable-next-line no-console
    console.log(JSON.stringify(all, null, 2));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});
