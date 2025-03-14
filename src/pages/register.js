"use client"

import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

const Register = () => {
    
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [ballance, setBallance] = useState("");
    
    const handleRegister = async (e) => {
        e.preventDefault();
        
        try{
            const response = await api.post("/users/register", { name, cpf, email, password, ballance });

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
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input 
                        type="text" 
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    
                    <input 
                        type="text" 
                        placeholder="CPF"
                        value={cpf}
                        onChange={(e) => setCpf(e.target.value)}
                    />

                    <input 
                        type="password" 
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    
                    <input 
                        type="text" 
                        placeholder="Ballance"
                        value={ballance}
                        onChange={(e) => setBallance(e.target.value)}
                    />

                    <button type="submit">Enter</button>

                </form>
                
                <p>Alredy have an account? <a href="/login">Login</a></p>
            </div>
        </>
    );

}

export default Register;