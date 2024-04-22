import UserRepositoryInterface from 'src/application/repository/userRepositoryInterface';

export default class UsecaseGetAllUser {
  constructor(readonly repo: UserRepositoryInterface) {}
  async execute(): Promise<Output> {
    const users = (await this.repo.getAll()).map((user) => {
      return {
        _id: user._id,
        cpf: user.cpf,
        rg: user.rg,
        name: user.name,
        surname: user.surname,
        phone: user.phone,
        email: user.email,
        password: user.password,
        birthDate: user.birthDate,
        type: user.type,
        idEnterprise: user.idEnterprise,
        adressStreet: user.adressStreet,
        adressNumber: user.adressNumber,
        adressCityId: user.adressCityId,
        adressDistrict: user.adressDistrict,
        adressCep: user.adressCep,
        responsibleName: user.responsibleName,
        responsibleSurname: user.responsibleSurname,
        responsibleCpf: user.responsibleCpf,
        responsibleEmail: user.responsibleEmail,
      };
    });

    return users;
  }
}

export type Output = {
  _id: string;
  cpf: string;
  rg: string;
  name: string;
  surname: string;
  phone: string;
  email: string;
  password: string;
  birthDate: string;
  type: string;
  idEnterprise: string;
  adressStreet: string;
  adressNumber: string;
  adressCityId: string;
  adressDistrict: string;
  adressCep: string;
  responsibleName: string;
  responsibleSurname: string;
  responsibleCpf: string;
  responsibleEmail: string;
}[];
