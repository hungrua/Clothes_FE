import { useForm, Controller } from "react-hook-form";
import { api } from "../../services/api";
import {
  Button,
  TextField,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ClothesForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [types, setTypes] = useState([]);

  const { register, handleSubmit, control, setValue } = useForm({
    defaultValues: {
      clothesCode: "",
      clothesName: "",
      description: "",
      typeDetails: [],
    },
  });

  useEffect(() => {
    // Lấy danh sách loại quần áo
    api.getTypeDetails().then((data) => setTypes(data.result || []));

    // Nếu có ID → đang sửa → gọi API để fill form
    if (id) {
      api.getClothesById(id).then((res) => {
        const clothes = res.result;
        setValue("clothesCode", clothes.clothesCode);
        setValue("clothesName", clothes.clothesName);
        setValue("description", clothes.description);
        setValue(
          "typeDetails",
          clothes.typeDetails.map((t) => t.id)
        );
      });
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const request = id ? api.updateClothes(id, data) : api.createClothes(data);
    request
      .then(() => {
        toast.success(id ? "Cập nhật thành công" : "Tạo mới thành công");
        navigate("/clothes");
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
        label="Clothes Code"
        {...register("clothesCode")}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }} // ✅ Cách mới
      />
      <TextField
        label="Clothes Name"
        {...register("clothesName")}
        fullWidth
        margin="normal"
        slotProps={{ inputLabel: { shrink: true } }} // ✅ Cách mới
      />
      <TextField
        label="Description"
        {...register("description")}
        fullWidth
        margin="normal"
        multiline
        slotProps={{ inputLabel: { shrink: true } }} // ✅ Cách mới   
      />

      <FormControl fullWidth margin="normal">
        <InputLabel>Loại quần áo</InputLabel>
        <Controller
          name="typeDetails"
          control={control}
          render={({ field }) => (
            <Select
              multiple
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
              renderValue={(selected) => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {selected.map((id) => {
                    const found = types.find((type) => type.id === id);
                    return <Chip key={id} label={found?.name || id} />;
                  })}
                </Box>
              )}
            >
              {types.map((type) => (
                <MenuItem key={type.id} value={type.id}>
                  {type.name}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <Button type="submit" variant="contained">
        {id ? "Cập nhật" : "Tạo mới"}
      </Button>
    </Box>
  );
};

export default ClothesForm;
