import Enterprise from 'src/domain/EnterpriseEntity';

export default interface EnterpriseRepositoryInterface {
  save(enterprise: Enterprise): Promise<void>;
  update(enterprise: Enterprise): Promise<void>;
  delete(enterpriseId: string): Promise<void>;
  getOne(enterpriseId: string): Promise<Enterprise>;
  getAll(): Promise<Array<Enterprise>>;
  getLength(): Promise<number>;
}
