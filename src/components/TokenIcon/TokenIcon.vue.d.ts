declare const _sfc_main: import("vue").DefineComponent<{
    logo: {
        type: StringConstructor;
        required: false;
    };
    type: {
        type: StringConstructor;
        required: false;
    };
    size: {
        type: StringConstructor;
        required: false;
    };
    class: {
        type: StringConstructor;
        required: false;
    };
}, {
    props: any;
    tokenImageProps: import("vue").ComputedRef<{
        src: string;
        size?: undefined;
        address?: undefined;
        class?: undefined;
    } | {
        size: string | undefined;
        address: string | undefined;
        class: string | undefined;
        src?: undefined;
    }>;
    IdentificationIcon: import("vue").DefineComponent<{
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
        hashCode: (s?: string | undefined) => number;
        icon: import("vue").ComputedRef<any>;
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
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    logo: {
        type: StringConstructor;
        required: false;
    };
    type: {
        type: StringConstructor;
        required: false;
    };
    size: {
        type: StringConstructor;
        required: false;
    };
    class: {
        type: StringConstructor;
        required: false;
    };
}>>, {}>;
export default _sfc_main;
