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


function App() {
  return (
    <div>
      <Router>
  <Routes>
  {/* <Route path="/*" exact element={<RegisterComponent/>}/> */}
  
  <Route path="/login*" element={<Login/>}/>
  <Route path="/createEmployee*" exact element={<CreateEmployee/>}/>

  </Routes>
</Router>
    </div>
  )
}

export default App

