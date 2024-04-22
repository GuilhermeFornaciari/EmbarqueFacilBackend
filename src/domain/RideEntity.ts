import { randomUUID } from 'crypto';
export default class PaymentEntity {
  private _useDate: Date;
  constructor(private props: PaymentDto) {
    this.useDate = props.useDate;
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
  get clientIdList() {
    return this.props.clientIdList;
  }
  get busId() {
    return this.props.busId;
  }
  get driverId() {
    return this.props.driverId;
  }
  get routeId() {
    return this.props.routeId;
  }
  get useDate() {
    return this._useDate;
  }
  set useDate(useDate: Date) {
    this._useDate = useDate;
  }
}

export type PaymentDto = {
  _id: string;
  clientIdList: Array<string>;
  busId: string;
  driverId: string;
  routeId: string;
  useDate: Date;
};
