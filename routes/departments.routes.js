const express = require('express');
const router = express.Router();

const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll)
router.get('/departments/random', DepartmentController.getRandom);
router.get('/departments/:id', DepartmentController.getById);
router.get('/departments/', DepartmentController.post);
router.get('/departments/:id', DepartmentController.update);
router.get('/departments/:id', DepartmentController.delete);

module.exports = router