// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.4.25 <0.9.0;

import "../contracts/KYC.sol";
import "../contracts/Appearance.sol";

contract KycTest {
    KYC kycToTest = new KYC("Gareth", "Gareth@gmail.com");

    function isBankSBI() public {
        kycToTest.AddFIAccount(
            appearances.FI({
                ID: address(0x8D0b87E0aD70FdC676aaD0A3aB6A7C184814A1F6),
                name: "GBG",
                email: "admin@GBG.com",
                SwiftCode: "GBG1973",
                KYCCount: 0,
                status: appearances.FIStatus.Active
            })
        );
    }
}