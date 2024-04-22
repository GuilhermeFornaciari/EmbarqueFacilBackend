import UserRepositoryInterface from '../../../application/repository/userRepositoryInterface';
import User from '../../../domain/User';
import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
@Injectable()
export default class UserMemoryRepository implements UserRepositoryInterface {
  saltRounds = 5;
  private usersDatabase: Array<any> = [
    {
      _id: 'e0cfa336-747a-486c-bf18-8335fa8aae8b',
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
    },
  ];
  async login(loginData: any): Promise<User> {
    const [userDto] = await this.usersDatabase.filter((user) => {
      user.email == loginData.email;
    });
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
  async save(user: User): Promise<void> {
    const hash = await bcrypt.hash(user.password, this.saltRounds);
    this.usersDatabase.push({
      _id: user._id,
      cpf: user.cpf,
      rg: user.rg,
      name: user.name,
      surname: user.surname,
      phone: user.phone,
      email: user.email,
      password: hash,
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
  async update(userEntity: User): Promise<void> {
    const hash = await bcrypt.hash(userEntity.password, this.saltRounds);
    const userIndex = this.usersDatabase.findIndex(
      (databaseUser) => databaseUser._id === userEntity._id,
    );
    if (userIndex === -1) throw new Error('User not found');
    this.usersDatabase[userIndex] = {
      _id: userEntity._id,
      cpf: userEntity.cpf,
      rg: userEntity.rg,
      name: userEntity.name,
      surname: userEntity.surname,
      phone: userEntity.phone,
      email: userEntity.email,
      password: hash,
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
    };
  }
  async delete(userId: string): Promise<void> {
    const userIndex = this.usersDatabase.findIndex(
      (databaseUser) => databaseUser._id === userId,
    );
    if (userIndex === -1) throw new Error('User not found');
    this.usersDatabase.splice(userIndex, 1);
  }
  async getOne(userId: string): Promise<User> {
    const userDto = this.usersDatabase.find(
      (databaseUser) => databaseUser._id === userId,
    );
    if (!userDto) throw new Error('User not found');
    const user = new User(userDto);
    return user;
  }
  async getAll(): Promise<Array<User>> {
    return this.usersDatabase.map((user) => new User(user));
  }
  async getLength(): Promise<number> {
    return this.usersDatabase.length;
  }
}
