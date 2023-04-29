export {}

export enum Positions  {
  Admin,
  FI, 
  Client,
};

export enum FIStatus  {
  Active,
  Inactive,
};

export enum KYCStatus  {
  Pending,
  KYCVerified,
  KYCFailed
};

export enum DataHashStatus {
  Pending,
  Approved,
  Rejected
};

export type Client =  {
  name: string, 
  email: string, 
  MobileNumber: string, 
  ID: string, 
  VerifiedBy: string, 
  dataHash: string, 
  dataUpdated: number
}

export type User = {
    name: string, 
    email: string, 
    ID: string, 
    position: Positions, 
    status: FIStatus
   

}

export type FI = {
  name: string, 
  email: string, 
  ID: string, 
  SwiftCode: string, 
  KYCCount: string, 
  status: FIStatus 
}
    


export type KYCRequest = {
  user_ID: string, 
  ClientName: string, 
  FI_ID: string, 
  FIName: string, 
  dataHash:string, 
  updatedOn: string, 
  status: KYCStatus, 
  dataRequest: DataHashStatus, 
  additionalNotes: string 
   
}
