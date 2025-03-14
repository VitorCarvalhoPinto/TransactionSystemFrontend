import api from "./api";

export const getAllTransactions = async (filter = {}) => {
    try {
        const response = await api.get(`/transactions/all?${filter}`, )
        return response.data;
    } catch(error) {
        alert(error);
    }
}

export const getTransactionByUser = async (id, filter = {}) => {
    try {
        const response = await api.get(`/transactions/user/${id}?${filter}`)
        return response.data;
    } catch(error) {
        alert(error);
    }
}

export const createTransaction = async (id_user, points, description, transaction) => {
    try {
        const response = await api.get("/transactions/create", { id_user, points, description, value: transaction })
        alert("inserido com sucesso")
        return response.data;
    } catch(error) {
        alert(error);
    }
}

export const createTransactionCsv = async (formData, token) => {
    const configCSV = {
        headers: { 
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data"  }
    }

    try {
        const response = await api.post("/transactions/csv", formData, configCSV)
        alert("Arquivo enviado com sucesso!", response.data)
        return response.data;
    } catch(error) {
        alert(error);
    }
}

export const updateTransactionStatus = async (transactionID, status) => {
    try {
        const response = await api.put(`/transactions/update/${transactionID}`, { status })
        alert(`Status atualizado para ${status}`)
        return response.data;
    } catch(error) {
        alert(error);
    }
}