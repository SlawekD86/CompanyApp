const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const employeesRoutes = require('./routes/employees.routes');
const departmentsRoutes = require('./routes/departments.routes');
const productsRoutes = require('./routes/products.routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', employeesRoutes);
app.use('/api', departmentsRoutes);
app.use('/api', productsRoutes);

app.use((req, res) => {
  res.status(404).send({ message: 'Not found...' });
});

mongoose.connect('mongodb://localhost:27017/companyDB', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    app.listen(8000, () => {
      console.log('Server is running on port 8000');
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });
