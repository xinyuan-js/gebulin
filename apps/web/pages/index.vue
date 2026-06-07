<script setup lang="ts">
import { lairEntrances } from "~/data/lair-entrances";
</script>

<template>
  <main class="home-shell">
    <section class="lair-scene" aria-labelledby="home-title">
      <div class="lair-scene__sky" aria-hidden="true" />
      <div class="lair-scene__moon" aria-hidden="true" />
      <div class="lair-scene__trees lair-scene__trees--far" aria-hidden="true" />
      <div class="lair-scene__trees lair-scene__trees--near" aria-hidden="true" />
      <div class="lair-scene__clearing" aria-hidden="true" />
      <div class="lair-scene__path" aria-hidden="true" />
      <div class="lair-scene__fog lair-scene__fog--left" aria-hidden="true" />
      <div class="lair-scene__fog lair-scene__fog--right" aria-hidden="true" />

      <header class="home-title-card">
        <p class="home-title-card__eyebrow">Gebulin Lair</p>
        <h1 id="home-title">哥布林巢穴</h1>
        <p>一座空旷、阴暗、还在扩张的像素基地。挑个入口进去。</p>
      </header>

      <LairEntranceMarker
        v-for="entrance in lairEntrances"
        :key="entrance.id"
        :entrance="entrance"
      />

      <div class="lair-scene__avatar" aria-label="你站在巢穴中央">
        <span aria-hidden="true" />
      </div>
    </section>
  </main>
</template>
