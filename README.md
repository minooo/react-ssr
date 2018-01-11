> 随着React服务端渲染越来越流行，笔者也想尝尝鲜，经过半个月的折腾，笔者把原先的客户端渲染项目，通过结合 next.js 构建了一个服务端渲染的同构项目。再加上开启服务器页面缓存，以及静态资源CDN加速优化，最终使得**网站首屏渲染时间在0.6秒（即：DOMContentLoaded 的时间）左右**，大大提高了页面的响应速度，进一步提升用户体验。
#### 渲染截图
![ssr.png](http://upload-images.jianshu.io/upload_images/111568-338e3b01d7e5cc5a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

#### [项目线上地址](http://m.jr.duduapp.net/)
## 架构简要说明
很显然，这是移动端网站，选用了 [React16](https://github.com/facebook/react) + [next.js4](https://github.com/zeit/next.js) + [antd-mobile2](https://github.com/ant-design/ant-design-mobile) + [redux](https://github.com/reactjs/redux) 的技术栈，算是笔者学习React 两年来第一个服务端渲染的项目。由于爱折腾，笔者喜欢自己动手搭脚手架，期间参考了各路大牛的源码和想法，非常感谢！所以这次做下总结，如果恰好能帮到在React服务端渲染方面有困惑的同学，何乐而不为？

- 目录，具体参照源码所示
![image.png](http://upload-images.jianshu.io/upload_images/111568-2b8e3e7ccbfc3d14.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
- 代码规范，本架构通过 eslint 配备了完善了 React 语法规范检查。
- 样式，由于 next.js 目前的版本（v 4.2）并不建议配置loader（据说下个版本会支持），所以我们的样式最好能提前编译好，为此笔者额外配置了 webpack-handle-css.js 的文件，用于样式的实时编译和打包。同时引入了 antd-mobile 作为辅助UI库，并且支持主题配置。当然，本站依然使用了[rem布局](https://www.jianshu.com/p/985d26b40199)，至于字形图标的使用[请参阅这里](https://www.jianshu.com/p/8aa29bfdd046)。
- next，next有自己的运行机制，你需要注意和遵守，比如你的所有页面都必须放到根目录下的pages文件夹里，至于路由和文件路径的关系，在 server.js 里有展示。另外，next 有自己的路由模块，所以这里用不到 `react-router`。[更多详情](https://github.com/zeit/next.js#how-to-use)
- 组件，可以复用的模块要写成组件；不能复用，但是逻辑比较复杂的模块也应该写成组件。其余的，都写在pages里就行了。组件分为无状态组件，和有状态组件，需要指出的是，在next.js的架构中，如果你写的是无状态组件，可以不用引入 react，如：
  ```js
   export default ({ text }) => (
      <div className="h100 flex jc-center ai-center">
      <i className="i-loading rotate font32 c999" />&nbsp;
      <span>{text || '加载中...'}</span>
    </div>
  )
  ```
- redux，初始化的redux数据，统一写在每个page的getInitialProps生命周期里，它的特点是可以在服务端渲染和客户端渲染中都能使用。更多细节都在源码里，欢迎交流探讨。
- 部署上线，这是个同构项目，需要配置服务器node环境，在 server.js 文件里，笔者开启了服务端页面缓存，但对于有用户数据的页面则是选择了关闭缓存，避免串号问题，另外在 next.config.js 文件里，通过设置 assetPrefix ，将所有静态资源放入CDN中，进一步提高网站首屏渲染速度。CDN 中的静态资源需要手动导出，运行 `npm run export`，资源将被打包到根目录下的 outCDN 中。
## License
MIT
