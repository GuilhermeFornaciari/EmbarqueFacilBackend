import axios from 'axios';
const baseurl = 'http://localhost:3000/enterprise';

const MAXTIMEOUT = 15000;
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
  'should post a new enterprise',
  async () => {
    const validInput = {
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
    const responseData = (await axios.post(baseurl, validInput)).data;
    expect(responseData.enterprise._id).toBeDefined();
    expect(responseData.user._id).toBeDefined();
    CompareObjects(responseData.enterprise, validInput.enterprise);
  },
  MAXTIMEOUT,
);

it(
  'should post and request new enterprise',
  async () => {
    const validInput = {
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
    const response = await axios.post(baseurl, validInput);
    const EnterpriseId = response.data.enterprise._id;
    await delay(3000);
    const enterprise = (await axios.get(baseurl + '/' + EnterpriseId)).data;
    expect(enterprise).toBeDefined();
    CompareObjects(enterprise, validInput.enterprise);
  },
  MAXTIMEOUT,
);

it(
  'should post the validInput and update the database with the newValidInput',
  async () => {
    const validInput = {
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
    const responseData = (await axios.post(baseurl, validInput)).data;
    const EnterpriseId = responseData.enterprise._id;
    const enterpriseUpdate = {
      _id: EnterpriseId,
      cnpj: '01916446000123',
      name: 'Empresa valida2',
      phone: '69984696664',
      email: 'EmpresaVAAAlida@gmail.com',
      adressStreet: 'rua dallacosta',
      adressNumber: '0310',
      adressCityId: '',
      adressDistrict: 'centro',
      adressCep: '',
    };
    await delay(6000);
    await axios.put(baseurl + '/' + EnterpriseId, enterpriseUpdate);
    const enterprise = (await axios.get(baseurl + '/' + EnterpriseId)).data;
    CompareObjects(enterprise, enterpriseUpdate);
  },
  MAXTIMEOUT,
);
