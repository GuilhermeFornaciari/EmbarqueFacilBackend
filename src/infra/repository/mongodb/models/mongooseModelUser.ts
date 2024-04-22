import { model, Schema } from 'mongoose';

export const UserSchema = new Schema({
  _id: { type: String, required: true },
  cpf: { type: String, required: true },
  rg: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  birthDate: { type: String, required: true },
  type: { type: String, required: true },
  idEnterprise: { type: String, required: true },
  adressStreet: { type: String, required: false },
  adressNumber: { type: String, required: false },
  adressCityId: { type: String, required: false },
  adressDistrict: { type: String, required: false },
  adressCep: { type: String, required: false },
  responsibleName: { type: String, required: false },
  responsibleSurname: { type: String, required: false },
  responsibleCpf: { type: String, required: false },
  responsibleEmail: { type: String, required: false },
});

const UserModel = model('user', UserSchema);

export default UserModel;
