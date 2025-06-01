import { useState } from "react";
import logo from "../../../assets/green-logo.png";
import { Link } from "react-router";
import { login } from "../../../api/admin";

const Form = ({ navigate }) => {
    const [form, setForm] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false)

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleLogin = (e) => {
        const loginInfo = {
            email: form.email,
            password: form.password,
            navigate,
        }
        login(e, loginInfo, setLoading)
    }

    return (
        <div
            className="d-flex justify-content-center align-items-center min-vh-100 p-3"
            style={{ background: "#A3B18A" }}
        >
            <div
                className="bg-white p-4 p-md-5 rounded-4 shadow"
                style={{ width: "100%", maxWidth: "420px" }}
            >
                <div className="d-flex justify-content-center mb-4">
                    <img
                        src={logo}
                        alt="Logo Faculdade Esuda"
                        style={{ maxWidth: "160px" }}
                    />
                </div>
                <h2 className="mb-4 fs-4 text-center fw-semibold">Login</h2>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control rounded-3"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control rounded-3"
                            name="password"
                            value={form.password}
                            onChange={onChange}
                            disabled={loading}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn w-100 text-white rounded-3 mt-3"
                        style={{
                            backgroundColor: '#F9844A',
                            borderColor: '#F9844A',
                            height: "48px"
                        }}
                        disabled={loading}
                    >
                        {loading ? (
                            <div class="text-center">
                                <div class="spinner-border" role="status">
                                    <span class="visually-hidden">Carregando...</span>
                                </div>
                            </div>
                        ) : null}
                        Entrar
                    </button>
                    <div className="text-center mt-3 pt-3 border-top">
                        <Link
                            to="/"
                            className="btn btn-link text-secondary text-decoration-none"
                        >
                            Voltar para a página inicial
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Form;
