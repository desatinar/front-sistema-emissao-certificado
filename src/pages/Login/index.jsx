import Form from "./components/Form";
import { useNavigate } from "react-router";

const Login = () => {
    const navigate = useNavigate();

    return (
        <Form navigate={navigate}/>
    );
}

export default Login;