const Web3 = require("web3");
const fs = require("fs");
const path = require("path");

function getWeb3() {
    return new Web3("HTTP://127.0.0.1:7545")
};

function getKYCContract(web3) {
    const abi = JSON.parse(
        fs.readFileSync(path.resolve(__dirname, "../build/KYC.json"), {
            encoding: "utf-8",
        })
    ).abi;

    return new web3.eth.Contract(
        abi, 
        "0x69D4e379A14Efe71c6FbB8378261deC3f78b7FdA", // KYC Contract Address
        {
            // from: "0x8c3498E4eCd1e58f0f791f1B9679296722020CBa", // Admin Address
            // from: "0x8D0b87E0aD70FdC676aaD0A3aB6A7C184814A1F6", // FI Address
            // from: "0x504e6F69C63275E20429dEF8cf75DFE3455aF585", // FI Address
            // from: "0x93bA35670724A0FA5d6C823CBE721A5143475882", // Client Address
            // from: "0x8F307d0EFe46Dd83cF1b49798A5Bda26aE7214b8", // CLient Address
            gas:6721975, 
        }
    );
};

async function main() {
    const web3 = getWeb3();
    const kycTest = getKYCContract(web3);

    try {
        // Admin
        // await addNewFI(kycTest);
        // await updateFIInfo(kycTest);
        // await deactivateFI(kycTest);
        // await activateFI(kycTest);
        // await getFIsList(kycTest);
        
        // FI
        // await addNewKycRequest(kycTest);
        // await searchForClient(kycTest);
        // await reRequestForDocPermission(kycTest);
        // await markKycVerified(kycTest);
        // await markKycRejected(kycTest);
        // await getClientInfo(kycTest);
        // await getAllClients(kycTest);


        // Client
        // await getAllFIsRequests(kycTest);
        // await getFIInfo(kycTest);
        await updateMyProfile(kycTest);
        // await updateDocumentHash(kycTest);
        // await searchForFI(kycTest);
        // await rejectDatahashPermission(kycTest);
        // await approveDatahashPermission(kycTest);
        // await removeDocumentReadpermission(kycTest);
    } catch (e) {
        console.log("Catch: ", e);
    };
};
/*________________________________________________________________ */

/*Admin Methods*/

// async function addNewFI(kycTest) {
// const info = await kycTest.methods.AddFIAccount({
//     ID:"0x504e6F69C63275E20429dEF8cf75DFE3455aF585",
//     name:"DNB",
//     email:"admin@DNB.com",
//     SwiftCode:"DNB1977",
//     KYCCount:0,
//     status:0,
// }).send();
// console.log(info);
// }

// async function updateFIInfo(kycTest) {
// const info = await kycTest.methods.FIUpdate(
//   "0x504e6F69C63275E20429dEF8cf75DFE3455aF585",
//   "admin@dnb.co.uk",
//   "Danny Bank"
// ).send();
// console.log(info);
// }

// async function deactivateFI(kycTest) {
// const info = await kycTest.methods.ActiveteandDeactivete
// ("0x8D0b87E0aD70FdC676aaD0A3aB6A7C184814A1F6", false).send();
// console.log(info);
// }

// async function activateFI(kycTest) {
// const info_ = await kycTest.methods.ActiveteandDeactivete
// ("0x8D0b87E0aD70FdC676aaD0A3aB6A7C184814A1F6", true).send();
// console.log(info_);
// }

// async function getFIsList(kycTest) {
//     const list = await kycTest.methods.AllFI(1).call();
//     console.log(list);
// }

/*________________________________________________________________________*/

/*FI methods*/

// async function addNewKycRequest(kycTest) {
// const info_ = await kycTest.methods.AddKYC(
//   {
//     ID:"0x93bA35670724A0FA5d6C823CBE721A5143475882",
//     name:"JILL VALENTINE",
//     email:"j.valentine@gmail.com",
//     MobileNumber:1122334455,
//     VerifiedBy:"0x0000000000000000000000000000000000000000",
//     dataHash:"QmTBYA4cVXgpJNchYUxHQcg2NBWb3tRbHJeRen9vgsUmJS",
//     dataUpdated:0, // time when data hash updates
//   },
//   1683487219,
//   "Document permission needed for opend account processing"
// )
// // 
//     {
//         ID:"0x8F307d0EFe46Dd83cF1b49798A5Bda26aE7214b8",
//         name:"BEAN MISTER",
//         email:"b.master@gmail.com",
//         MobileNumber:5544332211,
//         VerifiedBy:"0x0000000000000000000000000000000000000000",
//         dataHash:"QmRooePuD9Lrr67KfH296ekQVvr2mfnpzNFGmkHqheST6n",
//         dataUpdated:0, // time when data hash updates
//    },
//    1683418819,
//    "Document permission needed for opend account processing"
//  )
// .send();
// console.log(info_);
// }

