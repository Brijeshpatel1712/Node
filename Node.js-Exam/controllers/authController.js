const User = require('../models/User');
const jwt = require('jsonwebtoken');

// @desc    Register user
// @route   POST /auth/register
exports.register = async (req, res) => {
    try {
        const { username, password, role } = req.body;

        // Create user
        const user = await User.create({
            username,
            password,
            role: role || 'user'
        });

        // Add 2 default tasks for the new user
        const Task = require('../models/Task');
        const Category = require('../models/Category');
        let workCat = await Category.findOne({ name: 'Work' });
        if (!workCat) {
            workCat = await Category.create({ name: 'Work' });
        }

        await Task.create([
            {
                title: 'Welcome to Taskly!',
                description: 'This is your first default task. You can edit or delete it.',
                user: user._id,
                category: workCat._id
            },
            {
                title: 'Explore Admin Features',
                description: 'Register an account with the Admin role to manage categories and see all users.',
                user: user._id,
                category: workCat._id
            }
        ]);

        sendTokenResponse(user, 201, res);
    } catch (err) {
        res.status(400).render('register', { error: 'Registration failed. Username might already exist.' });
    }
};

// @desc    Login user
// @route   POST /auth/login
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate username & password
        if (!username || !password) {
            return res.status(400).render('login', { error: 'Please provide an email and password' });
        }

        // Check for user
        const user = await User.findOne({ username }).select('+password');

        if (!user) {
            return res.status(401).render('login', { error: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
            return res.status(401).render('login', { error: 'Invalid credentials' });
        }

        sendTokenResponse(user, 200, res);
    } catch (err) {
        res.status(400).render('login', { error: 'Login failed' });
    }
};

// @desc    Log user out / clear cookie
// @route   GET /auth/logout
exports.logout = (req, res) => {
    res.cookie('token', 'none', {
        expires: new Date(Date.now() + 10 * 1000),
        httpOnly: true
    });

    res.status(200).redirect('/auth/login');
};

// Get token from model, create cookie and send response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });

    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    };

    if (process.env.NODE_ENV === 'production') {
        options.secure = true;
    }

    res
        .status(statusCode)
        .cookie('token', token, options)
        .redirect('/tasks');
};
