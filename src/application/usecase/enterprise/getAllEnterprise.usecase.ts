import EnterpriseRepositoryInterface from '../../repository/enterpriseRepositoryInterface';

export default class UsecaseGetAllEnterprise {
  constructor(readonly repo: EnterpriseRepositoryInterface) {}
  async execute(): Promise<Output> {
    const enterprises = (await this.repo.getAll()).map((enterprise) => {
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
    });

    return enterprises;
  }
}

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
}[];
