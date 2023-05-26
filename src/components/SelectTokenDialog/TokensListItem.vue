<template>
  <div class="preset-list__item">
    <img :src="preset?.logo" alt="" />
    <div class="preset-list__item-content">
      <span>{{ preset.name }}</span>
      <span
        >{{ preset.tokens?.length || 0 }} tokens
        <i
          class="pi pi-cog"
          aria-haspopup="true"
          aria-controls="preset_menu"
          @click="toggle"
        />
        <p-menu id="preset_menu" ref="menu" :model="items" :popup="true" />
      </span>
    </div>
    <p-input-switch
      v-model="enabled"
      :disabled="!preset.options?.switchable"
      class="switch ml-auto"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRefs } from 'vue';
import PMenu from 'primevue/menu';
import PInputSwitch from 'primevue/inputswitch';


interface IProps {
  preset: {
    logo: string;
    name: string;
    tokens: string[];
    enabled: boolean;
    options: {
      switchable: boolean;
    };
  };
}

const props = defineProps<IProps>();
const { preset } = toRefs<IProps>(props);

const enabled = computed({
  get: () => preset.value.enabled,
  set(value) {
    console.debug(value);
  },
});

const menu = ref();
const items = ref([
  {
    label: 'View List',
    command: () => {
      // TODO: View list action
    },
  },
  {
    label: 'Remove List',
    command: () => {
      // TODO: Remove list action
    },
  },
]);

</script>

