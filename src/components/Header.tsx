import { FaSearch, FaBars } from 'react-icons/fa';

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-logo cursor-pointer" onClick={() => window.location.href = '/'}>
            <img src={'/boracursos.png'} alt="Logo" className="w-[100px]" />
          </div>

          <nav className="header-nav">
            <a href="/categorias" className="header-nav-link hover:text-primary transition-colors">
              Categorias
            </a>
          </nav>

          <div className="header-search">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar cursos..."
                className="header-search-input"
              />
              <FaSearch className="header-search-icon" />
            </div>
          </div>

          <div className="header-actions">
            <a href="/entrar" className="btn btn-primary">
              Entrar
            </a>
          </div>

          <button className="header-mobile-menu-button">
            <FaBars className="text-2xl" />
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header; 