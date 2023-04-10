import type { PropType as __PropType } from 'vue';
import { AptosCreateTx } from '../../../types/aptosResources';
declare const _sfc_main: import("vue").DefineComponent<{
    tx: {
        type: __PropType<AptosCreateTx>;
        required: true;
    };
    frontrun: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("rejected" | "close" | "submitted")[], "rejected" | "close" | "submitted", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tx: {
        type: __PropType<AptosCreateTx>;
        required: true;
    };
    frontrun: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onRejected?: ((...args: any[]) => any) | undefined;
    onSubmitted?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
