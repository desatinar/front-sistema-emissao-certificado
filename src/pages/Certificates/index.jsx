import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import useProtectedPage from "../../hooks/useProtectedPage";
import Form from "./components/Form";

const Certificates = () => {
    useProtectedPage();

    return (
        <div className="d-flex flex-column flex-lg-row min-vh-100">
            <Sidebar />
            <div className="flex-grow-1">
                <Header pageName={"Geranciamento de Certificados"}/>
                <Form />
            </div>
        </div>
    );
};

export default Certificates;
