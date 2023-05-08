// SPDX-License-Identifier: GPL-3.0 and MIT

pragma experimental ABIEncoderV2;
pragma solidity >=0.6;

/**
 * Support for the efficient management of auxiliary functions
 * List of customers who are associated with the present financial institution
 * To avoid incurring higher gas fees, the data is paginated when sending it.
 */

library support {

    /* "pageNumber" - page number for which data is needed
     * "users" - user ID that is linked to the appearance of finanacial insitution
     */
    function getIndexes(uint256 pageNumber, address[] memory users) internal pure
        returns(
            uint256 pages, // Total pages available
            uint256 pageLength, // Length of the current page
            uint256 startIndex, // Starting index of the current page
            uint256 endIndex // Ending index of the current page
        ) 
        {
            uint256 remainder_ = users.length % 25;
            pages = users.length / 25;

            if (remainder_ > 0) pages++;
            pageLength = 25;
            startIndex = 25 * (pageNumber - 1);
            endIndex = 25 * pageNumber;

            if (pageNumber > pages) // Page requested is not existing
            { 
                pageLength = 0;
                endIndex = 0;
            } 

            else if (pageNumber == pages && remainder_ > 0) // Last page where we don't have 25 records
            {
                pageLength = remainder_;
                endIndex = users.length;
            }
        }

    /**
     * This function uses to compare the string operations. 
     * string a is to be compared with string b and reture bool.
     */
    function stringsCompare(string memory a, string memory b) internal pure returns (bool) 
        {
            return (keccak256(abi.encodePacked((a))) == keccak256(abi.encodePacked((b))));
        }

    /**
     * This function uses to concatenate two addresses.
     * 'a' as a address 1 and 'b' as a address 2 that need to be appended.
     * It will return string value after the concatenation.
     */
    function append(address a, address b) internal pure returns (string memory)
        {
            return string(abi.encodePacked(a, b));
        }
}