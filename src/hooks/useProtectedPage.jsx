import { useEffect } from "react";
import { useNavigate } from "react-router";

const useProtectedPage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if(!token){
            navigate("/login");
        }

    }), [];
}

export default useProtectedPage;