import Home from './components/pages/home/Home';
import NavBar from './components/layout/navBar/NavBar';
import Footer from './components/layout/footer/Footer';
import Projects from './components/pages/projects/Projects';
import Container from './components/layout/container/Container';
import NewProject from './components/pages/newProject/NewProject';
import ProjectPage from './components/pages/projectPage/ProjectPage';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />

      <Container customClass='min_height'>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route path='/projects' element={<Projects />}></Route>
          <Route path='/newproject' element={<NewProject />}></Route>
          <Route path='/project/:id' element={<ProjectPage />}></Route>
        </Routes>
      </Container>

      <Footer />
    </Router>
  );
}

export default App;
