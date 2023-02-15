import { AptosCreateTx } from '../../../types/aptosResources';
import ProgressSpinner from 'primevue/progressspinner';
import PButton from "primevue/button";
declare const _sfc_main: import("vue").DefineComponent<{
    tx: {
        type: null;
        required: true;
    };
    description: {
        type: StringConstructor;
        required: false;
    };
}, {
    props: any;
    emits: (event: "rejected" | "close" | "submitted", ...args: any[]) => void;
    state: import("vue").Ref<string | undefined>;
    error: import("vue").Ref<unknown>;
    execute: (txParams: AptosCreateTx | import("vue").Ref<AptosCreateTx | undefined> | undefined) => Promise<string | undefined>;
    timeout: import("vue").ComputedRef<boolean>;
    tx: import("vue").ComputedRef<AptosCreateTx>;
    description: import("vue").ComputedRef<string | undefined>;
    onClose: () => void;
    ProgressSpinner: typeof ProgressSpinner;
    PButton: typeof PButton;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("rejected" | "close" | "submitted")[], "rejected" | "close" | "submitted", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    tx: {
        type: null;
        required: true;
    };
    description: {
        type: StringConstructor;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onRejected?: ((...args: any[]) => any) | undefined;
    onSubmitted?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
