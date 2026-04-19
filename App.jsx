import { createRoot } from "react-dom/client";
import Sidebar from './src/components/sidebar'
import Icon_name from "./src/components/icon_name";
import Footer_comp from "./src/components/footer_comp";

function Main(){
    return(
        <div style={{display: 'flex',}}>
            <Sidebar />
            <Icon_name /> 
            <Footer_comp />
        </div>
    )
}

createRoot(document.querySelector('#root')).render(<Main />)