import { Injectable } from '@nestjs/common';
import BusRepositoryInterface from '../../../application/repository/busRepositoryInterface';
import Bus from '../../../domain/Bus';
@Injectable()
export default class BusMemoryRepository implements BusRepositoryInterface {
  private busDatabase: Array<any> = [];
  async save(busEntity: Bus): Promise<void> {
    this.busDatabase.push({
      _id: busEntity._id,
      capacity: busEntity.capacity,
      description: busEntity.description,
    });
  }
  async update(busEntity: Bus): Promise<void> {
    const index = this.busDatabase.findIndex(
      (databaseBus) => databaseBus._id === busEntity._id,
    );
    if (index === -1) throw new Error('Bus not found');
    this.busDatabase[index] = busEntity;
  }
  async delete(busId: string): Promise<void> {
    const index = this.busDatabase.findIndex(
      (databaseBus) => databaseBus._id === busId,
    );
    if (index === -1) throw new Error('Bus not found');
    this.busDatabase.splice(index, 1);
  }
  async getOne(busId: string): Promise<Bus> {
    const dto = this.busDatabase.find(
      (databaseBus) => databaseBus._id === busId,
    );
    if (!dto) throw new Error('Bus not found');
    const bus = new Bus(dto);
    return bus;
  }
  async getAll(): Promise<Array<Bus>> {
    return this.busDatabase.map((bus) => new Bus(bus));
  }
  async getLength(): Promise<number> {
    return this.busDatabase.length;
  }
}
