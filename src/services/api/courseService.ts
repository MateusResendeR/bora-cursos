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
  message: string;
  enrollmentId?: number;
}

const courseService = {
  /**
   * Get courses list
   */
  getCourses: async (page: number = 1, limit: number = 10): Promise<CourseListResponse> => {
    return apiClient.get<CourseListResponse>(ENDPOINTS.COURSES.LIST, {
      params: { page, limit }
    });
  },

  /**
   * Get course details by ID
   */
  getCourseDetail: async (id: string): Promise<CourseDetailResponse> => {
    return apiClient.get<CourseDetailResponse>(ENDPOINTS.COURSES.DETAIL(id));
  },
  
  /**
   * Get course by slug - uses getCourseById internally once the ID is known
   */
  getCourseBySlug: async (slug: string): Promise<CourseDetailResponse> => {
    // Implementação temporária: primeiro busca todos os cursos e depois filtra pelo slug
    // Em produção, o ideal seria ter um endpoint específico para busca por slug
    const allCourses = await courseService.getCourses(1, 100);
    
    if (allCourses && allCourses.courses) {
      const course = allCourses.courses.find(c => c.course_slug === slug);
      
      if (course) {
        // Se encontrou o curso pelo slug, busca detalhes completos usando o ID
        return courseService.getCourseById(course.course_id.toString());
      }
    }
    
    return {
      state: 0,
      error: 'Curso não encontrado'
    };
  },

  /**
   * Get detailed course information by ID using token
   * This uses the specific /api/course/get-courses endpoint
   */
  getCourseById: async (courseId: string): Promise<CourseDetailResponse> => {
    const token = '7d397d28e2fba2e015145d521c843ed7bdd01025'; // Token fixo para desenvolvimento
    const formData = new FormData();
    formData.append('token', token);
    formData.append('course_id', courseId);
    
    try {
      const response = await apiClient.post<CourseResponse>('/api/course/get-courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      if (response && response.COURSES && response.COURSES.length > 0) {
        return {
          state: 1,
          course: response.COURSES[0]
        };
      } else {
        return {
          state: 0,
          error: 'Curso não encontrado'
        };
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
      return {
        state: 0,
        error: 'Erro ao buscar detalhes do curso'
      };
    }
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
    try {
      console.log('Buscando cursos para categoria:', categoryId);
      
      const token = '7d397d28e2fba2e015145d521c843ed7bdd01025'; // Token fixo para desenvolvimento
      const formData = new FormData();
      formData.append('token', token);
      formData.append('category_id', categoryId.toString());
      
      try {
        const response = await apiClient.post<CourseResponse>('/api/course/get-courses', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        
        if (response && response.COURSES) {
          return response.COURSES;
        }
        
        return [];
      } catch (error) {
        console.error('Error fetching courses from API:', error);
        return [];
      }
    } catch (error) {
      console.error('Erro ao buscar cursos para categoria:', error);
      return [];
    }
  }
};

export default courseService; 