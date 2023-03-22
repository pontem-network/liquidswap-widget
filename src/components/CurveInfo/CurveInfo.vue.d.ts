declare const _sfc_main: import("vue").DefineComponent<{
    type: {
        type: StringConstructor;
        required: true;
    };
    version: {
        type: NumberConstructor;
        required: true;
    };
}, {
    props: any;
    type: import("vue").Ref<string>;
    version: import("vue").Ref<number>;
    stableCurve: import("vue").ComputedRef<string>;
    curve: import("vue").ComputedRef<"uncorrelated" | "stable">;
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
    version: {
        type: NumberConstructor;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
