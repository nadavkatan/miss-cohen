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
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function App() {
  return (
    <Provider store={store}>
      <PayPalScriptProvider
        options={{ "client-id": process.env.REACT_APP_PAYPAL_CLIENT_ID }}
      >
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
      </PayPalScriptProvider>
    </Provider>
  );
}

export default App;
