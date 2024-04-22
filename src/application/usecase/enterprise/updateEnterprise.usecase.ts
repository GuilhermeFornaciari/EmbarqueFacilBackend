import EnterpriseRepositoryInterface from '../../repository/enterpriseRepositoryInterface';
import EnterpriseEntity from '../../../domain/EnterpriseEntity';

export default class UsecaseUpdateEnterprise {
  constructor(readonly repo: EnterpriseRepositoryInterface) {}
  async execute(enterpriseData: Input): Promise<Output> {
    const enterprise = new EnterpriseEntity(enterpriseData);
    await this.repo.update(enterprise);
    return {
      _id: enterprise._id,
      cnpj: enterprise.cnpj,
      name: enterprise.name,
      phone: enterprise.phone,
      email: enterprise.email,
      adressStreet: enterprise.adressStreet,
      adressNumber: enterprise.adressNumber,
      adressCityId: enterprise.adressCityId,
      adressDistrict: enterprise.adressDistrict,
      adressCep: enterprise.adressCep,
    };
  }
}

export type Input = {
  _id: string;
  cnpj: string;
  name: string;
  phone: string;
  email: string;
  adressStreet: string;
  adressNumber: string;
  adressCityId: string;
  adressDistrict: string;
  adressCep: string;
};

export type Output = {
  _id: string;
  cnpj: string;
  name: string;
  phone: string;
  email: string;
  adressStreet: string;
  adressNumber: string;
  adressCityId: string;
  adressDistrict: string;
  adressCep: string;
};
