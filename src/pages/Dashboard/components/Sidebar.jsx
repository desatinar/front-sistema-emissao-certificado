const Sidebar = () => {
    return(
        <div className="text-white p-3 d-none d-lg-block" 
            style={{ width: '220px', background: '#A3B18A'}}
        >
            <ul className="nav flex-column">
                <li className="h5 nav-item mb-2">Dashboard</li>
                <li className="nav-item mb-2">Cursos</li>
                <li className="nav-item mb-2">Alunos</li>
                <li className="nav-item mb-2">Certificados</li>
                <li className="nav-item">Aprovação</li>
            </ul>
        </div>
    )
};

export default Sidebar;
