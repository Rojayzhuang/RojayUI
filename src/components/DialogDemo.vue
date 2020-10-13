<template>
<div>
    DialogDemo 示例
</div>

<h1>示例1</h1>
<Button @click="toggle">toggle</Button>
<!--<Dialog :visible="x" @update:visible="x = $event"> </Dialog>-->
<!--可以优化为,点击ok时执行f1函数，点击cancel时执行f2函数-->
<Dialog v-model:visible="x" :closeOnClickOverlay="false" :ok="f1" :cancel="f2">
    <template v-slot:content>
        <strong>hi</strong>
        <div>hi2</div>
    </template>
    <template v-slot:title>
        <strong>加粗的标题</strong>
    </template>
</Dialog>

<!-- 希望能更简单的打开Dialog -->
<h1>示例2</h1>
<Button @click="showDialog">show</Button>
</template>

<script lang="ts">
import Dialog from '../lib/Dialog.vue'
import Button from '../lib/Button.vue'
import {
    ref
} from 'vue'
import {
    openDialog
} from '../lib/openDialog'
export default {
    components: {
        Dialog,
        Button
    },
    setup() {
        const x = ref(false)
        const toggle = () => {
            x.value = !x.value
        }
        const f1 = () => {
            return false
        }
        const f2 = () => {}
        const showDialog = () => {
            openDialog({
                title: '标题',
                content: '你好',
                ok() {
                    console.log('ok')
                },
                cancel() {
                    console.log('cancel')
                }
            })
        }
        return {
            x,
            toggle,
            f1,
            f2,
            showDialog
        }
    }
}
</script>
