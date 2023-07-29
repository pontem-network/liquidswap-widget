// types
import {AptosClient, BCS, Types} from "aptos";
import {EventHandle, TableWithLength} from "../aptos_type";
import {Account} from "@mavensafe/momentum-safe-sdk";
import {ContractBase} from "../contract";
import {ArgU64, toTypeTag} from "../utils";

export type FeeSwap = {
    fee_numerator: Types.U64,
    fee_numerator_events: EventHandle<Types.U64>
}
export type FeeTransfer = {
    flat_fee: TableWithLength<String, Types.U64>,
    fee_numerator: Types.U64,
    fee_numerator_events: EventHandle<Types.U64>,
    flat_fee_events: EventHandle<FlatFee>
}
export type FlatFee = {
    coin: String,
    fee: Types.U64
}

export class FeeModule extends ContractBase {
    static MODULE = 'fee_module';
    static METHODS = {
        set_swap_fee: 'set_swap_fee',
        set_transfer_fee_numerator: 'set_transfer_fee_numerator',
        set_transfer_flat_fee: 'set_transfer_flat_fee',
    } as const;
    static STRUCTS = {
        FeeSwap: 'FeeSwap',
        FeeTransfer: 'FeeTransfer',
    } as const;
    static FEE_DENOMINATOR = 10000n;

    private resources = {} as { feeTransfer?: FeeTransfer, feeSwap?: FeeSwap };

    constructor(contract: Types.Address, sender: Account, client: AptosClient) {
        super(contract, sender, client);
    }

    module(): string {
        return FeeModule.MODULE;
    }

    async set_swap_fee(fee_numerator: BCS.AnyNumber) {
        const builder = await this.tx_builder();
        builder.method(FeeModule.METHODS.set_swap_fee);
        builder.args([ArgU64(fee_numerator)]);
        return this.signAndSubmit(builder);
    }

    async set_transfer_fee_numerator(fee_numerator: BCS.AnyNumber) {
        const builder = await this.tx_builder();
        builder.method(FeeModule.METHODS.set_transfer_fee_numerator);
        builder.args([ArgU64(fee_numerator)]);
        return this.signAndSubmit(builder);
    }

    async set_transfer_flat_fee(flat_fee: BCS.AnyNumber, coin_type: string) {
        const builder = await this.tx_builder();
        builder.method(FeeModule.METHODS.set_transfer_flat_fee);
        builder.args([ArgU64(flat_fee)]);
        builder.type_args([toTypeTag(coin_type)]);
        return this.signAndSubmit(builder);
    }

    async getSwapFeeResource(): Promise<FeeSwap> {
        const typeTag = this.resourceType(FeeModule.STRUCTS.FeeSwap);
        const resource = await this.client.getAccountResource(this.contract, typeTag);
        return resource.data as FeeSwap;
    }

    async getTransferFeeResource(): Promise<FeeTransfer> {
        const typeTag = this.resourceType(FeeModule.STRUCTS.FeeTransfer);
        const resource = await this.client.getAccountResource(this.contract, typeTag);
        return resource.data as FeeTransfer;
    }

    async queryTransferFee(coin_type: string) {
        this.resources.feeTransfer = await this.getTransferFeeResource();
        const feeTransfer = this.resources.feeTransfer;
        const flatFee = await this.client.getTableItem(feeTransfer.flat_fee.inner.handle, {
            key_type: '0x1::string::String',
            value_type: 'u64',
            key: coin_type,
        }).catch((e) => {
            if (e.errorCode === "table_item_not_found") return '0';
            throw e;
        });
        return {
            feeNumerator: feeTransfer.fee_numerator,
            flatFee,
        };
    }

    async swap_fee(amount: bigint) {
        const {fee_numerator} = await this.getSwapFeeResource();
        return FeeModule.swap_fee(amount, BigInt(fee_numerator));
    }

    async swap_into_fee(amount: bigint) {
        const {fee_numerator} = await this.getSwapFeeResource();
        return FeeModule.swap_into_fee(amount, BigInt(fee_numerator));
    }

    async transfer_fee(coin_type: string, amount: bigint) {
        const {feeNumerator, flatFee} = await this.queryTransferFee(coin_type);
        return FeeModule.transfer_fee(amount, BigInt(flatFee), BigInt(feeNumerator));
    }

    static transfer_fee(amount: bigint, flat_fee: bigint, fee_numerator: bigint) {
        return amount * fee_numerator / FeeModule.FEE_DENOMINATOR + flat_fee;
    }

    static swap_fee(amount: bigint, fee_numerator: bigint) {
        return amount * fee_numerator / FeeModule.FEE_DENOMINATOR;
    }

    static swap_into_fee(amount: bigint, fee_numerator: bigint) {
        const amountBefore = amount * FeeModule.FEE_DENOMINATOR / (FeeModule.FEE_DENOMINATOR - fee_numerator);
        return amountBefore - amount;
    }

    get FEE_DENOMINATOR() {
        return FeeModule.FEE_DENOMINATOR;
    }
}


    