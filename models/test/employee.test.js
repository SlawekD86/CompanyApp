const Employee = require('../employee.module');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Employee', () => {
  afterEach(() => {
    mongoose.models = {};
  });

  it('should throw an error if no "firstName", "lastName", "department" arg', () => {
    const emp = new Employee({});

    emp.validate((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });

  it('should throw an error if "firstName", "lastName", "department" is not a string', () => {
    const cases = [{}, []];
    for (let example of cases) {
      const emp = new Employee(example);

      emp.validate((err) => {
        expect(err.errors.firstName).to.exist;
        expect(err.errors.lastName).to.exist;
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error for valid firstNames, lastNames, departments', () => {
    const validCases = [
      { firstName: 'maks', lastName: 'smith', department: 'IT' }
    ];

    for (let example of validCases) {
      const emp = new Employee(example);

      emp.validate((err) => {
        expect(err).to.not.exist;
      });
    }
  });
});
