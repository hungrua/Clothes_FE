// src/pages/Type/TypeForm.jsx
import { Controller, useForm } from "react-hook-form";
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
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const TypeForm = () => {
  const { id } = useParams(); // Lấy id từ URL nếu có
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  const { register, handleSubmit, setValue, control } = useForm({
    defaultValues: {
      code: "",
      name: "",
      description: "",
      type_id: "",
    },
  });

  useEffect(() => {
    api.getTypes().then((data) => setCategories(data.result || []));

    if (id) {
      api.getTypeDetailById(id).then((res) => {
        const detail = res.result;
        console.log("1111", detail);
        setValue("code", detail.code);
        setValue("name", detail.name);
        setValue("description", detail.description);
        setValue("type_id", detail?.clothesType.id || "");
      });
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const request = id
      ? api.updateTypeDetails(id, data)
      : api.createTypeDetails(data);

    request
      .then(() => {
        toast.success(id ? "Cập nhật thành công" : "Tạo mới thành công");
        navigate("/typeDetails");
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
      <TextField label="Code" {...register("code")} fullWidth margin="normal" />
      <TextField label="Name" {...register("name")} fullWidth margin="normal" />
      <TextField
        label="Description"
        {...register("description")}
        fullWidth
        margin="normal"
        multiline
      />
      <FormControl fullWidth margin="normal">
        <InputLabel id="type-label">Thể loại</InputLabel>
        <Controller
          name="type_id"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select labelId="type-label" label="Thể loại" {...field}>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>
                  {cat.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <Button type="submit" variant="contained">
        {id ? "Cập nhật" : "Lưu"}
      </Button>
    </Box>
  );
};

export default TypeForm;
