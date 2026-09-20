import {Link} from "react-router-dom";
function Navbar(){
    return(
        <nav>
            <div>
                <Link to="/projects">Project Manager</Link>
            </div>

            <div>
                <Link to="/projects">Projects</Link>
                <Link to="/tasks">Tasks</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
            </div>
        </nav>
    );
}
export default Navbar;