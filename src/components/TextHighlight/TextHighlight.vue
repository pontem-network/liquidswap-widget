<template>
  <span class="ls-text-highlight">
    <template v-for="(sub, index) of subs" :key="index">
      <mark v-if="sub.isHighlighted">{{ sub.text }}</mark>
      <template v-else>{{ sub.text }}</template>
    </template>
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import escapeRegExp from 'lodash/escapeRegExp';

interface IProps {
  regexp: string | RegExp | object;
  text: string;
}

const props = defineProps<IProps>();

const regexp = computed(() => {
  if (typeof props.regexp === 'string') {
    return new RegExp(escapeRegExp(props.regexp), 'gi');
  }

  return props.regexp as RegExp;
});

const subs = computed(() => {
  const indices = [];
  if (!props.text || !props.regexp) {
    return [{ isHighlighted: false, text: props.text }];
  }

  let match = regexp.value.exec(props.text);
  while (match) {
    if (match[0] === '') {
      break;
    }

    const offset = match.index + match[0].length;
    indices.push([match.index, offset]);
    match = regexp.value.exec(props.text);
  }

  const highlights = mergeRange(indices);
  const chunks = [];
  let lastEnd = 0;

  highlights.forEach(([start, end], index) => {
    if (lastEnd !== start) {
      chunks.push({
        isHighlighted: false,
        text: props.text.slice(lastEnd, start),
        highlightIndex: 0,
      });
    }
    chunks.push({
      isHighlighted: true,
      text: props.text.slice(start, end),
      highlightIndex: index,
    });

    lastEnd = end;
  });

  if (lastEnd !== props.text.length) {
    chunks.push({
      isHighlighted: false,
      text: props.text.slice(lastEnd),
    });
  }

  return chunks;
});

function mergeRange([...ranges]) {
  if (!ranges.length) return [];

  ranges.sort((fir, sec) => {
    if (fir[0] !== sec[0]) return fir[0] - sec[0];
    return fir[1] - sec[1];
  });

  const merged = [];

  let curStart = ranges[0][0];
  let curEnd = ranges[0][1];

  ranges.shift();

  ranges.forEach(([start, end]) => {
    if (start >= curEnd) {
      merged.push([curStart, curEnd]);
      curStart = start;
      curEnd = end;
    } else if (end > curEnd) curEnd = end;
  });

  merged.push([curStart, curEnd]);

  return merged;
}
</script>

<style scoped></style>
