import { useEffect, useState, useRef, useCallback } from 'react';
import { Course } from '../types/Course';
import apiClient from '../services/api/client';
import { FaUserGraduate, FaSearch, FaFilter } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

interface CourseResponse {
  STATE: number;
  TOTAL_PAGES: number;
  CURRENT_PAGE: number;
  COURSES: Course[];
  COURSES_TOTAL: number;
}

export const CoursesList = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const topRef = useRef<HTMLDivElement>(null);
  
  // Função de debounce para evitar múltiplas chamadas à API
  const debounce = (func: Function, delay: number) => {
    let timeoutId: ReturnType<typeof setTimeout>;
    return function(...args: any[]) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };
  
  const fetchCourses = async (page: number = 1, query: string = searchTerm) => {
    try {
      setLoading(true);
      
      // Preparar os dados para a requisição
      const token = '7d397d28e2fba2e015145d521c843ed7bdd01025'; // Token fixo para desenvolvimento
      const formData = new FormData();
      formData.append('token', token);
      formData.append('order', 'title'); // Ordenar alfabeticamente por título
      formData.append('page', page.toString());
      formData.append('results', '9'); // 9 cursos por página
      
      if (query) {
        // Normalizar a consulta removendo acentos e convertendo para minúsculas
        const normalizedQuery = query
          .trim() // Remove espaços extras no início e fim
          .toLowerCase()
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '');
          
        formData.append('query', normalizedQuery);
      }
      
      const response = await apiClient.post<CourseResponse>('/api/course/get-courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      });
      
      if (response && response.COURSES) {
        setCourses(response.COURSES);
        setTotalPages(response.TOTAL_PAGES || 1);
      }
    } catch (err) {
      console.error('Erro ao buscar cursos:', err);
    } finally {
      setLoading(false);
    }
  };

  // Usando useCallback para evitar recriação desnecessária da função
  const debouncedSearch = useCallback(
    debounce((query: string) => {
      setCurrentPage(1); // Reset para a primeira página ao pesquisar
      fetchCourses(1, query);
    }, 500), // 500ms de delay
    []
  );
  
  // Função para lidar com mudanças no campo de busca
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchTerm(query);
    debouncedSearch(query);
  };

  // Efeito para carregar os cursos quando a página mudar
  useEffect(() => {
    fetchCourses(currentPage);
  }, [currentPage]);

  // Efeito para rolar para o topo quando a página mudar
  useEffect(() => {
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-20" ref={topRef}>
      <div className="bg-primary text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-4">Catálogo de Cursos</h1>
          <p className="text-xl">Explore todos os nossos cursos disponíveis</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Barra de pesquisa */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
                value={searchTerm}
                onChange={handleSearchChange}
              />
              <FaSearch className="absolute right-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Resultados */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : (
          <>
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                  <a href={`/curso/${course.course_slug}`} className="block" key={course.course_id}>
                    <div className="course-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                      <img 
                        src={course.course_image || "https://via.placeholder.com/800x450?text=Sem+Imagem"} 
                        alt={course.course_title} 
                        className="w-full h-48 object-cover" 
                      />
                      <div className="p-4">
                        <div className="flex items-center mb-2">
                          {course.course_rating && (
                            <div className="flex items-center">
                              {[...Array(Math.round(course.course_rating))].map((_, i) => (
                                <AiFillStar key={i} className="text-yellow-400" />
                              ))}
                              <span className="ml-1 text-sm text-gray-600">
                                ({course.course_rating_abs || 0})
                              </span>
                            </div>
                          )}
                        </div>
                        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{course.course_title}</h3>
                        <p className="text-sm text-gray-600 mb-3">
                          <FaUserGraduate className="inline mr-1" />
                          {course.course_teacher?.teacher_name || "Professor"}
                        </p>
                        <div className="flex items-center justify-between">
                          <p className="font-semibold text-primary">
                            {course.course_free === 1 ? 'Gratuito' : `R$ ${course.course_price}`}
                          </p>
                          <p className="text-sm text-gray-500">
                            <FaUserGraduate className="inline mr-1" />
                            {course.course_students} alunos
                          </p>
                        </div>
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <h3 className="text-xl font-semibold">Nenhum curso encontrado</h3>
                <p className="text-gray-600 mt-2">Tente outra pesquisa ou navegue por categorias</p>
              </div>
            )}

            {/* Paginação */}
            {courses.length > 0 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handlePrevPage}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === 1
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    Anterior
                  </button>
                  <span className="text-gray-700">
                    Página {currentPage} de {totalPages}
                  </span>
                  <button
                    onClick={handleNextPage}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === totalPages
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-primary text-white hover:bg-primary-dark'
                    }`}
                  >
                    Próxima
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CoursesList; 