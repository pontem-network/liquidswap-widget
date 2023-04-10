import type { PropType as __PropType } from 'vue';
import { AptosTxPayload } from '../../../types/aptosResources';
declare const _sfc_main: import("vue").DefineComponent<{
    payload: {
        type: __PropType<AptosTxPayload>;
        required: true;
    };
    title: {
        type: __PropType<string | undefined>;
        required: false;
    };
    description: {
        type: __PropType<string | undefined>;
        required: false;
    };
    gas: {
        type: __PropType<number | undefined>;
        required: false;
    };
    maxGas: {
        type: __PropType<number | undefined>;
        required: false;
    };
    minGas: {
        type: __PropType<number | undefined>;
        required: false;
    };
    gasPrice: {
        type: __PropType<number | undefined>;
        required: false;
    };
    maxGasPrice: {
        type: __PropType<number | undefined>;
        required: false;
    };
    minGasPrice: {
        type: __PropType<number | undefined>;
        required: false;
    };
    stable: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
    frontrun: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("success" | "close" | "back" | "reject")[], "success" | "close" | "back" | "reject", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    payload: {
        type: __PropType<AptosTxPayload>;
        required: true;
    };
    title: {
        type: __PropType<string | undefined>;
        required: false;
    };
    description: {
        type: __PropType<string | undefined>;
        required: false;
    };
    gas: {
        type: __PropType<number | undefined>;
        required: false;
    };
    maxGas: {
        type: __PropType<number | undefined>;
        required: false;
    };
    minGas: {
        type: __PropType<number | undefined>;
        required: false;
    };
    gasPrice: {
        type: __PropType<number | undefined>;
        required: false;
    };
    maxGasPrice: {
        type: __PropType<number | undefined>;
        required: false;
    };
    minGasPrice: {
        type: __PropType<number | undefined>;
        required: false;
    };
    stable: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
    frontrun: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onBack?: ((...args: any[]) => any) | undefined;
    onSuccess?: ((...args: any[]) => any) | undefined;
    onReject?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
