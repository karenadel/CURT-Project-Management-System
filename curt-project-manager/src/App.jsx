import Layout from "./components/layout/Layout";

import Projects from "./pages/Projects/Projects";
import ProjectsDetails from "./pages/ProjectsDetails/ProjectsDetails";
import Tasks from "./pages/Tasks/Tasks";
import TasksDetails from "./pages/TasksDetails/TasksDetails";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="*" element=/>    make a page not found for anyy invalid url
        
        we also need sth that handles a valid id but if theres no page to render
        */}
        <Route path="/" element={<Login/>}/>

        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>

        <Route element={<Layout/>}>
          <Route path="/projects" element={<Projects/>}/>
          <Route path="/projects/:projectId" element={<ProjectsDetails/>}/>

          <Route path="/tasks" element={<Tasks/>}/>
          <Route path="/tasks/:taskId" element={<TasksDetails/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;