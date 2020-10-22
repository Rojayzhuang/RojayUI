<template>
<div class="topnav">
    <div class="logo">LOGO</div>
    <ul class="menu">
        <li>菜单1</li>
        <li>菜单2</li>
    </ul>
    <!-- 添加侧边菜单切换按钮 -->
    <span class="toggleAside" @click="toggleMenu"></span>
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
    display: flex;
    padding: 16px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
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

    >.toggleAside {
        width: 24px;
        height: 24px;
        background: url(../images/menu-btn.png) center center no-repeat;
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        //当小于500px才会出现，因此默认为none
        display: none;
    }

    @media (max-width:500px) {
        >.menu {
            display: none;
        }

        //当页面达到500px时，logo居中显示（左右都是auto）
        >.logo {
            margin: 0 auto;
        }

        //当页面500px时，出现menu-button
        >.toggleAside {
            display: inline-block;
        }
    }
}
</style>
