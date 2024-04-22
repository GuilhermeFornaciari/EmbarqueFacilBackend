import { randomUUID } from 'crypto';

export default class Bus {
  constructor(private props: BusDto) {}
  static create(props: Omit<BusDto, '_id'>) {
    const _id = randomUUID();
    return new Bus({
      _id,
      ...props,
    });
  }

  get _id() {
    return this.props._id;
  }
  set _id(_id: string) {
    this.props._id = _id;
  }
  get capacity() {
    return this.props.capacity;
  }
  set capacity(capacity: number) {
    this.props.capacity = capacity;
  }
  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }
}

export type BusDto = {
  _id: string;
  capacity: number;
  description: string;
};
