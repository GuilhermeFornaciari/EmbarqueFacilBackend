import RideRepositoryInterface from '../../repository/RideRepositoryInterface';

export default class UsecaseGetAllRide {
  constructor(readonly repo: RideRepositoryInterface) {}
  async execute(): Promise<Output> {
    const entities = (await this.repo.getAll()).map((entity) => {
      return {
        _id: entity._id,
        clientIdList: entity.clientIdList,
        busId: entity.busId,
        driverId: entity.driverId,
        routeId: entity.routeId,
        useDate: entity.useDate,
      };
    });

    return entities;
  }
}

export type Output = {
  _id: string;
  clientIdList: Array<string>;
  busId: string;
  driverId: string;
  routeId: string;
  useDate: Date;
}[];
