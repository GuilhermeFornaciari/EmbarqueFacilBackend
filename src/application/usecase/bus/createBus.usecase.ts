import BusRepositoryInterface from '../../repository/busRepositoryInterface';
import Bus from '../../../domain/Bus';

export default class UsecaseCreateBus {
  constructor(readonly repo: BusRepositoryInterface) {}
  async execute(props: Input): Promise<Output> {
    const bus = Bus.create(props);
    await this.repo.save(bus);
    return {
      _id: bus._id,
      capacity: bus.capacity,
      description: bus.description,
    };
  }

}



export type Input = {
  capacity: number;
  description: string;
};

export type Output = {
  _id: string;
  capacity: number;
  description: string;
};
