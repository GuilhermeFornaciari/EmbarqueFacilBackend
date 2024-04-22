import RouteRepositoryInterface from '../../repository/routeRepositoryInterface';
import RouteEntity from '../../../domain/RouteEntity';

export default class UsecaseUpdateRoute {
  constructor(readonly repo: RouteRepositoryInterface) {}
  async execute(routeData: Input): Promise<Output> {
    const entity = new RouteEntity(routeData);
    await this.repo.update(entity);
    return {
      _id: entity._id,
      startTime: entity.startTime,
      enterpriseId: entity.enterpriseId,
      description: entity.description,
    };
  }
}

export type Input = {
  _id: string;
  startTime: string;
  enterpriseId: string;
  description: string;
};

export type Output = {
  _id: string;
  startTime: string;
  enterpriseId: string;
  description: string;
};
