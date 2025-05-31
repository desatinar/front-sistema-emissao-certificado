import { useState } from "react";
import logo from "../../../assets/green-logo.png";
import { Link } from "react-router";

const Form = ({ navigate }) => {
    const [form, setForm] = useState({ email: "", password: "" });

    const emailTest = "teste@email.com";
    const passwordTest = "123456";

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const login = (e) => {
        e.preventDefault();
        const { email, password } = form;

        if (email === emailTest && password === passwordTest) {
            localStorage.setItem("token", "teste");
            navigate("/dashboard");
        } else {
            alert("Credenciais incorretas");
        }
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
                <form onSubmit={(e) => login(e)}>
                    <div className="mb-3">
                        <label className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control rounded-3"
                            name="email"
                            value={form.email}
                            onChange={onChange}
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
                    >
                        Entrar
                    </button>
                    <p className="mt-4 text-center">
                        Não possui uma conta?
                        <Link
                            to="/signup"
                            className="btn btn-link ms-1 p-0"
                            style={{ textDecoration: "none" }}
                        >
                            Criar
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Form;
