import mongoose from 'mongoose';
import EnterpriseEntity from '../../../../../domain/EnterpriseEntity';
import EnterpriseMongooseRepository from '../EnterpriseMongooseRepository';
import { config } from 'dotenv';
config();
const MAXTIMEOUT = 20000;
function CompareObjects(object1: any, object2: any) {
  expect(object1.cnpj).toBe(object2.cnpj);
  expect(object1.name).toBe(object2.name);
  expect(object1.phone).toBe(object2.phone);
  expect(object1.email).toBe(object2.email);
  expect(object1.adressStreet).toBe(object2.adressStreet);
  expect(object1.adressNumber).toBe(object2.adressNumber);
  expect(object1.adressDistrict).toBe(object2.adressDistrict);
  expect(object1.adressCep).toBe(object2.adressCep);
}
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

it(
  'should test if the database creates a new Enterprise',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const validInput = {
      cnpj: '01916446000123',
      name: 'Empresa valida',
      phone: '69984696665',
      email: 'Empresa@gmail.com',
      adressStreet: 'rua vanderlei dallacosta',
      adressNumber: '0310',
      adressCityId: '',
      adressDistrict: 'centro',
      adressCep: '',
    };
    const repo = new EnterpriseMongooseRepository();
    const firstLength = await repo.getLength();
    const enterprise = EnterpriseEntity.create(validInput);
    await repo.save(enterprise);
    await delay(200);
    const getEnterprise = await repo.getOne(enterprise._id);
    expect(getEnterprise).toBeDefined();
    expect(await repo.getLength()).toBe(firstLength + 1);
    CompareObjects(getEnterprise, validInput);
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);

it(
  'should test if the database deletes a Enterprise',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const validInput = {
      cnpj: '01916446000123',
      name: 'Empresa valida',
      phone: '69984696665',
      email: 'Empresa@gmail.com',
      adressStreet: 'rua vanderlei dallacosta',
      adressNumber: '0310',
      adressCityId: '',
      adressDistrict: 'centro',
      adressCep: '',
    };
    const repo = new EnterpriseMongooseRepository();
    const firstLength = await repo.getLength();
    const Enterprise = EnterpriseEntity.create(validInput);
    await repo.save(Enterprise);
    await delay(20);
    await repo.delete(Enterprise._id);
    expect(await repo.getLength()).toBe(firstLength);
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);

it(
  'should test if the database updates a Enterprise',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const validInput1 = {
      cnpj: '01916446000123',
      name: 'Empresa valida',
      phone: '69984696665',
      email: 'Empresa@gmail.com',
      adressStreet: 'rua vanderlei dallacosta',
      adressNumber: '0310',
      adressCityId: '',
      adressDistrict: 'centro',
      adressCep: '',
    };

    const repo = new EnterpriseMongooseRepository();
    const enterpriseCreate = EnterpriseEntity.create(validInput1);
    await repo.save(enterpriseCreate);
    await delay(6000);
    const validInput2 = {
      _id: enterpriseCreate._id,
      cnpj: '01916446000123',
      name: 'Empresa valida2',
      phone: '69984696665',
      email: 'Empresaa@gmail.com',
      adressStreet: 'rua dallacosta',
      adressNumber: '0310',
      adressCityId: '',
      adressDistrict: 'centro',
      adressCep: '',
    };
    const enterpriseUpdate = new EnterpriseEntity(validInput2);
    await repo.update(enterpriseUpdate);
    await delay(200);
    const getEnterprise = await repo.getOne(enterpriseCreate._id);
    await mongoose.connection.close();
    CompareObjects(getEnterprise, validInput2);
  },
  MAXTIMEOUT,
);

it(
  'should test if the database gives an error if the Enterprise tries to access a invalid Id',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const repo = new EnterpriseMongooseRepository();
    await expect(() => repo.getOne('id')).rejects.toThrow(
      new Error('Enterprise not found'),
    );
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);
