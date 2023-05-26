import { PropType } from 'vue';
declare const _sfc_main: import("vue").DefineComponent<{
    isLoading: {
        type: BooleanConstructor;
    };
    showBalance: {
        type: BooleanConstructor;
    };
    mode: {
        type: PropType<"from" | "to">;
    };
    amount: {
        type: PropType<number | undefined>;
    };
    usdEquivalent: {
        type: PropType<string | undefined>;
        require: boolean;
        default: () => undefined;
    };
    usdBenefitPercent: {
        type: NumberConstructor;
        require: boolean;
        default: () => number;
    };
    balance: {
        type: StringConstructor;
        require: boolean;
        default: () => string;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click:maxBalance"[], "click:maxBalance", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    isLoading: {
        type: BooleanConstructor;
    };
    showBalance: {
        type: BooleanConstructor;
    };
    mode: {
        type: PropType<"from" | "to">;
    };
    amount: {
        type: PropType<number | undefined>;
    };
    usdEquivalent: {
        type: PropType<string | undefined>;
        require: boolean;
        default: () => undefined;
    };
    usdBenefitPercent: {
        type: NumberConstructor;
        require: boolean;
        default: () => number;
    };
    balance: {
        type: StringConstructor;
        require: boolean;
        default: () => string;
    };
}>> & {
    "onClick:maxBalance"?: ((...args: any[]) => any) | undefined;
}, {
    isLoading: boolean;
    balance: string;
    usdEquivalent: string | undefined;
    showBalance: boolean;
    usdBenefitPercent: number;
}>;
export default _sfc_main;
