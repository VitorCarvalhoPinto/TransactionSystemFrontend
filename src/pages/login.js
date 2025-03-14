"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/userService";
import { 
    Box, 
    TextField, 
    Button, 
    Typography, 
    Link, 
    Alert, 
    CircularProgress 
} from "@mui/material";

const Login = () => {
    const router = useRouter();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        if (!email || !password) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        try {
            await loginUser(email, password);
            router.push("/dashboard");
        } catch (err) {
            setError(err.message || "An error occurred during login.");
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
                onSubmit={handleLogin}
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
                    Login
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <TextField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    fullWidth
                    required
                />

                <TextField
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                    required
                />

                <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    fullWidth
                    sx={{ mt: 2 }}
                >
                    {loading ? <CircularProgress size={24} /> : "Enter"}
                </Button>

                <Typography variant="body2" align="center" sx={{ mt: 2 }}>
                    Don't have an account?{" "}
                    <Link href="/register" underline="hover">
                        Register
                    </Link>
                </Typography>
            </Box>
        </Box>
    );
};

export default Login;