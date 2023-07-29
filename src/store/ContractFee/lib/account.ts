import {Account, Transaction} from "@mavensafe/momentum-safe-sdk";
import {AptosAccount, TxnBuilderTypes} from "aptos";
import {TypeMessage} from "@mavensafe/momentum-safe-sdk/dist/types/modules/Transaction";

export class TestAccount extends Account {
    constructor(public readonly _account = new AptosAccount()) {
        super(_account.address().hex(), _account.pubKey().hex());
    }

    async walletSignTxnImpl(
        txn: Transaction
    ): Promise<TxnBuilderTypes.SignedTransaction> {
        const signingMessage = txn.getSigningMessage();
        const sigBytes = this._account.signBuffer(signingMessage);
        const pk = new TxnBuilderTypes.Ed25519PublicKey(this._account.pubKey().toUint8Array());
        const signature = new TxnBuilderTypes.Ed25519Signature(sigBytes.toUint8Array());
        const authenticator = new TxnBuilderTypes.AccountAuthenticatorEd25519(pk, signature);
        return new TxnBuilderTypes.SignedTransaction(txn.raw, authenticator);

    }

    async walletSignTypeMessageImpl(message: TypeMessage): Promise<TxnBuilderTypes.Ed25519Signature> {
        const sig = this._account.signBuffer(message.getSigningMessage());
        return new TxnBuilderTypes.Ed25519Signature(sig.toUint8Array());
    }

}