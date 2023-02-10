import { shortAddress } from '../../../utils/hex';
import PButton from "primevue/button";
declare const _sfc_main: import("vue").DefineComponent<{
    state: {
        type: ObjectConstructor;
        required: true;
    };
    description: {
        type: StringConstructor;
        required: false;
    };
}, {
    dialog: import("vue").Ref<any>;
    props: any;
    emits: (event: "success" | "close" | "reject", ...args: any[]) => void;
    networkId: Readonly<import("vue").Ref<number>>;
    networkName: import("vue").ComputedRef<"mainnet" | "testnet">;
    txState: import("vue").ComputedRef<any>;
    isInternalError: import("vue").ComputedRef<boolean>;
    isSuccess: import("vue").ComputedRef<boolean>;
    onCopyAddress: (text: string) => Promise<void>;
    txLink: import("vue").ComputedRef<string>;
    description: import("vue").ComputedRef<string | undefined>;
    txMessage: import("vue").ComputedRef<any>;
    copyAddress: () => void;
    onComplete: () => void;
    shortAddress: typeof shortAddress;
    CopyNotification: import("vue").DefineComponent<{}, {
        NOTIFICATION_DURATION: number;
        display: import("vue").Ref<boolean>;
        animation: import("vue").ComputedRef<{
            animation: string;
        } | undefined>;
        show: () => void;
        hide: () => void;
    }, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
    PButton: typeof PButton;
    ToolTip: {
        name: string;
        props: {
            tooltipText: {
                type: StringConstructor;
                default: string;
            };
            position: {
                default: string;
                type: StringConstructor;
            };
        };
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("success" | "close" | "reject")[], "success" | "close" | "reject", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    state: {
        type: ObjectConstructor;
        required: true;
    };
    description: {
        type: StringConstructor;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onSuccess?: ((...args: any[]) => any) | undefined;
    onReject?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
