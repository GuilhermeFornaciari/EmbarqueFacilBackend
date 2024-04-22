import RideRepositoryInterface from '../../repository/RideRepositoryInterface';

export default class UsecaseDeletePayment {
  constructor(readonly repo: RideRepositoryInterface) {}
  async execute(PaymentId: Input): Promise<void> {
    this.repo.delete(PaymentId);
  }
}

export type Input = string;
