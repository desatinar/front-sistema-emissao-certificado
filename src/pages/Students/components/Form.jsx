import React, { useState } from 'react';

function Form() {
    const [users, setUsers] = useState([
        { id: 1, name: 'João Silva', email: 'joao@example.com' },
        { id: 2, name: 'Maria Souza', email: 'maria@example.com' },
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [newUser, setNewUser] = useState({ name: '', email: '' });
    const [editedUser, setEditedUser] = useState({});
    const [nextId, setNextId] = useState(3);

    const greenColor = '#90BE6D';
    const redColor = '#F94144';

    const handleCreate = () => {
        const newUserWithId = { id: nextId, ...newUser };
        setUsers([...users, newUserWithId]);
        setNextId(nextId + 1);
        setNewUser({ name: '', email: '' });
        setShowCreateModal(false);
    };

    const handleEdit = (user) => {
        setCurrentUser(user);
        setEditedUser(user);
        setShowEditModal(true);
    };

    const saveEdit = () => {
        setUsers(users.map((u) => (u.id === editedUser.id ? editedUser : u)));
        setShowEditModal(false);
    };

    const handleDelete = (user) => {
        setCurrentUser(user);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setUsers(users.filter((u) => u.id !== currentUser.id));
        setShowDeleteModal(false);
    };

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn"
                    style={{ backgroundColor: greenColor, color: 'white' }}
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
                                <th>ID</th>
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
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td className="text-center">
                                            <button
                                                className="btn btn-sm me-2"
                                                style={{ backgroundColor: greenColor, color: 'white' }}
                                                onClick={() => handleEdit(user)}
                                            >
                                                Editar
                                            </button>
                                            <button
                                                className="btn btn-sm"
                                                style={{ backgroundColor: redColor, color: 'white' }}
                                                onClick={() => handleDelete(user)}
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {showCreateModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
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
                                    style={{ backgroundColor: redColor, color: 'white' }}
                                    onClick={() => setShowCreateModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: greenColor, color: 'white' }}
                                    onClick={handleCreate}
                                >
                                    Criar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
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
                                    style={{ backgroundColor: redColor, color: 'white' }}
                                    onClick={() => setShowEditModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: greenColor, color: 'white' }}
                                    onClick={saveEdit}
                                >
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal show d-block" tabIndex="-1">
                    <div className="modal-dialog">
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
                                    style={{ backgroundColor: redColor, color: 'white' }}
                                    onClick={() => setShowDeleteModal(false)}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: redColor, color: 'white' }}
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
