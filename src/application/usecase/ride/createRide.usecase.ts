import RideRepositoryInterface from '../../repository/RideRepositoryInterface';
import RideEntity from '../../../domain/RideEntity';

export default class UsecaseCreateRide {
  constructor(readonly repo: RideRepositoryInterface) {}
  async execute(props: Input): Promise<Output> {
    const entity = RideEntity.create(props);
    await this.repo.save(entity);
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
