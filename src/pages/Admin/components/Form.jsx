import React, { useEffect, useState } from 'react';
import { getAllAdmins, createAdmin, updateAdmin, deleteAdmin } from '../../../api/admin';
import { validateEmail } from '../../../utils/utils';

const Form = () => {
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [updateAdminsTrigger, setUpdateAdminsTrigger] = useState(0);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentAdmin, setCurrentAdmin] = useState(null);
    const [newAdmin, setNewAdmin] = useState({ email: '', password: '' });
    const [editedAdmin, setEditedAdmin] = useState({ id: null, email: '', password: '' });

    const buttonColor = {
        green: '#90BE6D',
        red: '#F94144',
        blue: '#577590'
    };

    useEffect(() => {
        const fetchAdmins = async () => {
            setLoading(true);
            try {
                const data = await getAllAdmins();
                setAdmins(data || []);
            } catch (error) {
                setErrorMessage(`Erro ao buscar administradores: ${error.message || 'Serviço indisponível.'}`);
                setShowErrorAlert(true);
                setTimeout(() => setShowErrorAlert(false), 5000);
            } finally {
                setLoading(false);
            }
        };
        fetchAdmins();
    }, [updateAdminsTrigger]);

    const handleCreate = async () => {
        const emailError = validateEmail(newAdmin.email);
        if (emailError) {
            setErrorMessage(emailError);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
            return;
        }
        if (!newAdmin.password) {
            setErrorMessage("Senha é obrigatória para criar um novo admin.");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
            return;
        }

        setLoading(true);
        try {
            await createAdmin(newAdmin);
            setNewAdmin({ email: '', password: '' });
            setShowCreateModal(false);
            setSuccessMessage("Administrador criado com sucesso!");
            setShowSuccessAlert(true);
            setUpdateAdminsTrigger(prev => prev + 1);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || "Erro ao criar administrador.");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 5000);
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (admin) => {
        setCurrentAdmin(admin);
        setEditedAdmin({
            id: admin.id,
            email: admin.email,
            password: ''
        });
        setShowEditModal(true);
    };

    const saveEdit = async () => {
        const emailError = validateEmail(editedAdmin.email);
        if (emailError) {
            setErrorMessage(emailError);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
            return;
        }

        setLoading(true);
        try {
            const dataToUpdate = { email: editedAdmin.email };
            if (editedAdmin.password) {
                dataToUpdate.password = editedAdmin.password;
            }

            await updateAdmin(editedAdmin.id, dataToUpdate);
            setShowEditModal(false);
            setSuccessMessage("Administrador atualizado com sucesso!");
            setShowSuccessAlert(true);
            setUpdateAdminsTrigger(prev => prev + 1);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || "Erro ao atualizar administrador.");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 5000);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = (admin) => {
        setCurrentAdmin(admin);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        if (!currentAdmin) return;
        setLoading(true);
        try {
            await deleteAdmin(currentAdmin.id);
            setShowDeleteModal(false);
            setSuccessMessage("Administrador excluído com sucesso!");
            setShowSuccessAlert(true);
            setUpdateAdminsTrigger(prev => prev + 1);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            setErrorMessage(error.response?.data?.message || error.message || "Erro ao excluir administrador.");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mt-5">
            {showSuccessAlert && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Sucesso!</strong> {successMessage}
                    <button type="button" className="btn-close" onClick={() => setShowSuccessAlert(false)} aria-label="Close"></button>
                </div>
            )}
            {showErrorAlert && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Erro!</strong> {errorMessage}
                    <button type="button" className="btn-close" onClick={() => setShowErrorAlert(false)} aria-label="Close"></button>
                </div>
            )}

            <div className="d-flex justify-content-between align-items-center mb-3">
                <div></div>
                <button
                    className="btn"
                    style={{ backgroundColor: buttonColor.green, color: 'white' }}
                    onClick={() => {
                        setNewAdmin({ email: '', password: '' });
                        setShowCreateModal(true);
                    }}
                    disabled={loading}
                >
                    + Novo Admin
                </button>
            </div>

            <div className="table-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-dark sticky-top">
                            <tr>
                                <th>ID</th>
                                <th>Email</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading && admins.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        <div className="spinner-border text-success" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : admins.length === 0 ? (
                                <tr>
                                    <td colSpan="3" className="text-center">
                                        Nenhum administrador cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin.id}>
                                        <td>{admin.id}</td>
                                        <td>{admin.email}</td>
                                        <td className="text-center">
                                            <div className="d-grid d-sm-flex justify-content-sm-center gap-2">
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttonColor.blue, color: 'white' }}
                                                    onClick={() => handleEdit(admin)}
                                                    disabled={loading}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttonColor.red, color: 'white' }}
                                                    onClick={() => handleDelete(admin)}
                                                    disabled={loading}
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
                                <h5 className="modal-title">Criar Novo Administrador</h5>
                                <button type="button" className="btn-close" onClick={() => setShowCreateModal(false)} disabled={loading}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="exemplo@email.com"
                                        value={newAdmin.email}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Senha</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Senha"
                                        value={newAdmin.password}
                                        onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn" style={{ backgroundColor: buttonColor.red, color: 'white' }} onClick={() => setShowCreateModal(false)} disabled={loading}>
                                    Cancelar
                                </button>
                                <button className="btn" style={{ backgroundColor: buttonColor.green, color: 'white' }} onClick={handleCreate} disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                    Criar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && editedAdmin && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Administrador</h5>
                                <button type="button" className="btn-close" onClick={() => setShowEditModal(false)} disabled={loading}></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={editedAdmin.email}
                                        onChange={(e) => setEditedAdmin({ ...editedAdmin, email: e.target.value })}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nova Senha (deixe em branco para não alterar)</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Nova senha (opcional)"
                                        value={editedAdmin.password}
                                        onChange={(e) => setEditedAdmin({ ...editedAdmin, password: e.target.value })}
                                        disabled={loading}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button className="btn" style={{ backgroundColor: buttonColor.red, color: 'white' }} onClick={() => setShowEditModal(false)} disabled={loading}>
                                    Cancelar
                                </button>
                                <button className="btn" style={{ backgroundColor: buttonColor.green, color: 'white' }} onClick={saveEdit} disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
                                    Salvar Alterações
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && currentAdmin && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Confirmar Exclusão</h5>
                                <button type="button" className="btn-close" onClick={() => setShowDeleteModal(false)} disabled={loading}></button>
                            </div>
                            <div className="modal-body">
                                <p>Tem certeza que deseja excluir o administrador <strong>{currentAdmin?.email}</strong>?</p>
                            </div>
                            <div className="modal-footer">
                                <button className="btn" style={{ backgroundColor: buttonColor.blue, color: 'white' }} onClick={() => setShowDeleteModal(false)} disabled={loading}>
                                    Cancelar
                                </button>
                                <button className="btn" style={{ backgroundColor: buttonColor.red, color: 'white' }} onClick={confirmDelete} disabled={loading}>
                                    {loading ? <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span> : null}
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