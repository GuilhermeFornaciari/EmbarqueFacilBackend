import isEmail from 'validator/lib/isEmail';
import { randomUUID } from 'crypto';

export default class EnterpriseEntity {
  constructor(private props: UserDto) {
    if (!isEmail(props.email)) throw new Error('Invalid email');
  }
  static create(props: Omit<UserDto, '_id'>) {
    const _id = randomUUID();
    return new EnterpriseEntity({
      _id,
      ...props,
    });
  }
  get _id() {
    return this.props._id;
  }
  get cnpj() {
    return this.props.cnpj;
  }
  get name() {
    return this.props.name;
  }
  set name(name: string) {
    this.props.name = name;
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
}

export type UserDto = {
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
