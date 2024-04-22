import PaymentRepositoryInterface from '../../repository/paymentRepositoryInterface';

export default class UsecaseGetOnePayment {
  constructor(readonly repo: PaymentRepositoryInterface) {}
  async execute(_id: Input): Promise<Output> {
    const entity = await this.repo.getOne(_id);
    return {
      _id: entity._id,
      enterpriseId: entity.enterpriseId,
      clientId: entity.clientId,
      expireDate: entity.expireDate,
      paidDate: entity.paidDate,
      value: entity.value,
    };
  }
}

export type Input = string;

export type Output = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  expireDate: Date;
  paidDate?: Date;
  value: number;
};
