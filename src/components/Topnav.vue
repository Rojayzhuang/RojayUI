<template>
<div class="topnav">
    <div class="logo" @click="toggleMenu">LOGO</div>
    <ul class="menu">
        <li>菜单1</li>
        <li>菜单2</li>
    </ul>
    <!-- 添加侧边菜单切换按钮 -->
    <span class="toggleAside"></span>
</div>
</template>

<script lang="ts">
import {
    inject,
    Ref
} from 'vue'
export default {
    setup() {
        const menuVisible = inject < Ref < boolean >> ('menuVisible') //get
        //console.log('topnav 获取的 menuVisible 为：' + menuVisible.value)
        const toggleMenu = () => {
            menuVisible.value = !menuVisible.value
        }
        return {
            toggleMenu
        }
    }
}
</script>

<style lang="scss" scoped>
.topnav {
    background: pink;
    display: flex;
    padding: 16px;
    position: relative;
    z-index: 10;
    justify-content: center;
    align-items: center;

    >.logo {
        max-width: 6em;
        margin-right: auto;
    }

    >.menu {
        display: flex;
        white-space: nowrap;
        flex-wrap: nowrap;

        >li {
            margin: 0 1em;
        }
    }

    >.toggleMenu {}

    @media (max-width:500px) {
        >.menu {
            display: none;
        }

        //当页面达到500px时，logo居中显示（左右都是auto）
        >.logo {
            margin: 0 auto;
        }
    }
}
</style>
