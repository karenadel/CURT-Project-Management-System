import { Link,NavLink } from "react-router-dom";
function Navbar() {
    return (
        <nav>
        <Link to="/projects">Project Manager</Link>

        <div>
            <NavLink to="/projects" className={({isActive}) => (isActive ? "active" : "")}>
                Projects
            </NavLink>
            <NavLink to="/tasks" className={({isActive}) => (isActive ? "active" : "")}>
                Tasks
            </NavLink>
            <NavLink to="/login" className={({isActive}) => (isActive ? "active" : "")}>
                Login
            </NavLink>
            <NavLink to="/signup" className={({isActive}) => (isActive ? "active" : "")}>
                Sign Up
            </NavLink>
        </div>
        </nav>
    );
}
export default Navbar;
