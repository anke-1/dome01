import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Course related API calls
export const courseApi = {
  getAllCourses: () => api.get('/courses'),
  getCourseById: (id: number) => api.get(`/courses/${id}`),
  getCoursesByCategory: (category: string) => api.get(`/courses?category=${category}`),
  createCourse: (courseData: any) => api.post('/courses', courseData),
  updateCourse: (id: number, courseData: any) => api.put(`/courses/${id}`, courseData),
  deleteCourse: (id: number) => api.delete(`/courses/${id}`),
};

// User related API calls
export const userApi = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/auth/login', credentials),
  register: (userData: any) => api.post('/auth/register', userData),
  getCurrentUser: () => api.get('/users/me'),
  updateProfile: (userData: any) => api.put('/users/me', userData),
};

// Enrollment related API calls
export const enrollmentApi = {
  enrollInCourse: (courseId: number) => api.post(`/enrollments/${courseId}`),
  getEnrollments: () => api.get('/enrollments'),
  getEnrollmentById: (id: number) => api.get(`/enrollments/${id}`),
  updateProgress: (id: number, progress: number) =>
    api.put(`/enrollments/${id}/progress`, { progress }),
};

// Resource related API calls
export const resourceApi = {
  uploadResource: (lessonId: number, file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    return api.post(`/lessons/${lessonId}/resources`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
  },
  getResources: (lessonId: number) => api.get(`/lessons/${lessonId}/resources`),
  deleteResource: (resourceId: number) => api.delete(`/resources/${resourceId}`),
};

export default api; 