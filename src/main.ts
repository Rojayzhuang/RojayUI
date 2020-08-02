import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import {createWebHashHistory, createRouter} from 'vue-router'
import Frank from './components/Frank.vue'
import Frank2 from './components/Frank2.vue'


//新建history对象
const history = createWebHashHistory()
//新建router对象
const router = createRouter({
    history: history,
    routes:[
        //当用户访问根路径时展示的组件
        {path: '/', component: Frank},
        //当用户访问其他路径时展示的组件
        {path: '/xxx', component: Frank2}
    ]
})

const app = createApp(App)
app.use(router)
app.mount('#app')

//添加<router-view>,用来告诉应用在何处展示组件