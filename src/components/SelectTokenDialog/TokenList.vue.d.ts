import type { PropType as __PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    actionToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    secondaryToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    poolId: {
        type: __PropType<string | undefined>;
        required: false;
    };
    field: {
        type: __PropType<"from" | "to" | "none" | undefined>;
        required: false;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "update:actionToken" | "navigate" | "update:poolId")[], "close" | "update:actionToken" | "navigate" | "update:poolId", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    actionToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    secondaryToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    poolId: {
        type: __PropType<string | undefined>;
        required: false;
    };
    field: {
        type: __PropType<"from" | "to" | "none" | undefined>;
        required: false;
    };
}>> & {
    "onUpdate:actionToken"?: ((...args: any[]) => any) | undefined;
    onClose?: ((...args: any[]) => any) | undefined;
    onNavigate?: ((...args: any[]) => any) | undefined;
    "onUpdate:poolId"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
