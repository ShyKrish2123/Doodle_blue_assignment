const User = require('../models/user.model');
const UserProfile = require('../models/user.profile.model');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const tokenService = require('../jwt/token.service');

class UserService {

    // Register a new user
    async signup(name, email, password) {
        const normalizedEmail = email.trim().toLowerCase();

        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            throw new Error(
                'User already exists with this email'
            );
        }

        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        return await User.create({
            name: name.trim(),
            email: normalizedEmail,
            password: hashedPassword
        });
    }

    // Login an existing user
    async loginUser(email, password) {
        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({
            email: normalizedEmail
        }).select('+password');

        if (!user) {
            throw new Error('User not found');
        }

        if (!user.isActive) {
            throw new Error('Account is inactive');
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            throw new Error('Invalid credentials');
        }

        const payload = {
            id: user._id.toString(),
            email: user.email,
            isActive: user.isActive
        };

        const token = tokenService.generateToken(payload);

        const userWithoutPassword = user.toObject();

        delete userWithoutPassword.password;

        return {
            user: userWithoutPassword,
            token
        };
    }

    // Get all active users
    async getAllUsers() {
        return await User.find({
            isActive: true
        }).select('-password');
    }

    // Update user name or email
    async updateUser(id, updateData) {
        if (!mongoose.isValidObjectId(id)) {
            throw new Error('Invalid user ID');
        }

        const user = await User.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        if (!user.isActive) {
            throw new Error('User is inactive');
        }

        const allowedFields = ['name', 'email'];

        for (const field of Object.keys(updateData)) {
            if (!allowedFields.includes(field)) {
                throw new Error(
                    `Updating ${field} is not allowed`
                );
            }
        }

        if (updateData.name !== undefined) {
            if (
                typeof updateData.name !== 'string' ||
                !updateData.name.trim()
            ) {
                throw new Error(
                    'Name must be a non-empty string'
                );
            }

            user.name = updateData.name.trim();
        }

        if (updateData.email !== undefined) {
            if (
                typeof updateData.email !== 'string' ||
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                    updateData.email.trim()
                )
            ) {
                throw new Error(
                    'Provide a valid email address'
                );
            }

            const normalizedEmail =
                updateData.email.trim().toLowerCase();

            if (normalizedEmail !== user.email) {
                const existingUser = await User.findOne({
                    email: normalizedEmail
                });

                if (existingUser) {
                    throw new Error('Email already exists');
                }
            }

            user.email = normalizedEmail;
        }

        await user.save();

        return user;
    }

    // Soft delete a user
    async softDeleteUser(id) {
        if (!mongoose.isValidObjectId(id)) {
            throw new Error('Invalid user ID');
        }

        const user = await User.findById(id);

        if (!user) {
            throw new Error('User not found');
        }

        if (!user.isActive) {
            throw new Error('User is already inactive');
        }

        user.isActive = false;

        await user.save();

        return user;
    }

    // Create a user profile
    async addUserProfile(userId, profileData) {
        if (!mongoose.isValidObjectId(userId)) {
            throw new Error('Invalid user ID');
        }

        const user = await User.findById(userId);

        if (!user) {
            throw new Error('User not found');
        }

        if (!user.isActive) {
            throw new Error('User account is inactive');
        }

        const existingProfile = await UserProfile.findOne({
            user: userId
        });

        if (existingProfile) {
            throw new Error(
                'A profile for this user already exists'
            );
        }

        const userProfile = await UserProfile.create({
            user: user._id,
            age: profileData.age,
            dob: profileData.dob,
            bio: profileData.bio
        });

        user.profile = userProfile._id;

        await user.save();

        return userProfile;
    }
}

module.exports = new UserService();