import axios from 'axios';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const routeUrl = 'http://localhost:3000/route';
const enterpriseUrl = 'http://localhost:3000/enterprise';

function compareObject(route: any, object: any) {
  expect(route.description).toBe(object.description);
  expect(route.startTime).toBe(object.startTime);
  expect(route.enterpriseId).toBe(object.enterpriseId);
}

it('should post a new user', async () => {
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
  const enterprise = responseEnterprise.data.enterprise;
  const validInputRoute = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const responseRoute = await axios.post(routeUrl, validInputRoute);
  const route = responseRoute.data;
  compareObject(route, validInputRoute);
});

it('should post and request new user', async () => {
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
  const enterprise = responseEnterprise.data.enterprise;
  const validInputRoute = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const responseRoute = await axios.post(routeUrl, validInputRoute);
  const routeId = responseRoute.data._id;
  await delay(3000);
  const getRouteData = (await axios.get(routeUrl + '/' + routeId)).data;
  compareObject(getRouteData, validInputRoute);
});

it('should post the validInput and update the database with the newValidInput', async () => {
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
  const enterprise = responseEnterprise.data.enterprise;
  const validInputRoute1 = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const responseRoute = await axios.post(routeUrl, validInputRoute1);
  const routeId = responseRoute.data._id;
  const validInputRoute2 = {
    _id: routeId,
    startTime: '08:00:00',
    description: 'Another valid Description',
    enterpriseId: enterprise._id,
  };
  await delay(3000);
  await axios.put(routeUrl + '/' + routeId, validInputRoute2);
  const getRouteData = (await axios.get(routeUrl + '/' + routeId)).data;
  compareObject(getRouteData, validInputRoute2);
});
