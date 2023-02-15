import PMenu from 'primevue/menu';
import PInputSwitch from 'primevue/inputswitch';
declare const _sfc_main: import("vue").DefineComponent<{
    preset: {
        type: ObjectConstructor;
        required: true;
    };
}, {
    props: any;
    preset: import("vue").Ref<{
        logo: string;
        name: string;
        tokens: string[];
        enabled: boolean;
        options: {
            switchable: boolean;
        };
    }>;
    enabled: import("vue").WritableComputedRef<boolean>;
    menu: import("vue").Ref<any>;
    items: import("vue").Ref<{
        label: string;
        command: () => void;
    }[]>;
    PMenu: typeof PMenu;
    PInputSwitch: typeof PInputSwitch;
}, unknown, {}, {}, import("vue").ComponentOptionsMixin, import("vue").ComponentOptionsMixin, {}, string, import("vue").VNodeProps & import("vue").AllowedComponentProps & import("vue").ComponentCustomProps, Readonly<import("vue").ExtractPropTypes<{
    preset: {
        type: ObjectConstructor;
        required: true;
    };
}>>, {}>;
export default _sfc_main;
