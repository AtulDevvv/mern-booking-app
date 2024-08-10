import Footer from "../Components/Footer";
import Header from "../Components/Header";
import Hero from "../Components/Hero";
import SeacrhBar from "../Components/SeacrhBar";

interface Props{
    children:React.ReactNode;
}

const Layout=({children}:Props)=>{
    return (
        <div className=" flex flex-col min-h-screen ">

            <Header/>
            <Hero/>
            <div className="container mx-auto">
                <SeacrhBar/>
            </div>

            <div className=" container mx-auto py-4 flex-1">
                {children}
            </div>
            <Footer/>
        </div>

    )
}
export default Layout;