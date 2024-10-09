import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { inject } from "@vercel/analytics";
import "./assets/tailwind.css";
import "./main.css";

inject();
createApp(App).use(store).use(router).mount("#app");
