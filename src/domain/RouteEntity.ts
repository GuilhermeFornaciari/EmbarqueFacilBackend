import { randomUUID } from 'crypto';

export default class RouteEntity {
  constructor(private props: RouteDto) {}
  static create(props: Omit<RouteDto, '_id'>) {
    const _id = randomUUID();
    return new RouteEntity({
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
  get startTime(): string {
    return this.props.startTime;
  }
  set startTime(startTime: string) {
    this.props.startTime = startTime;
  }
  get enterpriseId() {
    return this.props.enterpriseId;
  }
  get description() {
    return this.props.description;
  }
  set description(description: string) {
    this.props.description = description;
  }
}
export type RouteDto = {
  _id: string;
  startTime: string;
  enterpriseId: string;
  description: string;
};
