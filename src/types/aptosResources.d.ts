export type TxPayloadCallFunction = {
    type: 'entry_function_payload';
    function: string;
    type_arguments: string[];
    arguments: string[];
};
type TxPayloadInstallModule = {
    type: 'module_bundle_payload';
    modules: {
        bytecode: string;
    }[];
};
export type AptosTxPayload = TxPayloadCallFunction | TxPayloadInstallModule;
export type AptosCreateTx = {
    sender: string;
    maxGasAmount: string;
    gasUnitPrice: string;
    expiration: string;
    payload: AptosTxPayload;
};
export type AptosCoinInfoResource = {
    decimals: string;
    name: string;
    supply: {
        vec: [string];
    };
    symbol: string;
};
export {};
