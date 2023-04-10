import type { PropType as __PropType } from 'vue';
type State = {
    status: 'success';
    tx: any;
} | {
    tx?: any;
    status: 'failed';
    message: string;
};
declare const _sfc_main: import("vue").DefineComponent<{
    state: {
        type: __PropType<State>;
        required: true;
    };
    description: {
        type: __PropType<string | undefined>;
        required: false;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("success" | "close" | "reject")[], "success" | "close" | "reject", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    state: {
        type: __PropType<State>;
        required: true;
    };
    description: {
        type: __PropType<string | undefined>;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onSuccess?: ((...args: any[]) => any) | undefined;
    onReject?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
