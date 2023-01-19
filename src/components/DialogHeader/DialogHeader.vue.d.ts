import PButton from 'primevue/button';
declare const _sfc_main: import("vue").DefineComponent<{
    title: {
        type: StringConstructor;
        required: true;
    };
    hasBack: {
        type: BooleanConstructor;
        required: false;
    };
}, {
    props: any;
    emits: (event: "close" | "back", ...args: any[]) => void;
    onClose: () => void;
    onBack: () => void;
    readonly PButton: typeof PButton;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("close" | "back")[], "close" | "back", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    title: {
        type: StringConstructor;
        required: true;
    };
    hasBack: {
        type: BooleanConstructor;
        required: false;
    };
}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
    onBack?: ((...args: any[]) => any) | undefined;
}, {
    hasBack: boolean;
}>;
export default _sfc_main;
