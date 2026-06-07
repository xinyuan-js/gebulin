<template>
  <main class="module-page">
    <NuxtLink class="module-page__back nes-btn is-warning" to="/">返回巢穴</NuxtLink>
    <section class="module-page__panel nes-container is-dark with-title">
      <p class="title">Bedroll</p>
      <p class="module-page__eyebrow">Personal Den</p>
      <h1>铺盖卷</h1>
      <p>这里会放个人资料、身份牌、称号、收藏和账号相关入口。</p>

      <div class="module-grid">
        <article class="module-card">
          <strong>身份牌</strong>
          <span>用户名、哥布林身份和当前权限。</span>
        </article>
        <article class="module-card">
          <strong>随身破烂</strong>
          <span>收藏、道具和最近访问。</span>
        </article>
        <article class="module-card">
          <strong>账号设置</strong>
          <span>后续接 OAuth 账号资料与安全设置。</span>
        </article>
      </div>
    </section>
  </main>
</template>
