###Using ES6 and ES7 in the Browser, with Babel 6 and Webpack

[原文出处](http://jamesknelson.com/using-es6-in-the-browser-with-babel-6-and-webpack/?utm_source=jsgroup)

这篇教程是[使用Babel6用ES6全攻略系列](http://jamesknelson.com/the-complete-guide-to-es6-with-babel-6)的一部分，如果你对升级到Babel 6有问题的话，可以先看看这篇[文章](http://jamesknelson.com/the-six-things-you-need-to-know-about-babel-6)。

[Babel CLI](http://jamesknelson.com/writing-npm-packages-with-es6-using-the-babel-6-cli/)是一个非常好的单文件的ES6到ES5的解释器。当Babel 遇到`import`语句，就会输出`require`，但是在浏览器端，并不会让你感觉到有很大的区别。

为了让Babel对浏览器更加的友好，我们必须要对这些文件打包。我最新换的工具是Webpack，我们发现我们能够通过`babel-lodader`对Babel支持。

####Installing Packages
在我们开始之前，如果你现在正在使用Babel5，首先，将他的包信息从你的package.json中移除，然后使用`npm uninstall`这些包比如`babel`，`babel-core`，`babel-loader`等等。

######Build-time packages

当你准备好了之后，我们可以开始安装`babel-core`和`babel-loader`的包：

```bash
npm install babel-core babel-loader --save-dev
```

接下来，你可能会安装一些[插件](https://babeljs.io/docs/plugins/)，你可以尝试一下`babel-preset-es2015`，这是ES6转换的一个合集，如果你在使用[JSX](https://facebook.github.io/jsx/)，你可能需要`babel-preset-react`。而且如果你想要玩玩火，你可以加入`babel-preset-stage-0`来尝试ES7的新特性，`async`或者`await`等等

```bash
# For ES6/ES2015 support
npm install babel-preset-es2015 --save-dev

# If you want to use JSX
npm install babel-preset-react --save-dev

# If you want to use experimental ES7 features
npm install babel-preset-stage-0 --save-dev
```
######Runtime support

Babel依靠单独的编译不能支持ES6的全部特性，它还需要一些运行时的支持，尤其是像Set，Map，Promise必须要被内核支持，Babel的生成器的实现也使用了若干个运行时helper，这使得你的App不用和别的App使用同样的环境，你可以使用`babel-polyfill`来让你的浏览器实现所有ES6功能

```bash
npm install babel-polyfill --save
```

Babel也提供了一些helper到你的解释代码中，这对单文件是没问题的，但是，当我们使用webpack打包的时候，重复的代码会影响到最后产生的文件的大小。可以通过使用`babel-runtime`和`transform-runtime`来代替那些helper。

```bash
npm install babel-runtime --save
npm install babel-plugin-transform-runtime --save-dev
```

配置 babel-loader

这个是建立在你能理解webpack的基础上的，为了加深印象，可以先看看这篇文章[Webpack Made Simple: Building ES6 & LESS with autorefresh](http://jamesknelson.com/webpack-made-simple-build-es6-less-with-autorefresh-in-26-lines/)

通过Webpack，使用Babel运行你的javascript或者JSX就变得比较简单了，你只要在`webpack.config.js`的`loaders`入口加入`babel-loader`：

```javascript
module: {
  loaders: [
    {
      loader: "babel-loader",

      // Skip any files outside of your project's `src` directory
      include: [
        path.resolve(__dirname, "src"),
      ],

      // Only run `.js` and `.jsx` files through Babel
      test: /\.jsx?$/,

      // Options to configure babel with
      query: {
        plugins: ['transform-runtime'],
        presets: ['es2015', 'stage-0', 'react'],
      }
    },
  ]
}
```

在上面的设置中，我们告诉Webpack去使用Babel解释我src中的文件，我们可以通过确保你的`node_modules`路径中的文件没有被Babel编译，来提高变异的速度，当然[NPM modules should be published as ES5](http://jamesknelson.com/writing-npm-packages-with-es6-using-the-babel-6-cli/)，你可以通过`exclude`来达到这个效果：

```javascript
exclude: [
  path.resolve(__dirname, "node_modules"),
],
```
这个对象包含了所有Babel设置的选项，假设你已经安装了上一节中介绍的所有的包，如果你已经不需要更多地Babel运行时helper或者不想要使用React或者尝试ES7，你可以适当的从这个对象中移除一些字符串。

####Entry point scripts

正如之前讨论的，Babel需要一些helper来运行你的应用，你可以在`webpack.config.js`中的`entry`中加入polyfill来实现这些功能。

```javascript
entry: [
  // Set up an ES6-ish environment
  'babel-polyfill',

  // Add your application's scripts below
  './src/main',
],
```

####Examples

这里有个比较简单的使用Webpack打包使用Babel6的栗子[webpack-black-triangle](https://github.com/jamesknelson/webpack-black-triangle)

一个更加完善的基于React的使用Webpack打包的栗子[Unicorn Standard Starter Kit](https://github.com/unicorn-standard/starter-kit)

####More ways to Babel

现在你已经使用ES6写你的应用了，那么为什么不尝试使用ES6写测试，或者使用它写一些库，或者使用它写一些任务脚本

[Testing with Mocha and Babel’s register script](http://jamesknelson.com/testing-in-es6-with-mocha-and-babel-6/)

[Transforming NPM Packages with the Babel 6 CLI
](http://jamesknelson.com/using-es6-in-the-browser-with-babel-6-and-webpack/writing-npm-packages-with-es6-using-the-babel-6-cli)

[Running tasks with gulpfile.babel.js
](http://jamesknelson.com/teaching-gulp-es6-with-babel-6/)



