import { FI, FIStatus, KYCRequest, KYCStatus, DataHashStatus } from "../Repo";

export const shorterString = (address: string) => {
    const firstfix = address.substring(0,4).concat(".....");
    const lastfix = address.substring(address.length - 4);
    return firstfix + lastfix;
};

export function CaseCounts (data: KYCRequest[] ) {
    
    type Dec = {approved: number; rejected: number } ;
    const count = data.reduce(
        (dec:Dec,item: KYCRequest): Dec => {
        if (item.status === KYCStatus.KYCVerified) {
            dec.approved += 1;
        } else if (item.status === KYCStatus.KYCFailed) {
            dec.rejected += 1;
        } 
        return dec;
    }, 
        { approved: 0, rejected: 0 }
    );
    return count;
}

export function adminCaseCount(data: FI[]) {
    return data.reduce(
        (dec: {inActive: number; active: number}, item) => {
        if (item.status === FIStatus.Active) {
            dec.active += 1;
        } else if (item.status === FIStatus.Inactive) {
            dec.inActive += 1;
        } 
        return dec;
    }, { inActive: 0, active: 0 }
    );
}


export function costumerCaseCount (data: KYCRequest[]) {
    type Dec = {approved: number; rejected: number};
    const count = data.reduce(
        (dec:Dec, item: KYCRequest): Dec => {
        if (item.dataRequest === DataHashStatus.Approved) {
            dec.approved += 1;
        } else if (item.dataRequest === DataHashStatus.Rejected) {
            dec.rejected += 1;
        } 
        return dec
    }, { approved: 0, rejected: 0 }
    );
    console.log(count, "case costumer count");
    return count;
}

export function scroll() {
    try {
      window.scroll({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    } catch (error) {
      window.scrollTo(0, 0);
    }
}

