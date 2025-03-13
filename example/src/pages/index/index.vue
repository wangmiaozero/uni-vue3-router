<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    
    <view class="card">
      <text class="card-title">路由库演示</text>
      <text class="card-desc">uni-vue3-router提供类似Vue Router的API和使用方式</text>
    </view>
    
    <view class="buttons">
      <button type="primary" @click="navigateToRouterDemo">路由方法演示</button>
      <button type="primary" @click="navigateToGuards">路由守卫演示</button>
      <button type="primary" @click="navigateToComposition">组合式API演示</button>
      <button type="default" @click="navigateToDetail">前往详情页</button>
      <button type="default" @click="navigateToUser">前往用户页</button>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'uni-vue3-router';

export default {
  setup() {
    const title = ref('uni-vue3-router示例');
    const router = useRouter();
    
    function navigateToRouterDemo() {
      router.push('/pages/router-demo/index');
    }
    
    function navigateToGuards() {
      router.push('/pages/guards/index');
    }
    
    function navigateToComposition() {
      router.push('/pages/composition/index');
    }
    
    function navigateToDetail() {
      router.push({
        path: '/pages/detail/index',
        query: {
          id: '123',
          from: 'home'
        }
      });
    }
    
    function navigateToUser() {
      router.pushTab('/pages/user/index');
    }
    
    return {
      title,
      navigateToRouterDemo,
      navigateToGuards,
      navigateToComposition,
      navigateToDetail,
      navigateToUser
    };
  }
}
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
}

.logo {
  height: 200rpx;
  width: 200rpx;
  margin-top: 100rpx;
  margin-bottom: 30rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.title {
  font-size: 36rpx;
  color: #333;
  font-weight: bold;
}

.card {
  width: 100%;
  background-color: #f8f8f8;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 30px;
}

.card-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
}

.card-desc {
  font-size: 14px;
  color: #666;
}

.buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 15px;
}
</style> 