import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './screen/Home/Home';
import Application from './screen/Application';
import ApplicationHistory from './screen/ApplicationHistory/ApplicationHistory';
import Admin from './screen/Admin/Admin';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/application' element={<Application />} />
        <Route path='/applicationhistory' element={<ApplicationHistory />} />
        <Route path='/admin' element={<Admin />} />
      </Routes>
    </Router>
  );
}

export default App;
