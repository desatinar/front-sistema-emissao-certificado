import Sidebar from "../../components/Sidebar";
import Header from "../../components/Header";
import MainContent from "../Dashboard/components/MainContent";
import useProtectedPage from "../../hooks/useProtectedPage";

const Dashboard = () => {
    useProtectedPage();

    return (
        <div className="d-flex flex-column flex-lg-row min-vh-100">
            <Sidebar />
            <div className="flex-grow-1">
                <Header pageName={"Dashboard"}/>
                <MainContent />
            </div>
        </div>
    );
};

export default Dashboard;
