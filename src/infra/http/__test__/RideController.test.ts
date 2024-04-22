import axios from 'axios';

const baseUrl = 'http://localhost:3000/ride';
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

async function registerUser(idEnterprise: string) {
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
    idEnterprise: idEnterprise,
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
async function registerBus() {
  const busUrl = 'http://localhost:3000/ride';
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const busData = (await axios.post(busUrl, validInput)).data;
  return busData._id;
}
async function registerDriver(enterpriseId: string) {
  const driverUrl = 'http://localhost:3000/user';
  const validInput = {
    cpf: '70116562277',
    rg: '1551035',
    name: 'Guilherme',
    surname: 'Fornaciari',
    phone: '69984696665',
    email: 'fornaciari049@gmail.com',
    password: 'sim',
    birthDate: '08-23-2005',
    type: 'driver',
    idEnterprise: enterpriseId,
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
  const driverData = (await axios.post(driverUrl, validInput)).data;
  return driverData._id;
}
async function registerRoute(enterpriseId: string) {
  const routeUrl = 'http://localhost:3000/route';
  const validInputRoute1 = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterpriseId,
  };
  const routeData = (await axios.post(routeUrl, validInputRoute1)).data;
  return routeData._id;
}

function compareObject(Ride: any, object: any) {
  expect(new Date(Ride.useDate)).toStrictEqual(new Date(object.useDate));
  expect(Ride.busId).toBe(object.busId);
  expect(Ride.driverId).toBe(object.driverId);
  expect(Ride.routeId).toBe(object.routeId);
  expect(Ride.clientIdList).toStrictEqual(object.clientIdList);
}

it('should post a new user', async () => {
  const enterpriseId = await registerEnterprise();
  const userIdList = [
    await registerUser(enterpriseId),
    await registerUser(enterpriseId),
    await registerUser(enterpriseId),
  ];
  const busId = await registerBus();
  const driverId = await registerDriver(enterpriseId);
  const routeId = await registerRoute(enterpriseId);
  const validInputRide = {
    clientIdList: userIdList,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };
  const responseRide = await axios.post(baseUrl, validInputRide);
  const RideData = responseRide.data;
  compareObject(RideData, validInputRide);
});

it('should post and request new user', async () => {
  const enterpriseId = await registerEnterprise();
  const userIdList = [
    await registerUser(enterpriseId),
    await registerUser(enterpriseId),
    await registerUser(enterpriseId),
  ];
  const busId = await registerBus();
  const driverId = await registerDriver(enterpriseId);
  const routeId = await registerRoute(enterpriseId);
  const validInputRide = {
    clientIdList: userIdList,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };
  const responseRide = await axios.post(baseUrl, validInputRide);
  const RideId = responseRide.data._id;
  const getRideData = (await axios.get(baseUrl + '/' + RideId)).data;
  compareObject(getRideData, validInputRide);
});

it('should post the validInput and update the database with the newValidInput', async () => {
  const enterpriseId = await registerEnterprise();
  const userIdList = [
    await registerUser(enterpriseId),
    await registerUser(enterpriseId),
    await registerUser(enterpriseId),
  ];
  const busId = await registerBus();
  const driverId = await registerDriver(enterpriseId);
  const routeId = await registerRoute(enterpriseId);
  const validInputRide = {
    clientIdList: userIdList,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };
  const responseRide = await axios.post(baseUrl, validInputRide);
  const RideId = responseRide.data._id;
  const validInputRide2 = {
    _id: RideId,
    clientIdList: userIdList,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };
  await axios.put(baseUrl + '/' + RideId, validInputRide2);
  const getRideData = (await axios.get(baseUrl + '/' + RideId)).data;
  compareObject(getRideData, validInputRide2);
});
