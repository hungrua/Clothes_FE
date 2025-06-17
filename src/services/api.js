// src/services/api.js
import axios from "axios";
import { get } from "react-hook-form";

// Thay bằng base URL của API thật
const API_BASE_URL = process.env.API_BASE_URL;

// Tạo instance axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const api = {
  // Category
  getTypes: () => apiClient.get("/clothes_types").then((res) => res.data),
  getTypeById: (id) => apiClient.get(`/clothes_types/${id}`).then((res) => res.data),
  createType: (data) => apiClient.post("/clothes_types", data).then((res) => res.data),
  updateType: (id, data) => apiClient.put(`/clothes_types/${id}`, data).then((res) => res.data),
  deleteType: (id) => apiClient.delete(`/clothes_types/${id}`).then((res) => res.data),

  // Type
  getTypeDetails: () => apiClient.get("/type_details").then((res) => res.data),
  getTypeDetailById: (id) => apiClient.get(`/type_details/${id}`).then((res) => res.data),
  createTypeDetails: (data) => apiClient.post("/type_details", data).then((res) => res.data),
  updateTypeDetails: (id, data) => apiClient.put(`/type_details/${id}`, data).then((res) => res.data),
  deleteTypeDetails: (id) => apiClient.delete(`/type_details/${id}`).then((res) => res.data),

  // Clothes
  getClothes: () => apiClient.get("/clothes").then((res) => res.data),
  getClothesById: (id) => apiClient.get(`/clothes/${id}`).then((res) => res.data),
  createClothes: (data) => apiClient.post("/clothes", data).then((res) => res.data),
  updateClothes: (id, data) => apiClient.put(`/clothes/${id}`, data).then((res) => res.data),
  deleteClothes: (id) => apiClient.delete(`/clothes/${id}`).then((res) => res.data),

  // Size
  getSizes: () => apiClient.get("/sizes").then((res) => res.data),
  createSize: (data) => apiClient.post("/sizes", data).then((res) => res.data),
  deleteSize: (id) => apiClient.delete(`/sizes/${id}`).then((res) => res.data),

  // Color
  getColors: () => apiClient.get("/colors").then((res) => res.data),
  getColorById: (id) => apiClient.get(`/colors/${id}`).then((res) => res.data),
  createColor: (data) => apiClient.post("/colors", data).then((res) => res.data),
  updateColor: (id, data) => apiClient.put(`/colors/${id}`, data).then((res) => res.data),
  deleteColor: (id) => apiClient.delete(`/colors/${id}`).then((res) => res.data),

  // Variant
  getVariants: () => apiClient.get("/clothes_variants").then((res) => res.data),
  getVariantById: (id) => apiClient.get(`/clothes_variants/${id}`).then((res) => res.data),
  createVariant: (data) => apiClient.post("/clothes_variants", data).then((res) => res.data),
  updateVariant: (id, data) => apiClient.put(`/clothes_variants/${id}`, data).then((res) => res.data),
  deleteVariant: (id) => apiClient.delete(`/clothes_variants/${id}`).then((res) => res.data),
};