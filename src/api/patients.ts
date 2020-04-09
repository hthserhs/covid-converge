import { PatientHealthRecord } from '../types/types';
import api from './client';

export async function getPatientHealthRecords(
  token: string,
  id: number,
  healthWorkerId: number
) {
  return api
    .get<PatientHealthRecord[]>(
      `/patients/${id}/symptoms?healthWorkerId=${healthWorkerId}`,
      {
        headers: {
          token
        }
      }
    )
    .then((response) => response.data);
}
