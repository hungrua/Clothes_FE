// src/pages/Size/SizeForm.jsx
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
const SizeForm = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    api.getTypes().then((data) => setCategories(data.result || []));
  }, []);

  const onSubmit = (data) => {
    api
      .createSize(data)
      .then(() => navigate("/sizes"))
      .catch((error) => {
        const message = error?.response?.data?.message || "Có lỗi xảy ra!";
        toast.error(message);
      });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{ maxWidth: 600 }}
    >
      <TextField label="Code" {...register("code")} fullWidth margin="normal" />
      <FormControl fullWidth margin="normal">
        <InputLabel>Thể loại</InputLabel>
        <Select
          {...register("type_id")}
          slotProps={{ inputLabel: { shrink: true } }}
        >
          {categories.map((cat) => (
            <MenuItem key={cat.id} value={cat.id}>
              {cat.code}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained">
        Lưu
      </Button>
    </Box>
  );
};

export default SizeForm;
