import { Link } from "react-router";
import logo from "../../assets/green-logo.png";

const Home = () => {

    return (
        <div className="d-flex flex-column justify-content-center align-items-center min-vh-100"
            style={{ background: "#A3B18A" }}
        >
            <div className="bg-white p-4 p-md-5 rounded-3 shadow text-center" style={{ maxWidth: "500px", width: "90%" }}>
                <img 
                    src={logo} 
                    alt="Logo Faculdade Esuda" 
                    className="img-fluid mb-4" 
                    style={{ maxHeight: "70px" }} 
                />
                <h2 className="h4 fw-bold text-secondary mb-4">
                    Portal de Certificados
                </h2>

                <div className="d-grid gap-3">
                    <Link
                        to="/login"
                        className="btn fw-semibold py-3 fs-6 shadow d-flex align-items-center justify-content-center gap-2"
                        style={{background: "#277DA1", color: "white" }}
                    >
                        <i className="bi bi-person-fill"></i>
                        Acesso Administrativo
                    </Link>

                    <Link
                        to="/certificados"
                        className="btn fw-semibold py-3 fs-6 shadow d-flex align-items-center justify-content-center gap-2"
                        style={{background: "#43AA8B", color: "white" }}
                    >
                        <i className="bi bi-file-earmark-text-fill"></i>
                        Consultar Certificado
                    </Link>

                    <Link
                        to="/certificados/validar"
                        className="btn fw-semibold py-3 fs-6 shadow-sm d-flex align-items-center justify-content-center gap-2"
                        style={{background: "#F9C74F", color: "white" }}
                    >
                        <i className="bi bi-patch-check-fill"></i>
                        Validar Certificado
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
