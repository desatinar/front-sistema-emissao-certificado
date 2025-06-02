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
            const errorMessage = data.message || `Erro no login: ${response.status} ${response.statusText}`;
            alert(`Falha no login: ${errorMessage}`);
        }

    } catch (err) {
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
