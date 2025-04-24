import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Course } from '../types/Course';
import courseService from '../services/api/courseService';
import { AiFillStar } from 'react-icons/ai';
import { FaUserGraduate, FaClock, FaVideo, FaRegFilePdf, FaCheck, FaPlayCircle, FaBookOpen, FaLaptop, FaCertificate, FaUsers, FaShoppingCart } from 'react-icons/fa';

export function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>('about');

  useEffect(() => {
    const fetchCourse = async () => {
      if (!slug) {
        setError('Curso não encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Buscar curso pelo slug usando o serviço atualizado
        const response = await courseService.getCourseBySlug(slug);
        
        if (response.state === 1 && response.course) {
          setCourse(response.course);
        } else {
          setError(response.error || 'Curso não encontrado');
        }
      } catch (err) {
        console.error('Erro ao carregar detalhes do curso:', err);
        setError('Erro ao carregar os detalhes do curso. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [slug]);

  const formatPrice = (price: string) => {
    if (!price || price === '0') return 'Gratuito';
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(parseFloat(price));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-lg text-zinc-600">Carregando detalhes do curso...</p>
        </div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center items-center min-h-[60vh]">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Ops! Algo deu errado.</h2>
          <p className="text-lg text-zinc-600 mb-6">{error || 'Curso não encontrado'}</p>
          <a href="/" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
            Voltar para a página inicial
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50">
      {/* Banner */}
      <div className="bg-primary text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.course_title}</h1>
              <p className="text-lg mb-4">{course.course_description || 'Descrição não informada'}</p>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center mr-4">
                  <AiFillStar className="text-yellow-400 text-xl mr-1" />
                  <span>{course.course_rating ? course.course_rating.toFixed(1) : '0'}</span>
                  <span className="ml-1 text-gray-300">({course.course_rating_abs || 0} avaliações)</span>
                </div>
                <div className="flex items-center">
                  <FaUsers className="mr-1" />
                  <span>{course.course_students || 0} alunos</span>
                </div>
              </div>
              
              <div className="flex items-center mb-6">
                <div className="flex items-center mr-4">
                  <FaUserGraduate className="mr-2" />
                  <span>{course.course_teacher?.teacher_name || 'Instrutor não informado'}</span>
                </div>
                <div className="flex items-center">
                  <FaClock className="mr-2" />
                  <span>{course.course_hours ? `${course.course_hours} horas` : 'Duração não informada'}</span>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-2 mb-6">
                {course.course_captions && course.course_captions.map((caption, index) => (
                  <span key={index} className="px-3 py-1 bg-white/20 rounded-full text-sm">
                    {caption}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="md:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 text-slate-800">
                <div className="relative rounded-md overflow-hidden mb-4 aspect-video">
                  <img 
                    src={course.course_image || 'https://placehold.co/600x400?text=Sem+Imagem'} 
                    alt={course.course_title} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="mb-4">
                  <div className="text-3xl font-bold mb-2">
                    {formatPrice(course.course_price)}
                  </div>
                  {course.course_free === 1 && (
                    <div className="text-green-600 text-sm font-medium mb-2">Curso gratuito</div>
                  )}
                </div>
                
                <button className="w-full py-3 bg-primary text-white rounded-md font-medium flex items-center justify-center mb-4 hover:bg-primary-dark transition-colors">
                  <FaShoppingCart className="mr-2" />
                  {course.course_free === 1 ? 'Inscrever-se' : 'Comprar agora'}
                </button>
                
                {course.course_free !== 1 && (
                  <button className="w-full py-3 border border-primary text-primary rounded-md font-medium mb-4 hover:bg-primary hover:text-white transition-colors">
                    Adicionar ao carrinho
                  </button>
                )}
                
                <div className="text-sm text-slate-500 mb-4">
                  Este curso inclui:
                </div>
                
                <ul className="space-y-2 mb-4">
                  <li className="flex items-start">
                    <FaPlayCircle className="text-primary mt-1 mr-2" />
                    <span>{course.course_minutes ? `${Math.floor(course.course_minutes / 60)} horas de vídeo` : 'Conteúdo em vídeo'}</span>
                  </li>
                  <li className="flex items-start">
                    <FaBookOpen className="text-primary mt-1 mr-2" />
                    <span>Materiais complementares</span>
                  </li>
                  <li className="flex items-start">
                    <FaLaptop className="text-primary mt-1 mr-2" />
                    <span>Acesso vitalício</span>
                  </li>
                  <li className="flex items-start">
                    <FaCertificate className="text-primary mt-1 mr-2" />
                    <span>Certificado de conclusão</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="border-b border-gray-200 mb-8">
          <div className="flex overflow-x-auto space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'about' ? 'border-primary text-primary' : 'border-transparent text-slate-600 hover:text-primary'
              }`}
            >
              Sobre o curso
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'curriculum' ? 'border-primary text-primary' : 'border-transparent text-slate-600 hover:text-primary'
              }`}
            >
              Conteúdo programático
            </button>
            <button
              onClick={() => setActiveTab('instructor')}
              className={`py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'instructor' ? 'border-primary text-primary' : 'border-transparent text-slate-600 hover:text-primary'
              }`}
            >
              Instrutor
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'reviews' ? 'border-primary text-primary' : 'border-transparent text-slate-600 hover:text-primary'
              }`}
            >
              Avaliações
            </button>
          </div>
        </div>
        
        {/* Tab Content */}
        <div className="mb-16">
          {activeTab === 'about' && (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2">
                <h2 className="text-2xl font-bold mb-6">Descrição do Curso</h2>
                <div className="prose max-w-none mb-8">
                  <p>{course.course_description || 'Descrição não informada'}</p>
                </div>
                
                <h3 className="text-xl font-semibold mb-4">O que você vai aprender</h3>
                <div className="grid md:grid-cols-2 gap-3 mb-8">
                  {course.course_description_knowledge ? (
                    course.course_description_knowledge.split('\n').map((item, index) => (
                      <div key={index} className="flex items-start">
                        <FaCheck className="text-primary mt-1 mr-2 flex-shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">Conteúdo não informado</div>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-4">Pré-requisitos</h3>
                <div className="mb-8">
                  {course.course_description_prerequisites ? (
                    course.course_description_prerequisites.split('\n').map((item, index) => (
                      <div key={index} className="flex items-start mb-2">
                        <span className="text-primary mr-2">•</span>
                        <span>{item}</span>
                      </div>
                    ))
                  ) : (
                    <div className="text-gray-500">Nenhum pré-requisito informado</div>
                  )}
                </div>
              </div>
              
              <div className="md:col-span-1">
                <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                  <h3 className="text-lg font-semibold mb-4">Detalhes do curso</h3>
                  <ul className="space-y-4">
                    <li className="flex justify-between">
                      <span className="text-slate-600">Duração:</span>
                      <span className="font-medium">{course.course_hours ? `${course.course_hours} horas` : 'Não informada'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-600">Alunos:</span>
                      <span className="font-medium">{course.course_students || 0}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-600">Idioma:</span>
                      <span className="font-medium">{course.course_captions?.join(', ') || 'Não informado'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-600">Formato:</span>
                      <span className="font-medium">{course.course_format === 1 ? 'Online' : 'Não informado'}</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="text-slate-600">Categoria:</span>
                      <span className="font-medium">{course.course_category_title || 'Não informada'}</span>
                    </li>
                  </ul>
                </div>
                
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold mb-4">Materiais inclusos</h3>
                  <ul className="space-y-3">
                    {course.course_description_courseware ? (
                      course.course_description_courseware.split('\n').map((item, index) => (
                        <li key={index} className="flex items-start">
                          <FaRegFilePdf className="text-primary mt-1 mr-2 flex-shrink-0" />
                          <span>{item}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-gray-500">Nenhum material informado</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'curriculum' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Conteúdo Programático</h2>
              <div className="bg-white rounded-lg shadow-sm p-1">
                <div className="p-4 text-gray-500">
                  Informações do conteúdo programático em breve...
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'instructor' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Instrutor</h2>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="w-32 h-32 rounded-full overflow-hidden">
                      <img 
                        src={course.course_teacher?.teacher_image || 'https://placehold.co/200x200?text=Instrutor'} 
                        alt={course.course_teacher?.teacher_name || 'Instrutor'} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{course.course_teacher?.teacher_name || 'Instrutor não informado'}</h3>
                    <p className="text-slate-600 mb-4">{course.course_teacher?.teacher_description || 'Nenhuma informação sobre o instrutor disponível'}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Avaliações</h2>
              <div className="bg-white rounded-lg shadow-sm p-6 flex flex-col items-center justify-center py-12">
                <div className="text-7xl font-bold text-primary mb-2">
                  {course.course_rating ? course.course_rating.toFixed(1) : '0'}
                </div>
                <div className="flex items-center mb-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <AiFillStar 
                      key={star} 
                      className={`text-2xl ${
                        star <= Math.round(course.course_rating || 0) 
                          ? 'text-yellow-400' 
                          : 'text-gray-300'
                      }`} 
                    />
                  ))}
                </div>
                <div className="text-slate-500 mb-6">
                  {course.course_rating_abs 
                    ? `Baseado em ${course.course_rating_abs} avaliações` 
                    : 'Nenhuma avaliação ainda'}
                </div>
                <div className="text-center">
                  <p className="mb-4">Seja o primeiro a avaliar este curso!</p>
                  <button className="px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
                    Escrever uma avaliação
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail; 