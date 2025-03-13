import { createRouter } from 'uni-vue3-router';

// 创建路由实例
const router = createRouter({
  routes: [
    { 
      path: '/pages/index/index', 
      name: 'home',
      meta: { requiresAuth: false }
    },
    { 
      path: '/pages/detail/index', 
      name: 'detail',
      meta: { requiresAuth: false }
    },
    { 
      path: '/pages/user/index', 
      name: 'user',
      meta: { requiresAuth: true }
    },
    { 
      path: '/pages/router-demo/index', 
      name: 'router-demo',
      meta: { requiresAuth: false }
    },
    { 
      path: '/pages/guards/index', 
      name: 'guards',
      meta: { requiresAuth: false }
    },
    { 
      path: '/pages/composition/index', 
      name: 'composition',
      meta: { requiresAuth: false }
    }
  ]
});

// 全局前置守卫
router.beforeEach((to, from, next) => {
  console.log('全局前置守卫', to, from);
  
  // 模拟登录检查
  const isLoggedIn = !!uni.getStorageSync('token');
  
  if (to.meta.requiresAuth && !isLoggedIn) {
    uni.showToast({
      title: '请先登录',
      icon: 'none'
    });
    next('/pages/user/index');
  } else {
    next();
  }
});

// 全局解析守卫
router.beforeResolve((to, from, next) => {
  console.log('全局解析守卫', to, from);
  next();
});

// 全局后置钩子
router.afterEach((to, from) => {
  console.log('全局后置钩子', to, from);
});

// 错误处理
router.onError((err) => {
  console.error('路由错误', err);
  uni.showToast({
    title: '路由出错: ' + err.message,
    icon: 'none'
  });
});

// 动态添加路由示例
setTimeout(() => {
  router.addRoute({
    path: '/pages/dynamic/index',
    name: 'dynamic',
    meta: { dynamic: true }
  });
  console.log('动态路由已添加');
}, 2000);

export default router; 