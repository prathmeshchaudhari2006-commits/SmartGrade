import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import PrismaPkg from '@prisma/client';
import pgPkg from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: join(__dirname, '../.env') });

const { PrismaClient } = PrismaPkg;
const { Pool } = pgPkg;

const prisma = new PrismaClient({
    datasources: {
        db: {
            url: process.env.DATABASE_URL,
        },
    },
});

console.log('🔧 PrismaClient created (native mode)');

export default prisma;
