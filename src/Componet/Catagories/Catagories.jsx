import Container from "../Shared/Container";
import CategoriesBox from "./CategoriesBox";
import { categories } from "./categoriesData";

const Catagories = () => {
    return (
        <div>
            <Container>
            <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto">
             {
                categories.map(item =><CategoriesBox
                    label={item.label}
                    icon={item.icon}
                key={item.label}
                
                >

                </CategoriesBox>)
             }
            </div>
            </Container>
        </div>
    );
};

export default Catagories;