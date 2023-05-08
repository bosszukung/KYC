// SPDX-License-Identifier: MIT and GPL-3.0

pragma experimental ABIEncoderV2;
pragma solidity >=0.6.0;

import "./Support.sol";
import "./Appearance.sol";
// Library for managing client in the KYC process
contract Client {
    address[] internal clientList;
    mapping(address => appearances.Client) internal client;

    event ClientAdded(address ID, string name, string email);
    event ClientDataUpdated(address ID, string name, string email);
    event dataHashUpdated(address ID, string clientName, string dataHash);

    modifier isClientValid(address ID) {
        require(ID != address(0), "ID is not found");
        require(client[ID].ID != address(0), "User is not found");
        require(!support.stringsCompare(client[ID].email, ""), 
        "Email is not found");
        _;
    }

    // Function to check if client is existed
    function ExistedClient(address ID) internal view returns(bool exist) {
        require(ID != address(0), "ID has not found");
        if (client[ID].ID != address(0) &&
        !support.stringsCompare(client[ID].email, "")) {
            exist = true;
        }
    }
    
    // Function to get the client details
    function getClientDetail(address ID) internal view returns(appearances.Client memory) {
        return client[ID];
    }

    //Function to update user's profile (client side)
    function getProflieUpdate(
        string memory name,
        string memory email,
        uint256 MobileNumber
    ) internal {
        client[msg.sender].name = name;
        client[msg.sender].email = email;
        client[msg.sender].MobileNumber = MobileNumber;
        emit ClientDataUpdated(msg.sender, name, email);
    }

    // Function to add a new client
    function addClient(appearances.Client memory customer) internal {
        client[customer.ID] = customer;
        clientList.push(customer.ID);
        emit ClientAdded(customer.ID, customer.name, customer.email);
    }

    // Function to update KYC from Bank
    function verifiedKYC(address ID) internal {
        require(ID != address(0), "Customer ID has not Found");
        client[ID].VerifiedBy = msg.sender;
    }

    // Function to update date hash of the documents
    function dataHashUpdate(string memory hash, uint256 Timestemp)
    internal {
        client[msg.sender].dataHash = hash;
        client[msg.sender].dataUpdated = Timestemp;
        emit dataHashUpdated(msg.sender, client[msg.sender].name, hash);
    }

    // Funciton to serch for clients that link with the FI
    function searchforclient(address ID, address[] memory customers)
    internal view returns(bool, appearances.Client memory) {
        bool found;
        appearances.Client memory customer;
        for (uint256 i = 0; i < customers.length; i++) {
            // if found return client's full detial 
            if(customers[i] == ID) {
                found = true;
                customer = client[ID];
                break;
            }
        }
        return(found, customer);
    }
}
