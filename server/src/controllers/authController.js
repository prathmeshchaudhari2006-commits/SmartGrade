import { createUser, findByEmail } from '../services/userService.js';
import { sendResponse, sendError } from '../utils/responseHelper.js';
import bcrypt from 'bcryptjs';

export const register = async (req, res) => {
    try {
        const { email, password, name, role } = req.body;

        // Check if user exists
        const existingUser = await findByEmail(email);
        if (existingUser) {
            return sendError(res, 400, 'User already exists', 'USER_EXISTS');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await createUser({
            email,
            password: hashedPassword,
            name,
            role: role || 'STUDENT',
        });

        return sendResponse(res, 201, { id: user.id, email: user.email, name: user.name, role: user.role });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // email field is used for both SAP ID (students) and actual Email (faculty/parents)
        console.log(`🔑 Login attempt for: ${email}`);

        const user = await findByEmail(email);
        console.log(`🔍 Database lookup for ${email}: ${user ? 'FOUND' : 'NOT FOUND'}`);

        if (!user) {
            return sendError(res, 401, 'User not found', 'AUTH_FAILED');
        }

        console.log(`🔑 Validating password for ${email}...`);

        // Check if the password is valid using bcrypt
        // Also support plain text check as a fallback for manually created mock users before this patch
        const isMatch = await bcrypt.compare(password, user.password).catch(() => false);
        const isPlainTextMatch = user.password === password;

        if (!isMatch && !isPlainTextMatch) {
            console.log(`❌ Password mismatch!`);
            return sendError(res, 401, 'Invalid credentials', 'AUTH_FAILED');
        }

        console.log(`✅ Login successful for ${email}`);

        return sendResponse(res, 200, {
            id: user.id,
            email: user.email,
            name: user.name,
            role: user.role,
            token: 'demo-jwt-token' // In real app, generate JWT
        });
    } catch (error) {
        return sendError(res, 500, error.message);
    }
};
