## Hello React and Webpack

最近看了点React,算是刚入门吧，那么稍微讲讲这个东西吧，虽然介绍这方面的人还是很多的，但出于自私，还是要输出一下，这样我才会对知识会有更多的理解（万一装逼成功被被个妹子相中呢！O(∩_∩)O哈哈~）。

首先我们先给出[React官方网站](https://facebook.github.io/react/)，少些耐心看英语的小伙伴也可以看[React的翻译网站](http://reactjs.cn/react/index.html)，我刚开始也是看英文的官网的，后来因为英语还是差了些，有些东西不是很懂，去翻译的网站上看了些就对React多了些认识，所以我很感谢这些翻译的人士，要是有机会的话，也很想成为他们其中的一员，当然英语这方面和专业技术这方面都还在努力中。还是要提一句，虽然有中文翻译很方便，但是还是要尽量要去阅读英文的原文，很多东西用中文翻译是不能get到的。

### 我们为何要使用React

官网刚进去他就给我们几个词：

* **JUST THE UI**

React只是提供了UI方面的功能，它不像Angular这么全面，但是它在UI这块做的很好，它解决了Web开发一个很大的问题，它将Web拆解成组件式，使得Web开发的团队开发和维护变的比以前高效很多。

* **VIRTUAL DOM**

什么是虚拟DOM，我的理解是这不是真的DOM，而是一些Javascript对象，我们对虚拟DOM进行操作只不过是对这些Javascript的对象进行操作，等操作完成之后再通过Javascript对象在DOM中渲染。

那么为什么我们要这么做呢，其实这点我也没有完全理解，应该是没有人当面认可过我的想法，网上对这些东西的争执会有些，而我也不是对浏览器的DOM渲染有很深刻的了解，也就是一些自己觉得对的东西在这里分享一下，也看了一些东西。我们撇开渲染不说，据说React会快？反正都是道听途说的。对DOM进行操作是会消耗一些性能的，如果要考虑性能的时候很多时候对DOM操作的代码是要经过很多考量的，具体可以参考阮一峰老师的[这篇文章](http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html),然而知乎上也有人举了一个这样的[栗子](http://www.zhihu.com/question/29504639)，也就是说DOM操作如果批量是会消耗很多性能的，至于一些原因，我们能够参考以为热心人士的[StackOverFlow上的翻译](http://segmentfault.com/a/1190000000753400)，这篇文章最后讲到了虚拟DOM和原生DOM的比较，由于在原生DOM插入创建的时候需要很多不必要的属性，会产生大量的性能消耗。（那TM我还是想不通的就是：虚拟DOM最后也是渲染成DOM，难道就不需要创建这些属性了么）

*  **DATA FLOW**

官方给出了这样一张图：
![single data flow](http://facebook.github.io/flux/img/flux-simple-f8-diagram-1300w.png)
可以看到，View及其他方式会上产生Action，然后单项数据流最后更新了View。

所以React的数据流的特点是单向的，这是和Angular不同的地方（我不能对Angular评价很多，因为这个东西我并没有很多接触，只是人云亦云）


###那么开始吧（呵呵就是些很基础的东西）

官方给出了一个很简单的例子

```javascript
var HelloMessage = React.createClass({
  render: function() {
    return <div>Hello {this.props.name}</div>;
  }
});

React.render(<HelloMessage name="John" />, mountNode);
```
`React.createClass(obj)`这个`function`会生成一个自定义的React标签，传入一个对象，这个对象中要包含组件的一些生命周期方法，渲染方法，和其他方法。首先`render()`这个方法是一定要有的，这是渲染这个组件的方法，当然你可以返回`null`，但是这个方法是一定要有的。

最后的`React.render(React.class, node)`方法表示我们将我们创建的`HelloMessage`的标签插入到一个节点中这边的mountNode是一个DOM节点，比如：`var mountNode = document.getElementById('mountNode');`

那么接下来让我们看下一个官方的例子：

```javascript
var Timer = React.createClass({
  getInitialState: function() {
    return {secondsElapsed: 0};
  },
  tick: function() {
    this.setState({secondsElapsed: this.state.secondsElapsed + 1});
  },
  componentDidMount: function() {
    this.interval = setInterval(this.tick, 1000);
  },
  componentWillUnmount: function() {
    clearInterval(this.interval);
  },
  render: function() {
    return (
      <div>Seconds Elapsed: {this.state.secondsElapsed}</div>
    );
  }
});

React.render(<Timer />, mountNode);
```
`getInitialState`:这个方法初始化了所有的`states`的默认值，这里我们就不得不提一下React中的两个数据源，前面也有一个`props`忘了讲了,`props`主要维护从外部传入的变量，而`states`主要维护内部的变量，当这两个变量在装载(componentDidMount)之后变了里面的值的话，就会主动的去调用`render`方法渲染页面。
看了一眼这里有许多关于`React.class`的生命周期的函数，就大致来介绍一下`React`的生命周期吧。

`componentWillMount`:实现这个函数来完成在装载之前做的操作。

`componentDidMount`:实现这个函数来完成DOM装载之后的操作.

`componentWillReciveProps`:这个函数来完成组件接收到外部传入的`props`的时候进行的操作

`shouldComponentUpdate`:传入两个变量，分别是`states`和`props`，通过判断两个新传入值来判断是否需要刷新，默认返回true。

`componentWiiUpdate`:实现这个函数来完成更新之前的操作

`componentDidUpdate`:实现这个函数来完成更新之后的操作

`componentWillUnMount`:实现这个函数来完成该组件要从DOM中移除进行的操作

`componentDidUnMount`:实现这个函数来完成该组件从DOM中移除后进行的操作

根据这些生命周期我们来看这个代码，那么这个代码首先将`states`中的`secondsElapsed`初始化为0,组件装载成功之后启动一个计时器，计时器调用函数`Tick`更新`secondsElapsed`的值，每次更新`secondsElapsed`之后因为`states`被更新了会刷新页面，然后组件在被移除的时候清除计时器防止内存泄露。

那么除此之外之外，React还有一些可以重写的方法：

`propTypes`:返回验证数据类型，如果数据类型有错就产生警告。

`getDefalutProps`:返回默认的`props`的值.

`minxs`:可以理解为继承，可以混个多个组件的函数内容。

`statics`:可以定义静态方法，静态方法是类方法.

###Webpack
当我们开开心心使用React去些Web页面的时候，会发现有个很麻烦的地方，比如我在页面上写了一个列表，里面有几种样式的item，那么我就需要把ListCompenent和各种ItemCompenent的文件一个一个导入，而且依赖关系需要我们自己考虑。
自从有了[Node.js](https://nodejs.org/en/)之后，大家都很希望能够让页面的代码也能像Node中一样用`require`来管理模块依赖。之后能在页面上的js自动分析依赖打包的工具有很多，请原谅我的盲从，反正我就是选择了[webpack](http://webpack.github.io/)，然而webpack我也只是入门，在这里向大家简单的介绍一下。

如之前所说，webpack做了两件事情，一件事就是打包，他能打包css, javascript, image等等，不过都要加入相应地loader。另一件事是管理依赖，我们能够在写js的时候使用require，在写css的时候使用@import,然后webpack在最后打包的时候会根据依赖对将左右js打成一个包，我这边的知识点会有些浅显，英语好的同学可以去[官网](http://webpack.github.io/)学习，甚至可以翻墙的同学可以去[youtube](https://www.youtube.com/channel/UCpqYfSWEcyBGorRGvPsHkgg)看个视频。

以上都不想做的可以继续往下读，我们做几个小小的domo

我们创建一个js文件

```bash
vim a.js
```
在里面产生点内容

```vim
module.exports = 'hello webpack'
```
保存然后我们再创建一个js文件

```bash
vim b.js
```
在里面写上这些内容

```vim
console.log(require('./a.js'))
```
我们在命令行运行

```bash
webpack b.js c.js
```
我们在目录下得到一个c.js文件
我们可以把这个文件加到一个html中或者直接使用`node c.js`，我们能够看到输出为`"hello webpack"`，很好，你还可以试试使用加入css文件，这些在官网上有些教程（呵呵，其实我不讲是因为我真的不太懂）
当然除了用命令行控制入口和出口的方法，webpack还设置了配置文件的方法，我们可以在目录下创建`webpack.config.js`文件

```bash
vim webpack.config.js
```
我们大概会在里面输入这些内容:

```javascript
var webpack = require('webpack');
var commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common.js');

module.exports = {
	    entry: {
			entry1: 'b.js',
			},
		output: {
			path: __dirname,
			filename: 'c.js'
			},
		resolve: {
			extensions: ['', '.js', '.jsx']
	},
			module: {
		loaders: [
       	     {
       	         test: /\.jsx$|\.js/,
       	         exclude: /node_modules|bower_components/,
       	         loader: 'babel-loader'
       	     },
       	     {
       	         test: /\.css$/,
       	         exclude: /node_modules|bower_components/,
       	         loader: 'style!css'
       	     },
       	     {
       	         test: /\.less$/,
       	         exclude: /node_modules|bower_components/,
       	         loader: 'style-loader!css-loader!less-loader'
			 }]	
	},
		plugins: [commonsPlugin]
};
```
大概是这样的，我们可以来解读一下这个文件，首先我们要将webpack加进来`var webpack = require('webpack')`，然后我们定义插件输出`common.js`，而这个`common.js`是什么呢,这个`common.js`是当webpack入口有多个的时候，我们可以利用这个`common.js`对两个入口文件的共享依赖打包，这样就避免了共享内容被打包多次的情况。

`entry`:入口,定义要打包的文件

`output `:出口，定义打包输出的文件, `path`:定义输出文件所在目录, `filename`:`定义输出文件名`

`resolve`:定义能够被打包的文件文件后缀名

`module`:主要定义一些loaders,定义哪些后缀名的文件应该用哪些loader

`plugins`:定义一些额外的插件

那么差不多就介绍到这里了，至于`webpack-dev-server`有兴趣的同学可以去看看。

再补充几点：

1、关于React的调试，[Facebook官方视频](https://www.youtube.com/watch?t=1&v=Cey7BS6dE0M)已经给出了一个了一个Chrome的插件，具体就是下载之后当你打开React页面的时候，你Inspect Element的时候能够看到多出一个React的调试标签，点击这个标签能够看到`props`和`states`的内容，而且能够更改这些值使得页面重新渲染，还可以对Action进行断点调试。

2、关于`data-reactid`
在一个网站上看到这样一段话

> React inserts all the DOM nodes into the page at once using a single .innerHTML call. Using data-reactid allows us to quickly find those elements later. (Think about server rendering -- there's no way to find the proper DOM nodes otherwise because you can't store a reference except when creating the node from JS.)

翻译来说就是
>React通过一次innerHtml把所有DOM的节点插入页面中，使用data-reactid让我们能够在之后非常快速的找到这些DOM节点(想想服务器渲染，除非我们在DOM在JS中创建的时候就建立一个索引，不然我们不能找到哪些是我们要找的DOM节点)

还有网上的介绍说：
>当在browser中React.render时会检查校验值是否一致，保证node以及browser环境下render的结果一致。因此开发过程中一定要保证render的结果保持一致，如果需要在browser中插入dom节点，可以使用insert等操作。禁止state以及props在两个环境下值不同。
如果通过校验，则React不会重新生成dom，只将事件监听器挂载在对应的节点下。

也就是说react-id并不是diff的值，而是一个id而已，在服务器执行render的时候会比较浏览器和服务器的各种react-id的DOM，保证两边的react-id同步，以及两边的react-id的DOM的所涉及到的States和Props，如果校验成功的就不重新生成DOM，如果校验不成功，就重新渲染DOM-----之前我一直误会的觉得这是一个diff值
 
