import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Overview/Home";
import Sellers from "./pages/Sellers/Sellers";
import Orders from "./pages/Orders/Orders";
import Seller from "./pages/Sellers/Seller";
import Tracking from "./pages/Orders/Tracking";
import Store from "./pages/Sellers/Store";
import Products from "./pages/Products/Products";
import AddProduct from "./pages/Products/AddProduct";
import Customers from "./pages/Customers/Customers";
import Messages from "./pages/Messages/Messages";
import StoreTransactions from "./pages/Sellers/Store/Transactions";
import StoreOrders from "./pages/Sellers/Store/Orders";
import StoreProducts from "./pages/Sellers/Store/Products";
import StoreBranches from "./pages/Sellers/Store/Branches";
import Product from "./pages/Products/Product";
import Customer from "./pages/Customers/Customer";
import SupportTicket from "./pages/Messages/Support";
import Notification from "./pages/Messages/Notification";
import CategoryList from "./pages/Products/Categories/CategoryList";
import CategoryListO from "./pages/Products/Categories/CategoryList";
import AddCategory from "./pages/Products/Categories/AddCategory";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Login from "./pages/Login";
import CategoryPage from "./pages/Products/Categories/CategoryPage";
import EditCategory from "./pages/Products/Categories/EditCategory";
import AttributeList from "./pages/Products/Attributes/AttributeList";
import AddAttribute from "./pages/Products/Attributes/AddAttribute";
import EditAttribute from "./pages/Products/Attributes/EditAttribute";

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Route>
        <Route path="/sellers">
          <Route index element={<Sellers />} />
          <Route path=":id" element={<Seller />} />
          <Route path="store" element={<Store />} />
          <Route path="transactions" element={<StoreTransactions />} />
          <Route path="orders" element={<StoreOrders />} />
          <Route path="products" element={<StoreProducts />} />
          <Route path="branches" element={<StoreBranches />} />
        </Route>
        <Route path="/orders">
          <Route index element={<Orders />} />
          <Route path="tracking" element={<Tracking />} />
        </Route>
        <Route path="/products">
          <Route index element={<Products />} />
          <Route path="add-product" element={<AddProduct />} />
          <Route path="product" element={<Product />} />
          <Route path="categories" element={<CategoryListO />} />
          {/*<Route path="categories/:categoryId" element={<CategoryPage />} />*/}
          <Route path="categories/:categoryId" element={<AddCategory />} />
          <Route
            path="categories/:categoryId/edit"
            element={<EditCategory />}
          />
          {/*<Route path="categories/add-category" element={<AddCategory />} />*/}
          <Route path="categories/new-attributes" element={<AddAttribute />} />
          <Route path="categories/attributes/:attributeId" element={<EditAttribute />} />

          {/*<Route path="categories/add-category" element={<AddCategory />} />*/}
          {/*<Route path="new-attributes" element={<AddAttribute />} />*/}
          {/*<Route path="attributes/:attributeId" element={<EditAttribute />} />*/}


          <Route path="attributes" element={<AttributeList />} />
        </Route>
        <Route path="/customers">
          <Route index element={<Customers />} />
          <Route path="customer" element={<Customer />} />
        </Route>
        <Route path="/messages">
          <Route index element={<Messages />} />
          <Route path="support" element={<SupportTicket />} />
          <Route path="notification" element={<Notification />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
