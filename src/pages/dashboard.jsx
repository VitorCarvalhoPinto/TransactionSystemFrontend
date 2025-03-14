"use client"

import { AuthContext } from "@/context/AuthContext"
import api from "@/services/api"
import { useRouter } from "next/router"
import { useContext, useEffect, useState } from "react"
import FilterForm from "@/components/FilterForm"
import { Button, Typography, Box } from "@mui/material";
import TransactionTable from "@/components/TransactionTable";
import TransactionFormModal from "@/components/TransactionFormModal";
import CSVUpload from "@/components/CSVUpload";

import { getUserBallance } from "@/services/userService"
import { getAllTransactions, 
    getTransactionByUser, 
    createTransaction ,
    createTransactionCsv,
    updateTransactionStatus
} from "@/services/transactionService"
import CPFInput from "@/components/CPFInput"

const dashboard = () => {

    const {adm, user, logout, loading, token} = useContext(AuthContext);
    const router = useRouter();

    const [transactions, setTransactions] = useState([]) 

    const [points, setPoints] = useState();
    const [transaction, setTransaction] = useState();
    const [description, setDescription] = useState("");

    const [ballance, setBallance] = useState()
    
    const [file, setFile] = useState(null);
    const [modalOpen, setModalOpen] = useState(false);
    
    useEffect(() => {

        if (!loading && !user && !adm) {
          router.push("/");
        }

    }, [loading, user, router]);

    useEffect(() => {
        if (token && user !== undefined) {
            handleGetBallance();
            handleGetTransactions();
        }
    }, [token, adm, user]);
    
    const handleGetBallance = async () => {
        const response = await getUserBallance(user.id)
        setBallance(response)
    };

    const handleGetTransactions = async (params = "") => {
        if (adm === true) {
            const response = await getAllTransactions(params.toString());
            setTransactions(response);
        } else {
            const response = await getTransactionByUser(user.id, params.toString());
            setTransactions(response);
        }
    }

    const handleCreateTransaction = async (e) => {
        e.preventDefault();
        await createTransaction(user.id, points, description, transaction)
        await handleGetTransactions();
    }

    const handleFileSubmit = async (e) => {
        e.preventDefault();
        if (!file) {
            console.error("Nenhum arquivo selecionado");
            return;
        }
    
        const formData = new FormData();
        formData.append("file", file); 
    
        await createTransactionCsv(formData, token)
        await handleGetTransactions();
    };

    const handleStatusChange = async (transactionID, newStatus) => {
        await updateTransactionStatus(transactionID, newStatus)
    
      setTransactions((prevTransactions) =>
        prevTransactions.map((transaction) =>
          transaction.id === transactionID ? { ...transaction, status: newStatus } : transaction
        )
      );
    };

    const handleClear = () => {
        handleGetTransactions();
    }

    const handleFilter = async (filters) => {
        // console.log("Filtros aplicados:", filters);
    
        const params = new URLSearchParams();
    
        if (filters.cpf && adm) params.append("cpf", filters.cpf);
        if (filters.status) params.append("status", filters.status);
        if (filters.description) params.append("description", filters.description);
        if (filters.startDate) params.append("startDate", filters.startDate);
        if (filters.endDate) params.append("endDate", filters.endDate);
    
        try {
            const response = !adm === false ? await getTransactionByUser(user.id, params.toString()) : await getAllTransactions(params.toString())
            setTransactions(response);
        } catch (error) {
            console.error("Erro ao buscar transações filtradas:", error);
        }
    };
    

    if(!user) return null
    
    if (loading) return <p>Loading...</p>;
    

    return (
        <div>
            <Box sx={{ p: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Welcome, {user.name}!
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Email: {user.email}
                </Typography>

                <Typography variant="body1" gutterBottom>
                    Wallet: {user.ballance}
                </Typography>

                <Button onClick={logout} variant="contained" sx={{ mb: 3 }}>
                    Logout
                </Button>

                <FilterForm onFilter={handleFilter} onClear={handleClear} />

                <Button onClick={() => setModalOpen(true)} variant="contained" sx={{ mb: 3 }}>
                    Create Transaction
                </Button>

                <TransactionFormModal
                    open={modalOpen}
                    onClose={() => setModalOpen(false)}
                    handleTransaction={handleCreateTransaction}
                    user={user}
                    setPoints={setPoints}
                    setTransaction={setTransaction}
                    setDescription={setDescription}
                    points={points}
                    transaction={transaction}
                    description={description}
                />

                <CSVUpload file={file} setFile={setFile} handleFileSubmit={handleFileSubmit} />

                <TransactionTable transactions={transactions} handleStatusChange={handleStatusChange} />
            </Box>

        </div>

        
      );
}

export default dashboard