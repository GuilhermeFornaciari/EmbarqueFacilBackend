import mongoose from 'mongoose';
import User from '../../../../../domain/User';
import UserMongooseRepository from '../../../mongodb/repositories/UserMongooseRepository';
import { config } from 'dotenv';
config();
const MAXTIMEOUT = 20000;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const validInput = {
  cpf: '70116562277',
  rg: '1551035',
  name: 'Guilherme',
  surname: 'Fornaciari',
  phone: '69984696665',
  email: 'fornaciari049@gmail.com',
  password: 'sim',
  birthDate: '08-23-2005',
  type: 'client',
  idEnterprise: '1234',
  adressStreet: 'rua vanderlei dallacosta',
  adressNumber: '0310',
  adressCityId: '',
  adressDistrict: 'centro',
  adressCep: '',
  responsibleName: 'Claudete',
  responsibleSurname: 'Izabel',
  responsibleCpf: '31547389249',
  responsibleEmail: 'izabeldesouzaclaudete@gmail.com',
};

async function compareObject(user: User, object: any) {
  expect(user.cpf).toBe(object.cpf);
  expect(user.rg).toBe(object.rg);
  expect(user.name).toBe(object.name);
  expect(user.surname).toBe(object.surname);
  expect(user.phone).toBe(object.phone);
  expect(user.email).toBe(object.email);
  expect(user.password).not.toBe(object.password);
  expect(user.birthDate).toBe(object.birthDate);
  expect(user.type).toBe(object.type);
  expect(user.idEnterprise).toBe(object.idEnterprise);

  expect(user.adressStreet).toBe(object.adressStreet);
  expect(user.adressNumber).toBe(object.adressNumber);
  expect(user.adressCityId).toBe(object.adressCityId);
  expect(user.adressDistrict).toBe(object.adressDistrict);
  expect(user.adressCep).toBe(object.adressCep);

  expect(user.responsibleName).toBe(object.responsibleName);
  expect(user.responsibleSurname).toBe(object.responsibleSurname);
  expect(user.responsibleCpf).toBe(object.responsibleCpf);
  expect(user.responsibleEmail).toBe(object.responsibleEmail);
}

it(
  'should test if the database creates a new user',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const repo = new UserMongooseRepository();
    const firstLength = await repo.getLength();
    const user = User.create(validInput);
    await repo.save(user);
    await delay(20);
    const getUser = await repo.getOne(user._id);
    expect(await repo.getLength()).toBe(firstLength + 1);
    compareObject(getUser, validInput);
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);

it(
  'should test if the database deletes a user',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const repo = new UserMongooseRepository();
    const firstLength = await repo.getLength();
    const user = User.create(validInput);
    await repo.save(user);
    await delay(20);
    await repo.delete(user._id);
    await delay(20);
    expect(await repo.getLength()).toBe(firstLength);
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);

it(
  'should test if the database updates a user',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);

    const repo = new UserMongooseRepository();
    const userCreate = User.create(validInput);
    await repo.save(userCreate);
    const UpdateInput = {
      ...validInput,
      _id: userCreate._id,
      email: 'Forninsadassdha049@gmail.com',
    };
    await delay(6000);
    const userUpdate = new User(UpdateInput);
    await repo.update(userUpdate);
    await delay(20);
    const getuser = await repo.getOne(userCreate._id);
    compareObject(getuser, UpdateInput);
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);

it(
  'should test if the database gives an error if the user tries to access a invalid Id',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const repo = new UserMongooseRepository();
    await expect(() => repo.getOne('id')).rejects.toThrow(
      new Error('User not found'),
    );
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);
it(
  'should test if the database finds a new user by login',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const repo = new UserMongooseRepository();
    const user = User.create(validInput);
    await repo.save(user);

    await delay(20);

    const loginUser = await repo.login({
      email: validInput.email,
      password: validInput.password,
    });
    compareObject(loginUser, validInput);
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);

it(
  'should test if the database gives an error if the password is wrong',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const repo = new UserMongooseRepository();
    const user = User.create(validInput);
    await repo.save(user);
    await delay(20);
    await expect(() =>
      repo.login({ email: validInput.email, password: 'anything' }),
    ).rejects.toThrow(new Error('Invalid Credentials'));
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);

it(
  'should test if the database gives an error if the user tries to access a invalid Id',
  async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const repo = new UserMongooseRepository();
    await expect(() => repo.getOne('id')).rejects.toThrow(
      new Error('User not found'),
    );
    await mongoose.connection.close();
  },
  MAXTIMEOUT,
);
