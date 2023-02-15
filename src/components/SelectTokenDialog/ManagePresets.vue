<template>
  <div class="dialog-step manage_presets">
    <DialogHeader
      title="Manage Coin Lists"
      :has-back="true"
      @close="onClose"
      @back="onBack"
    />
    <div class="dialog-step__content">
<!--      <div class="switch-container mt-1">-->
<!--        <div-->
<!--          class="switch-container__switch"-->
<!--          :class="{ isSelected: manageSwitch === 'lists' }"-->
<!--          @click="switchSelected('lists')"-->
<!--        >-->
<!--          <p>Lists</p>-->
<!--        </div>-->
<!--        <div-->
<!--          :class="{ isSelected: manageSwitch === 'coins' }"-->
<!--          class="switch-container__switch"-->
<!--          @click="switchSelected('coins')"-->
<!--        >-->
<!--          <p>Coins</p>-->
<!--        </div>-->
<!--      </div>-->
      <div
        v-show="manageSwitch === 'lists'"
        style="opacity: 0.3; cursor: default"
      >
        <div class="address-import">
          <InputText
            v-model.trim="addressImportStr"
            spellcheck="false"
            class="address-import__input"
            placeholder="https:// or ipfs:// or ENS name"
            disabled
          />
        </div>
        <div class="dialog-step__divider" />
        <div class="preset-list">
          <TokensListItem
            v-for="preset in presets"
            :key="preset.name"
            :preset="preset"
          />
        </div>
        <template v-if="customPools.length">
          <h3>Custom Pools</h3>
          <div class="pools-list">
            <div v-for="pool in customPools" :key="pool.id">
              <div class="pool-item">
                <div class="pool-item__details">
                  <PButton
                    class="pool-item__delete p-button-secondary"
                    icon="pi pi-trash"
                    @click="onPoolDelete(pool.id)"
                  />
                  <div class="pool-item__tokens">
                    <div class="pool-item__token">
                      <TokenIcon
                        :logo="pool.tokens[0].value?.logo"
                        :type="pool.tokens[0].value?.type"
                        size="16"
                      />
                      <div class="pool-item__token-content">
                        <span>{{ pool.tokens[0].value?.symbol }}</span>
                        <span>{{ pool.tokens[0].value?.name }}</span>
                      </div>
                    </div>
                    <div class="pool-item__token">
                      <TokenIcon
                        :logo="pool.tokens[1].value?.logo"
                        :type="pool.tokens[1].value?.type"
                        size="16"
                      />
                      <div class="pool-item__token-content">
                        <span>{{ pool.tokens[1].value?.symbol }}</span>
                        <span>{{ pool.tokens[1].value?.name }}</span>
                      </div>
                    </div>
                  </div>
                  <div
                    v-if="pool.curve == curves.stable"
                    class="pool-item__row flex ml-auto mr-2"
                  >
                    <img src="../../assets/stableIcon.svg" />
                    <p style="margin-left: 0.3rem">Stable</p>
                  </div>
                  <PInputSwitch
                    class="switch"
                    :model-value="pool.enabled"
                    @update:model-value="pool.setEnabled"
                  />
                </div>
              </div>
            </div>
          </div>
        </template>
        <PInlineMessage v-if="error" class="error mt-auto block mb-2">
          One of the lists must be activated
        </PInlineMessage>
      </div>

      <CoinsList v-show="manageSwitch === 'coins'" />
    </div>
    <div class="dialog-step__footer">
      <div v-show="manageSwitch === 'coins'" class="coins-info__wrap">
        <p>Custom coins stored locally in your browser</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DialogHeader from '@/components/DialogHeader/DialogHeader.vue';
import { TokenIcon } from '@/components/TokenIcon';
import { useStore, useTokensStore } from '@/store';
import { computed, ref } from 'vue';
import CoinsList from './Coins/CoinsList.vue';
import TokensListItem from './TokensListItem.vue';
import PButton from "primevue/button";
import PInlineMessage from "primevue/inlinemessage";
import PInputSwitch from "primevue/inputswitch";

const emits = defineEmits(['back', 'close', 'navigate']);

const tokensStore = useTokensStore();
const { curves } = useStore();

type TManageSwitch = 'lists' | 'coins';
const manageSwitch = ref<TManageSwitch>('coins');
// function switchSelected(type: TManageSwitch) {
//   manageSwitch.value = type;
// }

const addressImportStr = ref<string>('');

const error = ref(false);
const presets = computed(() => {
  return [];
  /* orderBy(
    Object.values(poolsStore.presets).filter((p) => !p.options.ghost),
    ['name'],
    ['asc']
  ); */
});

const customPools = computed(() => {
  return [] /* Object.values(poolsStore.presets) */
    .filter((p) => p.options.ghost)
    .map((p) => p.pools)
    .flat()
    .map((pool) => {
      return {
        ...pool,
        setEnabled: (v: boolean) => {
          pool.enabled = v;
        },
        tokens: [
          computed(() => tokensStore.getToken(pool.tokens[0])),
          computed(() => tokensStore.getToken(pool.tokens[1])),
        ],
      };
    });
});

function onPoolDelete(/* id: ID */) {
  // poolsStore.deletePool(id);
}

function checkErrors() {
  return false;
  // error.value =
  //   Object.values(poolsStore.presets).filter((p) => p.enabled).length === 0;
  // return error.value;
}

function onClose() {
  if (!checkErrors()) {
    error.value = false;
    emits('close');
  }
}

function onBack() {
  if (!checkErrors()) {
    error.value = false;
    emits('back');
  }
}
</script>
