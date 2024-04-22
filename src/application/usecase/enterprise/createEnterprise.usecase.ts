import EnterpriseRepositoryInterface from '../../repository/enterpriseRepositoryInterface';
import UserRepositoryInterface from '../../repository/userRepositoryInterface';
import EnterpriseEntity from '../../../domain/EnterpriseEntity';
import UserEntity from '../../../domain/User';

export default class UsecaseCreateEnterprise {
  constructor(
    readonly enterpriseRepo: EnterpriseRepositoryInterface,
    readonly userRepo: UserRepositoryInterface,
  ) {}
  async execute(props: Input): Promise<Output> {
    const enterpriseEntity = EnterpriseEntity.create(props.enterprise);
    const userEntity = UserEntity.create({
      ...props.user,
      idEnterprise: enterpriseEntity._id,
    });
    this.enterpriseRepo.save(enterpriseEntity);
    this.userRepo.save(userEntity);

    return {
      enterprise: {
        _id: enterpriseEntity._id,
        cnpj: enterpriseEntity.cnpj,
        name: enterpriseEntity.name,
        phone: enterpriseEntity.phone,
        email: enterpriseEntity.email,
        adressStreet: enterpriseEntity.adressStreet,
        adressNumber: enterpriseEntity.adressNumber,
        adressCityId: enterpriseEntity.adressCityId,
        adressDistrict: enterpriseEntity.adressDistrict,
        adressCep: enterpriseEntity.adressCep,
      },
      user: {
        _id: userEntity._id,
        cpf: userEntity.cpf,
        rg: userEntity.rg,
        name: userEntity.name,
        surname: userEntity.surname,
        phone: userEntity.phone,
        email: userEntity.email,
        password: userEntity.password,
        birthDate: userEntity.birthDate,
        type: userEntity.type,
        idEnterprise: userEntity.idEnterprise,
        adressStreet: userEntity.adressStreet,
        adressNumber: userEntity.adressNumber,
        adressCityId: userEntity.adressCityId,
        adressDistrict: userEntity.adressDistrict,
        adressCep: userEntity.adressCep,
        responsibleName: userEntity.responsibleName,
        responsibleSurname: userEntity.responsibleSurname,
        responsibleCpf: userEntity.responsibleCpf,
        responsibleEmail: userEntity.responsibleEmail,
      },
    };
  }
}

export type Input = {
  enterprise: {
    cnpj: string;
    name: string;
    phone: string;
    email: string;
    adressStreet: string;
    adressNumber: string;
    adressCityId: string;
    adressDistrict: string;
    adressCep: string;
  };
  user: {
    cpf: string;
    rg: string;
    name: string;
    surname: string;
    phone: string;
    email: string;
    password: string;
    birthDate: string;
    type: string;
    adressStreet: string;
    adressNumber: string;
    adressCityId: string;
    adressDistrict: string;
    adressCep: string;
    responsibleName: string;
    responsibleSurname: string;
    responsibleCpf: string;
    responsibleEmail: string;
  };
};

export type Output = {
  enterprise: {
    _id: string;
    cnpj: string;
    name: string;
    phone: string;
    email: string;
    adressStreet: string;
    adressNumber: string;
    adressCityId: string;
    adressDistrict: string;
    adressCep: string;
  };
  user: {
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
  };
};
