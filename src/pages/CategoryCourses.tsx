import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Course } from '../types/Course';
import courseService from '../services/api/courseService';
import categoryService from '../services/api/categoryService';
import { Category } from '../types/Category';
import { AiFillStar } from 'react-icons/ai';
import { FaUserGraduate, FaClock, FaVideo, FaRegFilePdf, FaCheck } from 'react-icons/fa';

export function CategoryCourses() {
  const { categoryId, slug } = useParams<{ categoryId: string, slug: string }>();
  const [courses, setAllCourses] = useState<Course[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategoryAndCourses = async () => {
      if (!categoryId) {
        setError('ID da categoria não fornecido');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Fetch category info
        const categories = await categoryService.getCategories();
        const currentCategory = categories.find(c => c.category_id === parseInt(categoryId));
        
        if (currentCategory) {
          setCategory(currentCategory);
        }

        // Fetch courses for this category
        const coursesData = await courseService.getCoursesByCategory(parseInt(categoryId));
        
        if (coursesData && coursesData.length > 0) {
          setAllCourses(coursesData);
        } else {
          setAllCourses([]);
        }
      } catch (err) {
        setError('Erro ao carregar os cursos. Por favor, tente novamente mais tarde.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryAndCourses();
  }, [categoryId]);

  const formatPrice = (price: string) => {
    if (!price || price === '0') return 'Gratuito';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(price));
  };

  return (
    <main className="page-container container mx-auto px-4 py-8">
      {category && (
        <div className="mb-8">
          <div className="flex flex-col items-center">
            {category.category_image && (
              <div className="w-24 h-24 mb-4 overflow-hidden rounded-full border-4 border-white shadow-lg">
                <img 
                  src={category.category_image} 
                  alt={category.category_title}
                  className="w-full h-full object-cover filter contrast-[1.03] brightness-[1.05]"
                  loading="eager"
                  style={{ imageRendering: 'auto' }}
                />
              </div>
            )}
            <h2 className="section-title text-center">{category.category_title}</h2>
            {category.category_description && (
              <p className="text-center text-gray-600 text-sm max-w-2xl mx-auto">
                {category.category_description}
              </p>
            )}
          </div>
        </div>
      )}
      
      {loading && (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      )}
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
          <span className="block sm:inline">{error}</span>
        </div>
      )}
      
      {!loading && !error && courses.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <h2 className="text-xl font-medium text-gray-600">Nenhum curso encontrado para esta categoria</h2>
          <p className="mt-2 text-gray-500">Tente explorar outras categorias ou volte mais tarde</p>
          <a 
            href="/categorias" 
            className="mt-4 inline-block px-6 py-2 bg-primary text-white font-medium rounded-md hover:bg-primary-dark transition-colors"
          >
            Voltar para Categorias
          </a>
        </div>
      )}
      
      {courses.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {courses.map((course) => (
            <a href={`/curso/${course.course_slug}`} className="block h-full" key={course.course_id}>
              <div className="course-card flex flex-col h-full">
                <div className="relative">
                  <img 
                    src={course.course_image || 'https://via.placeholder.com/300x180?text=Sem+Imagem'} 
                    alt={course.course_title} 
                    className="course-card-image h-48 w-full object-cover shadow-sm filter contrast-[1.02] brightness-[1.05]"
                    loading="lazy"
                    style={{ imageRendering: 'auto' }}
                  />
                  {course.course_free === 1 && (
                    <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
                      GRATUITO
                    </div>
                  )}
                </div>
                <div className="course-card-content flex-1 flex flex-col">
                  <div className="course-card-rating mb-2">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar key={i} className={i < Math.floor(course.course_rating || 0) ? "text-yellow-400" : "text-gray-300"} />
                    ))}
                    <span className="ml-2 text-gray-600">
                      {course.course_rating ? `(${course.course_rating.toFixed(1)})` : '(Não avaliado)'}
                    </span>
                  </div>
                  <h3 className="course-card-title mb-2 h-14 line-clamp-2">{course.course_title}</h3>
                  
                  <div className="mt-1 mb-2">
                    <div className="flex flex-col">
                      <p className="course-card-instructor text-sm text-gray-600 mb-1">
                        <FaUserGraduate className="inline mr-2" />
                        {course.course_teacher && course.course_teacher.teacher_name 
                          ? course.course_teacher.teacher_name 
                          : 'Instrutor não informado'}
                      </p>
                      <p className="text-sm text-gray-600">
                        <FaClock className="inline mr-2" />
                        {course.course_hours ? `${course.course_hours}h de conteúdo` : 'Duração não informada'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-1 mb-3 flex-grow">
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {course.course_description 
                        ? course.course_description.split('\n')[0] 
                        : 'Descrição não informada'}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <p className="course-card-price font-bold text-primary">
                      {course.course_free === 1 ? 'Gratuito' : formatPrice(course.course_price)}
                    </p>
                    <p className="course-card-students text-gray-600 text-sm">
                      <FaUserGraduate className="inline mr-1" />
                      {course.course_students || 0} alunos
                    </p>
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      )}
    </main>
  );
}

export default CategoryCourses; 