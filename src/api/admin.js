import { BASE_URL } from "./BASE_URL";

export const login = async (e, loginInfo, setLoading) => {
    e.preventDefault();
    const { email, password, navigate } = loginInfo;

    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await fetch(`${BASE_URL}auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                email,
                password
            }),
            credentials: "include"
        });

        if (response.ok) {
            localStorage.setItem("isLoggedIn", "true");
            if (navigate) {
                navigate("/dashboard");
            }
        } else {
            let errorData = {};
            try {
                errorData = await response.json();
            } catch (parseError) {
                console.error("Falha ao parsear corpo da resposta de erro JSON:", parseError);
            }
            const errorMessage = errorData.message || `Erro ${response.status}: ${response.statusText || 'Ocorreu um problema no login.'}`;
            alert(`Falha no login: ${errorMessage}`);
        }

    } catch (err) {
        console.error("Erro na requisição de login (bloco catch):", err);
        alert(`Erro na requisição: ${err.message || "Não foi possível conectar ao servidor."}`);
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const getAllCourses = async (setLoading) => {
    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await fetch(`${BASE_URL}admin/courses`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: `Erro HTTP ${response.status} sem corpo JSON` }));
            alert(errorData.message || `HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        alert(`Erro na requisição: ${err.message || "Não foi possível conectar ao servidor."}`);
    } finally {
        if (setLoading) {
            setLoading(false)
        }
    }
};

export const addCourse = async (newCourse, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await fetch(`${BASE_URL}admin/courses`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                "name": newCourse.name,
                "workload": Number(newCourse.workload),
                "description": newCourse.description,
                "course_date": newCourse.courseDate
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Erro:", errorData);
            alert(errorData.message || `Erro ${response.status}`);
            return;
        }

        const data = await response.json();
        return data;
    } catch (err) {
        alert(`Erro na requisição: ${err.message || "Não foi possível conectar ao servidor."}`);
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const editCourse = async (course, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await fetch(`${BASE_URL}admin/courses/${course.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                "name": course.name,
                "workload": Number(course.workload),
                "description": course.description,
                "course_date": course.courseDate
            }),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Erro:", errorData);
            alert(errorData.message || `Erro ${response.status}`);
            return;
        }

        const data = await response.json();
        return data;
    } catch (err) {
        alert(`Erro na requisição: ${err.message || "Não foi possível conectar ao servidor."}`);
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const deleteCourse = async (courseId, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await fetch(`${BASE_URL}admin/courses/${courseId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.error("Erro:", errorData);
            alert(errorData.message || `Erro ${response.status}`);
            return;
        }

        const data = await response.json();
        return data;
    } catch (err) {
        alert(`Erro na requisição: ${err.message || "Não foi possível conectar ao servidor."}`);
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const addStudent = async (student, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await fetch(`${BASE_URL}admin/students`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                full_name: student.name,
                email: student.email,
                cpf: student.cpf,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const getAllStudents = async (setLoading) => {
    if (setLoading) {
        setLoading(true);
    }
    try {
        const response = await fetch(`${BASE_URL}admin/students`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const editStudent = async (student, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }
    try {
        const response = await fetch(`${BASE_URL}admin/students/${student.id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({
                full_name: student.name,
                email: student.email,
                cpf: student.cpf,
            }),
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const deleteStudent = async (studentId, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }
    try {
        const response = await fetch(`${BASE_URL}admin/students/${studentId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const issueCertificate = async (certificateData, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await fetch(`${BASE_URL}admin/certificates/issue`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(certificateData),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `Erro ${response.status}`);
        }
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const getCertificateDetails = async (code, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }
    try {
        const response = await fetch(`${BASE_URL}public/certificates/download/${code}`, {
            method: "GET",
        });
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Código inválido.');
        }
        return true;
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const getAllAdmins = async (setLoading) => {
    if (setLoading) {
        setLoading(true);
    }
    try {
        const response = await fetch(`${BASE_URL}admin/admins`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const createAdmin = async (adminData, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }
    try {
        const response = await fetch(`${BASE_URL}admin/admins`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(adminData),
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const updateAdmin = async (adminId, adminData, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await fetch(`${BASE_URL}admin/admins/${adminId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(adminData),
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const deleteAdmin = async (adminId, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }

    try {
        const response = await fetch(`${BASE_URL}admin/admins/${adminId}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!response.ok) throw new Error(await response.text());
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const downloadCertificatePdf = async (code, setLoading) => {
    if (setLoading) {
        setLoading(true);
    }
    try {
        const response = await fetch(`${BASE_URL}certificates/download/${code}`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }

        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        const filename = response.headers.get('content-disposition')?.split('filename=')[1] || `certificate_${code}.pdf`;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const getAllCertificates = async (setLoading) => {
    if (setLoading) {
        setLoading(true);
    }
    try {
        const response = await fetch(`${BASE_URL}admin/certificates`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
        });
        if (!response.ok) {
            throw new Error(await response.text());
        }
        return await response.json();
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) {
            setLoading(false);
        }
    }
};

export const fetchCertificatePdf = async (code, setLoading) => {
    if (setLoading) setLoading(true);
    try {
        const response = await fetch(`${BASE_URL}public/certificates/download/${code}`, {
            method: "GET",
        });
        if (!response.ok) throw new Error(await response.text());
        const blob = await response.blob();
        return blob;
    } catch (err) {
        throw err;
    } finally {
        if (setLoading) setLoading(false);
    }
};
