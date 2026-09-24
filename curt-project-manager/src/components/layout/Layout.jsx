import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Toast from "../common/Toast";
import {useAppContext} from "../../context/useAppContext";
function Layout() {
    const {toast} = useAppContext();
    return (
    <>
        <Navbar/>
        {toast && (
            <Toast message={toast.message} type={toast.type}/>
        )}
        <main>
            <Outlet/>
        </main>
    </>
    );
}

export default Layout;