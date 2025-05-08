# Spring Boot Demo Project

这是一个集成了MySQL、Redis、RabbitMQ和浪潮云OSS的Spring Boot示例项目。

## 技术栈

- Spring Boot 2.7.0
- MySQL 8.0
- Redis
- RabbitMQ
- 浪潮云OSS
- Kubernetes

## 本地开发环境要求

- JDK 17
- Maven 3.6+
- Docker
- Kubernetes集群

## 本地开发步骤

1. 克隆项目
```bash
git clone <repository-url>
cd demo
```

2. 配置数据库
- MySQL配置：
  - Host: 117.73.12.78
  - Port: 30006
  - Database: dome
  - Username: root
  - Password: root123

3. 配置Redis
- Redis配置：
  - Host: 117.73.12.78
  - Port: 30379
  - Password: redis

4. 配置RabbitMQ
- RabbitMQ配置：
  - Host: 117.73.12.78
  - Port: 31844
  - Username: rabbitmq
  - Password: rabbitmq

5. 配置浪潮云OSS
- Endpoint: oss-innet.cn-north-3.inspurcloudoss.com
- Bucket: dome01
- AccessKey和SecretKey已在配置文件中设置

6. 运行项目
```bash
mvn spring-boot:run
```

## Kubernetes部署步骤

1. 构建Docker镜像
```bash
mvn clean package
docker build -t demo-app:latest .
```

2. 创建Kubernetes资源
```bash
kubectl apply -f k8s/configmap.yaml
kubectl apply -f k8s/secret.yaml
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
```

3. 验证部署
```bash
kubectl get pods
kubectl get services
```

## API接口

### 用户管理
- POST /api/users - 创建用户
- GET /api/users/{id} - 获取用户
- GET /api/users/username/{username} - 根据用户名获取用户
- GET /api/users - 获取所有用户
- PUT /api/users/{id} - 更新用户
- DELETE /api/users/{id} - 删除用户

## 注意事项

1. 确保所有依赖服务（MySQL、Redis、RabbitMQ）都已正确配置和运行
2. 在生产环境中，请修改默认的密码和密钥
3. 根据实际需求调整Kubernetes配置中的资源限制
4. 确保浪潮云OSS的配置正确且有适当的访问权限 