const Task = require('../models/Task');
const Category = require('../models/Category');

// @desc    Get all tasks
// @route   GET /tasks
exports.getTasks = async (req, res) => {
    try {
        let query;

        // If admin, show all tasks. If user, show only their tasks.
        if (req.user.role === 'admin') {
            query = Task.find().populate('user', 'username').populate('category', 'name');
        } else {
            query = Task.find({ user: req.user.id }).populate('category', 'name');
        }

        const tasks = await query;
        const categories = await Category.find();

        res.render('taskList', { tasks, categories, user: req.user });
    } catch (err) {
        res.status(400).send('Error fetching tasks');
    }
};

// @desc    Show add task form
// @route   GET /tasks/add
exports.getAddTask = async (req, res) => {
    const categories = await Category.find();
    res.render('taskForm', { categories, task: null, user: req.user });
};

// @desc    Create new task
// @route   POST /tasks
exports.createTask = async (req, res) => {
    try {
        const { title, description, status, category } = req.body;

        const taskData = {
            title,
            description,
            status,
            user: req.user.id
        };

        // If category is not selected or empty, don't include it or set to null
        if (category && category !== '') {
            taskData.category = category;
        }

        await Task.create(taskData);
        res.redirect('/tasks');
    } catch (err) {
        console.error('Task Creation Error:', err);
        res.status(400).send('Error creating task: ' + err.message);
    }
};

// @desc    Get single task for edit
// @route   GET /tasks/edit/:id
exports.getEditTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).send('Task not found');

        // Check if user owns task or is admin
        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).send('Not authorized');
        }

        const categories = await Category.find();
        res.render('taskForm', { categories, task, user: req.user });
    } catch (err) {
        res.status(400).send('Error');
    }
};

// @desc    Update task
// @route   POST /tasks/update/:id
exports.updateTask = async (req, res) => {
    try {
        let task = await Task.findById(req.params.id);

        if (!task) return res.status(404).send('Task not found');

        // Check if user owns task or is admin
        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).send('Not authorized');
        }

        const { title, description, status, category } = req.body;
        const updateData = { title, description, status };

        if (category && category !== '') {
            updateData.category = category;
        } else {
            updateData.category = null;
        }

        task = await Task.findByIdAndUpdate(req.params.id, updateData, {
            new: true,
            runValidators: true
        });

        res.redirect('/tasks');
    } catch (err) {
        res.status(400).send('Error updating task');
    }
};

// @desc    Delete task
// @route   GET /tasks/delete/:id
exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);

        if (!task) return res.status(404).send('Task not found');

        // Check if user owns task or is admin
        if (task.user.toString() !== req.user.id && req.user.role !== 'admin') {
            return res.status(401).send('Not authorized');
        }

        await task.deleteOne();
        res.redirect('/tasks');
    } catch (err) {
        res.status(400).send('Error deleting task');
    }
};
