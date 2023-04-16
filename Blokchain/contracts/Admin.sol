// SPDX-License-Identifier: MIT and GPL-3.0

pragma experimental ABIEncoderV2;
pragma solidity >=0.6;

import "./Support.sol";
import "./Appearance.sol";
import "./FI.sol";
import "./Client.sol";

contract Admin is Client, FI {
    address admin;
    address[] internal adminList;

    mapping(address => appearances.User) internal users;

    constructor(string memory name, string memory email) {
        admin = msg.sender;
        appearances.User memory user = appearances.User({
            name: name,
            email: email,
            ID: admin,
            positions: appearances.Positions.Admin,
            status: appearances.FIStatus.Active
        });
        users[admin] = user;
        adminList.push(admin);
    }
        modifier isAdmin() {
            require(msg.sender == admin, "Only admin is allowed");
             _;
        }

    // Function to list all FIs
    function AllFI(uint256 pageNumber) public view isAdmin
    returns(uint256 Totalpages, appearances.FI memory) {
        return AllFI(pageNumber);
    }

    // Funcition to add nee FI including their details. 
    function AddFIAccount(appearances.FI memory fiAdd) public isAdmin {
        addFI(fiAdd);
        users[fiAdd.ID] = appearances.User({
            name: fiAdd.name,
            email: fiAdd.email,
            ID: fiAdd.ID,
            positions: appearances.Positions.FI,
            status: appearances.FIStatus.Active
        });
        adminList.push(fiAdd.ID);
    }

    // Function to update Fis details.
    function FIUpdate(address ID, string memory email, string memory name)
    public isAdmin {
        updateFI(ID, email, name);
        users[ID].name = name;
        users[ID].email = email;
    }

    /*  Function to active FIs for KYC. 
     *  If boolearn return true, FI will mark as a active 
     *  Otherwise will mark as a deactive
     */
    function ActiveteandDeactivete(address ID, bool MakeActive) public isAdmin {
        users[ID].status = activeteAnddeactivete(ID, MakeActive);
    }
}