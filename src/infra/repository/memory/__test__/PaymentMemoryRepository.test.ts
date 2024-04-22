import EnterpriseEntity from '../../../../domain/EnterpriseEntity';
import Payment from '../../../../domain/PaymentEntity';
import User from '../../../../domain/User';

import PaymentMemoryRepository from '../PaymentMemoryRepository';
import EnterpriseMemoryRepository from '../EnterpriseMemoryRepository';
import UserMemoryRepository from '../UserMemoryRepository';

async function registerEnterprise() {
  const validInputEnterprise = {
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
  const enterpriseRepo = new EnterpriseMemoryRepository();
  const enterprise = EnterpriseEntity.create(validInputEnterprise);
  await enterpriseRepo.save(enterprise);
  return enterprise._id;
}

async function registerUser() {
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
    idEnterprise: '',
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
  const userRepo = new UserMemoryRepository();
  const user = User.create(validInput);
  await userRepo.save(user);
  return user._id;
}

function compareObject(Payment: any, object: any) {
  expect(Payment.expireDate).toStrictEqual(new Date(object.expireDate));
  expect(Payment.clientId).toBe(object.clientId);
  expect(Payment.value).toBe(object.value);
  expect(Payment.enterpriseId).toBe(object.enterpriseId);
  const paidDateExists = Payment.paidDate || object.paidDate;
  if (paidDateExists)
    expect(Payment.paidDate).toStrictEqual(new Date(object.paidDate));
}

it('should test if the database creates a new Payment', async () => {
  const userId = await registerUser();
  const enterpriseId = await registerEnterprise();
  const validInputPayment = {
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-10-25',
    value: 250.0,
  };
  const payment = Payment.create(validInputPayment);
  const PaymentRepo = new PaymentMemoryRepository();
  const firstLength = await PaymentRepo.getLength();
  await PaymentRepo.save(payment);
  expect(PaymentRepo.getOne(payment._id)).toBeDefined();
  expect(await PaymentRepo.getLength()).toBe(firstLength + 1);
});

it('should test if the database creates a new payment with the exact same data', async () => {
  const userId = await registerUser();
  const enterpriseId = await registerEnterprise();
  const validInputPayment = {
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-10-25',
    value: 250.0,
  };
  const payment = Payment.create(validInputPayment);
  const PaymentRepo = new PaymentMemoryRepository();
  await PaymentRepo.save(payment);
  const getPayment = await PaymentRepo.getOne(payment._id);
  compareObject(getPayment, validInputPayment);
});

it('should test if the database deletes a payment', async () => {
  const userId = await registerUser();
  const enterpriseId = await registerEnterprise();
  const validInputPayment = {
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-10-25',
    value: 250.0,
  };
  const payment = Payment.create(validInputPayment);
  const PaymentRepo = new PaymentMemoryRepository();
  const firstLength = await PaymentRepo.getLength();
  await PaymentRepo.save(payment);
  await PaymentRepo.delete(payment._id);
  expect(await PaymentRepo.getLength()).toBe(firstLength);
});

it('should test if the database updates a payment', async () => {
  const userId = await registerUser();
  const enterpriseId = await registerEnterprise();
  const validInputPayment = {
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-10-25',
    value: 250.0,
  };
  const payment = Payment.create(validInputPayment);
  const PaymentRepo = new PaymentMemoryRepository();
  await PaymentRepo.save(payment);

  const validInputPayment2 = {
    _id: payment._id,
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-10-25',
    value: 240.0,
  };
  const payment2 = new Payment(validInputPayment2);
  await PaymentRepo.update(payment2);
  const getPayment = await PaymentRepo.getOne(payment._id);
  compareObject(getPayment, validInputPayment2);
});

it('should test if the database creates new Payments (test getall)', async () => {
  const userId = await registerUser();
  const enterpriseId = await registerEnterprise();
  const validInputPayment1 = {
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-10-25',
    value: 250.0,
  };
  const validInputPayment2 = {
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-11-25',
    value: 300.0,
  };
  const payment1 = Payment.create(validInputPayment1);
  const payment2 = Payment.create(validInputPayment2);
  const PaymentRepo = new PaymentMemoryRepository();
  await PaymentRepo.save(payment1);
  await PaymentRepo.save(payment2);
  const getAll = await PaymentRepo.getAll();
  expect(getAll.find((payment) => payment._id == payment1._id)).toBeDefined();
  expect(getAll.find((payment) => payment._id == payment2._id)).toBeDefined();
});

it('should test if the database gives an error if the payment tries to access a invalid Id', async () => {
  const repo = new PaymentMemoryRepository();
  expect(() => repo.getOne('invalid Value')).rejects.toThrow(
    new Error('Payment not found'),
  );
});
