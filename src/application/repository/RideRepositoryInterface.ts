import RideEntity from 'src/domain/RideEntity';

export default interface RideRepositoryInterface {
  save(rideEntity: RideEntity): Promise<void>;
  update(rideEntity: RideEntity): Promise<void>;
  delete(rideId: string): Promise<void>;
  getOne(rideId: string): Promise<RideEntity>;
  getAll(): Promise<Array<RideEntity>>;
  getLength(): Promise<number>;
}
