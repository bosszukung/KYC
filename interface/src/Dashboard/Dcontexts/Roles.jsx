import { Positions } from "../../Repo";

export const Roles = {
    "0xe645Db433Ea4e84064E3cDEe6c60978779C0B3aC": Positions.Admin,
    "0xb3288b7B382D26FDDFAc144E842114a77F3E5a45": Positions.FI,
    "0x7a57E99B5e1A225e824efFfB273c0f24D1599284": Positions.Client,
    get: (account) => {
        return Roles[account] || null;
    }
  };