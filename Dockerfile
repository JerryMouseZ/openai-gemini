# 使用Node.js官方镜像作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制package.json文件
COPY package.json ./

# 安装依赖
RUN npm install --only=production

# 复制源代码
COPY . .

# 暴露端口
EXPOSE 3030

# 设置环境变量
ENV PORT=3030
ENV NODE_ENV=production

# 启动应用
CMD ["npm", "start"]
