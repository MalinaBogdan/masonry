import { createApp } from "vue";
import App from "./App.vue";
import axios from "axios";
import VueAxios from "vue-axios";
import MasonryWall from "@yeger/vue-masonry-wall";

const app = createApp(App);
app.use(VueAxios, axios);
app.use(MasonryWall);
app.provide("axios", app.config.globalProperties.axios);
app.mount("#app");
