import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import Footer from './components/Footer';
import { Home } from './pages/Home';
import { Categories } from './pages/Categories';
import { CategoryCourses } from './pages/CategoryCourses';
import { CourseDetail } from './pages/CourseDetail';

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/categorias" element={<Categories />} />
          <Route path="/categoria/:slug/:categoryId" element={<CategoryCourses />} />
          <Route path="/curso/:slug" element={<CourseDetail />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
