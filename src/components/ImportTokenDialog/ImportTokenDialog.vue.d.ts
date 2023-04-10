import type { PropType as __PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    token: {
        type: __PropType<string>;
        required: true;
    };
    mode: {
        type: __PropType<"from" | "to" | undefined>;
        required: false;
    };
    hasBack: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
}, {
    show: () => void;
    hide: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    token: {
        type: __PropType<string>;
        required: true;
    };
    mode: {
        type: __PropType<"from" | "to" | undefined>;
        required: false;
    };
    hasBack: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
