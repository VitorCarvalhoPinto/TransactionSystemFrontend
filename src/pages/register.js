"use client"

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

const Register = () => {
    
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const handleRegister = async (e) => {
        e.preventDefault();
        
        try{
            const response = await api.post("/users/register", { email, password });

            alert("Registered with success")
            router.push('/')

        } catch (e){
            console.log(e)
        }
    }

    return(
        <>
            <div>
                <form onSubmit={handleRegister}>

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
                
                <p>Alredy have an account? <a href="/login">Login</a></p>
            </div>
        </>
    );

}

export default Register;