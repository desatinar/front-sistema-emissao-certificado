import logo from "../../../assets/logo.png";

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
                <h2 className="mb-4 fs-4 text-center">Login</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input type="email" className="form-control" id="email" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Senha</label>
                        <input type="password" className="form-control" id="password" />
                    </div>
                    <button 
                        type="submit" 
                        className="btn w-100 mt-4 text-white"
                        style={{ backgroundColor: '#F9844A', borderColor: '#F9844A' }}
                    >Entrar</button>
                    <p className="mt-3 text-center">
                        Não possui uma conta? <a href="#">Criar</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Form;
