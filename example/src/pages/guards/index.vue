<template>
  <view class="container">
    <view class="header">
      <text class="title">路由守卫演示</text>
    </view>
    
    <view class="section">
      <text class="section-title">全局守卫</text>
      <view class="description">
        <text>全局守卫在router.js中配置，包括：</text>
        <view class="list">
          <text>• beforeEach - 全局前置守卫</text>
          <text>• beforeResolve - 全局解析守卫</text>
          <text>• afterEach - 全局后置钩子</text>
        </view>
      </view>
      <view class="button-group">
        <button type="primary" @click="navigateToAuth">访问需要登录的页面</button>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">组件内守卫</text>
      <view class="description">
        <text>当前页面已配置以下守卫：</text>
        <view class="list">
          <text>• onBeforeRouteLeave - 离开守卫</text>
          <text>• onBeforeRouteUpdate - 更新守卫</text>
        </view>
      </view>
      <view class="button-group">
        <button type="primary" @click="updateQuery">更新当前路由参数</button>
        <button type="default" @click="navigateAway">尝试离开页面</button>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">当前路由信息</text>
      <view class="code-block">
        <text>{{ JSON.stringify(currentRoute, null, 2) }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { reactive } from 'vue';
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'uni-vue3-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    
    // 当前路由信息
    const currentRoute = reactive({...route});
    
    // 路由离开守卫
    onBeforeRouteLeave((to, from, next) => {
      uni.showModal({
        title: '确认离开',
        content: '你确定要离开当前页面吗？',
        success: (res) => {
          if (res.confirm) {
            next();
          } else {
            next(false);
          }
        }
      });
    });
    
    // 路由更新守卫
    onBeforeRouteUpdate((to, from, next) => {
      console.log('路由更新', to, from);
      uni.showToast({
        title: '路由参数已更新',
        icon: 'none'
      });
      
      // 更新当前显示的路由信息
      Object.assign(currentRoute, to);
      
      next();
    });
    
    // 导航到需要登录的页面
    function navigateToAuth() {
      router.push('/pages/user/index');
    }
    
    // 更新当前路由参数
    function updateQuery() {
      router.push({
        path: route.path,
        query: {
          ...route.query,
          timestamp: Date.now()
        }
      });
    }
    
    // 尝试离开页面
    function navigateAway() {
      router.push('/pages/index/index');
    }
    
    return {
      currentRoute,
      navigateToAuth,
      updateQuery,
      navigateAway
    };
  }
};
</script>

<style>
.container {
  padding: 20px;
}

.header {
  margin-bottom: 30px;
  text-align: center;
}

.title {
  font-size: 20px;
  font-weight: bold;
}

.section {
  margin-bottom: 30px;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 15px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
  display: block;
}

.description {
  margin-bottom: 15px;
}

.list {
  margin: 10px 0;
  padding-left: 10px;
}

.list text {
  display: block;
  margin-bottom: 5px;
}

.code-block {
  background-color: #333;
  color: #fff;
  padding: 10px;
  border-radius: 5px;
  font-family: monospace;
  font-size: 12px;
  white-space: pre-wrap;
  word-break: break-all;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 15px;
}

button {
  margin-bottom: 0 !important;
}
</style> 