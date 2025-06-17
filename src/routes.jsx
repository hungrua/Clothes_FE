// src/routes.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import TypeList from "./pages/Types/TypeList.jsx";
import TypeForm from "./pages/Types/TypeForm.jsx";
import TypeDetailsList from "./pages/TypeDetails/TypeDetailsList.jsx";
import TypeDetailsForm from "./pages/TypeDetails/TypeDetailsForm.jsx";
import ClothesList from "./pages/Clothes/ClothesList.jsx";
import ClothesForm from "./pages/Clothes/ClothesForm.jsx";
import SizeList from "./pages/Size/SizeList.jsx";
import SizeForm from "./pages/Size/SizeForm.jsx";
import ColorList from "./pages/Color/ColorList.jsx";
import ColorForm from "./pages/Color/ColorForm.jsx";
import VariantsList from "./pages/Variants/VariantsList.jsx";
import VariantsForm from "./pages/Variants/VariantsForm.jsx";

const AppRoutes = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="types" element={<TypeList />} />
        <Route path="types/new" element={<TypeForm />} />
        <Route path="types/new/:id" element={<TypeForm />} />
        <Route path="typeDetails" element={<TypeDetailsList />} />
        <Route path="typeDetails/new" element={<TypeDetailsForm />} />
        <Route path="typeDetails/new/:id" element={<TypeDetailsForm />} />
        <Route path="clothes" element={<ClothesList />} />
        <Route path="clothes/new" element={<ClothesForm />} />
        <Route path="clothes/new/:id" element={<ClothesForm />} />
        <Route path="sizes" element={<SizeList />} />
        <Route path="sizes/new" element={<SizeForm />} />
        <Route path="sizes/new/:id" element={<SizeForm />} />
        <Route path="colors" element={<ColorList />} />
        <Route path="colors/new" element={<ColorForm />} />
        <Route path="colors/new/:id" element={<ColorForm />} />
        <Route path="variants" element={<VariantsList />} />
        <Route path="variants/new" element={<VariantsForm />} />
        <Route path="variants/new/:id" element={<VariantsForm />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default AppRoutes;
