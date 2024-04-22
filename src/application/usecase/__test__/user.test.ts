import UserMemoryRepository from '../../../infra/repository/memory/UserMemoryRepository';
import UsecaseCreateUser from '../user/createUser.usecase';

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

it('should test if CreateUser actually creates a new user', async () => {
  const repo = new UserMemoryRepository();
  const usecasecreate = new UsecaseCreateUser(repo);
  const firstLength = await repo.getLength();
  await usecasecreate.execute(validInput);
  expect(await repo.getLength()).toBe(firstLength + 1);
});
