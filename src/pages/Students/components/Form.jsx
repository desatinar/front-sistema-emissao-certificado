import React, { useState } from "react";

const Form = () => {
    const [form, setForm] = useState({
        nome: "",
        email: "",
        cpf: "",
    });

    const onChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    return (
        <div className="container py-5" style={{ maxWidth: "720px" }}>
            <h5 className="mb-4 text-muted">Cadastrar Estudante</h5>
            <form onSubmit={handleSubmit}>
                <div className="row g-3">
                    <div className="col-md-6">
                        <label htmlFor="nome" className="form-label small fw-semibold text-secondary">
                            Nome completo
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={form.name}
                            onChange={onChange}
                            className="form-control form-control-sm"
                            placeholder="Nome estudante"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="email" className="form-label small fw-semibold text-secondary">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={form.email}
                            onChange={onChange}
                            className="form-control form-control-sm"
                            placeholder="exemplo@dominio.com"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor="cpf" className="form-label small fw-semibold text-secondary">
                            CPF
                        </label>
                        <input
                            type="text"
                            id="cpf"
                            name="cpf"
                            value={form.cpf}
                            onChange={onChange}
                            className="form-control form-control-sm"
                            placeholder="000.000.000-00"
                            required
                        />
                    </div>
                </div>

                <div className="mt-4 d-flex gap-2">
                    <button type="submit" className="btn fw-semibold px-4" style={{backgroundColor: "#577590", color: "white"}}>
                        Salvar
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-danger fw-semibold px-4"
                        onClick={() => setForm({ name: "", email: "", cpf: "" })}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Form;
