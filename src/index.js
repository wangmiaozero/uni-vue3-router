import Router from './router';
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate, setGlobalRouter } from './composables';

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