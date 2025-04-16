import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section footer-brand">
          <h2 className="text-2xl font-bold">
            <span className="text-primary">Bora</span>
            <span className="text-white">Cursos</span>
          </h2>
          <p className="footer-brand-description">
            Transformando vidas através da educação de qualidade.
          </p>
          <div className="footer-social">
            <a href="#" className="footer-social-link">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="footer-social-link">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="footer-social-link">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="footer-social-link">
              <FaGithub size={20} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Cursos</h3>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Todos os Cursos</a></li>
            <li><a href="#" className="footer-link">Categorias</a></li>
            <li><a href="#" className="footer-link">Instrutores</a></li>
            <li><a href="#" className="footer-link">Cursos em Destaque</a></li>
            <li><a href="#" className="footer-link">Novos Cursos</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Empresa</h3>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Sobre Nós</a></li>
            <li><a href="#" className="footer-link">Carreiras</a></li>
            <li><a href="#" className="footer-link">Blog</a></li>
            <li><a href="#" className="footer-link">Contato</a></li>
            <li><a href="#" className="footer-link">Parcerias</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3 className="footer-title">Suporte</h3>
          <ul className="footer-list">
            <li><a href="#" className="footer-link">Central de Ajuda</a></li>
            <li><a href="#" className="footer-link">FAQ</a></li>
            <li><a href="#" className="footer-link">Política de Privacidade</a></li>
            <li><a href="#" className="footer-link">Termos de Uso</a></li>
            <li><a href="#" className="footer-link">Política de Reembolso</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-bottom-content">
          © {new Date().getFullYear()} Bora Cursos. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer; 