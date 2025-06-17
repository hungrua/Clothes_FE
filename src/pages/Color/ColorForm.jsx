// src/pages/Color/ColorForm.jsx
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { toast } from "react-toastify";

const ColorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      colorCode: "",
      colorName: "",
      description: "",
    },
  });

  // Nếu có ID → lấy dữ liệu để cập nhật
  useEffect(() => {
    if (id) {
      api.getColorById(id).then((res) => {
        const color = res.result;
        setValue("colorCode", color.colorCode);
        setValue("colorName", color.colorName);
        setValue("description", color.description);
      });
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const request = id ? api.updateColor(id, data) : api.createColor(data);
    request
      .then(() => {
        toast.success(id ? "Cập nhật thành công" : "Tạo mới thành công");
        navigate("/colors");
      })
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
      <TextField
        label="Color Code"
        {...register("colorCode")}
        fullWidth
        margin="normal"
         slotProps={{ inputLabel: { shrink: true } }} 
      />
      <TextField
        label="Color Name"
        {...register("colorName")}
        fullWidth
        margin="normal"
         slotProps={{ inputLabel: { shrink: true } }} 
      />
      <TextField
        label="Description"
        {...register("description")}
        fullWidth
        margin="normal"
        multiline
        slotProps={{ inputLabel: { shrink: true } }}
      />
      <Button type="submit" variant="contained">
        {id ? "Cập nhật" : "Lưu"}
      </Button>
    </Box>
  );
};

export default ColorForm;
