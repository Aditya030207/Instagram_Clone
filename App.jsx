import React from "react";
import "./src/index.css"
import Sidebar from "./src/components/sidebar"
import Story_bar from "./src/components/story_bar"
import Body from "./src/components/body"
import Contacts from "./src/components/contacts";

function Main(){
    return(
        <div className="flex min-h-screen bg-black">
            {/* Sidebar */}
            <div className="fixed h-full border-r border-gray-800">
                <Sidebar />
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 items-center ml-20">
                <div className="w-[630px] flex flex-col items-center">
                    <Story_bar />
                    <Body />
                </div>
            </div>

            {/* Right Sidebar (Suggestions) */}
            <div className="hidden lg:block w-[350px] mr-10 mt-10">
                <Contacts />
            </div>
        </div>
    )
}

export default Main