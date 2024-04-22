import PaymentEntity from 'src/domain/PaymentEntity';

export default interface PaymentRepositoryInterface {
  save(paymentEntity: PaymentEntity): Promise<void>;
  update(paymentEntity: PaymentEntity): Promise<void>;
  delete(paymentId: string): Promise<void>;
  getOne(paymentId: string): Promise<PaymentEntity>;
  getAll(): Promise<Array<PaymentEntity>>;
  getLength(): Promise<number>;
}
