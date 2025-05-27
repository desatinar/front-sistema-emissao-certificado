import { useState } from "react";
import logo from "../../../assets/logo.png";

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

    const goToSignupPage = () => navigate('/signup');

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center min-vh-100"
            style={{ background: '#A3B18A' }}
        >
            <img
                src={logo}
                alt="Logo"
                className="mb-4"
                style={{ maxWidth: '250px' }}
            />
            <div
                className="bg-white p-4 rounded shadow"
                style={{ width: '80%', maxWidth: '500px' }}
            >
                <h2 className="mb-4 fs-4 text-center">Login</h2>
                <form onSubmit={(e) => login(e)}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={form.password}
                            onChange={onChange}
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn w-100 mt-4 text-white"
                        style={{ backgroundColor: '#F9844A', borderColor: '#F9844A' }}
                        // onClick={(e) => login(e)}
                    >Entrar</button>
                    <p className="mt-3 text-center">
                        Não possui uma conta?
                        <a
                            type="button"
                            className="btn btn-link"
                            onClick={goToSignupPage}
                        >Criar
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Form;
