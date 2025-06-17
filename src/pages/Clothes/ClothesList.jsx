// src/pages/Clothes/ClothesList.jsx
import { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
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

const ClothesList = () => {
  const [clothes, setClothes] = useState([]);

  useEffect(() => {
    api.getClothes().then((data) => setClothes(data?.result || []));
  }, []);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa quần áo này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteClothes(id).then(() => {
          setClothes(clothes.filter((item) => item.id !== id));
          Swal.fire("Đã xóa!", "Quần áo đã được xóa thành công.", "success");
        });
      }
    });
  };

  return (
    <>
      <h1>Danh sách Quần áo</h1>
      <Button
        component={Link}
        to="/clothes/new"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Thêm Quần áo
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã quần áo</TableCell>
            <TableCell>Tên quần áo</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Loại Quần áo</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {clothes.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.clothesCode}</TableCell>
              <TableCell>{item.clothesName}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>
                {item.typeDetails.map((type) => type.name).join(", ")}
              </TableCell>{" "}
              <TableCell sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <IconButton
                  size="small"
                  component={Link}
                  to={`/clothes/new/${item.id}`}
                  variant="outlined"
                  color="primary"
                >
                  <i className="ri-edit-line"></i>
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleDelete(item.id)}
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

export default ClothesList;
