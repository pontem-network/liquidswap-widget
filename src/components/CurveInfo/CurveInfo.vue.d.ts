declare const _sfc_main: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        required: true;
    };
}, {
    curves: {
        stable: string;
        uncorrelated: string;
    };
    props: any;
    curve: import("vue").ComputedRef<"stable" | "uncorrelated">;
    ToolTip: {
        name: string;
        props: {
            tooltipText: {
                type: StringConstructor;
                default: string;
            };
            position: {
                default: string;
                type: StringConstructor;
            };
        };
    };
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    type: {
        type: StringConstructor;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
