<template>
<template v-if="visible">

    <!--遮罩层 -->
    <div class="rojay-dialog-overlay" @click="OnClickOverlay"></div>
    <!--本体-->
    <div class="rojay-dialog-wrapper">
        <div class="rojay-dialog">
            <header>
                <slot name="title" /><span @click="close" class="rojay-dialog-close"></span>
            </header>
            <main>
                <slot name="content" />
            </main>
            <footer>
                <Button level="main" @click="ok">OK</Button>
                <Button @click="cancel">Cancel</Button>
            </footer>
        </div>
    </div>
</template>
</template>

<script lang="ts">
import Button from "./Button.vue"
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        //是否点击遮罩层关闭
        closeOnClickOverlay: {
            type: Boolean,
            default: true
        },
        ok: {
            type: Function
        },
        cancel: {
            type: Function
        }
    },
    components: {
        Button,
    },
    setup(props, context) {
        const close = () => {
            context.emit('update:visible', false)
        }
        const OnClickOverlay = () => {
            if (props.closeOnClickOverlay) {
                close()
            }
        }
        const ok = () => {
            /*if (props.ok && props.ok() !== false) {
                close()
            }
            可以缩写为
            如果close不存在，直接执行退出，如果close存在
            再对比返回值和false是否是不相等的，只要不等于false，
            就执行close
            */
            if (props.ok?.() !== false) {
                close()
            }
        }
        const cancel = () => {
            context.emit('cancel')
            close()
        }
        return {
            close,
            OnClickOverlay,
            ok,
            cancel
        }
    }
};
</script>

<style lang="scss">
$radius:4px;
$border-color:#d9d9d9;

.rojay-dialog {
    background: white;
    border-radius: $radius;
    box-shadow: 0 0 3px fade_out(black, 0.5);
    min-width: 15em;
    max-width: 90%;

    &-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: fade-out(black, 0.5);
        z-index: 10;
    }

    &-wrapper {
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 11;
    }

    >header {
        padding: 12px 16px;
        border-bottom: 1px solid $border-color;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 20px;
    }

    >main {
        padding: 12px 16px;
    }

    >footer {
        border-top: 1px solid $border-color;
        padding: 12px 16px;
        text-align: right;
    }

    &-close {
        position: relative;
        display: inline-block;
        width: 16px;
        height: 16px;
        cursor: pointer;

        &::before,
        &::after {
            content: '';
            position: absolute;
            height: 1px;
            background: black;
            width: 100%;
            top: 50%;
            left: 50%;
        }

        &::before {
            transform: translate(-50%, -50%) rotate(-45deg);
        }

        &::after {
            transform: translate(-50%, -50%) rotate(45deg);
        }
    }
}
</style>
