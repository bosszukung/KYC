import PropTypes from 'prop-types';

export const Positions = {
  Admin: 'Admin',
  FI: 'FI',
  Client: 'Client',
};

export const FIStatus = {
  Active: 'Active',
  Inactive: 'Inactive'
};

export const KYCStatus = {
  Pending: 0,
  KYCVerified: 1,
  KYCFailed: 2
};

export const DataHashStatus = {
  Pending: 0,
  Approved: 1,
  Rejected: 2
};

export class Client {
  constructor(name, email, MobileNumber, ID, VerifiedBy, dataHash, dataUpdated) {
    this.name = name;
    this.email = email;
    this.MobileNumber = MobileNumber;
    this.ID = ID;
    this.VerifiedBy = VerifiedBy;
    this.dataHash = dataHash;
    this.dataUpdated = dataUpdated;
  }

  static propTypes = {
    name: PropTypes.string.isRequired ,
    email: PropTypes.string.isRequired,
    MobileNumber: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
    VerifiedBy: PropTypes.string.isRequired,
    dataHash: PropTypes.string.isRequired,
    dataUpdated: PropTypes.number.isRequired,
  };
}

export class User {
  constructor(name, email, ID, position, status=FIStatus) {
    this.name = name;
    this.email = email;
    this.ID = ID;
    this.position = position;
    this.status = status;
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
    position: PropTypes.oneOf(Object.values(Positions)).isRequired,
    status: PropTypes.oneOf(Object.values(FIStatus)).isRequired,
  };
}

export class FI {
  constructor(name, email, ID, SwiftCode, KYCCount, status=FIStatus) {
    this.name = name;
    this.email = email;
    this.ID = ID;
    this.SwiftCode = SwiftCode;
    this.KYCCount = KYCCount;
    this.status = status;
  }

  static propTypes = {
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    ID: PropTypes.string.isRequired,
    SwiftCode: PropTypes.string.isRequired,
    KYCCount: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(FIStatus)).isRequired,
  };
}

export class KYCRequest {
  constructor(ID, user_ID, ClientName, FI_ID, FIName, dataHash, updatedOn, status=KYCStatus, dataRequest=DataHashStatus, additionalNotes) {
    this.ID = ID;
    this.user_ID = user_ID;
    this.ClientName = ClientName;
    this.FI_ID = FI_ID;
    this.FIName = FIName;
    this.dataHash = dataHash;
    this.updatedOn = updatedOn;
    this.status = status;
    this.dataRequest = dataRequest;
    this.additionalNotes = additionalNotes;
  }

  static propTypes = {
    ID: PropTypes.string.isRequired,
    user_ID: PropTypes.string.isRequired,
    ClientName: PropTypes.string.isRequired,
    FI_ID: PropTypes.string.isRequired,
    FIName: PropTypes.string.isRequired,
    dataHash: PropTypes.string.isRequired,
    updatedOn: PropTypes.number.isRequired,
    status: PropTypes.oneOf(Object.values(KYCStatus)).isRequired,
    dataRequest: PropTypes.oneOf(Object.values(DataHashStatus)).isRequired,
    additionalNotes: PropTypes.string.isRequired,
  };
}
