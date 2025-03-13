<template>
  <view class="content">
    <image class="logo" src="/static/logo.png"></image>
    <view class="text-area">
      <text class="title">{{title}}</text>
    </view>
    <view class="buttons">
      <button type="primary" @click="navigateToDetail">前往详情页</button>
      <button type="default" @click="navigateToUser">前往用户页</button>
    </view>
  </view>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const title = ref('Hello uni-vue3-router');
    
    function navigateToDetail() {
      uni.navigateTo({
        url: '/pages/detail/index?id=123'
      });
    }
    
    function navigateToUser() {
      uni.navigateTo({
        url: '/pages/user/index'
      });
    }
    
    return {
      title,
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
  margin-top: 200rpx;
  margin-bottom: 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
  margin-bottom: 50px;
}

.title {
  font-size: 36rpx;
  color: #333;
}

.buttons {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style> 