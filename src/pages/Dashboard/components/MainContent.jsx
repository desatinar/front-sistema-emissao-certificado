const MainContent = () => {
    return(
        <div className="p-3">
            <div className="row g-3 mb-4">
                <div className="col-12 col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h6>Total Cursos</h6>
                            <p>12</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h6>Total Alunos</h6>
                            <p>240</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-md-4">
                    <div className="card text-center">
                        <div className="card-body">
                            <h6>Certificados Emitidos</h6>
                            <p>530</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row g-3 mb-4">
                <div className="col-12 col-lg-8">
                    <div className="card">
                        <div className="card-body">
                            <h6>Emissão de Certificados (2025)</h6>
                            <p>🔷 Gráfico ou dados aqui</p>
                        </div>
                    </div>
                </div>
                <div className="col-12 col-lg-4">
                    <div className="card">
                        <div className="card-body">
                            <h6>Análise Top</h6>
                            <ul className="list-unstyled">
                                <li>Curso A - 90%</li>
                                <li>Curso B - 75%</li>
                                <li>Curso C - 60%</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card">
                <div className="card-body">
                    <h6>Certificados Recentes</h6>
                    <div className="table-responsive">
                        <table className="table table-sm mt-3">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Aluno</th>
                                    <th>Curso</th>
                                    <th>Data</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr><td>1</td><td>João</td><td>React</td><td>01/07</td><td>Emitido</td></tr>
                                <tr><td>2</td><td>Maria</td><td>Java</td><td>01/07</td><td>Pendente</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default MainContent;
