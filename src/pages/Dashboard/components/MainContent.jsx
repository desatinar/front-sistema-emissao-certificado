import React, { useState, useEffect } from 'react';
import { getAllCourses, getAllStudents, getAllCertificates } from '../../../api/admin.js';

const MainContent = () => {
    const [stats, setStats] = useState({ totalCourses: 0, totalStudents: 0, totalCertificates: 0, recentCertificates: [] });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [coursesData, studentsData, certificatesData] = await Promise.all([
                    getAllCourses(),
                    getAllStudents(),
                    getAllCertificates(),
                ]);

                const courses = Array.isArray(coursesData) ? coursesData : [];
                const students = Array.isArray(studentsData) ? studentsData : [];
                const certificates = Array.isArray(certificatesData) ? certificatesData : [];

                const enrichedCertificates = certificates.map(cert => {
                    const student = students.find(s => s.id === cert.student_id);
                    const course = courses.find(c => c.id === cert.course_id);
                    return {
                        ...cert,
                        student_name: student ? student.full_name : 'Desconhecido',
                        course_name: course ? course.name : 'Desconhecido',
                    };
                });

                setStats({
                    totalCourses: courses.length,
                    totalStudents: students.length,
                    totalCertificates: enrichedCertificates.length,
                    recentCertificates: enrichedCertificates
                        .sort((a, b) => {
                            const dateA = a.issue_date ? new Date(a.issue_date) : new Date(0);
                            const dateB = b.issue_date ? new Date(b.issue_date) : new Date(0);
                            return dateB - dateA;
                        })
                        .slice(0, 5),
                });

            } catch (error) {
                console.error('Erro ao carregar dados do dashboard:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="p-4" style={{ minHeight: '100vh' }}>
            {loading ? (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1050 }}>
                    <div className="text-center">
                        <div className="spinner-border text-success" role="status" style={{ width: '4rem', height: '4rem', borderWidth: '0.4rem' }}>
                            <span className="visually-hidden">Carregando...</span>
                        </div>
                        <p className="mt-3 text-white fw-bold">Carregando dados do dashboard...</p>
                    </div>
                </div>
            ) : (
                <>
                    <div className="row g-3 mb-4">
                        <div className="col-12 col-md-4">
                            <div className="card text-center shadow-sm h-100" style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}>
                                <div className="card-body">
                                    <h6 className="card-subtitle mt-2 mb-2 text-muted">Total de Cursos</h6>
                                    <p className="fs-4 fw-bold mb-0">{stats.totalCourses}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card text-center shadow-sm h-100" style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}>
                                <div className="card-body">
                                    <h6 className="card-subtitle mt-2 mb-2 text-muted">Total de Alunos</h6>
                                    <p className="fs-4 fw-bold mb-0">{stats.totalStudents}</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-md-4">
                            <div className="card text-center shadow-sm h-100" style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}>
                                <div className="card-body">
                                    <h6 className="card-subtitle mt-2 mb-2 text-muted">Certificados Emitidos</h6>
                                    <p className="fs-4 fw-bold mb-0">{stats.totalCertificates}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="card-title mb-3">Certificados Emitidos Recentemente</h5>
                            <div className="table-responsive">
                                <table className="table table-hover mt-2">
                                    <thead className="table-light">
                                        <tr>
                                            <th>ID</th>
                                            <th>Aluno</th>
                                            <th>Curso</th>
                                            <th>Data de Emissão</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {stats.recentCertificates.length > 0 ? (
                                            stats.recentCertificates.map(cert => (
                                                <tr key={cert.id}>
                                                    <td>{cert.id}</td>
                                                    <td>{cert.student_name}</td>
                                                    <td>{cert.course_name}</td>
                                                    <td>{cert.issue_date ? new Date(cert.issue_date).toLocaleDateString('pt-BR') : 'N/A'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="text-center">Nenhum certificado recente para exibir.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default MainContent;