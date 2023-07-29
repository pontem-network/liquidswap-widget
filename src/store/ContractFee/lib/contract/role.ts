// types
import {AptosClient, MaybeHexString, Types} from "aptos";
import {EventHandle} from "../aptos_type";
import {Account} from "@mavensafe/momentum-safe-sdk";
import {ContractBase} from "../contract";
import {ArgAddress} from "../utils";

export type RoleStore = {
    collector: Types.Address,
    admin: Types.Address,
    pending_admin: Types.Address,
    set_collector_events: EventHandle<Types.Address>,
    transfer_admin_events: EventHandle<Types.Address>,
    accept_admin_events: EventHandle<Types.Address>
}

export class Role extends ContractBase {
    static MODULE = 'role';
    static METHODS = {
        accept_admin: 'accept_admin',
        set_collector: 'set_collector',
        transfer_admin: 'transfer_admin',
    } as const;
    static STRUCTS = {
        Role: 'Role'
    };

    constructor(contract: Types.Address, sender: Account, client: AptosClient) {
        super(contract, sender, client);
    }

    module(): string {
        return Role.MODULE;
    }

    async accept_admin() {
        const builder = await this.tx_builder();
        builder.method(Role.METHODS.accept_admin);
        return this.signAndSubmit(builder);
    }

    async set_collector(collector: MaybeHexString) {
        const builder = await this.tx_builder();
        builder.method(Role.METHODS.set_collector);
        builder.args([ArgAddress(collector)]);
        return this.signAndSubmit(builder);
    }

    async transfer_admin(admin: MaybeHexString) {
        const builder = await this.tx_builder();
        builder.method(Role.METHODS.transfer_admin);
        builder.args([ArgAddress(admin)]);
        return this.signAndSubmit(builder);
    }

    async getRoleResource():Promise<RoleStore> {
        const typeTag = this.resourceType(Role.STRUCTS.Role);
        const resource = await this.client.getAccountResource(this.contract, typeTag);
        return resource.data as RoleStore;
    }
}
    