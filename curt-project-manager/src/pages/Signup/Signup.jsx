import "./Signup.css"
import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAppContext } from "../../context/useAppContext.js";
function Signup() {
    const navigate = useNavigate();
    const { signup } = useAppContext();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");

        if (name.trim() === "" || email.trim() === "" || password === "") {
            setError("All fields are required");
            return;
        }
        if (password !== confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        setSubmitting(true);
        const result = await signup({ name: name.trim(), email: email.trim(), password });
        setSubmitting(false);

        if (!result.success) {
            setError(result.error);
            return;
        }

        navigate("/projects");
    }

    return (
        <div className="auth-page">
        <div className="auth-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="signup-name">Name</label>
                <input id="signup-name" type="text"
    autoComplete="name" value={name} onChange={(e) => setName(e.target.value)} />

                <label htmlFor="signup-email">Email</label>
                <input id="signup-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} />

                <label htmlFor="signup-password">Password</label>
                <input id="signup-password" type="password" autoComplete="new-password" value={password} onChange={(e) => setPassword(e.target.value)} />

                <label htmlFor="signup-confirm">Confirm password</label>
                <input id="signup-confirm" type="password" value={confirmPassword} autoComplete="new-password" onChange={(e) => setConfirmPassword(e.target.value)} />

                {error && <p role="alert">{error}</p>}

                <button type="submit" disabled={submitting}>
                    {submitting ? "Signing up..." : "Sign up"}
                </button>
            </form>
            <p>
                Already have an account? <Link to="/login">Login</Link>
            </p>
        </div>
        </div>
    );
}

export default Signup;