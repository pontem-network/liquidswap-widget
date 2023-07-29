// types
import {AptosClient, HexString, Types} from "aptos";
import {EventHandle, SignerCapability} from "../aptos_type";
import {Account, APTOS_TOKEN} from "@mavensafe/momentum-safe-sdk";
import {ContractBase} from "../contract";
import {getBalance, resourceAccountAddress, toTypeTag} from "../utils";

export type Fee = {
    coin: String,
    amount: Types.U64
}
export type VaultStore = {
    cap: SignerCapability,
    collect_fee_events: EventHandle<Fee>,
    withdraw_fee_events: EventHandle<Fee>
}

export class Vault extends ContractBase{
    static MODULE = 'vault';
    static METHODS = {
        withdraw_fee: 'withdraw_fee',
    } as const;
    constructor(contract: Types.Address, sender: Account, client: AptosClient) {
        super(contract, sender, client);
    }

    module(): string {
        return Vault.MODULE;
    }

    async withdraw_fee(coinType: string) {
        const builder = await this.tx_builder();
        builder.method(Vault.METHODS.withdraw_fee);
        builder.type_args([toTypeTag(coinType)]);
        return this.signAndSubmit(builder);
    }

    get vaultAddress() {
        const encoder = new TextEncoder();
        return resourceAccountAddress(this.contract, encoder.encode('vault'));
    }

    async collectedFee(coinType: string = APTOS_TOKEN) {
        return getBalance(this.client, this.vaultAddress, coinType);
    }
}
    