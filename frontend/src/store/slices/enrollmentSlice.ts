import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { enrollmentApi } from '../../services/api';

interface Enrollment {
  id: number;
  userId: number;
  courseId: number;
  enrolledAt: string;
  lastAccessedAt: string;
  progress: number;
  completed: boolean;
  course: {
    id: number;
    title: string;
    thumbnailUrl?: string;
  };
}

interface EnrollmentState {
  enrollments: Enrollment[];
  currentEnrollment: Enrollment | null;
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  enrollments: [],
  currentEnrollment: null,
  loading: false,
  error: null,
};

export const fetchEnrollments = createAsyncThunk('enrollments/fetchAll', async () => {
  const response = await enrollmentApi.getEnrollments();
  return response.data;
});

export const fetchEnrollmentById = createAsyncThunk(
  'enrollments/fetchById',
  async (id: number) => {
    const response = await enrollmentApi.getEnrollmentById(id);
    return response.data;
  }
);

export const enrollInCourse = createAsyncThunk(
  'enrollments/enroll',
  async (courseId: number) => {
    const response = await enrollmentApi.enrollInCourse(courseId);
    return response.data;
  }
);

export const updateProgress = createAsyncThunk(
  'enrollments/updateProgress',
  async ({ id, progress }: { id: number; progress: number }) => {
    const response = await enrollmentApi.updateProgress(id, progress);
    return response.data;
  }
);

const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    clearCurrentEnrollment: (state) => {
      state.currentEnrollment = null;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Enrollments
      .addCase(fetchEnrollments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enrollments';
      })
      // Fetch Enrollment by ID
      .addCase(fetchEnrollmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEnrollmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEnrollment = action.payload;
      })
      .addCase(fetchEnrollmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch enrollment';
      })
      // Enroll in Course
      .addCase(enrollInCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(enrollInCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments.push(action.payload);
      })
      .addCase(enrollInCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to enroll in course';
      })
      // Update Progress
      .addCase(updateProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateProgress.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.enrollments.findIndex(
          (enrollment) => enrollment.id === action.payload.id
        );
        if (index !== -1) {
          state.enrollments[index] = action.payload;
        }
        if (state.currentEnrollment?.id === action.payload.id) {
          state.currentEnrollment = action.payload;
        }
      })
      .addCase(updateProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to update progress';
      });
  },
});

export const { clearCurrentEnrollment, clearError } = enrollmentSlice.actions;
export default enrollmentSlice.reducer; 