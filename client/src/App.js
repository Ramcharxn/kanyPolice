import logo from './logo.svg';
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './hospital/pages/Home';
import Details from './hospital/pages/NewReport';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/hospital/new_report' element={<Details />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
