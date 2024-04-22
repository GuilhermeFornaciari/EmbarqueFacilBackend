import { Injectable } from '@nestjs/common';
import PaymentRepositoryInterface from 'src/application/repository/PaymentRepositoryInterface';
import PaymentEntity from '../../../../domain/PaymentEntity';
@Injectable()
export default class PaymentMemoryRepository
  implements PaymentRepositoryInterface
{
  private PaymentDatabase: Array<any> = [];
  async save(PaymentEntity: PaymentEntity): Promise<void> {
    this.PaymentDatabase.push({
      _id: PaymentEntity._id,
      enterpriseId: PaymentEntity.enterpriseId,
      clientId: PaymentEntity.clientId,
      expireDate: PaymentEntity.expireDate,
      paidDate: PaymentEntity.paidDate,
      value: PaymentEntity.value,
    });
  }
  async update(PaymentEntity: PaymentEntity): Promise<void> {
    const index = this.PaymentDatabase.findIndex(
      (databasePayment) => databasePayment._id === PaymentEntity._id,
    );
    if (index === -1) throw new Error('Payment not found');
    const paymentObj = {
      _id: PaymentEntity._id,
      enterpriseId: PaymentEntity.enterpriseId,
      clientId: PaymentEntity.clientId,
      expireDate: PaymentEntity.expireDate,
      paidDate: PaymentEntity.paidDate,
      value: PaymentEntity.value,
    };
    this.PaymentDatabase[index] = paymentObj;
  }
  async delete(PaymentId: string): Promise<void> {
    const index = this.PaymentDatabase.findIndex(
      (databasePayment) => databasePayment._id === PaymentId,
    );
    if (index === -1) throw new Error('Payment not found');
    this.PaymentDatabase.splice(index, 1);
  }
  async getOne(PaymentId: string): Promise<PaymentEntity> {
    const dto = this.PaymentDatabase.find(
      (databasePayment) => databasePayment._id === PaymentId,
    );
    if (!dto) throw new Error('Payment not found');
    const Payment = new PaymentEntity(dto);
    return Payment;
  }
  async getAll(): Promise<Array<PaymentEntity>> {
    return this.PaymentDatabase.map((Payment) => new PaymentEntity(Payment));
  }
  async getLength(): Promise<number> {
    return this.PaymentDatabase.length;
  }
}
