import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import Form from "./components/Form";
import useProtectedPage from "../../hooks/useProtectedPage";

const Students = () => {
    useProtectedPage();

    return (
        <div className="d-flex flex-column flex-lg-row min-vh-100">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <Form />
            </div>
        </div>
    );
};

export default Students;
