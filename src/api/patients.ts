import { Patient } from '../types/types';
import api from './client';

export async function getPatients() {
  return api.get<Patient[]>('patients').then(response => response.data);
}
