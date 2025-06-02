import { Link } from "react-router";
import logo from "../../assets/green-logo.png";

const Home = () => {
    return (
        <div
            className="d-flex justify-content-center align-items-center min-vh-100 p-3"
            style={{ background: "#A3B18A" }}
        >
            <div
                className="bg-white p-4 p-md-5 rounded-4 shadow"
                style={{ width: "100%", maxWidth: "420px", textAlign: "center" }}
            >
                <div className="d-flex justify-content-center mb-4">
                    <img
                        src={logo}
                        alt="Logo Faculdade Esuda"
                        style={{ maxWidth: "160px", maxHeight: "70px" }}
                    />
                </div>
                <div className="d-grid gap-3">
                    <Link
                        to="/login"
                        className="btn fw-semibold py-3 fs-6 shadow d-flex align-items-center justify-content-center gap-2 rounded-3"
                        style={{ background: "#277DA1", color: "white" }}
                    >
                        <i className="bi bi-person-fill"></i>
                        Acesso Administrativo
                    </Link>
                    <Link
                        to="/certificados/validar"
                        className="btn fw-semibold py-3 fs-6 shadow d-flex align-items-center justify-content-center gap-2 rounded-3"
                        style={{ background: "#43AA8B", color: "white" }}
                    >
                        <i className="bi bi-file-earmark-text-fill"></i>
                        Consultar e Imprimir Certificados
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;