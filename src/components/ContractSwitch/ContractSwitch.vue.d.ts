import SelectButton from "primevue/selectbutton";
import { TVersionType } from '../../types';
declare const _sfc_main: import("vue").DefineComponent<{}, {
    poolsStore: import("pinia").Store<"poolsStore", import("pinia")._UnwrapAll<Pick<{
        isLoading: import("vue").Ref<boolean>;
        isReady: import("vue").Ref<boolean>;
        getPool: import("vue").ComputedRef<(coinX: string, coinY: string, curve: string, contract?: TVersionType | undefined) => Promise<import("../../types/pools").IPersistedPool>>;
        getCurveType: (coinX?: string | undefined, coinY?: string | undefined, version?: TVersionType | undefined) => string | false;
        fetchPoolsList: () => Promise<void>;
        pools: import("vue").Ref<{
            title: string;
            reserveX: number;
            reserveY: number;
            addedX: number;
            addedY: number;
            lp: number;
            isDefault: boolean;
            apr?: number | undefined;
            coinX: string;
            coinY: string;
            curve: import('../../types').TCurveType;
            networkId: number;
            contract?: TVersionType | undefined;
        }[]>;
        poolsMap: Record<string, import("../../types/pools").IPersistedPool>;
        poolsTitleMap: Record<string, string>;
        defaultPools: import("vue").ComputedRef<import("../../types/pools").IPersistedPool[]>;
    }, "isLoading" | "isReady" | "pools" | "poolsMap" | "poolsTitleMap">>, Pick<{
        isLoading: import("vue").Ref<boolean>;
        isReady: import("vue").Ref<boolean>;
        getPool: import("vue").ComputedRef<(coinX: string, coinY: string, curve: string, contract?: TVersionType | undefined) => Promise<import("../../types/pools").IPersistedPool>>;
        getCurveType: (coinX?: string | undefined, coinY?: string | undefined, version?: TVersionType | undefined) => string | false;
        fetchPoolsList: () => Promise<void>;
        pools: import("vue").Ref<{
            title: string;
            reserveX: number;
            reserveY: number;
            addedX: number;
            addedY: number;
            lp: number;
            isDefault: boolean;
            apr?: number | undefined;
            coinX: string;
            coinY: string;
            curve: import('../../types').TCurveType;
            networkId: number;
            contract?: TVersionType | undefined;
        }[]>;
        poolsMap: Record<string, import("../../types/pools").IPersistedPool>;
        poolsTitleMap: Record<string, string>;
        defaultPools: import("vue").ComputedRef<import("../../types/pools").IPersistedPool[]>;
    }, "getPool" | "defaultPools">, Pick<{
        isLoading: import("vue").Ref<boolean>;
        isReady: import("vue").Ref<boolean>;
        getPool: import("vue").ComputedRef<(coinX: string, coinY: string, curve: string, contract?: TVersionType | undefined) => Promise<import("../../types/pools").IPersistedPool>>;
        getCurveType: (coinX?: string | undefined, coinY?: string | undefined, version?: TVersionType | undefined) => string | false;
        fetchPoolsList: () => Promise<void>;
        pools: import("vue").Ref<{
            title: string;
            reserveX: number;
            reserveY: number;
            addedX: number;
            addedY: number;
            lp: number;
            isDefault: boolean;
            apr?: number | undefined;
            coinX: string;
            coinY: string;
            curve: import('../../types').TCurveType;
            networkId: number;
            contract?: TVersionType | undefined;
        }[]>;
        poolsMap: Record<string, import("../../types/pools").IPersistedPool>;
        poolsTitleMap: Record<string, string>;
        defaultPools: import("vue").ComputedRef<import("../../types/pools").IPersistedPool[]>;
    }, "getCurveType" | "fetchPoolsList">>;
    store: import("pinia").Store<"swapStore", import("pinia")._UnwrapAll<Pick<{
        check: () => Promise<void>;
        isBusy: import("vue").ComputedRef<import("vue").Ref<boolean>>;
        isPoolAbsence: import("vue").ComputedRef<boolean>;
        convertRate: import("vue").Ref<number>;
        convertFee: import("vue").Ref<number>;
        convertFeeAmount: import("vue").Ref<number>;
        fromCurrency: {
            reserve: number;
            token?: string | undefined;
            amount?: number | undefined;
        };
        interactiveField: import("vue").Ref<"from" | "to">;
        isUpdatingRate: import("vue").Ref<boolean>;
        lastInteractiveField: import("vue").Ref<"from" | "to">;
        networkId: import("vue").ComputedRef<Readonly<import("vue").Ref<number>>>;
        slippage: import("vue").Ref<number>;
        slippageAmount: import("vue").ComputedRef<number>;
        slippageIsDefault: import("vue").Ref<boolean>;
        toCurrency: {
            reserve: number;
            token?: string | undefined;
            amount?: number | undefined;
        };
        curve: import("vue").Ref<string>;
        toggleCurrencies: () => void;
        refetchRates: (silent?: boolean) => Promise<void>;
        poolExists: import("vue").Ref<boolean>;
        convertError: import("vue").Ref<string | undefined>;
        stableSwapType: import("vue").Ref<"high" | "normal">;
        priceImpact: import("vue").ComputedRef<number>;
        priceImpactFormatted: import("vue").ComputedRef<string>;
        version: import("vue").WritableComputedRef<number>;
        predefinedCurve: import("vue").ComputedRef<string | false>;
    }, "curve" | "version" | "convertRate" | "convertFee" | "convertFeeAmount" | "fromCurrency" | "interactiveField" | "isUpdatingRate" | "lastInteractiveField" | "slippage" | "slippageIsDefault" | "toCurrency" | "poolExists" | "convertError" | "stableSwapType">>, Pick<{
        check: () => Promise<void>;
        isBusy: import("vue").ComputedRef<import("vue").Ref<boolean>>;
        isPoolAbsence: import("vue").ComputedRef<boolean>;
        convertRate: import("vue").Ref<number>;
        convertFee: import("vue").Ref<number>;
        convertFeeAmount: import("vue").Ref<number>;
        fromCurrency: {
            reserve: number;
            token?: string | undefined;
            amount?: number | undefined;
        };
        interactiveField: import("vue").Ref<"from" | "to">;
        isUpdatingRate: import("vue").Ref<boolean>;
        lastInteractiveField: import("vue").Ref<"from" | "to">;
        networkId: import("vue").ComputedRef<Readonly<import("vue").Ref<number>>>;
        slippage: import("vue").Ref<number>;
        slippageAmount: import("vue").ComputedRef<number>;
        slippageIsDefault: import("vue").Ref<boolean>;
        toCurrency: {
            reserve: number;
            token?: string | undefined;
            amount?: number | undefined;
        };
        curve: import("vue").Ref<string>;
        toggleCurrencies: () => void;
        refetchRates: (silent?: boolean) => Promise<void>;
        poolExists: import("vue").Ref<boolean>;
        convertError: import("vue").Ref<string | undefined>;
        stableSwapType: import("vue").Ref<"high" | "normal">;
        priceImpact: import("vue").ComputedRef<number>;
        priceImpactFormatted: import("vue").ComputedRef<string>;
        version: import("vue").WritableComputedRef<number>;
        predefinedCurve: import("vue").ComputedRef<string | false>;
    }, "networkId" | "isBusy" | "isPoolAbsence" | "slippageAmount" | "priceImpact" | "priceImpactFormatted" | "predefinedCurve">, Pick<{
        check: () => Promise<void>;
        isBusy: import("vue").ComputedRef<import("vue").Ref<boolean>>;
        isPoolAbsence: import("vue").ComputedRef<boolean>;
        convertRate: import("vue").Ref<number>;
        convertFee: import("vue").Ref<number>;
        convertFeeAmount: import("vue").Ref<number>;
        fromCurrency: {
            reserve: number;
            token?: string | undefined;
            amount?: number | undefined;
        };
        interactiveField: import("vue").Ref<"from" | "to">;
        isUpdatingRate: import("vue").Ref<boolean>;
        lastInteractiveField: import("vue").Ref<"from" | "to">;
        networkId: import("vue").ComputedRef<Readonly<import("vue").Ref<number>>>;
        slippage: import("vue").Ref<number>;
        slippageAmount: import("vue").ComputedRef<number>;
        slippageIsDefault: import("vue").Ref<boolean>;
        toCurrency: {
            reserve: number;
            token?: string | undefined;
            amount?: number | undefined;
        };
        curve: import("vue").Ref<string>;
        toggleCurrencies: () => void;
        refetchRates: (silent?: boolean) => Promise<void>;
        poolExists: import("vue").Ref<boolean>;
        convertError: import("vue").Ref<string | undefined>;
        stableSwapType: import("vue").Ref<"high" | "normal">;
        priceImpact: import("vue").ComputedRef<number>;
        priceImpactFormatted: import("vue").ComputedRef<string>;
        version: import("vue").WritableComputedRef<number>;
        predefinedCurve: import("vue").ComputedRef<string | false>;
    }, "check" | "toggleCurrencies" | "refetchRates">>;
    version: import("vue").ComputedRef<number>;
    predefinedCurve: import("vue").ComputedRef<string | false>;
    poolVersionOptions: import("vue").ComputedRef<({
        id: number;
        label: string;
        value: number;
        disabled?: undefined;
    } | {
        id: number;
        label: string;
        value: number;
        disabled: boolean;
    })[]>;
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
    SelectButton: typeof SelectButton;
}, {}, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{}>>, {}>;
export default _sfc_main;
