### 再探React

_早在一年前，我就很蠢发表过一篇关于React的[文章](http://www.jianshu.com/p/f7903c90e42jkd)，这篇文章主要根据React[官方](https://facebook.github.io/react/)的介绍初步介绍一下React，并稍微带过一下Webpack，当时只是作为一位iOS开发工程师随便看看React这个东西，现在博主已经励志从一名懂一点Javascript的iOS程序员转变成一位曾经做过iOS的前端开发人员，在自己做过一些React项目之后，想再次介绍一下React这个东西_

那么让我们来回顾一下React的基本用法，在某个版本之后React这个库被分为react和react-dom，react负责对组件的操作，react-dom负责将组件渲染到页面上，组件的写法基本为:

```Javascript
var MyComponent = React.createClass({
  render: function() {
    return React.createElement("div", null);
  }
})
```
使用JSX语法之后
```Javascript
var MyComponent = React.createClass({
  render: function() {
    return (
      <div>
        <!-- add some dom code -->
      </div>
    )
  }
})
```
使用ES6的语法来写:
```Javascript
class MyComponent extends React.Component {
  render() {
    return (
      <div>
        <!-- add some dom code -->
      </div>
    )
  }
}
```
在Babel横行的当今，我是推荐至少要使用JSX的语法来编写React的，这样会使得代码的可读性更强，至于ES6就靠个人洗好了，本文还是推荐使用ES6的语法的，也将使用ES6语法完成大部分代码的示例

##### 随便说说生命周期

关于组件的装载，按照顺序执行下面的方法

`constructor`，`componentWillMount`，`render`，`componentDidMount`

关于组件的更新，按照顺序执行下面的方法

`componentWillReceiveProps`，`shouldComponentUpdate`，`componentWillUpdate`，`render`，`componentDidUpdate`

关于组件卸载的

`componentWillUnmount`

_英语好的看名字就知道是干嘛的了，真的，应该不用解释了_

这里稍微提及一下就是在使用ES6的时候，定义class如下代码：
```Javascript
  class A extends React.Component {
    custom() {

    }
    render() {
      console.log(this.custom)
      return (
        <div>
          <A customProp="custom"/>
        </div>
      )
    }
  }
```
此处输出`this.custom`的时候会显示`undefined`，因为class的非constructor方法都是prototype，可以在`this._proto_`中访问到，如果想要比较友好的使用`this.custom`，可以使用[auto-bind](https://github.com/cassiozen/React-autobind)

React组件核心的两个属性分别叫做props和state，这两个属性其实就是存储了一系列数据，props的数据主要从组件外部传入，比如
``` Javascript
  class A extends React.Component {
    render() {
      const {customProp} = this.props
      console.log(customProp)
      return (
        <div></div>
      )
    }
  }
  class B extends React.Component {
    render() {
      return (
        <div>
          <A customProp="custom"/>
        </div>
      )
    }
  }
```
以上就会输出customProp的值为custom

而state的值则是由组件内部控制的，state应当在`constructor`的实现中初始化，并在React中调用`setState()`组件会做diff并刷新相应界面，所以我们能够确定props对于组件内部是静态的，它从外部传入，由外部控制组件。而state是动态的，组件自己控制自己。

了解了以上的知识，基本的React项目已经可以编写了，当然，只要配置好Webpack，关于项目的搭建，之前已经有过一篇文章对其进行过[翻译](http://www.jianshu.com/p/9f9738f6a4a9)

那么接下来讲讲一些进阶吧

### Redux

首先呢，Redux不是只用于React的。当然了React和它很搭，React是一个状态维护组件的界面框架，而Redux恰好是一个非常好的能够维护状态的框架。接下来对Redux做一些介绍，Redux只适用于超大型项目，轻易别用这个东西，很累赘。

那么我们从基础的来看Redux

###### Action

Action相当于指令，一般会包含两种属性一种是指令类型，用以区分指令，另一种是数据，数据可以有很多，用来处理，当然也可以没有数据单纯发一个指令，这都是可选的，比如以下都是Action：
```Javascript
const OPEN_MOUTH = "OPEN_MOUTH"
const CLOSE_MOUTH = "CLOSE_MOUTH"
const openAction = {
  type: OPEN_MOUTH,
  size: 10,
  time: 5
}
const closeAction = {
  type: CLOSE_MOUTH
}
```

上面一共有两个Action，`OPEN_MOUTH`、`CLOSE_MOUTH`分别是两个类型，`openAction`中的size和time是数据，`closeAction`中没有数据

###### Reducer

Reducer是指令的处理器，用于分类处理指令，先上一段代码：
```Javascript
function myReducer(state, action) {
  if (action.type == OPEN_MOUTH) {
    var newState
    //create a new State for open mouth
    return newState
  } else if (action.type == CLOSE_MOUTH) {
    var newState
    //create a new State for close mouth
    return newState
  }
}
```
这就是一个Reducer，可以看到，这个Reducer接受两个参数，一个是原来的state，一个是action，也就是我们的指令，通过指令的类型和指令的数据来产生新的state就是Reducer的任务。
这里需要注意，Redux开发过程中，在Reducer处理的时候都是期望state纯净的，也就是说，产生的新的state不会修改老的state，所以请巧用`Object.assign()`，`concat()`等函数经行操作

###### Store

可以通过`createStore`来创建新的store对象，store对象主要的功能是发送Action，和监控整个发送处理过程
```Javascript
let store = createStore(myReducer, {})
store.dispatch(openAction)
```
`createStore`第一个参数为Reducer，第二个参数是初始的state值
`dispatch`方法发送Action

以上就是最简单的Redux的用法，想了想其实就是很简单的东西，如果要我们自己来实现的话我们也可以来演示一遍，主要就是实现一个store

```Javascript
var createStore = (reducer, init) => {
  var store = {}
  var state = init
  var listeners = []
  store.dispatch = (action) => {
    state = reducer(state, action)
    listeners.forEach((listener) => {
      listener()
    })
  }
  store.getState = () => {
    return state
  }
  store.subscribe = (listener) => {
    let count = listeners.push(listener)
    return () => {
      listeners.slice(count - 1, 1)
    }
  }
  return store
}
```
以上就是createStore的大致实现，很简单对不对，所以如果只是想用这个Redux的功能，完全可以用这么点代码代替，不用使用一整个Redux的库，杀鸡焉用牛刀

那么我们来继续介绍一些，Redux还有哪些Api

###### combineReducers

随着项目越来越复杂，一个Reducer处理的数据就会越来越多，比如针对如下的数据:
```Javascript
{
  user: {
    name: 'goodname',
    sex: 1
  },
  setting: {
    showing: false,
    count: 100
  }
}
```
当我们修改user的时候其实setting根本没有被修改，随着同级的属性的增多，把所有的属性的操作都放入一个reducer，代码难免会有一些杂乱，那么我们就会把Reducer拆分，让单个Reducer来处理单个同级属性，`combineReducers`就帮我们很好的处理了这件事情。比如针对上面的数据，我们之前会这么做
```Javascript
var reducer = (state, action) => {
  if (action.type == CHANGE_NAME) {

  } else if (action.type == CHANGE_SEX) {

  } else if (action.type == SHOWING) {

  } else if (action.type == HIDE) {

  }
}
```
同级属性再增多，都会把所有的操作都放在这个函数中，是不好的，有了`combineReducers`，我们可以这么做:
```Javascript
var user = (state, action) => {
  if (action.type == CHANGE_NAME) {

  } else if (action.type == CHANGE_SEX) {

  }
}

var setting = (state, action) => {
  if (action.type == SHOWING) {

  } else if (action.type == HIDE) {

  }
}

module.exports = combineReducers({user, setting})
```
这么做就会自动分发属性名对应的Reducer来处理了(当然对应关系可以自己设置)


////未完待续 -> redux-react
