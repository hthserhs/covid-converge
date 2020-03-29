export interface Patient {
  id: number;
  name: string;
  address: string;
  riskScore: number;
  positive: boolean;
}

export interface QuarantineCenter {
  id: number;
  address: string;
}
