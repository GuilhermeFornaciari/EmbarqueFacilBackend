import axios from 'axios';
const baseurl = 'http://localhost:3000/user';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function compareObject(user: any, object: any) {
  expect(user.cpf).toBe(object.cpf);
  expect(user.rg).toBe(object.rg);
  expect(user.name).toBe(object.name);
  expect(user.surname).toBe(object.surname);
  expect(user.phone).toBe(object.phone);
  expect(user.email).toBe(object.email);
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
  idEnterprise: 'aleatoryyValue',
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
const validInput2 = {
  cpf: '31547389249',
  rg: '1551035',
  name: 'Claudete',
  surname: 'Izabel',
  phone: '69984112317',
  email: 'izabeldesouza@gmail.com',
  password: 'sim',
  birthDate: '08-23-2005',
  type: 'admin',
  idEnterprise: 'aleatoryyValue',
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

it('should post a new user', async () => {
  const responseData = (await axios.post(baseurl, validInput)).data;
  expect(responseData._id).toBeDefined();
  compareObject(responseData, validInput);
});

it('should post and request new user', async () => {
  const userId = (await axios.post(baseurl, validInput)).data._id;
  await delay(3000);
  const user = (await axios.get(baseurl + '/' + userId)).data;
  expect(user).toBeDefined();
});

it('should post the validInput and update the database with the newValidInput', async () => {
  const userId = (await axios.post(baseurl, validInput)).data._id;
  const newValidInput = { ...validInput2, _id: userId };
  await delay(3000);
  await axios.put(baseurl + '/' + userId, newValidInput);
  const user = (await axios.get(baseurl + '/' + userId)).data;
  compareObject(user, newValidInput);
});
