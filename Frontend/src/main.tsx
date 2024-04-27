import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss';
import Technologies from '@/pages/Reference/Technologies.tsx';
import ReduxTesting from '@/pages/Reference/ReduxTesting.tsx';
import ErrorPage from '@/pages/ErrorPage.tsx';
import ReferencePage from '@/pages/Reference.tsx';
import Homepage from '@/pages/Homepage.tsx';
import RegisterPage from '@/pages/RegisterPage.tsx';
import LoginPage from '@/pages/LoginPage.tsx';
import ForgotPasswordPage from '@/pages/ForgotPasswordPage.tsx';
import CategoryPage from '@/pages/Category/CategoryPage.tsx';
import ProductDetailPage from '@/pages/Product/ProductDetailPage.tsx';
import ShoppingCartPage from './pages/ShoppingCart/ShoppingCartPage.tsx';
import FavoriteProductPage from './pages/FavoriteProduct/FavoriteProductPage.tsx';
import PaymentPage from '@/pages/ShoppingCart/PaymentPage.tsx';
import SubCategoryPage from '@/pages/Category/SubCategoryPage.tsx';

//REDUX
import { Provider } from 'react-redux';
import store from './redux/store';

// REACT ROUTER DOM
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: <ErrorPage />,
      children: [
        { index: true, element: <Homepage /> },
        {
          path: "reference",
          element: <ReferencePage />,
          errorElement: <ErrorPage />,
          children: [
            {
              path: "technologies",
              element: <Technologies />
            },
            {
              path: "redux-testing",
              element: <ReduxTesting />
            },
          ]
        },
        {
          path: "category",
          element: <CategoryPage />
        },
        {
          path: "sub-category",
          element: <SubCategoryPage/>
        },
        {
          path: "product-detail",
          element: <ProductDetailPage />
        },
        {
          path: "cart",
          element: <ShoppingCartPage />
        },
        {
          path: "payment",
          element: <PaymentPage />
        },
        {
          path: "favorite-products",
          element: <FavoriteProductPage />
        },
        {
          path: "register",
          element: <RegisterPage />,
        },
        {
          path: "login",
          element: <LoginPage />,
        },
        {
          path: "reset-password",
          element: <ForgotPasswordPage />
        },
      ],
    },
  ], {
  basename: import.meta.env.VITE_BASE_URL
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
