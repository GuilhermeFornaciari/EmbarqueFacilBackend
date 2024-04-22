import UserRepositoryInterface from 'src/application/repository/userRepositoryInterface';

export default class UsecaseDeleteUser {
  constructor(readonly repo: UserRepositoryInterface) {}
  async execute(userId: Input): Promise<void> {
    this.repo.delete(userId);
  }
}

export type Input = string;
