import { HealthWorkerDTO } from '../types/types';
import api from './client';

interface LoginAPIResponse {
  isNewUser: boolean;
  patient: null;
  healthWorkerDTO: HealthWorkerDTO;
  authToken: string;
}

export async function sendOtp(mobileNumber: string) {
  return api
    .get(`/otp?number=${mobileNumber}&role=Doctor`)
    .then((response) => response.data);
}

export async function signIn(number: string, otp: string) {
  return api
    .post<LoginAPIResponse>(`/login`, {
      number,
      otp,
      role: 'Doctor'
    })
    .then((response) => response.data);
}
