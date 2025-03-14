import { useState } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";

const FilterForm = ({ onFilter }) => {
  const [formFiltro, setFormFiltro] = useState({
    cpf: "",
    status: "",
    description: "",
    startDate: "",
    endDate: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFiltro((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFilter(formFiltro);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, alignItems: "center", paddingTop: 2 }}>
      <TextField
        label="CPF"
        name="cpf"
        value={formFiltro.cpf}
        onChange={handleChange}
        size="small"
      />
      
      <TextField
        select
        label="Status"
        name="status"
        value={formFiltro.status}
        onChange={handleChange}
        size="small"
      >
        <MenuItem value="">Todos</MenuItem>
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="approved">Approved</MenuItem>
        <MenuItem value="denied">Denied</MenuItem>
      </TextField>

      <TextField
        label="Descrição"
        name="description"
        value={formFiltro.description}
        onChange={handleChange}
        size="small"
      />

      <TextField
        label="Data Inicial"
        type="date"
        name="startDate"
        value={formFiltro.startDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        size="small"
      />

      <TextField
        label="Data Final"
        type="date"
        name="endDate"
        value={formFiltro.endDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        size="small"
      />

      <Button type="submit" variant="contained" color="primary">
        Filtrar
      </Button>
    </Box>
  );
};

export default FilterForm;