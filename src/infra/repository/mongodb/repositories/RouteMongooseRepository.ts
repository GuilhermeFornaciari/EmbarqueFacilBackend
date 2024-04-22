import { Injectable } from '@nestjs/common';
import RouteRepositoryInterface from 'src/application/repository/RouteRepositoryInterface';
import RouteEntity from '../../../../domain/RouteEntity';
@Injectable()
export default class RouteMemoryRepository implements RouteRepositoryInterface {
  private RouteDatabase: Array<any> = [];
  async save(RouteEntity: RouteEntity): Promise<void> {
    this.RouteDatabase.push({
      _id: RouteEntity._id,
      startTime: RouteEntity.startTime,
      enterpriseId: RouteEntity.enterpriseId,
      description: RouteEntity.description,
    });
  }
  async update(RouteEntity: RouteEntity): Promise<void> {
    const index = this.RouteDatabase.findIndex(
      (databaseRoute) => databaseRoute._id === RouteEntity._id,
    );
    if (index === -1) throw new Error('Route not found');
    this.RouteDatabase[index] = RouteEntity;
  }
  async delete(RouteId: string): Promise<void> {
    const index = this.RouteDatabase.findIndex(
      (databaseRoute) => databaseRoute._id === RouteId,
    );
    if (index === -1) throw new Error('Route not found');
    this.RouteDatabase.splice(index, 1);
  }
  async getOne(RouteId: string): Promise<RouteEntity> {
    const dto = this.RouteDatabase.find(
      (databaseRoute) => databaseRoute._id === RouteId,
    );
    if (!dto) throw new Error('Route not found');
    const Route = new RouteEntity(dto);
    return Route;
  }
  async getAll(): Promise<Array<RouteEntity>> {
    return this.RouteDatabase.map((Route) => new RouteEntity(Route));
  }
  async getLength(): Promise<number> {
    return this.RouteDatabase.length;
  }
}
