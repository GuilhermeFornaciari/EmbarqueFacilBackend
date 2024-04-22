import UserRepositoryInterface from 'src/application/repository/userRepositoryInterface';
import User from '../../../../domain/User';
import { Injectable } from '@nestjs/common';
import UserModel from '../models/mongooseModelUser';
import * as bcrypt from 'bcrypt';

@Injectable()
export default class UserMongooseRepository implements UserRepositoryInterface {
  saltRounds = 5;
  async login(loginData: any): Promise<User> {
    const userDto = await this.model.findOne({ email: loginData.email });
    if (!userDto) throw new Error('User not found');
    const PasswordIsValid = await bcrypt.compare(
      loginData.password,
      userDto.password,
    );
    if (!PasswordIsValid) throw new Error('Invalid Credentials');
    return new User({
      _id: userDto._id,
      cpf: userDto.cpf,
      rg: userDto.rg,
      name: userDto.name,
      surname: userDto.surname,
      phone: userDto.phone,
      email: userDto.email,
      password: userDto.password,
      birthDate: userDto.birthDate,
      type: userDto.type,
      idEnterprise: userDto.idEnterprise,
      adressStreet: userDto.adressStreet,
      adressNumber: userDto.adressNumber,
      adressCityId: userDto.adressCityId,
      adressDistrict: userDto.adressDistrict,
      adressCep: userDto.adressCep,
      responsibleName: userDto.responsibleName,
      responsibleSurname: userDto.responsibleSurname,
      responsibleCpf: userDto.responsibleCpf,
      responsibleEmail: userDto.responsibleEmail,
    });
  }
  model = UserModel;
  async save(user: User): Promise<void> {
    const hash = await bcrypt.hash(user.password, this.saltRounds);

    this.model.create({
      _id: user._id,
      cpf: user.cpf,
      rg: user.rg,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
      password: String(hash),
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
    });
  }
  async update(UserEntity: User): Promise<void> {
    const hash = await bcrypt.hash(UserEntity.password, this.saltRounds);

    const user = await this.model.findByIdAndUpdate(
      UserEntity._id,
      {
        _id: UserEntity._id,
        cpf: UserEntity.cpf,
        rg: UserEntity.rg,
        name: UserEntity.name,
        surname: UserEntity.surname,
        phone: UserEntity.phone,
        email: UserEntity.email,
        password: hash,
        birthDate: UserEntity.birthDate,
        type: UserEntity.type,
        idEnterprise: UserEntity.idEnterprise,
        adressStreet: UserEntity.adressStreet,
        adressNumber: UserEntity.adressNumber,
        adressCityId: UserEntity.adressCityId,
        adressDistrict: UserEntity.adressDistrict,
        adressCep: UserEntity.adressCep,
        responsibleName: UserEntity.responsibleName,
        responsibleSurname: UserEntity.responsibleSurname,
        responsibleCpf: UserEntity.responsibleCpf,
        responsibleEmail: UserEntity.responsibleEmail,
      },
      { new: true },
    );
    if (!user) throw new Error('User not found');
  }
  async delete(UserId: string): Promise<void> {
    const User = await this.model.findByIdAndDelete(UserId);
    if (!User) throw new Error('User not found');
  }
  async getOne(UserId: string): Promise<User> {
    const UserDto = await this.model.findById(UserId);
    if (!UserDto) throw new Error('User not found');
    return new User({
      _id: UserDto._id,
      cpf: UserDto.cpf,
      rg: UserDto.rg,
      name: UserDto.name,
      surname: UserDto.surname,
      phone: UserDto.phone,
      email: UserDto.email,
      password: UserDto.password,
      birthDate: UserDto.birthDate,
      type: UserDto.type,
      idEnterprise: UserDto.idEnterprise,
      adressStreet: UserDto.adressStreet,
      adressNumber: UserDto.adressNumber,
      adressCityId: UserDto.adressCityId,
      adressDistrict: UserDto.adressDistrict,
      adressCep: UserDto.adressCep,
      responsibleName: UserDto.responsibleName,
      responsibleSurname: UserDto.responsibleSurname,
      responsibleCpf: UserDto.responsibleCpf,
      responsibleEmail: UserDto.responsibleEmail,
    });
  }
  async getAll(): Promise<Array<User>> {
    const Users = await this.model.find();
    return Users.map(
      (UserDto) =>
        new User({
          _id: UserDto._id,
          cpf: UserDto.cpf,
          rg: UserDto.rg,
          name: UserDto.name,
          surname: UserDto.surname,
          phone: UserDto.phone,
          email: UserDto.email,
          password: UserDto.password,
          birthDate: UserDto.birthDate,
          type: UserDto.type,
          idEnterprise: UserDto.idEnterprise,
          adressStreet: UserDto.adressStreet,
          adressNumber: UserDto.adressNumber,
          adressCityId: UserDto.adressCityId,
          adressDistrict: UserDto.adressDistrict,
          adressCep: UserDto.adressCep,
          responsibleName: UserDto.responsibleName,
          responsibleSurname: UserDto.responsibleSurname,
          responsibleCpf: UserDto.responsibleCpf,
          responsibleEmail: UserDto.responsibleEmail,
        }),
    );
  }
  async getLength(): Promise<number> {
    return (await this.model.find()).length;
  }
}
