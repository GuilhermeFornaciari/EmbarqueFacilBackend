import mongoose from 'mongoose';
import Bus from '../../../../../domain/Bus';
import busMongooseRepository from '../BusMongooseRepository';
import { config } from 'dotenv';
config();

// INICIA A CONEXÃO COM O BANCO DE DADOS

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

describe('Test the mongoose repository', () => {
  it('should test if the database creates a new bus and gets the same one', async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const validInput = {
      description: 'valid description',
      capacity: 39,
    };
    const repo = new busMongooseRepository();
    const firstDatabaseLength = await repo.getLength();
    const bus = Bus.create(validInput);
    await repo.save(bus);
    await delay(20);
    const getBus = await repo.getOne(bus._id);
    const secondDatabaseLength = await repo.getLength();
    await mongoose.connection.close();
    expect(getBus._id).toBeDefined();
    expect(getBus.capacity).toBe(validInput.capacity);
    expect(getBus.description).toBe(validInput.description);
    expect(secondDatabaseLength).toBe(firstDatabaseLength + 1);
  }, 15000);

  it('should test if the database deletes a bus', async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const validInput = {
      description: 'valid description',
      capacity: 39,
    };
    const repo = new busMongooseRepository();
    const firstLength = await repo.getLength();
    const bus = Bus.create(validInput);
    await repo.save(bus);
    await delay(200);
    await repo.delete(bus._id);
    const secondDatabaseLength = await repo.getLength();
    await mongoose.connection.close();
    expect(secondDatabaseLength).toBe(firstLength);
  }, 15000);

  it('should test if the database updates a bus', async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const validInput = {
      description: 'valid description',
      capacity: 39,
    };
    const repo = new busMongooseRepository();
    const busCreate = Bus.create(validInput);
    await repo.save(busCreate);
    await delay(6000);
    const updateData = {
      _id: busCreate._id,
      description: 'another valid description',
      capacity: 38,
    };
    const busUpdate = new Bus(updateData);
    await repo.update(busUpdate);
    await delay(200);
    const getbus = await repo.getOne(busCreate._id);
    await mongoose.connection.close();
    expect(getbus.capacity).toBe(updateData.capacity);
    expect(getbus.description).toBe(updateData.description);
  }, 15000);

  it('should test if the database gives an error if the bus tries to access a invalid Id', async () => {
    await mongoose.connect(process.env.TESTCONNECTIONSTRING);
    const repo = new busMongooseRepository();
    await expect(async () => await repo.getOne('id')).rejects.toThrow(
      new Error('Bus not found'),
    );
    mongoose.connection.close();
  }, 15000);
});
