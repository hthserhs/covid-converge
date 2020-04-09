import { QuarantineCenter } from '../types/types';
import api from './client';

export async function getQuarantineCenters() {
  return api
    .get<QuarantineCenter[]>('locations')
    .then((response) => response.data);
}
