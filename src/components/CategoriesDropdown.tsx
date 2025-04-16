import { useState } from 'react';
import { FaSearch, FaTimes, FaGamepad, FaBuilding, FaTree, FaPaintBrush, FaHardHat, FaPalette, 
         FaMicroscope, FaGavel, FaCalculator, FaHome, FaUtensils, FaGraduationCap, FaBriefcase, 
         FaUser, FaBalanceScale, FaBirthdayCake, FaChalkboardTeacher, FaRunning, FaNotesMedical, 
         FaSpinner, FaHotel, FaPrescriptionBottleAlt, FaPiggyBank, FaHandHoldingHeart, FaCamera, 
         FaUsers, FaLanguage, FaLaptop, FaSuitcase, FaTruck, FaStethoscope, FaLeaf, FaGuitar, 
         FaAppleAlt, FaTooth, FaCode, FaBrain, FaBullhorn, FaUserTie, FaHardHat as FaSafety, 
         FaHandshake, FaDog } from 'react-icons/fa';

interface Category {
  name: string;
  slug: string;
  icon: React.ComponentType;
}

const categories: Category[] = [
  { name: "3D e Games", slug: "3d-e-games", icon: FaGamepad },
  { name: "Administração", slug: "administracao", icon: FaBuilding },
  { name: "Ambiental", slug: "ambiental", icon: FaTree },
  { name: "Animações e Design", slug: "animacoes-e-design", icon: FaPaintBrush },
  { name: "Arquitetura e Engenharia", slug: "arquitetura-e-engenharia", icon: FaHardHat },
  { name: "Artesanato", slug: "artesanato", icon: FaPalette },
  { name: "Biomedicina", slug: "biomedicina", icon: FaMicroscope },
  { name: "Concursos Públicos", slug: "concursos-publicos", icon: FaGavel },
  { name: "Contabilidade", slug: "contabilidade", icon: FaCalculator },
  { name: "Cotidiano", slug: "cotidiano", icon: FaHome },
  { name: "Culinária e Gastronomia", slug: "culinaria-gastronomia", icon: FaUtensils },
  { name: "Cursinho Pré-Vestibular", slug: "cursinho-pre-vestibular", icon: FaGraduationCap },
  { name: "Cursos Profissionalizantes", slug: "profissionalizantes", icon: FaBriefcase },
  { name: "Desenvolvimento Pessoal", slug: "desenvolvimento-pessoal", icon: FaUser },
  { name: "Direito", slug: "direito", icon: FaBalanceScale },
  { name: "Doces e Confeitaria", slug: "doces-confeitaria", icon: FaBirthdayCake },
  { name: "Educação e Pedagogia", slug: "educacao-e-pedagogia", icon: FaChalkboardTeacher },
  { name: "Educação Física e Esporte", slug: "educacao-fisica-e-esporte", icon: FaRunning },
  { name: "Enfermagem", slug: "enfermagem", icon: FaNotesMedical },
  { name: "Estética e Beleza", slug: "estetica-e-beleza", icon: FaSpinner },
  { name: "Evento, Turismo e Hotelaria", slug: "evento-turismo-e-hotelaria", icon: FaHotel },
  { name: "Farmácia", slug: "farmacia", icon: FaPrescriptionBottleAlt },
  { name: "Finanças", slug: "financas", icon: FaPiggyBank },
  { name: "Fisioterapia", slug: "fisioterapia", icon: FaHandHoldingHeart },
  { name: "Fotografia e Vídeo", slug: "fotografia-e-video", icon: FaCamera },
  { name: "Gestão e Liderança", slug: "gestao-e-lideranca", icon: FaUsers },
  { name: "Idiomas", slug: "idiomas", icon: FaLanguage },
  { name: "Informática", slug: "informatica", icon: FaLaptop },
  { name: "Iniciação Profissional", slug: "iniciacao-profissional", icon: FaSuitcase },
  { name: "Logística", slug: "logistica", icon: FaTruck },
  { name: "Medicina", slug: "medicina", icon: FaStethoscope },
  { name: "Medicina Integrativa", slug: "medicina-alternativa", icon: FaLeaf },
  { name: "Música e Instrumentos", slug: "musica-e-instrumentos", icon: FaGuitar },
  { name: "Nutrição", slug: "nutricao", icon: FaAppleAlt },
  { name: "Odontologia", slug: "odontologia", icon: FaTooth },
  { name: "Programação e Desenvolvimento", slug: "programacao-e-desenvolvimento", icon: FaCode },
  { name: "Psicologia", slug: "psicologia", icon: FaBrain },
  { name: "Publicidade e Marketing", slug: "publicidade-marketing", icon: FaBullhorn },
  { name: "Recursos Humanos", slug: "recursos-humanos", icon: FaUserTie },
  { name: "Segurança do Trabalho", slug: "seguranca-trabalho", icon: FaSafety },
  { name: "Vendas", slug: "vendas", icon: FaHandshake },
  { name: "Veterinária", slug: "veterinaria", icon: FaDog },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export function CategoriesDropdown({ isOpen, onClose }: Props) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`categories-dropdown ${isOpen ? 'open' : ''}`} onClick={onClose}>
      <div className="categories-content" onClick={e => e.stopPropagation()}>
        <div className="categories-header">
          <h2 className="categories-title">Todas as Categorias</h2>
          <button onClick={onClose} className="categories-close">
            <FaTimes className="w-6 h-6 text-gray-400 hover:text-gray-600" />
          </button>
        </div>

        <div className="categories-search">
          <FaSearch className="categories-search-icon" />
          <input
            type="text"
            placeholder="Buscar categoria..."
            className="categories-search-input"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="categories-grid">
          {filteredCategories.map(category => {
            const Icon = category.icon;
            return (
              <a
                key={category.slug}
                href={`/boracursos/${category.slug}`}
                className="category-link"
              >
                <div className="category-icon">
                  <Icon />
                </div>
                <span className="category-text">{category.name}</span>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default CategoriesDropdown; 