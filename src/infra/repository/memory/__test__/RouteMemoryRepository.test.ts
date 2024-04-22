import EnterpriseEntity from '../../../../domain/EnterpriseEntity';
import Route from '../../../../domain/RouteEntity';

import RouteMemoryRepository from '../RouteMemoryRepository';
import EnterpriseMemoryRepository from '../EnterpriseMemoryRepository';

function compareObject(route: Route, object: any) {
  expect(route.description).toBe(object.description);
  expect(route.startTime).toBe(object.startTime);
  expect(route.enterpriseId).toBe(object.enterpriseId);
}

it('should test if the database creates a new Route', async () => {
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

  const validInputRoute = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const route = Route.create(validInputRoute);
  const RouteRepo = new RouteMemoryRepository();
  const firstLength = await RouteRepo.getLength();
  await RouteRepo.save(route);
  expect(RouteRepo.getOne(route._id)).toBeDefined();
  expect(await RouteRepo.getLength()).toBe(firstLength + 1);
});
it('should test if the database creates a new Route with the exact same data', async () => {
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

  const validInputRoute = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const route = Route.create(validInputRoute);
  const RouteRepo = new RouteMemoryRepository();
  await RouteRepo.save(route);
  const getRoute = await RouteRepo.getOne(route._id);
  compareObject(getRoute, validInputRoute);
});

it('should test if the database deletes a Route', async () => {
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

  const validInputRoute = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const route = Route.create(validInputRoute);
  const RouteRepo = new RouteMemoryRepository();
  const firstLength = await RouteRepo.getLength();
  await RouteRepo.save(route);
  await RouteRepo.delete(route._id);
  expect(await RouteRepo.getLength()).toBe(firstLength);
});

it('should test if the database updates a Route', async () => {
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

  const validInputRoute = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const route = Route.create(validInputRoute);
  const RouteRepo = new RouteMemoryRepository();
  await RouteRepo.save(route);

  const validInputRoute2 = {
    _id: route._id,
    startTime: '08:00:00',
    description: 'Another valid Description',
    enterpriseId: enterprise._id,
  };
  const route2 = new Route(validInputRoute2);
  RouteRepo.update(route2);
  const getRoute = await RouteRepo.getOne(route._id);
  compareObject(getRoute, validInputRoute2);
});

it('should test if the database creates new Routes (test getall)', async () => {
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

  const validInputRoute1 = {
    startTime: '07:00:00',
    description: 'A valid Description',
    enterpriseId: enterprise._id,
  };
  const validInputRoute2 = {
    startTime: '08:00:00',
    description: 'Another valid Description',
    enterpriseId: enterprise._id,
  };

  const route1 = Route.create(validInputRoute1);
  const route2 = Route.create(validInputRoute2);

  const RouteRepo = new RouteMemoryRepository();
  await RouteRepo.save(route1);
  await RouteRepo.save(route2);

  const getAll = await RouteRepo.getAll();
  expect(getAll.find((Route) => Route._id == route1._id)).toBeDefined();
  expect(getAll.find((Route) => Route._id == route2._id)).toBeDefined();
});

it('should test if the database gives an error if the Route tries to access a invalid Id', async () => {
  const repo = new RouteMemoryRepository();
  expect(() => repo.getOne('invalid Value')).rejects.toThrow(
    new Error('Route not found'),
  );
});
