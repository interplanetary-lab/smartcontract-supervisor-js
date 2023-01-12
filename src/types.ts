export type SupervisorUserData = {
  id: number;
  first_name: string;
  last_name: string;
  walletsList: string[];
} & SupervisorUserFields;

export type SupervisorUserFields = {
  [key: string]: string;
};

export type SupervisorSignatureCustomData = {
  [key: string]: string | number;
};

export type SupervisorSignatureData = {
  address: string;
  signature: string;
  expires_at?: number;
} & SupervisorSignatureCustomData;

export type SupervisorWhitelistData = {
  id: number;
  name: string;
  signature_data: SupervisorSignatureCustomData;
  validator_address: string;
};
