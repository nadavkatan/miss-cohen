import React from "react";
import { HomePage } from "./app/pages/homePage/HomePage";
import Navbar from "./app/components/navbar/Navbar";
import { store } from "./app/store";
import { Provider } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { ProductsPage } from "./app/pages/productsPage/ProductsPage";
import SignInPage from "./app/pages/signInPage/SignInPage";
import { CheckoutPage } from "./app/pages/checkoutPage/CheckoutPage";
import RegisterPage from "./app/pages/registerPage/RegisterPage";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
