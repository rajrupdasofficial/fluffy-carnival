import { useContext, useState } from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
export default function RegisterAndLoginForm(){
    const [username, setUsername] = useState('');
    const [password, setPassword]=useState('');
    const [isLoginOrRegister, setisLoginOrRegister]=useState('register');
    const{setUsername:setLoggedInUsername,setId}= useContext(UserContext);
    async function handleSubmit(ev){
        ev.preventDefault();
        const url = isLoginOrRegister === 'register'?'register':'login';
        const {data}=await axios.post(url,{username,password});
        setLoggedInUsername(username);
        setId(data.id);
    }
    return (
        <div className="bg-orange-50 h-screen flex items-center">
            <form  className="w-60 mx-auto mb-12" onSubmit={handleSubmit}>
                <input value={username} onChange={ev=>setUsername(ev.target.value)} type="text" name="username"  placeholder ="input your username" className="block w-full rounded-sm p-2 mb-2 border" />
                <input value={password}  onChange={ev=>setPassword(ev.target.value)} type="password" name="password"  placeholder="Input your password" className="block w-full rounded-sm p-2 mb-2 border"/>
                <button className="bg-yellow-500 text-white block w-full rounded-sm p-2">{isLoginOrRegister === 'register' ? 'Register' : 'Login'}</button>
                <div className="text-center mt-2">
                {isLoginOrRegister==='register' && (
                    <div>
                        Already a member? 
                        <button onClick={()=> setisLoginOrRegister('login')}>Login here</button>
                    </div>
                        
                )}
                {isLoginOrRegister=='login' &&(
                     <div>
                        Don't have account?
                     <button onClick={()=> setisLoginOrRegister('register')}>Register</button>
                 </div>
                     
                )}
                </div>
            </form>
        </div>

    );
}
