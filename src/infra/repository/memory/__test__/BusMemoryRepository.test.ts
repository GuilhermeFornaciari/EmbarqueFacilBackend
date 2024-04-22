import Bus from '../../../../domain/Bus';
import BusMemoryRepository from '../BusMemoryRepository';

it('should test if the database creates a new bus', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const repo = new BusMemoryRepository();
  const firstLength = await repo.getLength();
  const bus = Bus.create(validInput);
  await repo.save(bus);
  expect(await repo.getOne(bus._id)).toBeDefined();
  expect(await repo.getLength()).toBe(firstLength + 1);
});
it('should test if the database creates a new bus with the exact same data', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const repo = new BusMemoryRepository();
  const bus = Bus.create(validInput);
  await repo.save(bus);
  const getbus = await repo.getOne(bus._id);
  expect(getbus.capacity).toBe(validInput.capacity);
  expect(getbus.description).toBe(validInput.description);
});

it('should test if the database deletes a bus', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const repo = new BusMemoryRepository();
  const firstLength = await repo.getLength();
  const bus = Bus.create(validInput);
  await repo.save(bus);
  await repo.delete(bus._id);
  expect(await repo.getLength()).toBe(firstLength);
});

it('should test if the database updates a bus', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const validInput2 = {
    description: 'another valid description',
    capacity: 39,
  };
  const repo = new BusMemoryRepository();
  const busCreate = Bus.create(validInput);
  await repo.save(busCreate);
  const busUpdate = await repo.getOne(busCreate._id);
  busUpdate.description = validInput2.description;
  await repo.update(busUpdate);
  const getbus = await repo.getOne(busCreate._id);
  expect(getbus.capacity).toBe(validInput2.capacity);
  expect(getbus.description).toBe(validInput2.description);
});

it('should test if the database creates new buss (test getall)', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const validInput2 = {
    description: 'another valid description',
    capacity: 39,
  };
  const repo = new BusMemoryRepository();
  const firstLength = await repo.getLength();
  const bus1 = Bus.create(validInput);
  await repo.save(bus1);
  expect(repo.getOne(bus1._id)).toBeDefined();
  const bus2 = Bus.create(validInput2);
  await repo.save(bus2);
  expect(repo.getOne(bus2._id)).toBeDefined();
  expect(await repo.getLength()).toBe(firstLength + 2);
  const getAll = await repo.getAll();
  expect(getAll.find((bus) => bus._id == bus1._id)).toBeDefined();
  expect(getAll.find((bus) => bus._id == bus2._id)).toBeDefined();
});

it('should test if the database gives an error if the bus tries to access a invalid Id', async () => {
  const repo = new BusMemoryRepository();
  expect(() => repo.getOne('id')).rejects.toThrow(new Error('Bus not found'));
});
