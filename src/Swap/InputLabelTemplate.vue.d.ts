import { PropType } from 'vue';
declare type TUsdEquivalentSuffix = 'M' | 'B' | 'T' | undefined;
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
}, {
    props: any;
    usdBenefitPercent: import("vue").ComputedRef<string | undefined>;
    usdEquivalent: import("vue").ComputedRef<string | undefined>;
    amount2NoENotation: (amount: string, prefix: string) => string;
    getOrderedString: (numberOrder: number, value: string, option: {
        decimal: number;
        prefix: string;
        suffix: TUsdEquivalentSuffix;
    }) => string;
    addNines: (value: string, decimal: number) => string;
    usdBenefitPercentClass: import("vue").ComputedRef<"" | "-green" | "-red" | undefined>;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, "click:maxBalance"[], "click:maxBalance", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
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
    showBalance: boolean;
    usdEquivalent: string | undefined;
    usdBenefitPercent: number;
}>;
export default _sfc_main;