// async function reRequestForDocPermission(kycTest) {
// const info = await kycTest.methods
// .reKYC(
//   "0x93bA35670724A0FA5d6C823CBE721A5143475882",
//   "With no permisison, application will be rejected"
// )
//  "0x8F307d0EFe46Dd83cF1b49798A5Bda26aE7214b8",
//    "With no permisison, application will be rejected"
//  )
// .send();
// console.log(info);
// }

// async function markKycVerified(kycTest) {
// const info = await kycTest.methods.KYCVerification(
//   "0x8F307d0EFe46Dd83cF1b49798A5Bda26aE7214b8",
//   true,
//   "Approve"
// ).send();
// console.log(info);
// }

// async function markKycRejected(kycTest) {
// const info = await kycTest.methods.KYCVerification(
//   "0x93bA35670724A0FA5d6C823CBE721A5143475882",
//   false,
//   "Invalid Documents, Re-upload!"
// ).send();
// console.log(info);
// }

// async function searchForClient(kycTest) {
// const client = await kycTest.methods.searchClient
// ("0x8F307d0EFe46Dd83cF1b49798A5Bda26aE7214b8")
// .call();
// console.log(client);
// }

// async function getClientInfo(kycTest) {
// const details = await kycTest.methods.gettheClientDetials
// ("0x93bA35670724A0FA5d6C823CBE721A5143475882").call();
// console.log(details);
// }

// async function getAllClients(kycTest) {
// const list = await kycTest.methods.getClientofFI(1).call();
// console.log(list);
// }

/*_________________________________________________________________________________*/

/*Customer methods*/

// async function getAllFIsRequests(kycTest) {
// const list = await kycTest.methods.FIrequest(1).call();
// console.log(list);
// }

// async function getFIInfo(kycTest) {
// const _details = await kycTest.methods
// .getFIDetails("0x504e6F69C63275E20429dEF8cf75DFE3455aF585")
// // .getBankDetails("0x0b3722F124249d89232e819D9496C27c32Fa0caa")
// .call();
// console.log(_details);
// }

// async function approveDatahashPermission(kycTest) {
// const info = await kycTest.methods
// .KYCaction("0x504e6F69C63275E20429dEF8cf75DFE3455aF585", true, "")
// // .actionOnKycRequest("0x0b3722F124249d89232e819D9496C27c32Fa0caa", true, "")
// .send();
// console.log(info);
// }

// async function rejectDatahashPermission(kycTest) {
// const _info = await kycTest.methods
// .actionOnKycRequest(
//   "0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0",
//   false,
//   "Loan not required"
// )
// // .actionOnKycRequest(
// //   "0x0b3722F124249d89232e819D9496C27c32Fa0caa",
// //   false,
// //   "Loan not required"
// // )
// .send();
// console.log(_info);
// }

async function updateMyProfile(kycTest) {
const _info = await kycTest.methods
.updateProfile(
  "BEAN MISTER",
  "bean.master@gmail.com",
  2288
)
// .updateProfile("Pushkar Kumar", "kumar.pus95@gmail.com", 9876543210)
.send();
console.log(_info);
}

// async function updateDocumentHash(kycTest) {
// const _info = await kycTest.methods
// .updateDatahash(
//   "QmTNbzET6ANnx6X4xDfeNh5725yKUDuJzbTptAgZedCtfA",
//   1649228284
// )
// .send();
// console.log(_info);
// }

// async function removeDocumentReadpermission(kycTest) {
// const _info = await kycTest.methods
// .removerDatahashPermission(
//   "0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0",
//   "Not intrested to bank with you"
// )
// // .removerDatahashPermission(
// //   "0x0b3722F124249d89232e819D9496C27c32Fa0caa",
// //   "Not intrested to bank with you"
// // )
// .send();
// console.log(_info);
// }

// async function searchForBank(kycTest) {
// const _bank = await kycTest.methods
// .searchBanks("0x8BfAD6c33857AC5d4Ad4D160DBd178c0fA26cDf0")
// // .searchBanks("0x0b3722F124249d89232e819D9496C27c32Fa0caa")
// .call();
// console.log(_bank);
// }

main();