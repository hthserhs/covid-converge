import { NowRequest, NowResponse } from '@now/node';
import faker from 'faker/locale/en_IND';
import { randomIntegerInRange } from './_utils/mock';

function quarantineCenters() {
  return Array(randomIntegerInRange(0, 100))
    .fill(null)
    .map(() => {
      return {
        id: faker.random.number({ min: 1000, max: 9999 }),
        address: faker.address.streetAddress()
      };
    });
}

export default function(req: NowRequest, res: NowResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(quarantineCenters());
}
