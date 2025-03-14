import { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

const TransactionFormModal = ({ open, onClose, handleTransaction, 
    setPoints, setTransaction, setDescription,
    points, transaction, description    
}) => {
    // const [points, setPoints] = useState("");
    // const [transaction, setTransaction] = useState("");
    // const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleTransaction(e, points, transaction, description);
        onClose();
    };

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{ 
                position: "absolute", 
                top: "50%", 
                left: "50%", 
                transform: "translate(-50%, -50%)", 
                width: 400, 
                bgcolor: "background.paper", 
                boxShadow: 24, 
                p: 4 
            }}>
                <Typography variant="h6" gutterBottom>
                    Create Transaction
                </Typography>
                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Transaction Value"
                        type="number"
                        value={transaction}
                        onChange={(e) => {
                            setTransaction(e.target.value);
                            setPoints(e.target.value);
                        }}
                        margin="normal"
                    />
                    <TextField
                        fullWidth
                        label="Points"
                        type="number"
                        value={points}
                        disabled
                        margin="normal"
                    />
                    <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                        Create Transaction
                    </Button>
                </form>
            </Box>
        </Modal>
    );
};

export default TransactionFormModal;