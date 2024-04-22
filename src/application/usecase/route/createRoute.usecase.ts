import RouteRepositoryInterface from '../../repository/routeRepositoryInterface';
import RouteEntity from '../../../domain/RouteEntity';

export default class UsecaseCreateRoute {
  constructor(readonly repo: RouteRepositoryInterface) {}
  async execute(props: Input): Promise<Output> {
    const entity = RouteEntity.create(props);
    await this.repo.save(entity);
    return {
      _id: entity._id,
      startTime: entity.startTime,
      enterpriseId: entity.enterpriseId,
      description: entity.description,
    };
  }
}

export type Input = {
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
