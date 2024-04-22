import PaymentRepositoryInterface from '../../repository/paymentRepositoryInterface';

export default class UsecaseGetAllPayment {
  constructor(readonly repo: PaymentRepositoryInterface) {}
  async execute(): Promise<Output> {
    const entities = (await this.repo.getAll()).map((entity) => {
      return {
        _id: entity._id,
        enterpriseId: entity.enterpriseId,
        clientId: entity.clientId,
        expireDate: entity.expireDate,
        paidDate: entity.paidDate,
        value: entity.value,
      };
    });

    return entities;
  }
}

export type Output = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  expireDate: Date;
  paidDate?: Date;
  value: number;
}[];
