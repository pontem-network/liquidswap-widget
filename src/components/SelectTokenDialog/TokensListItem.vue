<template>
  <div class="preset-list__item">
    <img :src="preset?.logo" alt="" />
    <div class="preset-list__item-content">
      <span>{{ preset.name }}</span>
      <span
        >{{ preset.tokens?.length || 0 }} coins
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

<style lang="scss" scoped>
.preset-list__item {
  display: flex;
  align-items: center;
  padding: 1rem;
  border-radius: 20px;
  background: #28253e;

  img {
    width: 64px;
    height: 64px;
    margin-right: 1rem;
  }

  &-content {
    display: flex;
    flex-direction: column;
    grid-gap: 3px;

    & > span:first-child {
      font-weight: 700;
      font-size: 17px;
      line-height: 24px;
      letter-spacing: 0.1px;
      margin-bottom: 6px;
    }

    & > span:last-child {
      display: flex;
      justify-content: flex-start;
      align-items: center;
      color: #d4c4ed;
      font-size: 0.8125rem;
      font-weight: 500;

      i {
        margin-left: 8px;
        // cursor: pointer;
      }
    }
  }
}
</style>
<style lang="scss">
#preset_menu.p-menu {
  border-radius: 8px;
  padding: 8px 0;
}
#preset_menu.p-menu .p-menuitem-link:not(.p-disabled):hover {
  background: #4a495e;
}
</style>
