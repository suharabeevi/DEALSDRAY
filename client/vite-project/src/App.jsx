import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Allemployerlist from "./pages/Allemployerlist";
import DashBoardpages from "./pages/DashBoardpages";
import EmployeCreateForm from "./pages/EmployeCreateForm";
import UpdateEmployer from "./pages/UpdateEmployer";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          {/* <Route path="/*" exact element={<RegisterComponent/>}/> */}
          <Route path="/" element={<AdminLogin/>} />

          <Route path="/home" element={<DashBoardpages />} />
          <Route path="/login" element={<AdminLogin />} />
          <Route path="/EmployerList" element={<Allemployerlist />} />
          <Route path="/editEmployee/:EmpId" exact element={<UpdateEmployer />} />

          <Route
            path="/createEmployee*"
            exact
            element={<EmployeCreateForm />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
