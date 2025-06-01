import { Link } from "react-router";

const NavLinks = () => {

    return (
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/" className="nav-link active text-white" aria-current="page">
                    <i className="bi bi-speedometer2 me-2"></i> Dashboard
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/cursos" className="nav-link text-white">
                    <i className="bi bi-book me-2"></i> Gestão de Cursos
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/alunos" className="nav-link text-white">
                    <i className="bi bi-people-fill me-2"></i> Gestão de Estudantes
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/certificados" className="nav-link text-white">
                    <i className="bi bi-patch-check-fill me-2"></i> Gestão de Certificados
                </Link>
            </li>
            <li className="nav-item">
                <Link to="/admin" className="nav-link text-white">
                    <i className="bi bi-patch-check-fill me-2"></i> Gestão de Administradores
                </Link>
            </li>
        </ul>
    );
}

export default NavLinks;
