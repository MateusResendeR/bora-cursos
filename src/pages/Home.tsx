import { Course } from '../types/Course';
import { CourseCard } from '../components/CourseCard';
import { Header } from '../components/Header';
import { FaPlay, FaStar, FaUsers, FaGraduationCap, FaCertificate, FaHeadset, FaUserGraduate, FaClock, FaMobileAlt, FaCheck, FaHeadphones, FaRocket, FaInfinity, FaCrown } from 'react-icons/fa';
import { AiFillStar } from 'react-icons/ai';

// Dados mockados para exemplo
const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Desenvolvimento Web com React',
    description: 'Aprenda a criar aplicações web modernas com React e TypeScript',
    price: 199.90,
    instructor: 'João Silva',
    rating: 4.8,
    studentsCount: 1234,
    imageUrl: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3',
    category: 'Desenvolvimento Web',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    title: 'Python para Data Science',
    description: 'Domine Python e suas bibliotecas para análise de dados',
    price: 249.90,
    instructor: 'Maria Santos',
    rating: 4.9,
    studentsCount: 2156,
    imageUrl: 'https://images.unsplash.com/photo-1526379879527-8559ecfcaec0?ixlib=rb-4.0.3',
    category: 'Data Science',
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-02-01'),
  },
  {
    id: '3',
    title: 'Marketing Digital Avançado',
    description: 'Estratégias avançadas de marketing digital para aumentar suas vendas',
    price: 179.90,
    instructor: 'Ana Oliveira',
    rating: 4.7,
    studentsCount: 1876,
    imageUrl: 'https://images.unsplash.com/photo-1557838923-2985c318be48?ixlib=rb-4.0.3',
    category: 'Marketing',
    createdAt: new Date('2024-03-10'),
    updatedAt: new Date('2024-03-10'),
  },
  {
    id: '4',
    title: 'Fotografia Profissional',
    description: 'Aprenda técnicas avançadas de fotografia para criar imagens impressionantes',
    price: 159.90,
    instructor: 'Carlos Mendes',
    rating: 4.9,
    studentsCount: 987,
    imageUrl: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3',
    category: 'Fotografia',
    createdAt: new Date('2024-04-05'),
    updatedAt: new Date('2024-04-05'),
  },
  {
    id: '5',
    title: 'Excel para Negócios',
    description: 'Domine o Excel e aumente sua produtividade no trabalho',
    price: 129.90,
    instructor: 'Patrícia Lima',
    rating: 4.8,
    studentsCount: 3421,
    imageUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3',
    category: 'Produtividade',
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-01-20'),
  },
  {
    id: '6',
    title: 'Inglês para Negócios',
    description: 'Aprenda inglês focado em situações profissionais e de negócios',
    price: 189.90,
    instructor: 'Roberto Almeida',
    rating: 4.7,
    studentsCount: 2156,
    imageUrl: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3',
    category: 'Idiomas',
    createdAt: new Date('2024-02-15'),
    updatedAt: new Date('2024-02-15'),
  },
];

// Categorias de cursos
const categories = [
  { id: 1, name: 'Desenvolvimento Web', icon: '💻', count: 24 },
  { id: 2, name: 'Data Science', icon: '📊', count: 18 },
  { id: 3, name: 'Marketing Digital', icon: '📱', count: 32 },
  { id: 4, name: 'Design', icon: '🎨', count: 15 },
  { id: 5, name: 'Negócios', icon: '💼', count: 28 },
  { id: 6, name: 'Idiomas', icon: '🌍', count: 12 },
  { id: 7, name: 'Fotografia', icon: '📸', count: 9 },
  { id: 8, name: 'Produtividade', icon: '⏱️', count: 14 },
];

