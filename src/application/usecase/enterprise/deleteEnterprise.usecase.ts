import EnterpriseRepositoryInterface from '../../repository/enterpriseRepositoryInterface';

export default class UsecaseDeleteEnterprise {
  constructor(readonly repo: EnterpriseRepositoryInterface) {}
  async execute(enterpriseId: Input): Promise<void> {
    this.repo.delete(enterpriseId);
  }
}

export type Input = string;
