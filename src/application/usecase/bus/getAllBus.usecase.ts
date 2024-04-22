import BusRepositoryInterface from '../../repository/busRepositoryInterface';

export default class UsecaseGetAllBus {
  constructor(readonly repo: BusRepositoryInterface) {}
  async execute(): Promise<Output> {
    const buses = (await this.repo.getAll()).map((bus) => {
      return {
        _id: bus._id,
        capacity: bus.capacity,
        description: bus.description,
      };
    });

    return buses;
  }
}

export type Output = {
  _id: string;
  capacity: number;
  description: string;
}[];
