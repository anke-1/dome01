import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { courseApi } from '../../services/api';

interface Course {
  id: number;
  title: string;
  description: string;
  instructor: string;
  price: number;
  category: string;
  level: string;
  thumbnailUrl?: string;
  createdAt: string;
  updatedAt: string;
}

interface CourseState {
  courses: Course[];
  currentCourse: Course | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

export const fetchCourses = createAsyncThunk('courses/fetchAll', async () => {
  const response = await courseApi.getAllCourses();
  return response.data;
});

export const fetchCourseById = createAsyncThunk(
  'courses/fetchById',
  async (id: number) => {
    const response = await courseApi.getCourseById(id);
    return response.data;
  }
);

export const fetchCoursesByCategory = createAsyncThunk(
  'courses/fetchByCategory',
  async (category: string) => {
    const response = await courseApi.getCoursesByCategory(category);
    return response.data;
  }
);

export const createCourse = createAsyncThunk(
  'courses/create',
  async (courseData: Partial<Course>) => {
    const response = await courseApi.createCourse(courseData);
    return response.data;
  }
);

export const updateCourse = createAsyncThunk(
  'courses/update',
  async ({ id, courseData }: { id: number; courseData: Partial<Course> }) => {
    const response = await courseApi.updateCourse(id, courseData);
    return response.data;
  }
);

export const deleteCourse = createAsyncThunk(
  'courses/delete',
  async (id: number) => {
    await courseApi.deleteCourse(id);
    return id;
  }
);

const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCurrentCourse: (state) => {
      state.currentCourse = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Courses
      .addCase(fetchCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses';
      })
      // Fetch Course by ID
      .addCase(fetchCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(fetchCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch course';
      })
      // Fetch Courses by Category
      .addCase(fetchCoursesByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCoursesByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(fetchCoursesByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch courses by category';
      })
      // Create Course
      .addCase(createCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses.push(action.payload);
      })
      .addCase(createCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to create course';
      })
      // Update Course
      .addCase(updateCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateCourse.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.courses.findIndex((course) => course.id === action.payload.id);
        if (index !== -1) {
          state.courses[index] = action.payload;
        }
        if (state.currentCourse?.id === action.payload.id) {
          state.currentCourse = action.payload;
        }
      })
      .addCase(updateCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update course';
      })
      // Delete Course
      .addCase(deleteCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = state.courses.filter((course) => course.id !== action.payload);
        if (state.currentCourse?.id === action.payload) {
          state.currentCourse = null;
        }
      })
      .addCase(deleteCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to delete course';
      });
  },
});

export const { clearCurrentCourse, clearError } = courseSlice.actions;
export default courseSlice.reducer; 