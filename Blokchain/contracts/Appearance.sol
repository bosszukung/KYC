// SPDX-License-Identifier: GPL-3.0 and MIT

pragma experimental ABIEncoderV2; 
pragma solidity >=0.6.0;

//The library manages all custom appearances that were used in the KYC process.

library appearances {
    
    enum Positions {
        Admin, // 0
        FI, // 1
        Client // 2
    }

    enum FIStatus {
        Active, // 0
        Inactive // 1
    }

    enum KYCStatus {
        Pending, // 0
        KYCVerified, // 1
        KYCFailed // 2
    }

    enum DataHashStatus {
        Pending, // 0
        Approved, // 1
        Rejected // 2
    }

    struct User {
        string name;
        string email;
        address ID;
        Positions positions;
        FIStatus status;
    }

    struct Client {
        string name;
        string email;
        uint16 MobileNumber;
        address ID;
        address VerifiedBy; // Address of the FI only if KYC gets verified
        string dataHash; // Documents will be stored in decentralised storage & a hash will be created for the same
        uint256 dataUpdated;
    }

    struct FI {
        string name;
        string email;
        address ID;
        string SwiftCode;
        uint16 KYCCount; // How many KCY's did this bank completed so far
        FIStatus status; // RBI, we call "admin" here can disable the FI at any instance
    }

    struct KYCRequest {
        string ID; // Combination of customer Id & bank is going to be unique
        address user_ID;
        string ClientName;
        address FI_ID;
        string FIName;
        string dataHash; 
        uint256 updatedOn;
        KYCStatus status;
        DataHashStatus dataRequest; // Get approval from user to access the data
        string additionalNotes; 
        /* Notes that can be added if KYC verification fails  OR
         * if customer rejects the access & bank wants to re-request with some message
         */
    }
}