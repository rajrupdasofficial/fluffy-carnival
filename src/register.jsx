import { useState } from "react";
import axios from "axios";
export default function Register(){
    const [username, setUsername] = useState('');
    const [password, setPassword]=useState('');
    async function register(ev){
        ev.preventDefault();
        await axios.post('/register',{username,password});
    }
    return (
        <div className="bg-orange-50 h-screen flex items-center">
            <form  className="w-60 mx-auto mb-12" onSubmit={register}>
                <input value={username} onChange={ev=>setUsername(ev.target.value)} type="text" name="username"  placeholder ="input your username" className="block w-full rounded-sm p-2 mb-2 border" />
                <input value={password}  onChange={ev=>setPassword(ev.target.value)} type="password" name="password"  placeholder="Input your password" className="block w-full rounded-sm p-2 mb-2 border"/>
                <button className="bg-yellow-500 text-white block w-full rounded-sm p-2">Register</button>
            </form>
        </div>

    );
}