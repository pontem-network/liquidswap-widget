// types
import {EventHandle} from "../aptos_type";
import {AptosClient, BCS, HexString, MaybeHexString, Types} from "aptos";
import {Account} from "@mavensafe/momentum-safe-sdk";
import {ContractBase} from "../contract";
import {ArgAddress, ArgU64, toTypeTag} from "../utils";

export type TransferStore = {
    transfer_events: EventHandle<TransferEvent>
}
export type TransferEvent = {
    from: Types.Address,
    to: Types.Address,
    amount: Types.U64,
    fee: Types.U64
}

export class Transfer extends ContractBase {
    static MODULE = 'transfer';
    static METHODS = {
        transfer: 'transfer',
    } as const;
    static STRUCTS = {
        TransferStore: 'TransferStore',
    } as const;

    constructor(contract: Types.Address, sender: Account, client: AptosClient) {
        super(contract, sender, client);
    }

    module(): string {
        return Transfer.MODULE;
    }

    async transfer(to: MaybeHexString, amount: BCS.AnyNumber, coinType: string) {
        const builder = await this.tx_builder();
        builder.method(Transfer.METHODS.transfer);
        builder.args([ArgAddress(to), ArgU64(amount)]);
        builder.type_args([toTypeTag(coinType)]);
        return this.signAndSubmit(builder);
    }

    async getTransferStoreResource(): Promise<TransferStore> {
        const typeTag = this.resourceType(Transfer.STRUCTS.TransferStore);
        const resource = await this.client.getAccountResource(this.contract, typeTag);
        return resource.data as TransferStore;
    }
}
    