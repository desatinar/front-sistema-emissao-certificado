import Form from "./components/Form"
import { useNavigate } from "react-router";

const Signup = () => {
    const navigate = useNavigate();

    return (
        <>
            <Form navigate={navigate}/>
        </>
    );
}

export default Signup;