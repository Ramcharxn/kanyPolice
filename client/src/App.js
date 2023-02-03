import './App.css'
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Hospital from './hospital/HospitalHome';
import NewReport from './hospital/NewReport';
import ViewReport from './police/ViewReport';
import Login from './component/Login';
import Police from './police/PoliceHome';
import ViewReportHos from './hospital/ViewReportHos';
import SignUp from './component/SignUp';

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>

        <Route path='/hospital' element={<Hospital />}></Route>
        <Route path='/hospital/new_report' element={<NewReport />}></Route>
        <Route path='/hospital/view_report/:report_id' element={<ViewReportHos />}></Route>
        
        <Route path='/police' element={<Police />}></Route>
        <Route path='/police/view_report/:report_id' element={<ViewReport />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
