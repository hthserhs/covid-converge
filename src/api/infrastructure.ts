import { QuarantineCenter } from '../types/types';
import api from './client';

export async function getQuarantineCenters() {
  return api
    .get<QuarantineCenter[]>('quarantine-centers')
    .then(response => response.data);
}
