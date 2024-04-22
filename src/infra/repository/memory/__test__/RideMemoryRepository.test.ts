import EnterpriseEntity from '../../../../domain/EnterpriseEntity';
import RideEntity from '../../../../domain/RideEntity';
import User from '../../../../domain/User';
import Bus from '../../../../domain/Bus';
import RouteEntity from '../../../../domain/RouteEntity';

import RideMemoryRepository from '../RideMemoryRepository';
import EnterpriseMemoryRepository from '../EnterpriseMemoryRepository';
import UserMemoryRepository from '../UserMemoryRepository';
import BusMemoryRepository from '../BusMemoryRepository';
import RouteMemoryRepository from '../RouteMemoryRepository';

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
async function registerBus() {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const repo = new BusMemoryRepository();
  const bus = Bus.create(validInput);
  await repo.save(bus);
  return bus._id;
}
async function registerDriver() {
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
async function registerRoute(enterpriseId: string) {
  const validInputRoute1 = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterpriseId,
  };
  const repo = new RouteMemoryRepository();
  const route = RouteEntity.create(validInputRoute1);
  await repo.save(route);
  return route._id;
}
function compareObject(Ride: any, object: any) {
  expect(Ride.useDate).toStrictEqual(new Date(object.useDate));
  expect(Ride.busId).toBe(object.busId);
  expect(Ride.driverId).toBe(object.driverId);
  expect(Ride.routeId).toBe(object.routeId);
  expect(Ride.clientIdList).toBe(object.clientIdList);
}
it('should test if the database creates a new Ride', async () => {
  const userIdList = [
    await registerUser(),
    await registerUser(),
    await registerUser(),
  ];
  const busId = await registerBus();
  const driverId = await registerDriver();
  const enterpriseId = await registerEnterprise();
  const routeId = await registerRoute(enterpriseId);
  const validInputRide = {
    clientIdList: userIdList,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };
  const Ride = RideEntity.create(validInputRide);
  const RideRepo = new RideMemoryRepository();
  const firstLength = await RideRepo.getLength();
  await RideRepo.save(Ride);
  expect(RideRepo.getOne(Ride._id)).toBeDefined();
  expect(await RideRepo.getLength()).toBe(firstLength + 1);
});

it('should test if the database creates a new Ride with the exact same data', async () => {
  const userIdList = [
    await registerUser(),
    await registerUser(),
    await registerUser(),
  ];
  const busId = await registerBus();
  const driverId = await registerDriver();
  const enterpriseId = await registerEnterprise();
  const routeId = await registerRoute(enterpriseId);
  const validInputRide = {
    clientIdList: userIdList,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };
  const Ride = RideEntity.create(validInputRide);
  const RideRepo = new RideMemoryRepository();
  await RideRepo.save(Ride);
  const getRide = await RideRepo.getOne(Ride._id);
  compareObject(getRide, validInputRide);
});

it('should test if the database deletes a Ride', async () => {
  const userIdList = [
    await registerUser(),
    await registerUser(),
    await registerUser(),
  ];
  const busId = await registerBus();
  const driverId = await registerDriver();
  const enterpriseId = await registerEnterprise();
  const routeId = await registerRoute(enterpriseId);
  const validInputRide = {
    clientIdList: userIdList,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };
  const Ride = RideEntity.create(validInputRide);
  const RideRepo = new RideMemoryRepository();
  const firstLength = await RideRepo.getLength();
  await RideRepo.save(Ride);
  await RideRepo.delete(Ride._id);
  expect(await RideRepo.getLength()).toBe(firstLength);
});

it('should test if the database updates a Ride', async () => {
  const userIdList = [
    await registerUser(),
    await registerUser(),
    await registerUser(),
  ];
  const busId = await registerBus();
  const driverId = await registerDriver();
  const enterpriseId = await registerEnterprise();
  const routeId = await registerRoute(enterpriseId);
  const validInputRide = {
    clientIdList: userIdList,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };
  const Ride = RideEntity.create(validInputRide);
  const RideRepo = new RideMemoryRepository();
  await RideRepo.save(Ride);
  const validInputRide2 = {
    _id: Ride._id,
    clientIdList: userIdList,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2024'),
  };
  const Ride2 = new RideEntity(validInputRide2);
  await RideRepo.update(Ride2);
  const getRide = await RideRepo.getOne(Ride._id);
  compareObject(getRide, validInputRide2);
});

it('should test if the database creates new Rides (test getall)', async () => {
  const userIdList1 = [
    await registerUser(),
    await registerUser(),
    await registerUser(),
  ];
  const userIdList2 = [
    await registerUser(),
    await registerUser(),
    await registerUser(),
  ];
  const busId = await registerBus();
  const driverId = await registerDriver();
  const enterpriseId = await registerEnterprise();
  const routeId = await registerRoute(enterpriseId);
  const validInputRide1 = {
    clientIdList: userIdList1,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };
  const validInputRide2 = {
    clientIdList: userIdList2,
    busId: busId,
    driverId: driverId,
    routeId: routeId,
    useDate: new Date('11-23-2023'),
  };

  const Ride1 = RideEntity.create(validInputRide1);
  const Ride2 = RideEntity.create(validInputRide2);

  const RideRepo = new RideMemoryRepository();
  await RideRepo.save(Ride1);
  await RideRepo.save(Ride2);
  const getAll = await RideRepo.getAll();
  expect(getAll.find((Ride) => Ride._id == Ride1._id)).toBeDefined();
  expect(getAll.find((Ride) => Ride._id == Ride2._id)).toBeDefined();
});

it('should test if the database gives an error if the Ride tries to access a invalid Id', async () => {
  const repo = new RideMemoryRepository();
  expect(() => repo.getOne('invalid Value')).rejects.toThrow(
    new Error('Ride not found'),
  );
});
