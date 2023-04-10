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
    field: {
        type: __PropType<"from" | "to" | "none" | undefined>;
        required: false;
    };
}, {
    show: () => void;
    hide: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("update:actionToken" | "update:secondaryToken")[], "update:actionToken" | "update:secondaryToken", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    actionToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    secondaryToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    field: {
        type: __PropType<"from" | "to" | "none" | undefined>;
        required: false;
    };
}>> & {
    "onUpdate:actionToken"?: ((...args: any[]) => any) | undefined;
    "onUpdate:secondaryToken"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
