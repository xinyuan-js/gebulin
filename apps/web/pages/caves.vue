<script setup lang="ts">
import { caveFirstLayerEntrances } from "~/data/lair-entrances";
</script>

<template>
  <main class="home-shell cave-shell">
    <section class="lair-scene cave-layer" aria-labelledby="cave-title">
      <div class="cave-map__rock" aria-hidden="true" />
      <div class="cave-map__wall cave-map__wall--top" aria-hidden="true" />
      <div class="cave-map__wall cave-map__wall--left" aria-hidden="true" />
      <div class="cave-map__wall cave-map__wall--right" aria-hidden="true" />
      <div class="cave-map__path cave-map__path--main-x" aria-hidden="true" />
      <div class="cave-map__path cave-map__path--main-y" aria-hidden="true" />
      <div class="cave-map__path cave-map__path--shrine" aria-hidden="true" />
      <div class="cave-map__path cave-map__path--left-room" aria-hidden="true" />
      <div class="cave-map__path cave-map__path--right-room" aria-hidden="true" />
      <div class="cave-map__path cave-map__path--sleep-room" aria-hidden="true" />
      <div class="cave-map__chamber" aria-hidden="true" />
      <div class="cave-map__crystals" aria-hidden="true" />

      <header class="home-title-card cave-title-card">
        <p class="home-title-card__eyebrow">Cave Layer 01</p>
        <h1 id="cave-title">洞穴第一层</h1>
        <p>主巢穴的地下大厅。破铺盖、仓库和帐篷都先堆在这一层。</p>
      </header>

      <NuxtLink class="cave-layer__back nes-btn is-warning" to="/">返回地表</NuxtLink>

      <LairEntranceMarker
        v-for="entrance in caveFirstLayerEntrances"
        :key="entrance.id"
        :entrance="entrance"
      />
    </section>
  </main>
</template>
