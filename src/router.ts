import {createWebHashHistory, createRouter} from "vue-router";
import Home from "./views/Home.vue";
import Doc from "./views/Doc.vue";
import SwitchDemo from "./components/SwitchDemo.vue";
import ButtonDemo from "./components/ButtonDemo.vue";
import DialogDemo from "./components/DialogDemo.vue";
import TabsDemo from "./components/TabsDemo.vue";


import Markdown from './components/Markdown.vue';
import { h } from "vue";

const md = filename =>  h(Markdown, {path: `../markdown/${filename}.md`, key:filename})


//新建history对象
const history = createWebHashHistory();
//新建router对象
export const router = createRouter({
    history: history,
    routes:[
        //当用户访问根路径时展示的组件
        {path: "/", component: Home},
        //当用户访问其他路径时展示的组件
        {path: "/doc", component: Doc, 
        children:[
            {path: "", redirect: '/doc/intro' },
            {path: "intro", component: md('intro')},
            {path: "get-started", component: md('get-started') },
            {path: "install", component: md('install') },
            {path: "note", component: md('note') },
            {path: "switch", component: SwitchDemo },
            {path: "button", component: ButtonDemo },
            {path: "dialog", component: DialogDemo },
            {path: "tabs", component: TabsDemo },
            ],
        },
    ],
});
router.afterEach(()=>{
    console.log("路由切换了");
});
