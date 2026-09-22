import Layout from "./components/layout/Layout";
import Projects from "./pages/Projects/Projects";
import ProjectsDetails from "./pages/ProjectsDetails/ProjectsDetails";
import Tasks from "./pages/Tasks/Tasks";
import TasksDetails from "./pages/TasksDetails/TasksDetails";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import NotFound from "./components/common/NotFound";
import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import ProtectedRoute from "./auth/ProtectedRoute";
import PublicRoute from "./auth/PublicRoute";

function App() {
  return (
    <BrowserRouter>
            <Routes>
                <Route
                    path="*"
                    element={
                        <NotFound
                            message="Page not found."
                            backTo="/projects"
                        />
                    }
                />
                <Route
                    path="/"
                    element={<Navigate to="/projects" replace />}
                />
                <Route element={<PublicRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                </Route>
                <Route element={<ProtectedRoute />}>
                    <Route element={<Layout />}>
                        <Route path="/projects" element={<Projects />} />
                        <Route
                            path="/projects/:projectId"
                            element={<ProjectsDetails />}
                        />
                        <Route path="/tasks" element={<Tasks />} />
                        <Route
                            path="/tasks/:taskId"
                            element={<TasksDetails />}
                        />
                    </Route>
                </Route>
            </Routes>
        </BrowserRouter>
  );
}
export default App;