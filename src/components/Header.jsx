
const Header = ({ pageName }) => {
    const logoff = () => {
        localStorage.removeItem("token");
        window.location.reload();
    }

    return (
        <div 
            className="d-flex align-items-center px-3 py-4 border-bottom bg-white "
        >
            <button
                className="btn btn-outline-secondary d-lg-none me-2"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#sidebarMenu"
                aria-controls="sidebarMenu"
                aria-label="Abrir menu lateral"
            >
                <i className="bi bi-list fs-5"></i>
            </button>
            <h5 className="mb-0 text-secondary me-auto">
                {pageName}
            </h5>
            <div className="dropdown">
                <a
                    href="#"
                    className="d-flex align-items-center text-secondary text-decoration-none dropdown-toggle"
                    id="dropdownUser1"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                >
                    <i className="bi bi-person-circle fs-4 me-2"></i>
                    <span className="d-none d-sm-inline">Usuário</span>
                </a>
                <ul className="dropdown-menu dropdown-menu-end text-small shadow" aria-labelledby="dropdownUser1">
                    <li><a className="dropdown-item" onClick={logoff}>Sair</a></li>
                </ul>
            </div>
        </div>
    );
};

export default Header;
