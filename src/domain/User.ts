import isEmail from 'validator/lib/isEmail';
import { config } from 'dotenv';
import { randomUUID } from 'crypto';
config();
export default class User {
  constructor(private props: UserDto) {
    if (!isEmail(props.email)) throw new Error('Invalid email');
  }
  static create(props: Omit<UserDto, '_id'>) {
    const _id = randomUUID();
    return new User({
      _id,
      ...props,
    });
  }

  get _id() {
    return this.props._id;
  }
  get cpf() {
    return this.props.cpf;
  }
  get rg() {
    return this.props.rg;
  }
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
  }
  get surname() {
    return this.props.surname;
  }
  set surname(surname: string) {
    this.props.surname = surname;
  }
  get phone() {
    return this.props.phone;
  }
  set phone(phone: string) {
    this.props.phone = phone;
  }
  get email() {
    return this.props.email;
  }
  set email(email: string) {
    if (!isEmail(email)) throw new Error('Invalid email');
    this.props.email = email;
  }
  get password() {
    return this.props.password;
  }
  set password(password: string) {
    this.props.password = password;
  }
  get birthDate() {
    return this.props.birthDate;
  }
  set birthDate(birthDate: string) {
    this.props.birthDate = birthDate;
  }
  get type() {
    return this.props.type;
  }
  set type(type: string) {
    this.props.type = type;
  }
  get idEnterprise() {
    return this.props.idEnterprise;
  }
  set idEnterprise(idEnterprise: string) {
    this.props.idEnterprise = idEnterprise;
  }
  get adressStreet() {
    return this.props.adressStreet;
  }
  set adressStreet(adressStreet: string) {
    this.props.adressStreet = adressStreet;
  }
  get adressNumber() {
    return this.props.adressNumber;
  }
  set adressNumber(adressNumber: string) {
    this.props.adressNumber = adressNumber;
  }
  get adressCityId() {
    return this.props.adressCityId;
  }
  set adressCityId(adressCityId: string) {
    this.props.adressCityId = adressCityId;
  }
  get adressDistrict() {
    return this.props.adressDistrict;
  }
  set adressDistrict(adressDistrict: string) {
    this.props.adressDistrict = adressDistrict;
  }
  get adressCep() {
    return this.props.adressCep;
  }
  set adressCep(adressCep: string) {
    this.props.adressCep = adressCep;
  }
  get responsibleName() {
    return this.props.responsibleName;
  }
  set responsibleName(responsibleName: string) {
    this.props.responsibleName = responsibleName;
  }
  get responsibleSurname() {
    return this.props.responsibleSurname;
  }
  set responsibleSurname(responsibleSurname: string) {
    this.props.responsibleSurname = responsibleSurname;
  }
  get responsibleCpf() {
    return this.props.responsibleCpf;
  }
  set responsibleCpf(responsibleCpf: string) {
    this.props.responsibleCpf = responsibleCpf;
  }
  get responsibleEmail() {
    return this.props.responsibleEmail;
  }
  set responsibleEmail(responsibleEmail: string) {
    this.props.responsibleEmail = responsibleEmail;
  }
}

export type UserDto = {
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
