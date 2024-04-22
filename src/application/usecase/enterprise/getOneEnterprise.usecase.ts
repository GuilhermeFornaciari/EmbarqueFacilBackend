import EnterpriseRepositoryInterface from '../../repository/enterpriseRepositoryInterface';

export default class UsecaseGetOneEnterprise {
  constructor(readonly repo: EnterpriseRepositoryInterface) {}
  async execute(_id: Input): Promise<Output> {
    const enterprise = await this.repo.getOne(_id);
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

export type Input = string;

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
