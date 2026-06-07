<script setup lang="ts">
import type { LairEntrance } from "~/types/lair";

const props = defineProps<{
  entrance: LairEntrance;
}>();

const isOpen = computed(() => props.entrance.status === "open");
const edgeClasses = computed(() => {
  const classes: string[] = [];

  if (props.entrance.position.x <= 25) classes.push("lair-entrance--edge-left");
  if (props.entrance.position.x >= 75) classes.push("lair-entrance--edge-right");
  if (props.entrance.position.y <= 26) classes.push("lair-entrance--edge-top");

  return classes;
});

const statusLabel = computed(() => {
  switch (props.entrance.status) {
    case "open":
      return "可进入";
    case "locked":
      return "封锁";
    case "hidden":
      return "隐藏";
    case "coming_soon":
      return "塌方";
    default:
      return "未知";
  }
});

function handleClick(event: MouseEvent) {
  if (!isOpen.value) {
    event.preventDefault();
  }
}
</script>

<template>
  <NuxtLink
    class="lair-entrance"
    :class="[
      `lair-entrance--${entrance.tone}`,
      edgeClasses,
      { 'lair-entrance--disabled': !isOpen }
    ]"
    :style="{ left: `${entrance.position.x}%`, top: `${entrance.position.y}%` }"
    :to="isOpen ? entrance.route : '/'"
    :aria-disabled="!isOpen"
    :aria-label="`${entrance.name}，${statusLabel}。${entrance.description}`"
    @click="handleClick"
  >
    <span
      class="lair-entrance__prop"
      :class="`lair-entrance__prop--${entrance.kind}`"
      aria-hidden="true"
    >
      <span />
    </span>
    <span class="lair-entrance__panel">
      <strong>{{ entrance.name }}</strong>
      <small>{{ statusLabel }}</small>
    </span>
    <span class="lair-entrance__bubble" role="tooltip">
      {{ entrance.name }}：{{ entrance.description }}
    </span>
  </NuxtLink>
</template>
