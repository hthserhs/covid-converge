import { QuarantineCenter } from '../types/types';
import api from './client';

export async function getQuarantineCenters() {
  return api
    .get<QuarantineCenter[]>('locations')
    .then((response) => response.data);
}

export async function getHealthWorkerQuarantineCenters(id: number) {
  return api
    .get<QuarantineCenter[]>(`/healthworkers/${id}/locations`)
    .then((response) => response.data);
}

export async function updateHealthWorkerQuarantineCenters(
  id: number,
  centers: number[]
) {
  return api
    .put(`/healthworkers/${id}/locations`, centers)
    .then((response) => response.data);
}
