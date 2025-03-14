import api from "./api";

export const loginUser = async (email, password) => {
    const response = await api.post("/users/login", { email, password });

    // localStorage.removeItem("user");
    // localStorage.removeItem("token");
    // localStorage.removeItem("adm");
    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("adm", JSON.stringify(response.data.user.adm));

    return response.data
}

export const registerUser = async (name, cpf, email, password, ballance, adm) => {
    try{
        const response = await api.post("/users/register", { name, cpf, email, password, ballance, adm });
        return response;
    }catch (error) {
        alert(error);
        return [];
    }
}

export const getUserBallance = async (id) => {
    try{
        const response = await api.get(`/users/ballance/${id}`)
        return response.data
    }catch (error) {
        alert(error);
        return [];
    }
}
