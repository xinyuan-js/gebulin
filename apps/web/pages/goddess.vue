<template>
  <main class="module-page">
    <NuxtLink class="module-page__back nes-btn is-warning" to="/caves">返回洞穴第一层</NuxtLink>
    <section class="module-page__panel nes-container is-dark with-title">
      <p class="title">Goddess Statue</p>
      <p class="module-page__eyebrow">Goddess Agent</p>
      <h1>女神石像</h1>
      <p>
        这里之后会接入女神智能体。不同身份的哥布林会得到不同的神力：
        可能是工具调用，也可能是被派遣出去的子智能体。
      </p>

      <div class="module-grid">
        <article class="module-card">
          <strong>神谕对话</strong>
          <span>v0 先定义聊天入口，后续接智能体会话。</span>
        </article>
        <article class="module-card">
          <strong>身份神力</strong>
          <span>按哥布林身份开放不同工具和子智能体。</span>
        </article>
        <article class="module-card">
          <strong>献祭记录</strong>
          <span>记录调用、结果和审计信息。</span>
        </article>
      </div>
    </section>
  </main>
</template>
