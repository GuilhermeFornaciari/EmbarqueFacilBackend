import axios from 'axios';
const baseurl = 'http://localhost:3000/bus';
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

it('should post a new bus', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const responseData = (await axios.post(baseurl, validInput)).data;
  expect(responseData._id).toBeDefined();
  expect(responseData.description).toBe(validInput.description);
  expect(responseData.capacity).toBe(validInput.capacity);
});

it('should post and request new bus', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const busId = (await axios.post(baseurl, validInput)).data._id;
  await delay(3000);
  const bus = (await axios.get(baseurl + '/' + busId)).data;
  expect(bus).toBeDefined();
  expect(bus.description).toBe(validInput.description);
  expect(bus.capacity).toBe(validInput.capacity);
});

it('should post the validInput and update the database with the newValidInput', async () => {
  const validInput = {
    description: 'valid description',
    capacity: 39,
  };
  const busId = (await axios.post(baseurl, validInput)).data._id;
  const validInput2 = {
    _id: busId,
    description: 'another valid description',
    capacity: 39,
  };
  await delay(2000);
  await axios.put(baseurl + '/' + busId, validInput2);
  await delay(2000);
  const bus = (await axios.get(baseurl + '/' + busId)).data;
  expect(bus.description).toBe(validInput2.description);
  expect(bus.capacity).toBe(validInput2.capacity);
});
