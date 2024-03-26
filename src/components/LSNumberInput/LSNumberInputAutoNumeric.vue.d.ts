declare const _sfc_main: import("vue").DefineComponent<{
    modelValue: {
        type: NumberConstructor;
        default: undefined;
    };
    maxDecimals: {
        type: NumberConstructor;
        default: number;
    };
    minimumValue: {
        type: StringConstructor;
        default: string;
    };
    shouldBeUpdatedFlag: {
        type: BooleanConstructor;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input" | "update:modelValue")[], "input" | "update:modelValue", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    modelValue: {
        type: NumberConstructor;
        default: undefined;
    };
    maxDecimals: {
        type: NumberConstructor;
        default: number;
    };
    minimumValue: {
        type: StringConstructor;
        default: string;
    };
    shouldBeUpdatedFlag: {
        type: BooleanConstructor;
    };
}>> & {
    "onUpdate:modelValue"?: ((...args: any[]) => any) | undefined;
    onInput?: ((...args: any[]) => any) | undefined;
}, {
    modelValue: number;
    shouldBeUpdatedFlag: boolean;
    maxDecimals: number;
    minimumValue: string;
}>;
export default _sfc_main;
