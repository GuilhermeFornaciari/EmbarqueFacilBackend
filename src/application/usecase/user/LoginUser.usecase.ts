import UserRepositoryInterface from 'src/application/repository/userRepositoryInterface';
import * as JWT from 'jsonwebtoken';
import { config } from 'dotenv';
config();

export default class UsecaseLoginUser {
  constructor(readonly repo: UserRepositoryInterface) {}
  async execute(props: Input): Promise<Output> {
    const user = await this.repo.login(props);
    if (!user) throw new Error('Invalid credentials');
    const secretJWTKey = process.env.SecretJWTKey;
    const token = await JWT.sign(
      { userId: user._id, type: user.type },
      secretJWTKey,
      { expiresIn: 60 * 60 * 24 },
    );
    return {
      token: token,
      user: {
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
      },
    };
  }
}

export type Input = {
  email: string;
  password: string;
};

export type Output = {
  token: string;
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
