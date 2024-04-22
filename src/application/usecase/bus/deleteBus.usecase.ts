import BusRepositoryInterface from '../../repository/busRepositoryInterface';

export default class UsecaseDeleteBus {
  constructor(readonly repo: BusRepositoryInterface) {}
  async execute(busId: Input): Promise<void> {
    this.repo.delete(busId);
  }
}

export type Input = string;
