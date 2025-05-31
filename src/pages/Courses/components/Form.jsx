import React, { useState } from 'react';

function Form() {
    const [courses, setCourses] = useState([
        { id: 1, name: 'Psicologia', hourlyLoad: '10h', description: 'Curso de psicologia', date: new Date().toLocaleString() },
        { id: 2, name: 'ADS', hourlyLoad: '20h', description: 'Curso de ADS', date: new Date().toLocaleString() },
    ]);

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [currentCourse, setCurrentCourse] = useState(null);
    const [newCourse, setNewCourse] = useState({ name: '', hourlyLoad: '', description: '', date: new Date().toLocaleString() });
    const [editedCourse, setEditedCourse] = useState({});
    const [nextId, setNextId] = useState(3);

    const buttomColor = {
        green: '#90BE6D',
        red: '#F94144',
        blue: '#577590'
    }

    const handleCreate = () => {
        const newCourseWithId = { id: nextId, ...newCourse };
        setCourses([...courses, newCourseWithId]);
        setNextId(nextId + 1);
        setEditedCourse({ name: '', hourlyLoad: '', description: '' });
        setShowCreateModal(false);
    };

    const handleEdit = (course) => {
        setCurrentCourse(course);
        setEditedCourse(course);
        setShowEditModal(true);
    };

    const saveEdit = () => {
        setCourses(courses.map((c) => (c.id === editedCourse.id ? editedCourse : c)));
        setShowEditModal(false);
    };

    const handleDelete = (course) => {
        setCurrentCourse(course);
        setShowDeleteModal(true);
    };

    const confirmDelete = () => {
        setCourses(courses.filter((c) => c.id !== currentCourse.id));
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
                            {courses.length === 0 ? (
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
                                        <td>{course.hourlyLoad}</td>
                                        <td>{course.description}</td>
                                        <td>{course.date}</td>
                                        <td className="text-center">
                                            <div className="d-grid d-sm-flex justify-content-sm-center gap-2">
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttomColor.green, color: 'white' }}
                                                    onClick={() => handleEdit(course)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn btn-sm"
                                                    style={{ backgroundColor: buttomColor.red, color: 'white' }}
                                                    onClick={() => handleDelete(course)}
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
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Carga Horária</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={newCourse.hourlyLoad}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, hourlyLoad: e.target.value })
                                        }
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
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Data</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={newCourse.date}
                                        onChange={(e) =>
                                            setNewCourse({ ...newCourse, date: e.target.value })
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
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Carga Horária</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={editedCourse.hourlyLoad || ''}
                                        onChange={(e) =>
                                            setEditedCourse({ ...editedCourse, hourlyLoad: e.target.value })
                                        }
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
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Data</label>
                                    <input
                                        type="date"
                                        className="form-control"
                                        value={editedCourse.date ? new Date(editedCourse.date).toISOString().split('T')[0] : ''}
                                        onChange={(e) =>
                                            setEditedCourse({ ...editedCourse, date: e.target.value })
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
