import {AptosClient, HexString, Types} from "aptos";
import {Account, applyDefaultOptions, AptosEntryTxnBuilder, sendSignedTransactionAsync, waitForTransaction} from "@mavensafe/momentum-safe-sdk";

export abstract class ContractBase {
    abstract module():string;
    protected constructor(public readonly contract: Types.Address, public readonly sender: Account, public readonly client: AptosClient) {
    }
    async tx_builder() {
        const builder = new AptosEntryTxnBuilder();
        builder.addr(HexString.ensure(this.contract));
        builder.module(this.module());
        builder.from(this.sender.address());
        builder.withTxConfig(await applyDefaultOptions(this.client, this.sender.address()));
        return builder;
    }

    async signAndSubmit(builder: AptosEntryTxnBuilder) {
        const tx = await builder.build(this.client, this.sender);
        const signedTx = await this.sender.sign(tx) as Uint8Array;
        const {hash} = await sendSignedTransactionAsync(this.client, signedTx);
        return waitForTransaction(this.client, hash);
    }

    resourceType(struct: string):string {
        return `${HexString.ensure(this.contract).hex()}::${this.module()}::${struct}`;
    }

    abortError(err: string):string {
        return `Move abort in ${HexString.ensure(this.contract).hex()}::${this.module()}: ${err}: `;
    }
}