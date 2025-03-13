import { Router, RouteLocationNormalized, NavigationGuardWithThis } from './types';

/**
 * 设置全局路由实例
 */
export function setGlobalRouter(router: Router): void;

/**
 * 获取路由器实例
 */
export function useRouter(): Router;

/**
 * 获取当前路由信息
 */
export function useRoute(): RouteLocationNormalized;

/**
 * 添加离开守卫
 */
export function onBeforeRouteLeave(guard: NavigationGuardWithThis<undefined>): void;

/**
 * 添加更新守卫
 */
export function onBeforeRouteUpdate(guard: NavigationGuardWithThis<undefined>): void; 