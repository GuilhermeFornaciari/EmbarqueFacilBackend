import BusRepositoryInterface from '../../repository/busRepositoryInterface';
import Bus from '../../../domain/Bus';

export default class UsecaseUpdateBus {
  constructor(readonly repo: BusRepositoryInterface) {}
  async execute(busData: Input): Promise<Output> {
    const bus = new Bus(busData);
    await this.repo.update(bus);
    return {
      _id: bus._id,
      capacity: bus.capacity,
      description: bus.description,
    };
  }
}

export type Input = {
  _id: string;
  capacity: number;
  description: string;
};

export type Output = {
  _id: string;
  capacity: number;
  description: string;
};
