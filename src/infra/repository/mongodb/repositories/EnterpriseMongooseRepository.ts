import { Injectable } from '@nestjs/common';
import EnterpriseRepositoryInterface from '../../../../application/repository/enterpriseRepositoryInterface';
import EnterpriseEntity from '../../../../domain/EnterpriseEntity';
import EnterpriseModel from '../models/mongooseModelEnterprise';
@Injectable()
export default class EnterpriseMongooseRepository
  implements EnterpriseRepositoryInterface
{
  model = EnterpriseModel;
  async save(enterpriseEntity: EnterpriseEntity): Promise<void> {
    this.model.create({
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
    const enterprise = await this.model.findByIdAndUpdate(
      enterpriseEntity._id,
      {
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
      },
      { new: true },
    );
    if (!enterprise) throw new Error('Enterprise not found');
  }
  async delete(enterpriseId: string): Promise<void> {
    const enterprise = await this.model.findByIdAndDelete(enterpriseId);
    if (!enterprise) throw new Error('Enterprise not found');
  }
  async getOne(enterpriseId: string): Promise<EnterpriseEntity> {
    const enterpriseDto = await this.model.findById(enterpriseId);
    if (!enterpriseDto) throw new Error('Enterprise not found');
    return new EnterpriseEntity({
      _id: enterpriseDto._id,
      cnpj: enterpriseDto.cnpj,
      name: enterpriseDto.name,
      phone: enterpriseDto.phone,
      email: enterpriseDto.email,
      adressStreet: enterpriseDto.adressStreet,
      adressNumber: enterpriseDto.adressNumber,
      adressCityId: enterpriseDto.adressCityId,
      adressDistrict: enterpriseDto.adressDistrict,
      adressCep: enterpriseDto.adressCep,
    });
  }
  async getAll(): Promise<Array<EnterpriseEntity>> {
    const enterprises = await this.model.find();
    return enterprises.map(
      (enterpriseDto) =>
        new EnterpriseEntity({
          _id: enterpriseDto._id,
          cnpj: enterpriseDto.cnpj,
          name: enterpriseDto.name,
          phone: enterpriseDto.phone,
          email: enterpriseDto.email,
          adressStreet: enterpriseDto.adressStreet,
          adressNumber: enterpriseDto.adressNumber,
          adressCityId: enterpriseDto.adressCityId,
          adressDistrict: enterpriseDto.adressDistrict,
          adressCep: enterpriseDto.adressCep,
        }),
    );
  }
  async getLength(): Promise<number> {
    return (await this.model.find()).length;
  }
}
