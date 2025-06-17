// src/pages/Type/TypeList.jsx
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


const TypeDetailsList = () => {
  const [types, setTypes] = useState([]);

  useEffect(() => {
    api.getTypeDetails().then((data) => setTypes(data?.result || []));
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa loại quần áo này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteTypeDetails(id).then(() => {
          setTypes(types.filter((item) => item.id !== id));
          Swal.fire(
            "Đã xóa!",
            "Loại quần áo đã được xóa thành công.",
            "success"
          );
        });
      }
    });
  };

  return (
    <>
      <h1>Danh sách Loại Quần áo</h1>
      <Button
        component={Link}
        to="/typeDetails/new"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Thêm Loại Quần áo
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Mã thể loại quần áo</TableCell>
            <TableCell>Tên thể loại quần áo</TableCell>
            <TableCell>Mô tả</TableCell>
            <TableCell>Thể loại</TableCell>
            <TableCell>Hành động</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {types.map((type) => (
            <TableRow key={type.id}>
              <TableCell>{type.code}</TableCell>
              <TableCell>{type.name}</TableCell>
              <TableCell>{type.description}</TableCell>
              <TableCell>{type?.clothesType.name}</TableCell>{" "}
              <TableCell sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                <IconButton
                  size="small"
                  component={Link}
                  to={`/typeDetails/new/${type.id}`}
                  variant="outlined"
                  color="primary"
                >
                  <i className="ri-edit-line"></i>
                </IconButton>
                <IconButton
                  color="error"
                  size="small"
                  onClick={() => handleDelete(type.id)}
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

export default TypeDetailsList;
