import NavLinks from "./NavLinks";

const Sidebar = () => {
    return (
        <>
            <div
                className="offcanvas offcanvas-start d-lg-none"
                tabIndex="-1"
                id="sidebarMenu"
                aria-labelledby="sidebarMenuLabel"
                style={{ width: '280px', backgroundColor: "#43AA8B" }}
            >
                <div className="offcanvas-header">
                    <h5 className="offcanvas-title text-white" id="sidebarMenuLabel">
                        Menu Principal
                    </h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Fechar"></button>
                </div>
                <div className="offcanvas-body d-flex flex-column p-0">
                    <div className="p-3">
                        <NavLinks />
                    </div>
                    <hr className="my-0" style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }} />
                </div>
            </div>
            <div
                className="d-none d-lg-flex flex-column p-3 vh-100 shadow-sm" 
                style={{ width: '280px', backgroundColor: "#43AA8B" }}
            >
                <a href="/" className="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none">
                    <i className="bi bi-layers-fill me-2 fs-4"></i>
                    <span className="fs-4">Menu</span>
                </a>
                <hr style={{ borderColor: 'rgba(255, 255, 255, 0.5)' }} />
                <div className="flex-grow-1">
                    <NavLinks />
                </div>
            </div>
        </>
    );
};

export default Sidebar;