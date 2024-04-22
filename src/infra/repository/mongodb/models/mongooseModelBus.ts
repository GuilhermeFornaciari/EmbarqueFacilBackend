import { model, Schema } from 'mongoose';

export const busSchema = new Schema({
  _id: { type: String, required: true },
  description: { type: String, required: true },
  capacity: { type: Number, required: true },
});

const busModel = model('bus', busSchema);

export default busModel;
