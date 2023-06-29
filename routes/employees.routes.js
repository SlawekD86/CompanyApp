const express = require('express');
const router = express.Router();

const EmployeesController = require('../controllers/employees.controller');

router.get('/employees', EmployeesController.getAll)
router.get('/employees/random', EmployeesController.getRandom);
router.get('/employees/:id', EmployeesController.getById);
router.get('/employees/', EmployeesController.post);
router.get('/employees/:id', EmployeesController.update);
router.get('/employees/:id', EmployeesController.delete);

module.exports = router;