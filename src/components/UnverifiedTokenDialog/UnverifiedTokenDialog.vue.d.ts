import PDialog from 'primevue/dialog';
import PButton from 'primevue/button';
declare const _sfc_main: import("vue").DefineComponent<{}, {
    uc: {
        checkAndConfirm: (coin: string) => boolean;
    };
    display: import("vue").Ref<boolean>;
    emits: (event: "close", ...args: any[]) => void;
    checkAndShow: (token: string) => void;
    show: () => void;
    hide: () => void;
    onClose: () => void;
    readonly PDialog: typeof PDialog;
    readonly PButton: typeof PButton;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "close"[], "close", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>> & {
    onClose?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
