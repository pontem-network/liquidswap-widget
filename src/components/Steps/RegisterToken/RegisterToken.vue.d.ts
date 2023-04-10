import type { PropType as __PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    token: {
        type: __PropType<string>;
        required: true;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("success" | "close" | "back" | "reject")[], "success" | "close" | "back" | "reject", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    token: {
        type: __PropType<string>;
        required: true;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onBack?: ((...args: any[]) => any) | undefined;
    onSuccess?: ((...args: any[]) => any) | undefined;
    onReject?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
