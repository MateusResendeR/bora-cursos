import { Course } from '../types/Course';
import { FaStar, FaUsers } from 'react-icons/fa';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
      <div className="relative">
        <img
          src={course.course_image || 'https://via.placeholder.com/300x180?text=Sem+Imagem'}
          alt={course.course_title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 right-2 bg-primary text-white px-2 py-1 rounded-full text-sm">
          {course.course_category_title}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{course.course_title}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2">{course.course_description}</p>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <FaStar className="text-yellow-400 mr-1" />
            <span className="text-sm">{course.course_rating ? course.course_rating.toFixed(1) : 'N/A'}</span>
          </div>
          <div className="flex items-center">
            <FaUsers className="text-gray-500 mr-1" />
            <span className="text-sm">{course.course_students} alunos</span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {course.course_free === 1 ? 'Gratuito' : `R$ ${parseFloat(course.course_price).toFixed(2)}`}
          </span>
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark transition-colors">
            Ver Curso
          </button>
        </div>
      </div>
    </div>
  );
}; 