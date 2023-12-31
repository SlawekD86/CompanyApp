const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server.js');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/departments', () => {
  let departmentId;

  before(async () => {
    const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
    await testDepOne.save();
    departmentId = testDepOne._id; 
  });

  after(async () => {
    await Department.deleteMany();
  });

  it('/:id should update chosen document and return success', async () => {
    const res = await request(server).put(`/api/departments/${departmentId}`).send({ name: 'Updated!' });
    const updatedDepartment = await Department.findById(departmentId); 
    expect(res.status).to.be.equal(200);
    expect(updatedDepartment).to.not.be.null;
    expect(updatedDepartment.name).to.be.equal('Updated!');
  });
});