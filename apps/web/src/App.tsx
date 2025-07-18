import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import EditorPage from './pages/Editorpage';
import Projectpage from './pages/Projectspage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor/:projectId" element={<EditorPage />} />
        <Route path="/projects" element={<Projectpage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;