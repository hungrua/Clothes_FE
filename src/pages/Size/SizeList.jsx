import { useEffect, useState } from "react";
import { api } from "../../services/api";
import {
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

const SizeList = () => {
  const [sizes, setSizes] = useState([]);

  useEffect(() => {
    api.getSizes().then((data) => {
      setSizes(data.result || []);
    });
  }, []);
  const handleDelete = (id) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa kích thước này?",
      text: "Hành động này không thể hoàn tác!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        api.deleteSize(id).then(() => {
          setSizes(sizes.filter((item) => item.id !== id));
          Swal.fire("Đã xóa!", "Kích thước đã được xóa thành công.", "success");
        });
      }
    });
  };
  return (
    <>
      <Typography variant="h4" gutterBottom>
        Danh sách Size
      </Typography>

      <Button
        component={Link}
        to="/sizes/new"
        variant="contained"
        sx={{ mb: 2 }}
      >
        Thêm Size
      </Button>

      <TableContainer component={Paper} sx={{ maxHeight: "70vh" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell
                sx={{
                  backgroundColor: "#ffffa6",
                  fontWeight: "bold",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Code
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: "#ffffa6",
                  fontWeight: "bold",
                  position: "sticky",
                  top: 0,
                  zIndex: 1,
                }}
              >
                Thể loại
              </TableCell>
              <TableCell>Hành động</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {sizes.map((size) => (
              <TableRow key={size.id}>
                <TableCell>{size.code}</TableCell>
                <TableCell>{size.clothesType?.name || "Không rõ"}</TableCell>
                <TableCell
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <IconButton
                    color="error"
                    size="small"
                    onClick={() => handleDelete(size.id)}
                  >
                    <i className="ri-delete-bin-line"></i>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default SizeList;
