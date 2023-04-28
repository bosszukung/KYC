import { create, IPFSHTTPClient } from "ipfs-http-client";
import axios from "axios";
import { Error } from "../../../unities";


const authString = "2OQZPjQG12TxfQcrmk2ADaJ9m4x:f5b544cae003d88dfb8a0674dc57c184";
const base64EncodedAuth = window.btoa(authString);
const authorisation = "Basic " + base64EncodedAuth;


export const useIPFS = () => {
  let ipfs:IPFSHTTPClient | undefined;
  (() => {
    try {
      ipfs = create({
        url: "https://ipfs.infura.io:5001",
        headers: {
          authorisation,
        },
      });
    } catch (error) {
      Error("IPFS failure");
      ipfs = undefined;
    }
  })();

  const upload = async (data: any) => {
    try {
      const result = await (ipfs as IPFSHTTPClient).add(data);
      return result;
    } catch (error) {
      Error("Failed to upload");
    }
  };

  const getDataFromIpfs = async (path) => {
    try {
      const response = await axios.get(`https://ipfs.infura.io/ipfs/${path}`);
      if (response.data) {
        return response.data;
      } else {
        Error("Data not found");
        return "";
      }
    } catch (error) {
      Error("Failed to fetch data from ipfs");
    }
  };

  return {
    upload,
    getDataFromIpfs
  };
};
