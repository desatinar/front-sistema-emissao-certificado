import React, { useEffect, useState } from 'react';
import { getAllStudents, getAllCourses, issueCertificate, getAllCertificates } from '../../../api/admin';

const Form = () => {
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [certificates, setCertificates] = useState([]);
    const [selectedStudentId, setSelectedStudentId] = useState('');
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [certificateDetails, setCertificateDetails] = useState(null);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const buttonColor = {
        green: '#90BE6D',
        red: '#F94144',
        blue: '#577590',
        formBackground: '#A3B18A'
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [studentsData, coursesData, certificatesData] = await Promise.all([
                    getAllStudents(),
                    getAllCourses(),
                    getAllCertificates()
                ]);

                setStudents(studentsData || []);
                setCourses(coursesData || []);
                setCertificates(certificatesData || []);
            } catch (error) {
                console.error("Erro ao carregar dados:", error);
                setErrorMessage(`Erro ao carregar dados iniciais: ${error.message || 'Serviço indisponível.'}`);
                setShowErrorAlert(true);
                setTimeout(() => setShowErrorAlert(false), 5000);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleIssueCertificate = async () => {
        if (!selectedStudentId || !selectedCourseId) {
            setErrorMessage("Por favor, selecione um estudante e um curso.");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 3000);
            return;
        }

        setLoading(true);
        setShowErrorAlert(false);

        try {
            const certificateData = {
                student_id: Number(selectedStudentId),
                course_id: Number(selectedCourseId),
            };

            const response = await issueCertificate(certificateData, setLoading);

            if (response && response.certificate && response.certificate.id) {
                const student = students.find(s => s.id === Number(selectedStudentId));
                const course = courses.find(c => c.id === Number(selectedCourseId));

                if (student && course) {
                    setCertificateDetails({
                        id: response.certificate.id,
                        studentName: student.full_name,
                        courseName: course.name,
                        validationCode: response.certificate.unique_validation_code
                    });
                    setShowSuccessModal(true);
                    setSelectedStudentId('');
                    setSelectedCourseId('');

                    const updatedCertificates = await getAllCertificates();
                    setCertificates(updatedCertificates || []);
                } else {
                    throw new Error("Não foi possível encontrar os dados do estudante ou curso localmente.");
                }
            } else {
                throw new Error(response?.message || "Resposta inválida da API ao emitir certificado.");
            }
        } catch (error) {
            console.error("Erro ao emitir certificado:", error);
            setErrorMessage(error.message || "Ocorreu um erro ao emitir o certificado. Tente novamente.");
            setShowErrorAlert(true);
            setTimeout(() => setShowErrorAlert(false), 5000);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-vh-100 p-3" style={{ backgroundColor: buttonColor.formBackground }}>
            {showErrorAlert && (
                <div className="alert alert-danger alert-dismissible fade show mb-3" role="alert">
                    <strong>Erro!</strong> {errorMessage}
                    <button
                        type="button"
                        className="btn-close"
                        onClick={() => setShowErrorAlert(false)}
                        aria-label="Close"
                    ></button>
                </div>
            )}

            <div className="row g-3">
                <div className="col-12 col-md-6">
                    <div className="card shadow-sm h-100" style={{ backgroundColor: '#FFFFFF' }}>
                        <div className="card-body p-3 p-md-4 d-flex flex-column">
                            <h2 className="card-title text-center mb-3 fs-5 fs-md-4 fw-semibold" style={{ color: '#343a40' }}>
                                Emitir Certificado
                            </h2>

                            <div className="mb-3 flex-grow-1">
                                <label htmlFor="studentSelect" className="form-label">Estudante</label>
                                <select
                                    id="studentSelect"
                                    className="form-select form-select-sm"
                                    value={selectedStudentId}
                                    onChange={(e) => setSelectedStudentId(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Selecione um estudante</option>
                                    {students.map((student) => (
                                        <option key={student.id} value={student.id}>
                                            {student.full_name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-4 flex-grow-1">
                                <label htmlFor="courseSelect" className="form-label">Curso</label>
                                <select
                                    id="courseSelect"
                                    className="form-select form-select-sm"
                                    value={selectedCourseId}
                                    onChange={(e) => setSelectedCourseId(e.target.value)}
                                    disabled={loading}
                                >
                                    <option value="">Selecione um curso</option>
                                    {courses.map((course) => (
                                        <option key={course.id} value={course.id}>
                                            {course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <button
                                className="btn w-100 text-white mt-auto"
                                style={{
                                    backgroundColor: buttonColor.green,
                                    height: '44px',
                                    fontSize: '1rem'
                                }}
                                onClick={handleIssueCertificate}
                                disabled={loading || !selectedStudentId || !selectedCourseId}
                            >
                                {loading && !certificateDetails ? (
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                ) : null}
                                Emitir Certificado
                            </button>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-6">
                    <div className="card shadow-sm h-100" style={{ backgroundColor: '#FFFFFF' }}>
                        <div className="card-body p-3 p-md-4 d-flex flex-column">
                            <h3 className="card-title text-center mb-3 fs-6 fs-md-5 fw-semibold" style={{ color: '#343a40' }}>
                                Certificados Emitidos
                            </h3>
                            {certificates.length > 0 ? (
                                <div className="table-responsive flex-grow-1">
                                    <table className="table table-bordered table-hover align-middle">
                                        <thead className="table-dark" style={{ backgroundColor: '#343a40', color: '#FFFFFF' }}>
                                            <tr>
                                                <th>ID</th>
                                                <th>Estudante</th>
                                                <th>Curso</th>
                                                <th>Código de Validação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {certificates.map((certificate) => {
                                                const student = students.find(s => s.id === certificate.student_id);
                                                const course = courses.find(c => c.id === certificate.course_id);
                                                return (
                                                    <tr key={certificate.id}>
                                                        <td className="p-2">{certificate.id}</td>
                                                        <td className="p-2">{student ? student.full_name : 'Desconhecido'}</td>
                                                        <td className="p-2">{course ? course.name : 'Desconhecido'}</td>
                                                        <td className="p-2">{certificate.unique_validation_code || 'N/A'}</td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            ) : (
                                <p className="text-center text-muted flex-grow-1">Nenhum certificado emitido.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {showSuccessModal && certificateDetails && (
                <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content shadow-lg">
                            <div className="modal-header">
                                <h5 className="modal-title" style={{ color: buttonColor.green }}>Certificado Emitido com Sucesso!</h5>
                                <button
                                    type="button"
                                    className="btn-close"
                                    onClick={() => {
                                        setShowSuccessModal(false);
                                        setCertificateDetails(null);
                                    }}
                                    aria-label="Close"
                                ></button>
                            </div>
                            <div className="modal-body p-3">
                                <p className="mb-2"><strong>ID do Certificado:</strong> {certificateDetails.id}</p>
                                <p className="mb-2"><strong>Estudante:</strong> {certificateDetails.studentName}</p>
                                <p className="mb-2"><strong>Curso:</strong> {certificateDetails.courseName}</p>
                                <p className="mb-2"><strong>Código de Validação:</strong> {certificateDetails.validationCode}</p>
                            </div>
                            <div className="modal-footer">
                                <button
                                    className="btn"
                                    style={{ backgroundColor: buttonColor.blue, color: 'white' }}
                                    onClick={() => {
                                        setShowSuccessModal(false);
                                        setCertificateDetails(null);
                                    }}
                                >
                                    Fechar
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