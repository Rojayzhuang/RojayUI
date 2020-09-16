<template>
<router-view />
</template>

<script lang="ts">
import {
    provide,
    ref
} from 'vue'
//菜单点击显示点击隐藏功能
export default {
    name: 'App',
    setup() {
        const menuVisible = ref(false)
        provide('menuVisible', menuVisible) //set
    }
}
</script>
