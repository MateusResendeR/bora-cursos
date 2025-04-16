import apiClient from './client';
import { ENDPOINTS } from './endpoints';
import { Course, CourseResponse } from '../../types/Course';

export interface CourseListResponse {
  state: 1 | 0;
  error?: string;
  success?: string;
  courses?: Course[];
  total?: number;
  page?: number;
}

export interface CourseDetailResponse {
  state: 1 | 0;
  error?: string;
  success?: string;
  course?: Course;
}

export interface EnrollmentResponse {
  success: boolean;
  message: string;
  enrollmentId?: number;
}

export const courseService = {
  /**
   * Get list of courses
   */
  getCourses: async (page: number = 1, limit: number = 10): Promise<CourseListResponse> => {
    return apiClient.get<CourseListResponse>(ENDPOINTS.COURSES.LIST, {
      params: { page, limit }
    });
  },

  /**
   * Get course details
   */
  getCourseDetail: async (id: string): Promise<CourseDetailResponse> => {
    return apiClient.get<CourseDetailResponse>(ENDPOINTS.COURSES.DETAIL(id));
  },

  /**
   * Enrolls the current user in a course
   * @param id - The ID of the course to enroll in
   * @returns Promise with the enrollment response
   */
  enrollInCourse(id: string) {
    return apiClient.post<EnrollmentResponse>(ENDPOINTS.COURSES.ENROLL(id));
  },

  /**
   * Fetches courses for a specific category
   * @param categoryId - The ID of the category to fetch courses for
   * @returns Promise with the courses data
   */
  async getCoursesByCategory(categoryId: number): Promise<Course[]> {
    const formData = new FormData();
    formData.append('token', '7d397d28e2fba2e015145d521c843ed7bdd01025');
    formData.append('category_id', categoryId.toString());
    
    try {
      const response = await apiClient.post<CourseResponse>('/api/course/get-courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      return response.COURSES || [];
    } catch (error) {
      console.error('Error fetching courses:', error);
      throw error;
    }
  }
};

export default courseService; 