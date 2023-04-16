// SPDX-License-Identifier: MIT and GPL-3.0
pragma experimental ABIEncoderV2;
pragma solidity >=0.6;

import "./FI.sol";
import "./Client.sol";

// Administration for managing KYC process. 
contract KYC is Client, FI {
    address admin;
    address[] internal adminList;

    mapping(address => appearances.User) internal users;
    mapping(string => appearances.KYCRequest) internal request;
    mapping(address => address[]) internal FItoClient;
    mapping(address => address[]) internal ClienttoFI;

    event addKYC(string iDreq, string FIName, string ClinetName);
    event startKYC(string iDreq, string FIName, string ClientName);
    event changeStatus(
        string iDreq,
        address Client_ID,
        address FI_ID,
        appearances.KYCStatus status
    );
    event dataHashpermission(
        string iDreq,
        address Client_ID,
        address FI_ID,
        appearances.DataHashStatus status
    );

    // Set the admin who can add FIs to system and deploy this contract.
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
    function _onlyAdmin() private view {
        require(msg.sender == admin, "Only admin is allowed");
    }
    // Check whether the inquirer is a admin.  
    modifier isAdmin() {
        _onlyAdmin();
        _;
    }
    /*  Function that check whether the KYC is alredy exists.
     *  iDreq is a unique ID for KYC request process.
     *  this function will return "boolean"
     */   
    function isKYCexists(string memory iDreq) internal view returns(bool) {
        require(!support.stringsCompare(iDreq, ""), "Request is not found");
        return support.stringsCompare(request[iDreq].ID, iDreq);
    }

    //Function to request KYC process.  
    function getKYC(uint256 pageNumber, bool forFI) 
    internal view returns(uint256 Totalpages, appearances.KYCRequest[] memory) {
        require(pageNumber > 0, "PageNumber should be > 0");
        (
            uint256 pages,
            uint256 pageLength,
            uint256 startIndex,
            uint256 endIndex
        ) = support.getIndexes(
            pageNumber, 
            forFI
                ? FItoClient[msg.sender]
                : ClienttoFI[msg.sender]
        );
        appearances.KYCRequest[] memory list = new appearances.KYCRequest[](pageLength);
        for (uint256 i = startIndex; i < endIndex; i++)
        list[i] = forFI
        ? request[support.append(msg.sender, FItoClient[msg.sender][i])] 
        : request[support.append(ClienttoFI[msg.sender][i], msg.sender)];
        return(pages, list);
    }

    // Admin Interface.

    // Function to list all FIs
    function AllFI(uint256 pageNumber) public view isAdmin
    returns(uint256 Totalpages, appearances.FI[] memory) {
        return getallFI(pageNumber);
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

    // Bank Interface

    //Function that list clients, who like with the FI in this system. 
    function getClientofFI(uint256 pageNumber) public view isFIValid(msg.sender)
    returns(uint256 Totalpages, appearances.KYCRequest[] memory) {
        return getKYC(pageNumber, true);
    }

    // Function to record new KYC for a client.
    function AddKYC(appearances.Client memory client, uint256 Timestemp,
    string memory note) public isFIValid(msg.sender) {
        string memory iDreq = support.append(msg.sender, client.ID);
        require(!isKYCexists(iDreq), "User had requested KYC");
        // client's details. 
        request[iDreq] = appearances.KYCRequest({
            ID: iDreq,
            user_ID: client.ID,
            ClientName: client.name,
            FI_ID: msg.sender,
            FIName: gettheFI(msg.sender).name,
            dataHash: client.dataHash,
            // Timestemp is current date & time in unix epoch timestemp.
            updatedOn: Timestemp,
            status: appearances.KYCStatus.Pending,
            dataRequest: appearances.DataHashStatus.Pending,
            // note is aollow the additinal details to be added.
            additionalNotes: note
        });
        FItoClient[msg.sender].push(client.ID);
        ClienttoFI[client.ID].push(msg.sender);
        emit addKYC(iDreq, request[iDreq].FIName, client.name);

        if(!ExistedClient(client.ID)) {
            addClient(client);
            users[client.ID] = appearances.User({
                name: client.name,
                email: client.email,
                ID: client.ID,
                positions: appearances.Positions.Client,
                status: appearances.FIStatus.Active
            });
            adminList.push(client.ID);
        }
    }

    // Function to re-request KYC for clients.
    function reKYC(address ID, string memory note) public
    isFIValid(msg.sender) {
        string memory iDreq = support.append(msg.sender, ID);
        require(isKYCexists(iDreq), "KYC has not found");
        require(ExistedClient(ID), "Customer has not found");
        
        request[iDreq].status = appearances.KYCStatus.Pending;
        request[iDreq].dataRequest = appearances.DataHashStatus.Pending;
        request[iDreq].additionalNotes = note;
        emit startKYC(iDreq, request[iDreq].FIName, request[iDreq].ClientName);
    }
    
    // Function to verify KYC as failure.
    function KYCVerification(address user_ID, bool verified, string memory note)
    public isFIValid(msg.sender) {
        string memory iDreq = support.append(msg.sender, user_ID);
        require(isKYCexists(iDreq), "KYC has not been require");

        appearances.KYCStatus status = appearances.KYCStatus.Pending;
        if(verified) {
            status = appearances.KYCStatus.KYCVerified;
            updateKYC(msg.sender);
            verifiedKYC(user_ID);           
        }
        else {
            status = appearances.KYCStatus.KYCFailed;
        }
        request[iDreq].status = status;
        // info to be shared with the clients.
        request[iDreq].additionalNotes = note;
        emit changeStatus(iDreq, user_ID, msg.sender, status);
    }

    /*  Function to search for client's details for FIs that client link to.
     *  This will return in boolean which tell if client exits or not.
     */   
    function searchClient(address ID) public view 
    isClientValid(ID) isFIValid(msg.sender)
    returns(bool, appearances.Client memory, appearances.KYCRequest memory) {
        bool found;
        appearances.Client memory client;
        appearances.KYCRequest memory requested;
        (found, client) = searchforclient(ID, FItoClient[msg.sender]);
        // If client exits will return with full of client's details, including KYC status.
        if (found) requested = request[support.append(msg.sender, ID)];
        return (found, client, requested); 
    }

    // Client Interface

    // Function that list FIs for Client 
    function FIrequest(uint256 pageNumber) public view isClientValid(msg.sender)
    returns(uint256 Totalpages, appearances.KYCRequest[] memory) {
        return getKYC(pageNumber, false);
    }

    // Function to check if KYC approve or reject. 
    function KYCaction(address FI_ID, bool approve, string memory note)
    public isClientValid(msg.sender) isFIValid(FI_ID) {
        string memory iDreq = support.append(FI_ID, msg.sender);
        require(isKYCexists(iDreq), "User does not have KYC request");

        appearances.DataHashStatus status = appearances.DataHashStatus.Pending;
        if (approve) {
            status = appearances.DataHashStatus.Approved;
        }
        else {
            status = appearances.DataHashStatus.Rejected;
        }
        request[iDreq].dataRequest = status;
        request[iDreq].additionalNotes = note;
        emit dataHashpermission(iDreq, msg.sender, FI_ID, status);
    }

    // Function to update the user proflie.
    function updateProfile(string memory name, string memory email, uint16 MobileNumber)
    public isClientValid(msg.sender) {
        getProflieUpdate(name, email, MobileNumber);
        users[msg.sender].name = name;
        users[msg.sender].email = email;
    }

    // Function to upate dathash of the documents.
    function updateHash(string memory hash, uint256 Timestemp) public
    isClientValid(msg.sender) {
        dataHashUpdate(hash, Timestemp);
        // Reset KYC verification status for all FIs 
        address[] memory FIsList = ClienttoFI[msg.sender];
        for (uint256 i = 0; i < FIsList.length; i++) {
            string memory iDreq = support.append(FIsList[i], msg.sender);
            if (isKYCexists(iDreq)) {
                request[iDreq].dataHash = hash;
                request[iDreq].updatedOn = Timestemp;
                request[iDreq].status = appearances.KYCStatus.Pending;
                request[iDreq].additionalNotes = "Update all my documents";
            }
        }
    }

    /*  Function to removes the permission to a specific FIs.
     *  So, they can't access the documents again.
     */
    function removePremission(address FI_ID, string memory note) public
    isClientValid(msg.sender) {
        string memory iDreq = support.append(FI_ID, msg.sender);
        require(isKYCexists(iDreq), "Permission has not found");
        request[iDreq].dataRequest = appearances.DataHashStatus.Rejected;
        request[iDreq].additionalNotes = note;
        emit dataHashpermission(iDreq, msg.sender, FI_ID, appearances.DataHashStatus.Rejected);
    }
    /*  Fucntion to search for FIs details in the list that directly linked to customer.
     *  This will return say FI exits or not.
     */ 
    function searchforFI(address FI_ID) public view 
    isClientValid(msg.sender) isFIValid(FI_ID)
    returns(bool, appearances.FI memory, appearances.KYCRequest memory) {
        bool found;
        appearances.FI memory fiAdd;
        appearances.KYCRequest memory req;
        address[] memory fis = ClienttoFI[msg.sender];
        // If FI i found will return their detials including status.
        for (uint256 i = 0; i < fis.length; i++) {
            if(fis[i] == FI_ID) {
                found = true;
                fiAdd = gettheFI(FI_ID);
                req = request[support.append(FI_ID, msg.sender)];
                break;
            }
        }
        return(found, fiAdd, req);
    }

    // Common Interfacc

    // Updates the KYC request (Either Approves or Rejects)
    function checkIt() public view returns(appearances.User memory) {
        require(msg.sender != address(0), "Sender ID Empty");
        require(users[msg.sender].ID != address(0), "User ID Empty");
        return users[msg.sender];
    }

    // Get client's details
    function gettheClientDetials(address ID) public view isClientValid(ID)
    returns(appearances.Client memory) {
        return getClientDetail(ID);
    }
    
    // Get Financial Institution's details 
    function getFIDetails(address ID) public view isFIValid(ID)
    returns (appearances.FI memory) {
        return gettheFI(ID);
    }

}