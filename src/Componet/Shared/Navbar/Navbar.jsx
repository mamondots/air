import Container from "../Container";
import logoImg from '../../../assets/images/logo.png'
import { Link } from "react-router-dom";
import Search from "./Search";
import MenuDropdown from "./MenuDropdown";

const Navbar = () => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
           <div className="py-4 border-b-[1px]">
            <Container>
                <div className="flex justify-between items-center gap-3 md:gap-0">
                    <div>
                   <Link to='/'>
                   <img className="cursor-pointer hidden md:block" src={logoImg} alt="logo" width='100' height='100' />
                   </Link>
                    </div>
                    <div>
                        <Search></Search>
                    </div>
                    <div>
                        <MenuDropdown></MenuDropdown>
                    </div>
                </div>
            </Container>
            </div> 
        </div>
    );
};

export default Navbar;