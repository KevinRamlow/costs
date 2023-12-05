import Home from './components/pages/Home';
import Company from './components/pages/Company';
import Contact from './components/pages/Contact';
import Projects from './components/pages/Projects';
import NavBar from './components/layout/navBar/NavBar';
import NewProject from './components/pages/NewProject';
import Footer from './components/layout/footer/Footer';
import Container from './components/layout/container/Container';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <NavBar />

      <Container customClass='min_height'>
        <Routes>
          <Route exact path='/' element={<Home />}></Route>
          <Route exact path='/projects' element={<Projects />}></Route>
          <Route exact path='/company' element={<Company />}></Route>
          <Route exact path='/contact' element={<Contact />}></Route>
          <Route exact path='/newproject' element={<NewProject />}></Route>
        </Routes>
      </Container>
      
      <Footer />
    </Router>
  );
}

export default App;
