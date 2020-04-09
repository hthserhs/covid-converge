import { HealthWorkerDTO, Patient, QuarantineCenter } from '../types/types';
import api from './client';

export async function getPatients(id: number) {
  return api
    .get<Patient[]>(`/healthworkers/${id}/patients`)
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

export async function getUser(token: string, id: string) {
  return api
    .get<HealthWorkerDTO>(`/healthworkers/${id}`, {
      headers: {
        token
      }
    })
    .then((response) => response.data);
}
