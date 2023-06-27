const express = require('express');
const router = express.Router();
const Employee = require('../models/employee.module');

router.get('/employees', async (req, res) => {
  try {
    res.json(await Employee.find())
  }
  catch(err) {
    res.status(500).json({ message: err })
  }
});

router.get('/employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand);
    if(!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/employees/:id', async(req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  }
  catch(err) {
    res.status(500).json({ message: err });
  }
});

router.post('/employees', async (req, res) => {
  try {

    const { firstName, lastName } = req.body;
    const newEmployee = new Product({ firstName: firstName, lastName: lastName });
    await newEmployee.save();
    res.json({ message: 'OK', newEmployee });

  } catch (err) {
    res.status(500).json({ message: err });
  }
});

router.put('/employees/:id', async (req, res) => {
  const { firstName, lastName } = req.body;
  try {
    const emp = await Employee.findById(req.params.id);
    if(emp) {
      await Employee.updateOne({ _id: req.params.id }, { $set: { firstName: firstName, lastName: lastName }});
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

router.delete('/employees/:id', async(req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(emp) {
      await Employee.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    }
    else res.status(404).json({ message: 'Not found...' });
  }
  catch(err) {
    res.status(500).json({ message: err });
  }

});

module.exports = router;