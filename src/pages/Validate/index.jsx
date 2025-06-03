import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import { getCertificateDetails, fetchCertificatePdf } from '../../api/admin';
import logo from "../../assets/green-logo.png";

const ValidateCertificate = () => {
    const [code, setCode] = useState('');
    const [isValid, setIsValid] = useState(null);
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const buttonColor = {
        green: '#90BE6D',
        red: '#F94144',
        blue: '#577590',
        formBackground: '#A3B18A'
    };

    const showTemporaryError = (message) => {
        setErrorMessage(message);
        setShowErrorAlert(true);
        setTimeout(() => setShowErrorAlert(false), 5000);
    };

    const handleValidate = async () => {
        if (!code) {
            showTemporaryError("Por favor, insira o código do certificado.");
            return;
        }

        setLoading(true);
        setShowErrorAlert(false);
        setIsValid(null);
        setPdfUrl(null);

        try {
            await getCertificateDetails(code, setLoading);
            setIsValid(true);
            const blob = await fetchCertificatePdf(code, setLoading);
            const url = URL.createObjectURL(blob);
            setPdfUrl(url);
        } catch (error) {
            setIsValid(false);
            showTemporaryError(`Erro ao validar ou carregar o certificado: ${error.message || 'Código inválido.'}`);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        return () => {
            if (pdfUrl) {
                URL.revokeObjectURL(pdfUrl);
            }
        };
    }, [pdfUrl]);

    return (
        <div className="d-flex justify-content-center align-items-center min-vh-100 p-3" style={{ backgroundColor: buttonColor.formBackground }}>
            <div className="card shadow-sm p-4 rounded-4" style={{ backgroundColor: '#FFFFFF', maxWidth: '800px', width: '100%' }}>
                <div className="text-center mb-4">
                    <img src={logo} alt="ESUDA Logo" style={{ width: '100px' }} />
                    <h2 className="mt-2 fs-4 fw-semibold" style={{ color: '#343a40' }}>Gerenciar Certificado</h2>
                </div>

                {showErrorAlert && (
                    <div className="alert alert-danger alert-dismissible fade show mb-3" style={{ backgroundColor: buttonColor.red, color: '#FFFFFF' }}>
                        <strong>Erro!</strong> {errorMessage}
                        <button
                            type="button"
                            className="btn-close"
                            onClick={() => setShowErrorAlert(false)}
                            aria-label="Close"
                        ></button>
                    </div>
                )}

                <div className="mb-3">
                    <label htmlFor="code" className="form-label" style={{ color: '#343a40' }}>Código do Certificado</label>
                    <input
                        type="text"
                        id="code"
                        className="form-control rounded-3"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        disabled={loading || isValid}
                        style={{ borderColor: buttonColor.formBackground, color: '#343a40' }}
                        placeholder="Digite o código"
                    />
                </div>

                <button
                    className="btn w-100 text-white rounded-3 mb-3"
                    style={{ backgroundColor: buttonColor.green, height: '48px' }}
                    onClick={handleValidate}
                    disabled={loading || !code || isValid}
                    aria-label={loading ? "Validando certificado" : "Validar certificado"}
                >
                    {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                    ) : 'Validar'}
                </button>

                {isValid && pdfUrl && (
                    <div className="text-center" aria-live="polite">
                        <p className="text-success fw-bold mb-3">Certificado válido!</p>
                        <div id="pdf-container" style={{ width: '100%', height: '600px', overflow: 'auto' }}>
                            <object data={pdfUrl} type="application/pdf" width="100%" height="100%">
                                <p>Seu navegador não suporta a visualização de PDFs. <a href={pdfUrl} download>Baixe o PDF</a>.</p>
                            </object>
                        </div>
                    </div>
                )}

                {isValid === false && (
                    <div className="text-center" aria-live="polite">
                        <p className="text-danger fw-bold">Certificado inválido.</p>
                    </div>
                )}

                <div className="text-center mt-3 pt-3 border-top">
                    <Link
                        to="/"
                        className="btn btn-link text-secondary text-decoration-none"
                    >
                        Voltar para a página inicial
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ValidateCertificate;