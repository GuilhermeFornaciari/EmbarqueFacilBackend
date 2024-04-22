import Bus from '../Bus';

const validInput1 = {
  capacity: 31,
  description: 'a valid description',
};

it('should test if the Bus is created', () => {
  const bus = Bus.create(validInput1);
  expect(bus._id).toBeDefined();
});
