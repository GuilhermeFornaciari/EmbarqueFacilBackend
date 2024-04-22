import Bus from 'src/domain/Bus';

export default interface BusRepositoryInterface {
  save(bus: Bus): Promise<void>;
  update(bus: Bus): Promise<void>;
  delete(busId: string): Promise<void>;
  getOne(busId: string): Promise<Bus>;
  getAll(): Promise<Array<Bus>>;
  getLength(): Promise<number>;
}
