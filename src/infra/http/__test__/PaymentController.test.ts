import axios from 'axios';

const baseUrl = 'http://localhost:3000/Payment';
async function registerEnterprise() {
  const enterpriseUrl = 'http://localhost:3000/enterprise';
  const validInputEnterprise = {
    enterprise: {
      cnpj: '01916446000123',
      name: 'Empresa valida',
      phone: '69984696665',
      email: 'Empresa@gmail.com',
      adressStreet: 'rua vanderlei dallacosta',
      adressNumber: '0310',
      adressCityId: '',
      adressDistrict: 'centro',
      adressCep: '',
    },
    user: {
      cpf: '70116562277',
      rg: '1551035',
      name: 'Guilherme',
      surname: 'Fornaciari',
      phone: '69984696665',
      email: 'fornaciari049@gmail.com',
      password: 'sim',
      birthDate: '08-23-2005',
      type: 'admin',
      adressStreet: '',
      adressNumber: '',
      adressCityId: '',
      adressDistrict: '',
      adressCep: '',
      responsibleName: '',
      responsibleSurname: '',
      responsibleCpf: '',
      responsibleEmail: '',
    },
  };
  const responseEnterprise = await axios.post(
    enterpriseUrl,
    validInputEnterprise,
  );
  return responseEnterprise.data.enterprise._id;
}

async function registerUser(enterpriseId: string) {
  const UserUrl = 'http://localhost:3000/user';
  const validInputUser = {
    cpf: '31547389249',
    rg: '1551035',
    name: 'Claudete',
    surname: 'Izabel',
    phone: '69984112317',
    email: 'izabeldesouza@gmail.com',
    password: 'sim',
    birthDate: '08-23-2005',
    type: 'admin',
    idEnterprise: enterpriseId,
    adressStreet: 'rua vanderlei dallacosta',
    adressNumber: '0310',
    adressCityId: '',
    adressDistrict: 'centro',
    adressCep: '76950000',
    responsibleName: '',
    responsibleSurname: '',
    responsibleCpf: '',
    responsibleEmail: '',
  };
  const responseUser = await axios.post(UserUrl, validInputUser);
  return responseUser.data._id;
}

function compareObject(Payment: any, object: any) {
  expect(Payment.enterpriseId).toBe(object.enterpriseId);
  expect(Payment.clientId).toBe(object.clientId);
  expect(new Date(Payment.expireDate)).toEqual(new Date(object.expireDate));
  expect(Payment.value).toBe(object.value);
  if (Payment.paidDate || object.paidDate) {
    expect(new Date(Payment.paidDate)).toEqual(new Date(object.paidDate));
  }
}

it('should post a new user', async () => {
  const enterpriseId = await registerEnterprise();
  const userId = await registerUser(enterpriseId);
  const validInputPayment = {
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-10-25',
    value: 250.0,
  };
  const responsePayment = await axios.post(baseUrl, validInputPayment);
  const paymentData = responsePayment.data;
  compareObject(paymentData, validInputPayment);
});

it('should post and request new user', async () => {
  const enterpriseId = await registerEnterprise();
  const userId = await registerUser(enterpriseId);
  const validInputPayment = {
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-10-25',
    value: 250.0,
  };
  const responsePayment = await axios.post(baseUrl, validInputPayment);
  const paymentId = responsePayment.data._id;
  const getPaymentData = (await axios.get(baseUrl + '/' + paymentId)).data;
  compareObject(getPaymentData, validInputPayment);
});

it('should post the validInput and update the database with the newValidInput', async () => {
  const enterpriseId = await registerEnterprise();
  const userId = await registerUser(enterpriseId);
  const validInputPayment = {
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-10-25',
    value: 250.0,
  };
  const responsePayment = await axios.post(baseUrl, validInputPayment);
  const PaymentId = responsePayment.data._id;
  const validInputPayment2 = {
    _id: PaymentId,
    enterpriseId: enterpriseId,
    clientId: userId,
    expireDate: '2023-11-25',
    value: 300.0,
  };
  await axios.put(baseUrl + '/' + PaymentId, validInputPayment2);
  const getPaymentData = (await axios.get(baseUrl + '/' + PaymentId)).data;
  compareObject(getPaymentData, validInputPayment2);
});
