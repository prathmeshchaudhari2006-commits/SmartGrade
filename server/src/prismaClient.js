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

console.log('🔧 DATABASE_URL:', process.env.DATABASE_URL ? 'SET' : 'NOT SET');

const pool = new Pool({
    connectionString: 'postgresql://postgres:admin123@localhost:5432/smartgrade',
    connectionTimeoutMillis: 10000,
    idleTimeoutMillis: 30000,
    max: 5,
});

pool.on('error', (err) => {
    console.error('💀 Pool error:', err.message);
});

console.log('🔧 Pool created, testing raw query...');
pool.query('SELECT 1').then(() => {
    console.log('🔧 Raw pool query succeeded');
}).catch(e => {
    console.error('🔧 Raw pool query FAILED:', e.message);
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

console.log('🔧 PrismaClient created (adapter mode)');

export default prisma;
