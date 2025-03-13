"use client"

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

const Login = () => {
    
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleLogin = async (e) => {
        e.preventDefault();
        try{
            const response = await api.post("/users/login", { email, password });
            
            console.log('aoo')
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            router.push('/dashboard')

        } catch (e){
            console.log(e)
        }
        
    }

    return(
        <>
            <div>
                <form onSubmit={handleLogin}>

                    <input 
                        type="text" 
                        placeholder="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input 
                        type="password" 
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button type="submit">Enter</button>

                </form>
                
                <p>Don't have an account? <a href="/register">Register</a></p>
            </div>
        </>
    );

}

export default Login;