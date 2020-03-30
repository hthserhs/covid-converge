export const randomIntegerInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export function sampleSize<T = unknown>([...arr], n = 1): T[] {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr.slice(0, n);
}

export const symptoms: Symptom[] = [
  { name: 'dry-cough', displayName: 'Dry Cough' },
  { name: 'fever', displayName: 'Fever' },
  { name: 'chest-pain', displayName: 'Persistent Chest Pain' },
  { name: 'sore-throat', displayName: 'Sore Throat' },
  { name: 'loss-of-taste', displayName: 'Loss of Taste' },
  { name: 'weakness', displayName: 'Weakness' },
  { name: 'shortness-of-breath', displayName: 'RR' },
  { name: 'sneezing', displayName: 'Sneezing' },
  { name: 'loss-of-smell', displayName: 'Loss of Smell' }
];

export interface Symptom {
  name: string;
  displayName: string;
}
