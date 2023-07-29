import {AptosClient, Types} from "aptos";
import {Whitelist} from "./contract/whitelist";
import {Transfer} from "./contract/transfer";
import {Role} from "./contract/role";
import {Swap} from "./contract/swap";
import {Vault} from "./contract/vault";
import {FeeModule} from "./contract/fee_module";
import {Account} from "@mavensafe/momentum-safe-sdk";
import {SDK} from "@pontem/liquidswap-sdk";
import {CONTRACT_FEE} from "@/store/ContractFee/lib/constants";
import {TestAccount} from "@/store/ContractFee/lib/account";

export class Factory {
    readonly sdk: SDK;
    constructor(public readonly client: AptosClient, public readonly contract = CONTRACT_FEE, public readonly sender: Account = new TestAccount() ) {
        this.sdk = new SDK({nodeUrl: client.nodeUrl});
    }

    get whitelist() {
        return new Whitelist(this.contract, this.sender, this.client);
    }

    get transfer() {
        return new Transfer(this.contract, this.sender, this.client);
    }

    get role() {
        return new Role(this.contract, this.sender, this.client);
    }

    get swap() {
        return new Swap(this.contract, this.sender, this.client);
    }

    get vault() {
        return new Vault(this.contract, this.sender, this.client);
    }

    get fee_module() {
        return new FeeModule(this.contract, this.sender, this.client);
    }
}