import User from '../User';

it('should give an error "Invalid email" if the user is created', () => {
  const input = {
    cpf: '70116562277',
    rg: '1551035',
    name: 'Guilherme',
    surname: 'Fornaciari',
    phone: '69984696665',
    email: 'fornaciari049gmail.com',
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
  expect(() => User.create(input)).toThrow(new Error('Invalid email'));
});

it('should test if the user is created', () => {
  const input = {
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
  const user = User.create(input);
  expect(user.cpf).toBe(input.cpf);
  expect(user.rg).toBe(input.rg);
  expect(user.name).toBe(input.name);
  expect(user.surname).toBe(input.surname);
  expect(user.phone).toBe(input.phone);
  expect(user.email).toBe(input.email);
  expect(user.password).toBe(input.password);
  expect(user.birthDate).toBe(input.birthDate);
  expect(user.type).toBe(input.type);
  expect(user.idEnterprise).toBe(input.idEnterprise);

  expect(user.adressStreet).toBe(input.adressStreet);
  expect(user.adressNumber).toBe(input.adressNumber);
  expect(user.adressCityId).toBe(input.adressCityId);
  expect(user.adressDistrict).toBe(input.adressDistrict);
  expect(user.adressCep).toBe(input.adressCep);

  expect(user.responsibleName).toBe(input.responsibleName);
  expect(user.responsibleSurname).toBe(input.responsibleSurname);
  expect(user.responsibleCpf).toBe(input.responsibleCpf);
  expect(user.responsibleEmail).toBe(input.responsibleEmail);
});
