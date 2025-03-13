/**
 * 拦截器类型声明
 */

/**
 * 添加路由拦截器
 */
export function addRouterInterceptor(): void;

/**
 * 移除路由拦截器
 */
export function removeRouterInterceptor(): void;

/**
 * 添加导航守卫
 */
export function addNavigationGuard(
  type: string,
  guard: (to: any, from: any, next?: (to?: any) => void) => void
): () => void;

/**
 * 运行导航守卫
 */
export function runGuardQueue(
  guards: Array<(to: any, from: any, next: (to?: any) => void) => void>,
  to: any,
  from: any
): Promise<void>;

/**
 * 处理导航
 */
export function handleNavigation(
  to: any,
  from: any,
  replace: boolean,
  isTab: boolean,
  isAll: boolean
): Promise<void>; 