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
    view: {
        type: __PropType<"select-token" | "manage-presets">;
        required: true;
    };
    mode: {
        type: __PropType<"from" | "to">;
        required: true;
    };
}, {
    show: () => void;
    hide: () => void;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("cancel" | "update:actionToken" | "update:secondaryToken" | "navigate")[], "cancel" | "update:actionToken" | "update:secondaryToken" | "navigate", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    actionToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    secondaryToken: {
        type: __PropType<string | undefined>;
        required: false;
    };
    view: {
        type: __PropType<"select-token" | "manage-presets">;
        required: true;
    };
    mode: {
        type: __PropType<"from" | "to">;
        required: true;
    };
}>> & {
    onCancel?: ((...args: any[]) => any) | undefined;
    "onUpdate:actionToken"?: ((...args: any[]) => any) | undefined;
    "onUpdate:secondaryToken"?: ((...args: any[]) => any) | undefined;
    onNavigate?: ((...args: any[]) => any) | undefined;
}, {}>;
export default _sfc_main;
