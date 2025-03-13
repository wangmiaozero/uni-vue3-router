import { createRouteLocation, extractParams } from './utils';

let routerInstance = null;
const INTERCEPTORS_IDS = {};

/**
 * 添加拦截器
 * @param {Router} router 路由实例
 */
export function addInterceptors(router) {
  if (!router) return;
  
  routerInstance = router;
  
  // 添加页面路由拦截器
  addNavigateTo();
  addRedirectTo();
  addReLaunch();
  addSwitchTab();
  addNavigateBack();
  
  // 更新当前路由方法
  addPageShowInterceptor();
}

/**
 * 移除所有拦截器
 */
export function removeInterceptors() {
  Object.keys(INTERCEPTORS_IDS).forEach(key => {
    if (INTERCEPTORS_IDS[key]) {
      uni.removeInterceptor(key);
      delete INTERCEPTORS_IDS[key];
    }
  });
  
  routerInstance = null;
}

/**
 * 执行前置守卫
 * @param {Object} to 目标路由
 * @param {Object} from 当前路由
 * @param {Function} next 下一步回调
 */
function runBeforeGuards(to, from, next) {
  if (!routerInstance) {
    return next();
  }
  
  const guards = routerInstance.beforeEachGuards;
  if (!guards.length) {
    return next();
  }
  
  // 当前导航运行状态锁
  routerInstance.$lockStatus.value = true;
  
  let index = 0;
  const nextGuard = () => {
    if (index >= guards.length) {
      routerInstance.$lockStatus.value = false;
      return next();
    }
    
    const guard = guards[index++];
    
    try {
      guard(to, from, nextGuard);
    } catch (err) {
      console.error('Navigation guard error:', err);
      routerInstance.$lockStatus.value = false;
      routerInstance._handleError(err);
      next(false);
    }
  };
  
  nextGuard();
}

/**
 * 执行解析守卫
 * @param {Object} to 目标路由
 * @param {Object} from 当前路由
 * @param {Function} next 下一步回调
 */
function runResolveGuards(to, from, next) {
  if (!routerInstance) {
    return next();
  }
  
  const guards = routerInstance.beforeResolveGuards;
  if (!guards.length) {
    return next();
  }
  
  let index = 0;
  const nextGuard = () => {
    if (index >= guards.length) {
      return next();
    }
    
    const guard = guards[index++];
    
    try {
      guard(to, from, nextGuard);
    } catch (err) {
      console.error('Resolution guard error:', err);
      routerInstance._handleError(err);
      next(false);
    }
  };
  
  nextGuard();
}

/**
 * 执行后置守卫
 * @param {Object} to 目标路由
 * @param {Object} from 当前路由
 */
function runAfterGuards(to, from) {
  if (!routerInstance) return;
  
  const guards = routerInstance.afterEachGuards;
  if (!guards.length) return;
  
  for (const guard of guards) {
    try {
      guard(to, from);
    } catch (err) {
      console.error('After navigation guard error:', err);
      routerInstance._handleError(err);
    }
  }
}

/**
 * 添加 navigateTo 拦截器
 */
function addNavigateTo() {
  INTERCEPTORS_IDS['navigateTo'] = uni.addInterceptor('navigateTo', {
    invoke(params) {
      if (!routerInstance) return params;
      
      const fromRoute = { ...routerInstance.currentRoute };
      const query = extractParams(params.url);
      const toRoute = createRouteLocation(params.url, query);
      
      return new Promise((resolve, reject) => {
        runBeforeGuards(toRoute, fromRoute, (navResult) => {
          if (navResult === false) {
            routerInstance.$lockStatus.value = false;
            return reject(new Error('Navigation aborted'));
          }
          
          runResolveGuards(toRoute, fromRoute, (resolveResult) => {
            if (resolveResult === false) {
              return reject(new Error('Navigation resolution aborted'));
            }
            
            // 更新当前路由
            if (navResult && typeof navResult === 'object' && navResult.url) {
              resolve(navResult);
            } else {
              resolve(params);
            }
          });
        });
      });
    },
    success(res) {
      if (!routerInstance) return res;
      
      const pages = getCurrentPages();
      if (pages.length >= 2) {
        const currentPage = pages[pages.length - 1];
        const previousPage = pages[pages.length - 2];
        
        if (currentPage && previousPage) {
          const { route: toPath, options: toOptions = {} } = currentPage;
          const { route: fromPath, options: fromOptions = {} } = previousPage;
          
          const toRoute = createRouteLocation(toPath, toOptions);
          const fromRoute = createRouteLocation(fromPath, fromOptions);
          
          // 更新当前路由
          Object.assign(routerInstance.currentRoute, toRoute);
          
          // 执行后置守卫
          runAfterGuards(toRoute, fromRoute);
        }
      }
      
      return res;
    },
    fail(err) {
      if (routerInstance) {
        routerInstance.$lockStatus.value = false;
        routerInstance._handleError(err);
      }
      return err;
    },
    complete(res) {
      if (routerInstance) {
        routerInstance.$lockStatus.value = false;
      }
      return res;
    }
  });
}

/**
 * 添加 redirectTo 拦截器
 */
