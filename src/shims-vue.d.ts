// 对.vue文件进行兼容的文件
// 用以解决.ts文件中找不到.vue文件的问题
// shims-vue.d.ts
declare module '*.vue' {
    import { ComponentOptions } from 'vue'
    const componentOptions: ComponentOptions
    export default componentOptions
  }

  //第二种方法
// declare module '*.vue' {
//     import { Component } from 'vue'
//     const component: Component
//     export default component
//   }