import {FeeModule} from "./contract/fee_module";
import {Swap} from "./contract/swap";
import {CalculateRatesParams, SDK} from "@pontem/liquidswap-sdk";
import {CreateTXPayloadParams} from "@pontem/liquidswap-sdk/src/modules/SwapModule";
import Decimal from "decimal.js";
import {HexString} from "aptos";

export class SwapHelper {
    constructor(private readonly fee_module: FeeModule, private readonly swap: Swap, private readonly sdk: SDK) {
    }

    async calculateRates(params: CalculateRatesParams) {
        const adjustedparams = {...params};
        const isSwapTo = params.interactiveToken === 'from';
        const fee_numerator = BigInt((await this.fee_module.getSwapFeeResource()).fee_numerator);
        let contractFeeAmount = 0n;
        if (isSwapTo) {
            contractFeeAmount = FeeModule.swap_fee(fee_numerator, BigInt(params.amount.toFixed(0)));
            adjustedparams.amount = new Decimal(params.amount).sub(new Decimal(fee_numerator.toString()));
        }
        let result = await this.sdk.Swap.calculateRates(adjustedparams);

        if(!isSwapTo) { // for swap into
            contractFeeAmount = FeeModule.swap_into_fee(fee_numerator, BigInt(result));
            result = (BigInt(result) + contractFeeAmount).toString();
        }

        console.log('result', result, isSwapTo);

        return {
            result,
            fee_numerator,
        };
    }

    createSwapTransactionPayload(params: CreateTXPayloadParams) {
        const tx = this.sdk.Swap.createSwapTransactionPayload(params);
        const method = tx.function.split('::')[2];
        if (method !== 'swap' && method !== 'swap_into') {
            throw new Error(`Unknown method ${method}`);
        }
        tx.function = `${HexString.ensure(this.swap.contract).hex()}::${this.swap.module()}::${method}`;
        return tx;
    }
}