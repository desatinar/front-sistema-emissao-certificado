import logo from "../../../assets/logo-esuda.png";

const Form = () => {
    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100">
            <div className="d-flex flex-column align-items-center shadow p-4 mb-5 bg-white rounded" style={{ maxWidth: '400px' }}>
                <img src={logo} alt="Logo" className="w-75 mb-4" />
                <form className="w-100">
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Entrar</button>
                </form>
            </div>
        </div>
    );
}

export default Form;