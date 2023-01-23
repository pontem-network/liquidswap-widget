export declare type TxPayloadCallFunction = {
    type: 'entry_function_payload';
    function: string;
    type_arguments: string[];
    arguments: string[];
};
declare type TxPayloadInstallModule = {
    type: 'module_bundle_payload';
    modules: {
        bytecode: string;
    }[];
};
export declare type AptosTxPayload = TxPayloadCallFunction | TxPayloadInstallModule;
export declare type AptosCreateTx = {
    sender: string;
    maxGasAmount: string;
    gasUnitPrice: string;
    expiration: string;
    payload: AptosTxPayload;
};
export {};
