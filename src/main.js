import { createApp } from "vue";
import store from "./store/store.js";
import App from "./App.vue";
import vSelect from "vue-select";
import VueCountdown from "@smithalan2/vue-countdown";
// import Toasted from "vue-toasted";
import Toaster from "@meforma/vue-toaster";
import "vue-select/dist/vue-select.css"; // css
import "charts.css"; //css

createApp(App)
	.use(Toaster, {
		position: "top",
	})
	.use(store)
	.component("v-select", vSelect)
	.component(VueCountdown.name, VueCountdown)
	.mount("#app");
