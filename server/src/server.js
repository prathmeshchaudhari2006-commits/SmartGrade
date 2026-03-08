import app from './app.js';
import prisma from './prismaClient.js';
import dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        console.log('🔌 Connecting to database...');
        await prisma.$connect();
        console.log('✅ Synchronized with PostgreSQL Database via Prisma');

        // Auto-seed required test data
        try {
            const defaultClass = await prisma.class.upsert({
                where: { id: '165e1714-7800-45f4-a7b6-1e93f8db9ba6' },
                update: {},
                create: {
                    id: '165e1714-7800-45f4-a7b6-1e93f8db9ba6',
                    name: 'Class 10A',
                    subject: 'Multiple'
                }
            });

            const defaultTeacher = await prisma.user.upsert({
                where: { email: 'Faculty@nmims.in' },
                update: {},
                create: {
                    id: 'teacher-123',
                    email: 'Faculty@nmims.in',
                    password: 'hashedpassword',
                    name: 'Demo Faculty',
                    role: 'TEACHER'
                }
            });
            console.log('🌱 Verified default Class and Teacher exist with exact frontend IDs.');
        } catch (seedErr) {
            console.error('⚠️ Could not auto-seed default data:', seedErr.message);
        }

        app.listen(PORT, () => {
            console.log(`🚀 SmartGrade Backend is running on http://localhost:${PORT}`);
        }).on('error', (err) => {
            console.error('❌ Server failed to listen:', err);
        });

    } catch (err) {
        console.error('❌ FATAL: Application failed to start.');
        console.error(err);
        process.exit(1);
    }
}

startServer();

// Add global rejection handlers
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception thrown:', err);
});
