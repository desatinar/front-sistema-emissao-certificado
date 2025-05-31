import React, { useState } from 'react';

function Form() {
    const [users, setUsers] = useState([
        { cpf: "000.000.000-00", name: 'Rodrigo Santos', email: 'rodrigo@email.com' },
        { cpf: "111.111.111-11", name: 'Guilherme Santos', email: 'guilherme@email.com' },
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [editedUser, setEditedUser] = useState({});
    const [nextCpf, setNextCpf] = useState("222.222.222-22");

    const buttomColor = {
        green: '#90BE6D',
        red: '#F94144',
        blue: '#577590'
    }

    const handleCreate = () => {
        const newUserWithCpf = { cpf: nextCpf, ...newUser };
        setUsers([...users, newUserWithCpf]);
        setNextCpf(nextCpf + 1);
        setNewUser({ name: '', email: '' });
        setShowCreateModal(false);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setEditedUser(user);
        setShowEditModal(true);
    };

    const saveEdit = () => {
        setUsers(users.map((u) => (u.cpf === editedUser.cpf ? editedUser : u)));
        setShowEditModal(false);
    };

    const handleDelete = (user) => {
        setCurrentUser(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter((u) => u.cpf !== currentUser.cpf));
        setShowDeleteModal(false);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn"
                    style={{ backgroundColor: buttomColor.green, color: 'white' }}
                    onClick={() => setShowCreateModal(true)}
                >
                    + Novo Usuário
                </button>
            </div>

            <div className="table-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-dark sticky-top">
                            <tr>
                                <th>CPF</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        Nenhum usuário cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                users.map((user) => (
                                    <tr key={user.cpf}>
                                        <td>{user.cpf}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="text-center">
                                            <div className="d-grid d-sm-flex justify-content-sm-center gap-2">
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttomColor.green, color: 'white' }}
                                                    onClick={() => handleEdit(user)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttomColor.red, color: 'white' }}
                                                    onClick={() => handleDelete(user)}
                                                >
                                                    Excluir
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showCreateModal && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title">Criar Novo Usuário</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowCreateModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newUser.cpf}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, cpf: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newUser.name}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={newUser.email}
                                        onChange={(e) =>
                                            setNewUser({ ...newUser, email: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttomColor.red, color: 'white' }}
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttomColor.green, color: 'white' }}
                                    onClick={handleCreate}
                                >
                                    Criar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && editedUser && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Usuário</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedUser.cpf || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedUser.name || ''}
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, name: e.target.value })
                                        }
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={editedUser.email || ''}
                                        onChange={(e) =>
                                            setEditedUser({ ...editedUser, email: e.target.value })
                                        }
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttomColor.blue, color: 'white' }}
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttomColor.green, color: 'white' }}
                                    onClick={saveEdit}
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && currentUser && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Confirmar Exclusão</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Tem certeza que deseja excluir o usuário{' '}
                                    <strong>{currentUser?.name}</strong>?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttomColor.blue, color: 'white' }}
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttomColor.red, color: 'white' }}
                                    onClick={confirmDelete}
                                >
                                    Excluir
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Form;
