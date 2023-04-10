import type { PropType as __PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: __PropType<string>;
        required: true;
    };
    hasBack: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "back")[], "close" | "back", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: __PropType<string>;
        required: true;
    };
    hasBack: {
        type: __PropType<boolean | undefined>;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onBack?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
