import RideRepositoryInterface from '../../repository/RideRepositoryInterface';

export default class UsecaseGetOneRide {
  constructor(readonly repo: RideRepositoryInterface) {}
  async execute(_id: Input): Promise<Output> {
    const entity = await this.repo.getOne(_id);
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

export type Input = string;

export type Output = {
  _id: string;
  clientIdList: Array<string>;
  busId: string;
  driverId: string;
  routeId: string;
  useDate: Date;
};
