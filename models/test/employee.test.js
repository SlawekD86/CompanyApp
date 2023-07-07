const Employee = require('../employee.module');
const expect = require('chai').expect;
const mongoose = require('mongoose');
describe('Employee', () => {
  it('should throw an error if no "firstName", "lastName", "department" arg', () => {
    const emp = new Employee({}); // create new Department, but don't set `name` attr value
    emp.validate((err) => {
      expect(err.errors.firstName).to.exist;
      expect(err.errors.lastName).to.exist;
      expect(err.errors.department).to.exist;
    });
  });
  it('should throw an error if "firstName", "lastName", "department" is not a string', () => {
    const cases = [{}, []];
    for (let firstName of cases) {
      const emp = new Employee({ firstName });
      emp.validate((err) => {
        expect(err.errors.firstName).to.exist;
      });
    }
    for (let lastName of cases) {
      const emp = new Employee({ lastName });
      emp.validate((err) => {
        expect(err.errors.lastName).to.exist;
      });
    }
    for (let department of cases) {
      const emp = new Employee({ department });
      emp.validate((err) => {
        expect(err.errors.department).to.exist;
      });
    }
  });

  it('should not throw an error for valid firstNames, lastNames, departments', () => {
    const dep = new Employee({ firstName: 'maks', lastName: 'smith', department: 'IT' });

    dep.validate((err) => {
      expect(err).to.not.exist;
    });
  });
});