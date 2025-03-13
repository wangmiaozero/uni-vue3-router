import { RouterOptions, Router } from './types';

/**
 * 创建路由器实例
 * @param options 路由器选项
 * @returns 路由器实例
 */
export function createRouter(options?: RouterOptions): Router;

export { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from './composables';

// 导出类型
export type { 
  RouterOptions, 
  Router,
  RouteRecordRaw,
  RouteLocationRaw,
  RouteLocationNormalized,
  NavigationGuardWithThis,
  NavigationGuardNext,
  NavigationHookAfter,
  ErrorHandler,
  ComponentCustomOptions,
  LocationAsPath
} from './types'; 