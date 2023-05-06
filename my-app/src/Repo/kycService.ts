import { FI, Client, KYCRequest, User } from "./Function";
import { contract_address } from "./config";
import {getCurrentEpoch} from "../unities";
import {Contract, ethers,} from "ethers"


let kycData = require("./KYC.json");
let abi = kycData["abi"]

export class KycServices {
    private static instance: KycServices;
    private _KycContract!: Contract;
    private _accountAdress: string | undefined;
    static eventContract: Contract;

    public static getInstance(): KycServices {
        if (!KycServices.instance) {
          KycServices.instance = new KycServices();
        };
        return KycServices.instance;
    };

    walletChecking = async () => {
        try{
            const { ethereum  } = window;
            if (!ethereum) {
                alert("Get MetaMask!");
                return false;
            }
            await ethereum.enable();

            const accounts = await ethereum.request({
                method: "eth_requestAccounts",
              });
              
            //   await ethereum.request({
            //     method: "wallet_switchEthereumChain",
            //     params: [{ chainId: `0x${Number(4).toString(16)}` }],
            //   });
              this._accountAdress = accounts[0];
              this._KycContract = this.getContract(contract_address);
              KycServices.eventContract = this._KycContract;
              return true;
            } catch (error) {
              console.log(error);
              return false;
            }
          };

    async enableETH() {
        return await this.walletChecking();
    };

    getContract(contract_address: string) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const singer = provider.getSigner();
        return new ethers.Contract(contract_address, abi, singer)
    };   

    /* Admin Interface */
    async AllFI(pageNumber:number): Promise<[number, FI[]]> {
        try {
            await this.enableETH();
            const res = await this._KycContract.AllFI(pageNumber);
            return res;
        }catch (error) {
            throw error;
        };
    };

    async AddFIAccount(fi: FI) {
        try {
            await this.enableETH();
            const res = await this._KycContract.AddFIAccount(fi);
            return res;
        } catch (error) {
            throw error;
        };
    };

    async FIUpdate(data: {id: string; email: string; name: string;}) {
        try {
            await this.enableETH();
            const res = await this._KycContract.FIUpdate(
                data.id,
                data.email,
                data.name
            );
            return res;
        } catch (error) {
            throw error;
        };
    };

    async ActiveteandDeactivete(id: string, status: boolean) {
        try {
            await this.enableETH();
            const res = await this._KycContract.ActiveteandDeactivete(id, status);
            return res;
        } catch (error) {
            throw error;
        };
    };

    /* Financial Insitution Interface */ 
    async getClientofFI(pageNumber: number): Promise<[number, KYCRequest[]]> {
        try {
            await this.enableETH();
            const res = await this._KycContract.getClientofFI(pageNumber);
            return res;
        }catch (error) {
            throw error;
        };
    };

    async gettheClientDetials(id: string): Promise<Client> {
        try {
            await this.enableETH();
            const res = await this._KycContract.gettheClientDetials(id);
            return res;
        }catch (error) {
            throw error;
        };
    };

    async AddKYC(client: Client, time: number, note: string) {
        try {
            await this.enableETH();
            const res = await this._KycContract.AddKYC(client, time, note);
            return res;
        } catch (error) {
            throw error;
        };
    };

    async reKYC(id: string, note: string) {
        try {
            await this.enableETH();
            const res = await this._KycContract.reKYC(id, note);
            return res;
        } catch (error) {
            throw error;
        };
    };

    async KYCVerification(data: {
        id: string;
        note:string,
        isVerified: boolean,
    }) {
        try {
            await this.enableETH();
            const res = await this._KycContract.KYCVerification(
                data.id,
                data.isVerified,
                data.note
            );
            return res
        } catch (error) {
            throw error;
        };
    };

    async searchClient(id: string): Promise<[boolean, FI, KYCRequest]> {
        try{
            await this.enableETH();
            const res = await this._KycContract.searchClient(id);
            return res;
        } catch (error) {
            throw error;
        };
    };

    /* Client Interface */
    async FIrequest(currentPageNumber: number):
    Promise<[number, KYCRequest[]]> {
        try {
            await this.enableETH();
            const res = await this._KycContract.FIrequest(currentPageNumber);
            return res
        } catch (error) {
            throw error;
        };
    };

    async getFIDetails(id: string): Promise<FI> {
        try {
            await this.enableETH();
            const res = await this._KycContract.getFIDetails(id);
            return res;
        } catch (error) {
            throw error;
        };
    };

    async KYCaction(fiId: string, isApproved: boolean, note: string) {
        try {
            await this.enableETH();
            const res = await this._KycContract.KYCaction(
                fiId, isApproved, note
            );
            console.log(res, 'response header');
            return res;
        } catch (error) {
            throw error;
        };
    };

    async updateProfile(name: string, email: string, number: string) {
        try {
            await this.enableETH();
            const res = await this._KycContract.updateProfile(
                name, email, number
            );
            return res;
        } catch (error) {
            throw error;
        };
    };

    async updateHash(hash: string) {
        try {
            await this.enableETH();
            const epochPastSince = getCurrentEpoch();
            const res = await this._KycContract.updateHash(
                hash, epochPastSince
            );
            return res;
        } catch (error) {
            throw error;
        };
    };

    async removePremission(id: string, note: string) {
        try {
            await this.enableETH();
            const res = await this._KycContract.removePremission(
                id, note
            );
            return res;
        } catch (error) {
            throw error;
        };
    };

    async searchforFI(id: string): Promise<[boolean, FI, KYCRequest]> {
        try {
            await this.enableETH();
            const res = await this._KycContract.searchforFI(id);
            return res;
        } catch (error) {
            throw error;
        };
    };

    async getUserInfo(): Promise<User> {
        try {
            await this.enableETH();
            const res = await this._KycContract.checkIt();
            return res;
        } catch (error) {
            throw error;
        };
    };  
};

export const filter = {
    address: contract_address,
    topics: [ethers.utils.id(
        "FIAdded(address ID,string name,string email,string SwiftCode)"
        ),
    ],
};

export function Decodeuint8arr(uint8array: any) {
    return new TextDecoder("utf-8").decode(uint8array);
};