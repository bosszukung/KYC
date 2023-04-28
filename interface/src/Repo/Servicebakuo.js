import { FI, Client, KYCRequest, User } from "./Function";
import { contract_address } from "./config";
import {getCurrentEpoch} from "../unities";
import {Contract, ethers} from "ethers"


let kycData = require("./KYC.json");
let abi = kycData.abi;

export class KYCServices {
    constructor(
    instance = KYCServices,
    evenContract = Contract, 
    _KycContract = '' | undefined,
    _accountAddress = Contract 
    ) {
        this.instance = instance;
        this.evenContract = evenContract;
        this._KycContract = _KycContract;
        this._accountAddress = _KycContract

    }

    static getInstance() {
        this.instance = KYCServices();
        if (!KYCServices.instance) {
          KYCServices.instance = new KYCServices();
        };
        return KYCServices.instance;
    };

    walletChecking = async () => {
        try{
            const { etherreum } = window;
            if (!etherreum) {
                alert("Get MetaMask!");
                return false;
            }
            await etherreum.enable();

            const account = await etherreum.request({
                method: "eth_requestAccount",
            });
            await etherreum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: `0x${Number(4).toString(16)}` }],
            });
            this._accountAddress = account[0];
            this._KycContract = this.getContract(contract_address);
            KYCServices.eventContract = this._KycContract;
            return true;
        } catch (error) {
            console.log(error);
            return false;
        };
    };

    async enableETH() {
        return await this.walletChecking();
    };

    getContract(contractAddress ='') {
        const provider = new ethers.providers.Web3Provider(window.etherreum);
        const singer = provider.getSigner();
        return new ethers.Contract(contractAddress, abi, singer)
    };   

    /* Admin Interface */
    async AllFI(pageNumber=0) {
        try {
            await this.enableETH();
            const res = await this._KycContract.AllFI(pageNumber);
            if (typeof pageNumber !== 'number') {
                throw new Error('pageNumber must be a number');
            };
            const [count, FIs] = res;
            const FiWithType = FIs.map((fis) => {
                return {...fis, type:FI};
            });
            return [count, FiWithType];
        }catch (error) {
            throw error;
        };
    };

    async AddFIAccount(fi=FI) {
        try {
            await this.enableETH();
            const res = await this._KycContract.AddFIAccount(fi);
            if (!(fi instanceof FI)) {
                throw new Error('fi must be a valid FI object');
            };
            return res;
        } catch (error) {
            throw error;
        };
    };

    async FIUpdate(data = {id:'', email:'', name:''}) {
        try {
            await this.enableETH();
            const res = await this._KycContract.FIUpdate(
                data.id,
                data.email,
                data.name
            );
            if (
                typeof data.id !== "string" &&
                typeof data.email !== "string" &&
                typeof data.name !== "string"
            ) {
                throw new Error("id, email, and name must be strings");
            };
            return res;
        } catch (error) {
            throw error;
        };
    };

    async ActiveteandDeactivete(id='', status=false) {
        try {
            await this.enableETH();
            const res = await this._KycContract.ActiveteandDeactivete(id, status);
            if (
                typeof id !== 'string' &&
                typeof status !== 'boolean' 
            ) {
                throw new Error
                ('id must be strings', 'status musrt be boolen');
            };
            return res;
        } catch (error) {
            throw error;
        };
    };

    /* Financial Insitution Interface */ 
    async getClientofFI(pageNumber=0) {
        try {
            await this.enableETH();
            const res = await this._KycContract.getClientofFI(pageNumber);
            if (typeof pageNumber !== 'number') {
                throw new Error('pageNumber must be a number');
            };
            const [count, req] = res;
            const kycRequest = req.map((kyc) => {
                return {...kyc, type:KYCRequest};
            });
            return [count, kycRequest];
        }catch (error) {
            throw error;
        };
    };

    async gettheClientDetials(id='') {
        try {
            await this.enableETH();
            const res = await this._KycContract.gettheClientDetials(id);
            if ( typeof id === 'string') {
                throw new Error('id must be strings');
            };
            const clinet = {...res, type:Client};
            return clinet;
        }catch (error) {
            throw error;
        };
    };

    async AddKYC(client='', time='', note='') {
        try {
            await this.enableETH();
            const res = await this._KycContract.AddKYC(client, time, note);
            if ( 
                !(client instanceof Client) &&
                typeof time ==='number' &&
                typeof note !== 'string'
            ) {
                throw new Error
                ('client must be a valid Cilent object, time must be number, and Note must be string');
            };
            return res;
        } catch (error) {
            throw error;
        };
    };

    async reKYC(id='', note='') {
        try {
            await this.enableETH();
            const res = await this._KycContract.reKYC(id, note);
            if (
                typeof id !== 'string' &&
                typeof note !== 'string'
            ) {
                throw new Error('id and note must be strings');
            };
            return res;
        } catch (error) {
            throw error;
        };
    };

    async KYCVerification(data = {
        id:'',
        note:'',
        isVerfied: false,
    }) {
        try {
            await this.enableETH();
            const res = await this.KYCVerification(
                data.id,
                data.isVerfied,
                data.note
            );
            if (
                typeof data.id !== 'string' &&
                typeof data.isVerfied !== 'boolean' &&
                typeof data.note !== 'string'
            ) {
                throw new Error
                ('id & note must be strings, and isVerified must be boolean');
            };
            return res
        } catch (error) {
            throw error;
        };
    };

    async searchClient(id='') {
        try{
            await this.enableETH();
            const res = await this._KycContract.searchClient(id);
            if(typeof id !== 'string') {
                throw new Error('id must be strings');
            };
            const [isFound, clients, kycrequest] = res;
            if (typeof isFound !=='boolean') {
                throw new Error('isFound must be a boolean');
            };
            const client = clients.map((client) => {
                return {...client, type:Client};
            });
            const kycRequest = kycrequest.map((kyc) => {
                return {...kyc, type:KYCRequest};
            });
            return [isFound, client[0], kycRequest[0]];
        } catch (error) {
            throw error;
        };
    };

    /* Client Interface */
    async FIrequest(currentPageNumber=0) {
        try {
            await this.enableETH();
            const res = await this._KycContract.FIrequest(currentPageNumber);
            if (typeof currentPageNumber !== 'number') {
                throw new Error
                ('currentPageNumber must be number');
            };
            const [count, req] = res;
            const kycRequest = req.map((kyc) => {
                return {...kyc, type:KYCRequest};
            });
            return [count, kycRequest];
        } catch (error) {
            throw error;
        };
    };

    async getFIDetails(id ='') {
        try {
            await this.enableETH();
            const res = await this._KycContract.getFIDetails(id);
            if (typeof id !== 'string') {
                throw new Error('id must be a string');
              };
            const fi = {...res, type:FI};
            return fi
        } catch (error) {
            throw error;
        };
    };

    async KYCaction(fiId='', isApproved=false, note='') {
        try {
            await this.enableETH();
            const res = await this._KycContract.KYCaction(
                fiId, isApproved, note
            );
            if (
                typeof fiId !== 'string' &&
                typeof isApproved !== 'boolean'&&
                typeof note !== 'string'
            ) {
                throw new Error
                ('fiID & note must be strings, and isApproved must be a boolean');
            };
            console.log(res, 'response header');
            return res;
        } catch (error) {
            throw error;
        };
    };

    async updateProfile(name='', email='', number='') {
        try {
            await this.enableETH();
            const res = await this._KycContract.updateProfile(
                name, email, number
            );
            if (
                typeof name !== 'string' &&
                typeof email !== 'string' &&
                typeof number !== 'string'
            ) {
                throw new Error ('name, email & number must be strings');
            };
            return res;
        } catch (error) {
            throw error;
        };
    };

    async updateHash(hash='') {
        try {
            await this.enableETH();
            const epochPastSince = getCurrentEpoch();
            const res = await this._KycContract.updateHash(
                hash, epochPastSince
            );
            if (typeof hash !== 'string') {
                throw new Error('hash must be string');
            };
            return res;
        } catch (error) {
            throw error;
        };
    };

    async removePremission(id='', note='') {
        try {
            await this.enableETH();
            const res = await this._KycContract.removePremission(
                id, note
            );
            if(
                typeof id !== 'string' &&
                typeof note !== 'string' 
            ) {
                throw new Error('id & note must be strings');
            };
            return res;
        } catch (error) {
            throw error;
        };
    };

    async searchforFI(id='') {
        try {
            await this.enableETH();
            const res = await this._KycContract.searchforFI(id);
            if (typeof id !== 'string') {
                throw new Error('id must strings');
            };
            const [isFound, fis, kycrequest] = res;
            if (typeof isFound !=='boolean') {
                throw new Error('isFound must be a boolean');
            };
            const FI = fis.map((fi) => {
                return {...fi, type:FI};
            });
            const kycRequest = kycrequest.map((kyc) => {
                return {...kyc, type:KYCRequest};
            });
            return [isFound, FI[0], kycRequest[0]];
        } catch (error) {
            throw error;
        };
    };

    async getUserInfo() {
        try {
            await this.enableETH();
            const res = await this._KycContract.checkIt();
            const user = {...res, type:User};
            return user;
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

export function Decodeuint8arr(uint8array) {
    return new TextDecoder("utf-8").decode(uint8array);
};

