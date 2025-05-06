import logo from "../../../assets/logo-responsivo.png";

const Form = () => {
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
                <h2 className="mb-4 fs-4 text-center">Criar nova conta</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Nome</label>
                        <input type="text" className="form-control" id="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="password" />
                        <small className="text-muted">Use 8 ou mais caracteres</small>
                    </div>
                    <button 
                        type="submit" 
                        className="btn w-100 mt-4 text-white"
                        style={{ backgroundColor: '#F9844A', borderColor: '#F9844A' }}
                    >Criar uma conta</button>
                    <p className="mt-3 text-center">
                        Já possui uma conta? <a href="#">Entrar</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Form;
