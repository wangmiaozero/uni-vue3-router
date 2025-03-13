# uni-vue3-router

[中文](./README.zh-CN.md) | [English](./README.md)

基于uni-app封装的Vue Router风格路由库，支持vite+vue3+javascript/typescript环境。

[![GitHub](https://img.shields.io/badge/GitHub-wangmiaozero/uni--vue3--router-blue?logo=github)](https://github.com/wangmiaozero/uni-vue3-router)
[![作者](https://img.shields.io/badge/作者-wangmiaozero-orange)](https://github.com/wangmiaozero)
[![TypeScript](https://img.shields.io/badge/TypeScript-支持-blue)](https://www.typescriptlang.org/)

## 特性

- 类似Vue Router的API和使用方式
- 基于uni.addInterceptor实现路由拦截和导航守卫
- 支持组合式API (Composition API)
- 支持路由守卫 (beforeEach, afterEach, beforeResolve)
- 支持页面组件级导航守卫 (onBeforeRouteLeave, onBeforeRouteUpdate)
- **TypeScript支持** - 完整的类型定义，提供更好的开发体验

## 安装

### 快速安装

使用提供的安装脚本：

```bash
# 使用pnpm (推荐)
./setup.sh

# 或使用npm
./setup-npm.sh
```

这将安装所有依赖并构建项目。

### 手动安装

1. 安装主包依赖：

```bash
# 使用pnpm
pnpm install

# 或使用npm
npm install
```

2. 构建库：

```bash
# 使用pnpm
pnpm run build

# 或使用npm
npm run build
```

3. 安装示例项目依赖：

```bash
cd example

# 使用pnpm
pnpm install

# 或使用npm
npm install
```

## 启动示例项目

```bash
cd example

# 使用pnpm
pnpm run dev:h5

# 或使用npm
npm run dev:h5
```

## 故障排除

如果遇到启动问题，请尝试以下步骤：

1. 清理缓存和依赖：
```bash
rm -rf node_modules
rm -rf example/node_modules
rm -rf example/dist example/unpackage
rm -rf dist
```

2. 尝试使用npm而不是pnpm：
```bash
./setup-npm.sh
```

3. 确保安装了最新版本的uni-app CLI：
```bash
npm install -g @dcloudio/uni-cli
```

4. 如果出现与uni-app相关的模块路径错误，尝试强制安装Vue3版本：
```bash
cd example
npm run force-install
```

5. 如果在MacOS上遇到权限问题，可以尝试：
```bash
cd example
chmod +x node_modules/.bin/uni
```

6. 如果仍然有问题，可以尝试直接安装所有uni-app相关依赖的Vue3版本：
```bash
cd example
npm install "@dcloudio/uni-cli-shared@vue3" "@dcloudio/uni-app@vue3" "@dcloudio/uni-h5@vue3" "@dcloudio/vite-plugin-uni@vue3" "@dcloudio/uni-stacktracey@vue3" "@dcloudio/uni-automator@vue3" --force
```

## 基本用法

### 创建路由实例

```js
// router.js
import { createRouter } from 'uni-vue3-router'

const router = createRouter({
  routes: [
    { path: '/pages/index/index', name: 'home' },
    { path: '/pages/my/index', name: 'my' }
  ]
})

// 添加全局导航守卫
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫', to, from)
  next()
})

router.afterEach((to, from) => {
  console.log('全局后置守卫', to, from)
})

export default router
```

### 在main.js中挂载路由

```js
import { createSSRApp } from 'vue'
import App from './App.vue'
import router from './router'

export function createApp() {
  const app = createSSRApp(App)
  app.use({
    install(app) {
      app.config.globalProperties.$router = router
    }
  })
  
  // 处理页面显示事件
  const appOptions = {
    onPageShow() {
      uni.$emit('page-show');
    }
  };
  
  return { 
    app,
    ...appOptions
  }
}
```

### 在组件中使用

**组合式API方式：**

```js
import { useRouter, useRoute } from 'uni-vue3-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    // 路由跳转
    function handleNavigate() {
      router.push('/pages/detail/index?id=123')
    }
    
    // 监听路由参数
    watch(route, (value) => {
      console.log('路由参数变化', value)
    })
    
    return {
      handleNavigate
    }
  }
}
```

**选项式API方式：**

```js
export default {
  methods: {
    handleNavigate() {
      this.$router.push('/pages/detail/index?id=123')
    }
  }
}
```

## API 参考

### 路由器实例

- `router.currentRoute` - 当前路由信息
- `router.$lockStatus` - 路由锁定状态
- `router.beforeEach(guard)` - 添加全局前置守卫
- `router.afterEach(hook)` - 添加全局后置钩子
- `router.beforeResolve(guard)` - 添加全局解析守卫
- `router.isReady()` - 检查路由是否就绪
- `router.push(to)` - 导航到新页面
- `router.pushTab(to)` - 导航到Tab页面
- `router.replace(to)` - 替换当前页面
- `router.replaceAll(to)` - 关闭所有页面，打开指定页面
- `router.back([delta])` - 返回上一页或指定层级页面
- `router.onError(callback)` - 添加错误处理
- `router.addRoute(route)` - 添加路由
- `router.removeRoute(name)` - 删除路由

### 组合式API

- `useRouter()` - 获取路由器实例
- `useRoute()` - 获取当前路由信息
- `onBeforeRouteLeave(guard)` - 添加离开守卫
- `onBeforeRouteUpdate(guard)` - 添加更新守卫

## TypeScript支持

本库包含完整的TypeScript支持，为所有API提供类型定义。使用TypeScript时，您将获得：

- 路由配置的类型检查
- 路由方法和属性的自动完成
- 导航守卫和钩子的类型安全
- 更好的IDE集成

TypeScript使用示例：

```ts
// router.ts
import { createRouter, RouteRecordRaw } from 'uni-vue3-router'

const routes: RouteRecordRaw[] = [
  { path: '/pages/index/index', name: 'home' },
  { path: '/pages/my/index', name: 'my' }
]

const router = createRouter({
  routes
})

export default router
```

## 许可证

本项目使用自定义许可证。根据许可条款，您可以自由地使用、复制、修改和分发本软件，包括商业用途，但需要满足以下条件：

1. 保留原始版权声明和许可声明
2. 在您的项目中明确标明使用了本软件
3. 如果您在GitHub或其他支持"Star"功能的平台上使用本软件，请为原始项目点赞(Star)以示支持

**特别声明**：无论是否用于商业目的，使用本软件所产生的任何后果、责任和法律问题均由使用者自行承担，与原作者无关。原作者不对任何商业使用或其他使用方式承担任何责任。

详细条款请查看[LICENSE](./LICENSE)文件。

## 注意事项

1. 该路由库是对uni-app原生路由API的封装，基础功能仍受uni-app限制
2. 为保持与Vue Router风格一致，部分API可能有差异
3. 在使用前确保uni-app环境正确配置
4. 如果使用pnpm管理依赖，可能会遇到uni-app的路径解析问题，建议尝试使用npm
5. uni-app的Vue3支持仍处于开发中，请使用指定的vue3标签版本 

## 作者

- **wangmiaozero** - [GitHub主页](https://github.com/wangmiaozero)

## 仓库

- **GitHub**: [https://github.com/wangmiaozero/uni-vue3-router](https://github.com/wangmiaozero/uni-vue3-router) 