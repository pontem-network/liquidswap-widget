import {AptosClient, BCS, HexString, MaybeHexString, TxnBuilderTypes} from "aptos";
import {APTOS_TOKEN, CoinType, getCoinResourceType, sha3_256} from "@mavensafe/momentum-safe-sdk";

function toAccountAddress(address: MaybeHexString) {
    return TxnBuilderTypes.AccountAddress.fromHex(address);
}

export function ArgAddress(address: MaybeHexString) {
    return BCS.bcsToBytes(toAccountAddress(address));
}

export function ArgAddressVec(addresses: MaybeHexString[]) {
    const serializer = new BCS.Serializer();
    BCS.serializeVector(addresses.map(toAccountAddress), serializer);
    return serializer.getBytes();
}

export function ArgU64(value: BCS.AnyNumber) {
    return BCS.bcsSerializeUint64(value);
}

export const toTypeTag = (tagStr: string) => new TxnBuilderTypes.TypeTagParser(tagStr).parseTypeTag();

export const resourceAccountAddress = (address: MaybeHexString, seed: Uint8Array) => {
    const DERIVE_RESOURCE_ACCOUNT_SCHEME = 255;
    const hash = sha3_256(new Uint8Array([...HexString.ensure(address).toUint8Array(), ...seed, DERIVE_RESOURCE_ACCOUNT_SCHEME]));
    return hash.hex();
}

export async function getBalance(client: AptosClient, address: MaybeHexString, coinType = APTOS_TOKEN): Promise<bigint> {
    const coinStoreTypeTag = getCoinResourceType(coinType);
    try {
        const coinStore = await client.getAccountResource(address, coinStoreTypeTag);
        return BigInt((coinStore.data as any).coin.value);
    } catch (e: any) {
        if (e.errorCode === "resource_not_found") return 0n;
        throw e;
    }
}

export async function getDecimals(client: AptosClient, coinType = APTOS_TOKEN): Promise<number> {
    const coinInfo = await CoinType.fromMoveCoin(client, coinType);
    return coinInfo.decimals;
}