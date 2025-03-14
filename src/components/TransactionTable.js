import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Select, MenuItem } from "@mui/material";

const TransactionTable = ({ transactions, handleStatusChange }) => {
    return (
        <TableContainer component={Paper} sx={{minWidth: 600, maxWidth: 1000}}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>CPF</TableCell>
                        <TableCell>Description</TableCell>
                        <TableCell>Transaction Date</TableCell>
                        <TableCell>Points</TableCell>
                        <TableCell>Value</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {transactions.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.cpf}</TableCell>
                            <TableCell>{row.description}</TableCell>
                            <TableCell>{row.transactionDate}</TableCell>
                            <TableCell>{row.points}</TableCell>
                            <TableCell>{row.value}</TableCell>
                            <TableCell>{row.status}</TableCell>
                            <TableCell>
                                <Select
                                    value={row.status}
                                    onChange={(e) => handleStatusChange(row.id, e.target.value)}
                                    size="small"
                                    sx={{ minWidth: 120 }} // Ajusta o tamanho do campo
                                >
                                    <MenuItem value="pending">Pending</MenuItem>
                                    <MenuItem value="approved">Approved</MenuItem>
                                    <MenuItem value="denied">Denied</MenuItem>
                                </Select>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TransactionTable;