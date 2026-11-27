<script setup lang="ts">
/**
 * The AF monogram: an italic A, an F drawn like a 7, and one brushstroke swoosh that cuts through
 * both letters. Letters use the current text colour; the swoosh uses the accent.
 * The favicon (public/favicon.svg) is the same drawing on an ink tile.
 */
defineProps<{ size?: number }>()
</script>

<template>
  <svg
    class="brand-mark"
    :width="size ?? 28"
    :height="size ?? 28"
    viewBox="0 0 100 100"
    aria-hidden="true"
    focusable="false"
  >
    <g fill="none" stroke="currentColor" stroke-width="10" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 86 L40 14 Q42 10 44 15 L50 86" />
      <path d="M59 18 L91 18 Q96 18 94 23 L71 86" />
    </g>
    <path
      class="brand-swoosh"
      d="M5 74 Q2 67 8 64 C35 50 63 41 99 35 C67 49 39 62 12 75 Q8 77 5 74 Z"
    />
  </svg>
</template>

<style scoped>
.brand-mark {
  flex-shrink: 0;
  overflow: visible;
}

.brand-swoosh {
  fill: var(--accent);
}
</style>
