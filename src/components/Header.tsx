
export function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-content">
          <div className="header-logo cursor-pointer" onClick={() => window.location.href = '/'}>
            <img src={'/boracursos.png'} alt="Logo" className="w-[100px]" />
          </div>

          <div className="header-actions">
            <a href="/entrar" className="btn btn-primary">
              Entrar
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header; 