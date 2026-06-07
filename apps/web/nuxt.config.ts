export default defineNuxtConfig({
  compatibilityDate: "2025-01-01",
  devtools: { enabled: true },
  css: ["nes.css/css/nes.min.css", "~/assets/styles/main.css"],
  app: {
    head: {
      title: "哥布林巢穴",
      meta: [
        {
          name: "description",
          content: "一个像素风 RPG 基地式 Web 巢穴。"
        }
      ]
    }
  },
  typescript: {
    strict: true,
    typeCheck: true
  },
  vite: {
    server: {
      allowedHosts: ["workspace", "localhost", "127.0.0.1"]
    }
  }
});
