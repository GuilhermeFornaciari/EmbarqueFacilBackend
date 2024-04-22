import PaymentRepositoryInterface from '../../repository/paymentRepositoryInterface';

export default class UsecaseDeletePayment {
  constructor(readonly repo: PaymentRepositoryInterface) {}
  async execute(PaymentId: Input): Promise<void> {
    this.repo.delete(PaymentId);
  }
}

export type Input = string;
