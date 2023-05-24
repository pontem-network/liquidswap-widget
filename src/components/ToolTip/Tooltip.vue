<template>
  <span :tooltip="tooltipText" :position="position" class="tooltip__custom"><slot /></span>
</template>

<script lang="ts">
export default {
  name: "Tooltip",
  props: {
    tooltipText: {
      default: "Tooltip text",
    },
    position: {
      default: "top",
    },
  },
};
</script>