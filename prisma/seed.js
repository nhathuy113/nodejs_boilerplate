const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();

  try {
    const products = [
      { id: "11111111-1111-1111-1111-111111111111", name: "Seed Product A" },
      { id: "22222222-2222-2222-2222-222222222222", name: "Seed Product B" }
    ];

    for (const p of products) {
      await prisma.product.upsert({
        where: { id: p.id },
        update: { name: p.name },
        create: p
      });
    }

    const all = await prisma.product.findMany({ orderBy: { createdAt: "desc" }, take: 10 });
    // eslint-disable-next-line no-console
    console.log(all.map((x) => ({ id: x.id, name: x.name })));
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  // eslint-disable-next-line no-console
  console.error(e);
  process.exit(1);
});



