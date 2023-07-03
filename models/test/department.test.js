const Department = require('../../models/department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  afterEach(() => {
    mongoose.models = {};
  });

  it('should throw an error if no "name" arg', () => {
    const dep = new Department({});

    dep.validate((err) => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should have between five and twenty characters, otherwise throw an error', () => {
    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err).to.exist;
        expect(err.errors).to.exist;
        expect(err.errors.name).to.exist;
      });
    }
  });

  it('should not throw an error for valid names', () => {
    const validNames = ['Lorem Ipsum', 'Loreeeem Ipssssum', 'Loremmmmm Ipppppsum'];
    for (let name of validNames) {
      const dep = new Department({ name });

      dep.validate((err) => {
        expect(err).to.be.null; // Updated assertion
      });
    }
  });
});
