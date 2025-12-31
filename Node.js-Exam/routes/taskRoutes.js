const express = require('express');
const {
    getTasks,
    getAddTask,
    createTask,
    getEditTask,
    updateTask,
    deleteTask
} = require('../controllers/taskController');
const { createCategory } = require('../controllers/categoryController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.use(protect); // All these routes need authentication

router.get('/', getTasks);
router.get('/add', getAddTask);
router.post('/', createTask);
router.get('/edit/:id', getEditTask);
router.post('/update/:id', updateTask);
router.get('/delete/:id', deleteTask);

// Category creation limited to admin
router.post('/categories', authorize('admin'), createCategory);

module.exports = router;
