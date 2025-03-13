import { createSSRApp } from 'vue';
import App from './App.vue';
import router from './router';
console.log('router', router);
export function createApp() {
  const app = createSSRApp(App);
  
  // 路由挂载
  app.use({
    install(app) {
      app.config.globalProperties.$router = router;
    }
  });
  
  // 处理页面显示事件
  const appOptions = {
    onPageShow() {
      uni.$emit('page-show');
    }
  };
  
  return {
    app,
    ...appOptions
  };
} 