import './lib/rojay.scss';
import './index.scss';
import { createApp } from 'vue';
import App from "./App.vue";

import { router } from './router'
import 'github-markdown-css'
import Markdown from './components/Markdown.vue';

const app = createApp(App)
app.use(router)
app.mount('#app')
app.component("Markdown", Markdown)

//添加<router-view>,用来告诉应用在何处展示组件