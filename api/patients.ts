import { NowRequest, NowResponse } from '@now/node';
import { scaleLinear } from 'd3-scale';
import faker from 'faker/locale/en_IND';
import { sampleSize, Symptom, symptoms as allSymptoms } from './_utils/mock';

const scaleTemp = scaleLinear()
  .domain([99, 107])
  .range([0, 3]);

const scaleRR = scaleLinear()
  .domain([15, 24])
  .range([0, 3]);

function randomPatients() {
  return Array(faker.random.number({ min: 10, max: 10 }))
    .fill(null)
    .map(() => {
      const symptoms = sampleSize<Symptom>(
        allSymptoms,
        faker.random.number({ min: 1, max: allSymptoms.length })
      ).map(s => {
        let value;

        if (s.name === 'fever') {
          value = faker.finance.amount(99, 107, 1);
        } else if (s.name === 'shortness-of-breath') {
          value = faker.random.number({ min: 15, max: 24 });
        }

        return {
          ...s,
          severity:
            s.name === 'fever'
              ? Math.ceil(scaleTemp(value))
              : s.name === 'shortness-of-breath'
              ? Math.ceil(scaleRR(value))
              : faker.random.number({ min: 0, max: 3 }),
          ...(value ? { value } : null)
        };
      });

      // [0, 6]
      const riskScore = symptoms
        .filter(s => ['fever', 'shortness-of-breath'].includes(s.name))
        .reduce((acc, cur) => acc + cur.severity, 0);

      return {
        id: faker.random.number({ min: 1000, max: 9999 }),
        name: `${faker.name.firstName()} ${faker.name.lastName()}`,
        address: faker.address.streetAddress(),
        riskScore,
        positive: riskScore >= 3 && Math.random() > 0.5,
        daysInQuarantine: faker.random.number({ min: 1, max: 14 }),
        contact: faker.phone.phoneNumber(),
        symptoms
      };
    });
}

export default function(req: NowRequest, res: NowResponse) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(randomPatients());
}
