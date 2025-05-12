import Sidebar from "../Dashboard/components/Sidebar";
import Header from "../Dashboard/components/Header";
import MainContent from "../Dashboard/components/MainContent";
import { useEffect } from "react";
import useProtectedPage from "../../hooks/useProtectedPage";

const Dashboard = () => {
    useProtectedPage();

    return (
        <div className="d-flex flex-column flex-lg-row min-vh-100">
            <Sidebar />
            <div className="flex-grow-1">
                <Header />
                <MainContent />
            </div>
        </div>
    );
};

export default Dashboard;
