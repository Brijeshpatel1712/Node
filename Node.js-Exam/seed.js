const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Task = require('./models/Task');
const Category = require('./models/Category');

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany();
        await Task.deleteMany();
        await Category.deleteMany();

        // Create/Update Brijesh patel
        let brijesh = await User.findOne({ username: 'Brijesh patel' });
        if (!brijesh) {
            brijesh = await User.create({
                username: 'Brijesh patel',
                password: 'password123',
                role: 'user'
            });
        }

        // Create Categories if they don't exist
        let work = await Category.findOne({ name: 'Work' });
        if (!work) work = await Category.create({ name: 'Work' });

        // Create Initial Tasks for Brijesh patel
        await Task.create([
            {
                title: 'Complete Node.js CRUD',
                description: 'Build the Create, Read, Update, and Delete operations for the task app.',
                status: 'completed',
                user: brijesh._id,
                category: work._id
            },
            {
                title: 'Finalize JWT Authentication',
                description: 'Ensure cookies are secure and tokens are verified correctly.',
                status: 'in-progress',
                user: brijesh._id,
                category: work._id
            }
        ]);

        console.log('Database Seeded Successfully!');
        process.exit();
    } catch (err) {
        console.error('Error seeding data:', err);
        process.exit(1);
    }
};

seedData();
