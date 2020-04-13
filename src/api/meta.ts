import api from './client';
import { APISymptom } from './types';

export async function getSymptoms() {
  const response = await api.get<APISymptom[]>('symptoms');
  return response.data;
}
