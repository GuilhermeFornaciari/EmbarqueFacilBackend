import { model, Schema } from 'mongoose';

export const enterpriseSchema = new Schema({
  _id: { type: String, required: true },
  cnpj: { type: String, required: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  adressStreet: { type: String, required: false },
  adressNumber: { type: String, required: false },
  adressCityId: { type: String, required: false },
  adressDistrict: { type: String, required: false },
  adressCep: { type: String, required: false },
});

const EnterpriseModel = model('enterprise', enterpriseSchema);

export default EnterpriseModel;
