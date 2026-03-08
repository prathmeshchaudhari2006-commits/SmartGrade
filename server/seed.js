import 'dotenv/config';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '.env') });

import prisma from './src/prismaClient.js';

async function main() {
    console.log("Seeding database...");
    console.log("DB URL available:", !!process.env.DATABASE_URL);
    if (process.env.DATABASE_URL) {
        console.log("DB URL (masked):", process.env.DATABASE_URL.replace(/:[^:@]+@/, ':****@'));
    }

    // 1. Create Demo Faculty
    const hashedPassword = await bcrypt.hash('demo123', 10);
    const teacher = await prisma.user.upsert({
        where: { email: 'Faculty@nmims.in' },
        update: {},
        create: {
            email: 'Faculty@nmims.in',
            name: 'Faculty User',
            role: 'TEACHER',
            password: hashedPassword,
        },
    });

    // 2. Create Demo Student
    const student = await prisma.user.upsert({
        where: { email: '80012345678' },
        update: {},
        create: {
            email: '80012345678',
            name: 'Arjun',
            role: 'STUDENT',
            password: hashedPassword,
        },
    });

    // 3. Create Class (Find first or create)
    let demoClass = await prisma.class.findFirst({ where: { name: 'Class 10A' } });
    if (!demoClass) {
        demoClass = await prisma.class.create({
            data: {
                name: 'Class 10A',
                subject: 'L.A.D.E (Linear algebra differential equation)',
                enrollments: {
                    create: [
                        { userId: student.id },
                        { userId: teacher.id }
                    ]
                }
            }
        });
    }

    console.log("Seeding complete!");
    console.log("Demo Teacher ID:", teacher.id);
    console.log("Demo Class ID:", demoClass.id);
}

main().catch(console.error).finally(() => prisma.$disconnect());
