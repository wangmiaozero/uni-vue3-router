<template>
  <view class="container">
    <view class="header">
      <text class="title">路由方法演示</text>
    </view>
    
    <view class="section">
      <text class="section-title">当前路由信息</text>
      <view class="code-block">
        <text>{{ JSON.stringify(currentRoute, null, 2) }}</text>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">路由锁定状态</text>
      <view class="status">
        <text>{{ lockStatus ? '已锁定' : '未锁定' }}</text>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">导航方法</text>
      <view class="button-group">
        <button type="primary" @click="navigateTo">router.push</button>
        <button type="primary" @click="navigateTab">router.pushTab</button>
        <button type="primary" @click="replacePage">router.replace</button>
        <button type="primary" @click="replaceAllPages">router.replaceAll</button>
        <button type="primary" @click="goBack">router.back</button>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">路由管理</text>
      <view class="button-group">
        <button type="default" @click="checkReady">router.isReady</button>
        <button type="default" @click="addNewRoute">router.addRoute</button>
        <button type="default" @click="removeExistingRoute">router.removeRoute</button>
      </view>
    </view>
    
    <view class="section">
      <text class="section-title">动态路由</text>
      <view class="button-group">
        <button type="warn" @click="navigateToDynamic">访问动态添加的路由</button>
      </view>
    </view>
  </view>
</template>

<script>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'uni-vue3-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    
    // 当前路由信息
    const currentRoute = reactive({...route});
    
    // 路由锁定状态
    const lockStatus = ref(router.$lockStatus);
    
    // 监听路由变化
    onMounted(() => {
      console.log('路由演示页面已挂载');
      console.log('当前路由:', router.currentRoute);
    });
    
    // 导航方法
    function navigateTo() {
      router.push({
        path: '/pages/detail/index',
        query: {
          id: Date.now(),
          from: 'router-demo'
        }
      });
    }
    
    function navigateTab() {
      router.pushTab('/pages/user/index');
    }
    
    function replacePage() {
      router.replace({
        path: '/pages/detail/index',
        query: {
          id: Date.now(),
          replaced: true
        }
      });
    }
    
    function replaceAllPages() {
      router.replaceAll('/pages/index/index');
    }
    
    function goBack() {
      router.back();
    }
    
    // 路由管理方法
    function checkReady() {
      const ready = router.isReady();
      uni.showToast({
        title: ready ? '路由已就绪' : '路由未就绪',
        icon: 'none'
      });
    }
    
    function addNewRoute() {
      try {
        router.addRoute({
          path: '/pages/temp/index',
          name: 'temp',
          meta: { addedManually: true }
        });
        uni.showToast({
          title: '路由已添加',
          icon: 'success'
        });
      } catch (err) {
        uni.showToast({
          title: '添加路由失败: ' + err.message,
          icon: 'none'
        });
      }
    }
    
    function removeExistingRoute() {
      try {
        router.removeRoute('temp');
        uni.showToast({
          title: '路由已移除',
          icon: 'success'
        });
      } catch (err) {
        uni.showToast({
          title: '移除路由失败: ' + err.message,
          icon: 'none'
        });
      }
    }
    
    function navigateToDynamic() {
      router.push('/pages/dynamic/index').catch(err => {
        uni.showToast({
          title: '导航失败: ' + err.message,
          icon: 'none'
        });
      });
    }
    
    return {
      currentRoute,
      lockStatus,
      navigateTo,
      navigateTab,
      replacePage,
      replaceAllPages,
      goBack,
      checkReady,
      addNewRoute,
      removeExistingRoute,
      navigateToDynamic
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
}

button {
  margin-bottom: 0 !important;
}
</style> 