"use client"

import { AuthContext } from "@/context/AuthContext"
import api from "@/services/api"
import { useRouter } from "next/router"
import { use, useContext, useEffect, useState } from "react"
import FilterForm from "@/components/FilterForm"

const dashboard = () => {

    const {user, logout, loading, token} = useContext(AuthContext);
    const router = useRouter();

    const [transactions, setTransactions] = useState([]) 

    const [points, setPoins] = useState();
    const [transaction, setTransaction] = useState();
    const [description, setDescription] = useState("");
    
    const [file, setFile] = useState()

    useEffect(() => {

        if (!loading && !user) {
          router.push("/");
        }

    }, [loading, user, router]);

    useEffect(() => {
        if (token) {
            //   handleGetTransactions();
            handleGetUserTransactions();
        }
    }, [token]);

    const config = {
        headers: { Authorization: `Bearer ${token}` }
    };

    const configCSV = {
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"  }
    }
    
    const handleGetTransactions = async () => {
        const response = await api.get("/transactions/all", config)
        setTransactions(response.data)
    }

    const handleGetUserTransactions = async () => {
        const response = await api.get(`/transactions/user/${user.id}`, config)
        setTransactions(response.data)
    }

    const handleTransaction = async (e) => {
        const id_user  = user.id;
        e.preventDefault();
        const response = await api.post(
            "/transactions/create", 
            { id_user, points, description, value: transaction },  
            config
        )
        console.log("inserido com sucesso")
    }

    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            console.error("Nenhum arquivo selecionado");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file); 
    
        try {
            const response = await api.post("/transactions/csv", formData, configCSV);
            console.log("Arquivo enviado com sucesso!", response.data);
        } catch (error) {
            console.error("Erro ao enviar arquivo:", error);
        }
    };

    const handleStatusChange = async (transactionID, newStatus) => {
        try {
          await api.put(`/transactions/update/${transactionID}`, { status: newStatus }, {
            headers: { Authorization: `Bearer ${token}` },
          });
    
          setTransactions((prevTransactions) =>
            prevTransactions.map((transaction) =>
              transaction.id === transactionID ? { ...transaction, status: newStatus } : transaction
            )
          );
    
          console.log(`Status atualizado para ${newStatus}`);
        } catch (error) {
          console.error("Erro ao atualizar status:", error);
        }
    };

    const handleFilterAdm = async (filters) => {
        console.log("Filtros aplicados:", filters);
    
        const params = new URLSearchParams();
    
        if (filters.status) params.append("status", filters.status);
        if (filters.description) params.append("description", filters.description);
        if (filters.startDate) params.append("startDate", filters.startDate);
        if (filters.endDate) params.append("endDate", filters.endDate);
    
        try {
            const response = await api.get(`/transactions/all?${params.toString()}`);
            setTransactions(response.data);
        } catch (error) {
            console.error("Erro ao buscar transações filtradas:", error);
        }
    };

    const handleFilter = async (filters) => {
        console.log("Filtros aplicados:", filters);
    
        const params = new URLSearchParams();
    
        if (filters.status) params.append("status", filters.status);
        if (filters.description) params.append("description", filters.description);
        if (filters.startDate) params.append("startDate", filters.startDate);
        if (filters.endDate) params.append("endDate", filters.endDate);
    
        try {
            const response = await api.get(`/transactions/user/${user.id}?${params.toString()}`);
            setTransactions(response.data);
        } catch (error) {
            console.error("Erro ao buscar transações filtradas:", error);
        }
    };
    

    if(!user) return null
    
    if (loading) return <p>Loading...</p>;
    

    return (
        <div>

            <h1>Welcome, {user.name}!</h1>
            <p>Email: {user.email}</p>
            <p>Wallet: {user.ballance}</p>
            <button onClick={logout}>Sair</button>

            <FilterForm onFilter={handleFilter} />

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>CPF</th>
                            <th>Description</th>
                            <th>Transaction Date</th>
                            <th>Points</th>
                            <th>Value</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {transactions.map((row, index) => (
                            <tr key={index}>
                                <td>
                                    {row.cpf}
                                </td>

                                <td>
                                    {row.description}
                                </td>

                                <td>
                                    {row.transactionDate}
                                </td>

                                <td>
                                    {row.points}
                                </td>

                                <td>
                                    {row.value}
                                </td>

                                <td>
                                    {row.status}
                                </td>
                                <td>
                                    <select
                                        value={row.status}
                                        onChange={(e) => handleStatusChange(row.id, e.target.value)}
                                    >
                                        <option value="pending">Pending</option>
                                        <option value="approved">Approved</option>
                                        <option value="denied">Denied</option>
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <form onSubmit={handleTransaction}>
                <input 
                    type="text"
                    placeholder="Description" 
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <input 
                    type="number"
                    placeholder="Transaction Value" 
                    value={transaction}
                    onChange={(e) => {setTransaction(e.target.value), setPoins(e.target.value)}}
                />

                <input 
                    disabled
                    type="number"
                    placeholder="Points" 
                    value={points}
                />     

                <button type="submit">Create transaction</button>       
            </form>
            <input type="file" accept=".csv" onChange={(e) => setFile(e.target.files[0])}/>
            <button onClick={handleFileSubmit} disabled={!file}>Submit CSV</button>
        </div>
      );
}

export default dashboard