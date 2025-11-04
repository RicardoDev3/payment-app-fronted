import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductsPage from "./pages/ProductsPage/ProductsPage";
import CheckoutPage from "./pages/CheckoutPage/CheckoutPage";
import ResultPage from "./pages/ResultPage/ResultPage";
import { restoreFromLocalStorage } from "./store/slices/transactionSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreFromLocalStorage());
  }, [dispatch]);

  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<ProductsPage />} />
        <Route path="/checkout/" element={<CheckoutPage />} />
        <Route path="/result/:transactionId" element={<ResultPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}

export default App;
