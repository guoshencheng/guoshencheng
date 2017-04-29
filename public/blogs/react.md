# Setting up your React /ES6 Development environment with Webpack, Express and Babel

转载自[Setting up your React /ES6 Development environment with Webpack, Express and Babel](https://blog.hellojs.org/setting-up-your-react-es6-development-environment-with-webpack-express-and-babel-e2a53994ade#.8miz3jdjt)

_在2016年，你需要尝试学习一下react, 而首先，你需要将React和React DOM这两个库加入到你的页面中_

_加入你已经在页面中加入了这两个库，接下来我该怎么使用React呢？_

_多说几句，你得在你的项目中加入Babel你才可以使用React_

_“[当下学习javascript是什么感受](https://hackernoon.com/how-it-feels-to-learn-javascript-in-2016-d3a717dd577f#.aj48uvt4w)”_

在我第一次接触[React](https://facebook.github.io/react/)的时候，我做了一个[小玩意](http://how-far-hr.herokuapp.com)来练习在页面上创建并渲染组件。虽然我非常喜欢react动态的页面和Redux的单状态项目，可我使用了太多的时间来配置配置文件以及安装开发依赖，浪费了大量的编码时间

React项目初始化搭建非常痛苦是因为React不是一个面向一整个项目的库。根据Facebook的文档，`it’s a view library for building user interfaces`这是一个用于建设用户界面的库，可随着React环境的慢慢成熟，当使用React开发的时候大量的开发者会普遍使用一些类似于Webpack或者Babel的工具来处理这个问题，可是这些工具经常变更，所以，每当你第一次初始化React开发环境的时候，会令人非常烦恼

为了帮你解决这个困扰，我已经把把自己的项目初始化放到了这个[gist](https://gist.github.com/dengjonathan/79eb3d5fc55b5b6dd2fbc434dce352da)上，其中包含了，我的webpack在开发环境和生产环境的配置和express服务器的代码。我会向你演示如何热更新模块，这个功能可以在你的浏览器在你修改代码后自动更新界面，不需要自己手动刷新这个界面，这一整个项目也在Github上面可以找到

你可以直接使用我的配置然后开始使用React，可是我还是想唠叨一遍这些文件都在做一些什么事情，这样的话当出现了一些bug后，你不会在要解决一些问题的时候手足无措。当我刚开始搭建一个React项目的时候，有大量的关于使用es5语法和一些废弃的模块搭建的Webpack/React项目的教程。如果你是一个非常酷的选手，正在使用ES6编写React的话，我希望这篇文章能够帮到你

_/ 注意：在我写了这篇博客之后，我开发了一个[Create-React-App](1)的项目，这个项目是一个我自己做的用以快速创建一个React的Helloworld项目的工具，它分装了webpack和Babel复杂的使用。
但是配置Webpack和Babel是你开发React必须要掌握的技能，这个教程会很好的帮助你理解他们 /_

1、开始一个React项目需要准备些什么

技术上，你只需要两个库：React和React-DOM（这两个库让你能够把React组件渲染到浏览器上）

但是如果你要马上使用React，你必须要学会如何编写JSX

什么是JSX？JSX是一个让你用HTML写法写组建的Javascript语法,使用了JSX，你的React代码就会变得非常美观，让其他的开发者能清楚的之后你的代码想要实现什么，比如这就是JSX：

```Javascript
const Component = () => (<div><h1>I am a component></h1></div>);
```
可惜的是，现在的浏览器的Javascript解释器并不能理解JSX，他遇到JSX会抛出异常，所以你需要自己转换成通用JS语法：

```Javascript
var Component = function Component() {
  return React.createElement(
    "div",
    null,
    React.createElement(
      "h1",
      null,
      "I am a component>"
    )
  );
};
```

更多

没有人愿意像这样写代码，这么写会显得代码非常冗余，而且这有点让人弄不懂这个代码到底在做些什么，可是浏览器只能解释通用版本的JS代码，所以我们在开发时候应该怎么办

进入Babel。Babel是一个Javascript的编译器，无论你使用什么你喜欢的（JSX还是ES6）语法，他都会帮你转换成浏览器可以理解的语言

我使用JSX和ES6来编写javascript并使用Babel来将他们转换成使用ES5规范的另一个文件中，这样浏览器就能够理解这些代码了

好，那么现在我们有React，React-DOM还有Babel，我们还需要什么呢

当我们编写React的时候，我们需要在把大量不同的组件写到不同的文件中，这些文件都会导入各自的依赖。如果我们将这些文件都通过sprite标签各自导入的话，会消耗大量时间。
![](https://cdn-images-2.medium.com/max/800/1*XczR_8TRdpo1Sjj4CF1PNA.png)
这就是我们为什么使用Webpack的原因，这是一个可以将我们需要的所有文件和库依赖整合成一个文件能够直接加入到页面中的打包工具
Webpack还有一个非常方便的插件叫做webpack-dev-server，这个插件通过一个轻量级的Express服务器使得你可以很方便的看到你修改的地方在浏览器上的改变，很吊！
所以在我们开始编写代码之前，我们需要：
1、React
2、React-DOM
3、Babel
4、Webpack

安装依赖

那么，我们要怎么准备这些东西呢

![](https://cdn-images-2.medium.com/max/800/1*PCoGIsHgytJ_uxR7q65nIg.jpeg)
当然是npm install了
在你的项目的根目录，运行下面的命令来安装React和React-DOM
```bash
npm install --save react
npm install --save react-dom
```

运行下面的命令来安装开发依赖，这些依赖对你最后的应用是没有用的，但是在你的开发编译过程中有用

```bash
npm install --save-dev babel-core
npm install --save-dev babel-cli
npm install --save-dev babel-loader
npm install --save-dev babel-preset-es2015
npm install --save-dev babel-preset-react
npm install --save-dev react-hot-loader
npm install --save-dev webpack
npm install --save-dev webpack-dev-middleware
npm install --save-dev webpack-hot-middleware
```

我们使用的Babel被分为核心库（babel-core），命令行工具（babel-cli）和一个能够让babel和webpack协调使用的插件babel-loader。除此之外，我们还安装了babel-preset-react和babel-preset-es2015插件，这两个插件涵盖了把ES6和React代码编译成通用javascript的规则

我现在不想深入react-hot-loader和webpack middleware模块，但我们会在将来的热更新模块章节中提及到他

当你完成这些操作后，你的package.json应该像这样：
```json
{
  "name": "how_far_hr",
  "version": "1.1.0",
  "engines": {
    "node": "5.12.0"
  },
  "description": "A small toy app showing HR progress with React and ES6",
  "author": "Jon Deng <jondeng.com>",
  "license": "MIT",
  "private": false,
  "scripts": {
    "start": "npm build && node dist/app.js",
    "dev-start": "node dist/app.js",
    "build": "webpack --config ./webpack.deployment.config.js --progress --colors"
  },
  "dependencies": {
    "bootstrap": "^4.0.0-alpha.2",
    "express": "^4.14.0",
    "react": "^15.3.2",
    "react-dom": "^15.3.2",
    "redux": "^3.6.0",
    "underscore": "^1.8.3"
  },
  "devDependencies": {
    "babel-cli": "^6.6.5",
    "babel-core": "^6.17.0",
    "babel-loader": "^6.2.5",
    "babel-preset-es2015": "^6.16.0",
    "babel-preset-react": "^6.16.0",
    "react-hot-loader": "^3.0.0-beta.5",
    "webpack": "^1.13.2",
    "webpack-dev-middleware": "^1.8.3",
    "webpack-hot-middleware": "^2.12.2"
  }
}
```

如果已经做好了的话，这是我的项目目录，我把我所有的源文件都放在了app下的目录，当这些文件被编译打包的时候，webpack会把这些文件都输出到dist下，在根目录下含有一个package.json文件和生产环境还有开发环境的webpack配置文件

![](https://cdn-images-2.medium.com/max/800/1*9LQp_r-ubJC5QMMrBmSndA.png)

3、为开发环境配置Webpack

为了使得webpack在开发环境上运作，我们需要对React进行配置，这可以在我们每次保存我的时候转义并打包并可以利用`webpack-dev-server`直接在浏览器上显示修改。
以下是我的开发环境的webpack.config.js文件

```javascript

var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: './app/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
    publicPath: '/app/assets/'
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        loader: 'babel-loader',
        include: path.join(__dirname, 'app'),
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
};
```

第一行和第二行，我使用了require语法导入了path和webpack模块

在第五行，我指明了这次打包的文件的入口，最简单的找到入口文件的方法就是去找那些调用React-DOM来渲染你的React组建到页面DOM的文件

在第6行到第9行，我申明了我会把我所有的脚本文件打包到一个叫做`bundle.js`的文件，并申明了公开文件目录为`/app/assets`

最后，我在12~22行，我在每次webpack打包文件的时候都让webpack运行babel-loader。babel-loader会将用ES6和JSX编写的文件转移成浏览器可以识别的通用javascript文件，在第14行到16行，我申明了一个正则表达式来让webpack转义那些在`app/`目录下后缀名为`.jsx`的文件并屏蔽了`node_modules`下的文件，在第16行，我设置了Babel使用RS6和React的规则去转义文件

现在，你想要启动你的应用并动态编辑的话，你只要在命令行执行以下的操作：
```bash
webpack-dev-server --progress --colors
```

我喜欢使用progress和colors命令来让命令行的输出可读性更高

也不是很难嘛，对不对~

4、为生产环境配置Webpack

```javascript
const path = require('path');
const webpack = require('webpack');

module.exports = {
  devtool: 'source-map',

  entry: [
    './app/index.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist/'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    loaders: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      include: path.join(__dirname, 'app'),
      exclude: /node_modules/,
      query: {
        presets: ['es2015', 'react']
      }
    }]
  },
};
```
你会发现生产环境的webpack配置回合开发环境的非常像

主要的区别在于我们添加了一个叫做`UglifyJSPlugin`的插件，这个插件可以混淆你的代码

你也可以根据你自己的需要添加更多的webpack插件

5、创建一个Express服务器

当然，webpack-dev-server在开发的时候非常方便，但是你最好别把它用在开发环境上，如果你使用Express服务器的话你可以使用更多你想要的功能，如果你想要热更新功能，我们会在下个章节中提及

在下面的文件中，我编写了一个工厂方法来新建一个express服务器对象，我们会把这个方法在应用入口文件中导入并创建一个express服务器

```javascript
const path = require('path')
const express = require('express')

module.exports = {
  app: function () {
    const app = express();
    const indexPath = path.join(__dirname, 'indexDep.html');
    const publicPath = express.static(path.join(__dirname, '../dist'));

    app.use('/dist', publicPath);
    app.get('/', function (_, res) { res.sendFile(indexPath) });

    return app;
  }
}
```

在第10行，我为express对象指出`/dist`目录来满足静态文件比如css，图片，javascript文件的直接获取的需求。因为我们webpack配置文件中，我们的打包的文件会导出到`/dist`目录下

在第11行，我告诉express当访问根目录的时候返回indexDep.html页面，这个文件中含有一个脚本标签来导入我们在dist下打包后的文件，使得React可以渲染到页面DOM上

在下一个章节，我们会使用这个工厂方法，来创建一个express服务器对象

6、添加动态模块动态模块更新

开发React最炫酷的事情就是有很多开发功能上的优点，比如[动态模块更新](https://medium.com/@rajaraodv/webpack-hot-module-replacement-hmr-e756a726a07#.knlra5lut)，这个功能可以让我们当组件代码被修改的时候让这些组件自动在页面更新，而不是重新渲染一边这个页面。使用动态模块更新，你会有一个非常好的动态响应编辑的体验。因为在你编辑这个组件的时候他们会持续重新渲染，所以你会马上看到自己的修改

我发现使用动态模块更新最简单的方法就是在express服务器上面使用一个webpack中间件

在继续下去之前，我想要花一点时间来了解一下[中间件](http://expressjs.com/en/guide/using-middleware.html)，在express中，中间件是像管道一样的方法，接收数据流，输出处理过的数据流

因为响应数据是数据流，我们可以在这些数据流入客户端之前利用这些中间件方法来修改这些数据

所以我们使用[webpack-dev-middleware](https://github.com/webpack/webpack-dev-middleware)来将react代码转义成浏览器可读的通用js，并将这些文件打包到一个可以被客户端读取的js文件中

另外我们还将使用[webpack-hot-middleware](https://github.com/glenjamin/webpack-hot-middleware)，这个中间件可以检测到文件的修改并通知客户端重新渲染组件

根据下面的文档，可以看出webpack-hot-middleware是怎么工作的

_The middleware installs itself as a webpack plugin, and listens for compiler events._

每个连接的客户端会建立一个服务器可推送的连接，服务器可以给连接的客户端推送重新编译事件的消息

当客户端获取到这个消息的时候，他会检查代码是否更新了，如果本地的代码不是最新，就会触发重新读取代码的事件

下面是`app.js`文件，这个文件被用做我们服务器的入口。
这个入口是服务器启动所调用的第一个文件，也是连接所有应用文件的一个文件，这个入口文件在node应用中经常被叫做app.js或者index.js，为了更好地理解，这个[解答](http://stackoverflow.com/questions/21063587/what-is-index-js-typically-used-for-in-node-js-projects)会更有帮助

常规的，我们的入口文件会创建一个新的express服务器对象来服务器我们的webpack，并监听一个指定的端口，这个服务器会提供一个index.html文件，这个html文件会通过一个脚本标签引入react组件，另外我们的入口文件会在开发环境的时候使用中间件来允许我们使用动态模块更新

```javascript

const Server = require('./server.js')
const port = (process.env.PORT || 8080)
const app = Server.app()

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack')
  const webpackDevMiddleware = require('webpack-dev-middleware')
  const webpackHotMiddleware = require('webpack-hot-middleware')
  const config = require('../webpack.deployment.config.js')
  const compiler = webpack(config)

  app.use(webpackHotMiddleware(compiler))
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: config.output.publicPathdist
  }))
}

app.listen(port)
console.log(`Listening at http://localhost:${port}`)
```

第一行，我们导入了工厂方法并创建了express服务器对象

第五行，我检查是否是在开发环境

第12~16行，我们在express服务器中添加了webpack中间件

现在我们有了一个开发服务器，我们现在只需要在命令行打入下面命令就能本地启动应用了

```bash
node dist/app.js
```

与其每次都打着重复的命令，让我们把我们的运行脚本写入到package.json文件中吧，这可以帮助我们在像heroku这样的服务器上开发，这让我们可以使用start脚本来部署应用

```javascript
{
  "name": "how_far_hr",
  "version": "1.1.0",
  "engines": {
    "node": "5.12.0"
  },
  "description": "A small toy app showing HR progress with React and ES6",
  "author": "Jon Deng <jondeng.com>",
  "license": "MIT",
  "private": false,
  "scripts": {
    "start": "npm build && node dist/app.js",
    "dev-start": "node dist/app.js",
    "build": "webpack --config ./webpack.deployment.config.js --progress --colors"
  },
  "dependencies": {
    "bootstrap": "^4.0.0-alpha.2",
    "express": "^4.14.0",
    "react": "^15.3.2",
    "react-dom": "^15.3.2",
    "redux": "^3.6.0",
    "underscore": "^1.8.3"
  },
  "devDependencies": {
    "babel-cli": "^6.6.5",
    "babel-core": "^6.17.0",
    "babel-loader": "^6.2.5",
    "babel-preset-es2015": "^6.16.0",
    "babel-preset-react": "^6.16.0",
    "react-hot-loader": "^3.0.0-beta.5",
    "webpack": "^1.13.2",
    "webpack-dev-middleware": "^1.8.3",
    "webpack-hot-middleware": "^2.12.2"
  }
}
```

后面没啥了，就酱
