export interface Patient {
  id: number;
  name: string;
  address: string;
  riskScore: number; // [0, 6]
  positive: boolean;
  daysInQuarantine: number;
  contact: string;
  symptoms: Symptom[];
}

export interface QuarantineCenter {
  id: number;
  address: string;
}

export interface Symptom {
  name: string;
  displayName: string;
  severity: number; // [0, 3]
  value?: number;
}
