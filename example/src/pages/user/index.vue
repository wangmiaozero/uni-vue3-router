<template>
  <view class="content">
    <view class="text-area">
      <text class="title">用户页</text>
    </view>
    <button type="default" @click="back">返回</button>
  </view>
</template>

<script>
export default {
  setup() {
    function back() {
      uni.navigateBack();
    }
    
    return {
      back
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

.text-area {
  display: flex;
  justify-content: center;
  margin-bottom: 30px;
}

.title {
  font-size: 36rpx;
  color: #333;
}
</style> 