import { createRoot } from "react-dom/client";
import Sidebar from './src/components/sidebar'
import Icon_name from "./src/components/icon_name";

function Main(){
    return(
        <div style={{display: 'flex',}}>
            <Sidebar />
            <Icon_name />
        </div>
    )
}

createRoot(document.querySelector('#root')).render(<Main />)