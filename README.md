# uni-vue3-router

[中文](./README.zh-CN.md) | [English](./README.md)

A Vue Router-style routing library for uni-app, supporting vite+vue3+javascript environments.

[![GitHub](https://img.shields.io/badge/GitHub-wangmiaozero/uni--vue3--router-blue?logo=github)](https://github.com/wangmiaozero/uni-vue3-router)
[![Author](https://img.shields.io/badge/wangmiaozero-orange)](https://github.com/wangmiaozero)

## Features

- Similar API and usage to Vue Router
- Route interception and navigation guards based on uni.addInterceptor
- Support for Composition API
- Support for route guards (beforeEach, afterEach, beforeResolve)
- Support for page component-level navigation guards (onBeforeRouteLeave, onBeforeRouteUpdate)

## Installation

### Quick Installation

Use the provided installation scripts:

```bash
# Using pnpm (recommended)
./setup.sh

# Or using npm
./setup-npm.sh
```

This will install all dependencies and build the project.

### Manual Installation

1. Install main package dependencies:

```bash
# Using pnpm
pnpm install

# Or using npm
npm install
```

2. Build the library:

```bash
# Using pnpm
pnpm run build

# Or using npm
npm run build
```

3. Install example project dependencies:

```bash
cd example

# Using pnpm
pnpm install

# Or using npm
npm install
```

## Running the Example Project

```bash
cd example

# Using pnpm
pnpm run dev:h5

# Or using npm
npm run dev:h5
```

## Troubleshooting

If you encounter startup issues, try the following steps:

1. Clean cache and dependencies:
```bash
rm -rf node_modules
rm -rf example/node_modules
rm -rf example/dist example/unpackage
rm -rf dist
```

2. Try using npm instead of pnpm:
```bash
./setup-npm.sh
```

3. Make sure you have the latest version of uni-app CLI installed:
```bash
npm install -g @dcloudio/uni-cli
```

4. If you encounter module path errors related to uni-app, try forcing the installation of Vue3 versions:
```bash
cd example
npm run force-install
```

5. If you encounter permission issues on MacOS, you can try:
```bash
cd example
chmod +x node_modules/.bin/uni
```

6. If you still have issues, you can try directly installing all uni-app related dependencies with the Vue3 tag:
```bash
cd example
npm install "@dcloudio/uni-cli-shared@vue3" "@dcloudio/uni-app@vue3" "@dcloudio/uni-h5@vue3" "@dcloudio/vite-plugin-uni@vue3" "@dcloudio/uni-stacktracey@vue3" "@dcloudio/uni-automator@vue3" --force
```

## Basic Usage

### Creating a Router Instance

```js
// router.js
import { createRouter } from 'uni-vue3-router'

const router = createRouter({
  routes: [
    { path: '/pages/index/index', name: 'home' },
    { path: '/pages/my/index', name: 'my' }
  ]
})

// Add global navigation guards
router.beforeEach((to, from, next) => {
  console.log('Global before guard', to, from)
  next()
})

router.afterEach((to, from) => {
  console.log('Global after hook', to, from)
})

export default router
```

### Mounting the Router in main.js

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
  
  // Handle page show event
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

### Using in Components

**Composition API Style:**

```js
import { useRouter, useRoute } from 'uni-vue3-router'

export default {
  setup() {
    const router = useRouter()
    const route = useRoute()
    
    // Route navigation
    function handleNavigate() {
      router.push('/pages/detail/index?id=123')
    }
    
    // Watch route parameters
    watch(route, (value) => {
      console.log('Route parameters changed', value)
    })
    
    return {
      handleNavigate
    }
  }
}
```

**Options API Style:**

```js
export default {
  methods: {
    handleNavigate() {
      this.$router.push('/pages/detail/index?id=123')
    }
  }
}
```

## API Reference

### Router Instance

- `router.currentRoute` - Current route information
- `router.$lockStatus` - Router lock status
- `router.beforeEach(guard)` - Add global before guard
- `router.afterEach(hook)` - Add global after hook
- `router.beforeResolve(guard)` - Add global resolve guard
- `router.isReady()` - Check if router is ready
- `router.push(to)` - Navigate to a new page
- `router.pushTab(to)` - Navigate to a tab page
- `router.replace(to)` - Replace current page
- `router.replaceAll(to)` - Close all pages and open specified page
- `router.back([delta])` - Return to previous page or specified level
- `router.onError(callback)` - Add error handling
- `router.addRoute(route)` - Add route
- `router.removeRoute(name)` - Remove route

### Composition API

- `useRouter()` - Get router instance
- `useRoute()` - Get current route information
- `onBeforeRouteLeave(guard)` - Add leave guard
- `onBeforeRouteUpdate(guard)` - Add update guard


## License

This project uses a custom license. According to the license terms, you are free to use, copy, modify, and distribute this software, including for commercial purposes, subject to the following conditions:

1. Retain the original copyright notice and license notice
2. Clearly indicate the use of this software in your project
3. If you use this software on GitHub or other platforms that support the "Star" feature, please star the original project to show your support

**Special Declaration**: Whether used for commercial purposes or not, any consequences, responsibilities, and legal issues arising from the use of this Software shall be borne by the user and are not related to the original author. The original author assumes no responsibility for any commercial use or other usage methods.

For detailed terms, please check the [LICENSE](./LICENSE) file.

## Notes

1. This routing library is a wrapper around uni-app's native routing API, and basic functionality is still subject to uni-app limitations
2. To maintain consistency with Vue Router style, some APIs may have differences
3. Ensure that the uni-app environment is correctly configured before use
4. If using pnpm to manage dependencies, you may encounter path resolution issues with uni-app, it is recommended to try using npm
5. uni-app's Vue3 support is still under development, please use the specified vue3 tag version 

## Author

- **wangmiaozero** - [GitHub Profile](https://github.com/wangmiaozero)

## Repository

- **GitHub**: [https://github.com/wangmiaozero/uni-vue3-router](https://github.com/wangmiaozero/uni-vue3-router) 