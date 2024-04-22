import { Injectable } from '@nestjs/common';
import RideRepositoryInterface from 'src/application/repository/RideRepositoryInterface';
import RideEntity from '../../../../domain/RideEntity';
@Injectable()
export default class RideMemoryRepository implements RideRepositoryInterface {
  private RideDatabase: Array<any> = [];
  async save(RideEntity: RideEntity): Promise<void> {
    this.RideDatabase.push({
      _id: RideEntity._id,
      clientIdList: RideEntity.clientIdList,
      busId: RideEntity.busId,
      driverId: RideEntity.driverId,
      routeId: RideEntity.routeId,
      useDate: RideEntity.useDate,
    });
  }
  async update(RideEntity: RideEntity): Promise<void> {
    const index = this.RideDatabase.findIndex(
      (databaseRide) => databaseRide._id === RideEntity._id,
    );
    if (index === -1) throw new Error('Ride not found');
    const RideObj = {
      _id: RideEntity._id,
      clientIdList: RideEntity.clientIdList,
      busId: RideEntity.busId,
      driverId: RideEntity.driverId,
      routeId: RideEntity.routeId,
      useDate: RideEntity.useDate,
    };
    this.RideDatabase[index] = RideObj;
  }
  async delete(RideId: string): Promise<void> {
    const index = this.RideDatabase.findIndex(
      (databaseRide) => databaseRide._id === RideId,
    );
    if (index === -1) throw new Error('Ride not found');
    this.RideDatabase.splice(index, 1);
  }
  async getOne(RideId: string): Promise<RideEntity> {
    const dto = this.RideDatabase.find(
      (databaseRide) => databaseRide._id === RideId,
    );
    if (!dto) throw new Error('Ride not found');
    const Ride = new RideEntity(dto);
    return Ride;
  }
  async getAll(): Promise<Array<RideEntity>> {
    return this.RideDatabase.map((Ride) => new RideEntity(Ride));
  }
  async getLength(): Promise<number> {
    return this.RideDatabase.length;
  }
}
