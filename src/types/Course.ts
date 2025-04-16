export interface Course {
  course_id: number;
  course_company_id: number;
  course_title: string;
  course_description: string;
  course_slug: string;
  course_free: number;
  course_format: number;
  course_category_id: number;
  course_category_slug: string;
  course_category_title: string;
  course_rating: number;
  course_students: number;
  course_captions: string[];
  course_hours: number;
  course_video: string;
  course_parent: number;
  course_description_knowledge: string;
  course_description_prerequisites: string;
  course_description_duration: string;
  course_description_courseware: string;
  course_description_certification: string;
  course_minutes: number;
  course_image: string;
  course_image_aux: string;
  course_slideshow: string[];
  course_teacher: {
    teacher_name: string;
    teacher_description: string;
    teacher_image: string;
  };
  course_rating_abs: number;
  course_price: string;
}

export interface CourseResponse {
  STATE: number;
  TOTAL_PAGES: number;
  CURRENT_PAGE: number;
  COURSES: Course[];
  COURSES_TOTAL: number;
} 