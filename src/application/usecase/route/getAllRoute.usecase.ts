import RouteRepositoryInterface from '../../repository/routeRepositoryInterface';

export default class UsecaseGetAllRoute {
  constructor(readonly repo: RouteRepositoryInterface) {}
  async execute(): Promise<Output> {
    const entities = (await this.repo.getAll()).map((entity) => {
      return {
        _id: entity._id,
        startTime: entity.startTime,
        enterpriseId: entity.enterpriseId,
        description: entity.description,
      };
    });
    return entities;
  }
}

export type Output = {
  _id: string;
  startTime: string;
  enterpriseId: string;
  description: string;
}[];
