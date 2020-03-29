import { NowRequest, NowResponse } from '@now/node';
import faker from 'faker/locale/en_IND';
import { randomIntegerInRange } from './_utils/mock';

function randomPatients() {
  return Array(randomIntegerInRange(10, 10))
    .fill(null)
    .map(() => {
      const riskScore = faker.random.number({ min: 0, max: 2 });
      return {
        id: faker.random.number({ min: 1000, max: 9999 }),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        address: faker.address.streetAddress(),
        riskScore,
        positive: riskScore === 2 && Math.random() > 0.5
      };
    });
}

export default function(req: NowRequest, res: NowResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(randomPatients());
}
