# 在线教育平台

一个基于 Spring Boot 和 React 构建的综合性在线教育平台，具有课程管理、视频课程和用户进度跟踪功能。

## 功能特点

- 用户管理（注册、登录、个人资料）
- 课程管理（创建、编辑、删除）
- 章节和课程组织
- 视频课程与进度跟踪
- 资源管理（PDF、DOC等）
- 课程报名与进度跟踪
- 响应式 Material-UI 前端界面
- JWT 安全认证
- OSS 文件存储
- RabbitMQ 消息队列
- Redis 缓存

## 技术栈

### 后端
- Spring Boot 2.7.x
- Spring Security
- Spring Data JPA
- MySQL 8.0
- Redis
- RabbitMQ
- OSS（对象存储服务）
- JWT 认证

### 前端
- React 18
- TypeScript
- Material-UI
- Redux Toolkit
- React Router
- Axios

## 环境要求

- JDK 17 或更高版本
- Node.js 16 或更高版本
- MySQL 8.0
- Redis 6.0
- RabbitMQ 3.8
- Maven 3.6 或更高版本
- Docker 和 Docker Compose（用于容器化部署）

## 项目结构

```
├── src/                    # Spring Boot 后端源码
│   ├── main/
│   │   ├── java/
│   │   └── resources/
│   └── test/
├── frontend/              # React 前端
│   ├── src/
│   └── package.json
└── docker/               # Docker 配置文件
    ├── docker-compose.yml
    └── Dockerfile
```

## 安装和运行

### 本地开发

1. 克隆仓库：
```bash
git clone <仓库地址>
cd online-education-platform
```

2. 后端设置：
```bash
mvn clean install
mvn spring-boot:run
```

3. 前端设置：
```bash
cd frontend
npm install
npm start
```

应用将在以下地址可用：
- 前端：http://localhost:3000
- 后端API：http://localhost:8080

### Docker 部署

1. 使用 Docker Compose 构建和运行：
```bash
docker-compose up -d
```

2. 访问应用：
- 前端：http://localhost:3000
- 后端API：http://localhost:8080

## 默认管理员账户

部署后会自动创建管理员账户：
- 用户名：admin
- 密码：admin

**重要提示**：首次登录后请立即修改管理员密码。

## API 文档

API 文档可在以下地址访问：
- Swagger UI：http://localhost:8080/swagger-ui.html
- OpenAPI JSON：http://localhost:8080/v3/api-docs

## 环境变量

### 后端 (.env)
```
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/dome
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=123456
SPRING_REDIS_HOST=localhost
SPRING_REDIS_PORT=6379
SPRING_REDIS_PASSWORD=123456
SPRING_RABBITMQ_HOST=localhost
SPRING_RABBITMQ_PORT=5672
SPRING_RABBITMQ_USERNAME=guest
SPRING_RABBITMQ_PASSWORD=guest
OSS_ENDPOINT=your-oss-endpoint
OSS_ACCESS_KEY=your-access-key
OSS_SECRET_KEY=your-secret-key
OSS_BUCKET_NAME=your-bucket-name
```

### 前端 (.env)
```
REACT_APP_API_URL=http://localhost:8080/api
```

## Kubernetes 部署

1. 创建命名空间：
```bash
kubectl create namespace education-platform
```

