<template>
<router-view />
</template>

<script lang="ts">
import {
    provide,
    ref
} from 'vue'
import {
    router
} from './router';
//菜单点击显示点击隐藏功能
export default {
    name: 'App',
    setup() {
        //获取浏览器的宽度
        const width = document.documentElement.clientWidth;
        //当宽度小于等于500时，menuVisible初始值为false（认为是手机）
        const menuVisible = ref(width <= 500 ? false : true);
        provide('menuVisible', menuVisible); //set
        router.afterEach(() => {
            if (width <= 500) {
                menuVisible.value = false;
            }
        });
    }
}
</script>
