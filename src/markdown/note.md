# Vue3造轮子
## 项目前期准备
- **安装yarn，在cmd中使用命令安装即可（需提前安装Node.js）**

```
$ npm install -g yarn  此命令即可完成安装

-i：install 

-g：全局安装（global）,使用 -g 或 --global
```
在命令行中输入

```
$ yarn -version
```
如果有反馈则证明安装完成。

- **在命令行中进入学习目录**  
 本次学习使用的路径为  E:\rojayvue  
  
  
  

- **全局安装create-vite-app**  

```
$ yarn global add create-vite-app@1.18.0
            或者
$ npm i -g create-vite-app@1.18.0

```
在本次学习过程中，使用第一条命令进行安装，后续出现“cva”命令无法使用的情况，选择第二种npm安装解决。  
  
    
    
- **创建项目目录**
```
$ cva rojay-ui-1
或者
$ create-vite-app rojay-ui-1
其中 rojay-ui-1 可以改为任意名称
```

项目创建完成后，给出如下命令

```
$ cd rojay-ui-1
$ npm install (or `yarn`)
$ npm run dev (or `yarn dev`)

```

运行第一个命令后，接着输入yarn即可，yarn进行依赖的安装，相当于**yarn install**  

<font color = "red"> **注意本次使用的版本为v1.0.0-rc.3** </font>

进行完上述操作后即可在浏览器中访问页面了，网址如下：  

```
  Dev server running at:
  > Network:  http://172.20.10.6:3000/  
  > Local:    http://localhost:3000/  
  > Network:  http://192.168.38.177:3000/  
```

