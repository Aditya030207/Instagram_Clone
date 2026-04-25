import { createRoot } from "react-dom/client";
import "./index.css"
import Sidebar from "./src/components/sidebar"
import Story_bar from "./src/components/story_bar"
import Body from "./src/components/body"
import Card from "./src/components/card"
import Contacts from "./src/components/contacts";

function Main(){
    return(
        <div className="flex justify-center bg-black">
            <Sidebar className="z-2"/>
            <div className="w-full">
                <Story_bar />
                <Body in ={<Card />}/>
            </div>
            <div className="w-110">
                <Contacts />
            </div>
        </div>
    )
}

createRoot(document.querySelector('#root')).render(<Main />)