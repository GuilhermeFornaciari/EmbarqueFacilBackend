import PaymentRepositoryInterface from '../../repository/paymentRepositoryInterface';
import PaymentEntity from '../../../domain/PaymentEntity';

export default class UsecaseUpdatePayment {
  constructor(readonly repo: PaymentRepositoryInterface) {}
  async execute(entityData: Input): Promise<Output> {
    const entity = new PaymentEntity(entityData);
    await this.repo.update(entity);
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

export type Input = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  expireDate: string;
  paidDate?: string;
  value: number;
};

export type Output = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  expireDate: Date;
  paidDate?: Date;
  value: number;
};