[![aKMJRx.png](https://s1.ax1x.com/2020/07/30/aKMJRx.png)](https://imgchr.com/i/aKMJRx)

<font size=6 color = "bule"> **在vscode中进行项目开发** </font>
---

## 小知识
vite 文档给出的命令是  

```
$ npm init vite-app <project-name>  
$ yarn create vite-app <project-name>
```
 
等价于  
全局安装 create-vite-app 然后  

```
$ cva <project-name>
```

等价于  

```
$ npx createa-vite-app <project-name>
```

即 npx 会帮你全局安装用到的包  


---
## 开发阶段
- 注意，在Vue.app文件中的**template**标签中有两个标签，之前的vue是不支持两个标签放在template中

```
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3.0 + Vite" />
</template>

```

此处将其中的两个标签删掉，改为自己的标签。
但是Vue3的template支持多个根标签，Vue2不支持。  

---

启动项目   <font color = red> **yarn dev**  </font>  
在命令行中运行某些程序需要终止时，使用<font color = "blue"> **ctrl+c** </font>

---

查看vue的版本信息

```
npm info vue-router versions
```

---


## provide与inject 菜单栏的显示与隐藏

[![wcB92T.png](https://s1.ax1x.com/2020/09/16/wcB92T.png)](https://imgchr.com/i/wcB92T)

#### **1. 在app中放入一个menuVisible的变量**


```
export default {
name: 'App',
//定义menuVisible变量
setup() {
    const menuVisible = ref(false
    //第一步，定义menuVisible，是一个盒子，默认值为false
    provide('xxx', menuVisible) //set  
    //使用provide将menuVisible标记为所有的后代都可以使用
    }
}
```

#### **2. 接着需要让两个子页面（Topnav、Doc）都获取到menuVisible变量**

- **Topnav中**

```
export default {
    setup() {
        const menuVisible = inject < Ref < boolean >> ('xxx') //get
        console.log('topnav 获取的 menuVisible 为：' + menuVisible.value)
        const toggleMenu = () => {
            menuVisible.value = !menuVisible.value
        }
        return {
            toggleMenu
        }
    }
}
```

- **Doc中**

```
export default {
    components: {
        Topnav
    },
    setup() {
        const menuVisible = inject < Ref < boolean >> ('xxx') //get
        console.log('Doc aside 获取的 menuVisible 为：' + menuVisible.value)
        return {
            menuVisible
        }
    }
};
```

#### **3. 用户点击logo时实现menu的显示与隐藏
- **在topnav中**

```
//设置click事件命名为toggleMenu
 <div class="logo" @click="toggleMenu">LOGO</div>
```

然后在定义将menuVisible的值变为其相反的

```
 const toggleMenu = () => {
            menuVisible.value = !menuVisible.value
        }
```

- **在Doc中**

在aside标签中加入v-if

```
<aside v-if="menuVisible">
```

---

## 改造Topnav——添加一个切换按钮

在vue官网中，当页面窄到一定程度时（适配移动端页面）会将侧边菜单栏隐藏，使用一个切换按钮让用户点击显示，点击隐藏。

- **此为正常情况下的vue侧边栏**

[![wRV3B4.png](https://s1.ax1x.com/2020/09/17/wRV3B4.png)](https://imgchr.com/i/wRV3B4)

- **此为屏幕缩小到一定比例时的vue侧边栏，点击此按钮可以实现侧边栏的显示与隐藏**

![wRV7Us.png](https://s1.ax1x.com/2020/09/17/wRV7Us.png)

#### 此节就要实现上述功能

- **在topnav中的修改**

在topnav中使用span标签，定义为toggleAside，并把toggleMenu事件绑定给它

```
    <!-- 添加侧边菜单切换按钮 -->
    <span class="toggleAside" @click="toggleMenu"></span>
```

编辑toggleAside的样式

```
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
```

因为要适配不同屏幕大小，因此在@media中定义toggleAside的属性

```
 //当页面500px时，出现menu-button
        >.toggleAside {
            display: inline-block;
        }
```

- **在Doc中的修改**

因为要适配不同尺寸的屏幕，因此aside的样式需要同步更新：
只有在手机上才需要绝对定位

```
@media (max-width: 500px) {
        position: fixed;
        top: 0;
        left: 0;
        padding-top: 70px;
    }
```



- **在App全局中的修改**

需要获取<font color = red>浏览器的宽度</font>来判断menuVisible的初始值。

```
setup() {
        //获取浏览器的宽度
        const width = document.documentElement.clientWidth;
        //当宽度小于等于500时，menuVisible初始值为false（认为是手机）
        const menuVisible = ref(width <= 500 ? false : true);
        provide('menuVisible', menuVisible); //set
    }
```


## 点击组件，显示相应的文档

####  <font color = red> 嵌套路由 </font>

先把router.ts封装为一个单独的文件，然后在App.vue中引用router，在router的afterEach中改造menuVisible

## 让Dialog可以点击关闭

<font color = red>注意不能修改porps </font>

Dialog是否关闭是由**visible**控制的，而visible并不是Dialog组件本身的东西，而是由外部传进来的**props**,我们不能直接修改props。

关闭的地方有四处

- Dialog的关闭按钮

- 黑色的遮罩层（Dialog组件之外点击）

- cancel按钮

- OK按钮


## Tabs示例

#### 如何在运行时确认子组件的类型

<font color = red>**检查context.slots.default()数组** </font>

在context中获取，从slots到default()再到数组，一步步递进。至于为什么打印context时需要在前面加...需要翻阅之前记录。

```
setup(props, context) {
        console.log({
            //0是第一个tab
            ...context.slots.default()[0]
        })
        console.log({
            //1是第二个tab
            ...context.slots.default()[1]
        })
        const defaults = context.slots.default()
        return {
            defaults
        }
    }
```

这样可以看到打印出的数据中有子组件的类型，可以使用如下方式让页面显示出子组件。

![057fWq.png](https://s1.ax1x.com/2020/10/14/057fWq.png)

通过拿到context.slots.default()的结果获取外面传来的子内容，然后通过type看类型


```
console.log(defaults[0].type == Tab)
```

如果他的类型和Tab一样，那就可以确定这是一个Tab标签。上述代码打印出的结果为true，因为标签为Tab。**这个所对比的type是一个对象。**



```
defaults.forEach((tag)=>{
            if(tag.type != Tab) {
                throw new Error('Tabs 子标签必须是 Tab')
            }
        })
```

对每一个标签进行检验。将一个标签的类型由Tab改为div后，出现如下报错：

![05bjsK.png](https://s1.ax1x.com/2020/10/14/05bjsK.png)



#### 如何渲染嵌套的组件

**嵌套插槽**

首先实现一个插槽，此处在Tabs.vue文件的 ```template``` 标签中使用component实现一个插槽

```
<template>
<div>
    Tabs 组件
    <!-- c表示一个组件,这是用component实现的一个插槽 -->
    <component v-for="c in defaults" :is="c" />

</div>
</template>

```


接着需要对每一个defaults进行一个遍历，从而在Tabs中获取到title属性

使用console.log将遍历到的每一个tag打印出来：


```
defaults.forEach((tag) => {
            console.log({
                ...tag
            })
        })
```

可以得到如下结果

![07n9w6.png](https://s1.ax1x.com/2020/10/15/07n9w6.png)

可以发现打印出了tag对象，从其中的内容可以发现，<font color = red>在props属性中包括了所需要的**title** </font>

![07nJ6s.png](https://s1.ax1x.com/2020/10/15/07nJ6s.png)

所以试着打印出title属性

```
 //对每一个defaults进行一个遍历,在Tabs中获取到title
defaults.forEach((tag) => {
            //将遍历到的每一个tag打印出来，可以发现props中包含
            //所需要的title属性，因为其是一个字符串，所以不需要使用对象的形式，
            //因此去掉大括号
            console.log(
                ...tag.props.title
            )
        })
```

![07nqBt.png](https://s1.ax1x.com/2020/10/15/07nqBt.png)



#### 切换标签页

用<font color=red> **selected**</font>标记被选中的标签页。

selected用index表示，不推荐

```
<Tabs :selected="1">  //下标
    <Tab title="导航1">内容1</Tab>
    <Tab title="导航2">内容2</Tab>
</Tabs>
```


selected用name表示，不方便，麻烦

```
<Tabs selected="tab1">
    <Tab name="tab1" title="导航1">内容1</Tab>
    <Tab name="tab2" title="导航2">内容2</Tab>
</Tabs>
```


selected用title表示，有漏洞，title如果相同，怎么办


#### 制作会动的横线

使用div制作即可，该横线需要处在Tab组件下方，与其宽度一致。

因为css不知道Tab组件的宽度，所以需要使用JS来获取宽度。

要获取组件的宽度，查阅文档可以看到如何引用。
![0OldKK.png](https://s1.ax1x.com/2020/10/17/0OldKK.png)




```
//打印出navItems的值，结果如图所示
const navItems = ref([])
        onMounted(() => {
            console.log(navItems.value)
        })
```
![0O3LHU.png](https://s1.ax1x.com/2020/10/17/0O3LHU.png)

使用console.log的技巧，一步步递进，找到自己需要的属性


```
//将上面console.log的语句改为如下所示
 console.log({
                ...navItems.value
            })
```





#### 选中横线的进一步优化
根据Tab的内容的大小，横线的长度也会相应变化。

<font color = red>**未优化之前的代码**</font>

```
<template>
<div class="rojay-tabs">
    <div class="rojay-tabs-nav" ref="container">
        <!-- 导航的选中，添加class,使用selected ;需要关联ref以获取宽度，复杂的需要加":"号-->
        <div class="rojay-tabs-nav-item" v-for="(t,index) in titles" :ref="el => {if(el) navItems[index] = el }" @click="select(t)" :class="{selected: t == selected}" :key="index">{{t}}</div>
        <!-- 会动的横线 需要关联ref以获取宽度，不复杂的不需要加":"号-->
        <div class="rojay-tabs-nav-indicator" ref="indicator"></div>
    </div>
    <div class="rojay-tabs-content">
        <component class="rojay-tabs-content-item" :class="{selected: c.props.title === selected }" v-for="c in defaults" :is="c" />
    </div>

</div>
</template>
```



```
setup(props, context) {
        //在setup中声明，需要return才能使用
        //使用<>来传递TypeScript参数，这是TypeScript的泛型语法
        //该语句的意思是ref([])的数组是一个HTMLDiv元素的数组
        //需要与item关联
        const navItems = ref < HTMLDivElement[] > ([])
        //会动横线的ref，用以获取该组件的宽度，与横线关联
        const indicator = ref < HTMLDivElement > (null)
        //用以指定横线的滑动距离,需要与nav关联
        const container = ref < HTMLDivElement > (null)
        //优化代码
        const x = () => {
            /*console.log({
                            ...navItems.value
                        })*/
            //获取到所有导航的div
            const divs = navItems.value
            //获取到之后找到一个class为selected的div
            //将找到的结果命名为result
            //使用TypeScript泛型语法规定div的属性为HTMLDiv元素数组这样会提示classList
            //但是filter总是会返回一个数组（一个包含了被选中div的数组），
            //我们不需要这个数组，只需要元素，因此加[0]
            const result = divs.filter(div => div.classList.contains('selected'))[0]
            /*//上述的另一种写法,但find在一些古老的浏览器中不支持
            const result = divs.find(div => div.classList.
            contains('selected'))[0]*/
            //console.log(result)
            //得到组件的宽度
            const {
                width
            } = result.getBoundingClientRect()
            //将indicator的宽度赋值为获取到的组件宽度
            indicator.value.style.width = width + 'px'
            //得到container的left(左边的坐标)
            const {
                //对left进行重命名，因为两个都为left
                left: left1
            } = container.value.getBoundingClientRect()
            //得到div的left
            const {
                //对left进行重命名
                left: left2
            } = result.getBoundingClientRect()
            //横线移动的距离
            const left = left2 - left1
            indicator.value.style.left = left + 'px'
        }
        //onMounted只在第一次渲染执行（即用户切换后不会执行）
        onMounted(x)
        //与onMounted不同，该代码页面发生变化时就会渲染
        onUpdated(x)

        /*console.log({
            //0是第一个tab
            ...context.slots.default()[0]
        })
        console.log({
            //1是第二个tab
            ...context.slots.default()[1]
        })*/
        const defaults = context.slots.default()
        //console.log(defaults[0].type == Tab)
        defaults.forEach((tag) => {
            if (tag.type !== Tab) {
                throw new Error('Tabs 子标签必须是 Tab')
            }
        })
        const current = computed(() => {
            //console.log('重新 return')
            return defaults.filter((tag) => {
                return tag.props.title === props.selected
            })[0]
        })
        /*//对每一个defaults进行一个遍历,在Tabs中获取到title
        defaults.forEach((tag) => {
            //将遍历到的每一个tag打印出来，可以发现props中包含
            //所需要的title属性
            console.log(
                ...tag.props.title
            )
        })*/
        //使用上述的方式获取到了title，接下来优化代码
        //将这两个东西存储起来
        const titles = defaults.map((tag) => {
            return tag.props.title
        })
        const select = (title: string) => {
            context.emit('update:selected', title)
        }
        return {
            defaults,
            titles,
            current,
            select,
            navItems,
            indicator,
            container
        }
    }
```

---


### 代码优化遇到的问题

在设计跟随选中Tab移动的横线时，使用了onMounted()和onUpdated()方法，onMounted是在第一次渲染时执行相应的操作，而onUpdated方法是在发生变化时就执行操作。在进行代码优化时，找到<font color = red>watchEffect() </font>方法的功能包括了上述两个，因此可以使用这个替代。


```
const x = () => {
            /*console.log({
                            ...navItems.value
                        })*/
            //获取到所有导航的div
            //const divs = navItems.value
            //获取到之后找到一个class为selected的div
            //将找到的结果命名为result
            //使用TypeScript泛型语法规定div的属性为HTMLDiv元素数组这样会提示classList
            //但是filter总是会返回一个数组（一个包含了被选中div的数组），
            //我们不需要这个数组，只需要元素，因此加[0]
            //const result = divs.filter(div => div.classList.contains('selected'))[0]
            /*//上述的另一种写法,但find在一些古老的浏览器中不支持
            const result = divs.find(div => div.classList.
            contains('selected'))[0]*/
            //console.log(result)
            //得到组件的宽度
            const {
                width
            } = selectedItem.value.getBoundingClientRect()
            //将indicator的宽度赋值为获取到的组件宽度
            indicator.value.style.width = width + 'px'
            //得到container的left(左边的坐标)
            const {
                //对left进行重命名，因为两个都为left
                left: left1
            } = container.value.getBoundingClientRect()
            //得到div的left
            const {
                //对left进行重命名
                left: left2
            } = selectedItem.value.getBoundingClientRect()
            //横线移动的距离
            const left = left2 - left1
            indicator.value.style.left = left + 'px'
        }
        //watchEffect(x)
        //onMounted只在第一次渲染执行（即用户切换后不会执行）
        onMounted(x)
        //与onMounted不同，该代码页面发生变化时就会渲染
        onUpdated(x)
```

替代后，代码更改如下

```
watchEffect(x)
```

使用watchEffect(x)，替代onMounted(x)、onUpdated(x)，但此时会报错：

<font color=red>
Uncaught (in promise) TypeError: selectedItem.value is null
</font>



[![0zc0pQ.png](https://s1.ax1x.com/2020/10/20/0zc0pQ.png)](https://imgchr.com/i/0zc0pQ)

**下面是排查错误的历程记录：**

出现这种错误的原因只有一种可能：<font color = red>watchEffect在**挂载之前**就运行了 。</font>

在挂载时打log来查看哪个先执行哪个后执行。

首先使用onMounted在初次渲染时打印‘mounted’；接着在watchEffect中打印‘effect’


```
 onMounted(() => {
            console.log('mounted')
        })
        watchEffect(() => {
            console.log('effect')
            const {
                width
            } = selectedItem.value.getBoundingClientRect()
            //将indicator的宽度赋值为获取到的组件宽度
            indicator.value.style.width = width + 'px'
            const {
                left: left1
            } = container.value.getBoundingClientRect()
            //得到div的left
            const {
                left: left2
            } = selectedItem.value.getBoundingClientRect()
            const left = left2 - left1
            indicator.value.style.left = left + 'px'
        })
```
先出现effect，其后出现了onMounted，说明watchEffect除了在Mounted之后和upDated之后执行，在Mounted之前也会执行。<font color = red> 但是在Mounted之前都是空，所以会出现错误。 </font>


[![0zgwE6.png](https://s1.ax1x.com/2020/10/20/0zgwE6.png)](https://imgchr.com/i/0zgwE6)



**解决方案**：在使用value之前判断是否未空，如果为空就不使用。查阅vue3的文档，可以发现

[![BP3XrD.png](https://s1.ax1x.com/2020/10/21/BP3XrD.png)](https://imgchr.com/i/BP3XrD)

第一次运行是在挂载之前，所以如果希望访问到DOM，可以使用onMounted里面的watchEffect







### 选中路由后的高亮显示
在选中侧边菜单栏相应的路由后，应有一个显示，让用户知道自己选择了哪一个路由。

**在vue中，对于被选中的路由，给出了两中标识，如图所示**

[![B8EOwn.png](https://s1.ax1x.com/2020/10/28/B8EOwn.png)](https://imgchr.com/i/B8EOwn)

<font color = red> “router-link-active” 和 "router-link-exact-active" </font>两种属性，任选其一即可


## 引入markdown

由于<font color = red> md.ts </font> 引用了marked，所以在创建好 md.ts 后要安装 marked：

```
$ yarn add --dev marked
```

或

```
$ npm i -D marked
```
[![BajwEq.png](https://s1.ax1x.com/2020/10/31/BajwEq.png)](https://imgchr.com/i/BajwEq)


## yarn build 项目


```
$ yarn build
```
输入上述命令后，会在<font color = red>dist </font>目录下创建三个文件：
index.js;

style.css;

index.html;


双击打开index.html发现没有任何页面，因为build后的项目需要运行在server中，所有的网站都是运行在server上的。

因此先创建一个server

使用命令：

```
$ yarn global add http-server
```

安装后，就可以使用了。

开启server的命令：

```
$ hs dist/ -c-1
```
[![Bajpu9.png](https://s1.ax1x.com/2020/10/31/Bajpu9.png)](https://imgchr.com/i/Bajpu9)

#### PS：使用http-server遇到问题

输入相应命令后，提示

```
bash: hs: command not found
```

[参考链接](https://www.freesion.com/article/5525640573/)

##### 报错的原因：

**npm全局安装路径没有被加入到bash的$PATH环境变量中**

### 解决方案

1. 执行以下命令，查看http-server的安装路径，步骤3中需要用到

```
npm install http-server -g
```

2.加入下面的环境变量： **注意：<font color=red> bin: </font>后面的为步骤1中获取到的安装路径

```
$ export PATH=$PATH:$M2_HOME/bin:C:\Users\65157\AppData\Roaming\npm\node_modules \http-server\bin\http-server
```

问题解决


[![Bazy28.png](https://s1.ax1x.com/2020/10/31/Bazy28.png)](https://imgchr.com/i/Bazy28)




### 展示源代码
**方便用户拷贝**
需要使用 vue-loader 的 Custom Blocks功能



### 高亮源代码
**使用 prismjs 和 v-html**



### build 之后加载 .md 文件报错

因为 rollup 不支持 import() 时拼字符串

#### 情景：

1. 使用下面代码加载

```
yarn build
```

2. 使用如下命令启动端口

```
http-server dist -c-1
或者
hs dist -c-1

```


[![DtXonO.png](https://s3.ax1x.com/2020/11/24/DtXonO.png)](https://imgchr.com/i/DtXonO)

3. 进入后，发现无法加载md文件，网络报错md文件404代码

[![DtX4c6.png](https://s3.ax1x.com/2020/11/24/DtX4c6.png)](https://imgchr.com/i/DtX4c6)


**原因** 在路由 router.ts 中，跳转到 markdown 文件是动态加载的，需要知道相应的 filename ，而 filename 只有在运行的时候才会知道。

[![DtvaQ0.png](https://s3.ax1x.com/2020/11/24/DtvaQ0.png)](https://imgchr.com/i/DtvaQ0)


<font color=red> **解决方案** </font>

在 router.ts 中先导入需要的 md 文件：

```

import intro from './markdown/intro.md';
import getStarted from "./markdown/get-started.md";
import install from "./markdown/install.md";
import note from "./markdown/note.md";

```

路径中也要做相应更改：

```

    {path: "intro", component: md(intro)},
    {path: "get-started", component: md(getStarted) },
    {path: "install", component: md(install) },
    {path: "note", component: md(note) },

```

并对 md 进行相应修改：

```
const md = string => h(Markdown, { content: string, key: string })

```

[![DNiJxJ.png](https://s3.ax1x.com/2020/11/24/DNiJxJ.png)](https://imgchr.com/i/DNiJxJ)