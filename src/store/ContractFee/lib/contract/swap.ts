// types
import {EventHandle, vector} from "../aptos_type";
import {AptosClient, BCS, Types} from "aptos";
import {Account} from "@mavensafe/momentum-safe-sdk";
import {ContractBase} from "../contract";
import {ArgU64, toTypeTag} from "../utils";
import {CalculateRatesParams, SDK} from "@pontem/liquidswap-sdk";

export type SwapStore = {
    swap_events: EventHandle<SwapEvent>
}

export type SwapEvent = {
    curves: vector<String>,
    path: vector<String>,
    amount_in: Types.U64,
    amount_out: Types.U64,
    fee: Types.U64,
}

export class Swap extends ContractBase{
    static MODULE = 'swap';
    static METHODS = {
        swap: 'swap',
        swap_into: 'swap_into',
        swap3: 'swap3',
    } as const;
    static STRUCTS = {
        SwapStore: 'SwapStore',
    } as const;

    readonly sdk: SDK;

    constructor(contract: Types.Address, sender: Account, client: AptosClient) {
        super(contract, sender, client);
        this.sdk = new SDK({nodeUrl: client.nodeUrl});
    }

    module(): string {
        return Swap.MODULE;
    }

    async swap(coin_in_val: BCS.AnyNumber, coin_out_min_val: BCS.AnyNumber, coinTypes: [string, string], curveType: string) {
        const builder = await this.tx_builder();
        builder.method(Swap.METHODS.swap);
        builder.args([coin_in_val, coin_out_min_val].map(ArgU64));
        builder.type_args([...coinTypes, curveType].map(toTypeTag));
        return this.signAndSubmit(builder);
    }

    async swap_into(coin_in_val: BCS.AnyNumber, coin_out_min_val: BCS.AnyNumber, coinTypes: [string, string], curveType: string) {
        const builder = await this.tx_builder();
        builder.method(Swap.METHODS.swap_into);
        builder.args([coin_in_val, coin_out_min_val].map(ArgU64));
        builder.type_args([...coinTypes, curveType].map(toTypeTag));
        return this.signAndSubmit(builder);
    }

    async swap3(coin_in_val: BCS.AnyNumber, coin_out_min_val: BCS.AnyNumber, coinTypes: [string, string, string], curveTypes: [string, string]) {
        const builder = await this.tx_builder();
        builder.method(Swap.METHODS.swap3);
        builder.args([coin_in_val, coin_out_min_val].map(ArgU64));
        builder.type_args([...coinTypes, ...curveTypes].map(toTypeTag));
        return this.signAndSubmit(builder);
    }
}
    