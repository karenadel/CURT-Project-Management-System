import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link className="navbar-brand" to="/projects">
        Project Manager
      </Link>
      <div className="navbar-links">
        <NavLink
          to="/projects"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Projects
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Tasks
        </NavLink>

        <NavLink
          to="/login"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Login
        </NavLink>

        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          Sign Up
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
