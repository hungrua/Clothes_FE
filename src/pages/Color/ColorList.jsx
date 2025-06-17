// src/pages/Color/ColorList.jsx
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


const ColorList = () => {
  const [colors, setColors] = useState([]);

  useEffect(() => {
    api.getColors().then((data) => setColors(data.result || []));
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa màu sắc này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteColor(id).then(() => {
          setColors(colors.filter((item) => item.id !== id));
          Swal.fire("Đã xóa!", "Màu sắc đã được xóa thành công.", "success");
        });
      }
    });
  };

  return (
    <>
      <h1>Danh sách Màu sắc</h1>
      <Button
        component={Link}
        to="/colors/new"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Thêm Màu sắc
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mẫu</TableCell>
            <TableCell>Mã màu</TableCell>
            <TableCell>Tên màu</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {colors.map((color) => (
            <TableRow key={color.id}>
              <TableCell>
                <Box
                  component="span"
                  sx={{
                    display: "inline-block",
                    width: 24,
                    height: 24,
                    borderRadius: "50%",
                    backgroundColor: color.colorCode,
                    border: "1px solid #000",
                    mr: 1, // margin right
                  }}
                />
              </TableCell>
              <TableCell>{color.colorCode}</TableCell>
              <TableCell>{color.colorName}</TableCell>
              <TableCell>{color.description}</TableCell>
              <TableCell sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <IconButton
                  size="small"
                  component={Link}
                  to={`/colors/new/${color.id}`}
                  variant="outlined"
                  color="primary"
                >
                  <i className="ri-edit-line"></i>
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleDelete(color.id)}
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

export default ColorList;
