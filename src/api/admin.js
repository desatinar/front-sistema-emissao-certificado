import { BASE_URL } from "./BASE_URL";

export const login = (e, loginInfo, setLoading) => {
        e.preventDefault();
        const { email, password, navigate } = loginInfo;

        if (setLoading){
            setLoading(true);
        }

        fetch(`${BASE_URL}auth/login`, {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then((res) => {
            if(res.status === 200) {
                localStorage.setItem("token", "admin")
                navigate("/dashboard")
            }
        }).catch(err => alert(err)
        ).finally(() => {
            if (setLoading) {
                setLoading(false)
            }
        });
    }