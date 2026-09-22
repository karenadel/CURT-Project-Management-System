import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext.js";
import "./Login.css";

function Login() {
    const navigate = useNavigate();
    const { login } = useAppContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    async function handleSubmit(e) {
        e.preventDefault();
        if (email.trim() === "" || password === "") {
            setError("Email and password are required");
            return;
        }
        const success = await login(email.trim(), password);
        if (!success) {
            setError("Invalid email or password");
            return;
        }
        navigate("/projects");
    }

    return (
        <div className="auth-page">
        <div className="auth-container">
            <h2>Login</h2>

            <form onSubmit={handleSubmit}>
                <label htmlFor="login-email">Email</label>

                <input
                    id="login-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <label htmlFor="login-password">Password</label>

                <input
                    id="login-password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {error && <p role="alert">{error}</p>}

                <button type="submit">
                    Login
                </button>
            </form>

            <p>
                Don't have an account?{" "}
                <Link to="/signup">Sign up</Link>
            </p>
        </div>
        </div>
    );
}

export default Login;

