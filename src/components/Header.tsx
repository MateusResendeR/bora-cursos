import { FaSearch, FaShoppingCart, FaBars } from 'react-icons/fa';

export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-logo">
            <a href="/" className="header-logo-text">
              <span className="header-logo-text-primary">Bora</span>
              <span className="header-logo-text-dark">Cursos</span>
            </a>
          </div>

          <nav className="header-nav">
            <a href="/categorias" className="header-nav-link hover:text-primary transition-colors">
              Categorias
            </a>
            <a href="/mais-populares" className="header-nav-link">Mais Populares</a>
            <a href="/instrutores" className="header-nav-link">Instrutores</a>
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
            <a href="/carrinho" className="header-action-button">
              <FaShoppingCart className="header-action-icon" />
              <span className="header-action-text">Carrinho</span>
            </a>
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