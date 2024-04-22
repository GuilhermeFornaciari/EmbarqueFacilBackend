import { Injectable } from '@nestjs/common';
import EnterpriseRepositoryInterface from '../../../application/repository/enterpriseRepositoryInterface';
import EnterpriseEntity from '../../../domain/EnterpriseEntity';
@Injectable()
export default class EnterpriseMemoryRepository
  implements EnterpriseRepositoryInterface
{
  private enterpriseDatabase: Array<any> = [];
  async save(enterpriseEntity: EnterpriseEntity): Promise<void> {
    this.enterpriseDatabase.push({
      _id: enterpriseEntity._id,
      cnpj: enterpriseEntity.cnpj,
      name: enterpriseEntity.name,
      phone: enterpriseEntity.phone,
      email: enterpriseEntity.email,
      adressStreet: enterpriseEntity.adressStreet,
      adressNumber: enterpriseEntity.adressNumber,
      adressCityId: enterpriseEntity.adressCityId,
      adressDistrict: enterpriseEntity.adressDistrict,
      adressCep: enterpriseEntity.adressCep,
    });
  }
  async update(enterpriseEntity: EnterpriseEntity): Promise<void> {
    const index = this.enterpriseDatabase.findIndex(
      (databaseEnterprise) => databaseEnterprise._id === enterpriseEntity._id,
    );
    if (index === -1) throw new Error('Enterprise not found');
    this.enterpriseDatabase[index] = enterpriseEntity;
  }
  async delete(enterpriseId: string): Promise<void> {
    const index = this.enterpriseDatabase.findIndex(
      (databaseEnterprise) => databaseEnterprise._id === enterpriseId,
    );
    if (index === -1) throw new Error('Enterprise not found');
    this.enterpriseDatabase.splice(index, 1);
  }
  async getOne(enterpriseId: string): Promise<EnterpriseEntity> {
    const dto = this.enterpriseDatabase.find(
      (databaseEnterprise) => databaseEnterprise._id === enterpriseId,
    );
    if (!dto) throw new Error('Enterprise not found');
    const enterprise = new EnterpriseEntity(dto);
    return enterprise;
  }
  async getAll(): Promise<Array<EnterpriseEntity>> {
    return this.enterpriseDatabase.map(
      (enterprise) => new EnterpriseEntity(enterprise),
    );
  }
  async getLength(): Promise<number> {
    return this.enterpriseDatabase.length;
  }
}