// Depoimentos
const testimonials = [
  {
    id: 1,
    name: 'Mariana Costa',
    role: 'Desenvolvedora Frontend',
    image: 'https://randomuser.me/api/portraits/women/44.jpg',
    text: 'Os cursos do Bora Cursos transformaram minha carreira. Em 6 meses, consegui uma promoção e um aumento significativo no salário.',
    rating: 5,
  },
  {
    id: 2,
    name: 'Pedro Oliveira',
    role: 'Analista de Marketing',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    text: 'A qualidade dos instrutores e o conteúdo prático dos cursos são excepcionais. Recomendo a todos que querem se desenvolver profissionalmente.',
    rating: 5,
  },
  {
    id: 3,
    name: 'Juliana Santos',
    role: 'Designer UX/UI',
    image: 'https://randomuser.me/api/portraits/women/68.jpg',
    text: 'Consegui mudar de carreira graças aos cursos do Bora Cursos. O suporte é incrível e os projetos práticos fazem toda a diferença.',
    rating: 5,
  },
];

export const Home = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Main content with padding-top to account for fixed header */}
      <main className="pt-16">
        {/* Hero Section */}
        <div className="relative bg-gradient-to-r from-primary to-primary-dark text-white overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-20"></div>
          <div className="absolute right-0 top-0 h-full w-1/2 bg-[url('https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3')] bg-cover bg-center opacity-10"></div>
          <div className="container mx-auto px-4 py-24 relative z-10">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Transforme seu futuro com educação de qualidade
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-100">
                Aprenda com os melhores instrutores e desenvolva habilidades que o mercado exige
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-white text-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors flex items-center justify-center">
                  <FaPlay className="mr-2" /> Explorar Cursos
                </button>
                <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-primary transition-colors">
                  Ver Planos
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white py-12">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50">
                <div className="text-4xl font-bold text-primary mb-2">10k+</div>
                <div className="text-gray-600">Alunos Ativos</div>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50">
                <div className="text-4xl font-bold text-primary mb-2">500+</div>
                <div className="text-gray-600">Cursos Disponíveis</div>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50">
                <div className="text-4xl font-bold text-primary mb-2">50+</div>
                <div className="text-gray-600">Instrutores Especialistas</div>
              </div>
              <div className="flex flex-col items-center text-center p-6 rounded-lg bg-gray-50">
                <div className="text-4xl font-bold text-primary mb-2">98%</div>
                <div className="text-gray-600">Satisfação dos Alunos</div>
              </div>
            </div>
          </div>
        </div>

        <section className="py-16 bg-gray-50">
            <div className="container">
              <h2 className="section-title text-center">Cursos Mais Vendidos</h2>
              <p className="section-subtitle text-center">
                Os cursos mais populares escolhidos por nossa comunidade
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                <a href="/curso/desenvolvimento-web-full-stack" className="block">
                  <div className="course-card">
                    <img src="https://images.unsplash.com/photo-1547658719-da2b51169166?auto=format&fit=crop&w=800" alt="Curso de Web Development" className="course-card-image" />
                    <div className="course-card-content">
                      <div className="course-card-rating">
                        {[...Array(5)].map((_, i) => (
                          <AiFillStar key={i} />
                        ))}
                        <span className="ml-2 text-gray-600">(2.945)</span>
                      </div>
                      <h3 className="course-card-title">Desenvolvimento Web Full Stack</h3>
                      <p className="course-card-instructor">
                        <FaUserGraduate className="inline mr-2" />
                        Prof. André Santos
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="course-card-price">R$ 399,90</p>
                        <p className="course-card-students">
                          <FaUserGraduate className="inline mr-1" />
                          15.234 alunos
                        </p>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="/curso/python-para-data-science" className="block">
                  <div className="course-card">
                    <img src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&w=800" alt="Curso de Python" className="course-card-image" />
                    <div className="course-card-content">
                      <div className="course-card-rating">
                        {[...Array(5)].map((_, i) => (
                          <AiFillStar key={i} />
                        ))}
                        <span className="ml-2 text-gray-600">(1.847)</span>
                      </div>
                      <h3 className="course-card-title">Python para Data Science</h3>
                      <p className="course-card-instructor">
                        <FaUserGraduate className="inline mr-2" />
                        Profa. Marina Lima
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="course-card-price">R$ 349,90</p>
                        <p className="course-card-students">
                          <FaUserGraduate className="inline mr-1" />
                          12.543 alunos
                        </p>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="/curso/ui-ux-design-masterclass" className="block">
                  <div className="course-card">
                    <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800" alt="Curso de UI/UX" className="course-card-image" />
                    <div className="course-card-content">
                      <div className="course-card-rating">
                        {[...Array(5)].map((_, i) => (
                          <AiFillStar key={i} />
                        ))}
                        <span className="ml-2 text-gray-600">(1.532)</span>
                      </div>
                      <h3 className="course-card-title">UI/UX Design Masterclass</h3>
                      <p className="course-card-instructor">
                        <FaUserGraduate className="inline mr-2" />
                        Prof. Carlos Oliveira
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="course-card-price">R$ 299,90</p>
                        <p className="course-card-students">
                          <FaUserGraduate className="inline mr-1" />
                          9.876 alunos
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

          {/* Cursos Mais Recentes */}
          <section className="py-16 bg-white">
            <div className="container">
              <h2 className="section-title text-center">Cursos Mais Recentes</h2>
              <p className="section-subtitle text-center">
                Últimas adições ao nosso catálogo de cursos
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                <a href="/curso/react-native-apps-mobile" className="block">
                  <div className="course-card">
                    <img src="https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800" alt="Curso de React Native" className="course-card-image" />
                    <div className="course-card-content">
                      <div className="flex items-center mb-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                          <FaClock className="mr-1" />
                          Novo
                        </span>
                      </div>
                      <h3 className="course-card-title">React Native: Apps Mobile</h3>
                      <p className="course-card-instructor">
                        <FaUserGraduate className="inline mr-2" />
                        Prof. Lucas Mendes
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="course-card-price">R$ 449,90</p>
                        <p className="course-card-students">
                          <FaUserGraduate className="inline mr-1" />
                          1.234 alunos
                        </p>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="/curso/machine-learning-na-pratica" className="block">
                  <div className="course-card">
                    <img src="https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800" alt="Curso de Machine Learning" className="course-card-image" />
                    <div className="course-card-content">
                      <div className="flex items-center mb-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                          <FaClock className="mr-1" />
                          Novo
                        </span>
                      </div>
                      <h3 className="course-card-title">Machine Learning na Prática</h3>
                      <p className="course-card-instructor">
                        <FaUserGraduate className="inline mr-2" />
                        Prof. Rafael Costa
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="course-card-price">R$ 499,90</p>
                        <p className="course-card-students">
                          <FaUserGraduate className="inline mr-1" />
                          876 alunos
                        </p>
                      </div>
                    </div>
                  </div>
                </a>

                <a href="/curso/aws-cloud-computing" className="block">
                  <div className="course-card">
                    <img src="https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800" alt="Curso de AWS" className="course-card-image" />
                    <div className="course-card-content">
                      <div className="flex items-center mb-2">
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                          <FaClock className="mr-1" />
                          Novo
                        </span>
                      </div>
                      <h3 className="course-card-title">AWS Cloud Computing</h3>
                      <p className="course-card-instructor">
                        <FaUserGraduate className="inline mr-2" />
                        Profa. Ana Beatriz
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <p className="course-card-price">R$ 399,90</p>
                        <p className="course-card-students">
                          <FaUserGraduate className="inline mr-1" />
                          654 alunos
                        </p>
                      </div>
                    </div>
                  </div>
                </a>
              </div>
            </div>
          </section>

        {/* Categories Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Explore por Categoria</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Encontre cursos que se adequam aos seus interesses e objetivos profissionais
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categories.map((category) => (
                <a 
                  key={category.id} 
                  href={`/categorias/${category.id}`}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow flex flex-col items-center text-center"
                >
                  <span className="text-4xl mb-3">{category.icon}</span>
                  <h3 className="font-semibold text-lg mb-1">{category.name}</h3>
                  <p className="text-gray-500 text-sm">{category.count} cursos</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        

        {/* Features Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Por que escolher o Bora Cursos?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Oferecemos uma experiência de aprendizado completa e flexível
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-primary text-4xl mb-4">
                  <FaGraduationCap />
                </div>
                <h3 className="text-xl font-semibold mb-3">Instrutores Especialistas</h3>
                <p className="text-gray-600">
                  Aprenda com profissionais que atuam no mercado e compartilham experiências reais.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-primary text-4xl mb-4">
                  <FaCertificate />
                </div>
                <h3 className="text-xl font-semibold mb-3">Certificados Reconhecidos</h3>
                <p className="text-gray-600">
                  Receba certificados que podem ser usados para comprovar suas habilidades.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="text-primary text-4xl mb-4">
                  <FaHeadset />
                </div>
                <h3 className="text-xl font-semibold mb-3">Suporte Personalizado</h3>
                <p className="text-gray-600">
                  Nossa equipe está sempre disponível para ajudar com suas dúvidas.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Plano Ilimitado */}
        <section className="unlimited-plan-section">
            <div className="unlimited-plan-shapes">
              <div className="unlimited-plan-shape unlimited-plan-shape-1"></div>
              <div className="unlimited-plan-shape unlimited-plan-shape-2"></div>
            </div>
            <div className="container">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold text-white mb-2">
                    Acesso Ilimitado a Todos os Cursos
                  </h2>
                  <p className="text-lg text-gray-100">
                    Desbloqueie todo o potencial da sua carreira
                  </p>
                </div>

                <div className="unlimited-plan-card">
                  <div className="text-center">
                    <span className="unlimited-plan-badge">
                      <FaCrown className="mr-1" />
                      Mais Popular
                    </span>

                    <h3 className="text-xl font-bold text-gray-800 mb-2">Plano Ilimitado</h3>
                    <div className="unlimited-plan-price">
                      <span className="unlimited-plan-price-currency">R$</span>
                      79,90
                      <span className="unlimited-plan-price-period">/mês</span>
                    </div>
                    <p className="text-sm text-gray-600">Cancele quando quiser</p>
                  </div>

                  <div className="unlimited-plan-features">
                    <div className="unlimited-plan-feature">
                      <FaInfinity className="unlimited-plan-feature-icon" />
                      <span>Acesso ilimitado a todos os cursos</span>
                    </div>
                    <div className="unlimited-plan-feature">
                      <FaRocket className="unlimited-plan-feature-icon" />
                      <span>Conteúdo novo semanalmente</span>
                    </div>
                    <div className="unlimited-plan-feature">
                      <FaGraduationCap className="unlimited-plan-feature-icon" />
                      <span>Certificados ilimitados</span>
                    </div>
                    <div className="unlimited-plan-feature">
                      <FaHeadphones className="unlimited-plan-feature-icon" />
                      <span>Suporte prioritário 24/7</span>
                    </div>
                    <div className="unlimited-plan-feature">
                      <FaMobileAlt className="unlimited-plan-feature-icon" />
                      <span>Acesso em todos dispositivos</span>
                    </div>
                    <div className="unlimited-plan-feature">
                      <FaCheck className="unlimited-plan-feature-icon" />
                      <span>Downloads para estudar offline</span>
                    </div>
                  </div>

                  <button className="unlimited-plan-button">
                    Começar Agora
                    <span className="ml-2">→</span>
                  </button>

                  <p className="text-center text-xs text-gray-500 mt-2">
                    7 dias de garantia de reembolso total
                  </p>
                </div>
              </div>
            </div>
          </section>

        {/* Testimonials Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">O que nossos alunos dizem</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Histórias reais de pessoas que transformaram suas carreiras com nossos cursos
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image} 
                      alt={testimonial.name} 
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h3 className="font-semibold">{testimonial.name}</h3>
                      <p className="text-gray-500 text-sm">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        
      </main>

      {/* Footer
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bora Cursos</h3>
              <p className="text-gray-400 mb-4">
                Transformando vidas através da educação de qualidade.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Cursos</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Todos os Cursos</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Categorias</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Instrutores</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cursos em Destaque</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Novos Cursos</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Empresa</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Sobre Nós</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Carreiras</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Contato</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Parcerias</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Suporte</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Central de Ajuda</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">FAQ</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Política de Privacidade</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Termos de Uso</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Política de Reembolso</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} Bora Cursos. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}; 