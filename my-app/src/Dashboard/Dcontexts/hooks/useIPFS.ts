import { create, IPFSHTTPClient } from "ipfs-http-client";
import axios from "axios";
import { Error } from "../../../unities";


// SECURITY: never hardcode credentials in frontend source.
// These are read from build-time env vars (see .env.example). Note that any
// value bundled into a React app is still visible to end users, so for real
// production use the IPFS upload should be proxied through a trusted backend
// that holds the Infura credentials server-side.
const projectId = process.env.REACT_APP_INFURA_IPFS_PROJECT_ID ?? "";
const projectSecret = process.env.REACT_APP_INFURA_IPFS_SECRET ?? "";
const base64EncodedAuth = window.btoa(`${projectId}:${projectSecret}`);
const authorization = "Basic " + base64EncodedAuth;


export const useIPFS = () => {
  let ipfs:IPFSHTTPClient | undefined;
  (() => {
    try {
      ipfs = create({
        url: "https://ipfs.infura.io:5001",
        headers: {
          authorization,
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

  const getDataFromIpfs = async (path: string) => {
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
