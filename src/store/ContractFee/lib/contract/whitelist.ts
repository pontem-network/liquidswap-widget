// types
import {EventHandle, TableWithLength, vector} from "../aptos_type";
import {AptosClient, BCS, HexString, MaybeHexString, TxnBuilderTypes, Types} from "aptos";
import {Account} from "@mavensafe/momentum-safe-sdk";
import {ContractBase} from "../contract";
import {ArgAddressVec} from "../utils";

export type TransferList = {
    addresses: TableWithLength<Types.Address, Boolean>,
    add_transfer_list_events: EventHandle<vector<Types.Address>>,
    remove_transfer_list_events: EventHandle<vector<Types.Address>>
}

export class Whitelist extends ContractBase {
    static MODULE = 'whitelist';
    static METHODS = {
        add_transfer_list: 'add_transfer_list',
        remove_transfer_list: 'remove_transfer_list',
    } as const;
    static STRUCTS = {
        TransferList: 'TransferList'
    } as const;

    private resources = {} as { transferList?: TransferList };

    constructor(contract: Types.Address, sender: Account, client: AptosClient) {
        super(contract, sender, client);
    }

    module(): string {
        return Whitelist.MODULE;
    }

    async add_transfer_list(addresses: vector<MaybeHexString>) {
        const builder = await this.tx_builder();
        builder.method(Whitelist.METHODS.add_transfer_list);
        builder.args([ArgAddressVec(addresses)]);
        return this.signAndSubmit(builder);
    }

    async remove_transfer_list(addresses: vector<MaybeHexString>) {
        const builder = await this.tx_builder();
        builder.method(Whitelist.METHODS.remove_transfer_list);
        builder.args([ArgAddressVec(addresses)]);
        return this.signAndSubmit(builder);
    }

    async getTransferListResource(): Promise<TransferList> {
        const typeTag = this.resourceType(Whitelist.STRUCTS.TransferList);
        const resource = await this.client.getAccountResource(this.contract, typeTag);
        return resource.data as TransferList;
    }

    async queryTransferListTable(address: MaybeHexString): Promise<boolean> {
        if (this.resources.transferList === undefined) {
            this.resources.transferList = await this.getTransferListResource();
        }
        const transferList = this.resources.transferList;
        return this.client.getTableItem(transferList.addresses.inner.handle, {
            key_type: 'address',
            value_type: 'bool',
            key: HexString.ensure(address).noPrefix(),
        }).catch((e) => {
            if (e.errorCode === "table_item_not_found") return false;
            throw e;
        });
    }
}
    