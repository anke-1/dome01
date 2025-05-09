import React from 'react';
import { Container, Typography, Grid, Card, CardContent, CardMedia, Button, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const featuredCourses = [
  {
    id: 1,
    title: 'Java 编程基础',
    description: '学习 Java 编程语言的基础知识和核心概念',
    instructor: '张老师',
    price: 199,
    thumbnail: 'https://via.placeholder.com/300x200',
  },
  {
    id: 2,
    title: 'Spring Boot 实战',
    description: '使用 Spring Boot 构建企业级应用',
    instructor: '李老师',
    price: 299,
    thumbnail: 'https://via.placeholder.com/300x200',
  },
  {
    id: 3,
    title: 'React 前端开发',
    description: '使用 React 构建现代化的用户界面',
    instructor: '王老师',
    price: 249,
    thumbnail: 'https://via.placeholder.com/300x200',
  },
];

const categories = [
  { name: '编程开发', icon: '💻' },
  { name: '数据科学', icon: '📊' },
  { name: '人工智能', icon: '🤖' },
  { name: '网络安全', icon: '🔒' },
  { name: '云计算', icon: '☁️' },
  { name: '移动开发', icon: '📱' },
];

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: theme.shadows[4],
  },
}));

const Home: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 欢迎区域 */}
      <Box sx={{ textAlign: 'center', mb: 6 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          欢迎来到在线教育平台
        </Typography>
        <Typography variant="h5" color="text.secondary" paragraph>
          发现优质课程，开启学习之旅
        </Typography>
        <Button variant="contained" color="primary" size="large" sx={{ mt: 2 }}>
          开始学习
        </Button>
      </Box>

      {/* 精选课程 */}
      <Typography variant="h4" component="h2" gutterBottom>
        精选课程
      </Typography>
      <Grid container spacing={4}>
        {featuredCourses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h3">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  {course.description}
                </Typography>
                <Typography variant="subtitle1" color="primary">
                  ¥{course.price}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  讲师：{course.instructor}
                </Typography>
              </CardContent>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      {/* 课程分类 */}
      <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
        课程分类
      </Typography>
      <Grid container spacing={2}>
        {categories.map((category) => (
          <Grid item xs={6} sm={4} md={2} key={category.name}>
            <Card
              sx={{
                cursor: 'pointer',
                textAlign: 'center',
                p: 2,
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Typography variant="h3" component="div" gutterBottom>
                {category.icon}
              </Typography>
              <Typography variant="subtitle1">{category.name}</Typography>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Home; 