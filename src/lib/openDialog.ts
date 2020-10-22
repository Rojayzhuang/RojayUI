import Dialog from "./Dialog.vue";
import {createApp, h } from "vue";
export const openDialog = (options) =>{
    //除了title、content外还可以有其他参数，此处举例ok，cancel
    const {title, content, ok, cancel} = options;
    const div = document.createElement('div');
    document.body.appendChild(div);
    const close = () => {
        //当监听到false时销毁这个app,使用下面的注释让ts不要对下行代码检测是否错误
        //@ts-ignore
        app.unmount(div);
        div.remove();
    };
    //不能传递visible的写法，点击按钮不会弹出Dialog，需要更改visible属性为true
    //createApp({Dialog}).mount(div)
    const app = createApp({
        render() {
            //h函数可以传递第二个参数visible,同时可以传递属性
            //在点击cancel事件、ok事件后将Dialog隐藏，就是将visible属性改为false
            //因为在这个写法中将visible定为true写死了，因此可以通过销毁app的方式
            //将Dialog关闭
           return h(Dialog, 
            {
                visible: true, 
                "onUpdate:visible":(newVisible)=>{
                if(newVisible === false) {
                    close();
                }
            },
            ok, cancel
        }, {
               //title:title, content: content
               //因为上行代码左右两边是一样的，所以可以缩写为
               title,content,
           }); 
        },
    });
    app.mount(div);
};