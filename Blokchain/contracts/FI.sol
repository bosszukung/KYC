// SPDX-License-Identifier: MIT and GPL-3.0

pragma experimental ABIEncoderV2;
pragma solidity >=0.6.0; 

import "./Support.sol";
import "./Appearance.sol";

// Library for managing all FIs in the KYC processes
contract FI {
    address[] internal FIsList;
    mapping(address => appearances.FI ) internal finance;

    event FIadded(address ID, string name, string email, string SwiftCode);
    event FIupdated(address ID, string name, string email);
    event FIactivated(address ID, string name);
    event FIdeactivated(address ID, string name);

    modifier isFIValid(address ID) {
        require(finance[ID].ID != address(0), "This Financial Institution is not found");
        require(finance[ID].ID == ID, "This Financial Institution has not been added");
        require(finance[ID].status == appearances.FIStatus.Active, 
        "This Financial Institution is not active, plese contact Administrator");
        _;
    }

    // Function to get al the Fis list.
    function getallFI(uint256 pageNumber) internal view
    returns(uint256 Totalpages, appearances.FI[] memory) {
        require(pageNumber > 0, "PageNumber should be > 0");
        (
            uint256 pages,
            uint256 pageLength,                
            uint256 startIndex,
            uint256 endIndex 
            ) = support.getIndexes(pageNumber, FIsList);
        appearances.FI[] memory Lists = new appearances.FI[](pageLength);
        for (uint256 i = startIndex; i < endIndex; i++)
            Lists[i] = finance[FIsList[i]];
        return(pages, Lists);
    }

    // Fucntion to get the FI details.
    function gettheFI(address ID) internal view returns(appearances.FI memory) {
        require(ID != address(0), "ID is not found");
        return finance[ID];

    }

    // Function to add the FI
    function addFI(appearances.FI memory fiAdd) internal {
        require(finance[fiAdd.ID].ID == address(0), "This Financial Institution is existed");
        FIsList.push(fiAdd.ID);
        emit FIadded(fiAdd.ID, fiAdd.name, fiAdd.email, fiAdd.SwiftCode);
    } 

    // Funciton to update the FI's details
    function updateFI(address ID, string memory email, string memory name) internal {
        require(finance[ID].ID != address(0), "This Financial Institution is nor found");
        finance[ID].name = name;
        finance[ID].email = email;
        emit FIupdated(ID, name, email);
    }

    /*  Funciton to get the FI status to update in common list.
     *  If it return 'true', it will mark as "Active" else will mark as "Deactive"
     */ 
    function activeteAnddeactivete(address ID, bool active) internal
    returns(appearances.FIStatus) {
        require(finance[ID].ID != address(0), "This Financial Institution is nor found");
        if (active && finance[ID].status == appearances.FIStatus.Inactive) {
            finance[ID].status = appearances.FIStatus.Active;
            emit FIactivated(ID, finance[ID].name);
            // Updating in common list
            return appearances.FIStatus.Active;
        }
        else if (!active && finance[ID].status == appearances.FIStatus.Active) {
            finance[ID].status = appearances.FIStatus.Inactive;
            emit FIdeactivated(ID, finance[ID].name);
            // Updating in common list
            return appearances.FIStatus.Inactive;
        }
        else {
            // It already updated
            return finance[ID].status;
        }
    } 

   // Funciton to count the KYC that FI has done
    function updateKYC(address ID) internal {
        require(ID != address(0), "Financial INstitution is not found");
        finance[ID].KYCCount++;
    } 

}