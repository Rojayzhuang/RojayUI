<template>
  <div>Christe&Rojay</div>
  <!直接引用Frank>
  <Frank/>
</template>

<script>
import Frank from './components/Frank.vue'

export default {
  name: 'App',
  components: {
    Frank
    //或者缩写为一个Frank
  }
}
</script>
