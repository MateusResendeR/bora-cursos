import { useEffect, useState } from 'react';
import { Category } from '../types/Category';
import categoryService from '../services/api/categoryService';

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [visibleCategories, setVisibleCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(1);
  const categoriesPerPage = 6;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await categoryService.getCategories();
        
        if (response) {
          // Filter out categories without description or with empty title or slug
          const validCategories = response.filter(cat => 
            cat.category_title && 
            cat.category_slug &&
            cat.category_description !== null
          );
          setCategories(validCategories);
          // Set initial visible categories (first 6)
          setVisibleCategories(validCategories.slice(0, categoriesPerPage));
        } else {
          setError('Falha ao carregar categorias');
        }
      } catch (err) {
        setError('Erro ao conectar com o servidor');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const loadMoreCategories = () => {
    const nextPage = page + 1;
    const nextCategories = categories.slice(0, nextPage * categoriesPerPage);
    setVisibleCategories(nextCategories);
    setPage(nextPage);
  };

  const hasMoreCategories = visibleCategories.length < categories.length;

  return (
    <main className="page-container py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Categorias</h2>
          <p className="section-subtitle">
            Explore nosso catálogo de cursos por categoria e encontre o conteúdo perfeito para você
          </p>
        </div>
        
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
        
        {!loading && !error && categories.length === 0 && (
          <div className="text-center text-gray-500">
            <p>Nenhuma categoria encontrada</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleCategories.map((category) => (
            <a 
              key={category.category_id} 
              href={`/categoria/${category.category_slug}/${category.category_id}`}
              className="category-card flex flex-col"
            >
              <div className="h-40 overflow-hidden rounded-t-lg">
                <img 
                  src={category.category_image} 
                  alt={category.category_title}
                  className="w-full h-full object-cover transition-transform duration-300 transform hover:scale-105"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="category-name mb-2">{category.category_title}</h3>
                {category.category_description && (
                  <p className="text-gray-600 mb-4 line-clamp-2">{category.category_description}</p>
                )}
                <div className="mt-auto flex justify-between items-center">
                  <span className="category-count text-sm text-gray-500">
                    {category.category_courses_total} {category.category_courses_total === 1 ? 'curso' : 'cursos'}
                  </span>
                  <span className="text-primary font-medium">
                    Explorar →
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {hasMoreCategories && !loading && (
          <div className="flex justify-center mt-12">
            <button
              onClick={loadMoreCategories}
              className="btn btn-primary px-6 py-3"
            >
              Mostrar mais
            </button>
          </div>
        )}
      </div>
    </main>
  );
}

export default Categories; 