import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import useProtectedPage from "../../hooks/useProtectedPage";
import Form from "./components/Form";

const Courses = () => {
    useProtectedPage();

    return (
        <div className="d-flex flex-column flex-lg-row min-vh-100">
            <Sidebar />
            <div className="flex-grow-1">
                <Header pageName={"Geranciamento de Cursos"}/>
                <Form />
            </div>
        </div>
    );
};

export default Courses;
