import { Injectable } from '@nestjs/common';
import BusRepositoryInterface from 'src/application/repository/busRepositoryInterface';
import Bus from '../../../../domain/Bus';
import BusModel from '../models/mongooseModelBus';

@Injectable()
export default class BusMemoryRepository implements BusRepositoryInterface {
  Model = BusModel;
  async save(busEntity: Bus): Promise<void> {
    this.Model.create({
      _id: busEntity._id,
      capacity: busEntity.capacity,
      description: busEntity.description,
    });
  }
  async update(busEntity: Bus): Promise<void> {
    const BusEnt = await this.Model.findByIdAndUpdate(
      busEntity._id,
      {
        _id: busEntity._id,
        capacity: busEntity.capacity,
        description: busEntity.description,
      },
      {
        new: true,
      },
    );
    if (!BusEnt) throw new Error('Bus not found');
  }
  async delete(busId: string): Promise<void> {
    const BusEntity = await this.Model.findByIdAndDelete(busId);

    if (!BusEntity) throw new Error('Bus not found');
  }
  async getOne(busId: string): Promise<Bus> {
    const MongooseDto = await this.Model.findById(busId);
    if (!MongooseDto) throw new Error('Bus not found');
    const busDto = {
      _id: MongooseDto._id,
      capacity: MongooseDto.capacity,
      description: MongooseDto.description,
    };
    return new Bus(busDto);
  }
  async getAll(): Promise<Array<Bus>> {
    const MongooseDtoList = await this.Model.find();
    if (!MongooseDtoList) throw new Error('Bus not found');
    return MongooseDtoList.map(
      (MongooseDto) =>
        new Bus({
          _id: MongooseDto._id.toString(),
          capacity: MongooseDto.capacity,
          description: MongooseDto.description,
        }),
    );
  }
  async getLength(): Promise<number> {
    const MongooseDtoList = await this.Model.find();
    return MongooseDtoList.length;
  }
}