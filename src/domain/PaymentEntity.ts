import { randomUUID } from 'crypto';
export default class PaymentEntity {
  private _paidDate: Date;
  private _expireDate: Date;
  constructor(private props: PaymentDto) {
    this._expireDate = new Date(props.expireDate);
    this._paidDate = this.props.paidDate ? new Date(props.paidDate) : undefined;
  }
  static create(props: Omit<PaymentDto, '_id'>) {
    const _id = randomUUID();
    return new PaymentEntity({
      _id,
      ...props,
    });
  }

  get _id() {
    return this.props._id;
  }
  get enterpriseId() {
    return this.props.enterpriseId;
  }
  get clientId() {
    return this.props.clientId;
  }
  get expireDate() {
    return this._expireDate;
  }
  set expireDate(expireDate: Date) {
    this._expireDate = expireDate;
  }
  get paidDate() {
    return this._paidDate;
  }
  set paidDate(paidDate: Date) {
    this._paidDate = paidDate;
  }
  get value() {
    return this.props.value;
  }
  set value(value: number) {
    this.props.value = value;
  }
}

export type PaymentDto = {
  _id: string;
  enterpriseId: string;
  clientId: string;
  expireDate: string;
  paidDate?: string;
  value: number;
};
