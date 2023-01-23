declare const _sfc_main: import("vue").DefineComponent<{
    address: {
        type: StringConstructor;
        required: true;
    };
    useHash: {
        type: BooleanConstructor;
        required: false;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        required: false;
    };
}, {
    props: any;
    iconRef: import("vue").Ref<HTMLElement | undefined>;
    address: import("vue").Ref<string>;
    hashCode: (s?: string) => number;
    icon: import("vue").ComputedRef<HTMLElement>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    address: {
        type: StringConstructor;
        required: true;
    };
    useHash: {
        type: BooleanConstructor;
        required: false;
    };
    size: {
        type: (StringConstructor | NumberConstructor)[];
        required: false;
    };
}>>, {
    useHash: boolean;
}>;
export default _sfc_main;
