import {FI, FIStatus, DataHashStatus, KYCRequest, KYCStatus} from "../Repo/index.tx";
import PropTypes from 'prop-types'

export const shorterString = (address) => {
    const firstfix = address.substring(0,4).concat(".....");
    const lastfix = address.substring(address.length - 4);
    return firstfix + lastfix;
};

export function CaseCount (data) {
    const dec = {approved: 0, rejected: 0} ;
    const count = data.reduce((dec,item) => {
        if (item.status === KYCStatus.KYCVerified) {
            dec.approved += 1;
        } else if (item.status === KYCStatus.KYCFailed) {
            dec.rejected += 1;
        } else {
            console.error(`Item ${item} is not an instance of KYCRequest`);
        }
        return dec;
    }, dec);
    return count;
}
CaseCount.propTypes = {
    data: PropTypes.arrayOf((PropTypes.instanceOf(KYCRequest))).isRequired,
};



export function adminCaseCount(data) {
    const dec =  {inActive: 0, active: 0}
    return data.reduce((dec, item) => {
        if (item.status === FIStatus.Active) {
            dec.active += 1;
        } else if (item.status === FIStatus.Inactive) {
            dec.inActive += 1;
        } else {
            console.error(`Item ${item} is not an instance of FI`);
        }
        return dec;
    }, dec);
}
adminCaseCount.propTypes= {
    data: PropTypes.arrayOf((PropTypes.instanceOf(FI))).isRequired
};

export function costumerCaseCount (data) {
    const dec = {approved: 0, rejected: 0};
    const count = data.reduce((dec, item) => {
        if (item.dataRequest === DataHashStatus.Approved) {
            dec.approved += 1;
        } else if (item.dataRequest === DataHashStatus.Rejected) {
            dec.rejected += 1;
        } else {
            console.error(`Item ${item} is not an instance of KYCRequest`);
        }
        return dec
    }, dec);
    console.log(count, "case costumer count");
    return count;
}

costumerCaseCount.propTypes = {
    data: PropTypes.arrayOf((PropTypes.instanceOf(KYCRequest))).isRequired,
};
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

