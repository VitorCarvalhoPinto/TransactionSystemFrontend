"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/userService";
import {
    Box,
    TextField,
    Button,
    Typography,
    Link,
    Alert,
    CircularProgress,
    FormControlLabel,
    Checkbox,
} from "@mui/material";
import CPFInput from "@/components/CPFInput";

const Register = () => {
    const router = useRouter();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [cpf, setCpf] = useState("");
    const [password, setPassword] = useState("");
    const [ballance, setBallance] = useState("");
    const [adm, setAdm] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!name || !email || !cpf || !password || !ballance) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            await registerUser(name, cpf, email, password, ballance, adm);
            alert("Registered with success!");
            router.push("/");
        } catch (err) {
            setError(err.message || "An error occurred during registration.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Box
            sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: "100vh",
                backgroundColor: "#f5f5f5",
                padding: 2,
            }}
        >
            <Box
                component="form"
                onSubmit={handleRegister}
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    width: "100%",
                    maxWidth: 400,
                    backgroundColor: "white",
                    padding: 4,
                    borderRadius: 2,
                    boxShadow: 3,
                }}
            >
                <Typography variant="h4" align="center" sx={{ mb: 2 }}>
                    Register
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    label="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="CPF"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                    fullWidth
                    required
                />
                {/* <CPFInput value={cpf} onChange={setCpf} /> */}


                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="Initial Balance"
                    type="number"
                    value={ballance}
                    onChange={(e) => setBallance(e.target.value)}
                    fullWidth
                    required
                />

                <FormControlLabel
                    control={
                        <Checkbox
                            checked={adm}
                            onChange={(e) => setAdm(e.target.checked)}
                            color="primary"
                        />
                    }
                    label="Register as Admin"
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} /> : "Register"}
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Already have an account?{" "}
                    <Link href="/login" underline="hover">
                        Login
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Register;