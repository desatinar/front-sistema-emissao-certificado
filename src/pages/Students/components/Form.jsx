import React, { useEffect, useState } from 'react';
import { addStudent, getAllStudents, editStudent, deleteStudent } from '../../../api/admin';
import { validateCpf } from '../../../utils/utils';

const Form = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [updateStudents, setUpdateStudents] = useState(0);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentStudent, setCurrentStudent] = useState(null);
    const [newStudent, setNewStudent] = useState({ name: '', email: '', cpf: '' });
    const [editedStudent, setEditedStudent] = useState({});

    const buttonColor = {
        green: '#90BE6D',
        red: '#F94144',
        blue: '#577590'
    };

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const data = await getAllStudents(setLoading);
                setStudents(data);
            } catch (error) {
                setErrorMessage(`Erro ao buscar estudantes: ${error.message}`);
                setShowErrorAlert(true);
                setTimeout(() => setShowErrorAlert(false), 3000);
            }
        };
        fetchStudents();
    }, [updateStudents]);

    const handleCreate = async () => {
        const cpfError = validateCpf(newStudent.cpf);
        if (cpfError) {
            setErrorMessage(cpfError);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
            return;
        }
        if (!newStudent.name || !newStudent.email) {
            setErrorMessage("Nome e email são obrigatórios");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
            return;
        }
        try {
            const createdStudent = await addStudent(newStudent, setLoading);
            setStudents([...students, createdStudent]);
            setNewStudent({ name: '', email: '', cpf: '' });
            setShowCreateModal(false);
            setShowSuccessAlert(true);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            setErrorMessage(error.message || "Erro ao criar estudante");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    const handleEdit = (student) => {
        setCurrentStudent(student);
        setEditedStudent({
            id: student.id,
            name: student.full_name,
            email: student.email,
            cpf: student.cpf,
        });
        setShowEditModal(true);
    };

    const saveEdit = async () => {
        const cpfError = validateCpf(editedStudent.cpf);
        if (cpfError) {
            setErrorMessage(cpfError);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
            return;
        }
        try {
            const updatedStudent = await editStudent(editedStudent, setLoading);
            setStudents(students.map((s) => (s.id === updatedStudent.id ? { ...s, ...updatedStudent, full_name: updatedStudent.full_name } : s)));
            setShowEditModal(false);
            setShowSuccessAlert(true);
            setUpdateStudents(updateStudents + 1);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            setErrorMessage(error.message || "Erro ao atualizar estudante");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    const handleDelete = (student) => {
        setCurrentStudent(student);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteStudent(currentStudent.id, setLoading);
            setStudents(students.filter((s) => s.id !== currentStudent.id));
            setShowDeleteModal(false);
            setShowSuccessAlert(true);
            setUpdateStudents(updateStudents + 1);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            setErrorMessage(error.message || "Erro ao excluir estudante");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    return (
        <div className="container mt-5">
            {showSuccessAlert && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                    <strong>Sucesso!</strong> Operação realizada com sucesso.
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setShowSuccessAlert(false)}
                    ></button>
                </div>
            )}
            {showErrorAlert && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                    <strong>Erro!</strong> {errorMessage}
                    <button
                        type="button"
                        className="btn-close"
                        data-bs-dismiss="alert"
                        aria-label="Close"
                        onClick={() => setShowErrorAlert(false)}
                    ></button>
                </div>
            )}

            <div className="d-flex justify-content-end mb-3">
                <button
                    className="btn"
                    style={{ backgroundColor: buttonColor.green, color: 'white' }}
                    onClick={() => setShowCreateModal(true)}
                    disabled={loading}
                >
                    + Novo Estudante
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
                            {loading ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        <div className="spinner-border text-success" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : students.length === 0 ? (
                                <tr>
                                    <td colSpan="4" className="text-center">
                                        Nenhum estudante cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                students.map((student) => (
                                    <tr key={student.id}>
                                        <td>{student.cpf}</td>
                                        <td>{student.full_name}</td>
                                        <td>{student.email}</td>
                                        <td className="text-center">
                                            <div className="d-grid d-sm-flex justify-content-sm-center gap-2">
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttonColor.green, color: 'white' }}
                                                    onClick={() => handleEdit(student)}
                                                    disabled={loading}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttonColor.red, color: 'white' }}
                                                    onClick={() => handleDelete(student)}
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
                                <h5 className="modal-title">Criar Novo Estudante</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowCreateModal(false)}
                                    disabled={loading}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newStudent.cpf}
                                        onChange={(e) =>
                                            setNewStudent({ ...newStudent, cpf: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newStudent.name}
                                        onChange={(e) =>
                                            setNewStudent({ ...newStudent, name: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={newStudent.email}
                                        onChange={(e) =>
                                            setNewStudent({ ...newStudent, email: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttonColor.red, color: 'white' }}
                                    onClick={() => setShowCreateModal(false)}
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttonColor.green, color: 'white' }}
                                    onClick={handleCreate}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    ) : null}
                                    Criar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showEditModal && editedStudent && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Estudante</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                    disabled={loading}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">CPF</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedStudent.cpf || ''}
                                        onChange={(e) =>
                                            setEditedStudent({ ...editedStudent, cpf: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedStudent.name || ''}
                                        onChange={(e) =>
                                            setEditedStudent({ ...editedStudent, name: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Email</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        value={editedStudent.email || ''}
                                        onChange={(e) =>
                                            setEditedStudent({ ...editedStudent, email: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttonColor.red, color: 'white' }}
                                    onClick={() => setShowEditModal(false)}
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttonColor.green, color: 'white' }}
                                    onClick={saveEdit}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    ) : null}
                                    Salvar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {showDeleteModal && currentStudent && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title text-danger">Confirmar Exclusão</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={loading}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <p>
                                    Tem certeza que deseja excluir o estudante{' '}
                                    <strong>{currentStudent?.full_name}</strong>?
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttonColor.blue, color: 'white' }}
                                    onClick={() => setShowDeleteModal(false)}
                                    disabled={loading}
                                >
                                    Cancelar
                                </button>
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttonColor.red, color: 'white' }}
                                    onClick={confirmDelete}
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    ) : null}
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