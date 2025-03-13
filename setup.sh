#!/bin/bash

# 打印彩色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== 开始安装 uni-vue3-router ===${NC}"

# 清理旧的依赖和缓存
echo "正在清理旧的依赖和缓存..."
rm -rf node_modules
rm -rf example/node_modules
rm -rf example/dist example/unpackage
rm -rf dist

# 安装根目录依赖
echo -e "${YELLOW}安装主包依赖...${NC}"
pnpm install || { echo -e "${RED}主包依赖安装失败${NC}" ; exit 1; }

# 构建库
echo -e "${YELLOW}构建库...${NC}"
pnpm run build || { echo -e "${RED}构建失败${NC}" ; exit 1; }

# 安装示例项目依赖
echo -e "${YELLOW}安装示例项目依赖...${NC}"
cd example || { echo -e "${RED}无法进入example目录${NC}" ; exit 1; }
pnpm install || { 
  echo -e "${YELLOW}标准安装失败，尝试使用@vue3标签安装uni-app依赖...${NC}"
  pnpm install "@dcloudio/uni-cli-shared@vue3" "@dcloudio/uni-app@vue3" "@dcloudio/uni-h5@vue3" "@dcloudio/vite-plugin-uni@vue3" "@dcloudio/uni-stacktracey@vue3" "@dcloudio/uni-automator@vue3" --force
}

# 修复可能的执行权限问题
if [[ "$OSTYPE" == "darwin"* ]] || [[ "$OSTYPE" == "linux"* ]]; then
  echo -e "${YELLOW}修复可能的执行权限问题...${NC}"
  chmod +x node_modules/.bin/uni || echo -e "${YELLOW}uni脚本不存在或已有执行权限${NC}"
fi

echo -e "${GREEN}=== 安装完成 ===${NC}"
echo -e "${YELLOW}可以通过以下命令启动示例项目:${NC}"
echo -e "${GREEN}cd example${NC}"
echo -e "${GREEN}pnpm run dev:h5${NC}" 