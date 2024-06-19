// export default function App() {
//   return (
//     <h1 className="text-3xl font-bold underline">
//       Hello world!
//     </h1>
//   )
// }
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import Login from "./components/admin/Login";
import CreateEmployee from "./components/admin/CreateEmployee";
import EmployerList from "./components/admin/EmployerList";
import Dashboard from "./components/admin/Dashboard";
import EditEmployerForm from "./components/admin/EditEmployerForm";


function App() {
  return (
    <div>
      <Router>
  <Routes>
  {/* <Route path="/*" exact element={<RegisterComponent/>}/> */}
  
  <Route path="/home*" element={<Dashboard/>}/>
  <Route path="/login*" element={<Login/>}/>
  <Route path="/EmployerList*" element={<EmployerList/>}/>
  <Route path="/editEmployee*" exact element={<EditEmployerForm/>}/>


  <Route path="/createEmployee*" exact element={<CreateEmployee/>}/>

  </Routes>
</Router>
    </div>
  )
}

export default App