function addRedirectTo() {
  INTERCEPTORS_IDS['redirectTo'] = uni.addInterceptor('redirectTo', {
    invoke(params) {
      if (!routerInstance) return params;
      
      const fromRoute = { ...routerInstance.currentRoute };
      const query = extractParams(params.url);
      const toRoute = createRouteLocation(params.url, query);
      
      return new Promise((resolve, reject) => {
        runBeforeGuards(toRoute, fromRoute, (navResult) => {
          if (navResult === false) {
            routerInstance.$lockStatus.value = false;
            return reject(new Error('Navigation aborted'));
          }
          
          runResolveGuards(toRoute, fromRoute, (resolveResult) => {
            if (resolveResult === false) {
              return reject(new Error('Navigation resolution aborted'));
            }
            
            if (navResult && typeof navResult === 'object' && navResult.url) {
              resolve(navResult);
            } else {
              resolve(params);
            }
          });
        });
      });
    },
    complete(res) {
      if (routerInstance) {
        routerInstance.$lockStatus.value = false;
      }
      return res;
    }
  });
}

/**
 * 添加 reLaunch 拦截器
 */
function addReLaunch() {
  INTERCEPTORS_IDS['reLaunch'] = uni.addInterceptor('reLaunch', {
    invoke(params) {
      if (!routerInstance) return params;
      
      const fromRoute = { ...routerInstance.currentRoute };
      const query = extractParams(params.url);
      const toRoute = createRouteLocation(params.url, query);
      
      return new Promise((resolve, reject) => {
        runBeforeGuards(toRoute, fromRoute, (navResult) => {
          if (navResult === false) {
            routerInstance.$lockStatus.value = false;
            return reject(new Error('Navigation aborted'));
          }
          
          runResolveGuards(toRoute, fromRoute, (resolveResult) => {
            if (resolveResult === false) {
              return reject(new Error('Navigation resolution aborted'));
            }
            
            if (navResult && typeof navResult === 'object' && navResult.url) {
              resolve(navResult);
            } else {
              resolve(params);
            }
          });
        });
      });
    },
    complete(res) {
      if (routerInstance) {
        routerInstance.$lockStatus.value = false;
      }
      return res;
    }
  });
}

/**
 * 添加 switchTab 拦截器
 */
function addSwitchTab() {
  INTERCEPTORS_IDS['switchTab'] = uni.addInterceptor('switchTab', {
    invoke(params) {
      if (!routerInstance) return params;
      
      const fromRoute = { ...routerInstance.currentRoute };
      const query = extractParams(params.url);
      const toRoute = createRouteLocation(params.url, query);
      
      return new Promise((resolve, reject) => {
        runBeforeGuards(toRoute, fromRoute, (navResult) => {
          if (navResult === false) {
            routerInstance.$lockStatus.value = false;
            return reject(new Error('Navigation aborted'));
          }
          
          runResolveGuards(toRoute, fromRoute, (resolveResult) => {
            if (resolveResult === false) {
              return reject(new Error('Navigation resolution aborted'));
            }
            
            if (navResult && typeof navResult === 'object' && navResult.url) {
              resolve(navResult);
            } else {
              resolve(params);
            }
          });
        });
      });
    },
    complete(res) {
      if (routerInstance) {
        routerInstance.$lockStatus.value = false;
      }
      return res;
    }
  });
}

/**
 * 添加 navigateBack 拦截器
 */
function addNavigateBack() {
  INTERCEPTORS_IDS['navigateBack'] = uni.addInterceptor('navigateBack', {
    invoke(params) {
      if (!routerInstance) return params;
      
      const fromRoute = { ...routerInstance.currentRoute };
      const pages = getCurrentPages();
      
      // 计算目标页面
      const delta = params.delta || 1;
      const targetIndex = pages.length - 1 - delta;
      
      if (targetIndex < 0) {
        return params;
      }
      
      const targetPage = pages[targetIndex];
      if (!targetPage) {
        return params;
      }
      
      const { route: targetPath, options: targetOptions = {} } = targetPage;
      const toRoute = createRouteLocation(targetPath, targetOptions);
      
      return new Promise((resolve, reject) => {
        runBeforeGuards(toRoute, fromRoute, (navResult) => {
          if (navResult === false) {
            routerInstance.$lockStatus.value = false;
            return reject(new Error('Navigation aborted'));
          }
          
          runResolveGuards(toRoute, fromRoute, (resolveResult) => {
            if (resolveResult === false) {
              return reject(new Error('Navigation resolution aborted'));
            }
            
            // 对于navigateBack，navResult可能会影响到delta
            if (navResult && typeof navResult === 'object') {
              if (typeof navResult.delta === 'number') {
                resolve({ ...params, delta: navResult.delta });
              } else {
                resolve(params);
              }
            } else {
              resolve(params);
            }
          });
        });
      });
    },
    complete(res) {
      if (routerInstance) {
        routerInstance.$lockStatus.value = false;
      }
      return res;
    }
  });
}

/**
 * 添加页面显示拦截器，用于更新当前路由信息
 */
function addPageShowInterceptor() {
  const pageLifecycle = uni.onPageNotFound;
  
  // 使用页面显示事件钩子更新路由信息
  uni.$on('page-show', () => {
    if (!routerInstance) return;
    
    const pages = getCurrentPages();
    if (!pages.length) return;
    
    const currentPage = pages[pages.length - 1];
    if (!currentPage) return;
    
    const { route, options = {} } = currentPage;
    if (!route) return;
    
    const fullPath = route + (Object.keys(options).length ? ('?' + 
      Object.keys(options)
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(options[key])}`)
        .join('&')
    ) : '');
    
    // 更新当前路由信息
    Object.assign(routerInstance.currentRoute, createRouteLocation(fullPath, options));
  });
} 