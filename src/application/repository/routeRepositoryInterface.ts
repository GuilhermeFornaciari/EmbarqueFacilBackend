import RouteEntity from 'src/domain/RouteEntity';

export default interface RouteRepositoryInterface {
  save(routeEntity: RouteEntity): Promise<void>;
  update(routeEntity: RouteEntity): Promise<void>;
  delete(routeId: string): Promise<void>;
  getOne(routeId: string): Promise<RouteEntity>;
  getAll(): Promise<Array<RouteEntity>>;
  getLength(): Promise<number>;
}
