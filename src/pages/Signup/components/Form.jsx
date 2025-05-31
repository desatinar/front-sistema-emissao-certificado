import { Link } from "react-router";
import logo from "../../../assets/green-logo.png";

const Form = () => {

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
                <h2 className="mb-4 fs-4 text-center fw-semibold">Criar nova conta</h2>
                <form >
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input 
                            type="text" 
                            className="form-control rounded-3" 
                            id="name" 
                            name="name" 
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input 
                            type="email" 
                            className="form-control rounded-3" 
                            id="email" 
                            name="email"
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input 
                            type="password" 
                            className="form-control rounded-3" 
                            id="password" 
                            name="password"
                        />
                        <small className="text-muted">Use 8 ou mais caracteres</small>
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
                        Criar uma conta
                    </button>
                    <p className="mt-4 text-center">
                        Já possui uma conta?
                        <Link
                            to="/login"
                            className="btn btn-link ms-1 p-0"
                            style={{ textDecoration: "none" }}
                        >
                            Entrar
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Form;
