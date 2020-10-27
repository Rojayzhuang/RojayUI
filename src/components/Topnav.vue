<template>
<div class="topnav">
    <div class="logo">
        <svg class="icon">
            <use xlink:href="#icon-bear"></use>
        </svg>LOGO
    </div>
    <ul class="menu">
        <li>
            <router-link to="/doc">文档</router-link>
        </li>
    </ul>
    <!-- 添加侧边菜单切换按钮 -->
    <svg v-if="toggleMenuButtonVisible" class="toggleAside" @click="toggleMenu">
        <use xlink:href="#icon-menu"></use>
    </svg>
</div>
</template>

<script lang="ts">
import {
    inject,
    Ref
} from "vue";
export default {
    //优化左侧边文档按钮（只在文档页面显示）
    props: {
        toggleMenuButtonVisible: {
            type: Boolean,
            default: false
        }
    },
    setup() {
        const menuVisible = inject < Ref < boolean >> ('menuVisible') //get
        //console.log('topnav 获取的 menuVisible 为：' + menuVisible.value)
        const toggleMenu = () => {
            menuVisible.value = !menuVisible.value
        };
        return {
            toggleMenu
        };
    },
};
</script>

<style lang="scss" scoped>
//字体颜色
$color:#007974;

.topnav {
    color: $color;
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

        >svg {
            width: 32px;
            height: 32px;
        }
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
        width: 32px;
        height: 32px;
        //background: url(../images/menu-btn.png) center center no-repeat;
        position: absolute;
        left: 16px;
        top: 50%;
        transform: translateY(-50%);
        //当小于500px才会出现，因此默认为none
        display: none;
        //给左侧菜单icon加背景
        //background: fade-out($color: black, $amount: 0.9);
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