2. 应用配置：
```bash
kubectl apply -f k8s/namespace.yaml
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

3. 访问应用：
- 前端：http://<集群IP>:30000
- 后端API：http://<集群IP>:30001

## 监控和日志

- 应用日志：`kubectl logs -f deployment/backend -n education-platform`
- 前端日志：`kubectl logs -f deployment/frontend -n education-platform`
- Redis日志：`kubectl logs -f deployment/redis -n education-platform`
- RabbitMQ日志：`kubectl logs -f deployment/rabbitmq -n education-platform`

## 安全注意事项

1. 修改默认管理员凭据
2. 在生产环境中使用 HTTPS
3. 配置适当的 CORS 设置
4. 实现速率限制
5. 定期安全更新
6. 数据库备份策略

## 贡献指南

1. Fork 本仓库
2. 创建特性分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

本项目采用 MIT 许可证 - 详见 LICENSE 文件。

# 教育平台应用部署指南

本文档提供了教育平台应用的详细部署和运行说明。

## 系统要求

- Kubernetes 集群
- Docker
- kubectl 命令行工具
- 访问外部服务的网络权限

## 外部服务配置

应用依赖以下外部服务：

### MySQL
- 主机：117.73.12.78
- 端口：30006
- 用户名：root
- 密码：root123
- 数据库：dome

### Redis
- 主机：117.73.12.78
- 端口：30379
- 密码：redis

### RabbitMQ
- 主机：117.73.12.78
- 端口：31844
- 用户名：rabbitmq
- 密码：rabbitmq

### 对象存储 (OSS)
- 端点：oss-innet.cn-north-3.inspurcloudoss.com
- 桶名：dome01
- Access Key：YjA3ZTZlYTEtYmM3Ny00NTNjLWIyOGQtZTg1ZmUyNGE3ZGE2
- Secret Key：Njg5NjJjZTItNmY3NC00MmI2LWI5YzAtMjA0YmYxYjAyNTMz

## 部署步骤

### 1. 准备 Docker 镜像

#### 构建后端镜像
```bash
# 在项目根目录执行
docker build -t your-registry.com/education-platform-backend:latest -f Dockerfile.backend .
```

#### 构建前端镜像
```bash
# 进入前端目录
cd frontend
docker build -t your-registry.com/education-platform-frontend:latest .
```

### 2. 推送镜像到仓库

```bash
# 推送后端镜像
docker push your-registry.com/education-platform-backend:latest

# 推送前端镜像
docker push your-registry.com/education-platform-frontend:latest
```

### 3. 创建 Kubernetes 命名空间

```bash
kubectl create namespace education-platform
```

### 4. 部署应用

```bash
# 部署后端服务
kubectl apply -f k8s/backend-deployment.yaml

# 部署前端服务
kubectl apply -f k8s/frontend-deployment.yaml

# 部署 Ingress
kubectl apply -f k8s/ingress.yaml
```

### 5. 验证部署

```bash
# 检查 Pod 状态
kubectl get pods -n education-platform

# 检查服务状态
kubectl get services -n education-platform

# 检查 Ingress 状态
kubectl get ingress -n education-platform
```

## 配置说明

### 后端配置
- 使用 Spring Boot 2.x
- JDK 版本：17
- 主要依赖：
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - Spring Redis
  - Spring AMQP (RabbitMQ)
  - MySQL Connector
  - Lombok

### 前端配置
- 使用 React
- 使用 Nginx 作为 Web 服务器
- 配置了静态资源缓存和 gzip 压缩

## 访问应用

应用将通过 Ingress 暴露，访问地址为：`https://your-domain.com`

- 前端页面：`https://your-domain.com`
- 后端 API：`https://your-domain.com/api`

## 监控和维护

### 健康检查
- 后端健康检查端点：`/actuator/health`
- 前端健康检查端点：`/`

### 日志查看
```bash
# 查看后端日志
kubectl logs -f deployment/backend -n education-platform

# 查看前端日志
kubectl logs -f deployment/frontend -n education-platform
```

### 扩缩容
```bash
# 扩展后端实例
kubectl scale deployment backend -n education-platform --replicas=3

# 扩展前端实例
kubectl scale deployment frontend -n education-platform --replicas=3
```

## 故障排除

1. 如果 Pod 无法启动，检查：
   - 外部服务连接是否正常
   - 环境变量配置是否正确
   - 镜像是否正确构建和推送

2. 如果服务无法访问，检查：
   - Ingress 配置是否正确
   - 服务是否正常运行
   - 网络策略是否允许必要流量

3. 如果应用功能异常，检查：
   - 外部服务连接状态
   - 应用日志
   - 配置参数是否正确

## 注意事项

1. 确保 Kubernetes 集群可以访问所有外部服务
2. 定期备份数据库
3. 监控应用资源使用情况
4. 及时更新安全补丁
5. 保护好敏感配置信息 