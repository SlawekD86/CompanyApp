const Department = require('../department.model.js');
const expect = require('chai').expect;
const mongoose = require('mongoose');

describe('Department', () => {
  it('should throw an error if no "name" arg', () => {
    const dep = new Department({}); // create new Department, but don't set `name` attr value

    dep.validate(err => {
      expect(err.errors.name).to.exist;
    });
  });

  it('should throw an error if "name" is not a string', () => {
    const cases = [{}, []];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });

    }

  });
  it('should have beetween five and twenty otherwise throw error', () => {
    const cases = ['Abc', 'abcd', 'Lorem Ipsum, Lorem Ip'];
    for (let name of cases) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err.errors.name).to.exist;
      });
    }
  })
  it('should not throw an error for valid names', () => {
    const validNames = ['Lorem Ipsum', 'Loreeeem Ipssssum', 'Loremmmmm Ipppppsum'];
    for (let name of validNames) {
      const dep = new Department({ name });

      dep.validate(err => {
        expect(err).to.not.exist;
      });
    }
  });
});