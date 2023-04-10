import type { PropType as __PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    isDefault: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
    modelValue: {
        type: __PropType<number | undefined>;
        required: false;
    };
    toToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    fromToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
}, {
    show: () => void;
    hide: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("hide" | "update:isDefault" | "update:modelValue")[], "hide" | "update:isDefault" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    isDefault: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
    modelValue: {
        type: __PropType<number | undefined>;
        required: false;
    };
    toToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    fromToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
}>> & {
    onHide?: ((...args: any[]) => any) | undefined;
    "onUpdate:isDefault"?: ((...args: any[]) => any) | undefined;
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
