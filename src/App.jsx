import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Story from './pages/Story';
import Compare from './pages/Compare';
import Quiz from './pages/Quiz';
import Sources from './pages/Sources';
import NotFound from './pages/NotFound';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/story/:id" element={<Story />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/sources" element={<Sources />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
