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

const VariantsForm = () => {
  const { id } = useParams(); // lấy id nếu là cập nhật
  const { control, register, handleSubmit, setValue } = useForm();
  const navigate = useNavigate();
  const [clothes, setClothes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);

  useEffect(() => {
    // Load danh sách
    api.getClothes().then((data) => setClothes(data.result || []));
    api.getSizes().then((data) => setSizes(data.result || []));
    api.getColors().then((data) => setColors(data.result || []));

    // Nếu là cập nhật thì load data theo id
    if (id) {
      api.getVariantById(id).then((res) => {
        const data = res.result;
        setValue("clothes_id", data.clothes.id);
        setValue("size_id", data.size.id);
        setValue("color_id", data.color.id);
        setValue("quantity", data.quantity);
        setValue("price", data.price);
      });
    }
  }, [id, setValue]);

  const onSubmit = (data) => {
    const request = id ? api.updateVariant(id, data) : api.createVariant(data);

    request
      .then(() => {
        toast.success(id ? "Cập nhật thành công" : "Tạo mới thành công");
        navigate("/variants");
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
      {/* Quần áo */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="clothes-label">Quần áo</InputLabel>
        <Controller
          name="clothes_id"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select labelId="clothes-label" label="Quần áo" {...field}>
              {clothes.map((item) => (
                <MenuItem key={item.id} value={item.id}>
                  {item.clothesName}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      {/* Size */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="size-label">Size</InputLabel>
        <Controller
          name="size_id"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select labelId="size-label" label="Size" {...field}>
              {sizes.map((size) => (
                <MenuItem key={size.id} value={size.id}>
                  {size.code}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      {/* Màu sắc */}
      <FormControl fullWidth margin="normal">
        <InputLabel id="color-label">Màu sắc</InputLabel>
        <Controller
          name="color_id"
          control={control}
          defaultValue=""
          render={({ field }) => (
            <Select labelId="color-label" label="Màu sắc" {...field}>
              {colors.map((color) => (
                <MenuItem key={color.id} value={color.id}>
                  <Box
                    component="span"
                    sx={{
                      display: "inline-block",
                      width: 12,
                      height: 12,
                      borderRadius: "50%",
                      backgroundColor: color.colorCode,
                      mr: 1,
                      border: "1px solid #000",
                      verticalAlign: "middle",
                    }}
                  />
                  {color.colorName}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>

      {/* Số lượng */}
      <TextField
        label="Số lượng"
        type="number"
        {...register("quantity")}
        fullWidth
        margin="normal"
      />

      {/* Giá */}
      <TextField
        label="Giá"
        type="number"
        {...register("price")}
        fullWidth
        margin="normal"
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        {id ? "Cập nhật" : "Lưu"}
      </Button>
    </Box>
  );
};

export default VariantsForm;
