<template>
  <view class="container">
    <view class="header">
      <text class="title">组合式API演示</text>
    </view>
    
    <view class="section">
      <text class="section-title">useRouter</text>
      <view class="description">
        <text>useRouter() 返回路由器实例，可以用来执行导航操作</text>
      </view>
      <view class="button-group">
        <button type="primary" @click="navigateWithRouter">使用router导航</button>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">useRoute</text>
      <view class="description">
        <text>useRoute() 返回当前路由对象，包含路径、参数等信息</text>
      </view>
      <view class="code-block">
        <text>{{ JSON.stringify(route, null, 2) }}</text>
      </view>
      <view class="button-group">
        <button type="primary" @click="addQueryParam">添加查询参数</button>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">路由守卫钩子</text>
      <view class="description">
        <text>组合式API提供了以下路由守卫钩子：</text>
        <view class="list">
          <text>• onBeforeRouteLeave - 在离开页面前调用</text>
          <text>• onBeforeRouteUpdate - 在路由更新时调用</text>
        </view>
      </view>
      <view class="status">
        <text>状态: {{ guardStatus }}</text>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">路由监听</text>
      <view class="description">
        <text>可以使用watch监听路由变化</text>
      </view>
      <view class="status">
        <text>路由变化次数: {{ routeChangeCount }}</text>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, watch } from 'vue';
import { useRouter, useRoute, onBeforeRouteLeave, onBeforeRouteUpdate } from 'uni-vue3-router';

export default {
  setup() {
    // 使用组合式API获取路由器实例和当前路由
    const router = useRouter();
    const route = useRoute();
    
    // 状态
    const guardStatus = ref('等待触发守卫');
    const routeChangeCount = ref(0);
    
    // 使用router导航
    function navigateWithRouter() {
      router.push({
        path: '/pages/detail/index',
        query: {
          id: Date.now(),
          from: 'composition'
        }
      });
    }
    
    // 添加查询参数
    function addQueryParam() {
      router.push({
        path: route.path,
        query: {
          ...route.query,
          time: Date.now()
        }
      });
    }
    
    // 路由离开守卫
    onBeforeRouteLeave((to, from, next) => {
      guardStatus.value = '触发了离开守卫';
      next();
    });
    
    // 路由更新守卫
    onBeforeRouteUpdate((to, from, next) => {
      guardStatus.value = '触发了更新守卫';
      next();
    });
    
    // 监听路由变化
    watch(route, (newRoute, oldRoute) => {
      console.log('路由变化', newRoute, oldRoute);
      routeChangeCount.value++;
    }, { deep: true });
    
    return {
      router,
      route,
      guardStatus,
      routeChangeCount,
      navigateWithRouter,
      addQueryParam
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
  margin-bottom: 15px;
}

.status {
  background-color: #e6f7ff;
  padding: 10px;
  border-radius: 5px;
  border-left: 4px solid #1890ff;
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