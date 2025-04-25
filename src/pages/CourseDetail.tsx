import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Course, CourseResponse, CourseTopic, CourseLesson, CourseChapter } from '../types/Course';
import apiClient from '../services/api/client';
import { 
  FaPlayCircle, 
  FaClock, 
  FaUserGraduate, 
  FaCheck, 
  FaRegClock, 
  FaCertificate,
  FaLock,
  FaTrophy,
  FaTimes
} from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

export function CourseDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [topics, setTopics] = useState<CourseTopic[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'about'|'curriculum'|'instructor'|'reviews'>('about');
  const [isEnrolled, setIsEnrolled] = useState<boolean>(false);
  const [showVideoModal, setShowVideoModal] = useState<boolean>(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCourseBySlug = async () => {
      if (!slug) {
        setError('Curso não encontrado');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        // Preparar os dados para a requisição
        const token = '7d397d28e2fba2e015145d521c843ed7bdd01025'; // Token fixo para desenvolvimento
        const formData = new FormData();
        formData.append('token', token);
        formData.append('slug', slug);
        formData.append('include_topics', '1'); // Solicitar tópicos do curso
        formData.append('all_formats', 'true'); // Solicitar todos os formatos disponíveis
        
        const response = await apiClient.post<CourseResponse>('/api/course/get-courses', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          }
        });
        
        if (response && response.COURSES && response.COURSES.length > 0) {
          const courseData = response.COURSES[0];
          setCourse(courseData);
          
          // Verificar se o usuário está matriculado com base na existência de course_user
          if (courseData.course_user) {
            setIsEnrolled(true);
          }

          // Se o curso tiver tópicos, organizá-los
          if (courseData.topics) {
            setTopics(courseData.topics);
          }
          
          // Se não temos tópicos detalhados com aulas, mas temos course_chapters, 
          // vamos usá-lo para exibir o conteúdo programático de forma mais organizada
          if (courseData.course_chapters && (!courseData.topics || courseData.topics.length === 0)) {
            // Vamos criar tópicos mock baseados nos capítulos para exibir no currículo
            const mockTopics: CourseTopic[] = courseData.course_chapters.map((chapter: CourseChapter, index: number) => {
              // Criar aulas mock baseadas nos tópicos de cada capítulo
              const mockLessons: CourseLesson[] = chapter.chapter_topics.map((topic: string, lessonIndex: number) => ({
                lesson_id: `${index}-${lessonIndex}`,
                lesson_title: topic,
                lesson_duration: 15, // Duração estimada em minutos
                lesson_order: lessonIndex + 1,
                lesson_free: lessonIndex === 0 ? 1 : 0, // Primeira aula de cada capítulo é gratuita para demonstração
              }));
              
              return {
                topic_id: `chapter-${index}`,
                topic_title: chapter.chapter_title,
                topic_order: index + 1,
                lessons: mockLessons
              };
            });
            
            setTopics(mockTopics);
          }
        } else {
          setError('Curso não encontrado');
        }
      } catch (err) {
        console.error('Erro ao carregar detalhes do curso:', err);
        setError('Erro ao carregar detalhes do curso. Por favor, tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchCourseBySlug();
  }, [slug]);

  const handleEnrollClick = () => {
    // Aqui implementaríamos a lógica de inscrição do curso
    // Por enquanto, apenas mostraremos um alerta
    alert('Funcionalidade de inscrição em desenvolvimento!');
  };

  const handlePlayVideo = () => {
    setShowVideoModal(true);
    // Bloquear scroll da página quando o modal estiver aberto
    document.body.style.overflow = 'hidden';
  };

  const handleCloseVideo = () => {
    setShowVideoModal(false);
    // Restaurar scroll da página quando o modal for fechado
    document.body.style.overflow = 'auto';
  };

  // Fecha o modal se clicar fora da área do vídeo
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      handleCloseVideo();
    }
  };

  // Fecha o modal se pressionar ESC
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseVideo();
      }
    };
    
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex justify-center items-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Ops! Algo deu errado.</h2>
            <p className="text-lg text-gray-600 mb-6">{error || 'Curso não encontrado'}</p>
            <a href="/" className="px-6 py-3 bg-primary text-white rounded-md hover:bg-primary-dark transition-colors">
              Voltar para a página inicial
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Cálculo do total de aulas e duração
  const totalLessons = topics.reduce((acc, topic) => acc + (topic.lessons?.length || 0), 0);

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Banner do curso */}
      <div className="bg-gradient-to-r from-primary to-primary-dark text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-start gap-8">
            {/* Informações do curso */}
            <div className="lg:w-2/3">
              <div className="flex items-center space-x-2 mb-4">
                <span className="px-3 py-1 bg-white text-primary text-sm font-medium rounded-full">
                  {course.course_category_title}
                </span>
                {course.course_free === 1 && (
                  <span className="px-3 py-1 bg-green-500 text-white text-sm font-medium rounded-full">
                    Gratuito
                  </span>
                )}
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.course_title}</h1>
              
              <p className="text-lg text-gray-100 mb-6">
                {course.course_description}
              </p>
              
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <AiFillStar 
                      key={i} 
                      className={i < Math.round(course.course_rating || 0) ? 'text-yellow-400' : 'text-gray-300'} 
                      size={22} 
                    />
                  ))}
                  <span className="ml-1 text-gray-100">
                    ({course.course_rating_abs || 0})
                  </span>
                </div>
                
                <div className="flex items-center">
                  <FaUserGraduate className="mr-1" />
                  <span>{course.course_students} alunos</span>
                </div>
                
                <div className="flex items-center">
                  <FaClock className="mr-1" />
                  <span>{course.course_hours} horas</span>
                </div>
              </div>
              
              <div className="flex items-center mb-4">
                <img 
                  src={course.course_teacher?.teacher_image || "https://via.placeholder.com/60?text=Professor"} 
                  alt={course.course_teacher?.teacher_name || "Professor"} 
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="text-lg font-medium">
                    {course.course_teacher?.teacher_name || "Professor"}
                  </div>
                  <div className="text-sm text-gray-200">
                    Instrutor
                  </div>
                </div>
              </div>
            </div>
            
            {/* Card de matrícula */}
            <div className="lg:w-1/3 w-full bg-white rounded-lg shadow-md text-gray-800 p-6">
              <div 
                className="relative aspect-video mb-4 rounded-lg overflow-hidden group cursor-pointer"
                onClick={handlePlayVideo}
              >
                <img 
                  src={course.course_image || "https://via.placeholder.com/800x450?text=Curso"} 
                  alt={course.course_title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center transition-opacity">
                  <FaPlayCircle size={64} className="text-white opacity-80" />
                </div>
              </div>
              
              <div className="mb-4">
                {course.course_free === 1 ? (
                  <div className="text-2xl font-bold text-green-600">Gratuito</div>
                ) : (
                  <div className="text-2xl font-bold text-primary">R$ {course.course_price}</div>
                )}
              </div>
              
              {/* Progresso do usuário se estiver matriculado */}
              {isEnrolled && course.course_user && (
                <div className="mb-4 bg-gray-100 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <FaTrophy className="text-yellow-500" />
                    <span className="font-medium">Seu progresso</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
                    <div 
                      className="bg-primary h-2.5 rounded-full" 
                      style={{ width: `${course.course_user.user_course_grade}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Aulas concluídas: {course.course_user.user_course_completed}</span>
                    <span>{course.course_user.user_course_grade}%</span>
                  </div>
                </div>
              )}
              
              {!isEnrolled ? (
                <button 
                  onClick={handleEnrollClick}
                  className="w-full py-3 px-4 bg-primary text-white font-medium rounded-lg hover:bg-primary-dark transition-colors flex items-center justify-center"
                >
                  {course.course_free === 1 ? 'Inscrever-se Gratuitamente' : 'Comprar Este Curso'}
                </button>
              ) : (
                <a 
                  href="#curriculum" 
                  className="w-full py-3 px-4 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <FaPlayCircle className="mr-2" size={18} />
                  Continuar Aprendendo
                </a>
              )}
              
              <div className="mt-6 space-y-4">
                <h3 className="font-medium">Este curso inclui:</h3>
                <ul className="space-y-3">
                  <li className="flex items-center text-sm">
                    <FaRegClock className="mr-3 text-gray-500" />
                    {course.course_hours} horas de vídeo sob demanda
                  </li>
                  <li className="flex items-center text-sm">
                    <FaCertificate className="mr-3 text-gray-500" />
                    Certificado de conclusão
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de vídeo */}
      {showVideoModal && course && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center"
          onClick={handleModalClick}
        >
          <div 
            ref={modalRef}
            className="relative bg-black rounded-lg overflow-hidden"
            style={{ width: '90vw', height: '90vh', maxWidth: '1200px' }}
          >
            <button 
              onClick={handleCloseVideo}
              className="absolute top-4 right-4 text-white bg-gray-800 bg-opacity-60 hover:bg-opacity-80 rounded-full p-2.5 transition-colors z-10"
              aria-label="Fechar vídeo"
            >
              <FaTimes size={20} />
            </button>
            <div className="h-full flex items-center justify-center">
              {/* @ts-ignore - TypeScript não reconhece que já verificamos que course existe */}
              <iframe 
                src={course.course_video.replace('youtu.be/', 'youtube.com/embed/').replace('youtube.com/watch?v=', 'youtube.com/embed/')}
                title="Vídeo de apresentação do curso"
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
      
      {/* Navegação por abas */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto space-x-8">
            <button
              onClick={() => setActiveTab('about')}
              className={`py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'about' ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Sobre o curso
            </button>
            <button
              onClick={() => setActiveTab('curriculum')}
              className={`py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'curriculum' ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Conteúdo programático
            </button>
            <button
              onClick={() => setActiveTab('instructor')}
              className={`py-4 font-medium text-sm border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'instructor' ? 'border-primary text-primary' : 'border-transparent text-gray-600 hover:text-primary'
              }`}
            >
              Instrutor
            </button>
          </div>
        </div>
      </div>
      
      {/* Conteúdo das abas */}
      <div className="container mx-auto px-4 py-8">
        <div className="lg:w-2/3">
          {/* Tab: Sobre o curso */}
          {activeTab === 'about' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Sobre este curso</h2>
              <div className="prose max-w-none mb-8">
                <p className="mb-4">{course.course_description}</p>
                
                {/* Tópicos abordados */}
                {course.course_topics && course.course_topics.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold mb-3">Principais tópicos abordados</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      {course.course_topics.slice(0, 10).map((topic, index) => (
                        <div key={index} className="flex items-start">
                          <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                          <span>{topic}</span>
                        </div>
                      ))}
                      {course.course_topics.length > 10 && (
                        <div className="flex items-start col-span-1 md:col-span-2 mt-2">
                          <button 
                            onClick={() => setActiveTab('curriculum')}
                            className="text-primary hover:text-primary-dark hover:underline"
                          >
                            Ver todos os {course.course_topics.length} tópicos
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
                
                {/* O que você vai aprender - knowledge */}
                {course.course_description_knowledge && (
                  <>
                    <h3 className="text-xl font-semibold mb-3">O que você vai aprender</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-6">
                      {course.course_description_knowledge.split('\n').map((item, index) => (
                        item.trim() && (
                          <div key={index} className="flex items-start">
                            <FaCheck className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                            <span>{item.trim()}</span>
                          </div>
                        )
                      ))}
                    </div>
                  </>
                )}
                
                {course.course_description_prerequisites && (
                  <>
                    <h3 className="text-xl font-semibold mb-3">Pré-requisitos</h3>
                    <p className="mb-6">{course.course_description_prerequisites}</p>
                  </>
                )}
                
                <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 mb-6">
                  <h3 className="text-xl font-semibold mb-2 text-blue-700">Informações sobre a carga horária</h3>
                  <p className="text-blue-700">
                    O curso possui {course.course_hours} horas de carga horária. 
                    {course.course_description.includes("Porém, se for concluído antes de") && (
                      <> Porém, se for concluído antes de 5 dias, passa a ter 10 horas de carga horária. Conforme nosso contrato e termos de uso.</>
                    )}
                  </p>
                </div>
                
                {course.course_description_duration && (
                  <>
                    <h3 className="text-xl font-semibold mb-3">Duração</h3>
                    <p className="mb-6">{course.course_description_duration}</p>
                  </>
                )}
                
                {course.course_description_courseware && (
                  <>
                    <h3 className="text-xl font-semibold mb-3">Materiais do curso</h3>
                    <p className="mb-6">{course.course_description_courseware}</p>
                  </>
                )}
                
                {course.course_description_certification && (
                  <>
                    <h3 className="text-xl font-semibold mb-3">Certificação</h3>
                    <p className="mb-6">{course.course_description_certification}</p>
                  </>
                )}

                {/* Exibir galeria de imagens se disponível */}
                {course.course_slideshow && course.course_slideshow.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold mb-3">Galeria do curso</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      {course.course_slideshow.map((image, index) => (
                        <div key={index} className="rounded-lg overflow-hidden h-48 cursor-pointer hover:opacity-90 transition-opacity">
                          <img 
                            src={image} 
                            alt={`Imagem ${index + 1} do curso`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {/* Exibir informações de idiomas */}
                {course.course_captions && course.course_captions.length > 0 && (
                  <>
                    <h3 className="text-xl font-semibold mb-3">Idiomas disponíveis</h3>
                    <div className="flex flex-wrap gap-2 mb-6">
                      {course.course_captions.map((language, index) => {
                        const languageName = 
                          language === 'pt' ? 'Português' : 
                          language === 'en' ? 'Inglês' : 
                          language === 'es' ? 'Espanhol' : 
                          language === 'fr' ? 'Francês' : 
                          language === 'zh' ? 'Chinês' : 
                          language;
                        
                        return (
                          <span key={index} className="px-3 py-1 bg-gray-100 rounded-full text-sm flex items-center">
                            <span className={`fi fi-${language === 'en' ? 'us' : language} mr-2`}></span>
                            {languageName}
                          </span>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          
          {/* Tab: Conteúdo programático */}
          {activeTab === 'curriculum' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Conteúdo do curso</h2>
              <div className="mb-4">
                <p className="text-gray-600">
                  <span className="font-medium">{totalLessons} aulas</span> • 
                  <span className="ml-1">{course.course_hours} horas de duração total</span>
                </p>
              </div>
              
              {topics.length > 0 ? (
                <div className="space-y-4">
                  {topics.map((topic, topicIndex) => {
                    // Contar aulas concluídas neste tópico
                    const completedLessons = topic.lessons?.filter(lesson => lesson.lesson_completed).length || 0;
                    
                    return (
                      <div key={topic.topic_id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <details open={topicIndex === 0} className="group">
                          <summary className="bg-gray-50 p-4 cursor-pointer list-none">
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-semibold text-lg flex items-center">
                                  <span className="mr-2">{course.course_chapters ? topic.topic_title : `Módulo ${topicIndex + 1}:`}</span> 
                                  {!course.course_chapters && topic.topic_title}
                                </h3>
                                {topic.topic_description && (
                                  <p className="text-sm text-gray-600 mt-1">{topic.topic_description}</p>
                                )}
                              </div>
                              <div className="flex items-center space-x-3">
                                <div className="text-sm text-gray-500 text-right">
                                  <div>{topic.lessons?.length || 0} aulas</div>
                                </div>
                                <div className="text-primary transform transition-transform group-open:rotate-180">
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            
                            {/* Barra de progresso do tópico */}
                            {isEnrolled && completedLessons > 0 && topic.lessons && topic.lessons.length > 0 && (
                              <div className="mt-3">
                                <div className="w-full bg-gray-200 rounded-full h-1.5">
                                  <div 
                                    className="bg-primary h-1.5 rounded-full" 
                                    style={{ width: `${(completedLessons / topic.lessons.length) * 100}%` }}
                                  ></div>
                                </div>
                                <div className="text-xs text-gray-500 mt-1">
                                  {completedLessons} de {topic.lessons.length} aulas concluídas
                                </div>
                              </div>
                            )}
                          </summary>
                          
                          {topic.lessons && topic.lessons.length > 0 && (
                            <div className="divide-y divide-gray-200">
                              {topic.lessons.map((lesson, lessonIndex) => (
                                <div key={lesson.lesson_id} className="p-4 flex justify-between items-center hover:bg-gray-50">
                                  <div className="flex items-center">
                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center mr-3">  
                                        <div className="bg-gray-100 rounded-full p-1.5 text-gray-400">
                                          <FaLock size={14} />
                                        </div>
                                    </div>
                                    <div>
                                      <h4 className={`font-medium ${!isEnrolled && lesson.lesson_free !== 1 ? 'text-gray-400' : ''}`}>
                                        {lessonIndex + 1}. {lesson.lesson_title}
                                      </h4>
                                    </div>
                                  </div>
                                  
                                  {!isEnrolled &&  (
                                    <div className="text-xs px-3 py-1.5 bg-gray-100 text-gray-500 rounded-full">
                                      Bloqueado
                                    </div>
                                  )}
                                </div>
                              ))}
                            </div>
                          )}
                        </details>
                      </div>
                    );
                  })}
                </div>
              ) : course.course_topics && course.course_topics.length > 0 ? (
                // Exibição alternativa se temos apenas uma lista de tópicos (sem estrutura de capítulos e aulas)
                <div className="bg-white rounded-lg border border-gray-200 p-6">
                  <h3 className="text-xl font-semibold mb-4">Tópicos abordados no curso</h3>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 list-disc pl-5">
                    {course.course_topics.map((topic, index) => (
                      <li key={index} className="text-gray-700">{topic}</li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="bg-gray-50 rounded-lg p-6 text-center">
                  <p className="text-gray-600">O conteúdo programático deste curso ainda não está disponível.</p>
                </div>
              )}
            </div>
          )}
          
          {/* Tab: Instrutor */}
          {activeTab === 'instructor' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Instrutor</h2>
              
              <div className="flex items-start mb-6">
                <img 
                  src={course.course_teacher?.teacher_image || "https://via.placeholder.com/100?text=Professor"} 
                  alt={course.course_teacher?.teacher_name || "Professor"} 
                  className="w-20 h-20 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-xl font-semibold">{course.course_teacher?.teacher_name || "Professor"}</h3>
                  <p className="text-gray-600 italic">Instrutor</p>
                </div>
              </div>
              
              <div className="prose max-w-none">
                <p>{course.course_teacher?.teacher_description || "Informações do instrutor não disponíveis."}</p>
              </div>
            </div>
          )}
          
          {/* Tab: Avaliações */}
          {activeTab === 'reviews' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Avaliações dos alunos</h2>
              
              <div className="flex flex-col md:flex-row items-start gap-8 mb-8">
                <div className="flex flex-col items-center">
                  <div className="text-5xl font-bold text-primary mb-2">{course.course_rating?.toFixed(1) || "0.0"}</div>
                  <div className="flex mb-1">
                    {[...Array(5)].map((_, i) => (
                      <AiFillStar 
                        key={i} 
                        className={i < Math.round(course.course_rating || 0) ? 'text-yellow-400' : 'text-gray-300'} 
                        size={24} 
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">{course.course_rating_abs || 0} </p>
                </div>
                
                <div className="w-full md:w-2/3">
                  {/* Aqui teríamos uma distribuição de avaliações, mas por enquanto vamos deixar um placeholder */}
                  <div className="text-center py-10 text-gray-500">
                    <p>Ainda não há avaliações detalhadas disponíveis para este curso.</p>
                  </div>
                </div>
              </div>
              
              {/* Aqui seriam exibidos os comentários dos alunos */}
              <div className="text-center py-8 border-t border-gray-200">
                <p className="text-gray-600 mb-4">Seja o primeiro a avaliar este curso!</p>
                <button className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors">
                  Escrever uma avaliação
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CourseDetail; 