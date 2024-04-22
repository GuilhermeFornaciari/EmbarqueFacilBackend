import BusRepositoryInterface from '../../repository/busRepositoryInterface';

export default class UsecaseGetOneBus {
  constructor(readonly repo: BusRepositoryInterface) {}
  async execute(_id: Input): Promise<Output> {
    const bus = await this.repo.getOne(_id);
    return {
      _id: bus._id,
      capacity: bus.capacity,
      description: bus.description,
    };
  }
}

export type Input = string;

export type Output = {
  _id: string;
  capacity: number;
  description: string;
};
