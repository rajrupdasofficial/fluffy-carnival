import { useEffect, useState } from "react"

export default function Chat(){
    const[ws,setWs]=useState(null);
    const[onlinePeople,setOnlinePeople]=useState({});
    useEffect(()=>{
           const ws = new WebSocket('ws://localhost:3999');
           setWs(ws);
           ws.addEventListener('message',handelMessage);
    },[]);
    function showOnlinePeople(peopleArray){
            const people = {};
            peopleArray.forEach(({userId,username})=>{
                people[userId]=username;
            });
            setOnlinePeople(people);
    }
    function handelMessage(ev){
        const messageData = JSON.parse(ev.data);
        if ('online' in messageData){
            showOnlinePeople(messageData.online);
        }
    }
    return (
        <div className="flex h-screen">
            <div className="bg-lime-100 p-2 w-1/3">
                <div className="text-blue-500 font-bold flex gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                    </svg>
                    Ninja Chat
                </div>
                {Object.keys(onlinePeople).map(userId=>(
                    <div className="border-b border-gray-100 py-2">{onlinePeople[userId]}</div>

                ))}
            </div>
            <div className="flex flex-col bg-azure-300 w-2/3 p-2">
                <div className="flex-grow">messges with seleced person</div>
                <div className="flex gap-2 ">
                    <input type="text" name="messages" placeholder="Type your message here" className="bg-white flex-grow border p-2 rounded-sm" />
                    <button className="bg-blue-500 p-2 text-white rounded-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}