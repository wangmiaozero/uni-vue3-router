/**
 * 判断是否为绝对路径
 * @param {String} path 路径
 * @returns {Boolean} 是否为绝对路径
 */
export function isToAbsolutePath(path) {
  return typeof path === 'string' && path.charAt(0) === '/';
}

/**
 * 创建基本路由位置对象
 * @param {String} fullPath 完整路径
 * @param {Object} query 查询参数对象
 * @returns {Object} 路由位置对象
 */
export function createRouteLocation(fullPath, query = {}) {
  const [path, queryString = ''] = String(fullPath).split('?');
  const params = {};
  
  // 解析查询字符串为对象
  if (queryString) {
    queryString.split('&').forEach(item => {
      const [key, value] = item.split('=');
      if (key) {
        params[decodeURIComponent(key)] = decodeURIComponent(value || '');
      }
    });
  }
  
  // 合并传入的查询参数
  Object.assign(params, query);
  
  return {
    path,
    fullPath,
    params,
    query: params,
    name: '',
    meta: {},
    hash: '',
  };
}

/**
 * 创建原始路由位置对象
 * @param {String|Object} to 目标路由参数
 * @returns {Object} 原始路由位置对象
 */
export function createRouteLocationRaw(to) {
  // 如果是字符串，处理成对象
  if (typeof to === 'string') {
    // 处理绝对路径
    const url = isToAbsolutePath(to) ? to : `/${to}`;
    return { url };
  }
  
  // 如果是对象，处理成合适的格式
  if (typeof to === 'object') {
    const query = to.query || to.params || {};
    let path = to.path || to.url || '';
    
    // 确保路径以/开头
    if (!isToAbsolutePath(path)) {
      path = `/${path}`;
    }
    
    // 构建查询字符串
    const queryKeys = Object.keys(query);
    let queryString = '';
    
    if (queryKeys.length) {
      queryString = '?' + queryKeys
        .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(query[key])}`)
        .join('&');
    }
    
    // 返回最终URL和其他参数
    return {
      url: path + queryString,
      events: to.events || {}
    };
  }
  
  return { url: '/' };
}

/**
 * 合并对象
 * @param {Object} target 目标对象
 * @param {Object} source 源对象
 * @returns {Object} 合并后的对象
 */
export function mergeObject(target, source) {
  return Object.assign({}, target, source);
}

/**
 * 提取路由参数
 * @param {String} url URL字符串
 * @returns {Object} 参数对象
 */
export function extractParams(url) {
  const [, queryStr] = url.split('?');
  if (!queryStr) return {};
  
  const params = {};
  queryStr.split('&').forEach(item => {
    const [key, value] = item.split('=');
    if (key) {
      params[decodeURIComponent(key)] = decodeURIComponent(value || '');
    }
  });
  
  return params;
} 