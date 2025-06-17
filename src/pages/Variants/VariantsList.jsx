// src/pages/Variant/VariantList.jsx
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  Box,
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const VariantsList = () => {
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    api.getVariants().then((data) => {
      setVariants(data.result);
    });
    // Giả sử api.getVariants() trả về dữ liệu dạng { result: [...] }
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa biến thể này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteVariant(id).then(() => {
          setVariants(variants.filter((item) => item.id !== id));
          Swal.fire("Đã xóa!", "Biến thể đã được xóa thành công.", "success");
        });
      }
    });
  };

  return (
    <>
      <h1>Danh sách Biến thể</h1>
      <Button
        component={Link}
        to="/variants/new"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Thêm Biến thể
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Loại quần áo</TableCell>
            <TableCell>Size</TableCell>
            <TableCell>Màu sắc</TableCell>
            <TableCell>Số lượng</TableCell>
            <TableCell>Giá</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {variants.map((variant) => (
            <TableRow key={variant.id}>
              <TableCell>{variant.clothes.clothesName}</TableCell>
              <TableCell>{variant.size.code}</TableCell>
              <TableCell>
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 12,
                    height: 12,
                    borderRadius: "50%",
                    backgroundColor: variant.color.colorCode,
                    mr: 1, // margin right
                    border: "1px solid #000",
                    verticalAlign: "middle",
                  }}
                />
                {variant.color.colorName}
              </TableCell>
              <TableCell>{variant.quantity}</TableCell>
              <TableCell>{variant.price}</TableCell>
              <TableCell sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <IconButton
                  size="small"
                  component={Link}
                  to={`/variants/new/${variant.id}`}
                  variant="outlined"
                  color="primary"
                >
                  <i className="ri-edit-line"></i>
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleDelete(variant.id)}
                >
                  <i className="ri-delete-bin-line"></i>
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default VariantsList;
