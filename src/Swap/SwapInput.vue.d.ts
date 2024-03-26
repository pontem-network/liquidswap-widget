import { PropType } from 'vue';
import { TokenFiledType } from '../types/coins';
import { IStoredToken } from '../types';
declare const _sfc_main: import("vue").DefineComponent<{
    mode: {
        type: PropType<TokenFiledType>;
        required: true;
    };
    model: {
        type: PropType<IStoredToken>;
        default: undefined;
    };
    shouldBeUpdatedFlag: {
        type: BooleanConstructor;
    };
}, {}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, ("input:custom" | "keyup:custom" | "focus:custom" | "change:decimal-difference" | "click:max-balance" | "update:model")[], "input:custom" | "keyup:custom" | "focus:custom" | "change:decimal-difference" | "click:max-balance" | "update:model", import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    mode: {
        type: PropType<TokenFiledType>;
        required: true;
    };
    model: {
        type: PropType<IStoredToken>;
        default: undefined;
    };
    shouldBeUpdatedFlag: {
        type: BooleanConstructor;
    };
}>> & {
    "onInput:custom"?: ((...args: any[]) => any) | undefined;
    "onKeyup:custom"?: ((...args: any[]) => any) | undefined;
    "onFocus:custom"?: ((...args: any[]) => any) | undefined;
    "onChange:decimal-difference"?: ((...args: any[]) => any) | undefined;
    "onClick:max-balance"?: ((...args: any[]) => any) | undefined;
    "onUpdate:model"?: ((...args: any[]) => any) | undefined;
}, {
    model: IStoredToken;
    shouldBeUpdatedFlag: boolean;
}>;
export default _sfc_main;
