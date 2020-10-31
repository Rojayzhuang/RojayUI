import {createWebHashHistory, createRouter} from "vue-router";
import Home from "./views/Home.vue";
import Doc from "./views/Doc.vue";
import SwitchDemo from "./components/SwitchDemo.vue";
import ButtonDemo from "./components/ButtonDemo.vue";
import DialogDemo from "./components/DialogDemo.vue";
import TabsDemo from "./components/TabsDemo.vue";
import DocDemo from "./components/DocDemo.vue";
import Intro from "./views/Intro.vue";
import GetStarted from "./views/GetStarted.vue";
import Install from "./views/Install.vue";
import Note from "./views/Note.vue";

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
            {path: "", component: DocDemo },
            {path: "intro", component: Intro },
            {path: "get-started", component: GetStarted },
            {path: "install", component: Install },
            {path: "note", component: Note },
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
