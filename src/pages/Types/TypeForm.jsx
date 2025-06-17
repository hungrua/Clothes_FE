// src/pages/Category/CategoryForm.jsx
import { useForm } from "react-hook-form";
import { api } from "../../services/api";
import { Button, TextField, Box } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useEffect } from "react";

const CategoryForm = () => {
  const { id } = useParams(); // lấy id nếu là edit
  const navigate = useNavigate();

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      code: "",
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    if (id) {
      api.getTypeById(id).then((res) => {
        const data = res.result;
        setValue("code", data.code);
        setValue("name", data.name);
        setValue("description", data.description);
      });
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const request = id ? api.updateType(id, data) : api.createType(data);

    request
      .then(() => {
        toast.success(id ? "Cập nhật thành công" : "Tạo mới thành công");
        navigate("/types");
      })
      .catch((error) => {
        const message = error?.response?.data?.message || "Có lỗi xảy ra!";
        toast.error(message);
      });
  };

  return (
    <>
      <h1>{id ? "Cập nhật Thể loại" : "Thêm Thể loại"}</h1>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ maxWidth: 600 }}
      >
        <TextField
          label="Code"
          {...register("code")}
          fullWidth
          margin="normal"
          slotProps={{ inputLabel: { shrink: true } }}
        />
        <TextField
          label="Name"
          {...register("name")}
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
        <Button
          type="button"
          variant="outlined"
          onClick={() => navigate("/types")}
          sx={{ marginRight: 2 }}
        >
          Quay lại
        </Button>
        <Button type="submit" variant="contained">
          {id ? "Cập nhật" : "Lưu"}
        </Button>
      </Box>
    </>
  );
};

export default CategoryForm;
