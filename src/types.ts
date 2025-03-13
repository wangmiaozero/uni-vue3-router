/**
 * 路由配置项接口
 */
export interface RouteRecordRaw {
  path: string;
  name?: string;
  meta?: Record<string, any>;
  children?: RouteRecordRaw[];
  redirect?: string | LocationAsPath;
  alias?: string | string[];
  beforeEnter?: NavigationGuardWithThis<undefined>;
  [key: string]: any;
}

/**
 * 路由器选项接口
 */
export interface RouterOptions {
  routes?: RouteRecordRaw[];
  history?: any;
  [key: string]: any;
}

/**
 * 路由位置接口
 */
export interface RouteLocationRaw {
  path?: string;
  name?: string;
  params?: Record<string, any>;
  query?: Record<string, any>;
  hash?: string;
  [key: string]: any;
}

/**
 * 路径形式的位置
 */
export interface LocationAsPath {
  path: string;
}

/**
 * 路由位置标准化接口
 */
export interface RouteLocationNormalized {
  path: string;
  fullPath: string;
  hash: string;
  query: Record<string, string | string[]>;
  params: Record<string, string>;
  name: string | null | undefined;
  meta: Record<string, any>;
  matched: RouteRecordRaw[];
  redirectedFrom?: RouteLocationNormalized;
  [key: string]: any;
}

/**
 * 导航守卫函数类型
 */
export type NavigationGuardNext = (to?: any) => void;

/**
 * 导航守卫接口
 */
export interface NavigationGuardWithThis<T> {
  (
    this: T,
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
  ): void | Promise<void>;
}

/**
 * 后置导航钩子
 */
export interface NavigationHookAfter {
  (to: RouteLocationNormalized, from: RouteLocationNormalized): void;
}

/**
 * 错误处理函数
 */
export interface ErrorHandler {
  (error: any): void;
}

/**
 * 路由器接口
 */
export interface Router {
  /**
   * 当前路由
   */
  currentRoute: RouteLocationNormalized;
  
  /**
   * 路由锁定状态
   */
  $lockStatus: boolean;
  
  /**
   * 添加全局前置守卫
   */
  beforeEach(guard: NavigationGuardWithThis<undefined>): () => void;
  
  /**
   * 添加全局后置钩子
   */
  afterEach(hook: NavigationHookAfter): () => void;
  
  /**
   * 添加全局解析守卫
   */
  beforeResolve(guard: NavigationGuardWithThis<undefined>): () => void;
  
  /**
   * 检查路由是否就绪
   */
  isReady(): Promise<void>;
  
  /**
   * 导航到新页面
   */
  push(to: RouteLocationRaw): Promise<void>;
  
  /**
   * 导航到Tab页面
   */
  pushTab(to: RouteLocationRaw): Promise<void>;
  
  /**
   * 替换当前页面
   */
  replace(to: RouteLocationRaw): Promise<void>;
  
  /**
   * 关闭所有页面，打开指定页面
   */
  replaceAll(to: RouteLocationRaw): Promise<void>;
  
  /**
   * 返回上一页或指定层级页面
   */
  back(delta?: number): Promise<void>;
  
  /**
   * 添加错误处理
   */
  onError(callback: ErrorHandler): () => void;
  
  /**
   * 添加路由
   */
  addRoute(route: RouteRecordRaw): void;
  
  /**
   * 删除路由
   */
  removeRoute(name: string): void;
  
  /**
   * 获取所有路由
   */
  getRoutes(): RouteRecordRaw[];
}

/**
 * 组件内导航守卫
 */
export interface ComponentCustomOptions {
  /**
   * 组件内前置守卫
   */
  beforeRouteEnter?: NavigationGuardWithThis<undefined>;
  
  /**
   * 组件内更新守卫
   */
  beforeRouteUpdate?: NavigationGuardWithThis<undefined>;
  
  /**
   * 组件内离开守卫
   */
  beforeRouteLeave?: NavigationGuardWithThis<undefined>;
}

/**
 * 创建路由器函数类型
 */
export type CreateRouterFunction = (options: RouterOptions) => Router; 