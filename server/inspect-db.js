import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
    const classes = await prisma.class.findMany();
    console.log("Classes:", classes);
    const users = await prisma.user.findMany({ select: { id: true, email: true, role: true } });
    console.log("Users:", users);
}

main().catch(console.error).finally(() => prisma.$disconnect());
