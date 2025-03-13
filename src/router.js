import { reactive, ref } from 'vue';
import { addInterceptors, removeInterceptors } from './interceptors';
import { createRouteLocationRaw, createRouteLocation, isToAbsolutePath } from './utils';

/**
 * uni-vue3-router 路由类
 * 基于uni.addInterceptor封装的Vue Router风格路由器
 */
class Router {
  constructor(options = {}) {
    // 路由表
    this.routes = options.routes || [];
    // 路由模式
    this.mode = options.mode || 'history';
    
    // 路由锁状态
    this.$lockStatus = ref(false);
    
    // 当前路由信息
    this.currentRoute = reactive(createRouteLocation('/'));
    
    // 导航守卫
    this.beforeEachGuards = [];
    this.beforeResolveGuards = [];
    this.afterEachGuards = [];
    this.errorHandlers = [];
    
    // 初始化拦截器
    this._setupInterceptors();
    
    // 初始化当前路由
    this._initCurrentRoute();
  }
  
  /**
   * 设置拦截器
   * @private
   */
  _setupInterceptors() {
    addInterceptors(this);
  }
  
  /**
   * 初始化当前路由信息
   * @private
   */
  _initCurrentRoute() {
    const pages = getCurrentPages();
    const currentPage = pages[pages.length - 1];
    
    if (currentPage) {
      const { route, options = {} } = currentPage;
      const fullPath = route + this._serializeQuery(options);
      Object.assign(this.currentRoute, createRouteLocation(fullPath, options));
    }
  }
  
  /**
   * 序列化查询参数
   * @param {Object} query 查询参数对象
   * @returns {String} 序列化后的查询字符串
   * @private
   */
  _serializeQuery(query = {}) {
    const keys = Object.keys(query);
    if (!keys.length) return '';
    
    const queryString = keys
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
      .join('&');
      
    return `?${queryString}`;
  }
  
  /**
   * 检查路由器是否准备就绪
   * @returns {Promise<void>}
   */
  isReady() {
    return Promise.resolve();
  }
  
  /**
   * 导航到指定页面
   * @param {String|Object} to 目标路由
   * @param {Object} options 导航选项
   * @returns {Promise<any>}
   */
  push(to, options = {}) {
    return new Promise((resolve, reject) => {
      const routeLocation = createRouteLocationRaw(to);
      const { url, events = {} } = routeLocation;
      
      if (this.$lockStatus.value) {
        return reject(new Error('导航被锁定'));
      }
      
      uni.navigateTo({
        url,
        events,
        animationType: options.animationType,
        animationDuration: options.animationDuration,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          this._handleError(err);
          reject(err);
        }
      });
    });
  }
  
  /**
   * 导航到指定Tab页面
   * @param {String|Object} to 目标路由
   * @returns {Promise<any>}
   */
  pushTab(to) {
    return new Promise((resolve, reject) => {
      const routeLocation = createRouteLocationRaw(to);
      const { url } = routeLocation;
      
      if (this.$lockStatus.value) {
        return reject(new Error('导航被锁定'));
      }
      
      uni.switchTab({
        url,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          this._handleError(err);
          reject(err);
        }
      });
    });
  }
  
  /**
   * 替换当前页面
   * @param {String|Object} to 目标路由
   * @returns {Promise<any>}
   */
  replace(to) {
    return new Promise((resolve, reject) => {
      const routeLocation = createRouteLocationRaw(to);
      const { url } = routeLocation;
      
      if (this.$lockStatus.value) {
        return reject(new Error('导航被锁定'));
      }
      
      uni.redirectTo({
        url,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          this._handleError(err);
          reject(err);
        }
      });
    });
  }
  
  /**
   * 关闭所有页面，打开到应用内的某个页面
   * @param {String|Object} to 目标路由
   * @returns {Promise<any>}
   */
  replaceAll(to) {
    return new Promise((resolve, reject) => {
      const routeLocation = createRouteLocationRaw(to);
      const { url } = routeLocation;
      
      if (this.$lockStatus.value) {
        return reject(new Error('导航被锁定'));
      }
      
      uni.reLaunch({
        url,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          this._handleError(err);
          reject(err);
        }
      });
    });
  }
  
  /**
   * 返回上一页面或多级页面
   * @param {Number|Object} options 返回的页面数或配置对象
   * @returns {Promise<any>}
   */
  back(options = {}) {
    return new Promise((resolve, reject) => {
      let delta = 1;
      let animationType;
      let animationDuration;
      
      if (typeof options === 'number') {
        delta = options;
      } else {
        delta = options.delta || 1;
        animationType = options.animationType;
        animationDuration = options.animationDuration;
      }
      
      if (this.$lockStatus.value) {
        return reject(new Error('导航被锁定'));
      }
      
      uni.navigateBack({
        delta,
        animationType,
        animationDuration,
        success: (res) => {
          resolve(res);
        },
        fail: (err) => {
          this._handleError(err);
          reject(err);
        }
      });
    });
  }
  
  /**
   * 添加导航前置守卫
   * @param {Function} guard 守卫函数
   * @returns {Function} 移除守卫的函数
   */
  beforeEach(guard) {
    this.beforeEachGuards.push(guard);
    
    return () => {
      const index = this.beforeEachGuards.indexOf(guard);
      if (index !== -1) {
        this.beforeEachGuards.splice(index, 1);
      }
    };
  }
  
  /**
   * 添加导航解析守卫
   * @param {Function} guard 守卫函数
   * @returns {Function} 移除守卫的函数
   */
  beforeResolve(guard) {
    this.beforeResolveGuards.push(guard);
    
    return () => {
      const index = this.beforeResolveGuards.indexOf(guard);
      if (index !== -1) {
        this.beforeResolveGuards.splice(index, 1);
      }
    };
  }
  
  /**
   * 添加导航后置守卫
   * @param {Function} guard 守卫函数
   * @returns {Function} 移除守卫的函数
   */
  afterEach(guard) {
    this.afterEachGuards.push(guard);
    
    return () => {
      const index = this.afterEachGuards.indexOf(guard);
      if (index !== -1) {
        this.afterEachGuards.splice(index, 1);
      }
    };
  }
  
  /**
   * 添加错误处理器
   * @param {Function} handler 错误处理函数
   * @returns {Function} 移除处理器的函数
   */
  onError(handler) {
    this.errorHandlers.push(handler);
    
    return () => {
      const index = this.errorHandlers.indexOf(handler);
      if (index !== -1) {
        this.errorHandlers.splice(index, 1);
      }
    };
  }
  
  /**
   * 处理导航错误
   * @param {Error} error 错误对象
   * @private
   */
  _handleError(error) {
    this.errorHandlers.forEach(handler => {
      try {
        handler(error);
      } catch (err) {
        console.error('Error in onError handler:', err);
      }
    });
  }
  
  /**
   * 添加路由
   * @param {Object} route 路由配置
   */
  addRoute(route) {
    if (!route || typeof route !== 'object') {
      return;
    }
    
    this.routes.push(route);
  }
  
  /**
   * 删除路由
   * @param {String|Function} nameOrMatcher 路由名称或匹配函数
   */
  removeRoute(nameOrMatcher) {
    if (typeof nameOrMatcher === 'string') {
      const index = this.routes.findIndex(route => route.name === nameOrMatcher);
      if (index !== -1) {
        this.routes.splice(index, 1);
      }
    } else if (typeof nameOrMatcher === 'function') {
      const index = this.routes.findIndex(nameOrMatcher);
      if (index !== -1) {
        this.routes.splice(index, 1);
      }
    }
  }
}

export default Router; 