import Router from './router';
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate, setGlobalRouter } from './composables';

/**
 * 创建路由器实例
 * @param {import('./types').RouterOptions} options 路由器选项
 * @returns {import('./types').Router} 路由器实例
 */
export function createRouter(options = {}) {
  const router = new Router(options);
  // 设置全局路由实例
  setGlobalRouter(router);
  return router;
}

export {
  useRouter,
  useRoute,
  onBeforeRouteLeave,
  onBeforeRouteUpdate,
}; 