import { Patient } from '../types/types';
import api from './client';

export async function getPatients(id: number) {
  return api
    .get<Patient[]>(`/healthworkers/${id}/patients`)
    .then((response) => response.data);
}
