import { getCurrentInstance, onUnmounted, onMounted, reactive, toRefs } from 'vue';

// 全局路由实例，在createRouter中设置
let globalRouter = null;

/**
 * 设置全局路由实例
 * @param {Router} router 路由实例
 */
export function setGlobalRouter(router) {
  globalRouter = router;
}

/**
 * 获取路由实例
 * @returns {Router} 路由实例
 */
export function useRouter() {
  if (!globalRouter) {
    console.error('[uni-vue3-router] No router instance found.');
    return {};
  }
  
  return globalRouter;
}

/**
 * 获取当前路由信息
 * @returns {Object} 当前路由信息
 */
export function useRoute() {
  const router = useRouter();
  
  if (!router.currentRoute) {
    console.error('[uni-vue3-router] No current route found.');
    return reactive({});
  }
  
  return router.currentRoute;
}

/**
 * 在路由离开前执行
 * @param {Function} guard 守卫函数
 */
export function onBeforeRouteLeave(guard) {
  if (!guard || typeof guard !== 'function') {
    return;
  }
  
  const instance = getCurrentInstance();
  if (!instance) {
    console.error('[uni-vue3-router] onBeforeRouteLeave must be called in setup()');
    return;
  }
  
  const router = useRouter();
  if (!router.beforeEach) {
    console.error('[uni-vue3-router] No router instance found.');
    return;
  }
  
  // 获取当前页面路径
  const getCurrentPath = () => {
    const pages = getCurrentPages();
    if (pages.length === 0) return '';
    return pages[pages.length - 1].route;
  };
  
  // 获取当前页面路径
  const currentPath = getCurrentPath();
  
  // 创建离开守卫
  const removeGuard = router.beforeEach((to, from, next) => {
    if (from.path === currentPath) {
      guard(to, from, next);
    } else {
      next();
    }
  });
  
  // 组件卸载时移除守卫
  onUnmounted(() => {
    removeGuard();
  });
}

/**
 * 在当前路由更新前执行
 * @param {Function} guard 守卫函数
 */
export function onBeforeRouteUpdate(guard) {
  if (!guard || typeof guard !== 'function') {
    return;
  }
  
  const instance = getCurrentInstance();
  if (!instance) {
    console.error('[uni-vue3-router] onBeforeRouteUpdate must be called in setup()');
    return;
  }
  
  const router = useRouter();
  if (!router.beforeEach) {
    console.error('[uni-vue3-router] No router instance found.');
    return;
  }
  
  // 获取当前页面路径
  const getCurrentPath = () => {
    const pages = getCurrentPages();
    if (pages.length === 0) return '';
    return pages[pages.length - 1].route;
  };
  
  // 获取当前页面路径
  const currentPath = getCurrentPath();
  
  // 创建更新守卫
  const removeGuard = router.beforeEach((to, from, next) => {
    if (to.path === currentPath && from.path === currentPath) {
      guard(to, from, next);
    } else {
      next();
    }
  });
  
  // 组件卸载时移除守卫
  onUnmounted(() => {
    removeGuard();
  });
} 