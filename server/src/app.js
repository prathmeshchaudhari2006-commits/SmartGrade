import 'dotenv/config';
import express from 'express';
import cors from 'cors';
// Import routes below once created
import authRoutes from './routes/authRoutes.js';
import assignmentRoutes from './routes/assignmentRoutes.js';
import submissionRoutes from './routes/submissionRoutes.js';

const app = express();

// 🟢 Request logger (First thing it does)
app.use((req, res, next) => {
    console.log(`\n--- [${new Date().toLocaleTimeString()}] INCOMING REQUEST ---`);
    console.log(`${req.method} ${req.originalUrl}`);
    console.log('Headers:', JSON.stringify(req.headers, null, 2));
    next();
});

// Middleware
app.use(cors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// 🔵 Body logger (Sanitized to avoid crashing on large payloads)
app.use((req, res, next) => {
    if (req.method === 'POST') {
        const sanitizedBody = { ...req.body };
        // Truncate large base64 strings in logs
        for (const key in sanitizedBody) {
            if (typeof sanitizedBody[key] === 'string' && sanitizedBody[key].length > 500) {
                sanitizedBody[key] = `[LARGE_DATA: ${sanitizedBody[key].length} chars]`;
            }
        }
        console.log('Body:', JSON.stringify(sanitizedBody, null, 2));
    }
    next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/assignments', assignmentRoutes);
app.use('/api/submissions', submissionRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.status(200).json({ status: 'ok', message: 'SmartGrade API is running' });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('❌ GLOBAL ERROR:', err);

    // Handle payload too large
    if (err.type === 'entity.too.large') {
        return res.status(413).json({
            success: false,
            error: { code: 'PAYLOAD_TOO_LARGE', message: 'The uploaded file is too large. Please keep it under 50MB.' }
        });
    }

    res.status(500).json({
        success: false,
        error: { code: 'INTERNAL_SERVER_ERROR', message: err.message || 'Something went wrong!' }
    });
});

export default app;
