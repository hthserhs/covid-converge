export interface Patient {
  id: number;
  firstName: string;
  lastName: string;
  mobileNumber: string;
  dob: number;
  age: number;
  gender: string;
  address: string;
  city: string;
  state: string;
  pincode: number;
  quarantineType: string;
  locationId: number;
  quarantineStartDate: number;
  quarantineEndDate: number;
  coMorbidities: null;
  covidRiskFactors: null;
  patientId: null;
  covidState: null;
  moniorState: null;
  transmissionType: null;
  caseType: null;
  advice: null;
  isHighRisk: boolean;
}

export interface QuarantineCenter {
  id: number;
  name: string;
  address: string;
  city: string;
  town: null;
  state: string;
  country: string;
  pincode: string;
  locationType: string;
  latitude: null;
  longitude: null;
  contactNumbers: ContactNumbers;
}

export interface ContactNumbers {
  landline: string;
  fax?: string;
  mobilenumber?: string;
  Mobile?: string;
}

export interface HealthWorkerDTO {
  id: number;
  name: string;
  role: 'DOCTOR';
  mobile: string;
  emailId: string;
}

export interface PatientHealthRecord {
  date: number;
  note: string;
  sequenceNo: number;
  symptoms: Symptom[];
}

export interface Symptom {
  name: string;
  severity: string;
}
