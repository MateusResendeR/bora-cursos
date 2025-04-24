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
        // Se não conseguirmos obter os cursos da API, usamos dados mock
        return mockFetchCourses(categoryId);
      }
    } catch (error) {
      console.error('Erro ao buscar cursos para categoria:', error);
      return [];
    }
  }
};

// Função auxiliar para criar dados mock para desenvolvimento
async function mockFetchCourses(categoryId: number): Promise<Course[]> {
  console.log('Usando dados mock para categoria:', categoryId);
  
  // Array de cursos mock para desenvolvimento
  const mockCourses: Course[] = [
    {
      course_id: 1,
      course_title: 'Desenvolvimento Web Completo',
      course_slug: 'desenvolvimento-web-completo',
      course_description: 'Aprenda HTML, CSS, JavaScript, React, Node e muito mais',
      course_image: 'https://via.placeholder.com/300x180?text=Dev+Web',
      course_price: '399.90',
      course_free: 0,
      course_rating: 4.8,
      course_rating_abs: 128,
      course_students: 1542,
      course_category_id: categoryId,
      course_category_title: 'Desenvolvimento Web',
      course_category_slug: 'desenvolvimento-web',
      course_hours: 42,
      course_company_id: 1,
      course_format: 1,
      course_captions: [],
      course_video: '',
      course_parent: 0,
      course_description_knowledge: 'HTML\nCSS\nJavaScript\nReact\nNode.js',
      course_description_prerequisites: 'Conhecimentos básicos de computação',
      course_description_duration: '42 horas',
      course_description_courseware: 'Arquivos PDF\nCódigos de exemplo\nProjetos práticos',
      course_description_certification: 'Certificado de conclusão digital',
      course_minutes: 2520,
      course_image_aux: '',
      course_slideshow: [],
      course_teacher: {
        teacher_name: 'João Silva',
        teacher_description: 'Especialista em desenvolvimento web com mais de 10 anos de experiência',
        teacher_image: 'https://via.placeholder.com/100x100?text=João'
      }
    },
    {
      course_id: 2,
      course_title: 'JavaScript Avançado',
      course_slug: 'javascript-avancado',
      course_description: 'Domine recursos avançados de JavaScript',
      course_image: 'https://via.placeholder.com/300x180?text=JavaScript',
      course_price: '299.90',
      course_free: 0,
      course_rating: 4.6,
      course_rating_abs: 95,
      course_students: 1087,
      course_category_id: categoryId,
      course_category_title: 'Desenvolvimento Web',
      course_category_slug: 'desenvolvimento-web',
      course_hours: 28,
      course_company_id: 1,
      course_format: 1,
      course_captions: [],
      course_video: '',
      course_parent: 0,
      course_description_knowledge: 'Closures\nPromises\nAsync/Await\nDOM Manipulation\nClasses',
      course_description_prerequisites: 'JavaScript básico',
      course_description_duration: '28 horas',
      course_description_courseware: 'Arquivos PDF\nExercícios práticos',
      course_description_certification: 'Certificado de conclusão digital',
      course_minutes: 1680,
      course_image_aux: '',
      course_slideshow: [],
      course_teacher: {
        teacher_name: 'Maria Santos',
        teacher_description: 'Desenvolvedora front-end especialista em JavaScript',
        teacher_image: 'https://via.placeholder.com/100x100?text=Maria'
      }
    },
    {
      course_id: 3,
      course_title: 'React do Zero ao Avançado',
      course_slug: 'react-zero-avancado',
      course_description: 'Aprenda a criar aplicações modernas com React',
      course_image: 'https://via.placeholder.com/300x180?text=React',
      course_price: '0',
      course_free: 1,
      course_rating: 4.9,
      course_rating_abs: 203,
      course_students: 2342,
      course_category_id: categoryId,
      course_category_title: 'Desenvolvimento Web',
      course_category_slug: 'desenvolvimento-web',
      course_hours: 36,
      course_company_id: 1,
      course_format: 1,
      course_captions: [],
      course_video: '',
      course_parent: 0,
      course_description_knowledge: 'Componentes\nHooks\nContext API\nRedux\nNext.js',
      course_description_prerequisites: 'JavaScript básico',
      course_description_duration: '36 horas',
      course_description_courseware: 'Arquivos de projeto\nCódigos de exemplo',
      course_description_certification: 'Certificado de conclusão digital',
      course_minutes: 2160,
      course_image_aux: '',
      course_slideshow: [],
      course_teacher: {
        teacher_name: 'Pedro Oliveira',
        teacher_description: 'Especialista em React e ecossistema JavaScript moderno',
        teacher_image: 'https://via.placeholder.com/100x100?text=Pedro'
      }
    }
  ];
  
  return mockCourses;
}

export default courseService; 