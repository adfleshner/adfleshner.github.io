<script setup lang="ts">
/**
 * The AF monogram: two slanted strokes and one ribbon swoosh that runs from the A's crossbar into
 * the F's middle bar (the F is drawn like a 7). Letters use the current text colour; the swoosh uses the accent.
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
    <g fill="none" stroke="currentColor" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">
      <path d="M13 86 L35 18 Q38 10 41 18 L50.5 46" />
      <path d="M57 18 L90 18 Q95 18 93 23 L69 86" />
    </g>
    <path
      class="brand-swoosh"
      d="M8 74 C27 73 37 44 57 43.5 L84 43.5 Q88.5 48 84 52.5 L58 52.5 C42 53 32 76 8 74 Z"
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
