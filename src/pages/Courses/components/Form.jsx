import React, { useEffect, useState } from 'react';
import { addCourse, editCourse, getAllCourses, deleteCourse } from '../../../api/admin';
import formatDateForInput from '../../../utils/utils';

function Form() {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [updateCourses, setUpdateCourses] = useState(0);
    const [newCourse, setNewCourse] = useState({ name: "", workload: "", description: "", courseDate: "" });
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [editedCourse, setEditedCourse] = useState({});

    const buttonColor = {
        green: '#90BE6D',
        red: '#F94144',
        blue: '#577590'
    };

    useEffect(() => {
        const getCourses = async () => {
            const data = await getAllCourses(setLoading);
            if (data) {
                setCourses(data);
            }
        };

        getCourses();
    }, [updateCourses]);

    const handleCreate = async () => {
        try {
            await addCourse(newCourse, setLoading);
            setNewCourse({ name: "", workload: "", description: "", courseDate: "" });
            setShowCreateModal(false);
            setShowSuccessAlert(true);
            setUpdateCourses(updateCourses + 1);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            setErrorMessage(`Erro ao cadastrar curso: ${error.message}`);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    const handleEdit = (course) => {
        setCurrentCourse(course);
        setEditedCourse({
            id: course.id,
            name: course.name || '',
            workload: course.workload || '',
            description: course.description || '',
            courseDate: formatDateForInput(course.course_date)
        });
        setShowEditModal(true);
    };

    const saveEdit = async () => {
        try {
            await editCourse({ ...editedCourse, course_date: editedCourse.courseDate }, setLoading);
            setCourses(courses.map((c) => (c.id === editedCourse.id ? { ...editedCourse, course_date: editedCourse.courseDate } : c)));
            setShowEditModal(false);
            setShowSuccessAlert(true);
            setUpdateCourses(updateCourses + 1);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            setErrorMessage(`Erro ao editar curso: ${error.message}`);
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
        }
    };

    const handleDelete = (course) => {
        setCurrentCourse(course);
        setShowDeleteModal(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteCourse(currentCourse.id, setLoading);
            setCourses(courses.filter((c) => c.id !== currentCourse.id));
            setShowDeleteModal(false);
            setShowSuccessAlert(true);
            setUpdateCourses(updateCourses + 1);
            setTimeout(() => setShowSuccessAlert(false), 3000);
        } catch (error) {
            setErrorMessage(`Erro ao excluir curso: ${error.message}`);
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
                    + Novo Curso
                </button>
            </div>

            <div className="table-container" style={{ maxHeight: '500px', overflowY: 'auto' }}>
                <div className="table-responsive">
                    <table className="table table-bordered table-hover align-middle">
                        <thead className="table-dark sticky-top">
                            <tr>
                                <th>ID</th>
                                <th>Nome</th>
                                <th>Carga Horária</th>
                                <th>Descrição</th>
                                <th>Data</th>
                                <th className="text-center">Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        <div className="spinner-border text-success" role="status">
                                            <span className="visually-hidden">Carregando...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : courses.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">
                                        Nenhum curso cadastrado.
                                    </td>
                                </tr>
                            ) : (
                                courses.map((course) => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.name}</td>
                                        <td>{course.workload}h</td>
                                        <td>{course.description}</td>
                                        <td>{new Date(course.course_date).toLocaleDateString("pt-BR")}</td>
                                        <td className="text-center">
                                            <div className="d-grid d-sm-flex justify-content-sm-center gap-2">
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttonColor.green, color: 'white' }}
                                                    onClick={() => handleEdit(course)}
                                                    disabled={loading}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttonColor.red, color: 'white' }}
                                                    onClick={() => handleDelete(course)}
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
                                <h5 className="modal-title">Criar Novo Curso</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowCreateModal(false)}
                                    disabled={loading}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newCourse.name}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, name: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Carga Horária</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newCourse.workload}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, workload: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descrição</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newCourse.description}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, description: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Data</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={newCourse.courseDate}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, courseDate: e.target.value })
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

            {showEditModal && editedCourse && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title">Editar Curso</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => setShowEditModal(false)}
                                    disabled={loading}
                                ></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label className="form-label">Nome</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedCourse.name || ''}
                                        onChange={(e) =>
                                            setEditedCourse({ ...editedCourse, name: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Carga Horária</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedCourse.workload || ''}
                                        onChange={(e) =>
                                            setEditedCourse({ ...editedCourse, workload: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Descrição</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedCourse.description || ''}
                                        onChange={(e) =>
                                            setEditedCourse({ ...editedCourse, description: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Data</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={editedCourse.courseDate || ''}
                                        onChange={(e) =>
                                            setEditedCourse({ ...editedCourse, courseDate: e.target.value })
                                        }
                                        disabled={loading}
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttonColor.blue, color: 'white' }}
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

            {showDeleteModal && currentCourse && (
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
                                    Tem certeza que deseja excluir o curso{' '}
                                    <strong>{currentCourse?.name}</strong>?
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