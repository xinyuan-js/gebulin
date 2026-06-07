<script setup lang="ts">
import { lairEntrances } from "~/data/lair-entrances";
</script>

<template>
  <main class="home-shell">
    <section class="lair-scene" aria-labelledby="home-title">
      <div class="lair-map__ground" aria-hidden="true" />
      <div class="lair-map__forest lair-map__forest--top" aria-hidden="true" />
      <div class="lair-map__forest lair-map__forest--bottom" aria-hidden="true" />
      <div class="lair-map__forest lair-map__forest--left" aria-hidden="true" />
      <div class="lair-map__forest lair-map__forest--right" aria-hidden="true" />
      <div class="lair-map__pond" aria-hidden="true" />
      <div class="lair-map__garden" aria-hidden="true" />
      <div class="lair-map__road lair-map__road--main-x" aria-hidden="true" />
      <div class="lair-map__road lair-map__road--main-y" aria-hidden="true" />
      <div class="lair-map__road lair-map__road--north-left" aria-hidden="true" />
      <div class="lair-map__road lair-map__road--north-right" aria-hidden="true" />
      <div class="lair-map__road lair-map__road--south-left" aria-hidden="true" />
      <div class="lair-map__road lair-map__road--south-right" aria-hidden="true" />
      <div class="lair-map__road lair-map__road--east-drop" aria-hidden="true" />
      <div class="lair-map__road lair-map__road--west-drop" aria-hidden="true" />
      <div class="lair-map__palisade" aria-hidden="true" />
      <div class="lair-map__camp-gate" aria-hidden="true" />
      <div class="lair-map__plaza" aria-hidden="true" />
      <div class="lair-map__details" aria-hidden="true" />

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
