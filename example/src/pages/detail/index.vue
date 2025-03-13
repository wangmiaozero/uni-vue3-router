<template>
  <view class="content">
    <view class="text-area">
      <text class="title">详情页</text>
    </view>
    <view class="query">
      <text>参数: {{params}}</text>
    </view>
    <button type="default" @click="back">返回</button>
  </view>
</template>

<script>
import { ref } from 'vue';
import { onLoad } from '@dcloudio/uni-app';

export default {
  setup() {
    const params = ref('');
    
    onLoad((option) => {
      params.value = JSON.stringify(option);
    });
    
    function back() {
      uni.navigateBack();
    }
    
    return {
      params,
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

.query {
  background-color: #f5f5f5;
  padding: 15px;
  border-radius: 5px;
  margin-bottom: 30px;
  width: 100%;
}
</style> 