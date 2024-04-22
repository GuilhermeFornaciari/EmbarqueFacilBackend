import RideRepositoryInterface from '../../repository/RideRepositoryInterface';
import RideEntity from '../../../domain/RideEntity';

export default class UsecaseUpdateRide {
  constructor(readonly repo: RideRepositoryInterface) {}
  async execute(entityData: Input): Promise<Output> {
    const entity = new RideEntity(entityData);
    await this.repo.update(entity);
    return {
      _id: entity._id,
      clientIdList: entity.clientIdList,
      busId: entity.busId,
      driverId: entity.driverId,
      routeId: entity.routeId,
      useDate: entity.useDate,
    };
  }
}

export type Input = {
  _id: string;
  clientIdList: Array<string>;
  busId: string;
  driverId: string;
  routeId: string;
  useDate: Date;
};

export type Output = {
  _id: string;
  clientIdList: Array<string>;
  busId: string;
  driverId: string;
  routeId: string;
  useDate: Date;
};
