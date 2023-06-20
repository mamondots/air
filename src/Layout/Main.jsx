import { Outlet } from "react-router-dom";
import Navbar from "../Componet/Shared/Navbar/Navbar";
import Footer from "../Componet/Shared/Footer/Footer";


const Main = () => {
    return (
        <div>
             <Navbar></Navbar>
             <div className="pt-20 pb-20"><Outlet></Outlet></div>
             <Footer></Footer>
        </div>
    );
};

export default Main;