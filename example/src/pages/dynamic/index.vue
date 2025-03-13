<template>
  <view class="container">
    <view class="header">
      <text class="title">动态路由页面</text>
    </view>
    
    <view class="section">
      <text class="section-title">动态添加的路由</text>
      <view class="description">
        <text>这个页面是通过router.addRoute动态添加的</text>
      </view>
      <view class="code-block">
        <text>{{ JSON.stringify(route, null, 2) }}</text>
      </view>
    </view>
    
    <view class="button-group">
      <button type="default" @click="goBack">返回</button>
    </view>
  </view>
</template>

<script>
import { useRouter, useRoute } from 'uni-vue3-router';

export default {
  setup() {
    const router = useRouter();
    const route = useRoute();
    
    function goBack() {
      router.back();
    }
    
    return {
      route,
      goBack
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
  margin-top: 30px;
}
</style> 