import { useState, useContext } from "react";
import { TextField, MenuItem, Button, Box } from "@mui/material";
import { AuthContext } from "@/context/AuthContext";


const FilterForm = ({ onFilter, onClear }) => {

  const { adm } = useContext(AuthContext)

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

  const handleClear = () => {
    setFormFiltro({
      cpf: "",
      status: "",
      description: "",
      startDate: "",
      endDate: "",
    });
    onClear(formFiltro);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", gap: 2, alignItems: "center", paddingTop: 2 }}>
      
        {adm == "true" && <TextField
            label="CPF"
            name="cpf"
            value={formFiltro.cpf}
            onChange={handleChange}
            size="small"
          />
      }
      
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
        label="Start Date"
        type="date"
        name="startDate"
        value={formFiltro.startDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        size="small"
      />

      <TextField
        label="End Date"
        type="date"
        name="endDate"
        value={formFiltro.endDate}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        size="small"
      />

      <Button type="submit" variant="contained" color="primary">
        Filter
      </Button>

      <Button onClick={handleClear} variant="contained" color="primary">
        Clear
      </Button>
    </Box>
  );
};

export default FilterForm;