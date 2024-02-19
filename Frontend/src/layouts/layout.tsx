import Footer from "../components/Footer";
import Header from "../components/Header";
import Headnext from "../components/Headnext";


interface Props {
    children: React.ReactNode;
}

const layout = ({children}: Props) => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header></Header>
            <Headnext></Headnext>
            <div className="container mx-auto py-10 flex-1">
                {children}
            </div>

            <Footer></Footer>
        </div>

    );

    
};

export default layout;