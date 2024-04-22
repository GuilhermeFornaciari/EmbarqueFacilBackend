import RouteRepositoryInterface from '../../repository/routeRepositoryInterface';

export default class UsecaseGetOneRoute {
  constructor(readonly repo: RouteRepositoryInterface) {}
  async execute(_id: Input): Promise<Output> {
    const entity = await this.repo.getOne(_id);
    return {
      _id: entity._id,
      startTime: entity.startTime,
      enterpriseId: entity.enterpriseId,
      description: entity.description,
    };
  }
}

export type Input = string;

export type Output = {
  _id: string;
  startTime: string;
  enterpriseId: string;
  description: string;
};
