import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { firebaseMessaging } from "./firebase/firebase";

const app = createApp(App);
app.config.globalProperties.$messaging = firebaseMessaging;
app.use(router).mount("#app");
