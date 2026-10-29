const UserService = require('../services/user.services');

class UserController {

    // Signup
    async signup(req, res) {
        try {
            const { name, email, password } = req.body;

            if (
                !name?.trim() ||
                !email?.trim() ||
                !password
            ) {
                return res.status(400).json({
                    message: 'All fields are required!'
                });
            }

            const result = await UserService.signup(
                name,
                email,
                password
            );

            const userWithoutPassword = result.toObject();

            delete userWithoutPassword.password;

            return res.status(201).json({
                message: 'User created successfully',
                data: userWithoutPassword
            });

        } catch (error) {
            console.error(error.message);

            if (
                error.message.includes('already exists') ||
                error.code === 11000
            ) {
                return res.status(409).json({
                    message: 'Email already exists'
                });
            }

            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: 'Failed to create user'
            });
        }
    }

    // Login
    async login(req, res) {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({
                    message: 'Both email and password are required'
                });
            }

            const loginData = await UserService.loginUser(
                email,
                password
            );

            return res.status(200).json({
                message: 'Login successful',
                data: loginData
            });

        } catch (error) {
            console.error(error.message);

            if (
                error.message === 'User not found' ||
                error.message === 'Invalid credentials'
            ) {
                return res.status(401).json({
                    message: 'Invalid email or password'
                });
            }

            if (error.message === 'Account is inactive') {
                return res.status(403).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: 'Login failed'
            });
        }
    }

    // Get all active users
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();

            return res.status(200).json({
                message: 'Users fetched successfully',
                count: users.length,
                data: users
            });

        } catch (error) {
            console.error(error.message);

            return res.status(500).json({
                message: 'Failed to fetch users'
            });
        }
    }

    // Update user
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email } = req.body;

            if (
                name === undefined &&
                email === undefined
            ) {
                return res.status(400).json({
                    message: 'Provide name or email to update'
                });
            }

            const updateData = {};

            if (name !== undefined) {
                updateData.name = name;
            }

            if (email !== undefined) {
                updateData.email = email;
            }

            const updatedUser = await UserService.updateUser(
                id,
                updateData
            );

            const userWithoutPassword =
                updatedUser.toObject();

            delete userWithoutPassword.password;

            return res.status(200).json({
                message: 'User updated successfully',
                data: userWithoutPassword
            });

        } catch (error) {
            console.error(error.message);

            const statusCode =
                error.message === 'User not found' ? 404 :
                error.message === 'User is inactive' ? 403 :
                error.message === 'Email already exists' ? 409 :
                error.message === 'Invalid user ID' ? 400 :
                error.message.startsWith('Updating ') ? 400 :
                error.message === 'Name must be a non-empty string' ? 400 :
                error.message === 'Provide a valid email address' ? 400 :
                error.name === 'ValidationError' ? 400 :
                error.code === 11000 ? 409 : 500;

            return res.status(statusCode).json({
                message: statusCode === 500
                    ? 'Failed to update user'
                    : error.message
            });
        }
    }

    // Soft delete user
    async softDeleteUser(req, res) {
        try {
            const { id } = req.params;

            const result = await UserService.softDeleteUser(id);

            return res.status(200).json({
                message: 'User deleted successfully',
                data: {
                    id: result._id,
                    name: result.name,
                    email: result.email,
                    isActive: result.isActive
                }
            });

        } catch (error) {
            console.error(error.message);

            const statusCode =
                error.message === 'User not found' ? 404 :
                error.message === 'User is already inactive' ? 409 :
                error.message === 'Invalid user ID' ? 400 : 500;

            return res.status(statusCode).json({
                message: statusCode === 500
                    ? 'Failed to delete user'
                    : error.message
            });
        }
    }

    // Create user profile
    async addUserProfile(req, res) {
        try {
            const userId = req.user?.id;

            const { age, dob, bio } = req.body;

            if (!userId) {
                return res.status(401).json({
                    message: 'Authentication required'
                });
            }

            if (
                age !== undefined &&
                (
                    !Number.isInteger(age) ||
                    age < 1 ||
                    age > 120
                )
            ) {
                return res.status(400).json({
                    message: 'Age must be an integer between 1 and 120'
                });
            }

            if (
                dob !== undefined &&
                (
                    typeof dob !== 'string' ||
                    Number.isNaN(Date.parse(dob))
                )
            ) {
                return res.status(400).json({
                    message: 'Provide a valid date of birth'
                });
            }

            if (
                bio !== undefined &&
                typeof bio !== 'string'
            ) {
                return res.status(400).json({
                    message: 'Bio must be a string'
                });
            }

            const newUserProfile =
                await UserService.addUserProfile(
                    userId,
                    { age, dob, bio }
                );

            return res.status(201).json({
                message: 'User profile created successfully',
                data: newUserProfile
            });

        } catch (error) {
            console.error(error.message);

            if (
                error.code === 11000 ||
                error.message ===
                    'A profile for this user already exists'
            ) {
                return res.status(409).json({
                    message: 'A profile for this user already exists'
                });
            }

            if (error.message === 'User not found') {
                return res.status(404).json({
                    message: error.message
                });
            }

            if (
                error.message === 'User account is inactive'
            ) {
                return res.status(403).json({
                    message: error.message
                });
            }

            if (error.message === 'Invalid user ID') {
                return res.status(400).json({
                    message: error.message
                });
            }

            if (error.name === 'ValidationError') {
                return res.status(400).json({
                    message: error.message
                });
            }

            return res.status(500).json({
                message: 'Failed to create user profile'
            });
        }
    }
}

module.exports = new UserController();